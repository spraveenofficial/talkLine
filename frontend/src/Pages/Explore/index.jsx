import { ExploreCard, ExploreIcon } from "../../Components";
import { explorePersons } from "../../Redux/Actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
export function Explore() {
  const dispatch = useDispatch();
  const { users, loading, success } = useSelector((state) => state.explore);
  useEffect(() => {
    dispatch(explorePersons());
  }, []);
  return (
    <div className="w-2/3 bg-white block p-2 mobile:w-full mobile:py-0">
      <div className="w-full p-4 bg-indigo-100 flex text-center items-center gap-2 rounded-2xl">
        <h2 className="text-2xl font-bold">Explore People</h2>
        <ExploreIcon className="h-8 w-8" />
      </div>
      <div className="flex flex-wrap justify-between">
        {loading && (
          <div className="w-full flex flex-col justify-center text-center items-center mt-4">
            <div
              className="w-10 mb-10 h-10 rounded-full animate-spin
                    border-2 border-dashed border-black-600 border-t-black mr-1"
            ></div>
            <p>Getting Persons suggestions for you..</p>
          </div>
        )}
        {users.map((user) => (
          <ExploreCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
}
