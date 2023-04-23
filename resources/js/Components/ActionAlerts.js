import * as React from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function ActionAlerts({message, closeAlert}) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2} marginBottom={2}>
      <Alert severity="error" onClose={closeAlert}>{message}</Alert>
    </Stack>
  );
}