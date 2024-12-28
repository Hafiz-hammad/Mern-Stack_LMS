import React from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

const CongratulationsScreen = ({ isVisible, onClose }) => {
  return (
    <>
      {isVisible && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          {/* Confetti Effect */}
          <Confetti width={window.innerWidth} height={window.innerHeight} />

          {/* Animated Card */}
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg text-center"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 150 }}
          >
            <h1 className="text-4xl font-bold text-green-500 mb-4">
              🎉 Congratulations! 🎉
            </h1>
            <p className="text-lg mb-6">You've successfully completed the action!</p>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default CongratulationsScreen;
