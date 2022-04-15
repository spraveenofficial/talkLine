import { CreatePost, Sidebar, EachPost } from "../../Components";

export function Home() {
  return (
    <div className="flex relative h-full mobile:flex-col">
      <Sidebar />
      <CreatePost />
      <aside
        className="w-2/5 pr-3 h-full
       relative mobile:w-full"
      >
        <div className="flex flex-col flex-shrink-1 h-full">
          <div className="fixed top-0 h-full mobile:relative">
            <div className="relative text-gray-300 p-5">
              <button type="submit" className="absolute ml-4 mt-3 mr-4">
                <svg
                  className="h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  id="Capa_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 56.966 56.966"
                  style={{ enableBackground: "new 0 0 56.966 56.966" }}
                  xmlSpace="preserve"
                  width="512px"
                  height="512px"
                >
                  <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                </svg>
              </button>
              <input
                type="search"
                name="search"
                placeholder="Search Twitter"
                className=" bg-dim-700 h-10 px-10 pr-5 w-full rounded-full text-sm focus:outline-none bg-purple-white shadow rounded border-0"
              />
            </div>
            <div className="max-w-full rounded-lg  bg-dim-700 overflow-hidden shadow-lg m-4">
              <div className="flex">
                <div className="flex-1 m-2">
                  <h2 className="px-4 py-2 text-xl font-semibold text-black">
                    Who to Connect
                  </h2>
                </div>
              </div>
              <hr className="border-gray-800" />
              <div className="flex flex-shrink-0">
                <div className="flex-1 ">
                  <div className="flex items-center w-48">
                    <div>
                      <img
                        className="inline-block h-10 w-auto rounded-full ml-4 mt-2"
                        src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png"
                        alt=""
                      />
                    </div>
                    <div className="ml-3 mt-3">
                      <p className="text-base leading-6 font-medium text-black">
                        Praveen
                      </p>
                      <p className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                        @ShonaDesign
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 px-4 py-2 m-2">
                  <a href className=" float-right">
                    <button className="bg-transparent hover:bg-gray-800 text-black font-semibold hover:text-black py-2 px-4 border border-white hover:border-transparent rounded-full">
                      Follow
                    </button>
                  </a>
                </div>
              </div>
              <hr className="border-gray-800" />
              <div className="flex flex-shrink-0">
                <div className="flex-1 ">
                  <div className="flex items-center w-48">
                    <div>
                      <img
                        className="inline-block h-10 w-auto rounded-full ml-4 mt-2"
                        src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png"
                        alt=""
                      />
                    </div>
                    <div className="ml-3 mt-3">
                      <p className="text-base leading-6 font-medium text-black">
                        Praveen
                      </p>
                      <p className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                        @ShonaDesign
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 px-4 py-2 m-2">
                  <a href className=" float-right">
                    <button className="bg-transparent hover:bg-gray-800 text-black font-semibold hover:text-black py-2 px-4 border border-white hover:border-transparent rounded-full">
                      Follow
                    </button>
                  </a>
                </div>
              </div>
              <hr className="border-gray-800" />
              {/*show more*/}
              <div className="flex">
                <div className="flex-1 p-4">
                  <h2 className="px-4 ml-2 w-48 font-bold text-blue-400">
                    Show more
                  </h2>
                </div>
              </div>
            </div>
            <div className="flow-root m-6 inline">
              <div className="flex-1">
                <a href="#">
                  <p className="text-sm leading-6 font-medium text-gray-500">
                    Terms Privacy Policy Cookies Imprint Ads info
                  </p>
                </a>
              </div>
              <div className="flex-2">
                <p className="text-sm leading-6 font-medium text-gray-600">
                  {" "}
                  © 2022 Talkline, Inc.
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
