import { useEffect, useState } from "react";

export type ColumnProps = {
  id: string;
  label: string;
  width: number;
  align: string;
};

const DataTable = (props: any) => {
  const {
    rowData,
    columns,
    hasTableActions,
    sortOrder,
    sortingHandling,
    sortingArray,
    updatePageNumber,
    currentPage,
    paginationEnabled,
    previousPage,
    tableHeader,
    totalRowsCount,
    totalRowsCountPerPage,
  } = props;
  const [showDetail, setShowDetails] = useState(false);
  const [indexing, setIndexing] = useState(-1);
  const [maxTable, setMaxTable] = useState(false);
  const [searchBlock, setSearchBlock] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [columnId, setColumnId] = useState("");
  const [individualRowData, setIndividualRowData] = useState<any>();

  useEffect(() => {
    setIndexing(-1);
  }, [rowData]);

  const onClickShowDetails = (index: number) => {
    if (indexing === index) {
      setShowDetails(false);
      setIndexing(-1);
    } else {
      setShowDetails(true);
      setIndexing(index);
    }
  };

  const viewIndividualData = (index: any, row: any) => {
    setShowInfo(true);
    setIndexing(index);
    setIndividualRowData(row);
  };

  const showData = (
    value: string | number,
    column: ColumnProps,
    index: number,
    row: any
  ) => {
    if (column.id === "view") {
      return (
        <div
          onClick={() => onClickShowDetails(index)}
          className="px-2 py-1 text-sm text-sky-800 cursor-pointer"
        >
          {showDetail && indexing === index ? (
            <i className="fa-solid fa-eye-slash text-[16px]"></i>
          ) : (
            <i className="fa-solid fa-eye text-[16px]"></i>
          )}
        </div>
      );
    } else if (column.id === "preview") {
      return (
        <div
          onClick={() => viewIndividualData(index, row)}
          className="px-2 py-1 text-sm text-sky-800 cursor-pointer"
        >
          {showInfo && indexing === index ? (
            <i className="fa-solid fa-eye-slash text-[16px]"></i>
          ) : (
            <i className="fa-solid fa-eye text-[16px]"></i>
          )}
        </div>
      );
    } else {
      return value === "" ? <span className="text-gray-400">None</span> : value;
    }
  };

  const sorting = (column: ColumnProps, order: string) => {
    setColumnId(column.id);
    sortingHandling?.(column.id, order);
  };

  const calcNumberOfPages = () => {
    const numberOfPages = totalRowsCount / 20;
    return Math.ceil(numberOfPages);
  };

  const handleTableHeader = (columnObj: ColumnProps) => {
    return (
      <div className="flex items-center space-x-2">
        <div className="">{columnObj.label}</div>
        {sortingArray?.includes(columnObj.id) && (
          <div className="cursor-pointer text-[12px]">
            {columnId === columnObj.id && sortOrder !== "ASC" ? (
              <div onClick={() => sorting(columnObj, "DESC")}>
                <i
                  className={`fa-solid fa-arrow-up ${
                    columnId === columnObj.id && "text-black"
                  }`}
                ></i>
              </div>
            ) : (
              <div onClick={() => sorting(columnObj, "ASC")}>
                <i
                  data-testid="sort-click"
                  className={`fa-solid fa-arrow-down ${
                    columnId === columnObj.id && "text-black"
                  }`}
                ></i>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };
  return (
    <div
      className={`bg-[#F2F4F6] ${
        maxTable && "absolute w-full top-16 left-0 right-0 min-h-screen"
      } `}
    >
      <div className="w-full relative text-[#374043] opacity-90 p-2 flex items-center justify-between border border-[#C3C8CB] bg-white border-b-0">
        <div className="font-semibold">{tableHeader}</div>
        {hasTableActions && (
          <div className="flex items-center space-x-4 text-[18px]">
            <i className="fa-solid fa-download cursor-pointer"></i>
            <i
              onClick={() => setSearchBlock(true)}
              className="fa-solid fa-magnifying-glass cursor-pointer"
            ></i>
            {maxTable ? (
              <i
                className="fa-solid fa-compress cursor-pointer"
                onClick={() => setMaxTable(!maxTable)}
              ></i>
            ) : (
              <i
                className="fa-solid fa-expand cursor-pointer"
                onClick={() => setMaxTable(!maxTable)}
              ></i>
            )}
          </div>
        )}
        {searchBlock && (
          <>
            <input
              placeholder="Search here"
              className={`${
                searchBlock ? "block" : "hidden"
              } transition-all duration-500 ease-in-out absolute bg-white right-8 min-w-[300px] h-10 pl-2 rounded-sm border text-sm outline-none focus:border-blue-500`}
            />
            <i className="absolute right-12 fa-solid fa-xmark cursor-pointer"></i>

            <div
              onClick={() => setSearchBlock(false)}
              className="absolute bg-blue-500 text-white right-0 h-10 w-10 flex items-center justify-center "
            >
              <i className=" fa-solid fa-magnifying-glass cursor-pointer te"></i>
            </div>
          </>
        )}
      </div>{" "}
      <div className={`overflow-x-auto`}>
        <table className="w-full text-left bg-white rounded-md relative overflow-x-auto">
          <thead className="text-[16px] text-[#0B6481] bg-slate-200 tracking-tight opacity-70">
            <tr>
              {columns.map((column: ColumnProps, _index: number) => {
                return (
                  <th
                    key={column.id}
                    scope="col"
                    className={`px-4 py-2 ${column.align}`}
                    style={{ width: `${column.width}px` }}
                  >
                    {handleTableHeader(column)}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="text-[15px] opacity-90 text-[#374043] w-full">
            {rowData.map((row: any, i: number) => {
              return (
                <>
                  <tr
                    style={{
                      backgroundColor: `${
                        row?.["sl.no"] === "query_info" && "#ADD8E6"
                      }`,
                    }}
                  >
                    {columns?.map((column: any, _index: number) => {
                      return (
                        <td
                          style={{
                            width: `${column.width}px`,
                          }}
                          key={column.id}
                          className={`px-4 py-2 ${column.align}`}
                        >
                          {showData(row[column.id], column, i, row)}
                        </td>
                      );
                    })}
                  </tr>
                  {showDetail && indexing === i && (
                    <tr>
                      <td
                        className="bg-white relative border"
                        colSpan={columns.length}
                      >
                        <div className="flex flex-col items-center justify-center bg-[#F2F4F6]">
                          <div className=" bg-white p-2 text-md w-[80%] shadow-lg my-2">
                            <div className="text-sky-800 text-2xl text-center w-full font-bold  border-[sky] pb-1 ">
                              Similar Questions
                            </div>
                            <table className="w-full text-left bg-white rounded-md relative overflow-x-auto">
                              <thead className="text-[16px] text-[#0B6481] bg-slate-200 tracking-tight opacity-70">
                                <tr>
                                  <th className="text-center">Excel Row No</th>
                                  <th className="text-center">Question Stem</th>
                                  <th className="text-center">Score</th>
                                </tr>
                              </thead>
                              <tbody className="text-[15px] opacity-90 text-[#374043] w-full">
                                {row.similar_data.map(
                                  (similarData: any, index: number) => {
                                    return (
                                      <tr key={similarData.sl_no}>
                                        <td className="text-center">
                                          {similarData.sl_no}
                                        </td>
                                        <td className="px-2">
                                          {similarData.question}
                                        </td>
                                        <td className="text-center">
                                          {similarData.score}
                                        </td>
                                      </tr>
                                    );
                                  }
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
        {paginationEnabled && (
          <div className="m-4 flex items-center sm:justify-center font-semibold bg-[#F2F4F6]">
            <div className="w-full lg:w-1/2 flex items-center justify-between text-sm">
              <div
                onClick={previousPage}
                className={`${
                  currentPage <= 1 && "opacity-55 pointer-events-none"
                } w-[60px] sm:w-[120px] border text-[#1081A6] border-[#1081A6] py-1 text-center rounded-sm cursor-pointer`}
              >
                Previous
              </div>
              <div className="sm:text-sm text-[10px] text-[#374043] opacity-75">
                {`Page ${currentPage} of ${calcNumberOfPages()} | Total Count: ${totalRowsCountPerPage} of ${totalRowsCount}`}
              </div>
              <div
                onClick={updatePageNumber}
                className="w-[60px] sm:w-[120px] border text-[#1081A6] border-[#1081A6] py-1 text-center rounded-sm cursor-pointer opacity-100"
              >
                Next
              </div>
            </div>
          </div>
        )}
        {showInfo && (
          <div
            className="flex items-center justify-center fixed top-0 left-0 w-full h-full"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 98 }}
          >
            <div className="w-[500px] h-[220px] bg-white border rounded-sm shadow-sm  ">
              <div className="relative  w-full h-fit">
                <div className="bg-white p-2 text-md mx-4">
                  <div className="text-xl font-semibold text-sky-700 border-b pb-1 my-2">
                    Question Details
                  </div>
                  <div className="text-sky-800 font-semibold mb-2">
                    {individualRowData?.Question}
                  </div>
                  <ul className="list-disc text-[#75736d] mx-8">
                    <li>
                      {individualRowData?.["Option 1"] === ""
                        ? "None"
                        : individualRowData?.["Option 1"]}
                    </li>
                    <li>
                      {individualRowData?.["Option 2"] === ""
                        ? "None"
                        : individualRowData?.["Option 2"]}
                    </li>
                    <li>
                      {individualRowData?.["Option 3"] === ""
                        ? "None"
                        : individualRowData?.["Option 3"]}
                    </li>
                    <li>
                      {individualRowData?.["Option 4"] === ""
                        ? "None"
                        : individualRowData?.["Option 4"]}
                    </li>
                  </ul>{" "}
                </div>
                <i
                  onClick={() => setShowInfo(false)}
                  className="absolute text-[18px] right-2 top-2 fa-solid fa-xmark cursor-pointer opacity-50"
                ></i>
              </div>
            </div>{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTable;
