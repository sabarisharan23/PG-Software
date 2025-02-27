import { Column } from "./Table";

interface TableTitleProps<T> {
  columns: Column<T>[];
}

const TableTitle = <T,>({ columns }: TableTitleProps<T>) => {
  return (
    <thead>
      <tr className="bg-white text-left">
        {columns.map((col, index) => (
          <th key={index} className="p-2 px-6 border-t border-b border-[#f0f1f4] text-sm font-semibold">{col.header}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableTitle;
