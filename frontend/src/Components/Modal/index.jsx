import { useState, useEffect } from "react";

export function Modal() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  });
  return (
    show && (
      <div className="backdrop-blur-sm modal overscroll-auto bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
        <div className="bg-white px-16 py-14 rounded-md text-center">
          <h1 className="text-xl mb-4 font-bold text-slate-500">
            Are you Sure?
          </h1>
          <button
            onClick={() => setShow(!show)}
            className="bg-indigo-500 px-4 py-2 rounded-md text-md text-white"
          >
            Cancel
          </button>
          <button className="bg-red-500 px-7 py-2 ml-2 rounded-md text-md text-white">
            Ok
          </button>
        </div>
      </div>
    )
  );
}
