// 19/08/2025
// import axios from "axios";

// export const fetchTableOneData = async (params = {}) => {
//   // console.log("params:>>", params);

//   const res = await axios.post(
//     "http://172.16.47.230:5206/net_position_calc",
//     params,
//     {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   // console.log("res:>>", res);
//   return res.data;
// };

import axios from "axios";

export const fetchTableOneData = async (params = {}) => {
  const { current = 1, pageSize = 30 } = params.pagination || {};

  const res = await axios.get("main/netPosition", {
    params: {
      clientCode: "CP01",
      page: current,
      chunk: pageSize,
    },
    withCredentials: true, // 🔑 this ensures cookies (sessionid) are sent
  });

  return {
    all: res.data,
    data: res.data.netPosition || [],
    total: res.data.totalNetPositionCount || 0,
  };
};
