<template>
    <el-row class="panel">
        <el-col :span="12">
            <div class="List-titleText">任务状态</div>
        </el-col>
        <el-col :span="12">
            <el-select v-model="pagination.period" style="float: right;width: 135px;padding-right: 40px" size="mini" @change="selChange">
                <el-option
                    v-for="item in options"
                    :key="item.period"
                    :label="item.label"
                        :value="item.period">
                </el-option>
            </el-select>
        </el-col>
        <el-col :span="24">
            <div id="chartLine" style="width: 100%;height: 400px"></div>
        </el-col>
    </el-row>
</template>

<script>
import echarts from 'echarts'
import axios from '../../http-common'

export default {
  name: 'line-chart',
  data () {
    return {
      chartLine: null,
      pagination: {
        period: 'month',
        job_type: 'all'
      },
      times: [],
      sucJobs: [],
      failJobs: [],
      options: [{
        period: 'month',
        label: '按月'
      }, {
        period: 'week',
        label: '按周'
      }, {
        period: 'day',
        label: '24小时'
      }]
    }
  },
  mounted () {
    this.fetchGraphs(this.pagination)
    this.Interval = setInterval(() => {
      this.fetchGraphs(this.pagination)
    }, 5000)
    this.resizeHander = setInterval(() => {
      if (this.chartLine) {
        this.chartLine.resize()
      }
    }, 50)
    window.addEventListener('resize', this.resizeHander)
  },
  beforeDestroy () {
    clearInterval(this.Interval)
    window.removeEventListener('resize', this.resizeHander)
    clearInterval(this.resizeHander)
    this.chartLine.dispose()
  },
  methods: {
    setTime () {
      setTimeout(() => {
        this.fetchGraphs(this.pagination)
        this.setTime()
      }, 5000)
    },
    selChange (val) {
      console.log(val)
      this.pagination.period = val
      this.fetchGraphs(this.pagination)
    },
    fetchGraphs (params) {
      axios.get('/api/v2/dashboard/graphs/jobs/', { params: params })
        .then((res) => {
          this.times = []
          this.sucJobs = []
          this.failJobs = []
          let sucData = res.data.jobs.successful
          let failData = res.data.jobs.failed
          for (let j = 0; j < sucData.length; j++) {
            let date = new Date(sucData[j][0] * 1000)
            this.times.push((date.getMonth() + 1) + '月' + date.getDate() + '日' + date.getHours() + '时')
            this.sucJobs.push(sucData[j][1])
          }
          for (let i = 0; i < failData.length; i++) {
            this.failJobs.push(failData[i][1])
          }
          if (this.chartLine) {
            this.chartLine.dispose()
          }
          this.drawLineChart()
        }).catch((error) => {
          console.log(error)
        })
    },

    drawLineChart () {
      this.chartLine = echarts.init(document.getElementById('chartLine'))
      this.chartLine.setOption({
        tooltip: { trigger: 'axis' },
        legend: { data: ['SUCCESSFUL', 'FAILED'] },
        grid: {
          left: '1%',
          right: '2.5%',
          bottom: '10%',
          containLabel: true
        },
        calculable: true,
        xAxis: {
          splitLine: { show: true },
          type: 'category',
          boundaryGap: false,
          data: this.times,
          name: '时间'

        },
        yAxis: {
          splitLine: { show: true },
          type: 'value',
          name: '任务'
        },
        series: [
          {
            name: 'SUCCESSFUL',
            type: 'line',
            data: this.sucJobs,
            itemStyle: {
              normal: {
                color: '#00CC33',
                lineStyle: {
                  color: '#00CC33',
                  width: 3
                }
              }
            }
          },
          {
            name: 'FAILED',
            type: 'line',
            data: this.failJobs,
            itemStyle: {
              normal: {
                color: '#CC3300',
                lineStyle: {
                  color: '#CC3300',
                  width: 3
                }
              }
            }
          }
        ]
      })
    }
  }

}
</script>

<style scoped>

</style>
