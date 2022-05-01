<template>
  <article id="card">
    <svg width="200" height="200">
      <circle id="progress-ring__circle" ref="circle" :stroke="color" stroke-width="16" fill="transparent" r="55" cx="100" cy="100"/>
      <text x="50%" y="52%" ref="textCircle" text-anchor="middle" dominant-baseline="middle" :fill="color">
        <tspan id="progress-ring__text">{{ level }}%</tspan>
      </text>
    </svg>
    <img :src="require(`@/assets/images/${logo}.svg`)" id="langLogo" alt="">
  </article>
</template>

<script>
  export default {
    name: 'langLevel',
    props: {
      level: {
        required: true
      },
      color: {
        required: true
      },
      logo: {
        required: true
      },
    },
    methods: {
      resize() {
        let text = this.$refs.textCircle;
        text.setAttribute('x', '50%');
        text.setAttribute('y', '52%');
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'middle');
      }
    },
    created() {
      window.addEventListener('resize', this.resize);
    },
    unmounted() {
      window.removeEventListener('resize', this.resize);
    },
    mounted() {
      let circle = this.$refs.circle;
      let radius = circle.r.baseVal.value;
      let circumference = radius * 2 * Math.PI;

      circle.style.strokeDasharray = `${circumference} ${circumference}`;
      circle.style.strokeDashoffset = `${circumference}`;

      function setProgress(percent) {
        circle.style.strokeDashoffset = circumference - percent / 100 * circumference;
      }

      setProgress(this.level);
    }
  }
</script>

<style lang="css" scoped>
#card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 490px;
  height: 250px;
  background-color: #090B15;
  opacity: .6;
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border-radius: 45px;
  margin: 15px;
}

#progress-ring__circle {
  transform: rotate(-90deg);
  transform-origin: 50% 50%;

  cursor: pointer;
}

#progress-ring__text {
  font-family: "Josefin Sans", sans-serif;
  font-size: 30px;
  color: v-bind(color);
}

#langLogo {
  width: 160px;
  height: 160px;
  cursor: pointer;
  transition: all .3s;
  filter: blur(4px);
  -webkit-filter: blur(4px);
}
#langLogo:hover {
  filter: blur(0px);
  -webkit-filter: blur(0px);
}

@media screen and (max-width: 1000px) {
  #langLogo {
    filter: blur(0px);
    -webkit-filter: blur(0px);
  }
}
@media screen and (max-width: 530px) {
  svg {
    width: 100px;
    height: 100px;
  }
  circle {
    r: 40px;
    cx: 50px;
    cy: 50px;
    stroke-width: 8px;
  }
  #progress-ring__text {
    font-family: "Josefin Sans", sans-serif;
    font-size: 20px;
    color: v-bind(color);
  }

  #card {
    width: 100%;
    height: auto;
    margin: 5px;
    padding: 10px;
    border-radius: 20px;
  }
  #langLogo {
    width: 100px;
    height: 100px;
    margin-right: 10px;
  }
}
</style>