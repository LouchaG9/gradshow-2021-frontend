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
        <section class ="block-100 height-1 showreel-container">
              <!-- This is where we will display a couple of the students best works. -->
        </section>      
        <section class="block-100 height-2">
            <h1>All Graduates</h1> <!-- Change title depending on the current filter, eg. "graphic design graduates" etc. -->
              <!-- Some kind of dropdown / search bar to filter the students below. -->
        </section>
        <section class="block-100 height-1">
          <!-- This is where all the students will be inserted. -->
        </section>
        <footer>
          <div class="footer-content">
            <div class=footer-col>
              <h3>DeStore</h3>
              <p>
                Monday – Saturday: 8:00 am – 4:00pm <br>
                Sunday: 9:00 am – 5:00pm<br>
                Kent St, Bentley, 6102, Western Australia<br><br>
                @destore
              </p>
            </div>
            <div class=footer-col>
              <h3>Quick Links</h3>
              <ul>
                <li>Home</li>
                <li>Shop</li>
                <li>About</li>
                <li>Contact</li>
              </ul>
            </div>
            <div class=footer-col>
            <h3>Shop</h3>
              <ul>
                <li>Fresh Produce</li>
                <li>Butcher</li>
                <li>Bakery</li>
              </ul>
            </div>
          </div>
        </footer>
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new graduateSearchView()