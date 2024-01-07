import React from "react";
import { FaDownload } from "react-icons/fa";
import { utils, writeFile } from "xlsx";
import { User } from "../../UserModel";

interface Props {
  users: User[];
}

const ExportTable: React.FC<Props> = ({ users }) => {
  const handleExportExcel = () => {
    const dataToExport = users.map(({ avatar, ...user }) => user);

    // Generate worksheet from state
    const ws = utils.json_to_sheet(dataToExport);

    // Styling
    const columnWidths = [
      { wch: 10 }, // Width of the id column
      { wch: 20 }, // Width of the name column
      { wch: 30 }, // Width of the email column
      { wch: 20 }, // Width of the phone column
      { wch: 20 }, // Width of the gender column
    ];

    // Apply column widths
    columnWidths.forEach((width, index) => {
      ws['!cols'] = ws['!cols'] || [];
      ws['!cols'][index] = width;
    });

    // Create workbook and append worksheet
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "User Sheet");

    // Export to XLSX
    writeFile(wb, "UserData.xlsx");
  };

  return <FaDownload cursor={"pointer"} onClick={handleExportExcel} />;
};

export default ExportTable;
