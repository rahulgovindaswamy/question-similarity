import { useEffect, useState } from "react";

const DataTable = (props: any) => {
  const { rowData, columns, hasTableActions } = props;
  const [showDetail, setShowDetails] = useState(false);
  const [indexing, setIndexing] = useState(-1);
  const [maxTable, setMaxTable] = useState(false);
  const [searchBlock, setSearchBlock] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

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

  const previousPage = () => {
    return;
  };
  const nextPage = () => {
    return;
  };
  const showData = (value: any, column: any, index: number) => {
    if (column.id === "view") {
      return (
        <div
          onClick={() => onClickShowDetails(index)}
          className="px-2 py-1 text-sm text-sky-800 cursor-pointer"
        >
          <i className="fa-solid fa-eye text-[16px]"></i>
        </div>
      );
    } else if (column.id === "preview") {
      return (
        <div
          onClick={() => setShowInfo(true)}
          className="px-2 py-1 text-sm text-sky-800 cursor-pointer"
        >
          <i className="fa-solid fa-eye text-[16px]"></i>
        </div>
      );
    } else {
      return value;
    }
  };
  return (
    <div
      className={`bg-[#F2F4F6] ${
        maxTable && "absolute w-full top-16 left-0 right-0 min-h-sc"
      } `}
    >
      <div className="w-full relative text-[#374043] opacity-90 p-2 flex items-center justify-between border border-[#C3C8CB] bg-white border-b-0">
        <div> Processed Results</div>
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
          <thead className="text-[16px] text-[#0B6481] bg-slate-200 tracking-tight font-bold opacity-70">
            <tr>
              {columns.map((column: any, index: number) => {
                return (
                  <th
                    key={index}
                    scope="col"
                    className={`px-4 py-2 ${column.align}`}
                    style={{ width: `${column.width}px` }}
                  >
                    {column.label}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="text-[15px] opacity-90 text-[#374043]">
            {rowData.map((row: any, i: number) => {
              return (
                <>
                  <tr key={i}>
                    {columns?.map((column: any, index: number) => {
                      return (
                        <td
                          style={{ width: `${column.width}px` }}
                          key={column.id}
                          className={`px-4 py-2 ${column.align}`}
                        >
                          {showData(row[column.id], column, i)}
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
                              Related Questions
                            </div>
                            <div className="bg-white p-2 text-md border-b mx-4">
                              <div className="text-sky-800 font-semibold">
                                1. What is capital of india?
                              </div>
                              <div className="list-disc	2xl:flex items-center justify-between text-[#75736d] ">
                                <li>Karnataka</li>
                                <li>Tamilnadu</li>
                                <li>Andra Pradesh</li>
                                <li>Kerala</li>
                              </div>{" "}
                            </div>
                            <div className=" bg-white p-2 text-md border-b mx-4">
                              <div className="text-sky-800 font-semibold">
                                2. Check line in a chain surveying ?
                              </div>
                              <div className="list-disc	2xl:flex items-center justify-between text-[#75736d] ">
                                <li>Checks the accuracy of the framework </li>
                                <li>
                                  Enables the surveyor to locate the interior
                                  details which are far away from the main chain
                                  lines
                                </li>
                                <li>
                                  Fixes up the directions of all other lines{" "}
                                </li>
                                <li>All of the above </li>
                              </div>
                            </div>
                            <div className="bg-white p-2 text-md mx-4 ">
                              <div className="text-sky-800 font-semibold">
                                3. What is your name?
                              </div>
                              <div className="list-disc	2xl:flex items-center justify-between text-[#75736d]">
                                <li>Sunil charan </li>
                                <li>Vinay</li>
                                <li>Rahul</li>
                                <li>Deepak</li>
                              </div>
                            </div>
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
        <div className="m-4 flex items-center sm:justify-center font-semibold bg-[#F2F4F6]">
          <div className="w-full lg:w-1/2 flex items-center justify-between text-sm">
            <div
              onClick={previousPage}
              className=" opacity-55 w-[60px] sm:w-[120px] border text-[#1081A6] border-[#1081A6] py-1 text-center rounded-sm cursor-pointer "
            >
              Previous
            </div>
            <div className="sm:text-sm text-[10px] text-[#374043] opacity-75">
              Page 1 of 3 | Total Count: 145
            </div>
            <div
              onClick={nextPage}
              className="w-[60px] sm:w-[120px] border text-[#1081A6] border-[#1081A6] py-1 text-center rounded-sm cursor-pointer opacity-100"
            >
              Next
            </div>
          </div>
        </div>
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
                    1. What is capital of india?
                  </div>
                  <div className="list-disc	2xl:flex items-center justify-between text-[#75736d] ">
                    <li>Karnataka</li>
                    <li>Tamilnadu</li>
                    <li>Andra Pradesh</li>
                    <li>Kerala</li>
                  </div>{" "}
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
