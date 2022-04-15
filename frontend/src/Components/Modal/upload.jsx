export function FileUpload() {
  return (
    <div className="z-50 backdrop-blur-sm modal overscroll-auto bg-slate-800 bg-opacity-50 flex justify-center items-center fixed w-full top-0 left-0 h-full">
      <div className="extraOutline justify-center p-4 bg-white w-max bg-whtie m-auto rounded-lg">
        <div
          className="p-5 relative border-4 border-dotted border-gray-300 rounded-lg mobile:w-full mobile:m-2 px-16 py-14"
        //   style={{ width: "450px", maxWidth: "90%" }}
        >
          <svg
            className="text-indigo-500 w-24 mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <div className="input_field flex flex-col w-max mx-auto text-center">
            <label>
              <input
                className="text-sm cursor-pointer w-36 hidden"
                type="file"
                multiple
              />
              <div className="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500">
                Select
              </div>
            </label>

            <div className="title text-indigo-500 uppercase">
              or drop files here
            </div>
          </div>
          <div className="close_btn absolute -top-10 -right-10 bg-white p-4 cursor-pointer hover:bg-gray-100 py-2 text-gray-600 rounded-full">
            X
          </div>
        </div>
      </div>
    </div>
  );
}
