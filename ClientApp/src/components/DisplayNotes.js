import {  useState } from "react"
import { Box, Typography, IconButton, Grid, TextField, Button } from "@mui/material";
import { Delete, Edit, Done, Close } from "@mui/icons-material";
import axios from 'axios';
import { Alerts } from './Alert';
import { apiKey } from '../authentication/apikey';

export const DisplayNotes = () =>{
    const [notesData, setNotesData] = useState([]);
    const [disableText,setDisableText] = useState(true);
    const [hideIcons, setHideIcons] = useState(true);
    const [originaltext, setOriginalText] = useState("")
    const [updatedText, setUpdatedText] = useState("");
    const [secretKey , setSecretKey] = useState("");
    const [displayAlert,setDisplayAlert] = useState(false);
    const [alertData,setAlertData]=useState("");

    const fetchNotesData = async(value) =>{
        if(value){
            axios.get(`api/notesdb/FetchNotesRecord/${value}`,{
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-api-key':apiKey
                }}
            )
            .then(function (response) {
                console.log(response);
                const data = response.data;
                setNotesData(data);
                setOriginalText(data[0].notes);
              })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
            // always executed
            });
        }
        else{
            alert("Please Enter Secret Key");
        }
    } 

    const saveEditChanges = async (value) =>{  
        axios.put(`api/notesdb/EditNotesData/${value.id}`,        
            JSON.stringify(JSON.stringify({
                Notes:updatedText,
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
            setDisableText(!disableText);
            setHideIcons(!hideIcons);
            setOriginalText(updatedText);
            setDisplayAlert(true);
            setAlertData("Notes Updated Successfully!!!"); 
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
            // always executed
        });           
            
    }

    const deleteNotes = async (value) =>{          
        axios.delete(`api/notesdb/DeleteNotesRecord/${value}`,{
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-api-key':apiKey
            }}
        )
        .then(function (response) {
            console.log("Dlete Response Data: ",response.data);
            setDisplayAlert(true);
            setAlertData("Notes Deleted Successfully!!!");
            setSecretKey("");
            setNotesData([]);
          })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
    }

    const alertToggle = (value) =>{
        setDisplayAlert(value);
        setAlertData("");
      }

    return(
        <Box>
            <Typography marginBottom={5}>Welcome to Display Notes Screen</Typography>
            <Typography marginBottom={3}>Enter Secret Key</Typography>
            <Grid container spacing={2} marginBottom={5}>
                <Grid item xs={4}><TextField placeholder="Enter here" fullWidth value={secretKey} onChange={(e)=>{setSecretKey(e.target.value)}}/></Grid>
                <Grid item xs={2}><Button variant="contained" onClick={()=>{fetchNotesData(secretKey)}}>Search</Button></Grid>
            </Grid>
            {notesData!==null && notesData.map((value)=>{
                return(
                    <Grid container spacing={2} key={value.id}>
                        <Grid item xs={10}>
                            <TextField
                                id="outlined-multiline-static"
                                placeholder="Type here"
                                multiline
                                rows={2}
                                fullWidth                           
                                value={updatedText.length>0 ? updatedText : value.notes}
                                disabled={disableText}
                                onChange={(e)=>{setUpdatedText(e.target.value)}}
                            />                            
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton hidden={!hideIcons} onClick={()=>{setDisableText(!disableText);setHideIcons(!hideIcons)}}><Edit></Edit></IconButton>
                            <IconButton hidden={hideIcons}  onClick={()=>{saveEditChanges(value)}}><Done></Done></IconButton>
                            <IconButton hidden={hideIcons}  onClick={()=>{setDisableText(!disableText);setHideIcons(!hideIcons);setUpdatedText(originaltext)}}><Close></Close></IconButton>
                        </Grid>
                        <Grid item xs={1}><IconButton onClick={()=>{deleteNotes(value.id)}}><Delete></Delete></IconButton></Grid>
                    </Grid>
                )
            })}
            {displayAlert&& <Alerts show={true} data={alertData} toggleAlert ={alertToggle}/>}
        </Box>
    )
}









// GET request           
// const response = await fetch(`api/notesdb/FetchNotesRecord/${value}`,{
//     method:"GET",
//     headers: { 
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'x-api-key':apiKey
//     }}); 
//const data = await response.json();
// setNotesData(data);
// setOriginalText(data[0].notes);


//Delete Request
// const response = await fetch(`api/notesdb/DeleteNotesRecord/${value}`,{
//         method:"DELETE",
//         headers: { 
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'x-api-key':apiKey 
//         },
//         body:  value
//     })
//     .then(response => response.json())
//     .then(data => {                
//         setDisplayAlert(true);
//         setAlertData("Notes Deleted Successfully!!!");
//         setSecretKey("");
//         setNotesData([]);
//     }) 

//Post method
//   const request= {
//     method: "POST",
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       'x-api-key':apiKey
//     },
//     body: JSON.stringify(JSON.stringify({ Notes:text, user:"Ponniah"}))
//   }

//   await fetch("api/notesdb/CreateNotes",request)
//   .then(response =>response.json())
//   .then(data => {
//     setSecretKey(data);
//     setDisplayAlert(true);
//     setAlertData("Notes Created Successfully!!!");
//   });   

//PUT Method
// const response = await fetch(`api/notesdb/EditNotesData/${value.id}`,{
// method:"PUT",
// headers: { 
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//     'x-api-key':apiKey
// },
// body:  JSON.stringify(JSON.stringify({
//     Notes:updatedText,
//     user:"Ponniah"
// }))})
// .then(response => response.json())
// .then(data => {
//     setDisableText(!disableText);
//     setHideIcons(!hideIcons);
//     setOriginalText(updatedText);
//     setDisplayAlert(true);
//     setAlertData("Notes Updated Successfully!!!"); 
// })  