
import React, { useState } from "react";
import { Modal, Box, Typography, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { createMatch } from "../services/MatchService";
import { Link } from "react-router-dom";
import { getMatches } from "../services/MatchService";



const CreateMatchModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    gameMode: "",
    numberOfPlayers: "",
    region: "",
    platform: "",
    firstTo: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitMatch = async () => {
    await createMatch({
      matchtype: formData.gameMode,
      matchplayers: formData.numberOfPlayers,
      region: formData.region,
      platform: formData.platform,
      firstTo: formData.firstTo,
      group1: [],
      group2: []
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="create-match-modal">
      <Box sx={{ width: 500, height: 600, backgroundColor: "white", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ padding: "16px", borderBottom: "1px solid #e0e0e0" }}>
          Create Match
        </Typography>
        <Box sx={{ padding: "16px" }}>
          <FormControl fullWidth variant="outlined" sx={{ marginBottom: "16px", mt: "100px" }}>
            <InputLabel id="game-mode-label">Game Mode</InputLabel>
            <Select
              labelId="game-mode-label"
              id="game-mode"
              name="gameMode"
              value={formData.gameMode}
              onChange={handleInputChange}
              label="Game Mode"
            >
              <MenuItem value="Realistics">Realistics</MenuItem>
              <MenuItem value="Zonewars">Zone Wars</MenuItem>
              <MenuItem value="Boxfights">Box Fights</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth variant="outlined" sx={{ marginBottom: "16px", }}>
            <InputLabel id="number-of-players-label">Number of Players</InputLabel>
            <Select
              labelId="number-of-players-label"
              id="number-of-players"
              name="numberOfPlayers"
              value={formData.numberOfPlayers}
              onChange={handleInputChange}
              label="Number of Players"
            >
              <MenuItem value="1v1">1v1</MenuItem>
              <MenuItem value="2v2">2v2</MenuItem>
              <MenuItem value="3v3">3v3</MenuItem>
              <MenuItem value="4v4">4v4</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth variant="outlined" sx={{ mb:"16px"}}>
            <InputLabel id="region-label">Region</InputLabel>
            <Select
              labelId="region-label"
              id="region"
              name="region"
              value={formData.region}
              onChange={handleInputChange}
              label="Region"
            >
              <MenuItem value="Europe">Europe</MenuItem>
              <MenuItem value="NA East">NA East</MenuItem>
              <MenuItem value="NA West">NA West</MenuItem>
              <MenuItem value="NA Central">NA Central</MenuItem>
              <MenuItem value="Oceania">Oceania</MenuItem>
              <MenuItem value="Brazil">Brazil</MenuItem>
              <MenuItem value="Middle East">Middle East</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth variant="outlined" sx={{ marginBottom: "16px" }}>
            <InputLabel id="number-of-players-label">Platform</InputLabel>
            <Select
              labelId="platform"
              id="platform"
              name="platform"
              value={formData.platform}
              onChange={handleInputChange}
              label="Number of Players"
            >
              <MenuItem value="All platforms">All platforms</MenuItem>
              <MenuItem value="Console">Console</MenuItem>

            </Select>
          </FormControl>
          <FormControl fullWidth variant="outlined" sx={{ marginBottom: "" }}>
            <InputLabel id="number-of-players-label">First To</InputLabel>
            <Select
              labelId="firstTo"
              id="firstTo"
              name="firstTo"
              value={formData.firstTo}
              onChange={handleInputChange}
              label="Number of Players"
            >
              <MenuItem value="All platforms">3⁺²</MenuItem>
              <MenuItem value="Console">5⁺²</MenuItem>

            </Select>
          </FormControl>
        </Box>
        <Box sx={{ padding: "16px", textAlign: "right" }}>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmitMatch} variant="contained" color="primary" sx={{ marginLeft: "8px" }}>
            Create
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateMatchModal;