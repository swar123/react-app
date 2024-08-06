import React from 'react';
import { Modal, Box, Typography, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";
const ConfirmationModal = ({ open, handleClose, handleConfirm, title, description }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                position="absolute"
                top="30%"
                left="30%"
                transform="translate(-50%, -50%)"
                width={400}
                bgcolor="background.paper"
                boxShadow={24}
                p={4}
            >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {title}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {description}
                </Typography>
                <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
                    <Button variant="outlined" color="success" onClick={handleConfirm} endIcon={<SendIcon />}>
                        Confirm
                    </Button>
                    <Button variant="outlined" color="error" startIcon={<CancelIcon />} onClick={handleClose}>
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ConfirmationModal;