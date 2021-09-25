import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Utils from '../../Utils'

class ContactView {
  init(){
    document.title = 'About Page'    
    this.render()    
    Utils.pageIntroAnim()
  }

  render(){
    const template = html`
      <va-app-header title="Contact"></va-app-header>
      <div class="page-content">        
        <h1>Contact the DeStore</h1>
        <p>Contact Info</p>
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new ContactView()