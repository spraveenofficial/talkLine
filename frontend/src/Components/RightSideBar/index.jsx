import { SearchBarforSideBar } from "./searchBar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Fragment } from "react";
export function RightSidebar() {
  const navigate = useNavigate();
  const navigateToExplore = () => {
    navigate("/explore");
  };
  const { user } = useSelector((state) => state.auth);
  const suggestions = user.suggestions;
  console.log(suggestions);
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
                <div className="flex flex-shrink-0">
                  <div className="flex-1 ">
                    <div className="flex items-center w-48">
                      <div>
                        <img
                          className="inline-block h-10 w-auto rounded-full ml-4 mt-2"
                          src={eachUser.avatar}
                          alt={eachUser.name}
                        />
                      </div>
                      <div className="ml-3 mt-3">
                        <p className="text-base leading-6 font-medium text-black">
                          {eachUser.name}
                        </p>
                        <p className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                          @spraveenofficial
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 px-4 py-2 m-2">
                    <button className="float-right bg-indigo-600 hover:bg-indigo-800 text-white font-semibold py-2 px-4 border border-white hover:border-transparent rounded-full">
                      Request
                    </button>
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
              © 2022 Talkline, Inc.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
