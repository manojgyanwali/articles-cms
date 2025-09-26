import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import PostDetails from './pages/PostDetails.jsx';
import Auth from './pages/Auth.jsx';
import Dashboard from './pages/Dashboard.jsx';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Router>
          <Routes>
            <Route path = "/" element= { <Home /> }  />
            <Route path ="/post/:postId" element={<PostDetails />} />
            <Route path ="/register" element={< Auth/>} />
            <Route path="/dashboard" element={<Dashboard />} />

          </Routes>
        </Router>
      
      
    </>
  )
}

export default App
