// export const watchlist_columns = [
//   {
//     title: "InstrumentName",
//     dataIndex: "InstrumentName",
//     sorter: true,
//   },
//   {
//     title: "Symbol",
//     dataIndex: "Symbol",
//     sorter: true,
//     // width: 120,
//   },

//   {
//     title: "Expiry",
//     dataIndex: "Ser_Exp",
//     filterSearch: true,
//     sorter: true,
//     // width: 120,
//   },
//   {
//     title: "StrikePrice",
//     dataIndex: "StrikePrice",
//     // width: 70,
//     sorter: true,
//   },
//   {
//     title: "OptionType",
//     dataIndex: "OptionType",
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
//     dataIndex: "tokenNo",
//     sorter: true,
//     // width: 80
//   },

//   {
//     title: "LTP",
//     dataIndex: "LTP",
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
// ];

// Divider 14/08/2025

// export const watchlist_columns = [
//   {
//     title: "exchange",
//     dataIndex: "exchange",
//     sorter: true,
//   },
//   {
//     title: "segment",
//     dataIndex: "segment",
//     sorter: true,
//     // width: 120,
//   },

//   {
//     title: "token",
//     dataIndex: "token",
//     filterSearch: true,
//     sorter: true,
//     // width: 120,
//   },
//   {
//     title: "securityName",
//     dataIndex: "securityName",
//     // width: 70,
//     sorter: true,
//   },

//   {
//     title: "LTP",
//     dataIndex: "LTP",
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
// ];

// Divider 14/08/2025
import React from "react";
import { Tag } from "antd";

export const watchlist_columns = [
  {
    title: "Exchange",
    dataIndex: "exchange",
    // render: (text) => <Tag color="blue">{text}</Tag>,
  },
  {
    title: "Segment",
    dataIndex: "segment",
    // render: (text) => <Tag color="purple">{text}</Tag>,
  },
  {
    title: "Token",
    dataIndex: "token",
    align: "center",
  },
  {
    title: "Security Name",
    dataIndex: "securityName",
    // render: (text) => <strong>{text}</strong>,
  },
  {
    title: "LTP",
    dataIndex: "LTP",
    width: 70,
    align: "right",
    render: (value) => (
      <div
        style={{
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
    title: "LTT",
    dataIndex: "ltt",
    align: "right",
    render: (value) => {
      if (!value) return "—";
      const date = new Date(value * 1000); // Assuming timestamp is in seconds
      return date.toLocaleTimeString(); // Display time part of the timestamp
    },
  },
  {
    title: "BuyQty",
    dataIndex: "Bid1Quantity",
    width: 70,
    align: "right",
    render: (value) => (
      <div
        style={{
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
    title: "BuyPrice",
    dataIndex: "Bid1Price",
    width: 70,
    align: "right",
    render: (value) => (
      <div
        style={{
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
    title: "SellPrice",
    dataIndex: "Ask1Price",
    width: 70,
    align: "right",
    render: (value) => (
      <div
        style={{
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
    title: "SellQty",
    dataIndex: "Ask1Quantity",
    width: 70,
    align: "right",
    render: (value) => (
      <div
        style={{
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
    title: "LTQ",
    dataIndex: "ltq",
    width: 70,
    align: "right",
    render: (value) => (
      <div
        style={{
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
    title: "ATP",
    dataIndex: "atp",
    width: 70,
    align: "right",
    render: (value) => (
      <div
        style={{
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
    title: "High",
    dataIndex: "high",
    width: 70,
    align: "right",
    render: (value) => (
      <div
        style={{
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
    title: "Low",
    dataIndex: "low",
    width: 70,
    align: "right",
    render: (value) => (
      <div
        style={{
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
    title: "Open",
    dataIndex: "open",
    width: 70,
    align: "right",
    render: (value) => (
      <div
        style={{
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
    title: "Close",
    dataIndex: "close",
    width: 70,
    align: "right",
    render: (value) => (
      <div
        style={{
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
];
