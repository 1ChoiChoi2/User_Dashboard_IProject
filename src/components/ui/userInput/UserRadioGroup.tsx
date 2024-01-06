import React from "react";
import { Form, Radio } from "antd";

interface Props {
  name: string;
  label: string;
  options: { label: string; value: string }[];
}

const UserRadioGroup: React.FC<Props> = ({ name, label, options }) => {
  return (
    <Form.Item name={name} label={label}>
      <Radio.Group>
        {options.map((option, index) => (
          <Radio key={index} value={option.value}>
            {option.label}
          </Radio>
        ))}
      </Radio.Group>
    </Form.Item>
  );
};

export default UserRadioGroup;
