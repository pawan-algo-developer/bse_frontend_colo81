// import React, { useEffect, useState, useRef, useMemo } from "react";
// import { Table, ConfigProvider } from "antd";
// import { fetchTableTwoData } from "../api/tableTwoAPI";

// const PanelTableTwo = () => {
//   const [data, setData] = useState([]);
//   const [pagination, setPagination] = useState({
//     current: 1,
//     pageSize: 30,
//     total: 0,
//   });
//   const [loading, setLoading] = useState(false);
//   const [sorter, setSorter] = useState({
//     field: "created",
//     order: "descend",
//   });
//   const [filters, setFilters] = useState({});
//   const [filterDropdownVisible, setFilterDropdownVisible] = useState({});

//   const tableToken = {
//     Table: {
//       headerSplitColor: "#000",
//       headerBg: "#f5f5f5",
//       cellPaddingBlock: 1,
//       cellPaddingInline: 1,
//       borderRadius: 2,
//       fontSize: 12,
//       headerSplitColor: "#e8e8e8",
//       rowHoverBg: "#f0f0f0",
//     },
//   };
//   const sorterRef = useRef(sorter);
//   const filtersRef = useRef(filters);
//   // const fetchData = async (params = {}) => {
//   //   setLoading(true);

//   //   try {
//   //     const currentPagination = {
//   //       current: params.pagination?.current || pagination.current,
//   //       pageSize: params.pagination?.pageSize || pagination.pageSize,
//   //     };
//   //     const currentFilters =
//   //       Object.keys(params.filters || {}).length > 0 ? params.filters : filters;
//   //     console.log("currentFilters", currentFilters);
//   //     const result = await fetchTableTwoData({
//   //       pagination: currentPagination,
//   //       sorter: params.sorter || sorter,
//   //       filters: currentFilters,
//   //     });

//   //     setData(result.data);

//   //     setPagination({
//   //       current: currentPagination.current,
//   //       total: result.total,
//   //       pageSize: currentPagination.pageSize,
//   //     });
//   //   } catch (err) {
//   //     console.error("TableTwo fetch error", err);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const fetchData = async (params = {}) => {
//     setLoading(true);

//     try {
//       const result = await fetchTableTwoData(params);

//       const mappedData = (result.data || result.tradeBook || []).map(
//         (item, idx) => ({
//           id: item.logTime || idx,
//           created: new Date((item.logTime + 315512999) * 1000).toLocaleString(),
//           participant: item.participantCode?.trim(),
//           traderID: item.clientCode?.trim(),
//           instrumentName: item.instrumentType,
//           tokenNo: item.token,
//           symbol: item.symbol?.trim(),
//           expiryDate: new Date(
//             (item.expiry + 315512999) * 1000
//           ).toLocaleDateString(),
//           strikePrice: item.strikePrice / 100,
//           optionType: item.optionType,
//           buySellIndicator: item.buySellIndicator === 1 ? "BUY" : "SELL",
//           fillQuantity: item.fillQuantity,
//           fillPrice: item.fillPrice,
//           ctclID: item.ctclID,
//           brokerID: item.brokerID,
//           lastActivityReference: item.fillNumber, // mapped from fillNumber
//         })
//       );

//       setData(mappedData);
//       setPagination({
//         current: params.pagination?.current || pagination.current,
//         total: result.total,
//         pageSize: params.pagination?.pageSize || pagination.pageSize,
//       });
//     } catch (err) {
//       console.error("TableTwo fetch error", err);
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
//       if (!Object.values(filterDropdownVisible).some((visible) => visible)) {
//         fetchData({
//           pagination: paginationRef.current,
//           sorter: sorterRef.current,
//           filters: filtersRef.current,
//         });
//       }
//     }, 600);
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
//       dataIndex: "created",
//       width: 100,
//       sorter: true,
//       defaultSortOrder: "descend",
//     },
//     {
//       title: "participant",
//       dataIndex: "participant",
//       sorter: true,
//       width: 40,
//     },

//     {
//       title: "traderID",
//       dataIndex: "traderID",
//       sorter: true,
//       width: 50,
//     },
//     {
//       title: "instrumentName",
//       dataIndex: "instrumentName",
//       sorter: true,
//       width: 40,
//     },
//     {
//       title: "tokenNo",
//       dataIndex: "tokenNo",
//       sorter: true,
//       width: 80,
//     },

//     {
//       title: "symbol",
//       dataIndex: "symbol",
//       sorter: true,
//       width: 10,
//     },
//     {
//       title: "expiryDate",
//       dataIndex: "expiryDate",
//       sorter: true,
//       width: 120,
//     },

//     {
//       title: "strikePrice",
//       dataIndex: "strikePrice",
//       sorter: true,
//       width: 70,
//     },

//     {
//       title: "optionType",
//       dataIndex: "optionType",
//       filters: [
//         { text: "CE", value: "CE" },
//         { text: "PE", value: "PE" },
//         { text: "XX", value: "XX" },
//       ],
//       width: 50,
//       filteredValue: filters.optionType || null,
//     },
//     {
//       title: "buySellIndicator",
//       dataIndex: "buySellIndicator",
//       sorter: true,
//       filters: [
//         { text: "BUY", value: "BUY" },
//         { text: "SELL", value: "SELL" },
//       ],
//       width: 50,
//       filteredValue: filters.buySellIndicator || null,
//     },
//     {
//       title: "fillQuantity",
//       dataIndex: "fillQuantity",
//       align: "right",
//       // sorter: true,
//       width: 50,
//     },
//     {
//       title: "fillPrice",
//       dataIndex: "fillPrice",
//       align: "right",
//       // sorter: true,
//       width: 50,
//       render: (value) => Number(value).toFixed(2),
//     },

//     {
//       title: "ctclID",
//       dataIndex: "ctclID",
//       sorter: true,
//       width: 100,
//     },
//     {
//       title: "brokerID",
//       dataIndex: "brokerID",
//       sorter: true,
//       width: 50,
//     },
//     {
//       title: "lastActivityReference",
//       dataIndex: "lastActivityReference",
//       sorter: true,
//       width: 100,
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
//     .buy-row td {
//       color: blue !important;

//     }
//     .sell-row td {
//       color: red !important;

//     }
//       .custom-table .ant-table-cell {
//     padding: 2px 4px !important;
//   }
//     .custom-table .ant-table-thead > tr > th {
//     text-align: left !important;
//   }
//   `}
//       </style>
//       <ConfigProvider theme={{ components: tableToken }}>
//         <Table
//           className="custom-table"
//           size="small"
//           bordered
//           dataSource={data}
//           columns={memoizedColumns}
//           onFilterDropdownOpenChange={(visible, { column }) => {
//             setFilterDropdownVisible((prev) => ({
//               ...prev,
//               [column.dataIndex]: visible,
//             }));
//           }}
//           // rowClassName={(record) => record.buySellIndicator === 'BUY' ? 'buy-row' : ''}
//           rowClassName={(record) => {
//             if (record.buySellIndicator === "BUY") return "buy-row";
//             if (record.buySellIndicator === "SELL") return "sell-row";
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
//           style={{ fontSize: "11px" }}
//         />
//       </ConfigProvider>
//     </>
//   );
// };

// export default PanelTableTwo;

import React, { useEffect, useState, useRef, useMemo } from "react";
import { Table, ConfigProvider } from "antd";
import { fetchTableTwoData } from "../api/tableTwoAPI";
import { useDispatch } from "react-redux";
import { setTableTwoStatus } from "../../store/omsStatusSlice";

const PanelTableTwo = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 30,
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const [sorter, setSorter] = useState({
    field: "created",
    order: "descend",
  });
  const [filters, setFilters] = useState({});
  const [filterDropdownVisible, setFilterDropdownVisible] = useState({});

  const tableToken = {
    Table: {
      headerSplitColor: "#000",
      headerBg: "#f5f5f5",
      cellPaddingBlock: 1,
      cellPaddingInline: 1,
      borderRadius: 2,
      fontSize: 12,
      headerSplitColor: "#e8e8e8",
      rowHoverBg: "#f0f0f0",
    },
  };
  const sorterRef = useRef(sorter);
  const filtersRef = useRef(filters);
  // const fetchData = async (params = {}) => {
  //   setLoading(true);

  //   try {
  //     const currentPagination = {
  //       current: params.pagination?.current || pagination.current,
  //       pageSize: params.pagination?.pageSize || pagination.pageSize,
  //     };
  //     const currentFilters =
  //       Object.keys(params.filters || {}).length > 0 ? params.filters : filters;
  //     console.log("currentFilters", currentFilters);
  //     const result = await fetchTableTwoData({
  //       pagination: currentPagination,
  //       sorter: params.sorter || sorter,
  //       filters: currentFilters,
  //     });

  //     setData(result.data);

  //     setPagination({
  //       current: currentPagination.current,
  //       total: result.total,
  //       pageSize: currentPagination.pageSize,
  //     });
  //   } catch (err) {
  //     console.error("TableTwo fetch error", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchData = async (params = {}) => {
    setLoading(true);

    try {
      const result = await fetchTableTwoData(params);

      console.log("omsstatus::>>", result.all?.omsStatus);
      dispatch(setTableTwoStatus(result.all?.omsStatus));
      const mappedData = (result.data || result.tradeBook || []).map(
        (item, idx) => ({
          id: idx,
          created: new Date(
            Math.floor(item.logTime / 1_000_000)
          ).toLocaleString(),
          participant: item.participantCode?.trim(),
          traderID: item.clientCode?.trim(),
          instrumentName: item.instrumentType,
          tokenNo: item.token,
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
          buySellIndicator: item.buySellIndicator === 1 ? "BUY" : "SELL",
          fillQuantity: item.fillQuantity,
          fillPrice: item.fillPrice / 100000000,
          ctclID: item.ctclID,
          brokerID: item.brokerID,
          // lastActivityReference: item.fillNumber, // mapped from fillNumber
        })
      );

      setData(mappedData);
      setPagination({
        current: params.pagination?.current || pagination.current,
        total: result.total,
        pageSize: params.pagination?.pageSize || pagination.pageSize,
      });
    } catch (err) {
      console.error("TableTwo fetch error", err);
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
      dataIndex: "created",
      width: 100,
      sorter: true,
      defaultSortOrder: "descend",
    },
    {
      title: "participant",
      dataIndex: "participant",
      sorter: true,
      width: 40,
    },

    {
      title: "traderID",
      dataIndex: "traderID",
      sorter: true,
      width: 50,
    },
    {
      title: "instrumentName",
      dataIndex: "instrumentName",
      sorter: true,
      width: 40,
    },
    {
      title: "tokenNo",
      dataIndex: "tokenNo",
      sorter: true,
      width: 80,
    },

    {
      title: "symbol",
      dataIndex: "symbol",
      sorter: true,
      width: 10,
    },
    {
      title: "expiryDate",
      dataIndex: "expiryDate",
      sorter: true,
      width: 120,
    },

    {
      title: "strikePrice",
      dataIndex: "strikePrice",
      sorter: true,
      width: 70,
    },

    {
      title: "optionType",
      dataIndex: "optionType",
      filters: [
        { text: "CE", value: "CE" },
        { text: "PE", value: "PE" },
        { text: "XX", value: "XX" },
      ],
      width: 50,
      filteredValue: filters.optionType || null,
    },
    {
      title: "buySellIndicator",
      dataIndex: "buySellIndicator",
      sorter: true,
      filters: [
        { text: "BUY", value: "BUY" },
        { text: "SELL", value: "SELL" },
      ],
      width: 50,
      filteredValue: filters.buySellIndicator || null,
    },
    {
      title: "fillQuantity",
      dataIndex: "fillQuantity",
      align: "right",
      // sorter: true,
      width: 50,
    },
    {
      title: "fillPrice",
      dataIndex: "fillPrice",
      align: "right",
      // sorter: true,
      width: 50,
      render: (value) => Number(value).toFixed(2),
    },

    {
      title: "ctclID",
      dataIndex: "ctclID",
      sorter: true,
      width: 100,
    },
    {
      title: "brokerID",
      dataIndex: "brokerID",
      sorter: true,
      width: 50,
    },
    // {
    //   title: "lastActivityReference",
    //   dataIndex: "lastActivityReference",
    //   sorter: true,
    //   width: 100,
    // },
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
    padding: 2px 4px !important;
  }
    .custom-table .ant-table-thead > tr > th {
    text-align: left !important;
  }
  `}
      </style>
      <ConfigProvider theme={{ components: tableToken }}>
        <Table
          className="custom-table"
          size="small"
          bordered
          dataSource={data}
          columns={memoizedColumns}
          onFilterDropdownOpenChange={(visible, { column }) => {
            setFilterDropdownVisible((prev) => ({
              ...prev,
              [column.dataIndex]: visible,
            }));
          }}
          // rowClassName={(record) => record.buySellIndicator === 'BUY' ? 'buy-row' : ''}
          rowClassName={(record) => {
            if (record.buySellIndicator === "BUY") return "buy-row";
            if (record.buySellIndicator === "SELL") return "sell-row";
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
          style={{ fontSize: "11px" }}
        />
      </ConfigProvider>
    </>
  );
};

export default PanelTableTwo;
