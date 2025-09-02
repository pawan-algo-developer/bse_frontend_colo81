import axios from "axios";

export const fetchTableTwoData = async (params = {}) => {
  const { current = 1, pageSize = 30 } = params.pagination || {};

  const res = await axios.get("main/tradeBook", {
    params: {
      clientCode: "CP01",
      page: current,
      chunk: pageSize,
    },
    withCredentials: true, // 🔑 this ensures cookies (sessionid) are sent
  });

  return {
    all: res.data,
    data: res.data.tradeBook || [],
    total: res.data.totalTradeCount || 0,
  };
};
