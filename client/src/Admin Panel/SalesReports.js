import { useEffect, useState } from 'react';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import "chart.js/auto";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);



// fetch data from stripe
interface Order {
  id: string;
  userEmail: string;
  transactionId: string;
  paymentMethod: string;
  createdAt: string;
  totalAmount: number;
  currency: string;
  products: {
    name: string;
    quantity: number;
    amount: number;
    image: string | null;
  }[];
}

const SalesReports = () => {
  // Example of data for sales over months
  const [salesData, setSalesData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Monthly Sales ($)",
        data: [1200, 1500, 1300, 1600, 1700, 1800, 2100, 2200, 2400, 2500, 2700, 2900],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
    ],
  });


  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    fetch("http://localhost:8000/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  const indexOfLastOrder = currentPage * rowsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - rowsPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Handle download report
  const handleDownloadReport = () => {
    // Create CSV content
    const headers = [
      'Customer',
      'Transaction ID',
      'Payment Method',
      'Date',
      'Total Amount',
      'Products',
    ];

    const rows = orders.map((order) => {
      const products = order.products
        .map(
          (product) =>
            `${product.name} (Qty: ${product.quantity}, Price: ${product.amount} ${order.currency})`
        )
        .join('; ');

      return [
        order.userEmail,
        order.transactionId,
        order.paymentMethod,
        order.createdAt,
        `${order.totalAmount} ${order.currency}`,
        products,
      ];
    });

    const csvContent =
      headers.join(',') +
      '\n' +
      rows.map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n');

    // Create a Blob and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'sales_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };



  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">

     


      {/* Header Section */}
      <h1 className="text-4xl font-bold text-indigo-600">Sales Reports</h1>
      <p className="text-gray-600 mt-3 max-w-2xl">
        Analyze and download reports of your confectionary sales to improve performance and track progress. Stay informed on
        trends and sales performance across different months and categories.
      </p>

      {/* Sales Data Section */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800">Monthly Sales Overview</h2>
        <p className="text-gray-600 mt-2">Total Sales: $34,800</p>

        {/* Line Chart for Sales over Months */}
        <div className="mt-4">
          <Line data={salesData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>

      {/* Sales by Category Section */}

      <div className="p-6 bg-gray-100 min-h-screen">
        
        <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-700">Sales Reports</h2>
        <button
          onClick={handleDownloadReport}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Download Report
        </button>
      </div>

        <div className="bg-white p-4 shadow-lg rounded-lg overflow-x-auto">
          {orders.length === 0 ? (
            <p className="text-center text-gray-600">Loading orders...</p>
          ) : (
            <>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="p-3 text-left">Customer Email</th>
                    <th className="p-3 text-left">Transaction ID</th>
                    <th className="p-3 text-left">Payment Method</th>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Product</th>
                    <th className="p-3 text-left">Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((order, index) => (
                    <tr
                      key={order.id}
                      className={`border-b ${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                        }`}
                    >
                      <td className="p-3">{order.userEmail}</td>
                      <td className="p-3">{order.transactionId}</td>
                      <td className="p-3 capitalize">{order.paymentMethod}</td>
                      <td className="p-3">{order.createdAt}</td>
                      <td className="p-3">
                        {order.products.map((product, i) => (
                          <div key={i} className="flex items-center gap-2 mb-2">
                            {product.image && (
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 rounded-lg object-cover border"
                              />
                            )}
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-gray-600">
                                Quantity: {product.quantity}
                              </p>
                              <p className="text-sm text-gray-600">
                                Price: {product.amount} {order.currency.toUpperCase()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </td>
                      <td className="p-3">
                        {order.totalAmount} {order.currency.toUpperCase()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination Controls */}
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
                >
                  Previous
                </button>

                <p className="text-gray-700">
                  Page {currentPage} of {Math.ceil(orders.length / rowsPerPage)}
                </p>

                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      prev < Math.ceil(orders.length / rowsPerPage) ? prev + 1 : prev
                    )
                  }
                  disabled={currentPage >= Math.ceil(orders.length / rowsPerPage)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>



    </div>
  );
};

export default SalesReports;
