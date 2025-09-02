// import React, { useEffect, useState, useRef, useMemo } from "react";
// import { Table, ConfigProvider } from "antd";
// import { fetchTableOneData } from "../api/tableOneAPI";
// import { net_position_columns } from "../utility/columns";

// // Divider 09/06/2025
// const PanelTableOne = () => {
//   const [data, setData] = useState([]);
//   const [pagination, setPagination] = useState({
//     current: 1,
//     pageSize: 30,
//     total: 0,
//   });
//   const [loading, setLoading] = useState(false);
//   const [sorter, setSorter] = useState({});
//   const [filters, setFilters] = useState({});
//   const [filterDropdownVisible, setFilterDropdownVisible] = useState({});

//   const [totals, setTotals] = useState({
//     BuyQtyTotal: 0,
//     SellQtyTotal: 0,
//     BuyValTotal: 0,
//     BuyLotTotal: 0,
//     SellValTotal: 0,
//     SellLotTotal: 0,
//     SellVal_Incl_StrikeTotal: 0,
//     NetQtyTotal: 0,
//     NetValTotal: 0,
//     Unrealized_PNLTotal: 0,
//     Realized_PNLTotal: 0,
//     MTMTotal: 0,
//   });

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

//   const memoizedColumns = useMemo(
//     () =>
//       net_position_columns.map((col) => ({
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
//     [net_position_columns, filterDropdownVisible]
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

//   // const fetchData = async (params = {}) => {
//   //   setLoading(true);

//   //   try {
//   //     const currentPagination = {
//   //       current: params.pagination?.current || pagination.current,
//   //       pageSize: params.pagination?.pageSize || pagination.pageSize,
//   //     };

//   //     const currentFilters =
//   //       Object.keys(params.filters || {}).length > 0 ? params.filters : filters;

//   //     const result = await fetchTableOneData({
//   //       pagination: currentPagination,
//   //       sorter: params.sorter || sorter,
//   //       filters: currentFilters,
//   //     });

//   //     setData(result.data);
//   //     setTotals({
//   //       BuyQtyTotal: result.BuyQtyTotal,
//   //       SellQtyTotal: result.SellQtyTotal,
//   //       BuyValTotal: result.BuyValTotal,
//   //       BuyLotTotal: result.BuyLotTotal,
//   //       SellValTotal: result.SellValTotal,
//   //       SellLotTotal: result.SellLotTotal,
//   //       SellVal_Incl_StrikeTotal: result.SellVal_Incl_StrikeTotal,
//   //       NetQtyTotal: result.NetQtyTotal,
//   //       NetValTotal: result.NetValTotal,
//   //       Unrealized_PNLTotal: result.Unrealized_PNLTotal,
//   //       Realized_PNLTotal: result.Realized_PNLTotal,
//   //       MTMTotal: result.MTMTotal,
//   //     });
//   //     console.log("result:>>", result.data);

//   //     setPagination({
//   //       current: currentPagination.current,
//   //       total: result.total,
//   //       pageSize: currentPagination.pageSize,
//   //     });
//   //   } catch (err) {
//   //     console.error("TableOne fetch error", err);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const fetchData = async (params = {}) => {
//     setLoading(true);

//     try {
//       // const currentPagination = {
//       //   current: params.pagination?.current || pagination.current,
//       //   pageSize: params.pagination?.pageSize || pagination.pageSize,
//       // };

//       // const currentFilters =
//       //   Object.keys(params.filters || {}).length > 0 ? params.filters : filters;

//       const result = await fetchTableOneData(params);

//       const mappedData = (result.data || result.netPosition || []).map(
//         (item, idx) => ({
//           id: item.lastActivityRefrence || idx,
//           // created: new Date((item.logTime + 315512999) * 1000).toLocaleString(),
//           instrumentType: item.instrumentType,
//           symbol: item.symbol?.trim(),
//           expiry: new Date(
//             (item.expiry + 315512999) * 1000
//           ).toLocaleDateString(),
//           strikePrice: item.strikePrice / 100,
//           optionType: item.optionType,
//           token: item.token,
//           buyQuantity: item.buyQuantity,
//           buyValue: item.buyValue,
//           sellQuantity: item.sellQuantity,
//           sellValue: item.sellValue,
//           netQuantity: item.netQuantity,
//           netPrice: item.netPrice,
//           mtm: item.mtm,
//         })
//       );

//       setData(mappedData);
//       // setTotals({
//       //   BuyQtyTotal: result.BuyQtyTotal,
//       //   SellQtyTotal: result.SellQtyTotal,
//       //   BuyValTotal: result.BuyValTotal,
//       //   BuyLotTotal: result.BuyLotTotal,
//       //   SellValTotal: result.SellValTotal,
//       //   SellLotTotal: result.SellLotTotal,
//       //   SellVal_Incl_StrikeTotal: result.SellVal_Incl_StrikeTotal,
//       //   NetQtyTotal: result.NetQtyTotal,
//       //   NetValTotal: result.NetValTotal,
//       //   Unrealized_PNLTotal: result.Unrealized_PNLTotal,
//       //   Realized_PNLTotal: result.Realized_PNLTotal,
//       //   MTMTotal: result.MTMTotal,
//       // });
//       console.log("result:>>", result.data);

//       setPagination({
//         current: params.pagination?.current || pagination.current,
//         total: result.total,
//         pageSize: params.pagination?.pageSize || pagination.pageSize,
//       });
//     } catch (err) {
//       console.error("TableOne fetch error", err);
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

//   return (
//     <>
//       <style>
//         {`

//       .custom-table .ant-table-cell {
//     padding: 2px 4px !important; /* Adjust padding as needed */
//   }

//    .custom-table .ant-table-thead > tr > th {
//     text-align: left !important;
//   }
//     .custom-table .ant-table-summary .ant-table-cell:nth-last-child(-n+16) {
//       text-align: right ;
//     }
//   `}
//       </style>

//       <ConfigProvider theme={{ components: tableToken }}>
//         <Table
//           className="custom-table"
//           bordered
//           size="small"
//           dataSource={data}
//           columns={memoizedColumns}
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
//           style={{ fontSize: "11px", width: "100%" }}
//           components={memoizedComponents}
//           // summary={() => (
//           //   <Table.Summary>
//           //     <Table.Summary.Row>
//           //       <Table.Summary.Cell index={0} colSpan={6}>
//           //         <strong>Total</strong>
//           //       </Table.Summary.Cell>

//           //       <Table.Summary.Cell index={6}>
//           //         <strong>{totals.BuyQtyTotal}</strong>
//           //       </Table.Summary.Cell>

//           //       <Table.Summary.Cell index={7}>
//           //         <strong>{Number(totals.BuyValTotal).toFixed(2)}</strong>
//           //       </Table.Summary.Cell>

//           //       <Table.Summary.Cell index={8}>
//           //         <strong>{totals.BuyLotTotal}</strong>
//           //       </Table.Summary.Cell>

//           //       <Table.Summary.Cell index={9} />

//           //       <Table.Summary.Cell index={10}>
//           //         <strong>{totals.SellQtyTotal}</strong>
//           //       </Table.Summary.Cell>

//           //       <Table.Summary.Cell index={11}>
//           //         <strong>{Number(totals.SellValTotal).toFixed(2)}</strong>
//           //       </Table.Summary.Cell>

//           //       <Table.Summary.Cell index={12}>
//           //         <strong>{totals.SellLotTotal}</strong>
//           //       </Table.Summary.Cell>

//           //       <Table.Summary.Cell index={13} />

//           //       <Table.Summary.Cell index={14}>
//           //         <strong>
//           //           {Number(totals.SellVal_Incl_StrikeTotal).toFixed(2)}
//           //         </strong>
//           //       </Table.Summary.Cell>

//           //       <Table.Summary.Cell index={15}>
//           //         <strong>{totals.NetQtyTotal}</strong>
//           //       </Table.Summary.Cell>

//           //       <Table.Summary.Cell index={16}>
//           //         <strong>{Number(totals.NetValTotal).toFixed(2)}</strong>
//           //       </Table.Summary.Cell>

//           //       <Table.Summary.Cell index={17} />

//           //       <Table.Summary.Cell index={18} />

//           //       <Table.Summary.Cell index={19}>
//           //         <strong>
//           //           {Number(totals.Unrealized_PNLTotal).toFixed(2)}
//           //         </strong>
//           //       </Table.Summary.Cell>

//           //       <Table.Summary.Cell index={20}>
//           //         <strong>{Number(totals.Realized_PNLTotal).toFixed(2)}</strong>
//           //       </Table.Summary.Cell>

//           //       <Table.Summary.Cell index={21}>
//           //         {/* <strong>{totals.MTMTotal}</strong>

//           //          */}

//           //         <strong>{Number(totals.MTMTotal).toFixed(2)}</strong>
//           //       </Table.Summary.Cell>
//           //     </Table.Summary.Row>
//           //   </Table.Summary>
//           // )}
//         />
//       </ConfigProvider>
//     </>
//   );
// };

// export default PanelTableOne;

import React, { useEffect, useState, useRef, useMemo } from "react";
import { Table, ConfigProvider } from "antd";
import { fetchTableOneData } from "../api/tableOneAPI";
import { net_position_columns } from "../utility/columns";

// Divider 09/06/2025
const PanelTableOne = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 30,
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const [sorter, setSorter] = useState({});
  const [filters, setFilters] = useState({});
  const [filterDropdownVisible, setFilterDropdownVisible] = useState({});

  const [totals, setTotals] = useState({
    BuyQtyTotal: 0,
    SellQtyTotal: 0,
    BuyValTotal: 0,
    BuyLotTotal: 0,
    SellValTotal: 0,
    SellLotTotal: 0,
    SellVal_Incl_StrikeTotal: 0,
    NetQtyTotal: 0,
    NetValTotal: 0,
    Unrealized_PNLTotal: 0,
    Realized_PNLTotal: 0,
    MTMTotal: 0,
  });

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

  const memoizedColumns = useMemo(
    () =>
      net_position_columns.map((col) => ({
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
    [net_position_columns, filterDropdownVisible]
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

  // const fetchData = async (params = {}) => {
  //   setLoading(true);

  //   try {
  //     const currentPagination = {
  //       current: params.pagination?.current || pagination.current,
  //       pageSize: params.pagination?.pageSize || pagination.pageSize,
  //     };

  //     const currentFilters =
  //       Object.keys(params.filters || {}).length > 0 ? params.filters : filters;

  //     const result = await fetchTableOneData({
  //       pagination: currentPagination,
  //       sorter: params.sorter || sorter,
  //       filters: currentFilters,
  //     });

  //     setData(result.data);
  //     setTotals({
  //       BuyQtyTotal: result.BuyQtyTotal,
  //       SellQtyTotal: result.SellQtyTotal,
  //       BuyValTotal: result.BuyValTotal,
  //       BuyLotTotal: result.BuyLotTotal,
  //       SellValTotal: result.SellValTotal,
  //       SellLotTotal: result.SellLotTotal,
  //       SellVal_Incl_StrikeTotal: result.SellVal_Incl_StrikeTotal,
  //       NetQtyTotal: result.NetQtyTotal,
  //       NetValTotal: result.NetValTotal,
  //       Unrealized_PNLTotal: result.Unrealized_PNLTotal,
  //       Realized_PNLTotal: result.Realized_PNLTotal,
  //       MTMTotal: result.MTMTotal,
  //     });
  //     console.log("result:>>", result.data);

  //     setPagination({
  //       current: currentPagination.current,
  //       total: result.total,
  //       pageSize: currentPagination.pageSize,
  //     });
  //   } catch (err) {
  //     console.error("TableOne fetch error", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchData = async (params = {}) => {
    setLoading(true);

    try {
      // const currentPagination = {
      //   current: params.pagination?.current || pagination.current,
      //   pageSize: params.pagination?.pageSize || pagination.pageSize,
      // };

      // const currentFilters =
      //   Object.keys(params.filters || {}).length > 0 ? params.filters : filters;

      const result = await fetchTableOneData(params);

      // const mappedData = (result.data || result.netPosition || []).map(
      //   (item, idx) => ({
      //     // id: item.id || idx,
      //     id: idx,
      //     // created: new Date((item.logTime + 315512999) * 1000).toLocaleString(),
      //     instrumentType: item.instrumentType,
      //     symbol: item.symbol?.trim(),
      //     // expiry: new Date(
      //     //   (item.expiry + 315512999) * 1000
      //     // ).toLocaleDateString(),
      //     expiry: new Date((item.expiry + 315512999) * 1000)
      //       .toLocaleDateString("en-GB", {
      //         day: "2-digit",
      //         month: "short",
      //         year: "numeric",
      //       })
      //       .replace(/ /g, "")
      //       .toUpperCase(),
      //     strikePrice: item.strikePrice / 100,
      //     optionType: item.optionType,
      //     token: item.token,
      //     buyQuantity: item.buyQuantity,
      //     buyValue: item.buyValue / 100,
      //     buyLot: item.buyLot,
      //     sellQuantity: item.sellQuantity,
      //     sellValue: item.sellValue / 100,
      //     sellLot: item.sellLot,
      //     netQuantity: item.netQuantity,
      //     netPrice: item.netPrice / 100,
      //     ltp: item.ltp / 100,
      //     realisedPL: item.realisedPL / 100,
      //     MTM: item.MTM,
      //   })
      // );

      const mappedData = (result.data || result.netPosition || []).map(
        (item, idx) => ({
          id: idx,

          instrumentType: item.instrumentType,
          symbol: item.symbol?.trim(),

          // expiry: new Date((item.expiry + 315512999) * 1000)
          //   .toLocaleDateString("en-GB", {
          //     day: "2-digit",
          //     month: "short",
          //     year: "numeric",
          //   })
          //   .replace(/ /g, "")
          //   .toUpperCase(),
          expiry: item.expiry,

          strikePrice: item.strikePrice / 100,
          optionType: item.optionType,
          token: item.token,
          buyQuantity: item.buyQuantity,
          buyValue: item.buyValue / 100000000,
          buyLot: item.buyLot,
          buyAvg: item.buyAvg / 100000000,
          sellQuantity: item.sellQuantity,
          sellValue: item.sellValue / 100000000,
          sellLot: item.sellLot,
          sellAvg: item.sellAvg / 100000000,
          SellVal_Incl_Strike: item.SellVal_Incl_Strike / 100000000,
          netQuantity: item.netQuantity,
          netValue: item.netValue / 100000000,
          netPrice: item.netPrice / 100000000,
          ltp: item.ltp / 100000000,
          unrealised: item.unrealised / 100000000,
          realisedPL: item.realisedPL / 100000000,
          MTM: item.MTM / 100000000,
        })
      );
      setData(mappedData);
      setTotals({
        BuyQtyTotal: result.all.totalBuyQuantity,
        SellQtyTotal: result.all.totalSellQuantity,
        BuyValTotal: result.all.totalBuyValue / 100000000,
        BuyLotTotal: result.all.totalBuyLot,
        SellValTotal: result.all.totalSellValue / 100000000,
        SellLotTotal: result.all.totalSellLot,
        SellVal_Incl_StrikeTotal:
          result.all.SellVal_Incl_StrikeTotal / 100000000 || 0,
        NetQtyTotal: result.all.totalNetQuantity,
        NetValTotal: result.all.totalNetValue / 100000000,
        Unrealized_PNLTotal: result.all.totalunRealized / 100000000,
        Realized_PNLTotal: result.all.totalRealized / 100000000,
        MTMTotal: result.all.totalMTM / 100000000,
      });
      // console.log("result:>>", result.data);

      setPagination({
        current: params.pagination?.current || pagination.current,
        total: result.total,
        pageSize: params.pagination?.pageSize || pagination.pageSize,
      });
    } catch (err) {
      console.error("TableOne fetch error", err);
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

  return (
    <>
      <style>
        {`
  
      .custom-table .ant-table-cell {
    padding: 2px 4px !important; /* Adjust padding as needed */
  }

   .custom-table .ant-table-thead > tr > th {
    text-align: left !important;
  }
    .custom-table .ant-table-summary .ant-table-cell:nth-last-child(-n+16) {
      text-align: right ;
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
          style={{ fontSize: "11px", width: "100%" }}
          components={memoizedComponents}
          summary={() => (
            <Table.Summary>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={6}>
                  <strong>Total</strong>
                </Table.Summary.Cell>

                <Table.Summary.Cell index={6}>
                  <strong>{totals.BuyQtyTotal}</strong>
                </Table.Summary.Cell>

                <Table.Summary.Cell index={7}>
                  <strong>{Number(totals.BuyValTotal).toFixed(2)}</strong>
                </Table.Summary.Cell>

                <Table.Summary.Cell index={8}>
                  <strong>{totals.BuyLotTotal}</strong>
                </Table.Summary.Cell>

                <Table.Summary.Cell index={9} />

                <Table.Summary.Cell index={10}>
                  <strong>{totals.SellQtyTotal}</strong>
                </Table.Summary.Cell>

                <Table.Summary.Cell index={11}>
                  <strong>{Number(totals.SellValTotal).toFixed(2)}</strong>
                </Table.Summary.Cell>

                <Table.Summary.Cell index={12}>
                  <strong>{totals.SellLotTotal}</strong>
                </Table.Summary.Cell>

                <Table.Summary.Cell index={13} />

                <Table.Summary.Cell index={14}>
                  <strong>
                    {Number(totals.SellVal_Incl_StrikeTotal).toFixed(2)}
                  </strong>
                </Table.Summary.Cell>

                <Table.Summary.Cell index={15}>
                  <strong>{totals.NetQtyTotal}</strong>
                </Table.Summary.Cell>

                <Table.Summary.Cell index={16}>
                  <strong>{Number(totals.NetValTotal).toFixed(2)}</strong>
                </Table.Summary.Cell>

                <Table.Summary.Cell index={17} />

                <Table.Summary.Cell index={18} />

                <Table.Summary.Cell index={19}>
                  <strong>
                    {Number(totals.Unrealized_PNLTotal).toFixed(2)}
                  </strong>
                </Table.Summary.Cell>

                <Table.Summary.Cell index={20}>
                  <strong>{Number(totals.Realized_PNLTotal).toFixed(2)}</strong>
                </Table.Summary.Cell>

                <Table.Summary.Cell index={21}>
                  {/* <strong>{totals.MTMTotal}</strong>

                   */}

                  <strong>{Number(totals.MTMTotal).toFixed(2)}</strong>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )}
        />
      </ConfigProvider>
    </>
  );
};

export default PanelTableOne;
