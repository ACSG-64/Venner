<template>
<div class="file">
    <div class="inner">
    <div class="front">
        <div class="file-title">
        <p><strong>{{ data.city }}</strong>, {{ data.state }}, {{ data.country}}</p>
        <p>{{ data['creation-date'] }}</p>
        </div>
    </div>

    <div class="back">
        <strong>{{ data.city }}</strong>
        <p>{{ data.state }}, {{ data.country}}</p>
        <button v-if="isCreated">Open</button>
        <button>Delete</button>
    </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'RportIcon',
  data: function () {
    return {
      isCreated: true,
      polling: null
    }
  },
  props: {
    data: {
      type: Object
    }
  },
  methods: {
    pollReport() {
      this.polling = setInterval(() => {
        let status = this.$store.dispatch('get_report_by_id', this.props.data['data-frame-id']);
        if (status == 200) {
          this.isCreated = true;
          clearInterval(this.polling);
        }
      }, 10000)
    }
  },
  beforeMount() {
    if (this.props.data['report-path'].indexOf('.pdf') == -1) {
      this.isCreated = false;
      this.pollReport();
    }
  }
}
</script>

<style>

</style>
