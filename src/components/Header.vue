<template>
  <header>
    <ul class="no-list-style list-primary">
      <li><router-link class="btn-primary" to="Home">Home</router-link></li>
      <li><router-link class="btn-primary" to="Contact">Contact me</router-link></li>
    </ul>
  </header>
</template>

<script>
export default {
    name: 'Header'
  }
</script>

<style scoped lang="css">

header{
  background: var(--darkblue);
  color: #fff;
  padding: 10px;
}
ul{
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: white;
}
a{
  color: white;
  margin: 0px 5px;
}
</style>