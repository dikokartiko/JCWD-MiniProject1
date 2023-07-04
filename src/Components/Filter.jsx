import classNames from "classnames";

export const FilterCategory = ({ data, selectedCategoryId, onClick }) => {
  return (
    <>
      <button
        key={data.id}
        className={classNames("mr-2 px-4 py-2 rounded-md", {
          "bg-blue-500 text-white": data.id === selectedCategoryId,
          "bg-gray-200 text-gray-700": data.id !== selectedCategoryId,
        })}
        onClick={onClick}>
        {data.name}
      </button>
    </>
  );
};

export const FilterSort = ({ sortOrder, asc, desc }) => {
  return (
    <>
      <div className="flex my-4 justify-center">
        <button
          className={classNames("mr-2 px-4 py-2 rounded-md", {
            "bg-blue-500 text-white": sortOrder === "DESC",
            "bg-gray-200 text-gray-700": sortOrder === "ASC",
          })}
          onClick={desc}>
          Oldest
        </button>
        <button
          className={classNames("mr-2 px-4 py-2 rounded-md", {
            "bg-blue-500 text-white": sortOrder === "ASC",
            "bg-gray-200 text-gray-700": sortOrder === "DESC",
          })}
          onClick={asc}>
          Newest
        </button>
      </div>
    </>
  );
};

export const Pagination = ({
  currentPage,
  totalPages,
  handlePrevPage,
  handleNextPage,
  getPageNumbers,
  handlePageChange,
}) => {
  return (
    <>
      <div className="flex justify-center my-4 container ml-auto mr-auto">
        <button
          className={classNames(
            "mx-1 px-4 py-2 rounded-md",
            {
              "bg-blue-500 text-white": currentPage === 1,
              "bg-gray-200 text-gray-700": currentPage !== 1,
            },
            "focus:outline-none focus:ring focus:border-blue-300"
          )}
          onClick={handlePrevPage}
          disabled={currentPage === 1}>
          Prev
        </button>
        {getPageNumbers.map((page) => (
          <button
            key={page}
            className={classNames(
              "mx-1 px-4 py-2 rounded-md",
              {
                "bg-blue-500 text-white": page === currentPage,
                "bg-gray-200 text-gray-700": page !== currentPage,
              },
              "focus:outline-none focus:ring focus:border-blue-300"
            )}
            onClick={() => handlePageChange(page)}>
            {page}
          </button>
        ))}
        <button
          className={classNames(
            "mx-1 px-4 py-2 rounded-md",
            {
              "bg-blue-500 text-white": currentPage === totalPages,
              "bg-gray-200 text-gray-700": currentPage !== totalPages,
            },
            "focus:outline-none focus:ring focus:border-blue-300"
          )}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </>
  );
};
const Filter = () => {
  return <></>;
};

export default Filter;
