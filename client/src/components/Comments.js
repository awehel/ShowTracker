import React, {useState} from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { Container } from "@mui/material";
import { TextField } from "@mui/material";
import { Grid } from "@mui/material";

const Comments = (props)=>{

    const {activeUser, baseUser} = props
    
    const [message, setMessage] = useState("") 
    
    const submitComment = (e)=>{
        
        e.preventDefault()
        const newObject = {
            message: message,
            author: activeUser, 
            receiver: baseUser
        }
        axios.post(`http://localhost:8000/api/post`, newObject, )
        .then((res)=>{
            console.log(res)
            console.log(res.data)
            window.location.reload()
        })
        .catch((err)=>{
            console.log(err.response.data)
        })
    }

    return (
        <Container>
            <Grid>
                <Grid item>
                </Grid>
                <form onSubmit={submitComment}>
                    <TextField
                        sx={{
                            input: { color: "secondary" },
                            background: "white",
                        }}
                        type="text"
                        name="message"
                        label="Leave a comment"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <input
                        type="hidden"
                        name="author"
                    />
                    <input
                        type="hidden"
                        name="receiver"
                    />
                    <Button
                        disabled={message?false:true}
                        type="Submit"
                        variant="contained"
                        sx={{ marginTop: 1 }}
                    >
                        Comment
                    </Button>
                </form>
                
            </Grid>
        </Container>
    );
}

export default Comments