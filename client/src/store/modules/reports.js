import axios from 'axios';

export default {
  state: {
    reports: []
  },
  mutations: {
    SET_REPORTS(state, list) {
      state.reports = list;
    },
    ADD_REPORT(state, list) {
      state.reports.append(list);
    },
    REMOVE_REPORT(state, list) {
      state.reports.pop(list);
    }
  },
  getters: {
    reports_list: state => state.reports
  },
  actions: {
    get_reports(context) {
      axios.get(`https://codedoor-fswd-entry-server.andrescamilocamilo.repl.co/query_reports/`)
        .then(response => {
          context.commit('SET_REPORTS', response.data);
        })
        .catch(err => console.log(err))
    },
    /*get_report_by_id(context, df_id) {
      axios.get(`https://codedoor-fswd-entry-server.andrescamilocamilo.repl.co/create_rep/${df_id}`)
        .then(response => {
          context.commit('UPDATE_REPORTS', response.data);
        })
        .catch(err => console.log(err))
    },*/
    async get_report_by_id(context, df_id) {
      let query = await axios.get(`https://codedoor-fswd-entry-server.andrescamilocamilo.repl.co/create_rep/${df_id}`)
        if(query.status == 200){
          context.commit('UPDATE_REPORTS', response.data);
          return 200
        }
    },
    create_report(context, user_id, df_id) {
      axios.post(`https://codedoor-fswd-entry-server.andrescamilocamilo.repl.co/create_rep/${df_id}`)
        .then(response => {
          context.commit('UPDATE_REPORTS', response.data);
        })
        .catch(err => console.log(err))
    },
    remove_report(context, user_id, df_id) {
      axios.put(`https://codedoor-fswd-entry-server.andrescamilocamilo.repl.co/remove_rep/${df_id}`)
        .then(response => {
          context.commit('ADD_REPORT', response.data);
        })
        .catch(err => console.log(err))
    }
  }
}