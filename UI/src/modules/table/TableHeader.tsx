import { Button } from "../../components/ui/button";

interface TableHeaderProps {
  title: string;
  search: string;
  setSearch: (value: string) => void;
  handleButtonClick?: () => void;
  buttonLable?: string;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  title,
  search,
  setSearch,
  handleButtonClick,
  buttonLable,
}) => {
  return (
    <div className="flex justify-between items-center pb-4 px-4">
      <h2 className="text-md font-semibold">{title}</h2>
      <div className="flex flex-row gap-5">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="border rounded px-3 py-1 text-sm"
        />
        {buttonLable && handleButtonClick ? (
          <Button
            size={"default"}
            variant={"link"}
            onClick={handleButtonClick}
          >
            {buttonLable}
          </Button>
        ) : (
          ""
        )}{" "}
      </div>
    </div>
  );
};

export default TableHeader;
