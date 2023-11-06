import React, {useState} from 'react';
import { Typography, Box, TextField, Stack, Button, Alert, AlertTitle, IconButton } from '@mui/material';
import axios from 'axios';
import { Alerts } from './Alert';
import { apiKey } from '../authentication/apikey';
import { ContentCopy } from "@mui/icons-material";

export const Home = () =>{
  const [text, setText]=useState("");
  const [secretKey,setSecretKey] = useState("");
  const [displayAlert,setDisplayAlert] = useState(false);
  const [alertData,setAlertData]=useState("");
  const storeNotesData = async () =>{
    axios.post(`api/notesdb/CreateNotes`,        
        JSON.stringify(JSON.stringify({
            Notes:text,
            user:"Ponniah"
        })),
        {
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-api-key':apiKey
            }
        }            
      )
    .then(function (response) {
        console.log("Edit Response Data: ",response.data);
        const data= response.data;
        setSecretKey(data);
        setDisplayAlert(true);
        setAlertData("Notes Created Successfully!!!");        
        setText("");
    })
    .catch(function (error) {
        console.log(error);
    })
    .finally(function () {
        // always executed
    }); 
  }

  const copyFunction = (element) =>{
    var copyText = document.getElementById(element);
    navigator.clipboard.writeText(copyText.innerText);
    setDisplayAlert(true);
    setAlertData("Secret Key Copied Successfully!!!");
  }

  const alertToggle = (value) =>{
    setDisplayAlert(value);
    setAlertData("");
  }

  return(
    <Box>
      <Typography marginBottom={5}>Welcome to Notes Application</Typography>
      {secretKey
        ?
        <Alert severity='info'  sx={{width:"70%", marginBottom:'30px'}}>
          <AlertTitle>Notes created with secret key</AlertTitle>
            Please copy this secret key for future reference - <IconButton id='secretKey' sx={{color:'rgb(1, 67, 97)', fontSize:'16px'}} onClick={()=>{copyFunction('secretKey')}}><strong>{secretKey}</strong> <ContentCopy></ContentCopy></IconButton> 
        </Alert>
        :
          ""
      }
      <TextField id="outlined-multiline-static" placeholder="Type here" multiline rows={4} fullWidth onChange={(e)=>setText(e.target.value)} value={text}/>
      <Stack spacing={2} direction="row" marginTop={3}>
        <Button variant="contained" onClick={()=>storeNotesData()}>Save</Button>
        <Button variant="outlined" onClick={()=>setText("")}>Clear</Button>
      </Stack>
      {displayAlert&& <Alerts show={true} data={alertData} toggleAlert ={alertToggle} />}
    </Box>
  )
}

    
   