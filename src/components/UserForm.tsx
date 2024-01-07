import React, { useEffect } from "react";
import { User } from "../UserModel";
import { Button, Form, FormInstance, UploadFile } from "antd";
import UserInput from "./ui/userInput/UserInput";
import UserRadioGroup from "./ui/userInput/UserRadioGroup";
import UserAvatar from "./ui/userInput/UserAvatar";

interface Props {
  form: FormInstance<User>;
  editUser: User | null;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  isEditingUser: boolean;
  setIsEditingUser: React.Dispatch<React.SetStateAction<boolean>>;
  fileList: UploadFile<any>[];
  setFileList: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>;
  isValidForm: boolean;
  setIsValidForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserForm: React.FC<Props> = ({
  form,
  editUser,
  setUsers,
  isEditingUser,
  setIsEditingUser,
  fileList,
  setFileList,
  isValidForm,
  setIsValidForm,
}) => {
  const onFinish = (value: User) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.key === editUser?.key
          ? { ...value, key: editUser.key, avatar: fileList }
          : user
      )
    );

    // Reset Fields
    form.resetFields();
    setFileList([]);

    setIsEditingUser(false);
  };

  const cancelEditing = () => {
    // Reset Fields
    form.resetFields();
    setFileList([]);

    setIsEditingUser(false);
  };

  const validateName = async (_: null, value: any) => {
    // Custom validator to check for leading or trailing spaces
    if (value && (value.startsWith(" ") || value.endsWith(" "))) {
      throw new Error("Name should not have leading or trailing spaces");
    }
  };

  const validateEmail = async (_: null, value: any) => {
    // Custom validator to check for a specific email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
      throw new Error("Please enter a valid email address");
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      name: editUser?.name,
      email: editUser?.email,
      gender: editUser?.gender,
      phone: editUser?.phone,
    });
  }, [editUser, form]);

  useEffect(() => {
    const validateFields = async () => {
      try {
        await form.validateFields();
        setIsValidForm(true);
      } catch (error) {
        setIsValidForm(false);
      }
    };

    validateFields();
  }, [form, setIsValidForm]);

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
        rules={[
          { required: true, message: "Please fill in your name !" },
          {
            required: true,
            validator: validateName,
            message: "Name should not have leading or trailing spaces",
          },
        ]}
        placeholder="Please enter your name"
      />
      <UserInput
        name="email"
        label="Email"
        rules={[
          { required: true, message: "Please fill in your email !" },
          {
            required: true,
            validator: validateEmail,
            message: "Please enter a valid email address",
          },
        ]}
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
      <UserAvatar
        name="avatar"
        label="Avatar"
        // rules={[{ required: true, message: "Please upload your avatar" }]}
        editUser={editUser}
        fileList={fileList}
        setFileList={setFileList}
      />
      {isEditingUser && (
        <Form.Item>
          <Button disabled={isValidForm} type="primary" htmlType="submit">
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
