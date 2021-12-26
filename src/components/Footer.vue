<template>
    <footer>
      <ul class="no-list-style">
        <li>
          <a href="https://github.com/dev-cetus" title="GitHub" class="btn-primary">
            <i class="fab fa-github"></i>
          </a>
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