import { Table } from "@mui/material";
import React from "react";

const CustomTable = ({ children, ...rest }) => {
  return (
    <Table
      {...rest}
      sx={{
        width: "100%",
        "& > .MuiTableRow-root > .MuiTableCell-root": {
          borderBottom: "none",
          width: 20,
          ":nth-child(1)": {
            width: "auto",
            color: "text.semi",
          },
          ":nth-child(2)": {
            width: "auto",
          },
        },
        "& > .MuiTableRow-root": {
          height: "auto",
        },
      }}
    >
      {children}
    </Table>
  );
};

export default CustomTable;
