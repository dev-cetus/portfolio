<template>
    <footer>
      <ul class="no-list-style">
        <li>
          <a href="https://github.com/dev-cetus" title="GitHub" class="btn-primary">
            <i class="fab fa-github"></i>
          </a>
          <a href="https://twitter.com/dev_cetus" title="Twitter" class="btn-primary">
            <i class="fab fa-twitter"></i>
          </a>
          <router-link to="Search" title="Search" class="btn-primary">
            <i class="fas fa-search"></i>
          </router-link>
        </li>
      </ul>
    </footer>
</template>

<script>
  export default {
    name: 'Footer'
}</script>

<style scoped lang="css">
footer {
  width: 100%;
  background-color: var(--darkblue);
  color: var(--gray-text);
  text-align: center;
  margin-top: 20px
}
ul {
  padding: 0;
  margin: 0;
}
li {
  padding: 20px;
}
</style>