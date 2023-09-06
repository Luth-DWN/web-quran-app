import axios from "axios";

export const getQuran = async (callback) => {
  const response = await axios
    .get("https://quran-api-id.vercel.app/surahs")
    .then((res) => callback(res.data))
    .catch((err) => console.log(err));

  return response;
};

export const getSurah = async (callback, value) => {
  if(value === 0) {
    return [];
  }else{
    const response = await axios
      .get(`https://quran-api-id.vercel.app/surahs/${value}`)
      .then((res) => callback(res.data))
      .catch((err) => console.log(err.message));
  
    return response;
  }
  
};
