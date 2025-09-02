// // tableThreeAPI.js
// import axios from "axios";

// export const fetchTableThreeData = async (params = {}) => {
//   // console.log("params:>>", params);

//   const res = await axios.post(
//     "http://192.168.112.219:5209/pending_orders",
//     params
//   );
//   // console.log("res:>>", res);
//   return res.data;
// };

// tableThreeAPI.js

// 19/08/2025
import axios from "axios";

export const fetchTableThreeData = async (params = {}) => {
  const { current = 1, pageSize = 30 } = params.pagination || {};

  const res = await axios.get("main/orderBook", {
    params: {
      clientCode: "CP01",
      page: current,
      chunk: pageSize,
    },
    withCredentials: true,
  });

  return {
    all: res.data,
    data: res.data.orderBook || [],
    total: res.data.totalOrderCount || 0,
  };
};

// import axios from "axios";

// export const fetchTableThreeData = async (params = {}) => {
//   const { current = 1, pageSize = 30 } = params.pagination || {};

//   const res = await axios.request({
//     url: "service/orderBook",
//     method: "GET", // ✅ force GET
//     data: {
//       // ✅ request body (like Postman)
//       clientCode: "AA100",
//     },
//     params: {
//       // ✅ query string
//       clientCode: "CP01",
//       page: current,
//       chunk: pageSize,
//     },
//     withCredentials: true, // ✅ send cookies
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   return {
//     data: res.data.orderBook || [],
//     total: res.data.totalOrderCount || 0,
//   };
// };
