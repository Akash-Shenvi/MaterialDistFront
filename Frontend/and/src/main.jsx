import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './components/Auth/Login';
import Forgotpass from './components/Auth/Forgotpass';
import Dashboard from './components/Home/Users/Dashboard';
import Assignments from './components/Home/Users/Assignments';
import Notes from './components/Home/Users/Notes';
import Profile from './components/Home/Users/Profile';
import Questionbank from './components/Home/Users/Questionbank';
import Questionpaper from './components/Home/Users/Questionpaper';
import Uploadmaterials from './components/Home/Users/Uploadmaterials';




const rootElement = document.getElementById('root');

// Ensure `rootElement` exists before rendering
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/participate" element={<Login />} />
          <Route path="/forgotpass" element={<Forgotpass />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path='/assignments' element={<Assignments />} />
          <Route path='/notes' element={<Notes />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/question-banks' element={<Questionbank />} />
          <Route path='/question-papers' element={<Questionpaper />} />
          <Route path='/uplode-materials' element={<Uploadmaterials />} />
          {/* <Route path='/uplode-assignments' element={<Uploadassignments/>}/> */}
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  console.error('Root element not found. Ensure the HTML file has a <div id="root"></div>.');
}
