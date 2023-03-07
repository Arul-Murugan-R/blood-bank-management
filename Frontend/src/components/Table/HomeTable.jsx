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
import TableFilterCus from "./TableFilter";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: '#2a3338',
		fontWeight: 'bold',
		fontSize: 16,
		letterSpacing: 1,
		textAlign:'center',
		fontFamily: 'Salsa',
		color:'rgb(181, 30, 35)',
		border:0
	},
	[`&.${tableCellClasses.body}`]: {
		// backgroundColor: 'rgb(48, 48, 48)',
		backgroundColor: '#2a3338',
		color: 'white',
		fontSize: 14,
		textAlign:'center',
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
	"th,td ":{
		border: "1px solid rgb(181, 30, 35)",
	},
	"&:last-child td, &:last-child th": {
		border: "1px solid rgb(181, 30, 35)",
	},
}));

function createData(name, group, age, number, state, email) {
	return { name, group, age, number, state, email };
}

const rows = [
	createData("Ajay", "AB+ve", 25, 9876543210, "Tamil Nadu", "ajay123@gmail.com"),
	createData("Rahul", "O+ve", 23, 9876543210, "Tamil Nadu", "rahul23@email.com"),
	createData("Raj", "B+ve", 21, 9876543210, "Tamil Nadu", "rajkumar@yahoo.com"),
	createData(
		"Ravi",
		"A+ve",
		22,
		9876543210,
		"Tamil Nadu",
		"raviprasth2541@gmail.com"
	),
	createData("Rajesh", "AB+ve", 24, 9876543210, "Tamil Nadu", "rajesh@co.in"),
	createData("Rajat", "O+ve", 25, 9876543210, "Tamil Nadu", ""),
	createData("Rajeev", "B+ve", 23, 9876543210, "Tamil Nadu", ""),
	createData("Rajkumar", "A+ve", 22, 9876543210, "Tamil Nadu", ""),
	createData("lalit", "O+ve", 25, 9876543210, "Tamil Nadu", ""),
	createData("monu", "B+ve", 23, 9876543210, "Tamil Nadu", ""),
	createData("lucky", "A+ve", 22, 9876543210, "Tamil Nadu", ""),
	createData("cr7", "A-ve", 45, 9876543210, "Tamil Nadu", ""),
	createData("messi", "B-ve", 45, 9876543210, "Tamil Nadu", ""),
	createData("ronaldo", "O-ve", 45, 9876543210, "Tamil Nadu", ""),
	createData("neymar", "AB-ve", 45, 9876543210, "Tamil Nadu", ""),
].sort((a, b) => (a.name < b.name ? -1 : 1));

export default function HomeTable() {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<>
			<TableFilterCus />
			<TableContainer
				component={Paper}
				sx={{
					mt:2,
					mb:2,
					maxHeight:'660px',
				}}
			>
				<Table aria-label="customized table" stickyHeader style={{borderRadius:'10px'}}>
					<TableHead>
						<TableRow>
							<StyledTableCell>Donor Name</StyledTableCell>
							<StyledTableCell >
								Blood Group
							</StyledTableCell>
							<StyledTableCell >
								State&nbsp;
							</StyledTableCell>
							<StyledTableCell >
								Age&nbsp;
							</StyledTableCell>
							<StyledTableCell >
								Phone No&nbsp;
							</StyledTableCell>
							<StyledTableCell >
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
									<StyledTableCell >
										{row.group}
									</StyledTableCell>
									<StyledTableCell >
										{row.state}
									</StyledTableCell>
									<StyledTableCell >
										{row.age}
									</StyledTableCell>
									<StyledTableCell >
										{row.number}
									</StyledTableCell>
									<StyledTableCell >
										{row.email}&nbsp;
									</StyledTableCell>
								</StyledTableRow>
							))}
					</TableBody>
				</Table>
				<TablePagination style={{backgroundColor:'#2a3338',color:'white'}}
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
