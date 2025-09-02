import React from "react";
import { Modal, Form, Row, Col, Select, Input, InputNumber } from "antd";

const { Option } = Select;

const OrderPlacementModal = ({
  visible,
  onCancel,
  onSubmit,
  orderSide,
  buyForm,
  symbols,
  expiries,
  strikes,
  loading,
  selectedInstr,
  handleSymbolChange,
  handleOptnChange,
  handleExpiryChange,
  handleStrikeChange,
  handleLotChange,
  totalQty,
  selectedSymbol,
}) => (
  <Modal
    title={
      <span style={{ color: orderSide === "Sell" ? "#d9363e" : "#1677ff" }}>
        {orderSide} Order
      </span>
    }
    open={visible}
    onCancel={onCancel}
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
      onFinish={onSubmit}
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
          <Form.Item label="Expiry" name="expiry" rules={[{ required: true }]}>
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
          <Form.Item label="Strike" name="strike" rules={[{ required: true }]}>
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
);

export default OrderPlacementModal;
