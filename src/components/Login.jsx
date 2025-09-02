import React, { useState } from "react";
import { Form, Input, Button, message, Typography, Space } from "antd";
import {
  UserOutlined,
  LockOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import axios from "axios";
axios.defaults.withCredentials = true;

const { Title, Text } = Typography;

const Login = ({ onLoginSuccess }) => {
  const [step, setStep] = useState("login");
  const [loading, setLoading] = useState(false);
  const [clientCode, setClientCode] = useState("");
  const [resetPassword, setResetPassword] = useState(false);

  const [otpForm] = Form.useForm();
  const [loginForm] = Form.useForm();

  const handleLogin = async (values) => {
    setLoading(true);

    try {
      const res = await axios.post(
        "/api/userRegistration/",
        {
          mobileNumber: values.clientCode,
          source: "web",
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.type === "success") {
        setClientCode(values.clientCode);

        const resetRes = await axios.get("/api/resetPassword/", {
          params: {
            clientCode: values.clientCode,
          },

          withCredentials: true,
        });

        console.log("Reset Response:", resetRes);

        if (resetRes.data.type === "success") {
          setResetPassword(resetRes.data.resetPassword);
          setStep("otp");
          message.success("Please verify your OTP");
        } else {
          message.error("Reset password failed.");
        }
      } else {
        console.log("in else block");

        message.error("Client ID is not available.");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response?.data?.message) {
        message.error(error.response.data.message);
      } else {
        message.error("Network error or invalid response.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOTP = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/verifyOTP", {
        clientCode,
        password: values.password,
        newPasword: resetPassword ? values.newPasword || "" : "",
      });

      if (res.data.type === "success") {
        localStorage.setItem("clientCode", clientCode);
        message.success("Login successful!");
        onLoginSuccess && onLoginSuccess();
      } else {
        message.error(res.data.reason || "OTP verification failed.");
      }
    } catch (error) {
      console.error("OTP error:", error);
      if (error.response?.data?.message) {
        message.error(error.response.data.message);
      } else {
        message.error("Network error or invalid response.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Go back to login
  const handleBackToLogin = () => {
    setStep("login");
    setClientCode("");
    setResetPassword(false);
    otpForm.resetFields();
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "100px auto",
        padding: 32,
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      {step === "login" && (
        <>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <Title level={3}>Project Login</Title>
            <Text type="secondary">Enter your client code to continue</Text>
          </div>

          <Form
            form={loginForm}
            onFinish={handleLogin}
            layout="vertical"
            autoComplete="off"
          >
            <Form.Item
              label="Client Code"
              name="clientCode"
              rules={[
                { required: true, message: "Please enter your client code" },
                {
                  min: 3,
                  message: "Client code must be at least 3 characters",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Enter client code"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
                block
              >
                {loading ? "Verifying..." : "Continue"}
              </Button>
            </Form.Item>
          </Form>
        </>
      )}

      {step === "otp" && (
        <>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <Title level={3}>Verify OTP</Title>
            <Text type="secondary">
              Client Code: <strong>{clientCode}</strong>
            </Text>
            {resetPassword && (
              <div style={{ marginTop: 8 }}>
                <Text type="warning">Please set a new password</Text>
              </div>
            )}
          </div>

          <Form
            form={otpForm}
            onFinish={handleOTP}
            layout="vertical"
            autoComplete="off"
          >
            <Form.Item
              label="OTP / Current Password"
              name="password"
              rules={[
                { required: true, message: "Please enter OTP or password" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter OTP or current password"
                size="large"
              />
            </Form.Item>

            {resetPassword && (
              <Form.Item
                label="New Password"
                name="newPasword"
                rules={[
                  { required: true, message: "Please enter new password" },
                  { min: 6, message: "Password must be at least 6 characters" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Enter new password"
                  size="large"
                />
              </Form.Item>
            )}

            <Form.Item>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  size="large"
                  block
                >
                  {loading ? "Verifying..." : "Verify & Login"}
                </Button>

                <Button
                  type="link"
                  icon={<ArrowLeftOutlined />}
                  onClick={handleBackToLogin}
                  block
                >
                  Back to Login
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </>
      )}
    </div>
  );
};

export default Login;
