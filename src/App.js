import React, { useState, useEffect } from "react";
import "./App.css";
import { getUsers, getMatches, deleteMatch } from "./services/MatchService";
import { Grid, Button, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import MatchItem from "./components/MatchItem";
import CreateMatchModal from "./components/CreateMatchModal";
import { Routes, Route, Link } from "react-router-dom";
import MatchPage from "./components/MatchPage";
import { signInWithGoogle } from "./services/AuthService";
const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3", // Change the color to your desired primary color
    },
    secondary: {
      main: "#f50057", // Change the color to your desired secondary color
    },
  },
});

function App() {
  const [users, setUsers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    getUsers().then((userData) => setUsers(userData));
    const unsubscribe = getMatches((matchData) => setMatches(matchData));
    return () => unsubscribe();
  }, []);

  const createMatch = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

 


  return (
   <ThemeProvider theme={theme}>
      <div className="App">
      <header className="header">
          <Link to={"/"} className="logo"><div>Tkns</div></Link>
          <Button onClick={createMatch} variant="contained" color="primary" startIcon={<AddIcon />}>
            Create Match
          </Button>
          <div className="buttons">
            
          </div>
          <div className="login-button">
            <button>Login</button>
            <button onClick={signInWithGoogle}>Register</button>
          </div>
        </header>
        <div>
          <Routes>
            <Route path="/" element={<MatchList matches={matches} onDelete={deleteMatch} />} />
            <Route path="/matches/:matchId" element={<MatchPage />} />
            <Route path="*" element={<PageNotFound/>}/>
          </Routes>
        </div>

        <CreateMatchModal open={openModal} onClose={handleCloseModal} />
      </div>
    </ThemeProvider>
  );
}

function MatchList({ matches, onDelete }) {
  return (
    <Grid container spacing={2}>
      {matches.map((match) => (
        <Grid item xs={12} sm={6} md={4} key={match.id} sx={{ mt: "50px" }}>
          <MatchItem match={match} onDelete={() => onDelete(match.id)} />
        </Grid>
      ))}
    </Grid>
  );
}
function PageNotFound(){
  return(
    <h1>Page not Found</h1>
  )
}


export default App;