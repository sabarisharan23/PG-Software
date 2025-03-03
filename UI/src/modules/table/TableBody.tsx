import { Column } from "./Table";

interface TableContentProps<T> {
  data: T[];
  columns: Column<T>[];
}

const TableContent = <T,>({ data, columns }: TableContentProps<T>) => {
  return (
    <tbody className="">
      {data.length > 0 ? (
        data.map((row, rowIndex) => (
          <tr key={rowIndex} className="hover:bg-gray-100 ">
            {columns.map((col, colIndex) => (
          <td key={colIndex} className="p-2 px-6 py-4 text-gray-600 border-t border-b border-[#f0f1f4]">
            {col.render ? col.render(row) : String(row[col.accessor as keyof T] ?? "")}
          </td>
        ))}
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={columns.length} className="text-center p-4">No data available</td>
        </tr>
      )}
    </tbody>
  );
};

export default TableContent;
