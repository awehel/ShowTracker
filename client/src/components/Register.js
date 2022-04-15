import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { Container } from "@mui/material";
import { TextField } from "@mui/material";
import { Link } from "@mui/material";
import { Box } from "@mui/material";
import { Grid } from "@mui/material";

const Register = (props) => {
    const [confirmReg, setConfirmReg] = useState("");
    const [errors, setErrors] = useState({});

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const register = (e) => {
        e.preventDefault();

        axios
            .post("http://localhost:8000/api/users/register", user, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res.data);
                setUser({
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });
                setConfirmReg("Thank you for Registering, you can now log in!");
                setErrors({});
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors);
            });
    };

    return (
        <Grid container justifyContent="center">
            <Box sx={{background:'white', p:3, marginTop:10, borderRadius:10, width:'40vw'}}>
                <Typography variant="h3" sx={{ marginBottom: 3, marginTop: 5 }}>
                    Register
                </Typography>
                {confirmReg ? (
                    <h4 style={{ color: "green" }}>{confirmReg}</h4>
                ) : null}
                <form onSubmit={register}>
                    <div>
                        {/* <label>Username</label> */}
                        {errors.username ? (
                            <Typography color="error" sx={{ marginBotton: 2 }}>
                                {errors.username.message}
                            </Typography>
                        ) : null}
                        <TextField
                            type="text"
                            name="username"
                            value={user.username}
                            variant="outlined"
                            label="Username"
                            required
                            sx={{ marginBottom: 3 }}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        {/* <label>Email</label> */}
                        {errors.email ? (
                            <Typography color="error" sx={{ marginBotton: 2 }}>
                                {errors.email.message}
                            </Typography>
                        ) : null}
                        <TextField
                            variant="outlined"
                            required
                            sx={{ marginBottom: 3 }}
                            label="Email"
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        {/* <label>Password</label> */}
                        {errors.password ? (
                            <Typography color="error" sx={{ marginBotton: 2 }}>
                                {errors.password.message}
                            </Typography>
                        ) : null}
                        <TextField
                            variant="outlined"
                            required
                            sx={{ marginBottom: 3 }}
                            label="Password"
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        {/* <label>Confirm Password</label> */}
                        {errors.confirmPassword ? (
                            <Typography color="error" sx={{ marginBotton: 2 }}>
                                {errors.confirmPassword.message}
                            </Typography>
                        ) : null}
                        <TextField
                            variant="outlined"
                            required
                            sx={{ marginBottom: 3 }}
                            label="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            value={user.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="center">
                        <Button type="submit" variant="contained">
                            Register Me
                        </Button>
                    </div>
                </form>
                <Typography sx={{ marginTop: 3 }}>
                    <Link href={"/login"}>Already have an account? Sign in</Link>
                </Typography>


            </Box>
        </Grid>
    );
};

export default Register;
