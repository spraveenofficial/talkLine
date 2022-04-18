export function ExploreCard() {
  return (
    <div className="w-max mobile:w-full mt-4 lg:w-full desktop:w-full">
      <div className="cursor-pointer card p-2 border hover:shadow-none relative flex flex-col shadow-lg">
        <div className="profile w-full flex m-3 ml-4 text-white">
          <img
            className="w-20 h-20 bg-white rounded-full"
            src="https://images.pexels.com/photos/61100/pexels-photo-61100.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb"
            alt=""
          />
          <div className="ml-3 flex flex-col">
            <div className="name font-bold break-words text-black">
              Praveen Kumar Singh
            </div>
            <p className="text-black font-sm">Hi, there i am using Talkline</p>
          </div>
        </div>
        <div className="buttons flex absolute bottom-0 font-bold right-0 text-xs text-gray-500 space-x-0 my-3.5 mr-3">
          <button className="bg-indigo-500 text-white p-2 font-semibold rounded-xl">
            Send Friend Request
          </button>
        </div>
      </div>
    </div>
  );
}
