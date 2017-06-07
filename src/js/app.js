var Vue = require('vue');
Vue.config.debug = true;

import CardService from './services/card-service.js'

new Vue({
  el: '.container',
  data: {
    cards: [],
    index: 0,
    finish: 0
  },
  components: {
    koreanCard: require('./components/korean-card')
  },
  methods: {
    incrementIndex: function() {
      if(this.index === this.cards.length-1){
        this.finish = 1;
      } else {
        this.index++;
      }
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