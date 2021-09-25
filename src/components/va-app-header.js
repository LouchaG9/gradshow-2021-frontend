// App header is the top bar of the website 

import { LitElement, html, css } from '@polymer/lit-element'
import {anchorRoute, gotoRoute} from './../Router'
import App from './../App'

customElements.define('va-app-header', class AppHeader extends LitElement {
  constructor(){
    super()    
  }

  static get properties(){
    return {
      title: {
        type: String
      },
      user: {
        type: Object
      }
    }
  }

  firstUpdated(){
    super.firstUpdated()
    this.navActiveLinks()    
  }

  navActiveLinks(){	
    const currentPath = window.location.pathname
    const navLinks = this.shadowRoot.querySelectorAll('.app-top-nav a, .app-side-menu-items a')
    navLinks.forEach(navLink => {
      if(navLink.href.slice(-1) == '#') return
      if(navLink.pathname === currentPath){			
        navLink.classList.add('active')
      }
    })
  }

  hamburgerClick(){  
    const appMenu = this.shadowRoot.querySelector('.app-side-menu')
    appMenu.show()
  }
  
  menuClick(e){
    e.preventDefault()
    const pathname = e.target.closest('a').pathname
    const appSideMenu = this.shadowRoot.querySelector('.app-side-menu')
    // hide appMenu
    appSideMenu.hide()
    appSideMenu.addEventListener('sl-after-hide', () => {
      // goto route after menu is hidden
      gotoRoute(pathname)
    })
  }

  render(){    
    return html`
    <style>      
      * {
        box-sizing: border-box;
      }
      .app-header {
        background: var(--brand-color);
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        height: var(--app-header-height);
        color: #fff;
        display: flex;
        z-index: 9;
        box-shadow: 4px 0px 10px rgba(0,0,0,0.2);
        align-items: center;
      }

      .app-logo a {
        color: #fff;
        text-decoration: none;
        font-weight: bold;
        font-size: 1.2em;
        padding: .6em;
        display: inline-block;        
      }

      .app-logo img {
        width: 90px;
      }
      
      .hamburger-btn::part(base) {
        color: #fff;
        display: none;
      }

      .app-top-nav {
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: space-between;
        width: 100%;
      }

      .logo-container {
        width: 200px;
        height: var(--app-header-height);
        align-self: flex-end;
        background: blue;
      }

      .app-top-nav a {
        display: inline-block;
        padding: .8em;
        text-decoration: none;
        color: #fff;
      }
      
      .app-side-menu-items a {
        display: block;
        padding: .5em;
        text-decoration: none;
        font-size: 1.3em;
        color: #333;
      }

      .app-side-menu-logo {
        width: 120px;
        margin-bottom: 1em;
        position: absolute;
        top: 2em;
        left: 1.5em;
      }

      .page-title {
        color: var(--app-header-txt-color);
        margin-right: 0.5em;
        font-size: var(--app-header-title-font-size);
      }

      /* active nav links */
      .app-top-nav a.active,
      .app-side-menu-items a.active {
        font-weight: bold;
      }

      /* RESPONSIVE - MOBILE ------------------- */
      @media all and (max-width: 768px){       
        
        .app-top-nav {
          display: none;
        }

        .hamburger-btn::part(base) {
        display: flex;
      }
      }

    </style>

    <header class="app-header">
    
      <!-- This is the hamburger button on the top left -->
      <sl-icon-button class="hamburger-btn" name="list" @click="${this.hamburgerClick}" style="font-size: 1.5em;"></sl-icon-button>    

      <nav class="app-top-nav">
        <div class=links>
          <a href="/" @click="${anchorRoute}">Home</a> 
          <sl-dropdown>
            <a slot="trigger" href="#" @click="${(e) => e.preventDefault()}">
              Graduates        
            </a>
            <sl-menu>            
              <sl-menu-item @click="${() => gotoRoute('/graduates')}">All Gradutes</sl-menu-item>
              <sl-menu-item @click="${() => gotoRoute('/graduates')}">Animation and Game Design</sl-menu-item>
              <sl-menu-item @click="${() => gotoRoute('/graduates')}">Digital Design</sl-menu-item>
              <sl-menu-item @click="${() => gotoRoute('/graduates')}">Graphic Design</sl-menu-item>
              <sl-menu-item @click="${() => gotoRoute('/graduates')}">Illustration</sl-menu-item>
            </sl-menu>
          </sl-dropdown>
          <a href="/about" @click="${() => gotoRoute('/about')}">About</a>
          <a href="/contact" @click="${() => gotoRoute('/contact')}">Contact</a>   
        </div>
        <div class="logo-container">
        <!-- This is where our logo will probably go on the nav bar -->  
        </div>
        
      </nav>
    </header>


    <sl-drawer class="app-side-menu" placement="left">

      <img class="app-side-menu-logo" src="/images/logo.svg">
      <nav class="app-side-menu-items">

        <a href="/" @click="${this.menuClick}">Home</a>
        <a href="/graduates" @click="${this.menuClick}">Graduates</a>
        <a href="/about" @click="${this.menuClick}">About</a>
      </nav>  

    </sl-drawer>
    `
  }
  
})

