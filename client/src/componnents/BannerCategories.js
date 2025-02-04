import React from 'react';
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Carousel } from 'antd';
import { Link } from 'react-router-dom';
import { FiMenu, FiCoffee, FiGift, FiShoppingBag, FiPieChart, FiStar, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";

const categories = [
    { name: "Cakes", icon: FiCoffee, path: "/category/Cakes" },
    { name: "Chocolates", icon: FiGift, path: "/category/Chocolates" },
    { name: "Pastries", icon: FiShoppingBag, path: "/category/Pastries" },
    { name: "Candy", icon: FiPieChart, path: "/category/Candy" },
    { name: "Cupcakes", icon: FiStar, path: "/category/Cupcakes" },
    { name: "Breads", icon: FiShoppingBag, path: "/category/Breads" },
    { name: "Muffins", icon: FiCoffee, path: "/category/Muffins" },
    { name: "Donuts", icon: FiGift, path: "/category/Donuts" },
    { name: "Brownies", icon: FiShoppingBag, path: "/category/Brownies" },
    { name: "Pies Tarts", icon: FiPieChart, path: "/category/Pies Tarts" },
    { name: "Fudge", icon: FiStar, path: "/category/Fudge" },
];

const BannerCategories = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const carouselRef = useRef();

    const slides = [
        {
            image: "https://img.freepik.com/free-photo/chocolate-tartalettes-piece-paper_114579-17279.jpg?uid=R170429557&ga=GA1.1.453133905.1736260813&semt=ais_hybrid",
            title: "Exclusive Collection",
            description: "Discover our latest trends and enjoy special discounts!",
            leftContent: "Special Offer",
            rightContent: "Limited Time",
        },
        {
            image: "https://img.freepik.com/free-photo/various-homemade-mini-tartlets-with-nuts-chocolate-cream_114579-43362.jpg?uid=R170429557&ga=GA1.1.453133905.1736260813&semt=ais_hybrid",
            title: "Stylish Arrivals",
            description: "Shop the season's hottest styles now.",
            leftContent: "New Arrivals",
            rightContent: "Trending Now",
        },
        {
            image: "https://img.freepik.com/free-photo/top-closer-view-little-cakes-with-sugar-powder-fruits-cream-light-blue_140725-32591.jpg?uid=R170429557&ga=GA1.1.453133905.1736260813&semt=ais_hybrid",
            title: "Limited Edition",
            description: "Grab our limited edition products before they're gone!",
            leftContent: "Exclusive",
            rightContent: "Hurry Up!",
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 300);
        return () => clearInterval(interval);
    }, [slides.length]);

    const handleNext = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div className='containerc'>

        </div>
    );
};

export default BannerCategories;