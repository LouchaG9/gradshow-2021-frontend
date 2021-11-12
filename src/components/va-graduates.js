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
        studentNumber: {
          type: Number,
        },
        firstName: {
          type: String,
        },
        lastName: {
          type: String,
        },
        major: {
          type: String,
        },
        email: {
          type: String,
        },
        tagLine: {
          type: String,
        },
        bio: {
          type: String,
        },
        artStation: {
          type: String,
        },
        behance: {
          type: String,
        },
        dribbble: {
          type: String,
        },
        instagram: {
          type: String,
        },
        linkedin: {
          type: String,
        },
        twitter: {
          type: String,
        },
        vimeo: {
          type: String,
        },
      };
    }

    firstUpdated() {
      super.firstUpdated();
    }

    // go to single page for each clicked graduate
    moreInfoHandler() {
      gotoRoute(`/viewGraduate?id=${this.id}`);
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
          }

          .view-employee-button {
            background-color: var(--brand-color);
            color: white;
            border: none;
          }

          button:hover {
            cursor: pointer;
            background-color: var(--destore-purple);
            border: none;
            color: black;
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
            width: 100%;
            height: 400px;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            border-bottom: 1px solid black;
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
        <div>
          <div class="image-container" style="background-image: url()"></div>
          <div class="text-container">
            <h3>${this.firstName} ${this.lastName}</h3>
            <p>${this.tagLine}</p>
            <div class="buttons-container">
              <button
                class="view-employee-button"
                @click=${this.moreInfoHandler.bind(this)}
              >
                View Employee
              </button>
              <button onclick="window.location.href='${this.portfolio}';">
                Portfolio
              </button>
              <!-- format of the link 'https://www.google.com' -->
            </div>
          </div>
        </div>
      `;
    }
  }
);
