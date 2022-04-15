import React, {useEffect, useState} from "react";
import axios from 'axios'
import NavBar from "./NavBar";
import { Container, Grid } from "@mui/material";
import ShowCard from "./ShowCard";


const Home = (props)=>{

    const [loaded, setLoaded] = useState(false)

    const [showData, setShowData] = useState({})

    useEffect(() => {
        const getShows = async () => {
            try {
                const resp = await axios.get(
                    `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_API_KEY}&sort_by=popularity.desc&page=1&with_original_language=en`
                );
                // console.log(resp.data.results);
                setShowData(resp.data.results);
                setLoaded(true)
            } catch (error) {
                console.log(error);
            }
        };
        getShows();
    }, [setShowData]);

    return (
        <div>
            <NavBar />
            <Container
                maxWidth="false"
            >
                <Container>
                    <Grid container spacing={2} sx={{marginTop:5}}>
                        {loaded
                            ? showData.map((show, index) => (
                                <Grid item md={3} sm={6} xs={12} key={index}>
                                    <ShowCard show={show} />
                                </Grid>
                            ))
                            : null}
                    </Grid>
                </Container>
            </Container>
        </div>
    );
}

export default Home


