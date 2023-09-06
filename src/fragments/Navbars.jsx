import { Link } from "react-router-dom";

const Navbars = () => {
  return (
    <div className="w-full justify-between items-center flex bg-sky-900 h-16 px-5">
      <div className="flex justify-center text-white gap-3">
        <div className="">
          <Link to={"/"}>Dashboard</Link>
        </div>
        <div className="">
          <Link to={"/list-surah"}>Surah</Link>
        </div>
        <div className="">
          <Link to={"/list-tafsir"}>Tafsir</Link>
        </div>
      </div>
      <div className="rounded-md bg-white px-3 py-1x">
        <h1 className="text-sky-900 font-semibold text-xl tracking-widest">
          // Qur'an
        </h1>
      </div>
    </div>
  );
};

export default Navbars;
