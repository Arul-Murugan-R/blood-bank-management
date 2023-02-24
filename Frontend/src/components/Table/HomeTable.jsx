import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));

function createData(name, group, age, number, address, email) {
	return { name, group, age, number, address, email };
}

const rows = [
	createData("Ajay", "AB+ve", 25, 9876543210, "Delhi", "ajay123@gmail.com"),
	createData("Rahul", "O+ve", 23, 9876543210, "Delhi", "rahul23@email.com"),
	createData("Raj", "B+ve", 21, 9876543210, "Delhi", "rajkumar@yahoo.com"),
	createData(
		"Ravi",
		"A+ve",
		22,
		9876543210,
		"Delhi",
		"raviprasth2541@gmail.com"
	),
	createData("Rajesh", "AB+ve", 24, 9876543210, "Delhi", "rajesh@co.in"),
	createData("Rajat", "O+ve", 25, 9876543210, "Delhi", ""),
	createData("Rajeev", "B+ve", 23, 9876543210, "Delhi", ""),
	createData("Rajkumar", "A+ve", 22, 9876543210, "Delhi", ""),
	createData("lalit", "O+ve", 25, 9876543210, "Delhi", ""),
	createData("monu", "B+ve", 23, 9876543210, "Delhi", ""),
	createData("lucky", "A+ve", 22, 9876543210, "Delhi", ""),
	createData("cr7", "A-ve", 45, 9876543210, "Delhi", ""),
	createData("messi", "B-ve", 45, 9876543210, "Delhi", ""),
	createData("ronaldo", "O-ve", 45, 9876543210, "Delhi", ""),
	createData("neymar", "AB-ve", 45, 9876543210, "Delhi", ""),
].sort((a, b) => (a.name < b.name ? -1 : 1));

export default function HomeTable() {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		console.log(rowsPerPage);
		setPage(0);
	};

	console.log(rows);

	return (
		<>
			<TableContainer
				component={Paper}
				sx={{
					marginTop: "100px",
					height: "640px auto",
					overflow: "auto",
				}}
			>
				<Table aria-label="customized table" stickyHeader>
					<TableHead>
						<TableRow>
							<StyledTableCell>Donor Name</StyledTableCell>
							<StyledTableCell align="right">
								Blood Group
							</StyledTableCell>
							<StyledTableCell align="right">
								Age&nbsp;
							</StyledTableCell>
							<StyledTableCell align="right">
								Phone No&nbsp;
							</StyledTableCell>
							<StyledTableCell align="right">
								Address&nbsp;
							</StyledTableCell>
							<StyledTableCell align="right">
								Email Id&nbsp;
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
								<StyledTableRow key={row.name}>
									<StyledTableCell component="th" scope="row">
										{row.name}
									</StyledTableCell>
									<StyledTableCell align="right">
										{row.group}
									</StyledTableCell>
									<StyledTableCell align="right">
										{row.age}
									</StyledTableCell>
									<StyledTableCell align="right">
										{row.number}
									</StyledTableCell>
									<StyledTableCell align="right">
										{row.address}
									</StyledTableCell>
									<StyledTableCell align="right">
										{row.email}&nbsp;
									</StyledTableCell>
								</StyledTableRow>
							))}
					</TableBody>
				</Table>
				<TablePagination
					rowsPerPageOptions={[10, 25, 100]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</TableContainer>
		</>
	);
}
