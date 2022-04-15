import React, { useEffect, useState} from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import NavBar from "./NavBar";
import { Link } from "@mui/material";
import { Chip } from "@mui/material";
import { Stack } from "@mui/material";


const OneShow = (props)=>{
    
    const {id} = useParams()

    const navigate = useNavigate()

    const [oneShow, setOneShow] = useState({})

    useEffect(()=>{
        axios
            .get(
                `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}`
            )
            .then((res) => {
                // console.log(res.data);
                setOneShow(res.data);
            })
            .catch((err) => console.log(err));
    }, [id])

    const submitHandler = ()=>{
        
        axios
            .post(`http://localhost:8000/api/test`, oneShow, {
                withCredentials: true
            })
            .then((res) => {
                // console.log(res);
                // console.log(res.data);
                navigate("/");
            })
            .catch((err) => {
                // console.log(err.response);
                // console.log(err.response.data);
                // console.log(err.response.data.errors);
                navigate("/")
            });
    }

    return (
        <div>
            <NavBar />
            <Container sx={{}}>
                <Grid
                    container
                    spacing={1}
                    alignItems="end"
                    justifyContent="center"
                >
                    <Grid item>
                        <Typography
                            value="newName"
                            variant="h4"
                            style={{ fontWeight: 600 }}
                            sx={{ margin: 3 }}
                        >
                            {oneShow.name}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            size="medium"
                            onClick={submitHandler}
                            startIcon={<AddIcon />}
                            sx={{ marginBottom: 3 }}
                        >
                            Add show
                        </Button>
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6}>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${oneShow.poster_path}`}
                            alt={oneShow.name}
                            height="550"
                            width="366"
                        />
                        <Stack direction="row" spacing={2}></Stack>
                        {oneShow.genres
                            ? oneShow.genres.map((genre, index) => (
                                <Chip
                                    key={index}
                                    label={genre.name}
                                    sx={{ m: 1 }}
                                    color="primary"
                                />
                            ))
                            : null}
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <Box>
                            <Typography
                                variant="h6"
                                align="left"
                                marginBottom={1}
                            >
                                About the Show
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                align="left"
                                marginBottom={1}
                            >
                                {oneShow.overview}
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                align="left"
                                marginBottom={2}
                            >
                                "{oneShow.tagline}"
                            </Typography>
                            {oneShow.created_by
                                ? oneShow.created_by.map((creator, index) => (
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight="600"
                                        align="left"
                                        key={index}
                                    >
                                        Created by:{" "}
                                        <Box
                                            component="span"
                                            fontWeight="400"
                                        >
                                            {creator.name}
                                        </Box>
                                    </Typography>
                                ))
                                : null}
                            <Typography
                                variant="subtitle1"
                                fontWeight="600"
                                align="left"
                            >
                                First Aired:{" "}
                                <Box component="span" fontWeight="400">
                                    {oneShow.first_air_date}
                                </Box>
                            </Typography>
                            {
                            oneShow.number_of_seasons ? 
                                <Typography
                                    variant="subtitle1"
                                    fontWeight="600"
                                    align="left"
                                >
                                    Seasons:{" "}
                                    <Box component="span" fontWeight="400">
                                        {oneShow.number_of_seasons}
                                    </Box>
                                </Typography>
                            : null
                            }

                            <Typography
                                variant="subtitle1"
                                fontWeight="600"
                                align="left"
                            >
                                Currently in Production?:{" "}
                                <Box component="span" fontWeight="400">
                                    {oneShow.in_production ? "Yes" : "No"}
                                </Box>
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                fontWeight="600"
                                align="left"
                            >
                                Network:
                                {oneShow.networks
                                    ? oneShow.networks.map((network, index) => (
                                        <Box key={index} sx={{ m: 1 }}>
                                            <img
                                                src={`https://www.themoviedb.org/t/p/h30${network.logo_path}`}
                                                alt={network.name}
                                            />
                                        </Box>
                                    ))
                                    : null}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                fontWeight="500"
                                align="left"
                            >
                                <Link href={oneShow.homepage}>Watch Now</Link>
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                
            </Container>
        </div>
    );
}

export default OneShow