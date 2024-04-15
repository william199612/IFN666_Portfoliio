import * as React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";

const options = ["About", "Resume", "Portfolio"];

export default function SplitButton() {
	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef(null);
	const [selectedIndex, setSelectedIndex] =
		React.useState(1);

	const handleClick = () => {
		console.info(`You clicked ${options[selectedIndex]}`);
	};

	const handleMenuItemClick = (event, index) => {
		setSelectedIndex(index);
		setOpen(false);
	};

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event) => {
		if (
			anchorRef.current &&
			anchorRef.current.contains(event.target)
		) {
			return;
		}

		setOpen(false);
	};

	return (
		<React.Fragment>
			<ButtonGroup
				variant="contained"
				ref={anchorRef}
				aria-label="Button group with a nested menu"
			>
				<Button>Expolore</Button>
				<Button
					size="small"
					aria-controls={
						open ? "split-button-menu" : undefined
					}
					aria-expanded={open ? "true" : undefined}
					aria-label="select profile"
					aria-haspopup="menu"
					onClick={handleToggle}
				>
					<ArrowDropDownIcon />
				</Button>
			</ButtonGroup>
			<Popper
				sx={{
					zIndex: 1,
				}}
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
								placement === "bottom"
									? "center top"
									: "center bottom",
						}}
					>
						<Paper>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList
									id="split-button-menu"
									autoFocusItem
								>
									{options.map((option, index) => (
										<MenuItem
											key={option}
											selected={index === selectedIndex}
											onClick={(event) =>
												handleMenuItemClick(event, index)
											}
										>
											<Link
												to={`/${option.toLowerCase()}`}
												style={{ textDecoration: "none" }}
											>
												{option}
											</Link>
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
