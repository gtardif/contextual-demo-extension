import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Typography from "@mui/material/Typography";
import { Box, BoxProps } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  commandWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
  },
  command: {
    fontWeight: "bold",
    whiteSpace: "pre",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

interface Props {
  readonly command: string;
  readonly size?: "small" | "medium";
  readonly sx?: BoxProps["sx"];
}

export function CopyCommand({ command, size = "small", sx = {} }: Props) {
  const classes = useStyles();
  return (
    <Box className={classes.commandWrapper} sx={sx}>
      <Typography
        color="textPrimary"
        component="div"
        className={classes.command}
        sx={{
          fontSize: size === "small" ? "0.875rem" : "1rem",
        }}
      >
        {command}
      </Typography>
    </Box>
  );
}
