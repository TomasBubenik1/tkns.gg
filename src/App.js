import React, { useState, useEffect, createContext } from "react";
import "./App.css";
import { getUsers, getMatches, deleteMatch } from "./services/MatchService";
import { Grid, Button, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import MatchItem from "./components/MatchItem";
import CreateMatchModal from "./components/CreateMatchModal";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import MatchPage from "./components/MatchPage";
import { useAuth } from "./services/AuthService";
import "./images/bigPanelbg.png";
import { UserComponent } from "./components/ProfileComponent";
import LoginModal from "./components/LoginModal";
import ProfileComponent from "./components/ProfileComponent"
import Cookies from "js-cookie";
import { getUserFromCookies } from "./services/AuthService";

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
  const [openMatchModal, setMatchOpenModal] = useState(false);
  const { signInWithGoogle, user } = useAuth();
  const [openLoginModal, setLoginModalOpen] = useState(false);
  const userCookies = getUserFromCookies();
  const handleLoginModalOpen = () => {
    setLoginModalOpen(true);
  };
  const handleLoginModalClose = () => {
    setLoginModalOpen(false);
  };

  useEffect(() => {
    getUsers().then((userData) => setUsers(userData));
    const unsubscribe = getMatches((matchData) => setMatches(matchData));
    return () => unsubscribe();
  }, []);

  const createMatch = () => {
    setMatchOpenModal(true);
  };

  const handleCloseModal = () => {
    setMatchOpenModal(false);
  };
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="header">
          <Link to={"/"} className="logo">
            <div>Tkns</div>
          </Link>
          <div></div>
          <Button
            onClick={createMatch}
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
          >
            Create Match
          </Button>
          <>
  <div className="buttons"></div>
  <div className="login-button">
    <div>
      {userCookies ? (
        <Link to="profile" element={<ProfileComponent></ProfileComponent>} >Profile</Link>
      ) : (
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLoginModalOpen}
          >
            Open Login Modal
          </Button>
          <button onClick={signInWithGoogle}>Register</button>
        </div>
      )}
    </div>
  </div>
</>



            
        </header>
        <div className="toskoItem">
          <div className="bigPanel" style={{ backgroundImage: "bigPanelbg" }}>
            <div>
              <Routes>
                <Route
                  path="/"
                  element={
                    <MatchList matches={matches} onDelete={deleteMatch} />
                  }
                />
                <Route path="/matches/:matchId" element={<MatchPage />} />
                <Route path="*" element={<PageNotFound />} />
                <Route path="/profile" element={<ProfileComponent />} />
                <Route
  path="/profile"
  element={user ? <ProfileComponent/> : <Link path="/" />}
/>
              </Routes>
            </div>

            <CreateMatchModal
              open={openMatchModal}
              onClose={handleCloseModal}
            />
          </div>
        </div>
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
function PageNotFound() {
  return <h1>Page not Found</h1>;
}

export default App;
