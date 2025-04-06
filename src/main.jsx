import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/700.css';
import ReactDOM from 'react-dom/client'
import './index.css'
import Root from './root.jsx'
import './i18n.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Root />
  </BrowserRouter>
)