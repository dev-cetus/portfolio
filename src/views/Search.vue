<!--
 For more information or to contribute, read search.README.md
 -->

<template>
  <div id="logo">
    <div>
      <span id="logoText" @mouseover="textIsHover">Search</span>
    </div>
  </div>
  <div id="search" @mouseleave="inputNotClicked">
    <div id="searchIcon">
      <svg id="searchButton" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#a5a5a5" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
    </div>
    <div id="searchInput">
      <input type="text" id="searchField" maxlength="512" @keypress="searchEnter($event)" @focus="textIsHover" @focusin="inputClicked">
    </div>
    <div id="searchOn">
      <select v-model="selected" @change="changeSearchEngine">
        <option v-for="option in options" :key="option.value">
          {{ option.text }}
        </option>
      </select>
    </div>
    <div id="searchHistory">

    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      selected: 'Google',
      options: [
        { text: 'Google', value: 'Google' },
        {text: 'DuckDuckGo', value: 'DuckDuckGo' },
        {text: 'YouTube', value: 'YouTube' }
      ],
      expires: "expires=" + new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 365)),
      termsHistory: [],
    }
  },
  methods: {
    searchEnter(e) {

      if (e.keyCode === 13) {
        document.getElementById('searchIcon').children[0].remove();
        document.getElementById('searchIcon').innerHTML = '<i class="fas fa-spinner fa-pulse"></i>'

        let searchValue = document.getElementById('searchInput').children[0].value;
        if (searchValue !== '') {

          let searchTerms = this.termsHistory;
          searchTerms.push(searchValue);
          this.setCookie('searchTerms', searchTerms, this.expires);

          let searchEngine = this.selected;
          this.setCookie('searchEngine', searchEngine, this.expires);

          switch (searchEngine) {
            case 'Google':
              window.location.href = 'https://www.google.com/search?q=' + encodeURI(searchValue);
              break;
            case 'DuckDuckGo':
              window.location.href = 'https://duckduckgo.com/?q=' + encodeURI(searchValue);
              break;
            case 'YouTube':
              window.location.href = 'https://www.youtube.com/results?search_query=' + encodeURI(searchValue);
              break;
          }
        }
      }
    },
    changeSearchEngine() {
      let searchEngine = this.selected;
      this.setCookie('searchEngine', searchEngine, this.expires);
    },
    getCookie(name) {
      let value = "; " + document.cookie;
      let parts = value.split("; " + name + "=");
      if (parts.length === 2) return parts.pop().split(";").shift();
    },
    setCookie(name, value, expires) {
      document.cookie = name + "=" + value + ";" + expires;
    },
    deleteCookie(name) {
      document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    },
    inputClicked() {
      let search = document.getElementById('search');
      search.style.backgroundColor = '#424345';
      search.style.border = 'none';

      this.openHistory();

    },
    inputNotClicked() {
      let search = document.getElementById('search');
      search.style.backgroundColor = 'transparent';
      search.style.border = '1px solid #a5a5a5';

      this.closeHistory();
    },
    textIsHover() {
      let logo = document.getElementById('logoText');
      logo.classList.add('linear-wipe');
    },
    deleteHistoryItem(index) {
      this.termsHistory.splice(index, 1);
      if (this.termsHistory.length === 0) {
        this.closeHistory();
        this.deleteCookie('searchTerms');
      }
      this.setCookie('searchTerms', this.termsHistory, this.expires);
    },
    openHistory() {
      let search = document.getElementById('search');

      if  (this.termsHistory.length > 0) {

        search.style.borderBottomLeftRadius = '0px';
        search.style.borderBottomRightRadius = '0px';

        let searchHistory = document.getElementById('searchHistory');
        searchHistory.classList.add('showHistory')

        let nbItems = this.termsHistory.length >= 10 ? 10 : this.termsHistory.length;

        let baseLink;
        switch (this.selected) {
          case 'Google':
            baseLink = 'https://www.google.com/search?q=';
            break;
          case 'DuckDuckGo':
            baseLink = 'https://duckduckgo.com/?q=';
            break;
          case 'YouTube':
            baseLink = 'https://www.youtube.com/results?search_query=';
            break;
        }
        let hr = searchHistory.appendChild(document.createElement('hr'));
        hr.style.marginTop = '0px';
        hr.style.marginBottom = '5px';
        hr.style.border = 'none';
        hr.style.borderTop = '1px solid #565758';
        hr.style.width = '90%';

        for (let i = 0; i < nbItems; i++) {
          let searchHistoryItem = searchHistory.appendChild(document.createElement('div'))
          searchHistoryItem.setAttribute('class', 'searchHistoryItem');
          searchHistoryItem.style.textDecoration = 'none';
          searchHistoryItem.style.padding = '3px 10px';
          searchHistoryItem.style.display = 'flex';
          searchHistoryItem.style.alignItems = 'center';
          searchHistoryItem.onmouseover = function () {
            this.style.backgroundColor = '#565758';
          }
          searchHistoryItem.onmouseout = function () {
            this.style.backgroundColor = '#424345';
          }

          let searchHistoryItemLine = searchHistoryItem.appendChild(document.createElement('div'));
          searchHistoryItemLine.style.color = '#ae50e5';
          searchHistoryItemLine.style.display = 'flex';
          searchHistoryItemLine.style.alignItems = 'center';
          searchHistoryItemLine.style.justifyContent = 'space-between';

          let historyIcon = searchHistoryItemLine.appendChild(document.createElement('i'))
          historyIcon.setAttribute('class', 'fas fa-history');
          historyIcon.style.marginRight = '10px';
          historyIcon.style.color = '#a7a7a7';
          historyIcon.onclick = function () {
            window.location.href = baseLink + this.parentElement.parentElement.firstChild.innerText;
          }

          let historyText = searchHistoryItemLine.appendChild(document.createElement('span'));
          historyText.innerHTML = this.termsHistory[i];
          historyText.style.overflow = 'hidden';
          historyText.style.textOverflow = 'ellipsis';
          historyText.style.whiteSpace = 'nowrap';
          historyText.style.width = '530px';
          historyText.onclick = function () {
            window.location.href = baseLink + this.innerHTML;
          }

          /*

          Dose not work

          let deleteButton = searchHistoryItemLine.appendChild(document.createElement('i'));
          deleteButton.setAttribute('class', 'fas fa-times');
          deleteButton.setAttribute('v-bind:onclick', "this.deleteHistoryItem(i)");
          deleteButton.style.color = '#a7a7a7';
          deleteButton.style.cursor = 'pointer';
          deleteButton.style.marginRight = '10px';
          deleteButton.style.onmouseover = function () {
            this.style.color = '#ae50e5';
          }
          deleteButton.onclick = function () {
            --> this.deleteHistoryItem(i); <-- doesn't work

          }
          */
        }
      }
    },
    closeHistory() {
      let search = document.getElementById('search');

      document.getElementById('searchHistory').classList.remove('showHistory')
      document.getElementById('searchHistory').innerHTML = '';
      search.style.borderBottomLeftRadius = '30px';
      search.style.borderBottomRightRadius = '30px';
    }
  },

  created() {
    let searchTerms = this.getCookie('searchTerms');
    if (searchTerms !== undefined) {
      this.termsHistory = searchTerms.split(',');
    }

    let searchEngine = this.getCookie('searchEngine');
    if (!searchEngine || searchEngine === '' || searchEngine === null || searchEngine !== 'Google' && searchEngine !== 'DuckDuckGo' && searchEngine !== 'YouTube') {
      this.setCookie('searchEngine', 'Google', this.expires);
      this.selected = 'Google';
    } else {
      this.selected = searchEngine;
    }
  }
}
</script>

<style lang="css" scoped>
@import "../assets/css/style.css";

#logo div {
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 100px;
  margin-bottom: 20px;
  border-radius: 20px;
}
#logo span {
  font-size: 10em;
  font-weight: bold;
  color: #727272;
  transition: all 0.5s;
}
.showHistory {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #424345;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  z-index: 1;
  -webkit-user-select: none;
}
.linear-wipe {
  background: linear-gradient(-45deg, #fd2c2c 10%, #e8c229 30%, #55d733 50%, #5338cd 70%, #fd2c2c 90%);

  background-size: 200% auto;

  color: #727272;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 2.7s linear infinite;
}

#search {
  position: relative;
  width: 600px;
  height: 50px;
  background-color: transparent;
  border-radius: 30px;
  border: 1px solid #a5a5a5;
  margin: auto;
}
#search:hover {
  background: #424345;
  border: none;
}
#searchIcon {
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #727272;
}
#searchButton {
  width: 24px;
  height: 24px;
}
#searchInput {
  position: absolute;
  top: 48%;
  left: 50px;
  transform: translateY(-50%);
  width: calc(100% - 170px);
  height: 30px;
  border: none;
  outline: none;
  font-size: 16px;
  background-color: transparent;
  transition: all 0.3s;
}
#searchInput input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 16px;
  color: white;
  background-color: transparent;
}
#searchInput input:focus {
  width: 100%;
  height: 30px;
  border: none;
  outline: none;
  font-size: 16px;
  color: white;
  background-color: transparent;
}
#searchOn {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
}
#searchOn select {
  width: 100px;
  height: 30px;
  border: none;
  outline: none;
  font-size: 14px;
  color: #999;
  background-color: transparent;
}
#searchOn option {
  background-color: var(--bg);
}

@media all and (max-width: 628px) {
  #logo span {
    font-size: 6em;
  }
  #search {
    width: 300px;
  }
  #searchInput {
    left: 35px;
  }
  #searchOn {
    top: 80px;
    position: relative;
    display: flex;
    justify-content: center;
  }
  #searchOn select {
    width: 150px;
    background: #191a1f;
    padding: 7px;
    border-radius: 5px;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.5);
    height: 35px;
  }
}

@keyframes shine {
  to {
    background-position: 200% center;
  }
}
</style>