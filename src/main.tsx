
import { createRoot } from 'react-dom/client'
import React from 'react'

import { BrowserRouter } from 'react-router-dom'
import './styles/index.css'
import {App} from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter> {/* Este es el contenedor necesario */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
