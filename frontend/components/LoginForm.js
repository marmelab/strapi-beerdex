import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

export const LoginForm = ({ onLogin }) => {
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();

  const handleLogin = (...args) => {
    setSubmitting(true);
    return onLogin(...args).then(() => setSubmitting(false));
  };

  return (
    <Form layout="inline" form={form} onFinish={handleLogin}>
      <Form.Item
        name="identifier"
        rules={[{ required: true, message: "Please input your login!" }]}
        help={""}
      >
        <Input
          autoComplete="off"
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
          style={{ width: 150 }}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
        help={""}
        style={{ width: 150 }}
      >
        <Input
          autoComplete="new-password"
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Button htmlType="submit" loading={submitting}>
        Submit
      </Button>
    </Form>
  );
};
