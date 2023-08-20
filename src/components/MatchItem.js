import React from "react";
import { Paper, Typography, Button } from "@mui/material";
import { deleteMatch } from "../services/MatchService";
import { Link } from "react-router-dom";

const MatchItem = ({ match }) => {
  const handleDelete = () => {
    deleteMatch(match.id);
  };

  return (
    <Paper className="matches-container" elevation={3} style={{ backgroundImage: match.image, backgroundSize: "cover" }}>
      <Typography variant="body1">
        {match.matchtype + " " + match.matchplayers + " " + match.region + " " + match.id}
      </Typography>
      <Button onClick={handleDelete} variant="contained" color="secondary">
        Delete
      </Button>
      <Link to={`/matches/${match.id}`}>
      <Button variant="contained" color="primary">
        Show Details
      </Button>
      </Link>
    </Paper>
  );
};

export default MatchItem;