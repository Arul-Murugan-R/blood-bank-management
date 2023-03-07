import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const doubt = 'red';

const Blood = [
	{
		value: 'A+',
		label: 'A+',
	},
	{
		value: 'A-',
		label: 'A-',
	},
	{
		value: 'B+',
		label: 'B+',
	},
	{	
		value: 'B-',
		label: 'B-',
	},
	{
		value: 'AB+',
		label: 'AB+',
	},
	{
		value: 'AB-',
		label: 'AB-',
	},
	{
		value: 'O+',
		label: 'O+',
	},
	{
		value: 'O-',
		label: 'O-',
	},
]

const States = [
	{
		value: 'Andhra Pradesh',
		label: 'Andhra Pradesh',
	},
	{
		value: 'Arunachal Pradesh',
		label: 'Arunachal Pradesh',
	},
	{
		value: 'Assam',
		label: 'Assam',
	},
	{
		value: 'Bihar',
		label: 'Bihar',
	},
]
const Age = [
	{
		value: '18-25',
		label: '18-25',
	},
	{
		value: '26-35',
		label: '26-35',
	},
	{
		value: '36-45',
		label: '36-45',
	},
	{
		value: '46-55',
		label: '46-55',
	},
]

const SelectCus = styled(TextField)(({ theme }) => ({
	color: 'white',
	"& .MuiOutlinedInput-root": {
		width: '300px',
		margin:0,
		"& fieldset": {
			borderColor: doubt,
		},	
		"&:hover fieldset": {
			borderColor: doubt,
		},
		"&.Mui-focused fieldset": {
			borderColor: doubt,
		},
	},
	"& .MuiInputBase-input": {
		color: 'white',
	},
	"& .MuiInputLabel-root": {
		color: doubt,
	},
}));


const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: '#2a3338',
		fontWeight: 'bold',
		fontSize: 16,
		letterSpacing: 1,
		textAlign: 'center',
		fontFamily: 'Salsa',
		color: doubt,
		border: 0
	},
	[`&.${tableCellClasses.body}`]: {
		// backgroundColor: 'rgb(48, 48, 48)',
		backgroundColor: '#2a3338',
		color: 'white',
		fontSize: 14,
		textAlign: 'center',
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
		border: "1px solid rgba(223, 64, 90, 1)",
	},
	"&:last-child td, &:last-child th": {
		border: "1px solid rgba(223, 64, 90, 1)",
	},
}));


export default function TableFilterCus() {
	return (
		<>
			<TableContainer
				component={Paper}
				sx={{
					mt: 2,
					mb: 2,
					maxHeight: '660px',
				}}
			>
				<Table aria-label="customized table" stickyHeader style={{ borderRadius: '10px' }}>
					<TableHead>
						<TableRow>
							<StyledTableCell >
								Filter By Blood Group
							</StyledTableCell>
							<StyledTableCell >
								Fiter By State
							</StyledTableCell>
							<StyledTableCell >
								Filter By Age
							</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<StyledTableRow >
							<StyledTableCell style={{color:'white'}}>
								<SelectCus
									id="outlined-select-blood"
									select
									label="Select"
									defaultValue="AB+"
									helperText="Please select your Blood Group"
								>
									{Blood.map((option) => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</SelectCus>
							</StyledTableCell>
							<StyledTableCell >
							<SelectCus
									id="outlined-select-state"
									select
									label="Select"
									defaultValue="Andhra Pradesh"
									helperText="Please select your State"
								>
									{States.map((option) => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</SelectCus>
							</StyledTableCell>
							<StyledTableCell >
							<SelectCus
									id="outlined-select-age"
									select
									label="Select"
									defaultValue="18-25"
									helperText="Please select your Age"
								>
									{Age.map((option) => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</SelectCus>
							</StyledTableCell>
						</StyledTableRow>
					</TableBody>
				</Table>
			</TableContainer>
			<center>
				<Button  sx={{width:'200px',
					mt: 2, mb: 2, ml: 2, color: doubt, border: '1px solid rgb(181, 30, 35)',
					background: 'transparent', transition: 'all 0.5 linear',cursor:'pointer', "&:hover": { backgroundColor: doubt, color: 'white',
			
				}
				}}>Filter</Button>
			</center>
		</>
	);
}


