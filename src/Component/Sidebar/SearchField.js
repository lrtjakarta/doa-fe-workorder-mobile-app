import { Box, TextField } from "@mui/material";
import SearchIcon from "Component/Icons/Search";
import React from "react";

const SearchField = ({ onChange, ...rest }) => {
  return (
    <TextField
      {...rest}
      onChange={(e) => onChange(e)}
      fullWidth
      size="small"
      placeholder="Search"
      InputProps={{
        startAdornment: (
          <Box mr={1} sx={{ display: "flex" }}>
            <SearchIcon />
          </Box>
        ),
      }}
    />
  );
};

export default SearchField;
