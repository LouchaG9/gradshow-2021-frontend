import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Utils from '../../Utils'

class graduateSearchView {
  init(){
    document.title = 'All Graduates'    
    this.render()    
    Utils.pageIntroAnim()
  }

  render(){
    const template = html`
      <va-app-header title="All Graduates"></va-app-header>
      <div class="page-content">        
        <h1>All Graduates</h1>
        <p>This is where all of the graduates will live. We will use a filter to determine which ones to show and update the page heading / banner accordingly</p>
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new graduateSearchView()