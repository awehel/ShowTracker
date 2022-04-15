import React from "react";
import Typography from '@mui/material/Typography'
import { Container, Grid } from "@mui/material";
import { Paper } from "@mui/material"
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";


const ShowCard = (props)=>{

    const {show} = props

    return (
        <div>
                <Card elevation={3} sx={{borderRadius:3}}>
                    <Link to={`/show/${show.id}`} underline="none">
                        <CardMedia 
                            component="img"
                            alt={`${show.name}`}
                            sx={{height:'75%'}}
                            image={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                        
                        />
                    </Link>
                    {/* <img src={
                        show.backdrop_path?
                        `https://image.tmdb.org/t/p/w500${show.backdrop_path}`
                    :'https://static.vecteezy.com/system/resources/thumbnails/002/267/298/small/tv-show-neon-signs-style-text-free-vector.jpg'
                    } alt={`${show.name}`}/> */}
                    {/* <CardActions sx={{justifyContent:"center"}}>
                        <Typography variant="h7" gutterBottom style={{underline:'none'}}>{show.name}</Typography>
                    </CardActions> */}
                </Card>
        </div>
            );
}

export default ShowCard