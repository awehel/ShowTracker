import React, { useState, useEffect} from "react";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";
import { Button } from "@mui/material";

const Wall = (props)=>{

    const {userId, pUser} = props
    const id = userId
    const pUserId = pUser
    const [messages, setMessages] = useState([])

     useEffect(()=>{
        const getComments = async ()=>{
            try {
                // console.log(id)
                // console.log(pUserId)
                const resp = await axios.get(`http://localhost:8000/api/posts/${id}`)
                // console.log(resp.data)
                setMessages(resp.data)
            } catch (error) {
                console.log(error)
            }
        }
        setTimeout(getComments, 100)

    }, [id])

    function stringToColor(string) {
        let hash = 0;
        let i;
        
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = "#";

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xFF;
            color += `00${value.toString(16)}`.slice(-2);
        }

        return color;
    }

    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
        };
    }

    const deleteComment =(postId)=>{
        axios.delete(`http://localhost:8000/api/comment/${postId}`)
        .then((res)=>{
            // console.log(res.data)
            setMessages(messages.filter(message=> message._id !== postId))
        })
        .catch((err)=>console.log(err))
    }

    return (
        <div>
            <br />
            {messages ? (
                <List>
                    {messages.map((message, index) => (
                        <div key={index}>
                            <ListItem  sx={{ background: "white" }}>
                                <ListItemAvatar>
                                    <Link href={`/user/${message.author.username}`} underline='none'><Avatar
                                        {...stringAvatar(
                                            message.author.username
                                        )}
                                        alt={message.author.username}
                                        src="/static/images/avatar/1.jpg"
                                    /></Link>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${message.author.username} says: `}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: "inline", marginRight:1 }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {message.message}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                                {
                                    message.author._id === pUserId?
                                    <div >
                                        <Link href={`/comment/edit/${message._id}`}><Button variant="contained" size="small" sx={{marginBottom:1, display:'block'}}>Edit </Button></Link>
                                        <Button onClick={()=>deleteComment(message._id)} variant="contained" size="small" color="error">Delete</Button>
                                    </div>
                                    :null
                                }
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </div>
                    ))}
                </List>
            ) : null}
        </div>
    );
    
}

export default Wall
