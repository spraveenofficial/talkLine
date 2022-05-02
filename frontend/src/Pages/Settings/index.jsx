import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MoreIcon, Modal } from "../../Components";
import { userLogout } from "../../Redux/Actions";
const ToggleComponent = () => (
  <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
    <input
      type="checkbox"
      name="toggle"
      id="toggle"
      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
    />
    <label
      htmlFor="toggle"
      className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
    ></label>
  </div>
);

export function Setting() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isSelectedLogout, setIsSelectedLogout] = useState(false);
  const ShowModalToLogout = () => (
    <Modal isOpen={isSelectedLogout}>
      <h1 className="text-xl mb-4 font-bold text-slate-500">Are you Sure?</h1>
      <button
        onClick={() => setIsSelectedLogout(!isSelectedLogout)}
        className="bg-indigo-500 px-4 py-2 w-20 rounded-md text-md text-white"
      >
        No
      </button>
      <button
        onClick={() => dispatch(userLogout())}
        className="bg-red-500 px-7 py-2 ml-2 rounded-md text-md text-white"
      >
        Yes
      </button>
    </Modal>
  );
  return (
    <>
      <ShowModalToLogout />
      <div className="w-2/3 bg-white block p-2 mobile:w-full mobile:py-0 min-h-screen">
        <div className="w-full p-4 bg-indigo-100 flex text-center items-center gap-2 rounded-2xl">
          <h2 className="text-2xl font-bold">Settings</h2>
          <MoreIcon className="h-8 w-8" />
        </div>
        <div className="mt-4 border rounded p-2 border-gray-300">
          <h1 className="text-xl font-bold">Account Zone</h1>
          <div className="flex justify-between h-10 items-center">
            <p className="font-medium">Activate DND</p>
            <ToggleComponent />
          </div>
          <div className="flex justify-between h-10 items-center">
            <p className="font-medium">Delete Account</p>
            <button className="bg-red-500 p-1 rounded text-white hover:bg-red-700">
              Delete
            </button>
          </div>
          <div className="flex justify-between h-10 items-center">
            <p className="font-medium">Change Password</p>
            <button className="bg-indigo-600 p-1 rounded text-white hover:bg-indigo-700">
              Change
            </button>
          </div>
        </div>
        <div className="mt-4 border rounded p-2 border-gray-300">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold">Personal Zone</h1>
            <button className="bg-red-500 p-1 rounded text-white hover:bg-red-700">
              Edit
            </button>
          </div>
          <div className="">
            <p className="font-medium">Name</p>
            <input
              type="text"
              className="w-full p-2 mb-2 border border-gray-400"
              defaultValue={user.name}
            />
          </div>
          <div className="">
            <p className="font-medium">Bio</p>
            <input
              type="text"
              className="w-full p-2 mb-2 border border-gray-400"
              defaultValue={user.bio}
            />
          </div>
        </div>
        <button
          onClick={() => setIsSelectedLogout(!isSelectedLogout)}
          className="bg-red-500 mt-4 w-full rounded p-2 text-white"
        >
          Logout
        </button>
      </div>
    </>
  );
}
