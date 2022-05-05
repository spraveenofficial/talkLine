import { SearchBarforSideBar } from "./searchBar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react";
import { sendFriendRequest } from "../../Redux/Actions";
export function RightSidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigateToExplore = () => {
    navigate("/explore");
  };
  const { user } = useSelector((state) => state.auth);
  const suggestions = user.suggestions;

  const handleUserClick = (user, event) => {
    if (event.target.tagName === "BUTTON") {
      return (
        dispatch(sendFriendRequest(user._id)) &&
        dispatch({ type: "SENT_REQUEST_FROM_SUGGESTION", payload: user._id })
      );
    } else {
      navigate(`/user/${user._id}`);
    }
  };
  return (
    <div className="sticky left-0 top-0 w-2/6 text-white flex flex-col h-screen mobile:w-full mobile:h-full">
      <div className="pr-3 h-full flex flex-col">
        <SearchBarforSideBar />
        <div className="max-w-full rounded-lg  bg-dim-700 overflow-hidden shadow-lg m-4">
          <div className="flex">
            <div className="flex-1 m-2">
              <h2 className="px-4 py-2 text-xl font-semibold text-black">
                Who to Connect
              </h2>
            </div>
          </div>
          <hr className="border-gray-800" />
          {suggestions.map((eachUser) => {
            return (
              <Fragment key={eachUser._id}>
                <div className="flex flex-shrink-1">
                  <div className="w-full">
                    <div
                      onClick={(e) => handleUserClick(eachUser, e)}
                      className="flex p-2 cursor-pointer items-center w-full justify-between"
                    >
                      <div className="min-w-fit p-2">
                        <img
                          className="inline-block h-10 w-auto rounded-full"
                          src={eachUser.avatar}
                          alt={eachUser.name}
                        />
                      </div>
                      <div className="w-full">
                        <p className="text-base leading-6 font-medium text-black">
                          {eachUser.name}
                        </p>
                      </div>
                      <button
                        disabled={eachUser.isRequested}
                        className="min-w-fit float-left bg-indigo-600 hover:bg-indigo-800 text-white font-thin py-1 px-2 border border-white hover:border-transparent rounded-full"
                      >
                        {eachUser.isRequested ? "Request sent" : "Add Friend"}
                      </button>
                    </div>
                  </div>
                </div>
                <hr className="border-gray-800" />
              </Fragment>
            );
          })}
          <div className="flex">
            <div className="flex-1 p-4">
              <h2
                onClick={() => navigateToExplore()}
                className="px-4 ml-2 font-bold text-blue-400 cursor-pointer"
              >
                Show more
              </h2>
            </div>
          </div>
        </div>
        <div className="flow-root m-6 inline">
          <div className="flex-2">
            <p className="text-sm leading-6 font-medium text-gray-600">
              © 2022 Talkline, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
