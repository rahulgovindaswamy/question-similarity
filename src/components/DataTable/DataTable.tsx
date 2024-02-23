import { useEffect, useState } from "react";

const rowData: any = [
  {
    question: "A very strong wind is called",
    relatedCount: 3,
    score: 7.2,
    slNo: 12,
  },
  {
    question: "A soft wind is called breeze",
    relatedCount: 4,
    score: 5.2,
    slNo: 14,
  },
  {
    question: "Integrated system that helps you build embedded",
    relatedCount: 3,
    score: 7.2,
    slNo: 15,
  },
  {
    question: "Play Music is no longer available",
    relatedCount: 4,
    score: 9.0,
    slNo: 89,
  },
];
const columns = [
  { id: "slNo", label: "SL. No", width: 100, align: "text-center" },
  {
    id: "question",
    label: "Question Team",
    width: 600,
    align: "text-left",
  },
  { id: "score", label: "Score", width: 100, align: "text-center" },
  {
    id: "relatedCount",
    label: "Related Count",
    width: 120,
    align: "text-center",
  },
  { id: "view", label: "View", width: 100, align: "text-center" },
];
const DataTable = () => {
  const [showDetail, setShowDetails] = useState(false);
  const [indexing, setIndexing] = useState(-1);

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
    alert("prev");
  };
  const nextPage = () => {
    alert("prev");
  };
  const showData = (value: any, column: any, index: number) => {
    if (column.id === "view") {
      return (
        <div
          onClick={() => onClickShowDetails(index)}
          className="border px-2 py-1 text-sm shadow-md text-sky-800 cursor-pointer"
        >
          <i className="fa-solid fa-eye text-[16px]"></i>
        </div>
      );
    } else {
      return value;
    }
  };
  return (
    <div className="relative overflow-x-auto ">
      <table className="w-full text-left bg-white rounded-md">
        <thead className="text-[16px] text-[#0B6481] bg-slate-200 tracking-tight font-bold opacity-70	">
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
                      <div className="flex flex-col items-center justify-center bg-slate-100">
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
                          <div className="bg-white p-2 text-md border-b mx-4 ">
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

      <div className="m-4 flex items-center sm:justify-center font-semibold">
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
    </div>
  );
};

export default DataTable;
