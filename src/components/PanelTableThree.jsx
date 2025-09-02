// // PanelTableThree.jsx
// import React, { useEffect, useState, useRef, useMemo } from "react";
// import { Table, ConfigProvider } from "antd";
// import { fetchTableThreeData } from "../api/tableThreeAPI";

// const PanelTableThree = () => {
//   const [data, setData] = useState([]);
//   const [pagination, setPagination] = useState({
//     current: 1,
//     pageSize: 30,
//     total: 0,
//   });
//   const [loading, setLoading] = useState(false);
//   const [sorter, setSorter] = useState({});
//   const [filters, setFilters] = useState({
//     orderStatus: ["pending", "partiallyfilled"],
//   });
//   const [filterDropdownVisible, setFilterDropdownVisible] = useState({});

//   const tableToken = {
//     Table: {
//       cellPaddingBlock: 1,
//       cellPaddingInline: 1,
//       borderRadius: 2,
//       fontSize: 12,
//       headerBg: "#f5f5f5",
//       headerSplitColor: "#e8e8e8",
//       rowHoverBg: "#f0f0f0",
//     },
//   };

//   const sorterRef = useRef({});

//   const filtersRef = useRef(filters);

//   const fetchData = async (params = {}) => {
//     setLoading(true);
//     try {
//       const result = await fetchTableThreeData(params);

//       // transform API fields → table row
//       const mappedData = result.data.map((item, idx) => ({
//         id: item.orderNumber || idx,
//         logTime: new Date((item.logTime + 315512999) * 1000).toLocaleString(),
//         orderStatus: item.status,
//         rejectReason: item.rejectReason,
//         settlor: item.participantCode?.trim(),
//         userID: item.clientCode?.trim(),
//         instrumentName: item.instrumentType,
//         tokenNo: item.token,
//         filler: item.filler,
//         symbol: item.symbol?.trim(),
//         // expiryDate: new Date(item.expiry * 1000).toLocaleDateString(), // epoch to date
//         expiryDate: new Date(
//           (item.expiry + 315512999) * 1000
//         ).toLocaleDateString(),

//         strikePrice: item.strikePrice / 100,
//         optionType: item.optionType,
//         buySellAction: item.buySellIndicator === 1 ? "B" : "S",
//         price: item.price,
//         // volume: item.filler, // not sure – looks like qty
//         algoID: item.algoID, // mapped since API has no explicit field
//       }));

//       setData(mappedData);
//       setPagination({
//         current: params.pagination?.current || pagination.current,
//         total: result.total,
//         pageSize: params.pagination?.pageSize || pagination.pageSize,
//       });
//     } catch (err) {
//       console.error("TableThree fetch error", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const paginationRef = useRef(pagination);
//   useEffect(() => {
//     paginationRef.current = pagination;
//   }, [pagination]);

//   useEffect(() => {
//     fetchData();
//     const interval = setInterval(() => {
//       // Only fetch if no filter dropdown is visible
//       if (!Object.values(filterDropdownVisible).some((visible) => visible)) {
//         fetchData({
//           pagination: paginationRef.current,
//           sorter: sorterRef.current,
//           filters: filtersRef.current,
//         });
//       }
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [filterDropdownVisible]);

//   const handleTableChange = (newPagination, newFilters, newSorter) => {
//     setPagination(newPagination);
//     setSorter(newSorter);
//     setFilters(newFilters);
//     sorterRef.current = newSorter;
//     filtersRef.current = newFilters;
//     fetchData({
//       pagination: newPagination,
//       sorter: newSorter,
//       filters: newFilters,
//     });
//   };

//   const columns = [
//     {
//       title: "created",
//       dataIndex: "logTime",
//       sorter: true,
//       width: 100,
//     },
//     {
//       title: "orderStatus",
//       dataIndex: "orderStatus",
//       // sorter: true,
//       filters: [
//         { text: "pending", value: "pending" },
//         { text: "filled", value: "filled" },
//         { text: "partiallyfilled", value: "partiallyfilled" },
//         { text: "cancelled", value: "cancelled" },
//         { text: "rejected", value: "rejected" },
//       ],
//       filteredValue: filters.orderStatus || null,
//       width: 100,
//     },
//     {
//       title: "rejectReason",
//       dataIndex: "errorCode",
//       sorter: true,
//       width: 50,
//     },
//     {
//       title: "settlor",
//       dataIndex: "settlor",
//       sorter: true,
//       width: 50,
//     },

//     {
//       title: "traderID",
//       dataIndex: "userID",
//       sorter: true,
//       width: 50,
//     },
//     {
//       title: "instrumentName",
//       dataIndex: "instrumentName",
//       sorter: true,
//       width: 100,
//     },
//     {
//       title: "tokenNo",
//       dataIndex: "tokenNo",
//       sorter: true,
//       width: 50,
//     },
//     {
//       title: "symbol",
//       dataIndex: "symbol",
//       sorter: true,
//       width: 100,
//     },
//     {
//       title: "expiryDate",
//       dataIndex: "expiryDate",
//       sorter: true,
//       width: 50,
//     },
//     {
//       title: "strikePrice",
//       dataIndex: "strikePrice",
//       sorter: true,
//       width: 50,
//     },
//     {
//       title: "optionType",
//       dataIndex: "optionType",
//       filters: [
//         { text: "CE", value: "CE" },
//         { text: "PE", value: "PE" },
//         { text: "XX", value: "XX" },
//       ],
//       filteredValue: filters.optionType || null,
//       width: 50,
//     },
//     {
//       title: "buySellAction",
//       dataIndex: "buySellAction",
//       sorter: true,
//       filters: [
//         { text: "BUY", value: "B" },
//         { text: "SELL", value: "S" },
//       ],
//       filteredValue: filters.buySellAction || null,
//       width: 10,
//       // render: (text) => (
//       //   <span style={{ color: text === 'BUY' ? 'green' : text === 'SELL' ? 'red' : 'inherit', fontWeight: 'bold' }}>
//       //     {text}
//       //   </span>
//       // ),
//     },
//     {
//       title: "price",
//       dataIndex: "price",
//       sorter: true,
//       align: "right",
//       width: 50,
//       render: (value) => Number(value).toFixed(2),
//     },
//     // {
//     //   title: "volume",
//     //   dataIndex: "volume",
//     //   sorter: true,
//     //   align: "right",
//     //   width: 50,
//     // },
//     {
//       title: "filler",
//       dataIndex: "filler",
//       sorter: true,
//       align: "right",
//       width: 50,
//     },

//     {
//       title: "algoID",
//       dataIndex: "algoID",
//       sorter: true,
//       width: 50,
//     },
//   ];

//   const memoizedColumns = useMemo(
//     () =>
//       columns.map((col) => ({
//         ...col,
//         filterDropdownProps: {
//           open: filterDropdownVisible[col.dataIndex],
//           onOpenChange: (visible) => {
//             setFilterDropdownVisible((prev) => ({
//               ...prev,
//               [col.dataIndex]: visible,
//             }));
//           },
//         },
//       })),
//     [columns, filterDropdownVisible]
//   );

//   const memoizedComponents = useMemo(
//     () => ({
//       header: {
//         cell: (props) => (
//           <th
//             {...props}
//             style={{
//               ...props.style,
//               position: "sticky",
//               top: "32px",
//               zIndex: 2,
//             }}
//           >
//             {props.children}
//           </th>
//         ),
//       },
//     }),
//     []
//   );

//   return (
//     <>
//       <style>
//         {`
//   .buy-row td {
//     color: blue !important;

//   }
//   .sell-row td {
//     color: red !important;

//   }
//   .custom-table .ant-table-cell {
//     padding: 1px 3px !important; /* Adjust padding as needed */

//   }

//   .custom-table .ant-table-thead > tr > th {
//     text-align: left !important;
//   }

// `}
//       </style>
//       <ConfigProvider theme={{ components: tableToken }}>
//         <Table
//           className="custom-table"
//           bordered
//           size="small"
//           dataSource={data}
//           columns={memoizedColumns}
//           rowClassName={(record) => {
//             if (record.buySellAction === "B") return "buy-row";
//             if (record.buySellAction === "S") return "sell-row";
//             return "";
//           }}
//           rowKey="id"
//           pagination={{
//             ...pagination,
//             size: "small",
//             position: ["bottomRight"],
//             showSizeChanger: true,
//             showQuickJumper: true,
//             pageSizeOptions: ["10", "20", "30", "50"],
//             showTotal: (total, range) =>
//               `${range[0]}-${range[1]} of ${total} items`,
//           }}
//           onChange={handleTableChange}
//           components={memoizedComponents}
//           style={{ fontSize: "5px" }}
//         />
//       </ConfigProvider>
//     </>
//   );
// };

// export default PanelTableThree;

// PanelTableThree.jsx
import React, { useEffect, useState, useRef, useMemo } from "react";
import { Table, ConfigProvider } from "antd";
import { fetchTableThreeData } from "../api/tableThreeAPI";
import { useDispatch } from "react-redux";
import { setTableThreeStatus } from "../../store/omsStatusSlice";
const PanelTableThree = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 30,
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const [sorter, setSorter] = useState({});
  const [filters, setFilters] = useState({
    orderStatus: ["pending", "partiallyfilled"],
  });
  const [filterDropdownVisible, setFilterDropdownVisible] = useState({});

  const tableToken = {
    Table: {
      cellPaddingBlock: 1,
      cellPaddingInline: 1,
      borderRadius: 2,
      fontSize: 12,
      headerBg: "#f5f5f5",
      headerSplitColor: "#e8e8e8",
      rowHoverBg: "#f0f0f0",
    },
  };

  const sorterRef = useRef({});

  const filtersRef = useRef(filters);

  const fetchData = async (params = {}) => {
    setLoading(true);
    try {
      const result = await fetchTableThreeData(params);
      console.log("omsstatus::>>", result.all?.omsStatus);
      dispatch(setTableThreeStatus(result.all?.omsStatus));
      // transform API fields → table row
      const mappedData = result.data.map((item, idx) => ({
        id: idx,
        logTime: new Date(
          Math.floor(item.logTime / 1_000_000)
        ).toLocaleString(),
        orderStatus: item.status,
        rejectReason: item.rejectReason,
        settlor: item.participantCode?.trim(),
        userID: item.clientCode?.trim(),
        instrumentName: item.instrumentType,
        tokenNo: item.token,
        filler: item.filler,
        symbol: item.symbol?.trim(),

        // expiryDate: new Date((item.expiry + 315512999) * 1000)
        //   .toLocaleDateString("en-GB", {
        //     day: "2-digit",
        //     month: "short",
        //     year: "numeric",
        //   })
        //   .replace(/ /g, "")
        //   .toUpperCase(),
        expiryDate: item.expiry,

        strikePrice: item.strikePrice / 100,
        optionType: item.optionType,
        buySellAction: item.buySellIndicator === 1 ? "B" : "S",
        price: item.price / 100000000,
        volume: item.volume,
        remainingVolume: item.remainingVolume,
        algoID: item.algoID,
      }));

      setData(mappedData);
      setPagination({
        current: params.pagination?.current || pagination.current,
        total: result.total,
        pageSize: params.pagination?.pageSize || pagination.pageSize,
      });
    } catch (err) {
      console.error("TableThree fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  const paginationRef = useRef(pagination);
  useEffect(() => {
    paginationRef.current = pagination;
  }, [pagination]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      // Only fetch if no filter dropdown is visible
      if (!Object.values(filterDropdownVisible).some((visible) => visible)) {
        fetchData({
          pagination: paginationRef.current,
          sorter: sorterRef.current,
          filters: filtersRef.current,
        });
      }
    }, 500);
    return () => clearInterval(interval);
  }, [filterDropdownVisible]);

  const handleTableChange = (newPagination, newFilters, newSorter) => {
    setPagination(newPagination);
    setSorter(newSorter);
    setFilters(newFilters);
    sorterRef.current = newSorter;
    filtersRef.current = newFilters;
    fetchData({
      pagination: newPagination,
      sorter: newSorter,
      filters: newFilters,
    });
  };

  const columns = [
    {
      title: "created",
      dataIndex: "logTime",
      sorter: true,
      width: 100,
    },
    {
      title: "orderStatus",
      dataIndex: "orderStatus",
      // sorter: true,
      filters: [
        { text: "pending", value: "pending" },
        { text: "filled", value: "filled" },
        { text: "partiallyfilled", value: "partiallyfilled" },
        { text: "cancelled", value: "cancelled" },
        { text: "rejected", value: "rejected" },
      ],
      filteredValue: filters.orderStatus || null,
      width: 100,
    },
    {
      title: "rejectReason",
      dataIndex: "rejectReason",
      sorter: true,
      width: 50,
    },
    {
      title: "settlor",
      dataIndex: "settlor",
      sorter: true,
      width: 50,
    },

    {
      title: "traderID",
      dataIndex: "userID",
      sorter: true,
      width: 50,
    },
    {
      title: "instrumentName",
      dataIndex: "instrumentName",
      sorter: true,
      width: 100,
    },
    {
      title: "tokenNo",
      dataIndex: "tokenNo",
      sorter: true,
      width: 50,
    },
    {
      title: "symbol",
      dataIndex: "symbol",
      sorter: true,
      width: 100,
    },
    {
      title: "expiryDate",
      dataIndex: "expiryDate",
      sorter: true,
      width: 50,
    },
    {
      title: "strikePrice",
      dataIndex: "strikePrice",
      sorter: true,
      width: 50,
    },
    {
      title: "optionType",
      dataIndex: "optionType",
      filters: [
        { text: "CE", value: "CE" },
        { text: "PE", value: "PE" },
        { text: "XX", value: "XX" },
      ],
      filteredValue: filters.optionType || null,
      width: 50,
    },
    {
      title: "buySellAction",
      dataIndex: "buySellAction",
      sorter: true,
      filters: [
        { text: "BUY", value: "B" },
        { text: "SELL", value: "S" },
      ],
      filteredValue: filters.buySellAction || null,
      width: 10,
      // render: (text) => (
      //   <span style={{ color: text === 'BUY' ? 'green' : text === 'SELL' ? 'red' : 'inherit', fontWeight: 'bold' }}>
      //     {text}
      //   </span>
      // ),
    },
    {
      title: "price",
      dataIndex: "price",
      sorter: true,
      align: "right",
      width: 50,
      render: (value) => Number(value).toFixed(2),
    },
    {
      title: "volume",
      dataIndex: "volume",
      sorter: true,
      align: "right",
      width: 50,
    },
    {
      title: "rem_vol",
      dataIndex: "remainingVolume",
      sorter: true,
      align: "right",
      width: 50,
    },
    {
      title: "filler",
      dataIndex: "filler",
      sorter: true,
      align: "right",
      width: 50,
    },

    {
      title: "algoID",
      dataIndex: "algoID",
      sorter: true,
      width: 50,
    },
  ];

  const memoizedColumns = useMemo(
    () =>
      columns.map((col) => ({
        ...col,
        filterDropdownProps: {
          open: filterDropdownVisible[col.dataIndex],
          onOpenChange: (visible) => {
            setFilterDropdownVisible((prev) => ({
              ...prev,
              [col.dataIndex]: visible,
            }));
          },
        },
      })),
    [columns, filterDropdownVisible]
  );

  const memoizedComponents = useMemo(
    () => ({
      header: {
        cell: (props) => (
          <th
            {...props}
            style={{
              ...props.style,
              position: "sticky",
              top: "32px",
              zIndex: 2,
            }}
          >
            {props.children}
          </th>
        ),
      },
    }),
    []
  );

  return (
    <>
      <style>
        {`
  .buy-row td {
    color: blue !important;

  }
  .sell-row td {
    color: red !important;
  
  }
  .custom-table .ant-table-cell {
    padding: 1px 3px !important; /* Adjust padding as needed */
    
  }

  .custom-table .ant-table-thead > tr > th {
    text-align: left !important;
  }
    

  
`}
      </style>
      <ConfigProvider theme={{ components: tableToken }}>
        <Table
          className="custom-table"
          bordered
          size="small"
          dataSource={data}
          columns={memoizedColumns}
          rowClassName={(record) => {
            if (record.buySellAction === "B") return "buy-row";
            if (record.buySellAction === "S") return "sell-row";
            return "";
          }}
          rowKey="id"
          pagination={{
            ...pagination,
            size: "small",
            position: ["bottomRight"],
            showSizeChanger: true,
            showQuickJumper: true,
            pageSizeOptions: ["10", "20", "30", "50"],
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
          onChange={handleTableChange}
          components={memoizedComponents}
          style={{ fontSize: "5px" }}
        />
      </ConfigProvider>
    </>
  );
};

export default PanelTableThree;
