import { createStore } from 'vuex'

export default createStore({
  state: {
    ways: [
      {
        name: "Mail",
        link: 'mailto:cetus@ik.me',
        twemoji: 'twa-e-mail'
      },
      {
        name: "Discord",
        link: 'https://discord.com/users/522123053581467669',
        twemoji: 'twa-speech-balloon'
      },
      {
        name: "Twitter",
        link: 'https://twitter.com/dev_cetus',
        twemoji: 'twa-bird'
      }
    ],
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
