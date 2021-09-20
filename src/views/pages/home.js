import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute } from './../../Router'
import Utils from './../../Utils'

class HomeView {
  init(){    
    console.log('HomeView.init')
    document.title = 'Home'    
    this.render()    
    Utils.pageIntroAnim()    
  }

  render(){
    const template = html`
      <va-app-header title="Home"></va-app-header>
      
      <div class="page-content">
        <h1>Welcome to the Destore </h1>
        <p> This is the home page of the Grad Show website! Let's do this :) </p>
      </div>
     
    `
    render(template, App.rootEl)
  }
}

export default new HomeView()