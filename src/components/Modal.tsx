// src/components/Modal.jsx
import React from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

export default function Modal({ isOpen, onRequestClose, title, children }) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      className=" ml-4 mr-4 bg-light dark:bg-darkLight rounded-lg p-6 max-w-lg w-full shadow-lg"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <button
          onClick={onRequestClose}
          className="text-gray-500 hover:text-gray-700 text-3xl"
        >
          &times;
        </button>
      </div>
      {children}
    </ReactModal>
  );
}
