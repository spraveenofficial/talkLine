import { CreatePost, Sidebar } from "../../Components";

export function Home() {
  return (
    <div className="p-relative flex">
      <Sidebar />
      <CreatePost />
    </div>
  );
}
