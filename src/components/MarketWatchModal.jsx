import React from "react";
import { Modal, Form, Select, Button, Table, Row, Col } from "antd";

const { Option } = Select;

const MarketWatchModal = ({
  visible,
  onCancel,
  marketWatchForm,
  handleMarketWatchSubmit,
  loading,
  symbols,
  expiries,
  strikes,
  selectedInstr,
  handleSymbolChange,
  handleOptnChange,
  handleExpiryChange,
  setSelectedInstr,
  setSelectedStrike,
  marketWatchData,
  marketStats,
  selectedSymbol,
}) => (
  <Modal
    title="Market Watch"
    open={visible}
    onCancel={onCancel}
    footer={null}
    width={1200}
    zIndex={1200}
  >
    {/* Market Watch Form */}
    <Form
      form={marketWatchForm}
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
      <Form.Item name="exchange" label="Exchange" rules={[{ required: true }]}>
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
      <Form.Item name="optType" label="OptType" rules={[{ required: true }]}>
        <Select size="small" style={{ width: 60 }} onChange={handleOptnChange}>
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
                ((marketStats.ltp - marketStats.close) / marketStats.close) *
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
          LTT : <span style={{ color: "#333" }}>{marketStats.ltt ?? "-"}</span>
        </Col>
      </Row>
    </div>
  </Modal>
);

export default MarketWatchModal;
