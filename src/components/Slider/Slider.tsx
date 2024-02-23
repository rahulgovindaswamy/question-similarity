import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

const MAX = 10;
const MIN = 0;
const marks = [
  {
    value: MIN,
    label: "",
  },
  {
    value: MAX,
    label: "",
  },
];

export default function CustomMarks() {
  const [val, setVal] = React.useState<number>(MIN);
  const handleChange = (_: Event, newValue: number | number[]) => {
    setVal(newValue as number);
  };

  return (
    <Box sx={{ paddingLeft: "8px" }}>
      <Slider
        marks={marks}
        step={1}
        value={val}
        valueLabelDisplay="auto"
        min={MIN}
        max={MAX}
        onChange={handleChange}
        sx={{
          "& .MuiSlider-track": {
            background: "orange",
            borderColor: "orange",
          },
          "& .MuiSlider-thumb": {
            [`&:nth-of-type(n)`]: {
              background: "orange",
              "& span": {
                background: "orange",
              },
            },
          },
          "& .MuiSlider-rail": {
            background: "orange",
          },
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="body2"
          onClick={() => setVal(MIN)}
          sx={{ cursor: "pointer" }}
        >
          {MIN}
        </Typography>
        <Typography
          variant="body2"
          onClick={() => setVal(MAX)}
          sx={{ cursor: "pointer" }}
        >
          {MAX}
        </Typography>
      </Box>
    </Box>
  );
}
