// Точка входа: подключаем стили и рисуем приложение в <div id="root">
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// StrictMode в разработке дважды запускает код, чтобы ловить ошибки
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
