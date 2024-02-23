import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function SelectLabels() {
  const [filterOption, setFilterOption] = React.useState("Stem");

  const handleChange = (event: SelectChangeEvent) => {
    setFilterOption(event.target.value);
  };

  return (
    <FormControl sx={{ width: "100%" }} size="small">
      <Select
        size="small"
        value={filterOption}
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        style={{
          fontSize: "14px",
          fontWeight: "400",
          fontFamily: "Segoe UI",
          color: "black",
        }}
      >
        <MenuItem value={"Stem"}>Stem</MenuItem>
        <MenuItem value={"Stem and Type"}>Stem and Type</MenuItem>
        <MenuItem value={"Stem, Type and Options"}>
          Stem, Type and Options
        </MenuItem>
      </Select>
    </FormControl>
  );
}
