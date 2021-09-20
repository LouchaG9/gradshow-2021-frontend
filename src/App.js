import Router, { gotoRoute } from './Router'
import Toast from './Toast'


class App {
  constructor(){
    this.name = "Gradshow 2021"
    this.version = "1.0.0"
    this.apiBase = 'http://localhost:3000'
    this.rootEl = document.getElementById("root")
    this.version = "1.0.0"
  }
  
  init() { 
    console.log("App.init")
    
    // Toast init
    Toast.init()   
    
    // Router init
    Router.init()     
  }
}

export default new App()