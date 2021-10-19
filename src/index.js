import App from './App.js'

// components (custom web components)
// These are in frontend/src/components 
import './components/va-app-header'
import './components/va-graduates'

// styles
import './scss/master.scss'

// app.init
document.addEventListener('DOMContentLoaded', () => {
  App.init()
})