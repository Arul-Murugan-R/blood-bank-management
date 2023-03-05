import classes from "./FormControl.module.css";
import {
	InputLabel,
	FormControl,
	FormHelperText,
	FormControlLabel,
	RadioGroup,
	Radio,
	FormLabel,
} from "@mui/material";

const CustomRadioControl = (props) => {
	const { field } = props;

	return (
		<FormControl
			className={classes.formControl}
			error={field.validities.isInvalid}
			color={field.validities.isValid ? "success" : "primary"}
		>
			<FormLabel htmlFor={field.properties.id}>
				{field.validities.label}
			</FormLabel>
			<RadioGroup
				aria-labelledby="radio-buttons-group-label"
				name="radio-buttons-group"
				onChange={field.properties.onChange}
				onBlur={field.properties.onBlur}
			>
				<FormControlLabel value={1} control={<Radio />} label="Yes" />
				<FormControlLabel value={0} control={<Radio />} label="No" />
			</RadioGroup>
			{field.validities.isInvalid && (
				<FormHelperText id="component-error-text">
					{field.validities.message}
				</FormHelperText>
			)}
		</FormControl>
	);
};

export default CustomRadioControl;
