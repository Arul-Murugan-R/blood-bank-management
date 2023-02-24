import classes from "./FormControl.module.css";
import {
	InputLabel,
	FormControl,
	FormHelperText,
	FormControlLabel,
	RadioGroup,
	Radio,
} from "@mui/material";

const CustomFormControl = (props) => {
	const { field } = props;

	return (
		<FormControl
			className={classes.formControl}
			error={field.validities.isInvalid}
			color={field.validities.isValid ? "success" : "primary"}
		>
			<InputLabel htmlFor={field.properties.id}>
				{field.validities.label}
			</InputLabel>
			<RadioGroup
				aria-labelledby="radio-buttons-group-label"
				name="radio-buttons-group"
			>
				<FormControlLabel
					value={true}
					control={<Radio />}
					label="Yes"
				/>
				<FormControlLabel
					value={false}
					control={<Radio />}
					label="No"
				/>
			</RadioGroup>
			{field.validities.isInvalid && (
				<FormHelperText id="component-error-text">
					{field.validities.message}
				</FormHelperText>
			)}
		</FormControl>
	);
};

export default CustomFormControl;
