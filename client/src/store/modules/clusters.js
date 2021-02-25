import axios from 'axios';

export default {
    state: {
        clusters:[],
        maps:[]
    },
    mutations: {
        ADD_CLUSTERS(state, df) {
            state.clusters = df["clusters"];
            state.maps = df["maps"]
        }
    },
    getters: {
        list_clusters: state => state.clusters,
        map_markers: state => state.maps
    },
    actions: {
        request_clusters(context){
            axios.get('https://codedoor-fswd-entry-server.andrescamilocamilo.repl.co/query_data/US/District%20of%20Columbia/Washington%20D.C./Ward%208')
            .then(response => {
                if(response.status == 200){
                    context.commit('ADD_CLUSTERS', response.data)
                    return
                }

            })
            .catch(err => console.log(err))
        }
    }

}