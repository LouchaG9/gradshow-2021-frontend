import { LitElement, html, css } from "@polymer/lit-element";
import { render } from "lit-html";
import { anchorRoute, gotoRoute } from "./../Router";
import Auth from "./../Auth";
import App from "./../App";
import UserAPI from "./../UserAPI";
import Toast from "./../Toast";

customElements.define(
  "va-graduates",
  class Graduate extends LitElement {
    constructor() {
      super();
    }

    static get properties() {
      return {
        studentNumber: {  }, firstName: {  }, lastName: { }, major: {  },
        email: {  }, avatarOne: {  }, tagLine: {  }, bio: {  }, artStation: { }, 
        behance: {  }, dribbble: { }, instagram: {  }, linkedin: { },
        twitter: {  },  vimeo: {  }, portfolio: { },  avatarTwo: {  }, avatarOneHQ: { }, avatarTwoHQ: { },
      };
    }

    firstUpdated() {
      super.firstUpdated();
    }

    // go to single page for each clicked graduate
    
    employeeHandler() {
      return(html`
        <button
          class="view-employee-button"
          @click=${() => gotoRoute(`/graduate?id=${this.studentNumber}`)}>
        
        View Employee
        </button>
      `)
    }

    // portfolio link handler

    portfolioHandler() {
      return(html`
        <button
          class="view-employee-button"
          @click="${() => window.open(this.portfolio, '_blank').focus() }"
        >
        Portfolio
        </button>
      `)
    }

    render() {
      return html`
        <style>
          button {
            height: 50px;
            width: calc(50% - 2em);
            background-color: transparent;
            color: black;
            font-size: 15px;
            border: 1px solid black;
            border-radius: 10px;
            box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
          }

          .gradListingAvatar{
            position: absolute;
            max-height: 360px;
            cursor: grab;
            overflow: hidden;
            display: flex;
          }

          .gradListingAvatarTwo{
            position: absolute;
            max-height: 360px;
            cursor: grab;
            overflow: hidden;
            display: flex;
          }

          .gradListingAvatarTwo:hover{
            opacity: 0;
            transition: ease-in-out 0.1s;
          }

          .gradListingAvatarTwo:not(:hover){
            opacity: 1;
            transition: ease-in-out 0.1s;
          }

          .view-employee-button {
            background-color: var(--brand-color);
            color: white;
            border: none;
          }

          button:hover {
            cursor: pointer;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
            transition: ease-in-out 0.3s;
            border: none;
            color: white;
          }
          button:not(:hover){
            color: white;
            transition: ease-in-out 0.3s;
          }

          h3,
          p {
            margin: 0 auto;
            padding: 0;
          }

          h3 {
            font-size: 27px;
          }

          p {
            font-size: 18px;
          }

          .image-container {
            position: relative;
            width: 100%;
            min-height: 350px;
            overflow: hidden;
            text-align: center;
            margin: auto;

            display: flex;
            justify-content: center;

            border-bottom: 0px solid black;
            /* easing the hover transition */
            transition: 0.3s;
          }

          /* hover effect */
          /* .image-container:hover {
            background-image: url("${App.apiBase}/images/${this
            .quirkyPhoto}") !important;
            cursor: pointer;
          } */

          .text-container {
            height: 200px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
          }

          .buttons-container {
            display: flex;
            justify-content: space-evenly;
            width: 100%;
          }
        </style>

        <!-- delete placeholder text when the real data is used -->
   
          <div class="image-container" >  
          <img loading="eager" class="gradListingAvatar" src="${this.avatarOneHQ}"  onerror="this.src='/images/graduateBags/_DSC1414.jpg';">
          <img @click="${() => gotoRoute("/graduate?id="+this.studentNumber)}"  loading="eager" class="gradListingAvatarTwo" src="${this.avatarTwoHQ}" onerror="this.src='/images/graduateBags/_DSC1417.jpg';">
          </div>
 
          <div class="text-container">
            <h3>${this.firstName} ${this.lastName}</h3>
            <i><p>${this.tagLine}</p></i>
            <div class="buttons-container">
              ${this.employeeHandler()}
              ${this.portfolioHandler()}
              <!-- format of the link 'https://www.google.com' -->
            </div>
          </div>
        </div>
      `;
    }
  }
);
