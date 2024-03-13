import React, { forwardRef } from "react";
import {
  Alert as MuiAlert,
  AlertProps,
  Stack,
  Snackbar,
  AlertColor,
} from "@mui/material";

interface SnackBarProps {
  isOpen: boolean;
  message: string;
  handleClose: () => void;
  type: any;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const colors = ["success", "error", "warning", "info"];

const SnackBar = (props: SnackBarProps) => {
  const { isOpen, handleClose, message, type } = props;

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        data-testid="snackbar-content"
        open={isOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};
export default SnackBar;
