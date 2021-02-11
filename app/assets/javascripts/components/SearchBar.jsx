import React from 'react';

const SearchBar = ({keyword,setKeyword}) => {
  const BarStyling = {
    width: "20rem",
    background: "rgb(242, 241, 249)",
    padding: "0.5rem",
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
    borderRadius: 0,
    outline: 0,
    float: "right",
    position: "relative"
  };

  return (
    <input 
     style={BarStyling}
     key="random1"
     value={keyword}
     placeholder={"Search Book ..."}
     onChange={(e) => setKeyword(e.target.value)}
    />
  );
}

export default SearchBar