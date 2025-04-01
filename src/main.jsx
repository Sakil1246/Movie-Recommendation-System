import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import appStore, { persistor } from './utils/Store.jsx'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(
   
   <Provider store={appStore}>
    <PersistGate Loading={null} persistor={persistor}>
     <App />
     </PersistGate>
   </Provider>
   
   
  
)
