import React, { useEffect } from "react";
import { User } from "../UserModel";
import { Button, Form, FormInstance } from "antd";
import UserInput from "./ui/UserInput";
import UserRadioGroup from "./ui/UserRadioGroup";
import UserAvatar from "./ui/UserAvatar";

interface Props {
  form: FormInstance<User>;
  editUser: User | null;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  isEditingUser: boolean;
  setIsEditingUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserForm: React.FC<Props> = ({
  form,
  editUser,
  setUsers,
  isEditingUser,
  setIsEditingUser,
}) => {
  const onFinish = (value: User) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.key === editUser?.key ? { ...value, key: editUser.key } : user
      )
    );

    // Reset Fields
    form.resetFields();

    setIsEditingUser(false);
  };

  const cancelEditing = () => {
    // Reset Fields
    form.resetFields();

    setIsEditingUser(false);
  };

  useEffect(() => {
    form.setFieldsValue({
      name: editUser?.name,
      email: editUser?.email,
      gender: editUser?.gender,
      phone: editUser?.phone,
    });
  }, [editUser, form]);

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        gender: "male",
      }}
      onFinish={onFinish}
    >
      <UserInput
        name="name"
        label="Name"
        rules={[{ required: true, message: "Please fill in your name !" }]}
        placeholder="Please enter your name"
      />
      <UserInput
        name="email"
        label="Email"
        rules={[{ required: true, message: "Please fill in your email !" }]}
        placeholder="Please enter your email"
      />
      <UserInput
        name="phone"
        label="Phone"
        placeholder="Please enter your phone number"
      />
      <UserRadioGroup
        name="gender"
        label="Gender"
        options={[
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
        ]}
      />
      <UserAvatar />
      {isEditingUser && (
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button
            onClick={cancelEditing}
            type="primary"
            style={{ marginLeft: 10 }}
          >
            Cancel
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

export default UserForm;
