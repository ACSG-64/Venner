import axios from 'axios';

export default {
    state: {
        isLogin: false
    },
    mutations: {
        STATUS_LOGIN(state, df) {
            state.clusters = df["clusters"];
            state.maps = df["maps"]
        }
    },
    getters: {
        check_login: state => state.isLogin,
    },
    actions: {/*
        request_clusters(context){
            axios.get('https://codedoor-fswd-entry-server.andrescamilocamilo.repl.co/query_data/US/District%20of%20Columbia/Washington%20D.C./Ward%208')
            .then(response => context.commit('ADD_CLUSTERS', response.data))
            .catch(err => console.log(err))
        },*/
        submit_registration(context, form){
          console.log(form);
          return axios.post('https://codedoor-fswd-entry-server.andrescamilocamilo.repl.co/auth/register', form)
          .catch(err => console.log(err))
        },
        submit_login(context, form){
          console.log(form);
          return axios.post('https://codedoor-fswd-entry-server.andrescamilocamilo.repl.co/auth/login', form)
          .catch(err => console.log(err))
        }
    }
}