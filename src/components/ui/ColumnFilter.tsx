import React, { useState, useEffect } from "react";
import type { MenuProps } from "antd";
import { Checkbox, Dropdown, Space } from "antd";
import { FaEye } from "react-icons/fa";

interface Props {
  columns: any[];
  setColumns: React.Dispatch<React.SetStateAction<any[]>>;
}

const ColumnFilter: React.FC<Props> = ({ columns, setColumns }) => {
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    () => {
      const storedColumns = localStorage.getItem("visibleColumns");
      return storedColumns
        ? JSON.parse(storedColumns)
        : columns.map((column) => column.key);
    }
  );

  useEffect(() => {
    localStorage.setItem("visibleColumns", JSON.stringify(visibleColumns));
    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        hidden: !visibleColumns.includes(col.key),
      }))
    );
  }, [visibleColumns, setColumns]);

  const handleColumnAvailable = (columnKey: string) => {
    const updatedColumns = visibleColumns.includes(columnKey)
      ? visibleColumns.filter((colKey) => colKey !== columnKey)
      : [...visibleColumns, columnKey];

    setVisibleColumns(updatedColumns);

    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        hidden: !updatedColumns.includes(col.key),
      }))
    );
  };

  const items: MenuProps["items"] = [
    ...columns.map((column) => ({
      label: (
        <Checkbox
          checked={visibleColumns.includes(column.key)}
          onChange={() => handleColumnAvailable(column.key)}
        >
          {column.title}
        </Checkbox>
      ),
      key: column.key,
    })),
    {
      label: <p style={{ textAlign: "center" }}>Reset</p>,
      key: "reset",
      onClick: () => {
        setVisibleColumns(columns.map((col) => col.key));
        setColumns(columns.map((col) => ({ ...col, hidden: false })));
      },
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <FaEye />
        </Space>
      </a>
    </Dropdown>
  );
};

export default ColumnFilter;
