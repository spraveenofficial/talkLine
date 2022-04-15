import { useState } from "react";
import { useSelector } from "react-redux";
import { EachPost, Modal } from "..";
export function CreatePost() {
  const { user } = useSelector((state) => state.auth);
  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isFileUploadOpen, setIsFileUploadOpen] = useState(false);
  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      setSelectedImage(reader.result);
    };
    setIsFileUploadOpen(false);
  };
  console.log(selectedImage);
  const ModalToUploadPhoto = () => (
    <Modal isOpen={isFileUploadOpen}>
      <div className="extraOutline justify-center p-4 bg-white w-max bg-whtie m-auto rounded-lg">
        <div className="relative border-4 border-dotted border-gray-300 rounded-lg mobile:w-full mobile:m-2 px-16 py-14">
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
                onChange={handleSelectImage}
              />
              <div className="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500">
                Select
              </div>
            </label>
            <div className="title text-indigo-500 uppercase">
              or drop files here
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsFileUploadOpen(!isFileUploadOpen)}
          className="mt-5 text-center bg-red-500 p-1 w-20 rounded-md text-md text-white"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );

  return (
    <div className="w-2/3 border border-gray-600 h-auto border-t-0 mobile:w-full">
      <ModalToUploadPhoto />
      <hr className="border-gray-600" />
      <div className="flex">
        <div className="m-2 w-14 py-1">
          <img
            className="inline-block h-16 w-16 rounded-full"
            src={user.avatar}
            alt=""
          />
        </div>
        <div className="flex-1 px-2 pt-2 mt-2">
          <textarea
            className="h-20 outline-none resize-none bg-transparent text-black-400 font-medium text-lg w-full overflow-auto placeholder:text-black-400"
            rows="2"
            cols="50"
            placeholder="What's happening?"
          ></textarea>
        </div>
      </div>
      {selectedImage !== null && (
        <div className="relative">
          <img src={selectedImage} alt="" className="w-full h-80 pr-4 pl-4" />
          <p
            className="absolute text-gray-700 top-0 right-0 mr-5 font-semibold cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            X
          </p>
        </div>
      )}
      <div className="flex">
        <div className="w-10"></div>
        <div className="w-64 px-2">
          <div className="flex items-center">
            <div
              onClick={() => setIsFileUploadOpen(true)}
              className="flex-1 text-center px-1 py-1 m-2"
            >
              <p
                href="#"
                className="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300"
              >
                <svg
                  className="text-center h-7 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </p>
            </div>

            <div className="flex-1 text-center py-2 m-2">
              <a
                href="#"
                className="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300"
              >
                <svg
                  className="text-center h-7 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                  <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </a>
            </div>

            <div className="flex-1 text-center py-2 m-2">
              <a
                href="#"
                className="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300"
              >
                <svg
                  className="text-center h-7 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </a>
            </div>

            <div className="flex-1 text-center py-2 m-2">
              <a
                href="#"
                className="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300"
              >
                <svg
                  className="text-center h-7 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <button className="bg-indigo-600 mt-5 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded-full mr-8 float-right">
            Post
          </button>
        </div>
      </div>

      <hr className="border-indigo-600 border-4" />
      <EachPost />
    </div>
  );
}
