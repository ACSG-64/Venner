/* eslint-disable */
<template>
    <div>
        <reports-section></reports-section>
        <data-display></data-display>
    </div>
</template>

<script>
import ReportsSection from './ReportsSection.vue'
import DataDisplay from './DataDisplay.vue'

export default {
name: 'Dashboard',
    components: {
        ReportsSection,
        DataDisplay
    }
}
</script>

<style >
*{
  margin: 0;
  font-family: 'Open Sans';
}

html, body{
  height: 100%;
}
</style>

