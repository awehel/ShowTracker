import React, { useState} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { Box } from "@mui/material";
import { Grid } from "@mui/material";


const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const login = (event) => {
        event.preventDefault();
        axios
            .post(
                "http://localhost:8000/api/users/login",
                {
                    email: email,
                    password: password,
                },
                {
                    withCredentials: true,
                }
            )
            .then((res) => {
                console.log(res.data);
                navigate("/");
            })
            .catch((err) => {
                console.log(err.response.data);
                setErrorMessage(err.response.data.message);
            });
    };

    return (
        <Grid container justifyContent="center" alignItems="center">
            
            <Box sx={{background:'white', p:3, marginTop:10, borderRadius:10, width:'40vw'}}>
                <Typography variant="h3" sx={{ marginBottom: 3, marginTop: 5 }}>
                    Login <LiveTvIcon fontSize="large"/>
                </Typography>
                <Typography color="error" sx={{ marginBottom: 3}}>
                    {errorMessage ? errorMessage : ""}
                </Typography>
                <form onSubmit={login}>
                    <div>
                        <TextField
                            type="text"
                            name="email"
                            value={email}
                            variant="outlined"
                            label="Email"
                            required
                            margin="normal"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <TextField
                            type="password"
                            name="password"
                            value={password}
                            variant="outlined"
                            label="Password"
                            required
                            margin="normal"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="center">
                        <Button type="Submit" variant="contained" sx={{marginTop:3}}>
                            Sign In
                        </Button>
                    </div>
                </form>
                <Typography sx={{ marginTop: 3 }}>
                    <Link to={"/register"}>Don't have an account? Sign up</Link>
                </Typography>

            </Box>
        </Grid>
    );
};

export default Login;
