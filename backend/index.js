// api/index.js
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables

const Stripe = require("stripe"); // Correct import
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: "2022-11-15" }); // Initialize Stripe



const app = express();
const port = process.env.PORT || 8006;


app.use(cors());
app.use(express.json());




// ******************************************************* this part used for *************************************************************************

const currentDateTime = new Date().toLocaleString("en-US", {
  weekday: "long", // Full day name (e.g., Monday)
  year: "numeric",
  month: "long", // Full month name (e.g., January)
  day: "numeric",
  hour: "2-digit", // 12-hour format with leading zero
  minute: "2-digit",
  second: "2-digit",
  hour12: true, // 12-hour clock (AM/PM)
});


// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  logger: true, // Enable logging
  debug: true,  // Enable debugging
});


// Endpoint to send cart details
app.post("/send-cart-email", async (req, res) => {
  const { email, cart, subtotal, discount, tax, total } = req.body;

  if (!email || !cart || !subtotal || !discount || !tax || !total) {
    return res.status(400).json({ error: "Email and cart details are required" });
  }


  // Format cart details as HTML with Tailwind CSS
  const cartDetails = cart
    .map(
      (item, index) => `
      <tr style="background-color: ${index % 2 === 0 ? "#f9f9f9" : "#ffffff"
        }; border-bottom: 1px solid #ddd;">
      <td style="padding: 10px; border: 1px solid #ddd;">${item.name}</td>
      <td style="padding: 10px; border: 1px solid #ddd;">
        <img src="${item.image_url}" alt="${item.name}" width="80" style="border-radius: 4px;" />
      </td>
      <td style="padding: 10px; border: 1px solid #ddd;">$${item.price}</td>
      <td style="padding: 10px; border: 1px solid #ddd;">${item.category}</td>
      <td style="padding: 10px; border: 1px solid #ddd;">${item.weight}</td>
    </tr>
    `
    )
    .join("");

  const mailOptions = {
    from: process.env.EMAIL_USER, // Your email
    to: email, // User's email
    subject: `🎉 Purchase Confirmation from Galaxy Super Shop`,
    html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; max-width: 650px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px; background-color: #ffffff; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
            
                <!-- Header Section -->
          <div style="text-align: center; padding-bottom: 20px;">
            <h1 style="color: #ff5722; font-size: 36px; font-weight: bold; letter-spacing: -1px;">New Purchase Notification</h1>
            <p style="font-size: 18px; color: #555; font-style: italic;">A new sweet purchase has been made on your platform, bringing joy and delicious treats to your customers</p>
          </div>

          <!-- Admin Greeting Section -->
          <p style="font-size: 16px; color: #333; font-weight: 500;">Dear Customer,</p>
          <p style="font-size: 16px; color: #555;">We’re excited to inform you that a new order has just been placed by one of your valued customers! 🎉 Below are the details of this delightful purchase::</p>
          
          <!-- Product Image and Details -->
          <div style="text-align: center; margin-top: 20px;">
            <img 
              src="https://w7.pngwing.com/pngs/439/270/png-transparent-confectioner-confectionery-sweets-layer-cake-cake-pie-doughnut-dessert-cartoon-thumbnail.png" 
              style="border-radius: 7%; width: 250px; height: 250px; object-fit: cover; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);"
              alt="French Pastries"
            >
          </div>


          <!-- Product Info Section -->
      <h2 style="color: #333; font-size: 24px; margin-top: 20px; border-bottom: 2px solid #ff5722; padding-bottom: 8px;">
        Product Details
      </h2>
            <!-- Cart Table Section -->
      <table style="width: 100%; margin: 0 auto; border-collapse: collapse; text-align: center;">
        <!-- Table Header -->
        <thead style="background-color: #f97316; color: white;">
          <tr>
            <th style="padding: 10px; border: 1px solid #ddd;">Product Name</th>
            <th style="padding: 10px; border: 1px solid #ddd;">Image</th>
            <th style="padding: 10px; border: 1px solid #ddd;">Price</th>
            <th style="padding: 10px; border: 1px solid #ddd;">Category</th>
            <th style="padding: 10px; border: 1px solid #ddd;">Weight</th>
          </tr>
        </thead>
        <!-- Table Body -->
        <tbody>
          ${cartDetails}
        </tbody>
      </table>


<!-- Payment  Section -->
    <h2 style="color: #333; font-size: 24px; margin-top: 20px; border-bottom: 2px solid #ff5722; padding-bottom: 8px;">Payment Details</h2>
    <ul style="list-style-type: none; padding: 0; margin: 10px 0; color: #555;">
      <li style="font-size: 16px; margin-bottom: 8px;"><strong>Subtotal :</strong> $${subtotal.toFixed(2)}</li>
      <li style="font-size: 16px; margin-bottom: 8px;"><strong>Discount:</strong> $${discount.toFixed(2)}</li>
      <li style="font-size: 16px; margin-bottom: 8px; border-bottom: 2px solidrgb(146, 130, 125);"><strong>Tax:</strong> $${tax.toFixed(2)}</li>
      <li style="font-size: 16px; margin-bottom: 8px;"><strong>Total:</strong> $${total.toFixed(2)}</li>
    </ul>


        <!-- Customer Info Section -->
    <h2 style="color: #333; font-size: 24px; margin-top: 20px; border-bottom: 2px solid #ff5722; padding-bottom: 8px;">Customer Details</h2>
    <ul style="list-style-type: none; padding: 0; margin: 10px 0; color: #555;">
      <li style="font-size: 16px; margin-bottom: 8px;"><strong>Purchased By:</strong> ${email}</li>
      <li style="font-size: 16px; margin-bottom: 8px;"><strong>Order Date and Time:</strong> ${currentDateTime}</li>
    </ul>

    <!-- Call to Action Section -->
    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #ff5722;">
      <a href="http://localhost:8000/admin-dashboard" style="background-color: #ff5722; color: #fff; padding: 12px 30px; font-size: 18px; border-radius: 5px; text-decoration: none; font-weight: bold; transition: background-color 0.3s ease-in-out;">View Order Details</a>
    </div>

    <!-- Divider Line -->
    <hr style="border: 1px solid #ddd; margin: 30px 0;">

    <!-- Customer Support Section -->
    <p style="font-size: 14px; color: #888; text-align: center; line-height: 1.6;">If you have any questions or need assistance, feel free to contact us at <a href="mailto:support@yourshop.com" style="color: #ff5722; text-decoration: none; font-weight: bold;">support@yourshop.com</a></p>

    <!-- Footer Section -->
    <footer style="text-align: center; margin-top: 5px; font-size: 12px; color: #888; border-top: 2px solid #f1f1f1; padding-top: 20px;">
      <p style="font-size: 14px; color: #555;">Best regards,</p>
      <p style="font-size: 14px; color: #555; font-weight: 500;"><strong>Your Shop Team</strong></p>
      <p style="font-size: 10px; color: #aaa;">&copy; 2025 Your Shop. All Rights Reserved.</p>
    </footer>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Cart details sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email. Please try again later." });
  }
});


app.post("/create-checkout-session", async (req, res) => {
  try {
    const { products } = req.body;

    // Create line items
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          images: [product.image_url], // Use `images` instead of `image_url`
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: product.quantity,
    }));

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3005/success", // Change to frontend success page
      cancel_url: "http://localhost:3005/cancel",  // Change to frontend cancel page
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session: ", error.message);
    res.status(500).json({ error: error.message });
  }
});





// Simple API endpoint
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the backend Jobayed!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


