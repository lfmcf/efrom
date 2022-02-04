import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DoneIcon from '@mui/icons-material/Done';

const actions = [
    { icon: <RestartAltIcon onClick={() => alert('hey')} />, name: 'Reset' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <DoneIcon />, name: 'Submit' },
];

export default function BasicSpeedDial(props) {

  return (
    <Box sx={{ height: '0', transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        disabled={props.processing}
      >
        {/* {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))} */}
        <SpeedDialAction
            key="Reset"
            icon={<RestartAltIcon onClick={() => props.reset()} />}
            tooltipTitle="Reset"
          />
          <SpeedDialAction
            key="Save"
            icon={<SaveIcon onClick={() => props.showdraftmodel()} />}
            tooltipTitle="Save"
          />
          <SpeedDialAction
            key="Submit"
            icon={<DoneIcon onClick={() => props.showsavemodel()}/>}
            tooltipTitle="Submit"
          />
      </SpeedDial>
    </Box>
  );
}
