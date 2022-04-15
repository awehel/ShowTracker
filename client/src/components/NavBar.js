import React, {useState, useContext,  useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyContext from "../context/MyContext";
import { AppBar, Button } from "@mui/material";
import { Box } from "@mui/system";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import PeopleIcon from "@mui/icons-material/People";
import { Link } from "@mui/material";
import { Avatar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";


const NavBar = (props) =>{

    const navigate = useNavigate();

    const context = useContext(MyContext)

    const [user, setUser] = useState({})

    const logout = (e) => {
        axios
            .post(
                "http://localhost:8000/api/users/logout",
                {}, 
                {
                    withCredentials: true,
                }
            )
            .then((res) => {
                // console.log(res);
                // console.log(res.data);
                context.loggedIn = false
                navigate("/login");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(()=>{
        axios.get("http://localhost:8000/api/users",
            {withCredentials: true}
        )
        .then((res)=>{
            // console.log(res.data)
            setUser(res.data)
            context.setLoggedInUser(user)
        })
        .catch((err)=>{
            console.log(err)
        })
    }, [])

    return (
        <Box sx={{ flexGrow: 1, alignItems: "center" }}>
            <AppBar position="static">
                <Toolbar>
                    <Link href="/" underline="none" color="inherit">
                        <Typography
                            variant="h4"
                            noWrap
                            component="div"
                            fontWeight={600}
                            sx={{ display: { sm: "block", marginLeft: 20 },
                                    background: "-webkit-linear-gradient(45deg, rgba(233,150,107,1) 0%, rgba(137,204,214,1) 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent" 
                        }}
                        >
                            ShowTracker
                        </Typography>
                    </Link>
                    <Box sx={{ flexGrow: 1 }}>
                        <Link href="/search" underline="none" color="inherit">
                            <Button
                                endIcon={<SearchIcon/>}
                                color='secondary'
                            >Find a Show</Button>
                        </Link>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                        <Link href="/users" underline="none" color="inherit">
                            <Button
                                endIcon={<PeopleIcon/>}
                                color='secondary'
                            >Users</Button>
                        </Link>
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    {user.username ? (
                        <Box sx={{ display: { md: "flex" },  }}>
                            <Button
                                onClick={logout}
                                type="submit"
                                endIcon={<LogoutIcon />}
                                color="secondary"
                                sx={{marginRight:3}}
                                
                            >Logout</Button>
                            
                            <Link href={`/user/${user.username}`} underline="none">
                                <IconButton size="large" edge="end" color="inherit">
                                    <Avatar
                                        sx={{bgcolor:'#eaac8b'}}
                                        alt={user.username}
                                        src="placeholder.jpg"
                                    />
                                    
                                </IconButton>
                            </Link>
                        </Box>
                    ) : (
                        <Link href="/login" underline="none" color="inherit">
                            Sign In
                        </Link>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    ); 

}

export default NavBar