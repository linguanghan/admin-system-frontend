<template>
  <!-- 首页 -->
  <div class="index-container">

    <el-row :gutter="10">
      <el-col :span="20">
        <el-card shadow="never">
          <!--<div slot="header" style="display: none">-->
            <!--<span>注册人数</span>-->
          <!--</div>-->
          <div>
            <vab-chart autoresize :options="sqs" />
          </div>
          <div class="bottom">
            <span id="todayNum">
              今日总注册人数:
            </span>
            <span style="margin-left: 5px;color: blue">
            ||
            </span>
            <span id="todayActiveNum" style="margin-left: 5px;">
              今日总活跃人数:
              <!--<vab-count-->
              <!--:start-val="config2.startVal"-->
              <!--:end-val="config2.endVal"-->
              <!--:duration="config2.duration"-->
              <!--:separator="config2.separator"-->
              <!--:prefix="config2.prefix"-->
              <!--:suffix="config2.suffix"-->
              <!--:decimals="config2.decimals"-->
              <!--/>-->
            </span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import VabChart from '@/plugins/echarts'
  import { dependencies, devDependencies } from '../../../package.json'
  import { getList } from '@/api/player'
  import { getActiveList } from '@/api/player'
  import { getRegisterNum } from '@/api/player'
  import { getActiveNum } from '@/api/player'


  export default {
    name: 'Index',
    components: {
      VabChart,
    },
    data() {
      return {
        timer: 0,
        updateTime: process.env.VUE_APP_UPDATE_TIME,
        nodeEnv: process.env.NODE_ENV,
        //访问人数数
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
            data: ['注册人数', '活跃人数']
          },
          toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ['line', 'bar', 'stack'] },
              restore: { show: false },
              saveAsImage: { show: true }
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
              label: {
                backgroundColor: '#6a7985'
              }
            }
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
              type: 'bar',
              barGap: 0,
              // barWidth: '60%',
              // data: [10, 52, 20, 33, 39, 33, 22],
              data: [0],
              itemStyle: {
                normal:{
                  label:{
                    show: true,
                    position: 'top',
                    textStyle:{
                      color: 'black',
                      fontSize: 12
                    },
                  },
                },
              },
            },
            {
              name: '活跃人数',
              type: 'bar',
              // barWidth: '60%',
              // data: [10, 52, 20, 33, 39, 33, 22],
              data: [0],
              itemStyle: {
                normal:{
                  label:{
                    show: true,
                    position: 'top',
                    textStyle:{
                      color: 'red',
                      fontSize: 12
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
      this.fetchData();
      this.fetchActiveData();
      this.fetchTodayData();
      this.fetchTodayActiveData();
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
      handleClick(e) {
        this.$baseMessage(`点击了${e.name},这里可以写跳转`)
      },
      handleZrClick(e) {},
      handleChangeTheme() {
        this.$baseEventBus.$emit('theme')
      },
      async fetchData() {
        var date = new Date();
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
        var D = date.getDate() + ' '
        var h = date.getHours() + ':'
        var m = date.getMinutes() + ':'
        var s = date.getSeconds()
        var endTime = Y+M+D+h+m+s
        var startTime = endTime
        if(date.getMonth()==0){
          M = 12+'-'
          Y = date.getFullYear()-1+'-'
          startTime = Y+M+D+h+m+s
        }else {
          M = (date.getMonth() < 10 ? '0'+(date.getMonth()) : date.getMonth()) + '-'
          startTime = Y+M+D+h+m+s
        }
    const { data } = await getList(startTime,endTime)
    var dataX = [];
    var dataY = [];
    console.log(data)
    for(var i = 0; i < data.length; i++){
      dataX.push(data[i].num);
      dataY.push(data[i].timedate)
    }
    this.sqs.xAxis[0].data = dataY;
    this.sqs.series[0].data = dataX;
  },
      async fetchActiveData() {
        var date = new Date();
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
        var D = date.getDate() + ' '
        var h = date.getHours() + ':'
        var m = date.getMinutes() + ':'
        var s = date.getSeconds()
        var endTime = Y+M+D+h+m+s
        var startTime = endTime
        if(date.getMonth()==0){
          M = 12+'-'
          Y = date.getFullYear()-1+'-'
          startTime = Y+M+D+h+m+s
        }else {
          M = (date.getMonth() < 10 ? '0'+(date.getMonth()) : date.getMonth()) + '-'
          startTime = Y+M+D+h+m+s
        }
        const { data } = await getActiveList(startTime,endTime)
        var dataX = [];
        var dataY = [];
        console.log(data)
        for(var i = 0; i < data.length; i++){
          dataX.push(data[i].num);
          dataY.push(data[i].timedate)
        }
        //this.sqs.xAxis[1].data = dataY;
        this.sqs.series[1].data = dataX;
      },
  async fetchTodayData() {
    var date = new Date();
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
    var D = date.getDate() + ' '
    var h = date.getHours() + ':'
    var m = date.getMinutes() + ':'
    var s = date.getSeconds()
    var dateTime = Y+M+D+h+m+s
    const { data } = await getRegisterNum(dateTime)
    console.log(data)
    document.getElementById("todayNum").innerHTML = '今日注册人数: '+ data
  },
      async fetchTodayActiveData() {
        var date = new Date();
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
        var D = date.getDate() + ' '
        var h = date.getHours() + ':'
        var m = date.getMinutes() + ':'
        var s = date.getSeconds()
        var dateTime = Y+M+D+h+m+s
        const { data } = await getActiveNum(dateTime)
        console.log(data)
        document.getElementById("todayActiveNum").innerHTML = '今日活跃人数: '+ data
      },
  },
  }
</script>
<style lang="scss" scoped>
  .index-container {
    padding: 0 !important;
    margin: 0 !important;
    background: #f5f7f8 !important;

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
