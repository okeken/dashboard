import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { HiOutlineX } from "react-icons/hi";

const Modal = ({ toggle = () => {}, isOpen = false, children }) => {
  return (
    <>
      <Dialog
        className="fixed inset-0 overflow-hidden"
        open={isOpen}
        onClose={toggle}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0 bg-black opacity-50" />

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <div className="relative w-screen max-w-md">
              <div className="relative">
                <div className="absolute top-0 left-16 ">
                  <button
                    className="text-gray-300 hover:text-white absolute top-0 right-0 m-4 focus:outline-none"
                    onClick={toggle}
                  >
                    <span className="sr-only">Close panel</span>
                    <HiOutlineX className="h-6 w-6" />
                  </button>
                </div>
                <div className="   shadow-xl overflow-y-scroll">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Modal;
