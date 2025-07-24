// src/components/Footer.jsx
import React, { useEffect, useState } from "react";
import { getAllCategory } from "~/services/categoriesService";

export default function Footer() {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [categories, setCategories] = useState([])

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    loadProducts(1, categoryId);
  };
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await getAllCategory({ limit: 1000 })
        setCategories(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        setCategories([]);
      }
    }
    fetchCategories();
  }, [])
  return (
    <footer className="bg-neutral-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Categories */}
        <div className="flex flex-col gap-2 text-gray-500">
          <h3 className="text-white text-lg font-semibold mb-2">Danh mục</h3>
          {categories.map((cat) => (
            <button
              key={cat._id}
              className={
                "text-left transition-all duration-200 text-sm " +
                (activeCategory === cat._id
                  ? "text-white font-semibold underline underline-offset-4"
                  : "hover:text-white")
              }
              onClick={() => handleCategoryChange(cat._id)}
            >
              {cat.nameCategory}
            </button>
          ))}
        </div>

        {/* Location */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Vị trí</h3>
          <ul className="space-y-2">
            <li>
              <div className="w-full">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4640.290675848051!2d105.74354717525686!3d21.037901680613665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454962c0b6523%3A0x5c76c67564d9d1b9!2zUC4gVHLhu4tuaCBWxINuIELDtCwgSMOgIE7hu5lp!5e1!3m2!1svi!2s!4v1753297083239!5m2!1svi!2s" 
                width="100%" 
                height="150" 
                style={{border: 0}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              />
            </div>
            </li>
            <li className="text-sm text-gray-400">Trinh Van Bo, Nam Tu Liem, Ha Noi</li>
          </ul>
        </div>
        {/* Get in touch */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Liên hệ</h3>
          <p className="mb-4 text-sm">
            Nếu có thắc mắc gì, vui lòng liên hệ với chung tôi theo số (+84 912345678)
          </p>
          <div className="flex space-x-4 text-2xl">
            {/* Facebook */}
            <a href="#" className="hover:text-indigo-400" aria-label="Facebook">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" /></svg>
            </a>
            {/* Instagram */}
            <a href="#" className="hover:text-indigo-400" aria-label="Instagram">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.567 5.782 2.295 7.148 2.233 8.414 2.175 8.794 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.363 3.678 1.344c-.98.98-1.213 2.092-1.272 3.373C2.013 5.668 2 6.077 2 12c0 5.923.013 6.332.072 7.613.059 1.281.292 2.393 1.272 3.373.98.98 2.092 1.213 3.373 1.272C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.281-.059 2.393-.292 3.373-1.272.98-.98 1.213-2.092 1.272-3.373.059-1.281.072-1.69.072-7.613 0-5.923-.013-6.332-.072-7.613-.059-1.281-.292-2.393-1.272-3.373-.98-.98-2.092-1.213-3.373-1.272C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" /></svg>
            </a>
            {/* Pinterest */}
            <a href="#" className="hover:text-indigo-400" aria-label="Pinterest">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.387 7.594 11.093-.105-.944-.2-2.393.042-3.425.219-.97 1.41-6.18 1.41-6.18s-.36-.72-.36-1.78c0-1.668.968-2.915 2.17-2.915 1.022 0 1.516.767 1.516 1.687 0 1.027-.655 2.563-.993 3.993-.283 1.2.6 2.178 1.78 2.178 2.136 0 3.78-2.25 3.78-5.493 0-2.872-2.064-4.885-5.012-4.885-3.417 0-5.426 2.563-5.426 5.215 0 1.027.396 2.13.891 2.728.099.12.113.225.083.345-.09.36-.293 1.2-.333 1.367-.05.21-.16.255-.37.153-1.38-.642-2.24-2.65-2.24-4.27 0-3.48 2.53-6.68 7.29-6.68 3.83 0 6.81 2.73 6.81 6.37 0 3.8-2.39 6.85-5.71 6.85-1.14 0-2.21-.62-2.58-1.34l-.7 2.67c-.21.81-.62 1.82-.92 2.44.69.21 1.42.32 2.18.32 6.627 0 12-5.373 12-12S18.627 0 12 0z" /></svg>
            </a>
          </div>
        </div>
        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Đăng kí nhận bản tin</h3>
          <form className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="email@example.com"
              className="bg-transparent border-b border-gray-500 py-2 px-0 text-white placeholder-gray-400 focus:outline-none"
              onChange={e => console.log(e.target.value)}
            />
            <button
              type="submit"
              className="bg-indigo-400 hover:bg-indigo-500 text-white font-semibold py-2 rounded-full transition"
            >
              Đăng kí
            </button>
          </form>
        </div>
      </div>
      {/* Payment icons & copyright */}
      <div className="mt-12 flex flex-col items-center">
        <div className="flex space-x-2 mb-4">
          <img src="https://themewagon.github.io/cozastore/images/icons/icon-pay-01.png" alt="PayPal" className="h-6" />
          <img src="https://themewagon.github.io/cozastore/images/icons/icon-pay-02.png" alt="Visa" className="h-6" />
          <img src="https://themewagon.github.io/cozastore/images/icons/icon-pay-03.png" alt="Mastercard" className="h-6" />
          <img src="https://themewagon.github.io/cozastore/images/icons/icon-pay-04.png" alt="Express" className="h-6" />
          <img src="https://themewagon.github.io/cozastore/images/icons/icon-pay-05.png" alt="Discover" className="h-6" />
        </div>
        <p className="text-sm text-gray-400 text-center">
          {/* Copyright ©2025 All rights reserved | Made with <span className="text-pink-400">♥</span> by <a href="https://colorlib.com" className="text-blue-400 hover:underline">Colorlib</a> &amp; distributed by <a href="https://themewagon.com" className="text-blue-400 hover:underline">ThemeWagon</a> */}
        </p>
      </div>
    </footer>
  );
}