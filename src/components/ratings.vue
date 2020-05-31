<template>
    <div id="chart">
        <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
</template>

<script>
export default {
  data () {
    return {
      series: [{
        data: [0.9, 0.1, 0.1, 0.3, 0.7, 2.6, 10.2, 26.5, 100.4]
      }],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: 'top'
            }
          }
        },
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '12px',
            colors: ['#000']
          },
          formatter: function (val, opt) {
            return val + '%'
          },
          offsetX: -6
        },
        xaxis: {
          categories: ['10', '9', '8', '7', '6', '5', '4', '3', '2', '1']
        }
      }
    }
  }
}
</script>
