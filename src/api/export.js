import axios from "axios";

export const exportfetch = async (params = {}) => {
  const res = await axios.post(
    "main/exporttocsv",
    params,
    {
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "blob",
    }
  );

  return res;
};
