import "./IntroducingHealthCarePage.css";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from 'jwt-decode';

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="page">
      
      {/* Header */}
      <header className="header">
        <h1 className="title">HealthCare Chatbox</h1>
        <button onClick={() => navigate("/")} className="login-btn">
          Go Back to HomePage
        </button>
      </header>

      {/* Main Section */}
      <main className="main">
        <p className="established">Welcome Back</p>
        <h2 className="headline">Log in to HealthCare Chatbox</h2>

        <p className="paragraph">
          Sign in easily using your Google account below.
        </p>

        
        <div className="google-login-container" style={{
           marginTop: "40px",
           display: "flex",
           justifyContent: "center",
           alignItems: "center", 
           }}>

          <GoogleLogin
            onSuccess={credentialResponse => {
              console.log(credentialResponse);
              const decoded = jwtDecode(credentialResponse.credential);
              console.log(decoded);
              
              localStorage.setItem("token", credentialResponse.credential);
              localStorage.setItem("user", JSON.stringify(decoded));
              navigate("/chat");
            }}
            onError={() => console.log("Login Failed")}
            theme="filled_blue"
            size="large"
            shape="pill"
            width="300"
          />
        </div>
      </main>
      {/* Footer */}
      <footer className="footer">
        © 2025 HealthCare Chatbox. All rights reserved.
      </footer>
    </div>
  );
}
