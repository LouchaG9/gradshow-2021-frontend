import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import GraduateAPI from './../../GraduateAPI'

class viewGraduateView {
  init(){
    document.title = 'View Graduate'
    this.graduate = null    
    this.render()    
    Utils.pageIntroAnim()
    this.getGraduate()
  }

  async getGraduate(){
    // get id param from URL
    const urlParams = new URLSearchParams(location.search);
    const id = urlParams.get('id')
    // console.log(id)
    // get the graduate
    this.graduate = await GraduateAPI.getGraduate(id)
    console.log(this.graduate)
    this.render()
  }

  render(){
    const template = html`
      <va-app-header title="View Graduate" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">
        
        ${this.graduate == null ? html `
        <sl-spinner></sl-spinner>
        ` : html `

        <!-- ABOUT THE STUDENT ---------------------------------->
        <section class="block-50-50">
          <div class="column">
            <img src="${App.apiBase}/images/${this.graduate.normalPhoto}" />
          </div>
          <div class="column">
            <h3>Major${this.graduate.major}</h3>
            <h1>First Name${this.graduate.firstName}</h1>
            <p><strong>Quirky Fact</strong><br>Something quirky/interesting about the student.${this.graduate.quirkyFact}</p>
            <p><strong>Hobbies</strong><br>A list of hobbies of the student.${this.graduate.hobbies}</p>

            <div class="buttons-wrapper">
              <button class="secondary">Portfolio</button>
              <button class="icon">Linkedin</button>
              <button class="icon">Instagram</button>
            </div>
            
            <p><strong>Description</strong></p>
            <p>${this.graduate.description}Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus suspendisse non, sit euismod mauris ut. Suscipit non elit at sem massa eget semper. Eget tristique adipiscing congue turpis tincidunt non. Commodo tortor nunc lacus lacinia amet, platea. Ut nec leo, lobortis mattis. Tristique molestie orci nec nulla dapibus ultricies vel cursus. Eget dictumst volutpat integer eu, suscipit tincidunt gravida aliquam ultricies. Pretium parturient a, integer eget aenean vel. Diam commodo, pellentesque purus pretium, nisi nunc nisi tempus, tellus. Amet suspendisse sodales tristique purus. Netus est quam neque arcu elit aliquam. Tristique vulputate sed a in morbi. Enim, adipiscing a purus enim curabitur nunc, ac. Non, eu cursus arcu ut eu, ut.</p>
          </div>
        </section>
        

        <!-- WORK ---------------------------------->
        <section class="block-100 height-1">
          <h1>Jane Doe's Work</h1>
          <div class ="work-container">
            <!-- This is where we will display a couple of the students best works. -->
          </div>
        </section>

        `} <!-- end of individual rendering -->


         <!-- FOOTER ---------------------------------->
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


export default new viewGraduateView()