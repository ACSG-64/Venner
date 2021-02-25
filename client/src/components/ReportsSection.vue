<template>

<section id="file-collection">
  <div class="header">
    <h2>Stored reports</h2>
    <p>Generating 3 documents...</p>
    <div style="min-width:15%; max-width:auto">
      <h3 style="float:left">Save current report <b style="background-color: blue; color: white;">+</b></h3>
    </div>

  </div>

  <div id="carusell">

    <report-icon v-for="report in reports_list" :key="report['_id']" :data="report"></report-icon>

  </div>
</section>

</template>

<script>
import ReportIcon from './ReportIcon.vue';
export default {
  components: {
      ReportIcon,
  },

  created() {
    this.$store.dispatch('get_reports', 'Miguelito');
  },
  computed:{
    reports_list(){
        return this.$store.getters.reports_list
    }
  }
}
</script>

<style>
/*** FILE COLLECTION ***/
#file-collection{
  background-color: rgb(250,250,250);
  padding: 2%;
  padding-top: 1%;
  min-height: 30%;
  max-height: auto;
}

#file-collection .header{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

#file-collection .add-button{
  color:white;
  background-color:blue;
  height:100%;
  padding: 0 5%;
  margin-left: 2%;
  border-radius: 50%;
  font-size: 1.6em;
}
#file-collection #carusell{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0.8% 0;

}

/* File */
#file-collection #carusell .file{
  height: 23vh;
  width: 23vh;

  display: flex;
  flex-shrink: 0;

  margin: 0 2.5%;
  perspective: 1000px;
}

#file-collection #carusell .file .inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s;
  transform-style: preserve-3d;

  background-color: white;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  border-radius: 10px;
}



#file-collection #carusell .file:hover .inner  {
  transform: rotateY(180deg);

}

.front,  .back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.front {
  background: url('~@/assets/images/blur_report.jpg');
  background-position:top;
  background-size: 90% auto;
  background-repeat: no-repeat;
}

.front .file-title{
  width: 100%;
  position: fixed;
  bottom: 0;
  border-radius: 0px 0px 10px 10px;
  background-color: white;
}

.back {
  transform: rotateY(180deg);
}

</style>
