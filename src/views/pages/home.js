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

     <section class="banner">
        <div class="column-1">
          <h1>Organic Shop<br>Fruit & Vegetables</h1>
          <button class="shop-graduates-btn">Shop all graduates</button>
          <p>The showcase of Curtin University design graduates</p>
        </div>

        <div class="column-2">
          <img src="https://i.stack.imgur.com/y9DpT.jpg">
        </div>
      </section>

      <section class="majors">
      <div class="major-columns">

       <div class="animation-column">
         <img class="animation-image" src="https://freepngclipart.com/thumb/bread/61-bread-png-image.png">
         <h3>Animation & Game Design</h3>
       </div>
       
        <div class="digex-column">
         <img class="digex-image" src="https://freepngclipart.com/thumb/bread/61-bread-png-image.png">
         <h3>Digital Design</h3>
    </div>

    <div class="graphic-column">
         <img class="graphic-image" src="https://freepngclipart.com/thumb/bread/61-bread-png-image.png">
         <h3>Graphic Design</h3>
    </div>
      </section>

      <section class="what-are-we">
        <div class="what-are-we-left">

        </div>
        <div class="what-are-we-right">
        <h1>What are we?</h1>
        <p>On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and 
          demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the 
          pain and trouble that are bound to ensue;<br><br>and equal blame belongs to those who fail in their duty through 
          weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly 
          simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when 
          nothing prevents our being able to do what we like best </p>
        <button>Learn about us</button>
        </div>
        
      </section>

      <div class="what-are-people-saying">
        <div class="saying-left">
          <h1>What are people saying?</h1>
        </div>

        <div class="saying-right">
          <div class="saying-joel">
            <h2>Joel Louie</h2>
            <h3>Digital Design Major Coordinator</h3>
            <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum maximus 
              sem non venenatis. In erat turpis, suscipit non libero sed, fermentum interdum nunc. 
              Duis sagittis neque sit amet."</p>
            </div>
          <div class="saying-lee">
            <h2>Lee Ingram</h2>
            <h3>Digital Design Major Coordinator</h3>
            <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum maximus 
              sem non venenatis. In erat turpis, suscipit non libero sed, fermentum interdum nunc. 
              Duis sagittis neque sit amet."</p>
            </div>
          <div class="saying-jonathon">
            <h2>Jonathon Pillai</h2>
            <h3>Digital Design Major Coordinator</h3>
            <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum maximus 
              sem non venenatis. In erat turpis, suscipit non libero sed, fermentum interdum nunc. 
              Duis sagittis neque sit amet."</p>
            </div>
  </div>
     <!---
        <section class="block-50-50 height-1">
          <div class="column">
            <h1>Welcome to the Destore</h1>
            <p>Locally sourced, organic produce.</p>
            <p>Only the finest cuts.</p>
            <p>Fresh from the bakery.</p>
            <button class="primary">Shop all Graduates</button>
            <p>Showcase of the Curtin University Design Graduates.</p>
          </div>
          <div class="column">
            <img src=".../static/images/placeholder.png" alt="Placeholder">
          </div>
        </section>
        --!>

        <!----
        <section class="block-33-33-33 height-2">
          <div class="subject">
           <p>Animation & Game Design.</p>
          </div>
          <div class="subject">
            <p>Graphic Design.</p>
          </div>
          <div class="digital-bread">
          <img alt="bread" src="https://freepngclipart.com/thumb/bread/61-bread-png-image.png">
            <p>Digital Experience & Interaction Design.</p>
          </div>
        </section>

        <section class="block-33-66 height-1">
          <div class="column-1"></div>
          <div class="column-2">
            <h1>What are we?</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </section>

        <section class="block-33-66 height-1">
          <div class="column-1">
            <h1>What are people saying?</h1>
          </div>
          <div class="column-2 reviews">
            <div class="review">
              <h3>Joel Louie</h3>
              <p>Digital Experience & Interaction Design.</p>
              <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</p>
          </div>
            <div class="review">
              <h3>Lee Ingram</h3>
              <p>Graphic Design.</p>
              <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</p>
            </div>
            <div class="review">
              <h3>Jonathan Pillai</h3>
              <p>Animation & Game Design.</p>
              <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</p>
            </div>
          </div>
        </section>

        <section class="image-slider">
         not sure how we want to code this one in. Might need to look at something like slick-slider or glide.js 
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
      -->


    `
    render(template, App.rootEl)
  }
}

export default new HomeView()