import { Box, Grid, Paper, Stack, Typography } from "@material-ui/core";
import React from "react";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function UserPageInfo(){
    return <Stack>
        <Box
            sx={{width:"80vw", my:"10vh", mx:"auto"}}>
            <Paper elevation={3}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography sx={{textAlign:"center"}} variant="body1" gutterBottom>
                            Hello
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography sx={{textAlign:"center"}} variant="body1" gutterBottom>
                            Hello
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
        <Box>
        
        </Box>
    </Stack>
}

export default UserPageInfo;