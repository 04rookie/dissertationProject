import { Button, Card, CardActions, CardContent } from "@material-ui/core";
import React from "react";
import { Typography } from "@material-ui/core";

function MarketDoctorCard(props){
    return (<Card >
        <CardContent>
            <Typography component={'span'} variant="body2">
                {props.doctorID} <br/>
                {props.doctorName}
            </Typography>
        </CardContent>
        <CardActions>
            <Button variant="outlined">
                Book
            </Button>
        </CardActions>
    </Card>);
}

export default MarketDoctorCard;