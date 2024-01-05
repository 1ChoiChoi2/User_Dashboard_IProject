import React from "react";
import { User } from "../UserModel";
import { Avatar, Table } from "antd";
import { FaTrash, FaEdit } from "react-icons/fa";

interface Props {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const UsersSetting: React.FC<Props> = ({ users, setUsers }) => {
  const columns: any = [
    {
      title: "Additional Action",
      children: [
        { title: "Id", dataIndex: "key", key: "key" },
        {
          title: "Avatar",
          dataIndex: "avatar",
          key: "avatar",
          render: (record: string) => <Avatar src={record} />,
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
              <FaEdit />
              <FaTrash onClick={() => handleRemove(record)} />
            </div>
          ),
        },
      ],
    },
  ];

  function handleRemove(userRecord: User) {
    setUsers((prev) => prev.filter((user) => user.key !== userRecord.key));
  }

  return <Table dataSource={users} columns={columns}></Table>;
};

export default UsersSetting;
