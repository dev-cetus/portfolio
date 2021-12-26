<template>
  <div class="home">
    <Header/>
        <div class="home__head">
          <div class="home__head__presentation">
            <div class="txt-xxl txt-bold">Hi! I'm Cetus <i class="twa twa-waving-hand"></i></div>
            <p>I'm computer science student & developer.</p>
          </div>
          <div class="home__head__SN">
            <a class="btn-github txt-bold" href="https://github.com/dev-cetus" target="_blank" ref="noopener">
              <i class="fab fa-github"></i>
              GitHub Profile
            </a>
            <a class="btn-discord txt-bold" href="https://discord.com/users/522123053581467669" target="_blank" rel="noopener">
              <i class="fab fa-discord"></i>
              Discord Profile
            </a>
          </div>
        </div>
        <div class="home__head__angle"></div>
      <div class="home__content">
        <div id="about">
          <div class="txt-bold txt-xxl"><i class="twa twa-newspaper"></i> About me</div>
          <p>I'm a young 15-year-old computer science apprentice who lives in Switzerland <i class="twa twa-flag-switzerland"></i>, passionated about programming.</p>
        </div>
        <div id="github">
          <div class="txt-bold txt-xxl txt-center">My GitHub repos <i class="twa twa-books"></i></div>
          <div class="repos">
            <div v-for="repo in repos" :key="repo.id" class="repoBox">
              <a v-if="!repo.fork && repo.visibility === 'public'" v-bind:href="repo.html_url" target="_blank" rel="noopener">
                <div>
                  <div class="name" v-bind:title="repo.name">{{ repo.name }}</div>
                  <div class="description">{{ repo.description }}</div>
                </div>
                <div>
                  <div class="lang"><div v-bind:style="'height:10px;width:10px;border-radius:5px;margin-right:5px;background-color:' + languageColor (repo.language) "></div> {{ repo.language }}</div>
                  <div class="footerRepos">
                    <div class="stars">
                      <i class="fas fa-star"></i>
                      <span>{{ repo.stargazers_count }}</span>
                    </div>
                    <div v-if="repo.license !== null" class="license">
                      <i class="fas fa-balance-scale"></i>
                      <span>{{ repo.license.name }}</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import axios from 'axios'
import json from '@/assets/languages.min.json'


export default {
  name: 'Home',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      repos: null
    }
  },
  created: function() {
    axios.get('https://api.github.com/users/dev-cetus/repos').then(response => {
      this.repos = response.data
    });
  },
  methods: {
    languageColor(language) {
      if (language === null) {
        return ''
      }
      return json[language]
    }
  }
}
</script>

<style scoped>
@import url('../assets/css/twemoji.min.css');

.home__head{
  padding: 50px 0 30px 200px;
  background-color: var(--darkblue);
}
.home__head__SN{
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.home__head__SN a{
  margin-right: 1rem;
  background-color: #383838;
  border-radius: 7px;
  border: 2px #1f1f1f solid;
  padding: 0.5rem;
  width: 250px;
  text-align: center;
  transition: all 0.3s ease-in-out;

  color: white;
  text-decoration: none;

  box-shadow: rgb(0 0 0 / 20%) 0 8px 16px;
}
.home__head__SN a:hover{
  background-color: #494949;
  transform: translateY(-5px);
}
.home__head__angle {
  position: absolute;
  z-index: -1;
  background-color: var(--darkblue);
  -webkit-transform: skewY(-5deg);
  -moz-transform: skewY(-5deg);
  -o-transform: skewY(-5deg);
  -ms-transform: skewY(-5deg);
  transform: skewY(-5deg);
  width: 100%;
  height: 200px;
  margin-top: -80px;
}
.home__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
}
.home__content #about {
  max-width: 800px;
  margin-left: 300px;
  text-align: right;
  margin-bottom: 100px;
}
#github .repos {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 50px;
  max-width: 1200px;
}
#github .repoBox {
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 200px;
  margin: 1rem;
  background-color: #111215;
  border-radius: 7px;
  padding: 0.5rem;
  transition: all 0.3s ease-in-out;
  color: white;
  text-decoration: none;
  box-shadow: rgb(0 0 0 / 30%) 0 8px 16px;
}
#github .repoBox a {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 300px;

  color: white;
  text-decoration: none;
}
#github .repoBox:hover {
  transform: translateY(-5px);
}
#github .repoBox .name {
  font-size: 1.5rem;
  width: 60%;
  margin-bottom: 0.5rem;
  border-bottom: 2px #f7ff00 solid;
}
#github .repoBox .description {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  max-width: 300px;
  max-height: 75px;
  overflow-y: scroll;
  overflow-wrap: break-word;
}
#github .repoBox .description::-webkit-scrollbar {
  width: 0;
  height: 0;
  background: transparent;
}
#github .repoBox .lang {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 14px;
  margin-bottom: 20px;
  margin-top: 5px;
}
#github .repoBox .footerRepos {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  align-content: center;
  transition: all 0.5s ease-in-out;
}
#github .repoBox .stars i, #github .repoBox .license i {
  margin-right: 0.5rem;
}
#github .repoBox .stars span, #github .repoBox .license span {
  font-size: 0.8rem;
}
#github .repoBox:hover .stars {
  color: #ecc528;
}
#github .repoBox:hover .license{
  color: #2866ec;
}

@media all and (max-width: 1300px) {
  .home__content #about {
    margin-left: 200px;
    margin-right: 100px;
  }
}
@media all and (max-width: 900px) {
  .home__head {
    padding-left: 50px;
  }
  .home__content #about {
    margin-left: 10px;
    margin-right: 10px;
  }
}
@media all and (max-width: 550px) {
  .home__head {
    padding-left: 0;
    text-align: center;
  }
  .home__head__SN {
    flex-direction: column;
  }
  .home__head__SN a {
    margin-right: 0;
    margin-bottom: 1rem;
  }
}
</style>