<template>
  <Header/>
  <div class="contact txt-center">
    <div class="txt-xxl txt-bold Contact__title">How to contact me? <i class="twa twa-telephone-receiver"></i></div>
    <div class="Contact__angle"></div>

    <div class="contactWays">
      <div v-for="way in ways" :key="way.name">
        <a class="cart txt-bold" v-bind:href="way.link" target="_blank">
          <i v-bind:class="'twa ' + way.twemoji"></i>
          <div class="txt-bold">{{ way.name }}</div>
        </a>
      </div>
    </div>
  </div>
  <Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import {mapState} from 'vuex'

  export default {
    name: 'Contact',
    components: {
      Header,
      Footer
    },
    computed: {
      ...mapState({
        ways: state => state.ways
      })
    }
  }
</script>

<style scoped>
@import url('../assets/css/twemoji.min.css');

.Contact__title {
  padding-top: 50px;
  padding-bottom: 100px;

  background-color: var(--darkblue);
  width: 100%;
}
.Contact__angle {
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
.contactWays {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
.contactWays .cart {
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 250px;
  width: 200px;
  background-color: #111215;
  border-radius: 7px;
  margin: 20px;
  color: white;

  transition: all 0.3s ease-in-out;
  text-decoration: none;
  box-shadow: rgb(0 0 0 / 30%) 0 8px 16px;
}
.contactWays .cart:hover {
  box-shadow: rgb(0 0 0 / 30%) 0 8px 16px;
  transform: scale(1.1);
}
.contactWays .cart i {
  font-size: 90px;
  padding-top: 50px;
}

footer {
  position: absolute;
  bottom: 0;
}
@media all and (max-width: 719px) {
  footer {
    position: relative;
  }
}
</style>