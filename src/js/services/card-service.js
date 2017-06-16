import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);
/*
  If a module defines a default export,
  then you can import that default export by omitting the curely braces
*/
export default class CardService {

  getCards(success, error) {
    Vue.http.get('https://api.github.com/repos/itomtom/korean-card/contents').then(
      (response) => {
        var promises = [];
        response.data.slice(0, 5).forEach(
          (card) => promises.push(Vue.http.get(card.git_url))
        );

        Promise.all(promises).then(
          (responses) => {
            var cards = [];
            responses.forEach(
              (response) => cards.push(this.convertToObject(response.data.content))
            );
            success(cards.sort(function() {
              return 0.5 - Math.random() ;
            }));
          },
          (response) => {
            error(response);
          }
        );
      },
      (response) => {
        error(response);
      }
    )
  }

  convertToObject(content) {
    var object = {};
    var decoded = decodeURIComponent(escape(atob(content)));
    var lines = decoded.split(/\n/);
    object.question = lines[0];
    object.answers = [];

    for(var i=1;i<lines.length-1;i++){
      if(lines[i] !== ''){
        var result = lines[i].split(' ');
        object.answers.push({
          answer: result[0],
          value: parseInt(result[1])
        });
      }
    }

    return object;
  }
}
