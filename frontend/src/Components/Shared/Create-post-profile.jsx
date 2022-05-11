import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "..";
import { createNewPost } from "../../Redux/Actions";
import Picker from "emoji-picker-react";
export function CreatePostProfile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const state = useSelector((state) => state.newPost);
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
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

  const handleEmojiClick = (e, emojiObject) => {
    setCaption(caption + emojiObject.emoji);
    setIsEmojiOpen(false);
  };
  const handleNewPost = () => {
    if (caption === "") return;
    dispatch(
      createNewPost({
        caption,
        isPhoto: selectedImage !== null ? true : false,
        photoUrl: selectedImage,
        status: false,
      })
    );
    setCaption("");
    setSelectedImage(null);
  };
  const ModalToUploadPhoto = () => (
    <Modal isOpen={isFileUploadOpen}>
      <div className="extraOutline mb-5 justify-center p-4 bg-white w-max bg-whtie m-auto rounded-lg">
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
                accept="image/png, image/gif, image/jpeg"
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
    <div className="w-full border border-gray-600 border-t-1 mobile:w-full h-fit mt-2">
      <ModalToUploadPhoto />
      <div className="flex">
        <div className="w-auto h-fit m-2 rounded-full border-2 border-indigo-600">
          <img
            className="w-12 h-12 object-cover rounded-full shadow cursor-pointer"
            alt="User avatar"
            src={user.avatar}
          />
        </div>
        <div className="flex-1 px-2 pt-2 mt-2">
          <textarea
            className="h-20 outline-none resize-none bg-transparent text-black-400 font-medium text-lg w-full overflow-auto placeholder:text-black-400"
            rows="2"
            cols="50"
            placeholder="What's happening?"
            onChange={(e) => setCaption(e.target.value)}
            value={caption}
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
        <div className="w-64 px-2 relative">
          <div className="flex items-center">
            <div
              onClick={() => setIsFileUploadOpen(true)}
              className="cursor-pointer text-center px-1 m-2"
            >
              <p className="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
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
            <div
              onClick={() => setIsEmojiOpen(!isEmojiOpen)}
              className="cursor-pointer text-center py-2 m-2"
            >
              <p className="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
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
              </p>
            </div>
            {isEmojiOpen && (
              <div className="absolute z-50 left-0 top-16">
                <Picker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>
        </div>

        <div className="flex-1">
          <button
            onClick={() => handleNewPost()}
            className="bg-indigo-600 mt-5 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded-full mr-8 float-right"
          >
            {state.loading ? "Posting..." : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
}
