import React, {useState, useContext, useRef, useEffect} from "react";
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
                {}, // As a post request, we MUST send something with our request.
                // Because we're not adding anything, we can send a simple MT object
                {
                    withCredentials: true,
                }
            )
            .then((res) => {
                console.log(res);
                console.log(res.data);
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
            console.log(res.data)
            setUser(res.data)
            context.setLoggedInUser(user)
        })
        .catch((err)=>{
            console.log(err)
        })
    }, [])


    

    function stringToColor(string) {
        let hash = 0;
        let i;

         /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = "#";

        for (i = 0; i < 3; i += 1) {
             const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
         /* eslint-enable no-bitwise */

        return color;
    }

    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
             // children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
        };
    }


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
                                        // {...stringAvatar(user.username)}
                                        sx={{bgcolor:'#eaac8b'}}
                                        alt={user.username}
                                        src="placeholder.jpg"
                                        // sx={{ bgcolor: orange[500] }}
                                    />
                                    {/* <AccountCircle /> */}
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