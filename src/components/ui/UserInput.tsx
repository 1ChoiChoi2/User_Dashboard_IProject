import React from "react";
import { Form, Input } from "antd";

interface Props {
  name: string;
  placeholder: string;
  label: string;
  rules?: { required: boolean; message: string }[];
}

const UserInput: React.FC<Props> = ({ name, placeholder, label, rules }) => {
  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Input placeholder={placeholder} />
    </Form.Item>
  );
};

export default UserInput;
