import { useState } from "react";
import TableHeader from "./TableHeader";
import TableFooter from "./TableFooter";
import TableTitle from "./TableTitle";
import TableContent from "./TableBody";

export interface Column<T> {
  header: string;
  accessor?: keyof T;
  render?: (row: T) => JSX.Element | string;
}

interface TableProps<T> {
  title: string;
  columns: Column<T>[];
  data: T[];
  pageSizeOptions: number[];
  handleButtonClick?: () => void;
  buttonLabel?: string;
}

const TableContainer = <T,>({
  title,
  columns,
  data,
  pageSizeOptions,
  handleButtonClick,
  buttonLabel,
}: TableProps<T>) => {
  console.log("Raw data:", data);

  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(pageSizeOptions[0]);

  // Ensure search works with both accessor and render functions
  const filteredData = data.filter((row) =>
    columns.some((col) => {
      if (col.accessor) {
        return String(row[col.accessor] ?? "").toLowerCase().includes(search.toLowerCase());
      }
      if (col.render) {
        return String(col.render(row) ?? "").toLowerCase().includes(search.toLowerCase());
      }
      return false;
    })
  );

  console.log("Filtered Data:", filteredData);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="border rounded-lg py-4 shadow-lg bg-white">
      <TableHeader
        title={title}
        search={search}
        setSearch={setSearch}
        handleButtonClick={handleButtonClick}
        buttonLable={buttonLabel}
      />
      <table className="w-full border-collapse">
        <TableTitle columns={columns} />
        <TableContent data={paginatedData} columns={columns} />
      </table>
      <TableFooter
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        pageSizeOptions={pageSizeOptions}
      />
    </div>
  );
};

export default TableContainer;
