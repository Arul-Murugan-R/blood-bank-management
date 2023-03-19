import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { Button } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { SnackActions } from "../../../store/SnackStore";
import { useDispatch, useSelector } from "react-redux";
const themeCol = "#ccc";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: "#2a3338",
		fontWeight: "bold",
		fontSize: 16,
		letterSpacing: 1,
		textAlign: "center",
		fontFamily: "Salsa",
		color: themeCol,
		border: 0,
	},
	[`&.${tableCellClasses.body}`]: {
		// backgroundColor: 'rgb(48, 48, 48)',
		backgroundColor: "#2a3338",
		color: themeCol,
		fontSize: 14,
		textAlign: "center",
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:hover": {
		cursor: "pointer",
	},
	"&:nth-of-type(odd)": {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	"th,td ": {
		border: "1px solid " + themeCol,
	},
	"&:last-child td, &:last-child th": {
		border: "1px solid " + themeCol,
	},
}));

export default function NearDonorTable(props) {
	const dispatch = useDispatch();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [rows, setRows] = useState(props.data);
	console.log(rows);
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<div id="table">
			<TableContainer
				component={Paper}
				sx={{
					mt: 2,
					mb: 2,
					maxHeight: "720px",
				}}
			>
				<Table
					aria-label="customized table"
					stickyHeader
					style={{ borderRadius: "10px" }}
				>
					<TableHead>
						<TableRow>
							<StyledTableCell>Donor Name</StyledTableCell>
							<StyledTableCell>Latitude</StyledTableCell>
							<StyledTableCell>Longitude&nbsp;</StyledTableCell>
							{/* <StyledTableCell >
								Phone No&nbsp;
							</StyledTableCell>
							<StyledTableCell >
								Email Id&nbsp;
							</StyledTableCell> */}
							<StyledTableCell >
								BloodGroup&nbsp;
							</StyledTableCell>
							<StyledTableCell>
								Make Request&nbsp;
							</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows
							.slice(
								page * rowsPerPage,
								page * rowsPerPage + rowsPerPage
							)
							.map((row) => (
								<StyledTableRow key={row.id}>
									<StyledTableCell component="th" scope="row">
										{row.name}
									</StyledTableCell>
									<StyledTableCell>
										{row.location.latitude}
									</StyledTableCell>
									<StyledTableCell>
										{row.location.longitude}
									</StyledTableCell>
									<StyledTableCell>
										<big>{row.bloodGroup}ve</big>
									</StyledTableCell>
									{/* <StyledTableCell >
										{row.number}
									</StyledTableCell>
									<StyledTableCell >
										{row.email}&nbsp;
									</StyledTableCell> */}
									<StyledTableCell>
										<button
											style={{
												margin: "0",
												padding: "5px",
												color: themeCol,
												border: "1px solid white",
												background: "transparent",
												transition: "all 0.5 linear",
												cursor: "pointer",
												"&:hover": {
													backgroundColor: "white",
													color: "black",
												},
											}}
										>
											Request
										</button>
									</StyledTableCell>
								</StyledTableRow>
							))}
					</TableBody>
				</Table>
				<TablePagination
					style={{ backgroundColor: "#2a3338", color: "white" }}
					rowsPerPageOptions={[10, 25, 100]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</TableContainer>
		</div>
	);
}
