<template>
    <div>
        <h3>Clusters</h3>

        <div v-for="cluster in clusters" :key="cluster">
            <h4>Cluster {{ clusters.indexOf(cluster) + 1 }}</h4>
            <tr>
                <th>Neihgborhood</th>
                <th>1st Most popular venue</th>
                <th>2nd Most popular venue</th>
                <th>3rd Most popular venue</th>
                <th>4th Most popular venue</th>
                <th>5th Most popular venue</th>
                <th>6th Most popular venue</th>
                <th>7th Most popular venue</th>
                <th>8th Most popular venue</th>
                <th>9th Most popular venue</th>
                <th>10th Most popular venue</th>
            </tr>
            <tr v-for="items in cluster" :key="items">
                <td>{{ items["Neighborhood"] }}</td>
                <td>{{ items["1st Most Common Venue"] }} </td>
                <td>{{ items["2nd Most Common Venue"] }} </td>
                <td>{{ items["3rd Most Common Venue"] }} </td>
                <td>{{ items["4th Most Common Venue"] }} </td>
                <td>{{ items["5th Most Common Venue"] }} </td>
                <td>{{ items["6th Most Common Venue"] }} </td>
                <td>{{ items["7th Most Common Venue"] }} </td>
                <td>{{ items["8th Most Common Venue"] }} </td>
                <td>{{ items["9th Most Common Venue"] }} </td>
                <td>{{ items["10th Most Common Venue"] }} </td>
            </tr>

        </div>
    </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
export default {
    computed:{
        clusters(){
            alert('SIMPLE UPDATE');
            return this.$store.getters.list_clusters
        },
    }
}
</script>

<style>

tr:nth-child(odd) {
  background-color: #f2f2f2;
}

</style>
