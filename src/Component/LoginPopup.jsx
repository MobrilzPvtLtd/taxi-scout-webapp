import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const LoginPopup = ({ onClose }) => {
    const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Animate in the popup after the component mounts
    setTimeout(() => setShow(true), 100);
  }, []);

  return (
    <div
      className={`fixed z-10 inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-500 ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white p-6 rounded-xl shadow-xl transform transition-transform duration-500 ${
          show ? "scale-100" : "scale-50"
        }`}
      >
        <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
          Exclusive Services Await!
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Login now to access our exclusive services and enjoy premium features!
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => {
              onClose();
              // Redirect to login page
          navigate("/login");
            }}
            className="px-6 py-2 bg-[#f99816] text-white font-semibold rounded-lg hover:bg-black transition"
          >
            Login Now
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-600 font-semibold rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
