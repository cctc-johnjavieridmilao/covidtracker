<script>
// Import the base chart
import { Bar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

// Extend it
export default {
  extends: Bar,
  props: ["labels", "data"],
  mixins: [reactiveProp],
  data() {
    return {
      chartdata: {
        labels: this.labels,
        datasets: [
          {
            label: "Chart Data",
            backgroundColor: ["#f87979", "#3cf520", "#46affa"],
            data: this.data
          }
        ]
      }
    };
  },
  mounted() {
    // Overwriting base render method with actual data and options
    const options = {
      responsive: true,
      maintainAspectRatio: false
    };
    this.renderChart(this.chartdata, options);
  },
  watch: {
    data() {
      this.$data._chart.update();
    }
  }
};
</script>
