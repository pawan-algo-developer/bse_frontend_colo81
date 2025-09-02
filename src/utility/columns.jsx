// export const net_position_columns = [
//   // { title: "id", dataIndex: "id" },
//   {
//     title: "InstrumentName",
//     dataIndex: "instrumentType",
//     sorter: true,
//     // width: 120,
//   },
//   {
//     title: "Symbol",
//     dataIndex: "symbol",
//     sorter: true,
//     // width: 120,
//   },

//   {
//     title: "Expiry",
//     dataIndex: "expiry",
//     filterSearch: true,
//     sorter: true,
//     // width: 120,
//   },
//   {
//     title: "StrikePrice",
//     dataIndex: "strikePrice",
//     // width: 70,
//     sorter: true,
//   },
//   {
//     title: "OptionType",
//     dataIndex: "optionType",
//     filters: [
//       { text: "CE", value: "CE" },
//       { text: "PE", value: "PE" },
//       { text: "XX", value: "XX" },
//     ],
//     // filteredValue: filters.OptionType || null,
//     // width: 50,
//   },
//   {
//     title: "tokenNo",
//     dataIndex: "token",
//     sorter: true,
//     // width: 80
//   },
//   // {
//   //   title: "ScripName",
//   //   dataIndex: "ScripName",
//   //   sorter: true,
//   //   // width: 190
//   // },
//   {
//     title: "BuyQty",
//     dataIndex: "buyQuantity",
//     // width: 90,
//     align: "right",
//   },
//   {
//     title: "BuyVal",
//     dataIndex: "buyValue",
//     // width: 120,
//     align: "right",
//     render: (value) => Number(value).toFixed(2),
//   },
//   // {
//   //   title: "BuyLot",
//   //   dataIndex: "BuyLot",
//   //   // width: 90,
//   //   align: "right",
//   // },
//   // {
//   //   title: "BuyAvg",
//   //   dataIndex: "BuyAvg",
//   //   // width: 120,
//   //   align: "right",
//   //   render: (value) => Number(value).toFixed(2),
//   // },
//   {
//     title: "SellQty",
//     dataIndex: "sellQuantity",
//     // width: 90,
//     align: "right",
//   },
//   {
//     title: "SellVal",
//     dataIndex: "sellValue",
//     // width: 120,
//     align: "right",
//     render: (value) => Number(value).toFixed(2),
//   },
//   // {
//   //   title: "SellLot",
//   //   dataIndex: "SellLot",
//   //   // width: 90,
//   //   align: "right",
//   // },
//   // {
//   //   title: "SellAvg",
//   //   dataIndex: "SellAvg",
//   //   // width: 120,
//   //   align: "right",
//   //   render: (value) => Number(value).toFixed(2),
//   // },
//   // {
//   //   title: "SellVal_Incl_Strike",
//   //   dataIndex: "SellVal_Incl_Strike",
//   //   // width: 170,
//   //   align: "right",
//   //   render: (value) => Number(value).toFixed(2),
//   // },
//   { title: "NetQty", dataIndex: "netQuantity", width: 90, align: "right" },
//   // {
//   //   title: "NetVal",
//   //   dataIndex: "NetVal",
//   //   // width: 120,
//   //   align: "right",
//   //   render: (value) => Number(value).toFixed(2),
//   // },
//   {
//     title: "NetPrice",
//     dataIndex: "netPrice",
//     // width: 120,
//     align: "right",
//     render: (value) => Number(value).toFixed(2),
//   },
//   // {
//   //   title: "LTP",
//   //   dataIndex: "LTP",
//   //   width: 70,
//   //   align: "right",
//   //   // render: (value) => Number(value).toFixed(2),
//   //   render: (value) => (
//   //     <div
//   //       style={{
//   //         // fontFamily: "monospace",

//   //         width: 70,

//   //         whiteSpace: "nowrap",

//   //         overflow: "hidden",

//   //         textOverflow: "ellipsis",

//   //         textAlign: "right",
//   //       }}
//   //     >
//   //       {Number(value).toFixed(2)}
//   //     </div>
//   //   ),
//   // },
//   // {
//   //   title: "Unrealized_PNL",
//   //   dataIndex: "Unrealized_PNL",
//   //   width: 110,
//   //   align: "right",
//   //   elipsis: true,
//   //   // render: (value) => Number(value).toFixed(2),
//   //   render: (value) => (
//   //     <div
//   //       style={{
//   //         // fontFamily: "monospace",

//   //         width: 100,

//   //         whiteSpace: "nowrap",

//   //         overflow: "hidden",

//   //         textOverflow: "ellipsis",

//   //         textAlign: "right",
//   //       }}
//   //     >
//   //       {Number(value).toFixed(2)}
//   //     </div>
//   //   ),
//   // },
//   // {
//   //   title: "Realized_PNL",
//   //   dataIndex: "Realized_PNL",
//   //   width: 110,
//   //   align: "right",
//   //   elipsis: true,
//   //   // render: (value) => Number(value).toFixed(2),
//   //   render: (value) => (
//   //     <div
//   //       style={{
//   //         // fontFamily: "monospace",

//   //         width: 100,

//   //         whiteSpace: "nowrap",

//   //         overflow: "hidden",

//   //         textOverflow: "ellipsis",

//   //         textAlign: "right",
//   //       }}
//   //     >
//   //       {Number(value).toFixed(2)}
//   //     </div>
//   //   ),
//   // },
//   {
//     title: "MTM",
//     dataIndex: "mtm",
//     width: 110,
//     align: "right",
//     elipsis: true,
//     // render: (value) => Number(value).toFixed(2),
//     render: (value) => (
//       <div
//         style={{
//           // fontFamily: "monospace",

//           width: 100,

//           whiteSpace: "nowrap",

//           overflow: "hidden",

//           textOverflow: "ellipsis",

//           textAlign: "right",
//         }}
//       >
//         {Number(value).toFixed(2)}
//       </div>
//     ),
//   },
// ];

//  Divider 21/08/2025

// export const net_position_columns = [
//   // { title: "id", dataIndex: "id" },
//   {
//     title: "InstrumentName",
//     dataIndex: "instrumentType",
//     sorter: true,
//     // width: 120,
//   },
//   {
//     title: "Symbol",
//     dataIndex: "symbol",
//     sorter: true,
//     // width: 120,
//   },

//   {
//     title: "Expiry",
//     dataIndex: "expiry",
//     filterSearch: true,
//     sorter: true,
//     // width: 120,
//   },
//   {
//     title: "StrikePrice",
//     dataIndex: "strikePrice",
//     // width: 70,
//     sorter: true,
//   },
//   {
//     title: "OptionType",
//     dataIndex: "optionType",
//     filters: [
//       { text: "CE", value: "CE" },
//       { text: "PE", value: "PE" },
//       { text: "XX", value: "XX" },
//     ],
//     // filteredValue: filters.OptionType || null,
//     // width: 50,
//   },
//   {
//     title: "tokenNo",
//     dataIndex: "token",
//     sorter: true,
//     // width: 80
//   },
//   // {
//   //   title: "ScripName",
//   //   dataIndex: "ScripName",
//   //   sorter: true,
//   //   // width: 190
//   // },
//   {
//     title: "BuyQty",
//     dataIndex: "buyQuantity",
//     // width: 90,
//     align: "right",
//   },
//   {
//     title: "BuyVal",
//     dataIndex: "buyValue",
//     // width: 120,
//     align: "right",
//     render: (value) => Number(value).toFixed(2),
//   },
//   {
//     title: "BuyLot",
//     dataIndex: "buyLot",
//     // width: 90,
//     align: "right",
//   },
//   // {
//   //   title: "BuyAvg",
//   //   dataIndex: "BuyAvg",
//   //   // width: 120,
//   //   align: "right",
//   //   render: (value) => Number(value).toFixed(2),
//   // },
//   {
//     title: "SellQty",
//     dataIndex: "sellQuantity",
//     // width: 90,
//     align: "right",
//   },
//   {
//     title: "SellVal",
//     dataIndex: "sellValue",
//     // width: 120,
//     align: "right",
//     render: (value) => Number(value).toFixed(2),
//   },
//   {
//     title: "SellLot",
//     dataIndex: "sellLot",
//     // width: 90,
//     align: "right",
//   },
//   // {
//   //   title: "SellAvg",
//   //   dataIndex: "SellAvg",
//   //   // width: 120,
//   //   align: "right",
//   //   render: (value) => Number(value).toFixed(2),
//   // },
//   // {
//   //   title: "SellVal_Incl_Strike",
//   //   dataIndex: "SellVal_Incl_Strike",
//   //   // width: 170,
//   //   align: "right",
//   //   render: (value) => Number(value).toFixed(2),
//   // },
//   { title: "NetQty", dataIndex: "netQuantity", width: 90, align: "right" },
//   // {
//   //   title: "NetVal",
//   //   dataIndex: "NetVal",
//   //   // width: 120,
//   //   align: "right",
//   //   render: (value) => Number(value).toFixed(2),
//   // },
//   {
//     title: "NetPrice",
//     dataIndex: "netPrice",
//     // width: 120,
//     align: "right",
//     render: (value) => Number(value).toFixed(2),
//   },
//   {
//     title: "LTP",
//     dataIndex: "ltp",
//     width: 70,
//     align: "right",
//     // render: (value) => Number(value).toFixed(2),
//     render: (value) => (
//       <div
//         style={{
//           // fontFamily: "monospace",

//           width: 70,

//           whiteSpace: "nowrap",

//           overflow: "hidden",

//           textOverflow: "ellipsis",

//           textAlign: "right",
//         }}
//       >
//         {Number(value).toFixed(2)}
//       </div>
//     ),
//   },
//   // {
//   //   title: "Unrealized_PNL",
//   //   dataIndex: "Unrealized_PNL",
//   //   width: 110,
//   //   align: "right",
//   //   elipsis: true,
//   //   // render: (value) => Number(value).toFixed(2),
//   //   render: (value) => (
//   //     <div
//   //       style={{
//   //         // fontFamily: "monospace",

//   //         width: 100,

//   //         whiteSpace: "nowrap",

//   //         overflow: "hidden",

//   //         textOverflow: "ellipsis",

//   //         textAlign: "right",
//   //       }}
//   //     >
//   //       {Number(value).toFixed(2)}
//   //     </div>
//   //   ),
//   // },
//   {
//     title: "Realized_PNL",
//     dataIndex: "realisedPL",
//     width: 110,
//     align: "right",
//     elipsis: true,
//     // render: (value) => Number(value).toFixed(2),
//     render: (value) => (
//       <div
//         style={{
//           // fontFamily: "monospace",

//           width: 100,

//           whiteSpace: "nowrap",

//           overflow: "hidden",

//           textOverflow: "ellipsis",

//           textAlign: "right",
//         }}
//       >
//         {Number(value).toFixed(2)}
//       </div>
//     ),
//   },
//   {
//     title: "MTM",
//     dataIndex: "MTM",
//     width: 110,
//     align: "right",
//     elipsis: true,
//     // render: (value) => Number(value).toFixed(2),
//     render: (value) => (
//       <div
//         style={{
//           // fontFamily: "monospace",

//           width: 100,

//           whiteSpace: "nowrap",

//           overflow: "hidden",

//           textOverflow: "ellipsis",

//           textAlign: "right",
//         }}
//       >
//         {Number(value).toFixed(2)}
//       </div>
//     ),
//   },
// ];

export const net_position_columns = [
  // { title: "id", dataIndex: "id" },
  {
    title: "InstrumentName",
    dataIndex: "instrumentType",
    sorter: true,
    // width: 120,
  },
  {
    title: "Symbol",
    dataIndex: "symbol",
    sorter: true,
    // width: 120,
  },

  {
    title: "Expiry",
    dataIndex: "expiry",
    filterSearch: true,
    sorter: true,
    // width: 120,
  },
  {
    title: "StrikePrice",
    dataIndex: "strikePrice",
    // width: 70,
    sorter: true,
  },
  {
    title: "OptionType",
    dataIndex: "optionType",
    filters: [
      { text: "CE", value: "CE" },
      { text: "PE", value: "PE" },
      { text: "XX", value: "XX" },
    ],
    // filteredValue: filters.OptionType || null,
    // width: 50,
  },
  {
    title: "tokenNo",
    dataIndex: "token",
    sorter: true,
    // width: 80
  },
  // {
  //   title: "ScripName",
  //   dataIndex: "ScripName",
  //   sorter: true,
  //   // width: 190
  // },
  {
    title: "BuyQty",
    dataIndex: "buyQuantity",
    // width: 90,
    align: "right",
  },
  {
    title: "BuyVal",
    dataIndex: "buyValue",
    // width: 120,
    align: "right",
    render: (value) => Number(value).toFixed(2),
  },
  {
    title: "BuyLot",
    dataIndex: "buyLot",
    // width: 90,
    align: "right",
  },
  {
    title: "BuyAvg",
    dataIndex: "buyAvg",
    // width: 120,
    align: "right",
    render: (value) => Number(value).toFixed(2),
  },
  {
    title: "SellQty",
    dataIndex: "sellQuantity",
    // width: 90,
    align: "right",
  },
  {
    title: "SellVal",
    dataIndex: "sellValue",
    // width: 120,
    align: "right",
    render: (value) => Number(value).toFixed(2),
  },
  {
    title: "SellLot",
    dataIndex: "sellLot",
    // width: 90,
    align: "right",
  },
  {
    title: "SellAvg",
    dataIndex: "sellAvg",
    // width: 120,
    align: "right",
    render: (value) => Number(value).toFixed(2),
  },
  {
    title: "SellVal_Incl_Strike",
    dataIndex: "SellVal_Incl_Strike",
    // width: 170,
    align: "right",
    render: (value) => Number(value).toFixed(2),
  },
  { title: "NetQty", dataIndex: "netQuantity", width: 90, align: "right" },
  {
    title: "NetVal",
    dataIndex: "netValue",
    // width: 120,
    align: "right",
    render: (value) => Number(value).toFixed(2),
  },
  {
    title: "NetPrice",
    dataIndex: "netPrice",
    // width: 120,
    align: "right",
    render: (value) => Number(value).toFixed(2),
  },
  {
    title: "LTP",
    dataIndex: "ltp",
    width: 70,
    align: "right",
    // render: (value) => Number(value).toFixed(2),
    render: (value) => (
      <div
        style={{
          // fontFamily: "monospace",

          width: 70,

          whiteSpace: "nowrap",

          overflow: "hidden",

          textOverflow: "ellipsis",

          textAlign: "right",
        }}
      >
        {Number(value).toFixed(2)}
      </div>
    ),
  },
  {
    title: "Unrealized_PNL",
    dataIndex: "unrealised",
    width: 110,
    align: "right",
    elipsis: true,
    // render: (value) => Number(value).toFixed(2),
    render: (value) => (
      <div
        style={{
          // fontFamily: "monospace",

          width: 100,

          whiteSpace: "nowrap",

          overflow: "hidden",

          textOverflow: "ellipsis",

          textAlign: "right",
        }}
      >
        {Number(value).toFixed(2)}
      </div>
    ),
  },
  {
    title: "Realized_PNL",
    dataIndex: "realisedPL",
    width: 110,
    align: "right",
    elipsis: true,
    // render: (value) => Number(value).toFixed(2),
    render: (value) => (
      <div
        style={{
          // fontFamily: "monospace",

          width: 100,

          whiteSpace: "nowrap",

          overflow: "hidden",

          textOverflow: "ellipsis",

          textAlign: "right",
        }}
      >
        {Number(value).toFixed(2)}
      </div>
    ),
  },
  {
    title: "MTM",
    dataIndex: "MTM",
    width: 110,
    align: "right",
    elipsis: true,
    // render: (value) => Number(value).toFixed(2),
    render: (value) => (
      <div
        style={{
          // fontFamily: "monospace",

          width: 100,

          whiteSpace: "nowrap",

          overflow: "hidden",

          textOverflow: "ellipsis",

          textAlign: "right",
        }}
      >
        {Number(value).toFixed(2)}
      </div>
    ),
  },
];
