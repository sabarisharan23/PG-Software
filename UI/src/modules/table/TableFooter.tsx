import { Button } from "../../components/ui/button";

interface TableFooterProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  pageSizeOptions: number[];
}

const TableFooter: React.FC<TableFooterProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
  pageSize,
  setPageSize,
  pageSizeOptions,
}) => {
  return (
    <div className="flex justify-between items-center px-4 py-4">
      <div>
        <span className="text-sm text-gray-600">Rows per page: </span>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="border rounded px-2 py-1 text-sm text-gray-600"
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center space-x-2">
        <Button
        variant={"outline"}
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </Button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <Button
        variant={"outline"}
          onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default TableFooter;
