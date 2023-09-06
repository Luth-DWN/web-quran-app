import React, { useEffect, useState } from "react";
import Navbars from "../fragments/Navbars";
import { getQuran, getSurah } from "../services/quran.services";

const ListTafsir = () => {
  const [listSurah, setListSurah] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [selectedSurahInfo, setSelectedSurahInfo] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
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
    // Fetch the list of Surah from your service
    getQuran((data) => {
      setListSurah(data);
    });
  }, []);

  useEffect(() => {
    if (selectedSurah !== null) {
      // Fetch the selected Surah information
      getSurah((data) => {
        setSelectedSurahInfo(data);
      }, selectedSurah);
    } else {
      // Reset selected Surah information if no Surah is selected
      setSelectedSurahInfo(null);
    }
  }, [selectedSurah]);

  const handleSurahSelection = (e) => {
    const surahNumber = e.target.value;
    setSelectedSurah(surahNumber === "null" ? null : surahNumber);
  };

  const handleAyahSelection = (e) => {
    const selectedAyahId = e.target.value;
    const element = document.getElementById(selectedAyahId);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <Navbars />
      <div className="px-4 sm:px-6 lg:px-8 pb-10">
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

        <div className="py-4">
          <div className="border-b-2 border-sky-900 flex justify-between items-center">
            <h1 className="text-2xl text-sky-900">Tafsir Surah</h1>
          </div>
          <div className="flex flex-col sm:flex-row pt-3">
            <div className="mb-4 sm:mb-0 sm:mr-4 flex-grow">
              <label
                htmlFor="surahSelect"
                className="text-slate-500 font-medium mb-2"
              >
                Select Surah:
              </label>
              <select
                id="surahSelect"
                name="surahSelect"
                className="border-2 border-solid h-10 border-slate-500 rounded px-2 w-full"
                value={selectedSurah || "null"}
                onChange={handleSurahSelection}
              >
                <option value="null">-</option>
                {listSurah.map((surah) => (
                  <option key={surah.number} value={surah.number}>
                    {surah.name} | {surah.number}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-grow">
              <label
                htmlFor="ayahsSelect"
                className="text-slate-500 font-medium mb-2"
              >
                Select Ayat:
              </label>
              <select
                id="ayahsSelect"
                name="ayahsSelect"
                className="border-2 border-solid h-10 border-slate-500 rounded px-2 w-full"
                onChange={handleAyahSelection}
              >
                <option value="null">-</option>
                {selectedSurahInfo &&
                  selectedSurahInfo.ayahs.map((ayah) => (
                    <option
                      key={ayah.number.inSurah}
                      value={ayah.number.inSurah}
                    >
                      Ayat Ke - {ayah.number.inSurah}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="py-2">
            {selectedSurahInfo && (
              <div>
                <h1 className="text-2xl text-sky-900">
                  {selectedSurahInfo.name}
                </h1>
                {selectedSurahInfo.ayahs.map((ayah) => (
                  <div
                    id={ayah.number.inSurah}
                    className="bg-white rounded-lg shadow-md p-4 mb-4"
                    key={ayah.number.inSurah}
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
                    <div className="mt-4">
                      <span className="text-gray-500">Tafsir</span>
                      <p className="text-gray-700">
                        {ayah.tafsir.kemenag.long}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListTafsir;
