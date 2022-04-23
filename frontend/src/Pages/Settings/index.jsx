import { MoreIcon } from "../../Components";

export function Setting() {
  return (
    <div className="w-2/3 bg-white block p-2 mobile:w-full mobile:py-0 min-h-screen">
      <div className="w-full p-4 bg-indigo-100 flex text-center items-center gap-2 rounded-2xl">
        <h2 className="text-2xl font-bold">Settings</h2>
        <MoreIcon className="h-8 w-8" />
      </div>
    </div>
  );
}
