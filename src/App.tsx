import React, {useEffect, useState} from 'react';


import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Purchases from "./pages/Purchases";
import Payments from "./pages/Payments";
import Users from "./pages/Users";
import Farmers from "./pages/Farmers";

const App: React.FC = () => {
    const [name, setName] = useState('')
    const [APIKey, setAPIKey] = useState('')

    useEffect( () => {
        (
            async () => {
                const response = await fetch('http://localhost:8080/v1/users', {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
                })
                const content = await response.json()
                setName(content.Name)
                setAPIKey(content.ApiKey)
            }
        )()
    })

    return (
      <div className="App">
          <Router>
              <Nav name={name} setName={setName}/>
              <main className="form-signin w-100 m-auto">
                  <Routes>
                      <Route path="/" element={<Home name={name}/>}/>
                      <Route path="/register" element={<Register/>}/>
                      <Route path="/login" element={<Login setName={setName}/>}/>

                  </Routes>
              </main>
              <div className="Purchase">
                  <Routes>
                      <Route path="/purchases" element={<Purchases APIKey={APIKey}/>}/>
                  </Routes>
              </div>
              <div className="Payments">
                  <Routes>
                      <Route path="/payments" element={<Payments APIKey={APIKey}/>}/>
                  </Routes>
              </div>
              <div className="Users">
                  <Routes>
                      <Route path="/users" element={<Users />}/>
                  </Routes>
              </div>
              <div className="Payments">
                  <Routes>
                      <Route path="/farmers" element={<Farmers />}/>
                  </Routes>
              </div>
          </Router>

      </div>
    );
}

export default App;
