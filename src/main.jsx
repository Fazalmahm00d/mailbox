import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import MailProvider from './components/contextAPI.jsx'
import { Provider } from 'react-redux'
import store from './ReduxStore/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <MailProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </MailProvider>
    </Provider>
    
  </StrictMode>,
)
