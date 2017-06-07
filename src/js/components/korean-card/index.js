module.exports = {
  template: require('./template.html'),
  data: function() {
      return {
          guess: null
      };
  },
  props: {
    card: {
      type: Object,
      required: false
    },
  },
  methods: {
    next: function() {
      this.$emit('increment');
      this.guess = null;
    }
  },
  computed: {
    display: function() {
      return this.guess === null;
    },
    answers: function() {
      return (this.card) ? this.card.answers : null;
    },
    word: function() {
      return (this.card) ? 'What is ' + this.card.question + '?' : null;
    }
  }
};
