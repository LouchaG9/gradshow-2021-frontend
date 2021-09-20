import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Utils from '../../Utils'

class AboutView {
  init(){
    document.title = 'About Page'    
    this.render()    
    Utils.pageIntroAnim()
  }

  render(){
    const template = html`
      <va-app-header title="About page"></va-app-header>
      <div class="page-content">        
        <h1>About</h1>
        <p>This is the about page. Who the heck are we though?</p>
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new AboutView()