import Navbars from "../fragments/Navbars";
import LandingComponent from "../fragments/LandingComponent";

const Dashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbars />
      <div className="p-4 md:p-10">
        <LandingComponent
          title="//Quran"
          link1="/list-surah"
          link2="/list-tafsir"
          nameLink1="List Surah"
          nameLink2="List Tafsir"
        >
          adalah aplikasi berbasis web yang menghadirkan Alquran digital dengan
          akses mudah, nyaman, dan informatif. Dengan antarmuka yang bersih dan
          user-friendly, //Quran memungkinkan pengguna untuk menjelajahi teks
          suci Alquran, membaca ayat-ayat dengan terjemahan, serta
          mengeksplorasi tafsir dan konteks historis yang mendalam.
        </LandingComponent>
      </div>
    </div>
  );
};

export default Dashboard;
