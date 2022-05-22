<template>
  <main>
    <div class="home">
      <section id="title">
        <h1>Hey! I'm Cetus</h1>
        <p>Young self-taught developer</p>
      </section>
      <section id="buttons">
        <!-- <ButtonBig to="/blog" text="Blog" icon="fas fa-pen-fancy" color="#6AFCCC" /> -->
        <ButtonBig to="https://github.com/dev-cetus" text="Github" icon="fab fa-github" color="#FFFFFF" />
      </section>
      <section id="scrollDown" v-on:click="goTo('#skills')">
        <i class="fas fa-mouse"></i>
        Scroll down!
      </section>
      <section id="skills" class="sectionContainer">
        <div class="titleBig">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path fill="#FFFFFF" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"/></svg>
          <h1><a href="#skills">Skills</a></h1>
        </div>
        <div class="cards">
          <LangLevel logo="javascript" color="#F1DD35" level="90" />
          <LangLevel logo="typescript" color="#007ACC" level="40" />
          <LangLevel logo="python" color="#387EB8" level="50" />
          <LangLevel logo="golang" color="#2DBCAF" level="20" />
        </div>
      </section>
      <section id="projects" class="sectionContainer">
        <div class="titleBig">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path fill="#FFFFFF" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"/></svg>
          <h1><a href="#projects">Projects</a></h1>
        </div>
        <div class="cards">
          <ProjectCard repoName="portfolio" />
          <ProjectCard repoName="LoginAndRegistration" />
          <ProjectCard repo-name="vuejs-dashboard-api-mariadb" />
        </div>
      </section>
      <FooterSocialNetworks />
    </div>
  </main>
</template>

<script>
import ButtonBig from '@/components/ButtonBig.vue'
import LangLevel from "@/components/langLevel";
import ProjectCard from "@/components/ProjectCard";
import FooterSocialNetworks from "@/components/FooterSocialNetworks";

export default {
  name: 'HomeView',
  components: {
    ButtonBig,
    LangLevel,
    ProjectCard,
    FooterSocialNetworks,
  },
  methods: {
    goTo(element) {
      window.location.href = element;
    }
  }
}
</script>

<style lang="css">
/* Main title */
.home #title {
  text-align: center;
  margin: 0;
  margin-top: 100px;
  padding: 1em;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  color: white;
}
.home #title * {
  margin: 0;
}
.home #title h1 {
  font-size: 80px;
}
.home #title p {
  font-size: 28px;
  opacity: .35;
}
/* Section container */
.home .sectionContainer {
  width: 1040px;
  color: white;
  margin: auto;
}
/* Big title */
.home .titleBig {
  display: flex;
  align-items: center;
  color: white;
  margin-bottom: 30px;
}
.home .titleBig svg {
  height: 120px;
  margin-right: 25px;
  margin-bottom: 40px;
  filter: drop-shadow(55px 0 3px #000000);
  -webkit-filter: drop-shadow(55px 0 3px #000000);
}
.home .titleBig h1 {
  font-size: 80px;
  font-weight: 700;
  font-family: 'Josefin Sans', sans-serif;
  z-index: 2;
}
.home .titleBig a {
  color: white;
  text-decoration: none;
}
/* Cards */
.home .cards {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
/* Buttons */
.home #buttons {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}
.home #buttons > * {
  margin: 0 40px;
}
/* Scroll down */
.home #scrollDown {
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 200px;
  font-size: 22px;
  opacity: .3;
  font-family: "Open Sans", sans-serif;
  color: white;

  cursor: pointer;
  width: fit-content;
  width: -moz-fit-content;
  border-radius: 50px;
  padding: 20px;

  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  transition: all .3s ease-in-out;
}
.home #scrollDown i {
  font-size: 40px;
  color: #0057DA;
  margin-right: 20px;
}
.home #scrollDown:hover {
  opacity: .8;
  background-color: rgba(255, 255, 255, .1);
}
/* Skills */
.home #skills {
  margin-top: 500px;
  margin-bottom: 100px;
}
/* Projects */
.home #projects {
  margin-bottom: 100px;
}
@media screen and (max-width: 1050px) {
  .home .sectionContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .home .cards {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
@media all and (max-width: 570px) {
  .home #title {
    margin-top: 50px;
  }
  .home #title h1 {
    font-size: 60px;
  }
  .home #title p {
    font-size: 20px;
  }
  .home #buttons > * {
    margin: 0 20px;
  }
  .home .titleBig h1 {
    font-size: 60px;
  }
}
@media screen and (max-width: 430px) {
  .home #skills {
    margin: 200px auto;
  }
  .home #buttons {
    flex-direction: column;
    align-items: center;
  }
  .home #buttons > * {
    margin: 20px 0;
  }
  .home #scrollDown {
    display: none;
  }
  .home .titleBig svg {
    height: 80px;
    margin-right: 15px;
    margin-bottom: 30px;
    filter: drop-shadow(30px 0 3px #000000);
    -webkit-filter: drop-shadow(30px 0 3px #000000);
  }
  .home .titleBig h1 {
    font-size: 50px;
  }
}
</style>