import classes from "./Modal.module.css";
import { Box, IconButton, Typography, List } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ModalOverlay = (props) => {
	return (
		<div className={classes.modalOverlay}>
			<IconButton className={classes.closeBtn} onClick={props.closeModal}>
				<CloseIcon />
			</IconButton>
			<div className={classes.modalContent}>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Minus ipsa quidem vitae fuga voluptatibus unde id soluta.
					Doloremque dolorum optio at! Quas eaque molestias
					dignissimos voluptatem minus perferendis voluptate nam.
				</p>
			</div>
		</div>
	);
};

export default ModalOverlay;
