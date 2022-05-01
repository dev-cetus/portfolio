<template>
  <section id="footer">
    <a href="https://twitter.com/dev_cetus">
     <i class="fab fa-twitter" style="color:#1DA1F2"></i>
    </a>
    <a href="https://discord.com/users/522123053581467669">
      <i class="fab fa-discord" style="color:#5865F2"></i>
    </a>
    <a href="mailto:cetus@ik.me">
      <i class="fas fa-at" style="color:#DD3737"></i>
    </a>
  </section>
</template>

<script>
export default {
  name: 'FooterSocialNetworks'
}
</script>

<style lang="css" scoped>
#footer {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;

  z-index: 1000;

  background-color: #08081A;
  padding: 20px 0;
  border-radius: 100px;
  width: 300px;
  height: 50px;

  display: flex;
  justify-content: space-around;
  align-items: center;

  box-shadow: -7px 9px 10px rgba(0, 0, 0, 0.5);
}
#footer i {
  cursor: pointer;
  font-size: 24px;
  opacity: .65;
}
#footer i:hover {
  animation: jump .5s;
  animation-delay: .1s;
}

@keyframes jump {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
  80% {
    transform: translateY(0);
  }
  90% {
    transform: translateY(-2px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>