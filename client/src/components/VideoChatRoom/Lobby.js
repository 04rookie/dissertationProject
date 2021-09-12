import React from "react";
import { Stack, Box, Grid } from "@material-ui/core";
import Button from "@mui/material/Button"
import ButtonGroup from '@mui/material/ButtonGroup';
function Lobby() {
  return (
    <Box>
      <Stack spacing={3}>
        <Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}></Grid>
        </Grid>
        <Box><ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button>Mute</Button>
            <Button>Disconnect</Button>
            <Button>Video</Button>
            <Button>Their Video</Button>
            <Button>Unmute</Button>
        </ButtonGroup></Box>
      </Stack>
    </Box>
  );
}

export default Lobby;
