import axios from 'axios';

export default {
    state: {
        df_id: "",
        countries: [],
        states: [],
        cities: [],
        boroughs: []
    },
    mutations: {
        SET_COUNTRIES(state, list) {
          state.countries = list;
          state.states = [];
          state.cities = [];
          state.boroughs = []
        },
        SET_STATES(state, list) {
          state.states = list;
          state.cities = [];
          state.boroughs = []
        },
        SET_CITIES(state, list) {
          state.cities = list;
          state.boroughs = []
        },
        SET_BOROUGHS(state, list) {
          state.boroughs = list;
       },
        SET_DF_ID(state, id) {
          state.df_id = id;
        }
    },
    getters: {
        dataframe_id: state => state.df_id,

        countries_list: state => state.countries,
        states_list: state => state.states,
        cities_list: state => state.cities,
        boroughs_list: state => state.boroughs
    },
    actions: {
        request_countries(context, values){

            let url = 'https://codedoor-fswd-entry-server.andrescamilocamilo.repl.co/query_list/countries/' + values.country + '/' + values.state+ '/' + values.city +'/' + values.borough;

            axios.get(url)
            .then(response => context.commit('SET_COUNTRIES', response.data))
            .catch(err => console.log(err))
        },
        request_states(context, values){
          let url = 'https://codedoor-fswd-entry-server.andrescamilocamilo.repl.co/query_list/states/' + values.country + '/' + values.state+ '/' + values.city +'/' + values.borough;

          axios.get(url)
          .then(response => context.commit('SET_STATES', response.data))
          .catch(err => console.log(err))
        },
        request_cities(context, values){

          let url = 'https://codedoor-fswd-entry-server.andrescamilocamilo.repl.co/query_list/cities/' + values.country + '/' + values.state+ '/' + values.city +'/' + values.borough;

          axios.get(url)
          .then(response => context.commit('SET_CITIES', response.data))
          .catch(err => console.log(err))
        },
        request_borouhgs(context, values){
          let url = 'https://codedoor-fswd-entry-server.andrescamilocamilo.repl.co/query_list/boroughs/' + values.country + '/' + values.state+ '/' + values.city +'/' + values.borough;

          axios.get(url)
          .then(response => context.commit('SET_BOROUGHS', response.data))
          .catch(err => console.log(err))
        },

        make_query(context, form){
          axios.post('https://codedoor-fswd-entry-server.andrescamilocamilo.repl.co/query_data', form)
          .then(response => {
            context.commit('SET_DF_ID', response.data['_id']);
            context.commit('ADD_CLUSTERS', response.data)})
          .catch(err => console.log(err))
        }
    }

}