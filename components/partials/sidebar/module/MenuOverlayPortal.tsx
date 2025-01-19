'use client';
import React from 'react';
import ReactDOM from 'react-dom';

const MenuOverlayPortal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      onClick={() => {
        onClose();
      }}
      className='fixed inset-0 z-50 h-full w-full flex-1 rounded-md bg-black/60 backdrop-blur-sm'
    ></div>,
    document.body,
  );
};

export default MenuOverlayPortal;
