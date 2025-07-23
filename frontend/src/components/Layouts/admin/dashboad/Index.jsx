import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import { fetchReportData } from "~/services/reportService";
import { Navigate } from "react-router-dom";


const getCurrentYear = () => new Date().getFullYear();
const getCurrentMonth = () => new Date().getMonth() + 1;
const getCurrentQuarter = () => Math.floor(new Date().getMonth() / 3) + 1;

export default function Index() {
  const barRef = useRef(null);
  const lineRef = useRef(null);
  const pieRef = useRef(null);
  const User = JSON.parse(localStorage.getItem("user"));
  if(User.role == false){
    return <Navigate to="/user/home" replace />;
  }
  const fileName = `${User.userName}_bao_cao_thong_ke_${new Date().toISOString().split("T")[0]}`;

  const [filterType, setFilterType] = useState("day");
  const [year, setYear] = useState(getCurrentYear());
  const [month, setMonth] = useState(getCurrentMonth());
  const [quarter, setQuarter] = useState(getCurrentQuarter());

  const [orderStats, setOrderStats] = useState([]);
  const [revenueStats, setRevenueStats] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [orderStatusCounts, setOrderStatusCounts] = useState({
    Pending: 0,
    Delivery: 0,
    Delivered: 0,
    Canceled: 0,
  });

  // Thêm state cho kiểu xem
  const [viewType, setViewType] = useState("day");
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedQuarter, setSelectedQuarter] = useState(1);

  useEffect(() => {

      const now = new Date();
    if (!year) setYear(now.getFullYear());
    if (!selectedMonth) setSelectedMonth(now.getMonth() + 1);

    if (viewType === "day") {
      if (selectedMonth && selectedDay) {
        setFilterType(`day-${selectedMonth}-${selectedDay}`);
        setMonth(selectedMonth);
        setQuarter(1);
      } else if (selectedMonth) {
        setFilterType(`day-${selectedMonth}`);
        setMonth(selectedMonth);
        setQuarter(1);
      } else {
        setFilterType("day");
        setMonth(getCurrentMonth());
        setQuarter(1);
      }
    } else if (viewType === "month") {
      setFilterType("month");
      setMonth(selectedMonth);
      setQuarter(1);
    } else if (viewType === "quarter") {
      setFilterType("quarter");
      setQuarter(selectedQuarter);
      setMonth(1);
    } else if (viewType === "year") {
      setFilterType("year");
      setMonth(1);
      setQuarter(1);
    }
  }, [viewType, selectedMonth, selectedDay, selectedQuarter]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await fetchReportData({ filterType, year, month, quarter });
        setOrderStats(data.orderStats);
        setRevenueStats(data.revenueStats);
        setTopProducts(data.topProducts);
        setOrderStatusCounts(data.statusCounts);
        console.log("revenueStats", revenueStats);
        console.log("orderStats", orderStats);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu thống kê", err);
      }
    };
    fetchStats();
  }, [filterType, year, month, quarter]);

  // Export to Excel handler
  const handleExportExcel = () => {
    const ordersSheet = [
      ["Nhãn", ...orderStats.map((_, i) => i + 1)],
      ["Số đơn hàng", ...orderStats],
    ];
    const revenueSheet = [
      ["Nhãn", ...revenueStats.map((_, i) => i + 1)],
      ["Doanh thu", ...revenueStats],
    ];
    const productsSheet = [
      ["Tên sản phẩm", "Đã bán"],
      ...topProducts.map(p => [p.name, p.sold]),
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(ordersSheet), "Đơn hàng");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(revenueSheet), "Doanh thu");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(productsSheet), "Sản phẩm bán chạy");

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), `${fileName}.xlsx`);
  };

  // Export to PDF handler
  const handleExportPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");
    const margin = 14;

    doc.setFont("helvetica");

    // Title centered, highlight color
    doc.setFontSize(20);
    doc.setTextColor("#2563eb");
    doc.text("TBN STORE STATISTICS REPORT", 105, 18, { align: "center" });

    // Export info
    const date = new Date().toLocaleString("en-US");
    doc.setFontSize(11);
    doc.setTextColor("#666");
    doc.text(`Exported at: ${date}`, margin, 28);
    doc.text(
      `Exported by: ${User?.firstName || "Unknown"} ${User?.lastName || ""} (Username: ${User?.userName || "Unknown"})`,
      margin,
      34
    );

    // Orders
    doc.setFontSize(14);
    doc.setTextColor("#000");
    doc.text("Order Statistics", margin, 44);
    autoTable(doc, {
      startY: 48,
      head: [["#", ...orderStats.map((_, i) => `${i + 1}`)]],
      body: [["Order count", ...orderStats]],
      theme: "grid",
      styles: { font: "helvetica", fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [99, 102, 241], textColor: 255, halign: "center" },
      bodyStyles: { halign: "center" },
      tableLineColor: [99, 102, 241],
      tableLineWidth: 0.2,
    });

    // Revenue
    let revenueY = doc.lastAutoTable.finalY + 10;
    doc.setTextColor("#000");
    doc.setFontSize(14);
    doc.text("Revenue Statistics", margin, revenueY);
    autoTable(doc, {
      startY: revenueY + 4,
      head: [["#", ...revenueStats.map((_, i) => `${i + 1}`)]],
      body: [["Revenue (VND)", ...revenueStats]],
      theme: "grid",
      styles: { font: "helvetica", fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [16, 185, 129], textColor: 255, halign: "center" },
      bodyStyles: { halign: "center" },
      tableLineColor: [16, 185, 129],
      tableLineWidth: 0.2,
    });

    // Top products
    let productY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.text("Best-selling Products", margin, productY);
    autoTable(doc, {
      startY: productY + 4,
      head: [["Product Name", "Sold"]],
      body: topProducts.map(p => [p.name, p.sold]),
      theme: "grid",
      styles: { font: "helvetica", fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [59, 130, 246], textColor: 255, halign: "center" },
      bodyStyles: { halign: "center" },
      tableLineColor: [59, 130, 246],
      tableLineWidth: 0.2,
    });

    // Tổng doanh thu
    let totalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.setTextColor("#22c55e");
    doc.text(
      `Total revenue: ${revenueStats.reduce((a, b) => a + b, 0).toLocaleString("en-US")} VND`,
      margin,
      totalY
    );

    // Bar chart
    if (barRef.current) {
      const img = barRef.current.toDataURL("image/png");
      doc.addPage();
      doc.setFontSize(16);
      doc.setTextColor("#000");
      doc.text("Bar Chart: Orders", 105, 20, { align: "center" });
      doc.addImage(img, "PNG", margin, 26, 180, 90);
    }
    // Line chart
    if (lineRef.current) {
      const img = lineRef.current.toDataURL("image/png");
      doc.addPage();
      doc.setFontSize(16);
      doc.setTextColor("#000");
      doc.text("Line Chart: Revenue", 105, 20, { align: "center" });
      doc.addImage(img, "PNG", margin, 26, 180, 90);
    }
    // Pie chart
    if (pieRef.current) {
      const img = pieRef.current.toDataURL("image/png");
      doc.addPage();
      doc.setFontSize(16);
      doc.setTextColor("#000");
      doc.text("Pie Chart: Order Status", 105, 20, { align: "center" });
      doc.addImage(img, "PNG", margin, 26, 120, 120);
    }

    doc.save(`${fileName}_en.pdf`);
  };

  // Chart instances to destroy before re-render
  const chartInstances = useRef({});

  useEffect(() => {
    Object.values(chartInstances.current).forEach(chart => chart?.destroy());

    if (barRef.current) {
      chartInstances.current.bar = new Chart(barRef.current, {
        type: "bar",
        data: {
          labels: orderStats.map((_, i) => `${i + 1}`),
          datasets: [{
            label: "Số đơn hàng",
            data: orderStats,
            backgroundColor: "#6366f1",
          }],
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            x: {
              ticks: {
                autoSkip: false,
                maxRotation: 0,
                minRotation: 0,
              },
            },
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1, // chỉ hiện số nguyên
                callback: function (value) {
                  return Number.isInteger(value) ? value : null;
                }
              }
            }
          },
        },
      });
    }

    if (lineRef.current) {
      chartInstances.current.line = new Chart(lineRef.current, {
        type: "line",
        data: {
          labels: revenueStats.map((_, i) => `${i + 1}`),
          datasets: [{
            label: "Doanh thu",
            data: revenueStats,
            borderColor: "#22c55e",
            backgroundColor: "rgba(34,197,94,0.2)",
            fill: true,
          }],
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            x: {
              ticks: {
                autoSkip: false,
                maxRotation: 0,
                minRotation: 0,
              },
            },
          },
        },
      });
    }

    if (pieRef.current) {
      chartInstances.current.pie = new Chart(pieRef.current, {
        type: "pie",
        data: {
          labels: ["Chờ xác nhận", "Đang giao", "Đã giao", "Đã huỷ"],
          datasets: [{
            data: [
              orderStatusCounts.Pending,
              orderStatusCounts.Delivery,
              orderStatusCounts.Delivered,
              orderStatusCounts.Canceled,
            ],
            backgroundColor: [
              "#facc15", // vàng
              "#38bdf8", // xanh dương
              "#22c55e", // xanh lá
              "#ef4444", // đỏ
            ],
          }],
        },
        options: { responsive: true },
      });
    }

    return () => {
      Object.values(chartInstances.current).forEach(chart => chart?.destroy());
    };
  }, [orderStats, revenueStats, orderStatusCounts]);

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Bảng điều khiển</h1>
      <div className="flex gap-2 mb-4">
        <button
          onClick={handleExportExcel}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold shadow"
        >
          Xuất Excel
        </button>
        <button
          onClick={handleExportPDF}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold shadow"
        >
          Xuất PDF
        </button>
      </div>

      {/* Bộ lọc */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Chọn kiểu xem */}
        <select
          value={viewType}
          onChange={e => setViewType(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="day">Xem theo ngày</option>
          <option value="month">Xem theo tháng</option>
          <option value="quarter">Xem theo quý</option>
          <option value="year">Xem theo năm</option>
        </select>
        {/* Chọn tháng (cho day, month) */}
        {(viewType === "day" || viewType === "month") && (
          <select
            value={selectedMonth}
            onChange={e => {
              setSelectedMonth(Number(e.target.value));
              setSelectedDay("");
            }}
            className="border rounded px-3 py-2"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>Tháng {i + 1}</option>
            ))}
          </select>
        )}
        {/* Chọn ngày (chỉ khi xem theo ngày) */}
        {viewType === "day" && (
          <select
            value={selectedDay}
            onChange={e => setSelectedDay(e.target.value)}
            className="border rounded px-3 py-2"
            disabled={!selectedMonth}
          >
            <option value="">-- Chọn ngày (tuỳ chọn) --</option>
            {Array.from({ length: 31 }, (_, i) => (
              <option key={i + 1} value={i + 1}>Ngày {i + 1}</option>
            ))}
          </select>
        )}
        {/* Chọn quý (chỉ khi xem theo quý) */}
        {viewType === "quarter" && (
          <select hidden
            value={selectedQuarter}
            onChange={e => setSelectedQuarter(Number(e.target.value))}
            className="border rounded px-3 py-2"
          >
            {[1, 2, 3, 4].map(q => (
              <option key={q} value={q}>Quý {q}</option>
            ))}
          </select>
        )}
        {/* Năm */}
        <input
          type="number"
          min="2000"
          max={getCurrentYear()}
          value={year}
          onChange={e => setYear(Number(e.target.value))}
          className="border rounded px-3 py-2"
          placeholder="Năm"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow p-4 h-74">
          <h2 className="font-semibold mb-2">Biểu đồ cột: Đơn hàng</h2>
          <canvas ref={barRef} height={250}></canvas>
        </div>
        <div className="bg-white rounded-xl shadow p-4 h-74">
          <h2 className="font-semibold mb-2">Biểu đồ đường: Doanh thu</h2>
          <canvas ref={lineRef} height={250}></canvas>
        </div>
      </div>
      {/* Pie chart for order statuses */}
      <div className="bg-white rounded-xl shadow p-4 mt-8 max-w-md mx-auto">
        <h2 className="font-semibold mb-2">Biểu đồ tròn: Trạng thái đơn hàng</h2>
        <canvas ref={pieRef} height={250}></canvas>
        <ul className="mt-4 space-y-1 text-sm">
          <li><span className="inline-block w-3 h-3 rounded-full bg-yellow-400 mr-2"></span>Chờ xác nhận: {orderStatusCounts.Pending}</li>
          <li><span className="inline-block w-3 h-3 rounded-full bg-sky-400 mr-2"></span>Đang giao: {orderStatusCounts.Delivery}</li>
          <li><span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>Đã giao: {orderStatusCounts.Delivered}</li>
          <li><span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-2"></span>Đã huỷ: {orderStatusCounts.Canceled}</li>
        </ul>
      </div>
      {/* Top products */}
      <div className="bg-white rounded-xl shadow p-4 mt-8">
        <h2 className="font-semibold mb-2">Sản phẩm bán chạy</h2>
        <ul>
          {topProducts.map((p, idx) => (
            <li key={idx} className="py-1 flex justify-between">
              <span>{p.name}</span>
              <span className="font-bold">{p.sold} đã bán</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Revenue summary */}
      <div className="bg-white rounded-xl shadow p-4 mt-8">
        <h2 className="font-semibold mb-2">Tổng doanh thu</h2>
        <div className="text-2xl font-bold text-green-600">
          {revenueStats.reduce((a, b) => a + b, 0).toLocaleString("vi-VN")} VNĐ
        </div>
      </div>
    </>
  );
}