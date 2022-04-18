import { ExploreCard, ExploreIcon } from "../../Components";
export function Explore() {
  return (
    <div className="max-w-fit w-2/3 bg-white block p-2 mobile:w-full mobile:py-0">
      <div className="w-full p-4 bg-indigo-100 flex text-center items-center gap-2 rounded-2xl">
        <h2 className="text-2xl font-bold">Explore Persons</h2>
        <ExploreIcon className="h-8 w-8" />
      </div>
      <div className="flex flex-wrap justify-between">
        <ExploreCard />
        <ExploreCard />
        <ExploreCard />
        <ExploreCard />
      </div>
    </div>
  );
}
