import { Button } from "@mui/material";
import React from "react";

const OutlinedButton = ({ children, ...props }) => {
  return (
    <Button
      variant="outlined"
      sx={{
        textTransform: "inherit",
        borderColor: "white",
        borderRadius: "20px",
        color: "white",
        paddingRight: "24px",
        paddingLeft: "24px",
        height: "40px",

        "&:hover": {
          borderColor: "white",
        },

        ...props.sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default OutlinedButton;
