import React, { useState } from "react";
import { User } from "../UserModel";
import { Avatar, Button, Form, Modal, Table, UploadFile } from "antd";
import { FaTrash, FaEdit } from "react-icons/fa";
import ColumnFilter from "./ui/ColumnFilter";
import TableFullScreen from "./ui/TableFullScreen";
import ExportTable from "./ui/ExportTable";
import UserForm from "./UserForm";

interface Props {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const UsersSetting: React.FC<Props> = ({ users, setUsers }) => {
  const [form] = Form.useForm<User>();
  const [isEditingUser, setIsEditingUser] = useState<boolean>(false);
  const [isCreatingUser, setIsCreatingUser] = useState<boolean>(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isValidForm, setIsValidForm] = useState<boolean>(false);

  const [columns, setColumns] = useState<any[]>([
    { title: "Id", dataIndex: "key", key: "key" },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (record: UploadFile[]) => (
        <Avatar src={record[0].thumbUrl || fileList[0].thumbUrl} />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    {
      title: "Action",
      key: "Action",
      render: (record: User) => (
        <div className="users-table__action">
          <FaEdit onClick={() => handleEdit(record)} />
          <FaTrash onClick={() => handleRemove(record)} />
        </div>
      ),
    },
  ]);

  function handleRemove(userRecord: User) {
    setUsers((prev) => prev.filter((user) => user.key !== userRecord.key));
  }

  function handleEdit(userRecord: User) {
    setIsEditingUser(true);
    setEditUser(userRecord);
  }

  function handleCreateModal() {
    setIsCreatingUser(true);
  }

  function handleCreate() {
    const newUser = form.getFieldsValue();
    const newUserKey = Date.now();
    newUser.avatar = fileList;

    form
      .validateFields()
      .then(() => {
        setIsValidForm(true);
        setUsers((prev) => [...prev, { ...newUser, key: newUserKey }]);

        // Reset
        form.resetFields();

        setIsCreatingUser(false);
      })
      .catch((err) => {
        setIsValidForm(false);
        console.log(err);
      });
  }

  function closeModal() {
    // Reset Form Feilds
    form.resetFields();
    setFileList([]);

    setIsEditingUser(false);
    setIsCreatingUser(false);
  }

  return (
    <>
      <Button
        className="users-setting__add-button"
        type="primary"
        onClick={handleCreateModal}
      >
        Add User
      </Button>
      <div className="users-setting__table">
        <div className="users-setting__additional-options">
          <ExportTable users={users} />
          <TableFullScreen containerSelector=".users-setting__table" />
          <ColumnFilter columns={columns} setColumns={setColumns} />
        </div>
        <Table
          dataSource={users}
          columns={columns.filter((column) => !column.hidden)}
        ></Table>
      </div>
      <Modal
        open={isCreatingUser || isEditingUser}
        onCancel={closeModal}
        onOk={handleCreate}
        footer={isEditingUser ? null : undefined}
      >
        <UserForm
          form={form}
          editUser={editUser}
          setUsers={setUsers}
          isEditingUser={isEditingUser}
          setIsEditingUser={setIsEditingUser}
          fileList={fileList}
          setFileList={setFileList}
          isValidForm={isValidForm}
          setIsValidForm={setIsValidForm}
        />
      </Modal>
    </>
  );
};

export default UsersSetting;
