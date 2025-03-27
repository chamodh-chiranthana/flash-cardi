import CurrentDeck from "./components/CurrentDeck";

import SiderBar from "./components/SideBar";

export default function Home() {
  return (
    <div className="grid grid-cols-12 h-screen w-full overflow-hidden">
      <div className="col-span-3 border-gray-400 border-r-2">
        <SiderBar />
      </div>
      <div className="col-span-9">
        <CurrentDeck />
      </div>
    </div>
  );
}
