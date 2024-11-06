import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import Private from './Private';
import Public from './Public';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          {/* Public routes */}
          <Route 
            path="/login" 
            element={
              !user ? (
                <Public onSignIn={setUser} />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            } 
          />

          {/* Protected routes */}
          <Route 
            path="/dashboard/*" 
            element={
              user ? (
                <Private onSignOut={() => setUser(null)} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />

          {/* Redirect root to appropriate page */}
          <Route 
            path="/" 
            element={
              <Navigate to={user ? "/dashboard" : "/login"} replace />
            } 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
