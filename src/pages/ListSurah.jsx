import React, { useEffect, useState } from "react";
import Navbars from "../fragments/Navbars";
import { getQuran } from "../services/quran.services";
import Card from "../fragments/Card";

const ListSurah = () => {
  const [listSurah, setListSurah] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRevelation, setSelectedRevelation] = useState("all");

  useEffect(() => {
    getQuran((data) => {
      setListSurah(data);
    });
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handleRevelationChange = (e) => {
    const revelation = e.target.value;
    setSelectedRevelation(revelation);
  };

  const filteredSurah = listSurah.filter((surah) => {
    const nameMatches = surah.name.toLowerCase().includes(searchQuery.toLowerCase());
    const revelationMatches = selectedRevelation === "all" || surah.revelation === selectedRevelation;
    return nameMatches && revelationMatches;
  });

  const uniqueRevelations = [...new Set(listSurah.map((surah) => surah.revelation))];

  return (
    <div className="bg-white min-h-screen">
      <Navbars />
      <div className="px-4 sm:px-6 lg:px-8 py-10">
        <div className="pb-4">
          <div className="border-b-2 border-sky-900 flex justify-between items-center">
            <h1 className="text-2xl text-sky-900">List Surah</h1>
          </div>
          <div className="flex pt-3 items-center">
            <div className="flex-grow mr-2">
              <label htmlFor="search" className="text-slate-500 font-medium">
                Search :
              </label>
              <br />
              <input
                type="text"
                className="border-2 border-solid h-10 border-slate-500 rounded px-2 w-full"
                placeholder="Search..."
                id="search"
                name="search"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <div className="flex-grow">
              <label
                htmlFor="revelation"
                className="text-slate-500 font-medium ml-2"
              >
                Penurunan :
              </label>
              <br />
              <select
                className="border-2 border-solid h-10 border-slate-500 rounded px-2 w-full"
                value={selectedRevelation}
                onChange={handleRevelationChange}
                id="revelation"
                name="revelation"
              >
                <option value="all">-</option>
                {uniqueRevelations.map((revelation, index) => (
                  <option key={index} value={revelation}>
                    {revelation}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap">
          {filteredSurah.map((surah) => (
            <div key={surah.number} className="justify-center flex w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 mb-4">
              <Card
                name={surah.name}
                number={surah.number}
                numberOfAyahs={surah.numberOfAyahs}
                revelations={surah.revelation}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListSurah;
