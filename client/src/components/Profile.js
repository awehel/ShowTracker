import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";
import Comments from "./Comments";
import Wall from "./Wall";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { ImageList } from "@mui/material";
import { ImageListItem } from "@mui/material";
import { Card } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";


const Profile = (props)=>{

    const {username} = useParams()

    const [showList, setShowList] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [user, setUser] = useState({});
    const [comment, setComment] = useState({})
    const [baseUser, setBaseUser] = useState({})

    const navigate = useNavigate()

    const activeUserId = user._id
    const baseUserId = baseUser._id
    
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/showsbyuser/${username}`, {
            withCredentials: true
        })
        .then((res)=>{
            console.log(res.data)
            setShowList(res.data)
            setLoaded(true)
        })
        .catch((err)=>{
            console.log(err)
        })
    }, [])

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/users", { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        const getHomeUser = async () => {
            try {
                const resp = await axios.get(
                    `http://localhost:8000/api/users/${username}`
                );
                console.log(resp.data);
                setBaseUser(resp.data);
                
            } catch (error) {
                console.log(error);
            }
        };
        getHomeUser();
    }, []);

    const submitHandler = (nameFromBelow, activeUser) => {
        
        axios
            .post(`http://localhost:8000/api/edit/${nameFromBelow}`, activeUser, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setShowList(showList.filter(show => show.name !== nameFromBelow));
            })
            .catch((err) => {
                console.log(err)
                console.log(err.response)
                console.log(err.response.data.errors)
            });
    };

    return (
        <div>
            <NavBar />

            <Container>
                <h1>{username}'s Shows</h1>
                
                <Grid container spacing={6}>
                    <Grid item xs={10} md={8}>
                        {loaded ? (
                            <Grid container spacing={3}>
                                {showList.map((show, index) => (
                                    <Grid item key={index} xs={12} md={4}>
                                        <Card sx={{borderRadius:3}} elevation={5}>
                                            <CardMedia
                                                component='img'
                                                image={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                                            />
                                            {
                                                `${username}` === `${user.username}`?
                                                <CardActions
                                                    sx={{background:'#023047'}}
                                                >
                                                    <Button size="medium" sx={{color:'#eaac8b'}} onClick={()=>submitHandler(`${show.name}`, user)}>Delete</Button>
                                                </CardActions>
                                                :null
                                            }
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        ) : null}
                    </Grid>
                    <Grid xs={12} item md={4}>
                        {loaded ? (
                            <div>
                                <Comments
                                    activeUser={activeUserId}
                                    baseUser={baseUserId}
                                />
                                <Wall userId={baseUserId} pUser={activeUserId} />
                            </div>
                        ) : null}
                    </Grid>
                </Grid>
            </Container>
        </div>
    );

}

export default Profile


//   showList.map((show, index)=>(
//                                 <Card sx={{maxWidth:250}} key={index}>
//                                     {/* <h3>{show.name}</h3> */}
//                                     <CardMedia 
//                                         component='img'
//                                         alt={`${show.name}`}
//                                         image={`https://image.tmdb.org/t/p/w500${show.poster_path}` } />
//                                 {
                                    // show.savedBy.find(entry => entry.username === `${user.username}` )?
                                    // <p>Test</p>:null
                                //     `${username}` === `${user.username}`?
                                //     <CardActions>
                                //         <button onClick={()=>submitHandler(`${show.name}`, user)}>Delete</button>
                                //     </CardActions>
                                //     :null

                                // }
//                                 </Card>
//                             )):