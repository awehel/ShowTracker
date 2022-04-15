import React, {useEffect, useState, useContext} from "react";
import axios from 'axios'
import {Link} from 'react-router-dom'
import NavBar from "./NavBar";
import Users from "./Users"
import MyContext from "../context/MyContext";
import Typography from '@mui/material/Typography'
import { Container, Grid } from "@mui/material";
import { Paper } from "@mui/material";
import ShowCard from "./ShowCard";
import { Box } from "@mui/system";

const Home = (props)=>{

    const [showList, setShowList] = useState({})

    const [loaded, setLoaded] = useState(false)

    const [showData, setShowData] = useState({})

    const context = useContext(MyContext)

    useEffect(() => {
        const getShows = async () => {
            try {
                const resp = await axios.get(
                    `https://api.themoviedb.org/3/tv/popular?api_key=0b8bef9997166d6ef69067b1361557c3&sort_by=popularity.desc&page=1&with_original_language=en`
                );
                console.log(resp.data.results);
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
                sx={{
                    
                }}
                maxWidth="false"
            >
                <Container>
                    {/* <Typography
                        variant="h3"
                        component="div"
                        color="textSecondary"
                        gutterBottom
                    >
                        Home Page
                    </Typography> */}

                    {/* {context.loggedIn ? (
                        <Link to="/search">
                            <p>Search for a show</p>
                        </Link>
                    ) : null} */}
                    

                    <Grid container spacing={2} sx={{marginTop:5}}>
                        {loaded
                            ? showData.map((show, index) => (
                                <Grid item md={3} sm={6} xs={12} key={index}>
                                    <ShowCard show={show} />
                                    {/* <Paper>
                            <Link to={`/show/${show.id}`}><img src={
                                show.backdrop_path?
                                `https://image.tmdb.org/t/p/w500${show.backdrop_path}`
                            :'https://static.vecteezy.com/system/resources/thumbnails/002/267/298/small/tv-show-neon-signs-style-text-free-vector.jpg'
                            } alt={`${show.name}`}/>
                            <Typography variant="h5" gutterBottom>{show.name}</Typography></Link>
                        </Paper> */}
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


