import React from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useAuth } from "../services/AuthService"

function LoginModal({ open, onClose, onLoginWithGoogle }) {


     const { signInWithGoogle, user } = useAuth();


    return (
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="login-modal"
        aria-describedby="login-modal-description"
      >
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "white", padding: "2rem", borderRadius: "8px" }}>
          <h2 id="login-modal">Login Modal</h2>
          <p id="login-modal-description">Please login to proceed.</p>
          <Button variant="contained" color="primary" onClick={onLoginWithGoogle}>
            Login with Google
          </Button>
        </div>
      </Modal>
    );
  }

  export default LoginModal;