import React from "react";
import { Paper, Typography, Button } from "@mui/material";
import { deleteMatch } from "../services/MatchService";
import { Link } from "react-router-dom";
import { useAuth } from "../services/AuthService";
import {signInWithGoogle} from "../services/AuthService"
import { JoinMatch } from "../services/MatchService";



const MatchItem = ({ match }) => {
  const { signInWithGoogle, user } = useAuth();
  const handleDelete = () => {
    deleteMatch(match.id);
  };

  return (
    <Paper className="matches-container" elevation={3} style={{ }}>
      <Typography variant="body1">
        {match.matchtype + " " + match.matchplayers + " " + match.region + " " + match.id}
      </Typography>
      <Button onClick={handleDelete} variant="contained" color="secondary">
        Delete
      </Button>
      <Link to={`/matches/${match.id}`}>
      <Button variant="contained" color="primary" onClick={JoinMatch}>
       Join Match
      </Button>
      </Link>
    </Paper>
  );
};

export default MatchItem;