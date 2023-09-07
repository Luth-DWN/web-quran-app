import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbars from "../fragments/Navbars";

const DetailSurah = () => {
  const params = useParams();
  const [surah, setSurah] = useState([]);
  const [searchAyat, setSearchAyat] = useState("");
  const [filteredAyat, setFilteredAyat] = useState([]);
  const [error, setError] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    axios
      .get(`https://quran-api-id.vercel.app/surahs/${params.id}`)
      .then((res) => {
        setSurah(res.data);
        setFilteredAyat(res.data.ayahs);
      })
      .catch((err) => {
        setError(err);
        console.log(err.message);
      });
  }, [params.id]);

  const handleSearchAyat = () => {
    if (searchAyat.trim() === "") {
      setFilteredAyat(surah.ayahs);
    } else {
      const filtered = surah.ayahs.filter((ayah) =>
        ayah.number.inSurah.toString().includes(searchAyat)
      );
      setFilteredAyat(filtered);
    }
  };

  if (error) {
    return (
      <div>
        <Navbars />
        <div className="p-4 md:p-10">
          <div className="text-red-500">Error: {error.message}</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {scrollY > 200 && (
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="fixed bottom-4 right-4 md:bottom-8 md:right-8 lg:bottom-12 lg:right-12 bg-sky-900 text-white py-2 px-4 rounded-full cursor-pointer"
        >
          Back to Top
        </button>
      )}
      <Navbars />
      <div className="p-4 md:p-10">
        <div className="border-solid border-b-2 border-sky-900">
          <h1 className="text-2xl md:text-4xl text-sky-900 font-medium">
            {surah.name}
          </h1>
        </div>
        <div className="mt-4">
          <div className="flex items-center space-x-4 mb-4">
            <label className="text-gray-500">Cari Ayat:</label>
            <input
              type="text"
              className="border-2 border-solid h-7 border-slate-500 rounded px-2"
              placeholder="Nomor Ayat"
              value={searchAyat}
              onChange={(e) => setSearchAyat(e.target.value)}
            />
            <button
              className="bg-sky-600 h-7 hover:bg-sky-800 text-white px-3 py-1 rounded-md"
              onClick={handleSearchAyat}
            >
              Cari
            </button>
          </div>
          <div className="">
            {filteredAyat &&
              filteredAyat.map((ayah, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-4 mb-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-gray-500">
                        Ayat Ke - {ayah.number.inSurah}
                      </span>
                      <h2 className="text-2xl font-bold">
                        {ayah.number.inSurah.toLocaleString("ar-EG")}
                      </h2>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-500">Arabic Text</span>
                      <p className="text-lg font-bold">{ayah.arab}</p>
                    </div>
                  </div>
                  <div>
                    <audio
                      controls
                      className="w-full h-8 border border-solid border-slate-500 rounded mt-4"
                      src={ayah.audio.minshawi}
                    />
                  </div>
                  <div className="mt-4">
                    <span className="text-gray-500">Terjemahan</span>
                    <p className="text-gray-700">{ayah.translation}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSurah;
