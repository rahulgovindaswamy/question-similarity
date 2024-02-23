import React from "react";

const SearchInput = (props: any) => {
  const {
    type,
    value,
    placeholder,
    onChange,
    label,
    onClearSearch,
    showClear,
    handleEnterKeyPress,
  } = props;
  return (
    <div className="relative md:w-fit w-full md:mb-0 mb-2">
      <div className="text-[#374043] font-semibold ml-1">{label}</div>
      <input
        type={type}
        className="bg-[#F2F4F6] w-full md:w-[300px] outline-none p-2 rounded-sm text-sm border focus:border-[#1081A6] focus:shadow-sm"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={handleEnterKeyPress}
      />
      {value?.length > 0 && showClear && (
        <i
          onClick={onClearSearch}
          className="absolute top-2 text-gray-400 right-[1px] cursor-pointer fa-solid fa-xmark bg-[#F2F4F6] px-2"
        ></i>
      )}
    </div>
  );
};

export default SearchInput;
