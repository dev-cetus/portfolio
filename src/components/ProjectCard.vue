<template>
  <article>
    <div v-if="this.repoLoading">
      <div id="loader">
        <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
        <i>Loading...</i>
      </div>
    </div>
    <div v-else-if="!APIError">
      <div id="card">
        <div id="projectCardTitle">
          <h2><a :style="'color:' + languageColor(this.repo.language)" :href="this.repo.html_url" target="_blank">{{this.repo.name}}</a></h2>
        </div>
        <div id="projectDescription">
          <p>{{this.repo.description}}</p>
        </div>
        <div id="languageLicense">
          <div id="projectLanguage">
            <p>Written in {{this.repo.language}}</p>
          </div>
          <div id="projectLicense" v-if="this.repo.license">
            <p>{{this.repo.license.name}}</p>
          </div>
        </div>
      </div>
      </div>
    <div v-else>
      <p class="errorMessage">Error: {{APIErrorMessage}}</p>
    </div>
  </article>
</template>

<script>
import json from '@/assets/languages.min.json';

export default {
    name: 'ProjectCard',
    data() {
      return {
        APIError: false,
        APIErrorMessage: '',
        repo: null,
        repoLoading: true,
      }
    },
    props: {
        repoName: {
            type: String,
            required: true
        }
    },
    methods: {
        languageColor(language) {
          if (language === null) {
            return '#fff';
          }
          return json[language];
        }
    },
    created() {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
        this.APIError = true;
        this.APIErrorMessage = 'Request timed out';
        this.repoLoading = false;
      }, 3000);

      fetch(`https://api.github.com/repos/dev-cetus/${this.repoName}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        signal: controller.signal
      }).then(async res => {
        let data = await res.json();
        if (res.status === 200) {
          this.repo = data;
        } else if (res.status === 404) {
          this.APIError = true;
          this.APIErrorMessage = 'Repository not found';
        } else {
          this.APIError = true;
          this.APIErrorMessage = 'An error occurred';
        }
        clearTimeout(timeoutId);
        this.repoLoading = false;
      })
    }
}
</script>

<style lang="css" scoped>
article {
  display: flex;
  flex-direction: column;
  width: 490px;
  height: 250px;
  background-color: #090B15;
  opacity: .6;
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border-radius: 45px;
  margin: 15px;

  cursor: pointer;
  transition: all .3s ease-in-out;
}
article:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 15px rgba(0,0,0,0.5);
}
#loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Josefin Sans", sans-serif;
  font-size: 20px;
  line-height: 70px;
}
#card {
  padding: 5px 20px;
}
#projectCardTitle {
  font-family: "Josefin Sans", sans-serif;
  font-size: 22px;
}
#projectCardTitle h2 {
  margin-bottom: 0;
}
#projectCardTitle a {
  text-decoration: underline;
  color: #fff;
}
#projectDescription {
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  color: #FFFFFF;
  font-weight: 300;
}
#languageLicense {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 400px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 5px 20px;
}
#languageLicense p {
  border-radius: 10px;
  padding: 10px;
  transition: all .3s ease-in-out;
}
#languageLicense p:hover {
  background-color: rgba(0,0,0, 0.3);
}
#projectLanguage {
  font-family: "Open Sans", sans-serif;
  font-size: 14px;
  color: #FFFFFF;
  font-weight: 300;
}
#projectLicense {
  font-family: "Open Sans", sans-serif;
  font-size: 14px;
  color: #FFFFFF;
  font-weight: 300;
}
.errorMessage {
  font-family: "Josefin Sans", sans-serif;
  font-size: 20px;
  margin-top: 10%;
  color: #ffffff;

  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  border-radius: 10px;
  background: rgba(204, 34, 34, 0.8);
  width: fit-content;
  width: -moz-fit-content;
}

@media screen and (max-width: 530px) {
  article {
    width: 100%;
    height: 200px;
    margin: 5px;
    padding: 10px;
    border-radius: 20px;
  }
  #loader {
    font-size: 15px;
    line-height: 50px;
  }
  #card {
    padding: 5px 10px;
  }
  #projectCardTitle {
    font-size: 18px;
  }
  #projectDescription {
    font-size: 12px;
  }
  #languageLicense {
    width: 100%;
    padding: 5px 10px;
  }
  #projectLanguage {
    font-size: 12px;
  }
  #projectLicense {
    font-size: 12px;
  }
}
</style>