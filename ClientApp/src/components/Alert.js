import React, {useEffect, useState} from "react";
import { Stack,Alert, AlertTitle, Snackbar } from "@mui/material";

export const Alerts = ({show, data, toggleAlert}) =>{
    const [alertState,setAlertState] = useState(false);
    useEffect(()=>{
        setAlertState(show);
        setTimeout(()=>{
            setAlertState(false);
            toggleAlert(false);
        },2000)
        
    },[])
    return(
        <Stack spacing={2} sx={{width:"100%"}}>
            <Snackbar
                open={alertState}
                autoHideDuration={2000}
                anchorOrigin={{vertical:'top', horizontal:'right'}}
            >
                <Alert severity="success" variant="filled" sx={{width:'100%'}}>
                    <AlertTitle>{data}</AlertTitle>
                </Alert>
            </Snackbar>
        </Stack>
    )
}