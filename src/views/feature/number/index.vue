<template>
  <div class="index-container">
    <el-row :gutter="10">
      <el-col :span="20">
        <el-card shadow="never">
          <div class="block extra-spacing">
            <el-date-picker
              v-model="selectTime"
              type="daterange"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              @change="handleDateChange">
            </el-date-picker>
          </div>
          <div class="Chart">
            <vab-chart autoresize :options="sqs" />
          </div>
          <div id="todayNum"></div>
          <div id="todayActiveNum"></div>
        </el-card>
      </el-col>
    </el-row>
    
  </div>
</template>

<script>
  import VabChart from '@/plugins/echarts'
  import { getList } from '@/api/player'
  import { getActiveList } from '@/api/player'
  import { getRegisterNum } from '@/api/player'
  import { getActiveNum } from '@/api/player'
  import moment from 'moment'
  export default {
    name: 'Day',
    components: {
      VabChart
    },
    data() {
      return {
        // 首页图表类型修改
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          },{
            text: '最近一年',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
              picker.$emit('pick', [start, end]);
            }
          },{
            text: '最近两年',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365 * 2);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        selectTime:[moment().subtract(1, 'months').toDate(),moment().toDate()],
        timer: 0,
        updateTime: process.env.VUE_APP_UPDATE_TIME,
        nodeEnv: process.env.NODE_ENV,
        //访问人数数(从后端获取的数据)
        sqs: {
          color: [
            '#1890FF',
            '#36CBCB',
            '#4ECB73',
            '#FBD437',
            '#F2637B',
            '#975FE5',
          ],
          backgroundColor: 'rgba(252,252,252,0)',
          grid: {
            top: '5%',
            left: '2%',
            right: '4%',
            bottom: '0%',
            containLabel: true,
          },
          legend: {
            data: ['注册人数', '活跃人数'],
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
              label: {
                backgroundColor: '#6a7985',
              },
            },
          },
          xAxis: [
            {
              type: 'category',
              /*boundaryGap: false,*/
              // data: ['0时', '4时', '8时', '12时', '16时', '20时', '24时'],
              data: ['0时'],
              axisTick: {
                alignWithLabel: true,
              },
            },
          ],
          yAxis: [
            {
              type: 'value',
            },
          ],
          series: [
            {
              name: '注册人数',
              type: 'line',
              smooth: true,
              barGap: 0,
              // barWidth: '60%',
              // data: [10, 52, 20, 33, 39, 33, 22],
              data: [0],
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                      color: 'black',
                      fontSize: 12,
                    },
                  },
                },
              },
            },
            {
              name: '活跃人数',
              type: 'line',
              // barWidth: '60%',
              // data: [10, 52, 20, 33, 39, 33, 22],
              data: [0],
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                      color: 'red',
                      fontSize: 12,
                    },
                  },
                },
              },
            },
          ],
        },
      }
    },
    created() {
      
      this.fetchData()
      this.fetchActiveData()
      this.fetchTodayData()
      this.fetchTodayActiveData()
    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    mounted() {
      let base = +new Date(2020, 1, 1)
      let oneDay = 24 * 3600 * 1000
      let date = []

      let data = [Math.random() * 1500]
      let now = new Date(base)

      const addData = (shift) => {
        now = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/')
        date.push(now)
        data.push(this.$baseLodash.random(20000, 60000))

        if (shift) {
          date.shift()
          data.shift()
        }

        now = new Date(+new Date(now) + oneDay)
      }

      for (let i = 1; i < 6; i++) {
        addData()
      }
      addData(true)
      //   this.fwl.xAxis[0].data = date
      //   this.fwl.series[0].data = data
      //   this.timer = setInterval(() => {
      //     addData(true)
      //   this.fwl.xAxis[0].data = date
      //   this.fwl.series[0].data = data
      // }, 3000)
    },
    methods: {
      handleDateChange(value) {
      if (value) {
       console.log(this.selectTime);
       this.fetchData();
       this.fetchActiveData();
      }
    },
      handleClick(e) {
        this.$baseMessage(`点击了${e.name},这里可以写跳转`)
      },
      handleZrClick(e) {},
      handleChangeTheme() {
        this.$baseEventBus.$emit('theme')
      },
      async fetchData() {
        const { startTime, endTime } = this.getBetweenTimeByTimeSpan(
          this.defaultTime
        )
        const { data } = await getList(startTime, endTime)
        var dataX = []
        var dataY = []
        // registerNum
        console.log(data)
        for (var i = 0; i < data.length; i++) {
          dataX.push(data[i].num)
          dataY.push(data[i].timedate)
        }
        this.sqs.xAxis[0].data = dataY
        this.sqs.series[0].data = dataX
      },
      async fetchActiveData() {
        const { startTime, endTime } = this.getBetweenTimeByTimeSpan(
          this.defaultTime
        )
        const { data } = await getActiveList(startTime, endTime)
        var dataX = []
        var dataY = []
        // activeNum
        // console.log(data)
        for (var i = 0; i < data.length; i++) {
          dataX.push(data[i].num)
          dataY.push(data[i].timedate)
        }
        //this.sqs.xAxis[1].data = dataY;
        this.sqs.series[1].data = dataX
      },
      // 获取昨日注册人数
      async fetchTodayData() {
        let timeFormat = 'YYYY-MM-DD HH:mm:ss'
        let dateTime = moment().subtract(1, 'days').format(timeFormat)
        const { data } = await getRegisterNum(dateTime)
        document.getElementById('todayNum').innerHTML = '昨日注册人数: ' + data
      },
      // 获取昨日活跃人数
      async fetchTodayActiveData() {
        let timeFormat = 'YYYY-MM-DD HH:mm:ss'
        let dateTime = moment()
          .subtract(1, 'days')
          .startOf('days')
          .format(timeFormat)
        const { data } = await getActiveNum(dateTime)
        document.getElementById('todayActiveNum').innerHTML =
          '昨日活跃人数: ' + data
      },
      getBetweenTimeByTimeSpan(timeline) {
        let timeFormat = 'YYYY-MM-DD HH:mm:ss'
        let startTime = moment(this.selectTime[0]).format(timeFormat)
        let endTime = moment(this.selectTime[1]).format(timeFormat)
        return{startTime, endTime}
      },
    },
  }
</script>
<style lang="scss" scoped>
  .index-container {
    padding: 0 !important;
    margin: 0 !important;
    background: #f5f7f8 !important;

    .el-col {
      width: 100%;
    }

    ::v-deep {
      .el-alert {
        padding: $base-padding;

        &--info.is-light {
          min-height: 82px;
          padding: $base-padding;
          margin-bottom: 15px;
          color: #909399;
          background-color: $base-color-white;
          border: 1px solid #ebeef5;
        }
      }

      .el-card__body {
        .echarts {
          width: 100%;
          height: 320px;
        }
      }
    }

    .card {
      ::v-deep {
        .el-card__body {
          .echarts {
            width: 100%;
            /*height: 405px;*/
            height: 80%;
          }
        }
      }
    }
    
    .extra-spacing {
      margin-bottom: 20px; /* 或者你想要的任何值 */
    }

    .bottom {
      padding-top: 20px;
      margin-top: 5px;
      color: #595959;
      text-align: left;
      border-top: 1px solid $base-border-color;
    }

    .table {

      width: 100%;
      color: #666;
      border-collapse: collapse;
      background-color: #fff;

      td {
        position: relative;
        min-height: 10px;
        padding: 9px 10px;
        font-size: 14px;
        line-height: 20px;
        border: 1px solid #e6e6e6;

        &:nth-child(odd) {
          width: 20%;
          text-align: right;
          background-color: #f7f7f7;
        }
      }
    }

    .icon-panel {
      height: 117px;
      text-align: center;
      cursor: pointer;

      svg {
        font-size: 40px;
      }

      p {
        margin-top: 10px;
      }
    }

    .bottom-btn {
      button {
        margin: 5px 10px 15px 0;
      }
    }

    
  }
</style>
