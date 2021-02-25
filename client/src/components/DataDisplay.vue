/* eslint-disable */
<template>
<section id="query-results">

    <div id="selectors">
        <form @submit.prevent="queryOnSubmit" method="post">

        <h2>New query</h2>

        <select name="countries" id="countries" v-model="query_selection.country" required>
            <option value="country" selected disabled>Country</option>
            <option v-for="country in countries_list" :key="country" :value="country">{{ country }}</option>
        </select>

        <select name="state" id="state" v-model="query_selection.state" required>
            <option value="state" selected disabled>Country subdivision</option>
            <option v-for="state in states_list" :key="state" :value="state">{{ state }}</option>
        </select>

        <select name="city" id="city"  v-model="query_selection.city" required>
            <option value="city" selected disabled>City</option>
            <option v-for="city in cities_list" :key="city" :value="city">{{ city }}</option>
        </select>

        <select name="borouhg" id="borouhg" v-model="query_selection.borough" required>
            <option value="borough" selected disabled>City subdivision</option>
            <option v-for="boroughs in boroughs_list" :key="boroughs.borough" :value="boroughs.borough">{{ boroughs.borough }}</option>
        </select>

        <input type="submit" value="Search ➔">
        </form>
    </div>

    <div id="results">
        <img src="/images/undraw_detailed_analysis_xn7y.png">
    </div>

    <venues-map></venues-map>
    <venues-clusters></venues-clusters>

</section>
</template>

<script>

import VenuesMap from './VenuesMap.vue'
import VenuesClusters from './VenuesClusters.vue'
export default {
  name: 'Dashboard',
  components: {
    VenuesMap,
    VenuesClusters
  },
  data: function()  {
      return {
      isSent: false,

      query_selection: {
          country: "country",
          state: "state",
          city: "city",
          borough: "borough"
      }
    }
  },

  methods: {
    queryOnSubmit(){
      this.$store.dispatch('make_query', this.query_selection)
    },
    list_countries(){
      this.$store.dispatch('request_countries',this.query_selection)
    },
    list_states(){
      this.$store.dispatch('request_states',this.query_selection)
    },
    list_cities(){
      this.$store.dispatch('request_cities',this.query_selection)
    },
    list_boroughs(){
      this.$store.dispatch('request_borouhgs',this.query_selection)
    }
  },

  watch: {
    'query_selection.country': function(){
      this.list_states()
    },
    'query_selection.state': function(){
      this.list_cities()
    },
    'query_selection.city': function(){
      this.list_boroughs()
    }/*,
    'query_selection.borough': function(){
      alert(this.query_selection.borough);
    }*/
  },

  created() {
    this.$store.dispatch('request_countries', this.query_selection)
  },

  computed:{
      countries_list(){
          return this.$store.getters.countries_list
      },
      states_list(){
          return this.$store.getters.states_list
      },
      cities_list(){
          return this.$store.getters.cities_list
      },
      boroughs_list(){
          return this.$store.getters.boroughs_list
      },
    }
}
</script>

<style>
#query-results #selectors{
  padding: 1% 2%;
}

#query-results #selectors form{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

#query-results #selectors form select{
  border: 2px solid gray;
  width: 15%;
  font-size: 1.05em;
  padding: 0.3%;
}

#query-results #selectors form input{
  border: none;
  background-color: blue;

  color: white;
  font-weight: bold;

  font-size: 1.05em;
  padding: 0.6% 1.5%;
}

#query-results #results img{
  height: 45vh;
  opacity: 0.9;
  margin: 10px auto 20px;
  display: block;
}

</style>
