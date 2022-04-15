import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";


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
                </Card>
        </div>
            );
}

export default ShowCard