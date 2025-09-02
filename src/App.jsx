import { useState } from "react";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      {/* <Dashboard />
       */}

      {loggedIn ? (
        <Dashboard />
      ) : (
        <Login onLoginSuccess={() => setLoggedIn(true)} />
      )}
      {/* <UserRegistrationForm /> */}
    </div>
  );
}

export default App;
