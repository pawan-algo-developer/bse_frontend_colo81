// Divider 14/08/2025
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Button,
  Space,
  ConfigProvider,
  Modal,
  Input,
  Select,
  Form,
  Row,
  Col,
  Table,
  InputNumber,
  Tag,
} from "antd";
import { Rnd } from "react-rnd";
import axios from "axios";

import { TableOutlined } from "@ant-design/icons";
import { DownloadOutlined } from "@ant-design/icons";
import PanelTableOne from "../components/PanelTableOne";
import PanelTableTwo from "../components/PanelTableTwo";
import PanelTableThree from "../components/PanelTableThree";
import { exportfetch } from "../api/export";
import Watchlist from "../components/Watchlist"; // Import Watchlist component
import { useSelector } from "react-redux";
import { selectCombinedOmsStatus } from "../../store/omsStatusSlice";
import { Badge } from "antd";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";

const { Option } = Select;

const Dashboard = () => {
  const [loading, setLoading] = useState(false);

  const [symbols, setSymbols] = useState([]);
  const [expiries, setExpiries] = useState([]);
  const [strikes, setStrikes] = useState([]);
  const [omsStatus, setOmsStatus] = useState(null);

  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [selectedExpiry, setSelectedExpiry] = useState(null);
  const [lots, setLots] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [selectedStrike, setSelectedStrike] = useState(null);

  const [panels, setPanels] = useState({
    panel1: false,
    panel2: false,
    panel3: false,
  });
  const [buyForm] = Form.useForm();
  const [orderModalVisible, setOrderModalVisible] = useState(false);
  const [orderSide, setOrderSide] = useState(null);
  const [showMarketWatch, setShowMarketWatch] = useState(false);
  const [showWatchlistPanel, setShowWatchlistPanel] = useState(false); // State for Watchlist panel visibility

  const [selectedInstr, setSelectedInstr] = useState("OPTIDX");

  // Add Market Watch form state
  const [marketWatchForm] = Form.useForm();
  const [marketStats, setMarketStats] = useState({});
  const [marketWatchData, setMarketWatchData] = useState([]);
  const [ws, setWs] = useState(null); // WebSocket instance

  const combinedOmsStatus = useSelector(selectCombinedOmsStatus);

  // const renderOmsStatus = (status) => {
  //   if (status === null) return <Badge status="default" text="OMS: ..." />;
  //   return status ? (
  //     <Badge
  //       status="success"
  //       text={
  //         <span>
  //           OMS: <CheckCircleTwoTone twoToneColor="#52c41a" />{" "}
  //           <span style={{ color: "#52c41a" }}>Online</span>
  //         </span>
  //       }
  //     />
  //   ) : (
  //     <Badge
  //       status="error"
  //       text={
  //         <span>
  //           OMS: <CloseCircleTwoTone twoToneColor="#ff4d4f" />{" "}
  //           <span style={{ color: "#ff4d4f" }}>Offline</span>
  //         </span>
  //       }
  //     />
  //   );
  // };

  const renderOmsStatus = (status) => {
    if (status === null) return <Badge status="default" text="OMS: ..." />;

    return status ? (
      <Tag color="green" style={{ fontSize: "14px", padding: "4px 10px" }}>
        <CheckCircleTwoTone twoToneColor="#ffffff" /> OMS Online
      </Tag>
    ) : (
      <Tag color="red" style={{ fontSize: "14px", padding: "4px 10px" }}>
        <CloseCircleTwoTone twoToneColor="#ffffff" /> OMS Offline
      </Tag>
    );
  };

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get(
          "main/orderBook?clientCode=CP01&page=1&chunk=30"
        );
        setOmsStatus(res.data.omsStatus);
      } catch (err) {
        console.error("Error fetching OMS status:", err);
        setOmsStatus(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 1000);

    return () => clearInterval(interval); // cleanup
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.code) {
        case "F1":
          e.preventDefault();
          setOrderSide("Buy");
          setOrderModalVisible(true);
          break;
        case "F2":
          e.preventDefault();
          setOrderSide("Sell");
          setOrderModalVisible(true);
          break;
        case "F5":
          e.preventDefault();
          setShowMarketWatch((prev) => !prev);
          break;
        case "F6": // Handler for F6 to toggle Watchlist panel visibility
          e.preventDefault();
          setShowWatchlistPanel((prev) => !prev);
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const useDebounce = (callback, delay) => {
    const timeoutRef = useRef(null);

    return useCallback(
      (...args) => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          callback(...args);
        }, delay);
      },
      [callback, delay]
    );
  };

  const fetchTotalQuantity = async (value) => {
    if (selectedSymbol && Number.isInteger(value) && value > 0) {
      try {
        const res = await axios.get(
          `http://172.16.47.230:8101/total-qty?symbol=${selectedSymbol}&expiry=${selectedExpiry}&strike=${selectedStrike}&lots=${value}`
        );
        console.log("Total Quantity Response:", res.data);
        setTotalQty(res.data);
      } catch (err) {
        console.error(err);
        setTotalQty(0);
      }
    } else {
      setTotalQty(0);
    }
  };

  const handleLotChange = async (value) => {
    setLots(value);
    console.log("selected lot size change::>>", value);

    // if (selectedSymbol && Number.isInteger(value) && value > 0) {
    //   try {
    //     const res = await axios.get(
    //       `http://172.16.47.230:8101/total-qty?symbol=${selectedSymbol}&expiry=${selectedExpiry}&strike=${selectedStrike}&lots=${value}`
    //     );
    //     console.log("Total Quantity Response:", res.data);

    //     setTotalQty(res.data);
    //   } catch (err) {
    //     console.error(err);
    //     setTotalQty(0);
    //   }
    // } else {
    //   setTotalQty(0);
    // }
    debouncedFetchTotalQuantity(value);
  };

  const debouncedFetchTotalQuantity = useDebounce(fetchTotalQuantity, 300);

  const handleExpiryChange = async (value) => {
    setSelectedExpiry(value);
    setLoading((prev) => ({ ...prev, strike: true }));

    try {
      const res = await axios.get(
        `http://172.16.47.230:8101/strikes?symbol=${selectedSymbol}&expiry=${value}&option=${buyForm.getFieldValue(
          "optType"
        )}`
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

  const handleStrikeChange = (value) => {
    console.log("selected strike in buy form is::>>", value);

    setSelectedStrike(value);

    setTotalQty(0);
  };

  const handleExpiryChangewatch = async (value) => {
    setSelectedExpiry(value);
    setLoading((prev) => ({ ...prev, strike: true }));

    try {
      const res = await axios.get(
        `service/strikes?symbol=${selectedSymbol}&expiry=${value}&option=${marketWatchForm.getFieldValue(
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

  const handleSymbolChange = async (value) => {
    console.log("value of handleSymbolChange", value);

    setSelectedSymbol(value);
    setSelectedExpiry(null);
    setSelectedStrike(null);
    setTotalQty(null);
    buyForm.setFieldsValue({ expiry: undefined });
    buyForm.setFieldsValue({ optType: undefined });
    buyForm.setFieldsValue({ strike: undefined });
    marketWatchForm.setFieldsValue({ strike: undefined });
    marketWatchForm.setFieldsValue({ expiry: undefined });
    marketWatchForm.setFieldsValue({ optType: undefined });
    // setStrikes([]);
    // setLoading((prev) => ({ ...prev, expiry: true }));

    // try {
    //   const res = await axios.get(
    //     `http://172.16.47.230:8101/expiries?symbol=${value}`
    //   );
    //   setExpiries(res.data);
    // } catch (err) {
    //   console.error(err);
    // } finally {
    //   setLoading((prev) => ({ ...prev, expiry: false }));
    // }
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

  useEffect(() => {
    const fetchSymbols = async () => {
      setLoading((prev) => ({ ...prev, symbol: true }));
      try {
        const res = await axios.get("service/symbols", {
          withCredentials: true,
        });
        setSymbols(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading((prev) => ({ ...prev, symbol: false }));
      }
    };

    fetchSymbols();
  }, []);

  const handleBuySubmit = (values) => {
    console.log("order submission");

    buyForm.validateFields().then((values) => {
      console.log("Buy Order:", values);
      setOrderModalVisible(false);
      buyForm.resetFields();
    });
  };

  // Handler for Market Watch form submission
  const handleMarketWatchSubmit = (values) => {
    // Send subscription message to WebSocket
    console.log("values::>>", values);

    if (ws && ws.readyState === 1) {
      ws.send(
        // JSON.stringify({
        //   action: "subscribe",
        //   ...values,
        // })
        JSON.stringify({
          instrument: `${values.symbol}_${values.expiry}_${values.optType}_${values.strike}`,
          // instrument: "NIFTY_24JUL2025_PE_25000",
        })
      );
    }
    // Optionally clear table or show loading
    setMarketWatchData([]);
  };

  const togglePanel = (panelKey) => {
    setPanels((prev) => ({
      ...prev,
      [panelKey]: !prev[panelKey],
    }));
  };

  const handleExport = async (params = {}, fileType = "csv") => {
    setLoading(true);

    try {
      const response = await exportfetch({
        table: params,
        file_type: fileType,
      });

      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      // Extract filename from Content-Disposition header
      const contentDisposition = response.headers["content-disposition"];
      let filename = `${params}_export.${fileType}`;

      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);
        if (fileNameMatch?.[1]) {
          filename = fileNameMatch[1];
        }
      }

      // Download the file
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();

      console.log("File downloaded:", filename);
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const getPanelContent = (key) => {
    switch (key) {
      case "NetPosition":
        return <PanelTableOne />;
      case "Tradebook":
        return <PanelTableTwo />;
      case "Orderbook":
        return <PanelTableThree />;
      default:
        return null;
    }
  };

  const defaultPanelPositions = {
    NetPosition: { x: -900, y: -350, width: 1850, height: 250 },
    Tradebook: { x: -920, y: -80, width: 1870, height: 250 },
    Orderbook: { x: -930, y: 190, width: 1880, height: 300 },
    Watchlist: { x: -830, y: -200, width: 1800, height: 300 }, // Added default position for Watchlist
  };

  // Setup persistent WebSocket connection
  useEffect(() => {
    // Replace with your actual WebSocket endpoint
    const socket = new window.WebSocket("ws://192.168.112.219:8083/ws");
    setWs(socket);

    socket.onopen = () => {
      console.log("WebSocket connected");
      socket.onopen = () => {
        console.log("WebSocket connected");

        // Hardcoded instrument subscription
        socket.send(
          JSON.stringify({
            instrument: "NIFTY_24JUL2025_PE_25000",
          })
        );
      };
    };
    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };
    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
    };
    socket.onmessage = (event) => {
      // Parse and update market watch data
      try {
        const data = JSON.parse(event.data);
        // Assume data is an array of order book rows
        console.log("WebSocket message received:", data);
        if (data.orderbook && data.marketStats) {
          setMarketWatchData(data.orderbook); // for table
          setMarketStats(data.marketStats); // for side panel
        }
        // setMarketWatchData(data);
      } catch (e) {
        console.error("WebSocket message parse error", e);
      }
    };
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          padding: "10px 20px",
          background: omsStatus ? "#001529" : "red",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1001,
        }}
      >
        <h2 style={{ margin: 0, color: "white" }}>Trade Dashboard Colo 81</h2>
        <Space>
          {/* <Button type="primary" icon={<DownloadOutlined />} onClick={() => handleExport('NetPosition')}>Export Net Position</Button>
<Button type="primary" icon={<DownloadOutlined />} onClick={() => handleExport('Tradebook')}>Export Tradebook</Button>
<Button type="primary" icon={<DownloadOutlined />} onClick={() => handleExport('Orderbook')}>Export Orderbook</Button> */}
          {/* {renderOmsStatus(combinedOmsStatus)} */}
          <Button
            type="primary"
            icon={<TableOutlined />}
            onClick={() => togglePanel("NetPosition")}
            ghost
          >
            Net Position
          </Button>
          <Button
            type="primary"
            icon={<TableOutlined />}
            onClick={() => togglePanel("Tradebook")}
            ghost
          >
            Tradebook
          </Button>
          <Button
            type="primary"
            icon={<TableOutlined />}
            onClick={() => togglePanel("Orderbook")}
            ghost
          >
            Orderbook
          </Button>
        </Space>
      </div>

      {/* Existing panels rendering */}
      <div style={{ padding: "80px 20px 20px 20px" }}>
        {Object.entries(panels).map(([key, visible], index) => {
          if (!visible) return null;
          return (
            <Rnd
              key={key}
              default={{
                x: defaultPanelPositions[key]?.x || 20 + index * 40,
                y: defaultPanelPositions[key]?.y || 100 + index * 40,
                width: defaultPanelPositions[key]?.width || 800,
                height: defaultPanelPositions[key]?.height || 250,
              }}
              bounds="window"
              minWidth={300}
              minHeight={200}
              style={{ zIndex: 1000, position: "absolute" }}
            >
              <div
                style={{
                  height: "100%",
                  overflow: "auto",
                  width: "100%",
                  backgroundColor: "white",
                  border: "1px solid #e8e8e8",
                  borderRadius: "4px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
              >
                <div
                  style={{
                    padding: "4px 12px",
                    borderBottom: "1px solid #e8e8e8",
                    background: "#c9d4e3",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                  }}
                >
                  <span style={{ fontWeight: 500 }}>{`${key.replace(
                    "panel",
                    "Table "
                  )}`}</span>

                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      type="primary"
                      icon={<DownloadOutlined />}
                      onClick={() => handleExport(key)}
                      style={{ background: "#132033" }}
                      size="small"
                    >
                      Export
                    </Button>
                    <Button
                      type="text"
                      size="small"
                      onClick={() => togglePanel(key)}
                      style={{ color: "#ff4d4f" }}
                    >
                      X
                    </Button>
                  </div>
                </div>
                <div style={{ padding: "8px" }}>{getPanelContent(key)}</div>
              </div>
            </Rnd>
          );
        })}
      </div>

      {/* Watchlist Panel */}
      {showWatchlistPanel && (
        <Rnd
          key="Watchlist"
          default={{
            x: defaultPanelPositions.Watchlist?.x || 20,
            y: defaultPanelPositions.Watchlist?.y || 100,
            width: defaultPanelPositions.Watchlist?.width || 800,
            height: defaultPanelPositions.Watchlist?.height || 250,
          }}
          bounds="window"
          minWidth={300}
          minHeight={200}
          style={{ zIndex: 1000, position: "absolute" }}
        >
          <div
            style={{
              height: "100%",
              overflow: "auto",
              width: "100%",
              backgroundColor: "white",
              border: "1px solid #e8e8e8",
              borderRadius: "4px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            <div
              style={{
                padding: "4px 12px",
                borderBottom: "1px solid #e8e8e8",
                background: "#c9d4e3",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                position: "sticky",
                top: 0,
                zIndex: 1,
              }}
            >
              <span style={{ fontWeight: 500 }}>Watchlist</span>
              <Button
                type="text"
                size="small"
                onClick={() => setShowWatchlistPanel(false)} // Close button
                style={{ color: "#ff4d4f" }}
              >
                X
              </Button>
            </div>
            <div style={{ padding: "8px" }}>
              <Watchlist />
            </div>
          </div>
        </Rnd>
      )}

      <Modal
        title={
          <span style={{ color: orderSide === "Sell" ? "#d9363e" : "#1677ff" }}>
            {orderSide} Order
          </span>
        }
        open={orderModalVisible}
        onCancel={() => setOrderModalVisible(false)}
        onOk={() => buyForm.submit()}
        okText={`Place ${orderSide} Order`}
        okButtonProps={{
          style: {
            backgroundColor: orderSide === "Sell" ? "#d9363e" : "#1677ff",
            borderColor: orderSide === "Sell" ? "#d9363e" : "#1677ff",
          },
        }}
        zIndex={1100}
        width={1500}
      >
        <Form
          form={buyForm}
          layout="vertical"
          onFinish={handleBuySubmit}
          onFinishFailed={(errorInfo) => {
            console.log("Validation Failed:", errorInfo);
          }}
        >
          <Row gutter={8}>
            <Col span={2}>
              <Form.Item
                name="exchange"
                label="Exchange"
                initialValue="NSE"
                // rules={[{ required: true }]}
              >
                <Select>
                  <Option value="NSE">NSE</Option>
                  <Option value="BSE">BSE</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={1}>
              <Form.Item name="mktSeg" label="MktSeg" initialValue="FO">
                <Input />
              </Form.Item>
            </Col>

            <Col span={2}>
              <Form.Item name="order" label="OrderType" initialValue="limit">
                <Select>
                  <Option value="limit">limit</Option>
                  <Option value="market">market</Option>
                  <Option value="normal">normal</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item
                name="instrName"
                label="Instr Name"
                initialValue="OPTIDX"
                // onChange={(value) => {
                //   setSelectedInstr(value);
                //   buyForm.setFieldsValue({ optType: undefined }); // reset optType
                // }}
              >
                <Select
                  onChange={(value) => {
                    setSelectedInstr(value);
                    buyForm.setFieldsValue({ optType: undefined });
                    buyForm.setFieldsValue({ expiry: undefined });
                    buyForm.setFieldsValue({ strike: undefined });
                    buyForm.setFieldsValue({ qty: undefined });
                  }}
                >
                  <Option value="OPTIDX">OPTIDX</Option>
                  <Option value="FUTIDX">FUTIDX</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item
                name="symbol"
                label="Symbol"
                // initialValue="NIFTY"
                // rules={[{ required: true }]}
              >
                <Select
                  placeholder="symbol"
                  loading={loading.symbol}
                  onChange={handleSymbolChange}
                  allowClear
                >
                  {symbols.map((symbol) => (
                    <Option key={symbol} value={symbol}>
                      {symbol}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item name="optType" label="OptType">
                {/* <Select>
                  <Option value="CE">CE</Option>
                  <Option value="PE">PE</Option>
                  <Option value="PE">XX</Option>
                </Select> */}
                <Select onChange={handleOptnChange}>
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
            </Col>

            <Col span={3}>
              <Form.Item
                label="Expiry"
                name="expiry"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="Select Expiry"
                  loading={loading.expiry}
                  onChange={handleExpiryChange}
                  disabled={!selectedSymbol}
                  allowClear
                >
                  {expiries.map((expiry) => (
                    <Option key={expiry} value={expiry}>
                      {expiry}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item
                label="Strike"
                name="strike"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="Select Strike"
                  loading={loading.strike}
                  // disabled={!selectedExpiry}
                  onChange={handleStrikeChange}
                  // onChange={(value) => setSelectedStrike(value)}
                  allowClear
                >
                  {strikes.map((strike) => (
                    <Option key={strike} value={strike}>
                      {strike}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={2}>
              <Form.Item label="Total Lots">
                <InputNumber min={1} onChange={handleLotChange} />
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item label="Total Quantity">
                <InputNumber value={totalQty} readOnly />
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item name="price" label="Price">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      <Modal
        title="Market Watch"
        open={showMarketWatch}
        onCancel={() => setShowMarketWatch(false)}
        footer={null}
        width={1200}
        zIndex={1200}
      >
        {/* Market Watch Form */}
        <Form
          form={marketWatchForm} // reuse or create a new form if needed
          layout="inline"
          onFinish={handleMarketWatchSubmit}
          initialValues={{
            exchange: "NSE",
            mktSeg: "N",
            instrName: "OPTIDX",
            symbol: undefined,
            expiry: undefined,
            strike: undefined,
            optType: undefined,
          }}
        >
          <Form.Item
            name="exchange"
            label="Exchange"
            rules={[{ required: true }]}
          >
            <Select size="small" style={{ width: 80 }}>
              <Option value="NSE">NSE</Option>
              <Option value="BSE">BSE</Option>
            </Select>
          </Form.Item>
          <Form.Item name="mktSeg" label="MktSeg" rules={[{ required: true }]}>
            <Select size="small" style={{ width: 60 }}>
              <Option value="N">N</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="instrName"
            label="Instr Name"
            rules={[{ required: true }]}
          >
            <Select
              size="small"
              style={{ width: 90 }}
              onChange={(value) => {
                setSelectedInstr(value);
                // Reset dependent fields
                marketWatchForm.setFieldsValue({
                  optType: undefined,
                  expiry: undefined,
                  symbol: undefined,
                  strike: undefined,
                });
              }}
            >
              <Option value="OPTIDX">OPTIDX</Option>
              <Option value="FUTIDX">FUTIDX</Option>
            </Select>
          </Form.Item>
          <Form.Item name="symbol" label="Symbol" rules={[{ required: true }]}>
            <Select
              size="small"
              style={{ width: 90 }}
              placeholder="Symbol"
              loading={loading.symbol}
              onChange={handleSymbolChange}
              allowClear
            >
              {symbols.map((symbol) => (
                <Option key={symbol} value={symbol}>
                  {symbol}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="optType"
            label="OptType"
            rules={[{ required: true }]}
          >
            <Select
              size="small"
              style={{ width: 60 }}
              onChange={handleOptnChange}
            >
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
          <Form.Item name="expiry" label="Expiry" rules={[{ required: true }]}>
            <Select
              size="small"
              style={{ width: 110 }}
              placeholder="Select Expiry"
              loading={loading.expiry}
              onChange={handleExpiryChangewatch}
              disabled={!selectedSymbol}
              allowClear
            >
              {expiries.map((expiry) => (
                <Option key={expiry} value={expiry}>
                  {expiry}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="strike" label="Strike" rules={[{ required: true }]}>
            <Select
              size="small"
              style={{ width: 100 }}
              placeholder="Select Strike"
              loading={loading.strike}
              // disabled={!selectedExpiry}
              onChange={(value) => setSelectedStrike(value)}
              allowClear
            >
              {strikes.map((strike) => (
                <Option key={strike} value={strike}>
                  {strike}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="small">
              Submit
            </Button>
          </Form.Item>
        </Form>
        {/* End Market Watch Form */}

        {/* Order Book Table */}
        <Table
          size="small"
          pagination={false}
          bordered
          style={{
            width: 420,
            float: "left",
            marginRight: 16,
            background: "#fff",
          }}
          columns={[
            {
              title: <span style={{ color: "#1976d2" }}>BuyOrders</span>,
              dataIndex: "bo",
              align: "center",
              render: (v) => <span style={{ color: "#1976d2" }}>{v}</span>,
            },
            {
              title: <span style={{ color: "#1976d2" }}>BuyQty</span>,
              dataIndex: "bq",
              align: "center",
              render: (v) => <span style={{ color: "#1976d2" }}>{v}</span>,
            },
            {
              title: <span style={{ color: "#1976d2" }}>BuyPrice</span>,
              dataIndex: "bp",
              align: "center",
              render: (v) => <span style={{ color: "#1976d2" }}>{v}</span>,
            },
            {
              title: <span style={{ color: "#d32f2f" }}>SellPrice</span>,
              dataIndex: "sp",
              align: "center",
              render: (v) => <span style={{ color: "#d32f2f" }}>{v}</span>,
            },
            {
              title: <span style={{ color: "#d32f2f" }}>SellOrders</span>,
              dataIndex: "so",
              align: "center",
              render: (v) => <span style={{ color: "#d32f2f" }}>{v}</span>,
            },
            {
              title: <span style={{ color: "#d32f2f" }}>SellQty</span>,
              dataIndex: "sq",
              align: "center",
              render: (v) => <span style={{ color: "#d32f2f" }}>{v}</span>,
            },
          ]}
          dataSource={marketWatchData}
        />

        {/* Market Stats */}
        <div style={{ marginLeft: 450 }}>
          <Row gutter={24}>
            <Col span={12}>
              <Row>
                <Col span={12}>LTQ :</Col>
                <Col span={12} style={{ color: "#333" }}>
                  {/* 450 @22.65 */}
                  {marketStats.ltq ?? "-"}
                </Col>
              </Row>
              <Row>
                <Col span={12}>LTT :</Col>
                <Col span={12} style={{ color: "#333" }}>
                  {/* 10:06:00 Hrs */}
                  {/* {marketStats.ltt ?? "-"} */}
                  {(marketStats.ltt ?? "-").split(" ")[1] ?? "-"}
                </Col>
              </Row>
              <Row>
                <Col span={12}>Vol :</Col>
                <Col span={12} style={{ color: "#333" }}>
                  {/* 24888975 */}
                  {marketStats.volume ?? "-"}
                </Col>
              </Row>
              <Row>
                <Col span={12}>ATP :</Col>
                <Col span={12} style={{ color: "#333" }}>
                  {marketStats.atp ?? "-"}
                </Col>
              </Row>
              <Row>
                <Col span={12}>% :</Col>
                <Col span={12} style={{ color: "#333" }}>
                  {/* -29.22 */}
                  {(
                    ((marketStats.ltp - marketStats.close) /
                      marketStats.close) *
                    100
                  ).toFixed(2)}
                  %
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={12}>Open :</Col>
                <Col span={12} style={{ color: "#333" }}>
                  {marketStats.open ?? "-"}
                </Col>
              </Row>
              <Row>
                <Col span={12}>High :</Col>
                <Col span={12} style={{ color: "#333" }}>
                  {marketStats.high ?? "-"}
                </Col>
              </Row>
              <Row>
                <Col span={12}>Low :</Col>
                <Col span={12} style={{ color: "#333" }}>
                  {/* 18.75
                   */}
                  {marketStats.low ?? "-"}
                </Col>
              </Row>
              <Row>
                <Col span={12}>Close :</Col>
                <Col span={12} style={{ color: "#333" }}>
                  {marketStats.ltp ?? "-"}
                </Col>
              </Row>

              <Row>
                <Col span={12}>OI :</Col>
                <Col span={12} style={{ color: "#333" }}>
                  {marketStats.oi ?? "-"}
                </Col>
              </Row>

              {/* <Row>
                <Col span={12}>Avg Price :</Col>
                <Col span={12} style={{ color: "#333" }}>
                  {marketStats.avgPrice ?? "-"}
                </Col>
              </Row> */}
            </Col>
          </Row>
          <Row gutter={32} style={{ marginTop: 90 }}>
            <Col span={12}>
              LTT :{" "}
              <span style={{ color: "#333" }}>{marketStats.ltt ?? "-"}</span>
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
