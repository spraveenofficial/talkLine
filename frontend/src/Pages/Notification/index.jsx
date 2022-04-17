import { PencilIcon } from "../../Components";

export function Notification() {
  return (
    <div className="w-2/3 bg-white block py-2 mobile:w-full mobile:py-0">
      <div className="w-full p-4 bg-cyan-100">
        <h2 className="text-2xl font-bold">Notifications</h2>
      </div>
      <div className="w-full p-4">
        <div className="flex flex-col">
          <div className="w-full">
            <div className="w-full h-20 flex items-center p-2 shadow">
              <img
                src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                alt=""
                className="w-10 h-10 rounded-xl object-cover mr-2"
              />
              <p className="text-black font-semibold">
                This is New Notification from TalkLine.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
