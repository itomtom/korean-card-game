var Vue = require('vue');
Vue.config.debug = true;

import CardService from './services/card-service.js'

new Vue({
  el: '.container',
  data: {
    cards: [],
    index: 0,
    finish: 0,
    success: 0
  },
  components: {
    koreanCard: require('./components/korean-card')
  },
  methods: {
    incrementIndex: function(result) {
      if(result){
        this.success++;                
      }

      if(this.index === this.cards.length-1){
        this.finish = 1;
      } else {
        this.index++;
      }
    },
    return: function() {
      let url = 'https://www.seamless.com/corporate/login/';
      if(/^\?url=(.+)$/.test(url)) {
        url = /^\?url=(.+)$/.exec(window.location.search)[1];
      }
      return window.location.href = url + '#/pass';
    }
  },
  created: function() {
    let service = new CardService();
    service.getCards(
      (response) => {
        this.cards = response;
      },
      (response) => {
        console.log(response);
      }
    );
  }
});