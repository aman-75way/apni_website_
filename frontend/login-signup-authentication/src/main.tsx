import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { LocationFetch } from './header/locationFetch/LocationFetch.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
        <App />
        {/* <LocationFetch /> */}
    </BrowserRouter>
  </React.StrictMode>,
)
