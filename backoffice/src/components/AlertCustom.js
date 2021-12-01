import React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

export default function TransitionAlerts(props) {
  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={props.open}>
        <Alert
          style={props.style || {}}
          severity={props.severity || ''}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                props.setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {props.title
            ? <AlertTitle>
                {props.title}
              </AlertTitle>
            : null
          }
          {props.message}
        </Alert>
      </Collapse>
    </Box>
  );
}
