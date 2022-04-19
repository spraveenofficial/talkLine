import { SearchIcon } from "..";
import { useState } from "react";
import axios from "axios";
import baseUrl from "../../Utils/baseurl";
import { useNavigate } from "react-router-dom";
export function SearchBarforSideBar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSearch = async (e) => {
    setLoading(true);
    setSearch(e.target.value);
    try {
      const { data } = await axios({
        method: "POST",
        url: `${baseUrl}/profile/search`,
        data: {
          name: search == " " ? e.target.value : search,
        },
        headers: {
          token: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setLoading(false);
      setSearchResults(data.users);
    } catch (error) {
      setLoading(false);
      setSearchResults([]);
    }
  };
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
        onChange={handleSearch}
        value={search}
      />
      {loading && (
        <button disabled="true" className="absolute mt-3 right-16">
          <div
            className="w-5 h-5 rounded-full animate-spin
                    border-2 border-dashed border-black-600 border-t-black mr-1"
          ></div>
        </button>
      )}
      <div className="w-full mt-2 relative">
        <div class="absolute w-full top-100 left-0 right-0 z-40 pt-2 pb-1 max-h-select overflow-y-auto">
          {searchResults.map((eachUser) => {
            return (
              <div
                class="flex flex-col "
                onClick={() => navigate(`user/${eachUser.id}`)}
              >
                <div class="mb-2 bg-indigo-100 cursor-pointer rounded-xl hover:bg-indigo-200">
                  <div class="flex items-center p-2 pl-2 border-l-2 relative ">
                    <div class="w-10 flex flex-col items-center">
                      <div class="flex relative justify-center items-center mt-1 rounded-full ">
                        <img
                          class="rounded-full w-10 h-10"
                          alt="userProfile"
                          src={eachUser.avatar}
                        />
                      </div>
                    </div>
                    <div class="w-full items-center flex">
                      <div class="mx-2 text-black font-semibold w-full hover:font-white">
                        {eachUser.name}
                        <div class="text-xs w-full normal-case font-semibold text-gray-500">
                          {eachUser.bio}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
