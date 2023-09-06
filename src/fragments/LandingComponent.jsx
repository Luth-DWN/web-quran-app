import { useEffect, useRef, useState } from "react";
import pray from "../assets/img/pray-bro.png";
import { Link } from "react-router-dom";

const LandingComponent = (props) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const image = useRef(null);
  const desc = useRef(null);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    if (windowWidth < 800) {
      image.current.className = "hidden";
      desc.current.className = "w-full grid content-center";
    } else {
      image.current.className = "w-1/4";
      desc.current.className = "w-3/4 grid content-center";
    }
  });

  const { img = pray, title = "...", children = "...", link1 = "", link2 = "", nameLink1 = "", nameLink2 = "" } = props;
  return (
    <div className="sm:flex pt-5 sm sm:gap-8">
      <div className="flex justify-center md:w-1/4" ref={image}>
        <img src={img} className="ml-4 object-cover" alt="" />
      </div>
      <div className="sm:w-3/4 grid content-center" ref={desc}>
        <h1 className="text-4xl text-sky-900 font-medium">{title}</h1>
        <p className="pt-4 indent-6 text-slate-500 text-justify">{children} </p>
        <div className="flex gap-3 pt-12 items-center">
          <h1 className="text-slate-500">Getting Started :</h1>
          <Link to={`${link1}`} className="bg-sky-600 hover:bg-sky-800 text-white px-3 py-1 rounded-md">{nameLink1}</Link>
          <Link to={`${link2}`} className="bg-sky-600 hover:bg-sky-800 text-white px-3 py-1 rounded-md">{nameLink2}</Link>
        </div>
      </div>
    </div>
  );
};

export default LandingComponent;
