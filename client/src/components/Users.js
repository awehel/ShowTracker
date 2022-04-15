import React, {useEffect, useState} from "react";
import axios from 'axios'
import { Link } from "@mui/material";
import NavBar from "./NavBar";
import { Box, Typography } from "@mui/material";
import { Button } from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { Grid } from "@mui/material";


const UserList = (props)=>{
    const [userList, setUserList] = useState()

    const [listLoaded, setListLoaded] = useState(false)

    useEffect(()=>{
        const getUsers = async()=>{
            try{
                const resp = await axios.get(
                    `http://localhost:8000/api/allUsers`
                )
                // console.log(resp.data)
                setUserList(resp.data)
                setListLoaded(true)
            } catch (err){
                console.log(err)
            }
        }
        getUsers()
    }, [])

        
    return (
        <div>
            <NavBar/>
            <Box sx={{marginTop:4}}>
                <Typography variant="h4" fontWeight={700} sx={{marginBottom:3}}>Discover other users</Typography>
                <Grid justifyContent='center' container sx={{p:3, m:3}}>
                {
                    listLoaded?
                    userList.map((user, index)=>(
                            <Grid item key={index}>
                                <Link href={`/user/${user.username}`}>
                                <Button
                                    variant="contained"
                                    color={
                                        index%2===0?
                                        'primary':'secondary'
                                    }
                                    startIcon={<PermIdentityIcon/>}
                                    sx={{
                                        borderRadius:25,
                                        width:175,
                                        height:50,
                                        m:3,
                                        p:3
                                    }}
                                >{user.username}</Button>
                                </Link>
                            </Grid>
                            
                    )):null
                }
                </Grid>
            </Box>
        </div>
    )
}

export default UserList