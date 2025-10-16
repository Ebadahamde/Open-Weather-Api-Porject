import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";

// المدن المتاحة
const options = ["Cairo", "BahariyaOasis", "South Sinai - Dahab"];

export default function SplitButton({ onSelectCity }) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClick = () => {
    onSelectCity(options[selectedIndex]); // إرسال المدينة المختارة لـ App.js
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
    onSelectCity(options[index]); // إرسال التغيير
  };

  const handleToggle = () => setOpen((prevOpen) => !prevOpen);
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) return;
    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup
        ref={anchorRef}
        variant="contained"
        aria-label="Button group with a nested menu"
        sx={{
          marginTop: "25%",
          backgroundColor: "rgba(0, 0, 0, 0.25)",
          backdropFilter: "blur(4px)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          "& .MuiButton-root": {
            border: "none", // 🔥 يشيل الخط الفاصل بين الأزرار
          },
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        <Button
          onClick={handleClick}
          sx={{
            color: "#fff",
            backgroundColor: "rgba(0, 0, 0, 0.25)",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.3)",
            },
          }}
        >
          {options[selectedIndex]}
        </Button>
        <Button
          size="small"
          onClick={handleToggle}
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select city"
          aria-haspopup="menu"
          sx={{
            color: "#fff",
            backgroundColor: "rgba(0, 0, 0, 0.25)",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.3)",
            },
          }}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>

      <Popper
        sx={{ zIndex: 1 }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper
              sx={{
                backgroundColor: "rgba(0, 0, 0, 0.25)",
                backdropFilter: "blur(4px)",
                color: "#fff",
                "& .MuiMenuItem-root:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
