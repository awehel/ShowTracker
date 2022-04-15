import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "./NavBar";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";


const EditComment = (props)=>{

    const {id} = useParams()

    const [message, setMessage] = useState("")
    const [user, setUser] = useState("")

    const navigate = useNavigate()

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/comment/${id}`)
        .then((res)=>{
            console.log(res.data)
            console.log(res.data.receiver.username)
            setMessage(res.data.message)
            setUser(res.data.receiver.username)
        })
        .catch((err)=>console.log(err))
    }, [])

    const submitHandler = (e)=>{
        e.preventDefault()
        axios.put(`http://localhost:8000/api/comment/edit/${id}`, {message})
        .then((res)=>{
            console.log(res.data)
            navigate(`/user/${user}`)
        })
        .catch((err)=>console.log(err))
    }

    return(
        <div>
            <NavBar/>
            <Box sx={{marginBlock:6, padding:2, alignContent:'center'}}>
                <form onSubmit={submitHandler}> 
                    <Typography variant="h6" sx={{marginBottom:3}}>Edit Message:</Typography>
                    <TextField
                        value={message}
                        onChange={(e)=>setMessage(e.target.value)}
                        type='text'
                        sx={{background: "white", input: {color:'primary', p:2}}}
                    />
                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{marginInline:2}}
                >Submit</Button>
                </form>

            </Box>
        </div>
    )
}

export default EditComment