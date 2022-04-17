import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, PencilIcon } from "../../Components";
import { updateBio } from "../../Redux/Actions";
export function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isOpenToChangeBio, setIsOpenToChangeBio] = useState(false);

  // Modal to Update Bio
  const ModalToUpdateBio = () => {
    const [bio, setBio] = useState("");
    return (
      <Modal isOpen={isOpenToChangeBio}>
        <div className="w-full flex flex-col">
          <h2 className="font-bold text-lg">Are you sure to Change Bio?</h2>
          <input
            className="p-2 border-2 mt-2  outline-none focus:border-indigo-600"
            type="text"
            placeholder="Enter your Bio"
            onChange={(event) => setBio(event.target.value)}
          />
          <div className="mt-10 w-full flex justify-between">
            <button
              onClick={() => setIsOpenToChangeBio(false)}
              className="bg-indigo-500 w-2/5 p-2 rounded-md text-md text-white"
            >
              No
            </button>
            <button
              onClick={() => {
                dispatch(updateBio(bio));
                setIsOpenToChangeBio(false);
              }}
              className="bg-red-500 p-2 w-2/5 rounded-md text-md text-white"
            >
              Update
            </button>
          </div>
        </div>
      </Modal>
    );
  };
  return (
    <div className="w-2/3 bg-white block py-10 mobile:w-full">
      <ModalToUpdateBio />
      <div className="mx-auto">
        <div className="w-full">
          <div className="w-full bg-blue-600 h-48 rounded-t-lg">
            <img
              src={user.cover}
              alt=""
              className="w-full max-h-full object-cover"
            />
          </div>
          <div className="absolute -mt-20 ml-5">
            <img
              src={user.avatar}
              className="bg-gray-100 border border-gray-300 h-36 w-40 rounded-lg shadow-md border-b border-primary"
              alt="userAvatar"
            />
          </div>
        </div>
        <div className="bg-primary border border-primary rounded-b-lg p-5 pt-20 flex flex-col">
          <h1 className="font-bold text-2xl">{user.name}</h1>
          <div className="flex text-center items-center">
            <p className="text-gray-600 font-semibold">{user.bio}</p>
            <PencilIcon
              onClick={() => setIsOpenToChangeBio(!isOpenToChangeBio)}
            />
          </div>
          <button className="bg-red-600 text-white mt-3 font-bold p-2 rounded-xl w-max hover:bg-red-800">
            Deactivate account
          </button>
          <div className="pt-8 flex gap-8">
            <div className="flex flex-col">
              <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-20"></div>
              <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-20"></div>
            </div>
            <div className="flex flex-col">
              <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-20"></div>
              <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-20"></div>
            </div>
            <div className="flex flex-col">
              <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-20"></div>
              <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-20"></div>
            </div>
            <div className="flex flex-col">
              <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-20"></div>
              <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-20"></div>
            </div>
          </div>
          <div className="py-5 break-all bbcode">
            <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-44"></div>
            <div className="mb-1 bg-gray-200 border border-gray-300 h-5 w-full h-40"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
