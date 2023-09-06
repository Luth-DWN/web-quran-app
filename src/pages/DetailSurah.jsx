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

  useEffect(() => {
    axios
      .get(`https://quran-api-id.vercel.app/surahs/${params.id}`)
      .then((res) => {
        setSurah(res.data);
        setFilteredAyat(res.data.ayahs); // Inisialisasi daftar ayat
      })
      .catch((err) => {
        setError(err); // Set error state
        console.log(err.message);
      });
  }, [params.id]);

  // Fungsi untuk mencari ayat berdasarkan nomor ayat
  const handleSearchAyat = () => {
    if (searchAyat.trim() === "") {
      // Jika input pencarian kosong, tampilkan semua ayat
      setFilteredAyat(surah.ayahs);
    } else {
      // Jika input pencarian tidak kosong, filter ayat berdasarkan nomor ayat
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
              className="bg-sky-600 hover:bg-sky-800 text-white px-3 py-1 rounded-md"
              onClick={handleSearchAyat}
            >
              Cari
            </button>
          </div>
          {filteredAyat &&
            filteredAyat.map((ayah, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4">
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
                  <p className="text-gray-700">{ayah.tafsir.kemenag.long}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DetailSurah;
