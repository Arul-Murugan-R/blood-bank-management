import { Container } from "@mui/system";
import {
	validatePhoneNumber,
	validateYesNo,
} from "../../Utilities/FormValidationFunctions";
import classes from "./Profile.module.css";

/* 
phone
address
group
dob
last donation
health status
disease
tattoos
antibiotics
trecently travelled to 
*/

const UserDetailsForm = (props) => {
	const antibiotics = useInput(
		{
			type: "radio",
			label: "Have you taken any antibiotics in the past few weeks?",
			name: "antibiotics",
		},
		validateYesNo
	);
	const tattoos = useInput(
		{
			type: "radio",
			label: "Did you get any within the last 6 months?",
			name: "tattoos",
		},
		validateYesNo
	);
	const recentTravel = useInput(
		{
			type: "radio",
			label: "Have you recently travelled to any foreign country with high rates of infectious diseases in the past 6 months?",
			name: "recentTravel",
		},
		validateYesNo
	);
	const diseases = useInput(
		{
			type: "radio",
			label: "Do you have any chronic diseases?",
			name: "diseases",
		},
		validateYesNo
	);
	const phone = useInput(
		{
			type: "tel",
			label: "Phone Number",
			name: "phone",
		},
		validatePhoneNumber
	);

	return <Container sx={{}} maxWidth="lg"></Container>;
};

export default UserDetailsForm;
