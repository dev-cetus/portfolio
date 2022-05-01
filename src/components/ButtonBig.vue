<template>
  <button v-on:click="redirect">
    <i v-bind:class="icon"></i>
    {{text}}
  </button>
</template>

<script>
  export default {
    name: 'ButtonBig',
    props: {
      color: {
        type: String,
        required: true
      },
      icon: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: true
      },
      to: {
        type: String,
        required: true
      }
    },
    methods: {
      redirect: function() {
        window.location.href = this.to;
      }
    }
  }
</script>

<style lang="css" scoped>
button {
  cursor: pointer;
  height: 70px;
  width: 250px;
  outline: none;
  border: 5px solid v-bind(color);
  border-radius: 100px;
  background-color: #151528;
  color: v-bind(color);
  font-family: 'Open Sans', sans-serif;
  font-size: 26px;
  font-weight: 800;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: .52;

  transition: all .2s ease-in-out;
}

button:hover {
  transform: translateY(-5px);
  box-shadow: -7px 9px 10px rgba(0, 0, 0, 0.5);
  opacity: .9;
}

i {
  margin-right: 10px;
}
</style>