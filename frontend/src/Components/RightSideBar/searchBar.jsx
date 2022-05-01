import { SearchIcon } from "..";
import { useState } from "react";
import axios from "axios";
import baseUrl from "../../Utils/baseurl";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "../../Utils/debounce";
export function SearchBarforSideBar() {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [noResult, setNoResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSearch = async (e) => {
    setLoading(true);
    setSearchResults([]);
    const { value } = e.target;
    try {
      if (value === "") {
        setNoResult(false);
        setSearchResults([]);
        return setLoading(false);
      }
      const { data } = await axios({
        method: "POST",
        url: `${baseUrl}/profile/search`,
        data: {
          name: value,
        },
        headers: {
          token: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setLoading(false);
      setSearchResults(data.users);
    } catch (error) {
      setNoResult(true);
      setLoading(false);
      setSearchResults([]);
    }
  };
  const handleType = useCallback(debounce(handleSearch), []);
  return (
    <div className="relative text-black p-5">
      <button type="submit" className="absolute ml-4 mt-3 mr-4">
        <SearchIcon />
      </button>
      <input
        type="search"
        name="search"
        placeholder="Search Users of Talkine"
        className=" bg-dim-700 font-black h-10 px-10 pr-5 w-full rounded-full text-sm focus:outline-none bg-purple-white shadow rounded border-0"
        onChange={handleType}
      />
      {loading && (
        <button disabled={true} className="absolute mt-3 right-16">
          <div
            className="w-5 h-5 rounded-full animate-spin
                    border-2 border-dashed border-black-600 border-t-black mr-1"
          ></div>
        </button>
      )}
      <div className="w-full relative">
        {searchResults.length > 0 || noResult ? (
          <div className="w-full mt-2 absolute">
            <div className="absolute w-full bg-indigo-500 p-2 rounded-lg top-100 left-0 right-0 z-40 pt-2 pb-1 max-h-select overflow-y-auto">
              {searchResults.map((eachUser) => {
                return (
                  <div
                    className="flex flex-col"
                    onClick={() => navigate(`/user/${eachUser.id}`)}
                  >
                    <div className="mb-2 bg-indigo-100 cursor-pointer rounded-xl hover:bg-indigo-200">
                      <div className="flex items-center p-2 pl-2 relative">
                        <div className="w-10 flex flex-col items-center">
                          <div className="flex relative justify-center items-center mt-1 rounded-full ">
                            <img
                              className="rounded-full w-10 h-10"
                              alt="userProfile"
                              src={eachUser.avatar}
                            />
                          </div>
                        </div>
                        <div className="w-11/12 items-center flex">
                          <div className="mx-2 text-black font-semibold hover:font-white whitespace-nowrap overflow-hidden text-ellipsis">
                            {eachUser.name}
                            <div className="text-xs w-full normal-case font-semibold text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
                              {eachUser.bio}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {noResult && searchResults.length === 0 && (
                <div className="flex flex-col items-center justify-center h-10">
                  <div className="text-center text-white text-md font-semibold">
                    No Result Found
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
