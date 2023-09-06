import { Link } from "react-router-dom";
const Card = (props) => {
  const { name = "...", number, numberOfAyahs, revelations } = props;
  return (
    <div>
      <Link
        className="lg:w-72 sm:w-60 h-full border-2 items-center flex p-2 rounded-md justify-between m-1"
        to={`/list-surah/${number}`}
      >
        <div className="flex justify-left pl-2">
          <div className="p-1 text-sky-900 text-xl flex justify-center">
            <p>{number.toLocaleString("ar-EG")}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 grid-flow-row">
          <div className="">
            <h1 className="text-lg text-sky-900 text-end">{name}</h1>
          </div>
          <div className="">
            <p className="text-end text-xs text-slate-500">
              Surah ke-{number} | {numberOfAyahs} Ayat | {revelations}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
