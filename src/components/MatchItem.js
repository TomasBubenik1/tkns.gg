import React from "react";
import { Paper, Typography, Button, CardMedia } from "@mui/material";
import { deleteMatch } from "../services/MatchService";
import { Link } from "react-router-dom";
import { useAuth } from "../services/AuthService";
import {signInWithGoogle} from "../services/AuthService"
import { JoinMatch } from "../services/MatchService";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import PublicIcon from '@mui/icons-material/Public';
import ScoreboardIcon from '@mui/icons-material/Scoreboard';


const MatchItem = ({ match }) => {
  const { signInWithGoogle, user } = useAuth();
  const handleDelete = () => {
    deleteMatch(match.id);
  };

  return (
    <Card sx={{width:'460px',height:'200px',margin:'0,-340px',}}>
      <Box sx={{display:'flex',justifyContent:'space-between'}}>
      <Typography variant="h6" sx={{fontWeight:'bold'}}>{match.matchplayers + ' ' + match.matchtype}</Typography>
      <Typography variant="h6" sx={{fontWeight:'bold'}}>{match.id}</Typography>
      </Box>
      <Box sx={{display:'flex',justifyContent:'space-evenly',gap:'20px',paddingTop:'30px',paddingRight:'20px'}}>
      <Typography variant="h8" sx={{fontWeight:'bold',border:'solid black 1px',borderRadius:'4px',backgroundColor:'red'}}>Platform</Typography>
      <Typography variant="h8" sx={{fontWeight:'bold',}}><PublicIcon/>Region</Typography>
      <Typography variant="h8" sx={{fontWeight:'bold'}}> <ScoreboardIcon/>First to</Typography>
      </Box>

      <Box sx={{display:'flex',justifyContent:'space-evenly',gap:'25px',paddingTop:'5px'}}>
      <Typography variant="h8" sx={{fontWeight:'bold'}}>{match.platform}</Typography>
      <Typography variant="h8" sx={{fontWeight:'bold'}}>{match.region}</Typography>
      <Typography variant="h7" sx={{fontWeight:'bold'}}>5⁺³</Typography>
      </Box>
      <Button onClick={handleDelete}>Delete</Button>
    </Card>
  );
};

export default MatchItem;