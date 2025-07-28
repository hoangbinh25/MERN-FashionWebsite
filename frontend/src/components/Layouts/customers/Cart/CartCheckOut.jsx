import React, { useEffect, useState } from "react";
import { redirect } from "react-router-dom";
import { deleteAllProductInCart } from "~/services/cartService";
import { createOrder } from "~/services/orderService";
import { createUser } from "~/services/usersService";
import { useCart } from "~/context/CartContext";
import { useNavigate } from "react-router-dom";
import { getAllTransactions } from "~/services/orderService";
import { useRef } from "react";


// Remove mockAddress, use addressInfo prop instead
export default function CheckOut({ addressInfo, cartItems, onCancel }) {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [transactions, setTransactions] = useState([]);
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;
  const address = "Tỉnh/Thành phố: " + addressInfo.province + ", Quận/Huyện: " + addressInfo.district + ", Phường/Xã: " + addressInfo.commune + ", Địa chỉ cụ thể: " + addressInfo.street;
  const { fetchCartCount } = useCart();
  const navigate = useNavigate();
  const User = JSON.parse(localStorage.getItem("user"));

  // Sinh mã thanh toán
  const generatePaymentCode = () => {
    const prefix = "PAY";
    const timestamp = Date.now();
    const random = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}${timestamp}${random}`;
  };

  const paymentCodeRef = useRef(generatePaymentCode());
  const paymentCode = paymentCodeRef.current;

  // const paymentCode = "PAY17532888702323355";
  // const paymentDemo = "PAY17532888702323355- Ma GD ACSP/ PK19403xtfhgn4";
  const URL_QR = `https://qr.sepay.vn/img?acc=2004020423&bank=mb&amount=${total}&des=${paymentCode}`;

  const handleCreateOrder = async () => {
    const orderData = {
      idUser: User._id || User.id,
      address: address,
      fullName: addressInfo.fullName,
      phone: addressInfo.phone,
      statusPayment: paymentMethod, // "cod" hoặc "qr"
      orderDetails: cartItems.map(item => ({
        idProduct: item.idProduct._id,
        quantity: item.quantity,
        price: item.price
      })),
      total: total
    };
    console.log("Dữ liệu đơn hàng:", orderData);

    try {
      const result = await createOrder(orderData);
      console.log("Đơn hàng đã tạo:", result);
      if (result) {
        await deleteAllProductInCart(User._id || User.id);
        await fetchCartCount();
        navigate("/successful");
      }
    } catch (error) {
      console.log("Tạo đơn hàng thất bại:", error);
      alert("Không thể tạo đơn hàng. Vui lòng thử lại!");
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await getAllTransactions();
        const transactions = res.data?.transactions || [];
        for (const tx of transactions) {
          console.log("Kiểm tra thanh toán:", paymentCode);
          console.log("Kiểm tra giao dịch:", tx.transaction_content.trim());
          if (tx.transaction_content?.trim().startsWith(paymentCode)) {
            console.log("✅ Giao dịch khớp:", tx);
            clearInterval(interval);
            handleCreateOrder();
            break;
          }
        }
      } catch (err) {
        console.log("Lỗi kiểm tra giao dịch:", err);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-5xl mx-auto bg-gray-50 rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Thanh Toán Đơn Hàng</h2>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Product List */}
        <div className="flex-1 md:w-1/2 border-r pr-6">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Sản Phẩm</h3>
            {cartItems.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-base py-3 border-b last:border-b-0">
                <span className="font-medium text-gray-700">
                  {item.idProduct.nameProduct} <span className="text-gray-400">x{item.quantity}</span>
                </span>
                <span className="font-semibold text-indigo-600">
                  {(item.price * item.quantity).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
            ))}
            <div className="mt-6 space-y-1">
              <div className="flex justify-between text-sm">
                <span>Tạm tính:</span>
                <span className="font-semibold">
                  {subtotal.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  })}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Phí vận chuyển:</span>
                <span className="font-semibold">
                  {shipping.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  })}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Tổng cộng:</span>
                <span className="text-indigo-600">
                  {total.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Address & Payment */}
        <div className="flex-1 md:w-1/2 pl-0 md:pl-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Địa Chỉ Giao Hàng</h3>
            <div className="text-base space-y-2 bg-white p-4 rounded-lg border">
              <div><span className="font-medium text-gray-600">Họ tên:</span> {addressInfo?.fullName}</div>
              <div><span className="font-medium text-gray-600">Số điện thoại:</span> {addressInfo?.phone}</div>
              <div><span className="font-medium text-gray-600">Tỉnh/Thành phố:</span> {addressInfo?.province}</div>
              <div><span className="font-medium text-gray-600">Quận/Huyện:</span> {addressInfo?.district}</div>
              <div><span className="font-medium text-gray-600">Phường/Xã:</span> {addressInfo?.commune}</div>
              <div><span className="font-medium text-gray-600">Địa chỉ cụ thể:</span> {addressInfo?.street}</div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Phương Thức Thanh Toán</h3>
            <div className="space-y-3 mb-4">
              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="accent-indigo-600"
                />
                <div className="flex items-center gap-2">
                  <span className="text-lg">🚚</span>
                  <span className="text-gray-700 font-medium">Thanh toán khi nhận hàng (COD)</span>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="payment"
                  value="qr"
                  checked={paymentMethod === "qr"}
                  onChange={() => setPaymentMethod("qr")}
                  className="accent-pink-500"
                />
                <div className="flex items-center gap-2">
                  <span className="text-lg">📱</span>
                  <span className="text-gray-700 font-medium">Chuyển khoản qua QR Code</span>
                </div>
              </label>
            </div>

            {paymentMethod === "qr" && (
              <div className="mt-4 p-4 bg-white rounded-lg border">
                <div className="flex flex-col items-center">
                  <p className="text-sm text-gray-600 mb-3 text-center">
                    Quét mã QR bên dưới để thanh toán qua MBBank
                  </p>
                  <img
                    src={URL_QR}
                    alt="Mã QR thanh toán"
                    className="w-48 h-48 object-contain border-2 border-pink-300 rounded-xl shadow"
                  />
                  <div className="mt-3 text-center">
                    <p className="text-xs text-gray-500">Mã thanh toán: <span className="font-mono font-bold">{paymentCode}</span></p>
                    <p className="text-xs text-orange-600 mt-1">⏰ Hệ thống sẽ tự động xác nhận thanh toán</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4 mt-6">
              <button
                className="w-1/2 py-3 rounded text-center text-sm font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 transition duration-200 shadow border"
                type="button"
                onClick={onCancel}
              >
                Hủy
              </button>
              <button
                className={`w-1/2 py-3 rounded text-center text-sm font-semibold transition duration-200 ${paymentMethod === "cod"
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                disabled={paymentMethod !== "cod"}
                onClick={handleCreateOrder}
              >
                {paymentMethod === "cod" ? "Xác Nhận Đặt Hàng" : "Đang chờ thanh toán..."}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}