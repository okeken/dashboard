import { useEffect, useState } from "react";
import getDashLayout from "../../layout/dashboard";
import { AiOutlineSearch, AiOutlinePlusSquare } from "react-icons/ai";
import { HiOutlineBookmark } from "react-icons/hi";
import { BsFilter } from "react-icons/bs";
import fetchData from "../../utils/fetchData";
import EnhancedTable from "../../components/table";
import filterByKeys from "../../utils/searchData";
import CollapseElement from "../../components/collapseElement";
import TextArea from "../../components/TextArea";
import Modal from "../../components/modal";
import validateString from "../../utils/validatewithPattern";
import Checkbox from "../../components/Checkbox";
import filterArrayByKeysAndValues from "../../utils/filterData";
import wait from "../../utils/wait";
import FullScreenLoader from "../../components/loader";

const NotContent = ({ setData, isLoading }) => {
  return (
    <div className="min-h-[calc(100vh-85px)] justify-center items-center flex">
      {isLoading ? (
        <>Loadin</>
      ) : (
        <div className="text-center">
          <div className="text-2xl font-semibold text-brand-blue-400">
            What are you looking for?
          </div>
          <p className="my-2 text-brand-blue-300">
            Get started by searching & filtering a few
          </p>
          <button
            onClick={setData}
            className="px-16 py-3 my-2 font-semibold text-white bg-brand-blue-500"
          >
            Fetch data
          </button>
          <div className="text-brand-blue-300">
            or
            <span className="ml-2 text-brand-blue-500">search for an item</span>
          </div>
        </div>
      )}
    </div>
  );
};

const FilterItem = ({ reset, setData }) => {
  const [isDirty, setIsDirty] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleSubmit = (event) => {
    if (!disableForm) return;
    event.preventDefault();
    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData.entries());
    event.target.reset();
    const allType = ["EDF", "CAO", "SFO"];
    const typeData = formObject.all
      ? [...allType]
      : [
          formObject.EDF && "EDF",
          formObject.CAO && "CAO",
          formObject.SFO && "SFO",
        ];
    const val = Object.values(formObject).filter(
      (i) => i !== "true" && i !== "false"
    );
    const query = [...val, ...typeData].filter((i) => Boolean(i));
    setData((data) => {
      const filtered = filterArrayByKeysAndValues(
        data,
        ["type", "orderNumber"],
        query
      );
      return filtered;
    });
    resetFilter();
  };

  const [userInput, setUserInput] = useState({
    from: "",
    receiver: "",
    selectedAll: false,
    all: false,
    CAO: false,
    SFO: false,
    EDF: false,
  });

  const handleChange = (e) => {
    if (e.target.checked != undefined) {
      setUserInput((state) => ({
        ...state,
        [e.target.name]: e.target.checked,
      }));
      if (e.target.name == "all") {
        setUserInput((state) => ({
          ...state,
          CAO: e.target.checked,
          SFO: e.target.checked,
          EDF: e.target.checked,
        }));
      }
      setIsDirty(true);
      return;
    }
    setUserInput((state) => ({ ...state, [e.target.name]: e.target.value }));
    setIsDirty(true);
  };
  const { from, all, CAO, SFO, EDF } = userInput;
  useEffect(() => {
    const err = validateString(from.split(","));
    setIsValid(() => err);
  }, [from]);

  const disableForm = isValid && isDirty;
  function resetFilter() {
    setIsDirty(false);
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="h-screen overflow-scroll absolute right-0 w-full max-w-[23rem] bg-white z-50 overflow-x-hidden flex flex-col justify-between"
    >
      <div className="flex justify-between items-center bg-[#D9E0E7] p-3">
        <div className="flex items-center">
          <BsFilter className="mr-2 text-[#778FAB] scale-150" />
          <div>
            <div className="text-xl ">Set Parameter</div>
            <span className="text-xs">9 parameters available</span>
          </div>
        </div>
        <div>
          <button
            type="button"
            onClick={reset}
            className="text-[#0C67A0] font-semibold"
          >
            Reset All
          </button>
        </div>
      </div>
      <div>
        <div className="border-b-2">
          <CollapseElement
            prevStatus={true}
            className="px-3 my-3 text-[#10243C]"
            title="From (node) "
          >
            <TextArea
              onBlur={() => setIsDirty(true)}
              onChange={handleChange}
              name="from"
              className="mt-2"
              placeholder="6656,3433,3443"
              value={userInput.from}
              error={
                !isValid && isDirty
                  ? "Node needs to be four digits (Ex. “”1111) "
                  : ""
              }
            />
          </CollapseElement>
        </div>
        <div className="border-b-2">
          <CollapseElement className="px-3 my-3  text-[#10243C]" title="Type">
            <div className="mt-3">
              <div className="border-b-2 flex items-center">
                <label htmlFor="type-all" className="ml-1 py-2 my-1 flex">
                  <Checkbox
                    className="mr-2"
                    onChange={handleChange}
                    name="all"
                    id="type-all"
                    checked={all}
                    value={all}
                  />
                  Show All
                </label>
              </div>

              <div className="border-b-2 flex items-center">
                <label htmlFor="type-cao" className="ml-1 py-2 my-1 flex">
                  <Checkbox
                    onChange={handleChange}
                    name="CAO"
                    id="type-cao"
                    checked={CAO}
                    value={CAO}
                    className="mr-2"
                  />
                  CAO
                </label>
              </div>
              <div className="border-b-2 flex items-center ">
                <label htmlFor="type-sfo" className="ml-1 py-2 my-1 flex ">
                  <Checkbox
                    className="mr-2"
                    onChange={handleChange}
                    name="SFO"
                    id="type-sfo"
                    checked={SFO}
                    value={SFO}
                  />
                  SFO
                </label>
              </div>
              <div className="border-b-2 flex items-center">
                <label htmlFor="type-eof" className="ml-1 py-2 my-1 flex">
                  <Checkbox
                    className="mr-2"
                    onChange={handleChange}
                    name="EDF"
                    id="type-eof"
                    checked={EDF}
                    value={EDF}
                  />{" "}
                  EDF
                </label>
              </div>
            </div>
          </CollapseElement>
        </div>

        <div className="border-b-2">
          <CollapseElement
            className="px-3 my-3 text-[#10243C]"
            title="Receiving (node) "
          >
            <TextArea
              name="receiver"
              onChange={handleChange}
              className="mt-2"
              placeholder="Receiver (Club) ID (Ex. “6783”)"
            />
          </CollapseElement>
        </div>
        <div className="border-b-2">
          <CollapseElement className="px-3 my-3 text-[#10243C]" title="Item">
            <TextArea
              name="item"
              className="mt-2"
              placeholder="Item ID (Ex. “67344383”)"
            />
          </CollapseElement>
        </div>
        <div className="border-b-2">
          <CollapseElement
            className="px-3 my-3 text-[#10243C]"
            title="Warehouse Order"
          >
            <TextArea className="mt-2" placeholder="Item ID (Ex. “67344383”)" />
          </CollapseElement>
        </div>
        <div className="border-b-2">
          <CollapseElement
            className="px-3 my-3 text-[#10243C]"
            title="Category"
          >
            <TextArea className="mt-2" placeholder="Item ID (Ex. “67344383”)" />
          </CollapseElement>
        </div>
        <div className="border-b-2">
          <CollapseElement className="px-3 my-3 text-[#10243C]" title="Status">
            <TextArea className="mt-2" placeholder="Item ID (Ex. “67344383”)" />
          </CollapseElement>
        </div>
        <div className="border-b-2">
          <CollapseElement
            className="px-3 my-3 text-[#10243C]"
            title="Created On"
          >
            <TextArea className="mt-2" placeholder="Item ID (Ex. “67344383”)" />
          </CollapseElement>
        </div>
        <div className="border-b-2">
          <CollapseElement
            className="px-3 my-3 text-[#10243C]"
            title="Pick Date"
          >
            <TextArea className="mt-2" placeholder="Item ID (Ex. “67344383”)" />
          </CollapseElement>
        </div>
      </div>
      <div className="flex justify-between items-center bg-[#D9E0E7] p-3">
        <div>
          <button
            type="button"
            onClick={resetFilter}
            className="text-[#0C67A0] font-semibold"
          >
            Cancel
          </button>
        </div>
        <div>
          <button
            disabled={!disableForm}
            type="submit"
            className={` rounded-md px-4 p-2 font-semibold ${
              !disableForm
                ? "text-[#5D697C] bg-[#CACED4] "
                : " bg-[#0C67A0] text-white"
            }`}
          >
            Apply
          </button>
        </div>
      </div>
    </form>
  );
};
const Dashboard = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterValue, setFilterValue] = useState([]);
  const [queryValue, setQueryValue] = useState("");
  const [filtering, setFiltering] = useState(false);

  const fetchProduct = async () => {
    setIsLoading(true);
    await wait(2);
    const product = await fetchData();
    setData((state) => [...state, ...product]);
    setIsLoading(false);
  };

  const searchItem = (e) => {
    const value = e.target.value;
    const currentData = filterByKeys(
      data,
      ["orderNumber", "productNumber"],
      value
    );
    setFilterValue(currentData);
    setQueryValue(value);
  };

  const resetFiltering = () => {
    setFiltering(false);
    setQueryValue("");
  };
  const filterItem = () => {
    setFiltering(!filtering);
  };
  return (
    <>
      <Modal toggle={filterItem} isOpen={filtering}>
        <FilterItem setData={setData} reset={resetFiltering} />
      </Modal>
      <div className="relative">
        <div className="flex justify-between px-10 py-3 flex-wrap">
          <div className="mb-2 lg:mb-0">
            <div className="text-2xl font-semibold text-brand-blue-400">
              Item Search
            </div>
            <div className="text-brand-blue-300">{data.length} items</div>
          </div>
          <div>
            <div className="flex items-center">
              <div className="relative mr-4">
                <input
                  value={queryValue}
                  onChange={searchItem}
                  placeholder="Search by item #, Order #"
                  className="p-2 pr-12 bg-transparent border"
                />
                <div className="absolute -translate-y-1/2 right-3 top-1/2">
                  <AiOutlineSearch className="scale-125 text-brand-blue-200" />
                </div>
              </div>
              <div className="mr-6">
                <AiOutlinePlusSquare
                  onClick={filterItem}
                  className="scale-[2.2] text-brand-blue-200"
                />
              </div>
              <div className="mr-6 hidden lg:flex ">
                <HiOutlineBookmark className="scale-[1.5] text-brand-blue-200" />
              </div>
              <div>
                <BsFilter className="scale-[1.5] text-brand-blue-200" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#E0E9F7] h-1  w-full "> </div>
      </div>
      {queryValue ? (
        <div>
          <div className="ml-12 mt-4">Search Results for "{queryValue}"</div>

          {!filterValue.length && (
            <div className="mt-4 ml-12 flex items-center  font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8  my-4  mr-2"
              >
                <path
                  fillRule="evenodd"
                  d="M11 2a9 9 0 100 18 9 9 0 000-18zM9.293 9.293a1 1 0 011.414 0L12 10.586l1.293-1.293a1 1 0 111.414 1.414L13.414 12l1.293 1.293a1 1 0 01-1.414 1.414L12 13.414l-1.293 1.293a1 1 0 01-1.414-1.414L10.586 12 9.293 10.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              No Result Found
            </div>
          )}
        </div>
      ) : (
        ""
      )}

      {isLoading ? <FullScreenLoader /> : ""}
      <div className="px-10">
        {!data.length && !isLoading ? (
          <NotContent isLoading={isLoading} setData={fetchProduct} />
        ) : (
          <EnhancedTable rows={queryValue ? filterValue : data} />
        )}
      </div>
    </>
  );
};

Dashboard.getLayout = getDashLayout;

export default Dashboard;
