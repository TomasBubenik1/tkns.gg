import React, { useState, useEffect, createContext} from "react";
import "./App.css";
import { getUsers, getMatches, deleteMatch } from "./services/MatchService";
import { Grid, Button, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import MatchItem from "./components/MatchItem";
import CreateMatchModal from "./components/CreateMatchModal";
import { Routes, Route, Link } from "react-router-dom";
import MatchPage from "./components/MatchPage";
import { useAuth } from "./services/AuthService";
import "./images/bigPanelbg.png"
import { UserComponent } from "./components/ProfileComponent";
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

function UpdateNickname() {
  const { user, updateNickname } = useAuth();
  const [newNickname, setNewNickname] = useState("");

  const handleUpdateNickname = () => {
    if (newNickname.trim() !== "") {
      updateNickname(newNickname);
    }
  };
}

function App() {
  const [users, setUsers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const { signInWithGoogle, user } = useAuth();


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
          <div>
      
      
      
    </div>
          <Button onClick={createMatch} variant="contained" color="primary" startIcon={<AddIcon />}>
            Create Match
          </Button>
          <div className="buttons">
            
          </div>
          <div className="login-button">
            <button>Login</button>
            <button onClick={signInWithGoogle}>Register</button>
            <Link  to={'/profile'} element={<UserComponent/>}>Profile</Link>
          </div>
        </header>
        <div className="toskoItem">
            <div className="bigPanel" style={{backgroundImage:"bigPanelbg"}}>
        <div>
          <Routes>
            <Route path="/" element={<MatchList matches={matches} onDelete={deleteMatch} />} />
            <Route path="/matches/:matchId" element={<MatchPage />} />
            <Route path="*" element={<PageNotFound/>}/>
            <Route path="/profile" element={<UserComponent/>}/>
          </Routes>
        </div>  
        

        <CreateMatchModal open={openModal} onClose={handleCloseModal} />
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
function PageNotFound(){
  return(
    <h1>Page not Found</h1>
  )
}


export default App;