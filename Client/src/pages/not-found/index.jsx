import React from 'react'

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-gray-100">
    <div className="text-center">
      <div
        className="relative mx-auto w-11/12 max-w-md p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out"
        style={{
          animation: "fadeIn 1s ease-in-out",
        }}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          This Page Does Not Exist
        </h1>
        <p className="text-gray-600 mb-6">
          Oops! The page you are looking for doesn’t exist or has been moved.
        </p>
        <div className="flex justify-center">
          <a
            href="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
          >
            Go Back Home
          </a>
        </div>
      </div>
    </div>
  </div>
);
};




export default NotFound
