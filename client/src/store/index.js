import Vue from 'vue'
import Vuex from 'vuex'

import clustersModule from './modules/clusters'
import authModule from './modules/auth'
import dashboardModule from './modules/dashboard'
import reportsModule from './modules/reports'

Vue.use(Vuex);
Vue.config.devtools = true;

const store = new Vuex.Store({
  modules:{
    clusters: clustersModule,
    auth: authModule,
    dashboard: dashboardModule,
    reports: reportsModule
  }

});

export default store;

