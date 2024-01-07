import React from "react";
import { User } from "../UserModel";
import { Avatar, Table, UploadFile } from "antd";

interface Props {
  users: User[];
}

const UsersTable: React.FC<Props> = ({ users }) => {
  const columns: any = [
    { title: "Id", dataIndex: "key", key: "key" },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (record: UploadFile[]) => (
        <Avatar src={record[0].thumbUrl}  />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: User, b: User) => a.name.localeCompare(b.name),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      filters: [
        { text: "Male", value: "male" },
        { text: "Female", value: "female" },
      ],
      onFilter: (value: string, record: User) => record.gender === value,
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
  ];

  return (
    <Table
      dataSource={users}
      columns={columns}
    ></Table>
  );
};

export default UsersTable;
