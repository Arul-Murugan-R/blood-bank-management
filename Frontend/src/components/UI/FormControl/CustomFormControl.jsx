import * as Icon from "@mui/icons-material";
import classes from "./FormControl.module.css";
import {
	InputLabel,
	OutlinedInput,
	InputAdornment,
	IconButton,
	FormControl,
	FormHelperText,
} from "@mui/material";

const CustomFormControl = (props) => {
	const { field } = props;
	const InputIcon = props.icon ? Icon[props.icon] : null;

	return (
		<FormControl
			className={classes.formControl}
			error={field.validities.isInvalid}
			color={field.validities.isValid ? "success" : "primary"}
		>
			<InputLabel htmlFor={field.properties.id}>
				{field.validities.label}
			</InputLabel>
			<OutlinedInput
				sx={{ marginRight: "1rem", width: "100%" }}
				{...field.properties}
				endAdornment={
					props.icon && (
						<InputAdornment position="end">
							<IconButton {...props.IconBtnProps}>
								<InputIcon />
							</IconButton>
						</InputAdornment>
					)
				}
				type={props.type ? props.type : field.properties.type}
			/>
			{field.validities.isInvalid && (
				<FormHelperText id="component-error-text">
					{field.validities.message}
				</FormHelperText>
			)}
		</FormControl>
	);
};

export default CustomFormControl;
