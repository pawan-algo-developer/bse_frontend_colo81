import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Table,
  ConfigProvider,
  Modal,
  Form,
  Input,
  Select,
  Button,
  Space,
} from "antd";
import { watchlist_columns } from "../utility/watchlist_columns";

import axios from "axios";

// Dummy data for the watchlist
const Watchlist = () => {
  const [data, setData] = useState([]); // Initialize with empty array, will be populated by API
  // Removed modal related state
  const [createForm] = Form.useForm();
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedInstr, setSelectedInstr] = useState("OPTIDX");

  const [selectedStrike, setSelectedStrike] = useState(null);

  const [symbols, setSymbols] = useState([]);

  const [selectedSymbol, setSelectedSymbol] = useState(null);

  const [selectedExpiry, setSelectedExpiry] = useState(null);
  const [expiries, setExpiries] = useState([]);

  const [strikes, setStrikes] = useState([]);

  const [loading, setLoading] = useState({
    symbol: false,
    expiry: false,
    strike: false,
    watchlist: false, // Added for fetching watchlist
  });

  // WebSocket state and ref
  const ws = useRef(null);
  const [liveData, setLiveData] = useState({}); // Stores live updates keyed by tokenID
  const [subscribedTokens, setSubscribedTokens] = useState([]); // Track subscribed tokens

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

  const memoizedColumns = useMemo(
    () =>
      watchlist_columns.map((col) => ({
        ...col,
      })),
    [watchlist_columns]
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

  // State to track connection status
  const [wsStatus, setWsStatus] = useState("CLOSED"); // 'CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'
  const reconnectInterval = useRef(null); // To manage reconnection attempts

  // Function to establish WebSocket connection
  const connectWebSocket = () => {
    if (reconnectInterval.current) {
      clearInterval(reconnectInterval.current);
      reconnectInterval.current = null;
    }

    console.log("Attempting to connect WebSocket...");
    setWsStatus("CONNECTING");
    ws.current = new WebSocket("ws://192.168.50.35:8765");

    ws.current.onopen = () => {
      console.log("WebSocket Connected");
      setWsStatus("OPEN");
    };

    ws.current.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        // console.log("WebSocket Message:", message);
        setLiveData((prevLiveData) => ({
          ...prevLiveData,
          [message.tokenID]: message,
        }));
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    ws.current.onclose = () => {
      console.log("WebSocket Disconnected");
      setWsStatus("CLOSED");
      ws.current = null; // Set ref to null on close
      setSubscribedTokens([]); // Clear subscribed tokens on disconnect

      if (!reconnectInterval.current) {
        console.log("Setting up reconnection interval...");
        reconnectInterval.current = setInterval(() => {
          connectWebSocket();
        }, 5000); // Reconnect every 5 seconds
      }
    };
  };

  // Function to handle subscriptions
  const subscribeToTokens = () => {
    if (ws.current && wsStatus === "OPEN" && data.length > 0) {
      const tokensToSubscribe = data.map((item) => item.token);
      const newSubscribedTokens = [];

      tokensToSubscribe.forEach((tokenID) => {
        const numericTokenID = Number(tokenID);
        if (!subscribedTokens.includes(numericTokenID)) {
          console.log("Subscribing token:", numericTokenID);
          ws.current.send(JSON.stringify({ tokenID: numericTokenID }));
          newSubscribedTokens.push(numericTokenID);
        }
      });

      setSubscribedTokens((prevTokens) => [
        ...prevTokens,
        ...newSubscribedTokens,
      ]);
    }
  };

  // Initial WebSocket connection and cleanup
  useEffect(() => {
    connectWebSocket(); // Initial connection

    // Cleanup on unmount
    return () => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        // Send unsubscribe for all currently subscribed tokens
        subscribedTokens.forEach((tokenID) => {
          console.log(
            "unsubscribing tokens ::>>",
            JSON.stringify({ unSubscribe: tokenID })
          );
          ws.current.send(JSON.stringify({ unSubscribe: tokenID }));
        });
        ws.current.close();
      }
      // Clear the reconnection interval when the component unmounts
      if (reconnectInterval.current) {
        clearInterval(reconnectInterval.current);
        reconnectInterval.current = null;
      }
    };
  }, []); // Empty dependency array to run only once on mount

  // Effect to handle subscriptions when data is loaded and WebSocket is open
  useEffect(() => {
    subscribeToTokens();
  }, [data, wsStatus]); // Depend on data, subscribedTokens, and wsStatus

  // Memoized data combining axios data with live WebSocket data
  const tableData = useMemo(() => {
    return data.map((item) => {
      // Ensure item.token matches the key in liveData (which is message.tokenID)
      const liveUpdate = liveData[item.token];
      if (liveUpdate) {
        return {
          ...item,
          LTP: liveUpdate.ltp / 100, // Map 'ltp' from WebSocket to 'LTP' in table column
          ltt: liveUpdate.ltt + 315512999, // Map 'ltt' from WebSocket to 'ltt' in table column
          Bid1Quantity: liveUpdate.Bid1Quantity, // Map 'bid1Quantity' from WebSocket to 'BuyQty' in table column
          Bid1Price: liveUpdate.Bid1Price / 100, // Map 'bid1Price' from WebSocket to 'BuyPrice' in table column
          Ask1Price: liveUpdate.Ask1Price / 100,
          Ask1Quantity: liveUpdate.Ask1Quantity,
          ltq: liveUpdate.ltq,
          atp: liveUpdate.atp / 100,
          high: liveUpdate.high / 100,
          low: liveUpdate.low / 100,
          open: liveUpdate.open / 100,
          close: liveUpdate.close / 100,
          // Add other fields from liveUpdate if needed and if they map to existing columns or new ones
        };
      }
      return item; // Return original item if no live update
    });
  }, [data, liveData]);

  const handleStrikeChange = (value) => {
    console.log("selected strike in buy form is::>>", value);

    setSelectedStrike(value);
  };

  const handleCreateWatchlist = () => {
    createForm
      .validateFields()
      .then(async (values) => {
        console.log("New Watchlist Entry:", values);
        const { symbol, expiry, strike, optType } = values;

        try {
          const tokenResponse = await axios.get(
            "service/token",
            {
              params: {
                symbol,
                expiry,
                option: optType,
                strike,
              },
            },
            { withCredentials: true }
          );

          let tokenID = tokenResponse?.data?.token;

          console.log("token ID::>>", tokenResponse?.data?.token);

          if (!tokenID) {
            console.error("Token ID not found in response");
            return;
          }

          // tokenID = String(tokenID);
          tokenID = String(tokenID);
          const segment =
            values?.instrName === "OPTIDX" || values?.instrName === "FUTIDX"
              ? "FO"
              : values?.instrName;

          const clientID = localStorage.getItem("clientCode");

          const watchlistPayload = {
            clientID: clientID,
            source: "web",
            securityName: `${values?.symbol}${values?.expiry}${values?.strike}${values?.optType}`,
            segment: segment,
            token: tokenID,
            exchange: "NSE",
            action: "add",
          };

          const watchlistResponse = await axios.post(
            "/api/api/watchlistAdd",
            watchlistPayload,
            {
              withCredentials: true,
            }
          );

          console.log("watchlist response", watchlistResponse);
          await fetchWatchlistData();
        } catch (error) {
          console.error(
            "Error occured:",
            error.response?.data || error.message
          );
        }

        // Removed modal closing and form reset
        // setIsCreateModalVisible(false);
        createForm.resetFields();
      })
      .catch((err) => {
        console.error("Validation failed:", err);
      });
  };

  // Add useEffect to fetch watchlist data on component mount

  const fetchWatchlistData = async () => {
    setLoading((prev) => ({ ...prev, watchlist: true }));
    try {
      // Assuming GET request to /api/watchlistAdd/ fetches the data
      const response = await axios.get("/api/api/watchlistAdd/web");
      // console.log("Fetched watchlist data:", response.data);
      setData(response.data.data); // Update the data state
    } catch (error) {
      console.error(
        "Error fetching watchlist data:",
        error.response?.data || error.message
      );
      // Optionally, set an error state or alert the user
    } finally {
      setLoading((prev) => ({ ...prev, watchlist: false }));
    }
  };

  useEffect(() => {
    fetchWatchlistData();
  }, []);

  const handleDeleteWatchlist = (id) => {
    console.log("setting delete id::>>", id);
    setDeleteId(id);
    setIsDeleteConfirmVisible(true);
  };

  const confirmDeleteWatchlist = async () => {
    if (deleteId !== null) {
      console.log("Deleting watchlist entry with id:", deleteId);
      const itemToDelete = data.find((item) => item.id === deleteId);

      if (itemToDelete) {
        const deletePayload = {
          clientID: "CP01",
          source: "web",
          securityName: itemToDelete.securityName,
          segment: itemToDelete.segment,
          token: itemToDelete.token,
          exchange: itemToDelete.exchange,
          action: "delete",
        };

        console.log("delete payload::>>", deletePayload);

        try {
          const response = await axios.post(
            "/api/api/watchlistAdd",
            deletePayload,
            {
              withCredentials: true,
            }
          );
          console.log("Delete watchlist response:", response.data);
          // setData(data.filter((item) => item.id !== deleteId));
          await fetchWatchlistData();
          setIsDeleteConfirmVisible(false);
          setDeleteId(null);
        } catch (error) {
          console.error(
            "Error deleting watchlist:",
            error.response?.data || error.message
          );
          alert("Failed to delete watchlist entry.");
          setIsDeleteConfirmVisible(false);
          setDeleteId(null);
        }
      } else {
        console.error("Item to delete not found in data.");
        setIsDeleteConfirmVisible(false);
        setDeleteId(null);
      }
    }
  };

  const cancelDeleteWatchlist = () => {
    setIsDeleteConfirmVisible(false);
    setDeleteId(null);
  };

  const handleSymbolChange = async (value) => {
    console.log("value of handleSymbolChange", value);

    setSelectedSymbol(value);
    setSelectedExpiry(null);
    setSelectedStrike(null);
    // setTotalQty(null);
    createForm.setFieldsValue({ expiry: undefined });
    createForm.setFieldsValue({ optType: undefined });
    createForm.setFieldsValue({ strike: undefined });
  };

  useEffect(() => {
    const fetchSymbols = async () => {
      setLoading((prev) => ({ ...prev, symbol: true }));
      try {
        const res = await axios.get("service/symbols", {
          withCredentials: true,
        });
        // console.log("response of symbols::>>", res.data);
        setSymbols(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading((prev) => ({ ...prev, symbol: false }));
      }
    };

    fetchSymbols();
  }, []);

  const handleExpiryChange = async (value) => {
    setSelectedExpiry(value);
    setLoading((prev) => ({ ...prev, strike: true }));

    try {
      const res = await axios.get(
        `service/strikes?symbol=${selectedSymbol}&expiry=${value}&option=${createForm.getFieldValue(
          "optType"
        )}`,
        { withCredentials: true }
      );

      console.log("response of strikes::>>", res.data);

      if (value === "XX") {
        setStrikes(null);
      } else {
        //  setStrikes([]);
        setStrikes(res.data);
      }

      // setStrikes(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading((prev) => ({ ...prev, strike: false }));
    }
  };

  const handleOptnChange = async (value) => {
    console.log("value of handleOptnChange", value);

    // setSelectedSymbol(value);
    setSelectedExpiry(null);
    setStrikes([]);
    setLoading((prev) => ({ ...prev, expiry: true }));

    try {
      const res = await axios.get(
        `service/expiries?symbol=${selectedSymbol}&option=${value}`,
        { withCredentials: true }
      );
      setExpiries(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading((prev) => ({ ...prev, expiry: false }));
    }
  };

  const columnsWithDelete = useMemo(() => {
    return [
      ...memoizedColumns,
      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <Button
              type="link"
              onClick={() => handleDeleteWatchlist(record.id)}
              style={{ color: "red" }}
            >
              Delete
            </Button>
          </Space>
        ),
      },
    ];
  }, [memoizedColumns, data]); // Re-calculate if data changes to re-render delete buttons

  return (
    <>
      {/* Removed the old "Add Watchlist" button */}

      <style>
        {`
          .custom-table .ant-table-cell {
            padding: 2px 4px !important; /* Adjust padding as needed */
          }
          .custom-table .ant-table-thead > tr > th {
            text-align: left !important;
          }
          .custom-table .ant-table-summary .ant-table-cell:nth-last-child(1) {
            text-align: right ;
          }
          .horizontal-form .ant-form-item {
            margin-right: 16px; /* Adjust spacing between form items */
            margin-bottom: 0; /* Remove default bottom margin for inline forms */
          }
          .horizontal-form .ant-form-item-label {
            line-height: 32px; /* Align label with input */
          }
          .horizontal-form .ant-form-item-control-wrapper {
            line-height: 32px; /* Align input with label */
          }
        `}
      </style>

      {/* New Horizontal Form */}
      <Form
        form={createForm}
        layout="inline" // Changed to inline for horizontal layout
        onFinish={handleCreateWatchlist} // Use onFinish for form submission
        className="horizontal-form"
        style={{
          marginBottom: 16,
          padding: "0 8px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Form.Item name="instrName" label="Instr Name" initialValue="OPTIDX">
          <Select
            onChange={(value) => {
              setSelectedInstr(value);
              createForm.setFieldsValue({ optType: undefined });
              createForm.setFieldsValue({ expiry: undefined });
              createForm.setFieldsValue({ strike: undefined });
              createForm.setFieldsValue({ qty: undefined });
            }}
            style={{ width: 120 }}
          >
            <Option value="OPTIDX">OPTIDX</Option>
            <Option value="FUTIDX">FUTIDX</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Symbol"
          name="symbol"
          rules={[{ required: true, message: "Please select a symbol!" }]}
        >
          <Select
            placeholder="Symbol"
            loading={loading.symbol}
            onChange={handleSymbolChange}
            allowClear
            style={{ width: 150 }}
          >
            {symbols.map((symbol) => (
              <Option key={symbol} value={symbol}>
                {symbol}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="optType" label="OptType">
          <Select onChange={handleOptnChange} style={{ width: 100 }}>
            {selectedInstr === "OPTIDX" ? (
              <>
                <Option value="CE">CE</Option>
                <Option value="PE">PE</Option>
              </>
            ) : (
              <Option value="XX">XX</Option>
            )}
          </Select>
        </Form.Item>

        <Form.Item label="Expiry" name="expiry" rules={[{ required: true }]}>
          <Select
            placeholder="Expiry"
            loading={loading.expiry}
            onChange={handleExpiryChange}
            disabled={!selectedSymbol}
            allowClear
            style={{ width: 150 }}
          >
            {expiries.map((expiry) => (
              <Option key={expiry} value={expiry}>
                {expiry}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Strike" name="strike" rules={[{ required: true }]}>
          <Select
            placeholder="Strike"
            loading={loading.strike}
            onChange={handleStrikeChange}
            allowClear
            style={{ width: 120 }}
          >
            {strikes.map((strike) => (
              <Option key={strike} value={strike}>
                {strike}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading.watchlist}>
            Add
          </Button>
        </Form.Item>
      </Form>

      <ConfigProvider theme={{ components: tableToken }}>
        <Table
          className="custom-table"
          bordered
          size="small"
          dataSource={tableData} // Use tableData here
          columns={columnsWithDelete} // Use columnsWithDelete
          rowKey="id"
          pagination={false}
          style={{ fontSize: "11px", width: "100%" }}
          components={memoizedComponents}
        />
      </ConfigProvider>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Deletion"
        visible={isDeleteConfirmVisible}
        onCancel={cancelDeleteWatchlist}
        onOk={confirmDeleteWatchlist}
        okText="Delete"
        okButtonProps={{ danger: true }} // Style delete button as danger
      >
        <p>Are you sure you want to delete this watchlist entry?</p>
      </Modal>
    </>
  );
};

export default Watchlist;
