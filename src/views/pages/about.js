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
        <section class="block-50-50 height-1">
          <div class="column">
            <h1>About The DeStore.</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus suspendisse non, sit euismod mauris ut. Suscipit non elit at sem massa eget semper. Eget tristique adipiscing congue turpis tincidunt non. Commodo tortor nunc lacus lacinia amet, platea. Ut nec leo, lobortis mattis. Tristique molestie orci nec nulla dapibus ultricies vel cursus. Eget dictumst volutpat integer eu, suscipit tincidunt gravida aliquam ultricies. Pretium parturient a, integer eget aenean vel. Diam commodo, pellentesque purus pretium, nisi nunc nisi tempus, tellus. Amet suspendisse sodales tristique purus. Netus est quam neque arcu elit aliquam. Tristique vulputate sed a in morbi. Enim, adipiscing a purus enim curabitur nunc, ac. Non, eu cursus arcu ut eu, ut</p>
          </div>
          <div class="column">
            <img src=".../static/images/placeholder.png" alt="Placeholder">
          </div>
        </section>

        <section class="block-25-25-25-25 height-2">
          <div class="column">
            <h3>Value 1</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus suspendisse non, sit euismod mauris ut.</p>
          </div>
          <div class="column">
            <h3>Value 2</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus suspendisse non, sit euismod mauris ut.</p>
          </div>
          <div class="column">
            <h3>Value 3</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus suspendisse non, sit euismod mauris ut.</p>
          </div>
          <div class="column">
            <h3>Value 4</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus suspendisse non, sit euismod mauris ut.</p>
          </div>
        </section>

        <section class="block-100">
          <div class="credit-block">
            <h3>Treasury</h3>
            <ul>
              <li>Name LastName</li>
              <li>Name LastName</li>
            </ul>
          </div>
          <div class="credit-block">
            <h3>Animation & Video Production Team</h3>
            <ul>
              <li>Name LastName</li>
              <li>Name LastName</li>
              <li>Name LastName</li>
              <li>Name LastName</li>
              <li>Name LastName</li>
              <li>Name LastName</li>
              <li>Name LastName</li>
              <li>Name LastName</li>
            </ul>
          </div>
          <div class="credit-block">
            <h3>Photography Team</h3>
            <ul>
              <li>Name LastName</li>
              <li>Name LastName</li>
              <li>Name LastName</li>
            </ul>
          </div>
          <div class="credit-block">
            <h3>Testing & Quality Team</h3>
            <ul>
              <li>Name LastName</li>
              <li>Name LastName</li>
              <li>Name LastName</li>
              <li>Name LastName</li>
              <li>Name LastName</li>
            </ul>
          </div>
          <div class="credit-block">
            <h3>Website Programmers</h3>
            <ul>
              <li>Name LastName</li>
              <li>Name LastName</li>
              <li>Name LastName</li>
              <li>Name LastName</li>
              <li>Name LastName</li>
              <li>Name LastName</li>
              <li>Name LastName</li>
              <li>Name LastName</li>
            </ul>
          </div>
          <div class="credit-block">
            <h3>Copy Writing Team</h3>
            <ul>
              <li>Name LastName</li>
              <li>Name LastName</li>
            </ul>
          </div>
          <div class="credit-block">
            <h3>Communications & Logistics Team</h3>
            <ul>
              <li>Name LastName</li>
              <li>Name LastName</li>
              <li>Name LastName</li>
              <li>Name LastName</li>
              <li>Name LastName</li>
              <li>Name LastName</li>
            </ul>
          </div>
          <div class="credit-block">
            <h3>UI / UX Designers</h3>
            <ul>
              <li>Name LastName</li>
              <li>Name LastName</li>
              <li>Name LastName</li>
              <li>Name LastName</li>
            </ul>
          </div>
          <div class="credit-block">
            <h3>Social Media</h3>
            <ul>
              <li>Name LastName</li>
              <li>Name LastName</li>
              <li>Name LastName</li>
            </ul>
          </div>
        </section>
        <section class="image-slider">
          <!-- not sure how we want to code this one in. Might need to look at something like slick-slider or glide.js -->
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


export default new AboutView()