export function ExploreCard() {
  return (
    <div className="holder">
      <div className="card border w-96 hover:shadow-none relative flex flex-col mx-auto shadow-lg m-5">
        <img
          className="max-h-20 w-full relative top-0"
          src="https://unsplash.com/photos/h0Vxgz5tyXA/download?force=true&w=640"
          alt=""
        />
        <div className="profile w-full flex m-3 ml-4 text-white">
          <img
            className="w-28 h-28 p-1 bg-white rounded-full"
            src="https://images.pexels.com/photos/61100/pexels-photo-61100.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb"
            alt=""
          />
          <div className="mt-5 ml-3 flex flex-col">
            <div className="name font-bold break-words text-black">
              Praveen Kumar Singh.
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
