import React, { useState } from "react";
import { AutoComplete, Input } from "antd";

const searchResult = (query) =>
  [1, 2, 3, 4, 5]
    .join(".")
    .split(".")
    .map((_, idx) => {
      const category = `${query}${idx}`;
      return {
        value: category,
        label: (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>
              Found {query} on{" "}
              <a
                href={`https://s.taobao.com/search?q=${query}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {category}
              </a>
            </span>
          </div>
        ),
      };
    });

const Searchbar = () => {
  const [options, setOptions] = useState([]);
  const handleSearch = (value) => {
    setOptions(value ? searchResult(value) : []);
  };
  const onSelect = (value) => {
    console.log("onSelect", value);
  };
  return (
    <AutoComplete
      dropdownMatchSelectWidth={252}
      options={options}
      onSelect={onSelect}
      autoFocus={true}
      status="error"
      onSearch={handleSearch}
    >
      <Input.Search
        size="large"
        placeholder="enter recipient name"
        enterButton
      />
    </AutoComplete>
  );
};
export default Searchbar;
