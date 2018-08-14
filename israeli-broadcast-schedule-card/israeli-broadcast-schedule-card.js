class israeliBroadcastScheduleCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    set hass(hass) {

    }


    setConfig(config) {
        if (!config.channel) {
            throw new Error('Please define a channel');
        }

        const root = this.shadowRoot;
        if (root.lastChild) root.removeChild(root.lastChild);
        const card = document.createElement('ha-card');
        const style = document.createElement('style');
        let content = document.createElement('div');
        const title = document.createElement("div");
        title.className = "header";
        title.style = "font-family: var(--paper-font-headline_-_font-family); -webkit-font-smoothing: var(--paper-font-headline_-_-webkit-font-smoothing); font-size: var(--paper-font-headline_-_font-size); font-weight: var(--paper-font-headline_-_font-weight); letter-spacing: var(--paper-font-headline_-_letter-spacing); line-height: var(--paper-font-headline_-_line-height); line-height: 40px; color: var(--primary-text-color); padding: 4px 0 12px; display: flex; justify-content: space-between;";
        title.innerHTML = '<div class="name">' + config.title + '</div>';
        style.textContent = `
          ha-card {
            padding: 16px;
            text-align: right;
          }
          ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
            overflow: hidden;
           }        
           li a {
            direction: rtl;
            display: block;
            color: #000;
            text-align: right;
            padding: 2px 0;
            text-decoration: none;
           }
        `;

        content.innerHTML = this._httpGet("https://tv-lovelace.herokuapp.com/index.php?url=" + encodeURIComponent(this._URL(config.channel)));

        card.appendChild(style);
        if (config.title) {
            card.appendChild(title);
        }
        card.appendChild(content);
        root.appendChild(card);

    }

    _httpGet(theUrl) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, false);
        xmlHttp.send(null);
        return xmlHttp.responseText;
    }


    _URL(channel) {
        return `https://www.yes.co.il/content/YesChannelsHandler.ashx?action=GetDailyShowsByDayAndChannelCode&dayValue=0&dayPartByHalfHour=0&channelCode=${channel}`;
    }

    getCardSize() {
        return 1;
    }
}

customElements.define('israeli-broadcast-schedule-card',israeliBroadcastScheduleCard);