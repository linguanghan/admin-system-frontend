<template>
  <div class="index-container">
    <el-row :gutter="20">
      <!--<el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">-->
      <!--<el-card shadow="never">-->
      <!--<div slot="header">-->
      <!--<span>访问量</span>-->
      <!--</div>-->
      <!--<vab-chart autoresize :options="fwl" />-->
      <!--<div class="bottom">-->
      <!--<span>-->
      <!--日均访问量:-->

      <!--<vab-count-->
      <!--:start-val="config1.startVal"-->
      <!--:end-val="config1.endVal"-->
      <!--:duration="config1.duration"-->
      <!--:separator="config1.separator"-->
      <!--:prefix="config1.prefix"-->
      <!--:suffix="config1.suffix"-->
      <!--:decimals="config1.decimals"-->
      <!--/>-->
      <!--</span>-->
      <!--</div>-->
      <!--</el-card>-->
      <!--</el-col>-->
      <el-col :span="20">
        <el-card shadow="never">
          <div slot="header">
            <span>注册人数</span>
          </div>
          <vab-chart autoresize :options="sqs" />
          <div class="bottom">
            <span id="todayNum">
              今日总注册人数:
              <vab-count
                :start-val="config2.startVal"
                :end-val="config2.endVal"
                :duration="config2.duration"
                :separator="config2.separator"
                :prefix="config2.prefix"
                :suffix="config2.suffix"
                :decimals="config2.decimals"
              />
            </span>
          </div>
        </el-card>
      </el-col>

      <el-col
        v-for="(item, index) in iconList"
        :key="index"
        :xs="12"
        :sm="6"
        :md="3"
        :lg="3"
        :xl="3"
      >
        <router-link :to="item.link" target="_blank">
          <el-card class="icon-panel" shadow="never">
            <vab-icon
              :style="{ color: item.color }"
              :icon="['fas', item.icon]"
            ></vab-icon>
            <p>{{ item.title }}</p>
          </el-card>
        </router-link>
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
  import { getNoticeList } from '@/api/notice'
  import Plan from './components/Plan'
  import VersionInformation from './components/VersionInformation'

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
        config1: {
          startVal: 0,
          endVal: this.$baseLodash.random(20000, 60000),
          decimals: 0,
          prefix: '',
          suffix: '',
          separator: ',',
          duration: 8000,
        },
        config2: {
          startVal: 0,
          endVal: this.$baseLodash.random(1000, 20000),
          decimals: 0,
          prefix: '',
          suffix: '',
          separator: ',',
          duration: 8000,
        },
        config3: {
          startVal: 0,
          endVal: this.$baseLodash.random(1000, 20000),
          decimals: 0,
          prefix: '',
          suffix: '',
          separator: ',',
          duration: 8000,
        },

        //访问量
        fwl: {
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
            top: '4%',
            left: '2%',
            right: '4%',
            bottom: '0%',
            containLabel: true,
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: [],
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
              name: '访问量',
              type: 'line',
              data: [],
              smooth: true,
              areaStyle: {},
            },
          ],
        },
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
            top: '4%',
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
        //词云
        cy: {
          grid: {
            top: '4%',
            left: '2%',
            right: '4%',
            bottom: '0%',
          },
          series: [
            {
              type: 'wordCloud',
              gridSize: 15,
              sizeRange: [12, 40],
              rotationRange: [0, 0],
              width: '100%',
              height: '100%',
              textStyle: {
                normal: {
                  color() {
                    const arr = [
                      '#5470c6',
                      '#91cc75',
                      '#fac858',
                      '#ee6666',
                      '#73c0de',
                      '#975FE5',
                    ]
                    let index = Math.floor(Math.random() * arr.length)
                    return arr[index]
                  },
                },
              },
              data: [
                {
                  name: 'vue-admin-better',
                  value: 15000,
                },
                {
                  name: 'element',
                  value: 10081,
                },
                {
                  name: 'beautiful',
                  value: 9386,
                },

                {
                  name: 'vue',
                  value: 6500,
                },
                {
                  name: 'chuzhixin',
                  value: 6000,
                },
                {
                  name: 'good',
                  value: 4500,
                },
                {
                  name: 'success',
                  value: 3800,
                },
                {
                  name: 'never',
                  value: 3000,
                },
                {
                  name: 'boy',
                  value: 2500,
                },
                {
                  name: 'girl',
                  value: 2300,
                },
                {
                  name: 'github',
                  value: 2000,
                },
                {
                  name: 'hbuilder',
                  value: 1900,
                },
                {
                  name: 'dcloud',
                  value: 1800,
                },
                {
                  name: 'china',
                  value: 1700,
                },
                {
                  name: '1204505056',
                  value: 1600,
                },
                {
                  name: '972435319',
                  value: 1500,
                },
                {
                  name: 'young',
                  value: 1200,
                },
                {
                  name: 'old',
                  value: 1100,
                },
                {
                  name: 'vuex',
                  value: 900,
                },
                {
                  name: 'router',
                  value: 800,
                },
                {
                  name: 'money',
                  value: 700,
                },
                {
                  name: 'qingdao',
                  value: 800,
                },
                {
                  name: 'yantai',
                  value: 9000,
                },
                {
                  name: 'author is very cool',
                  value: 9200,
                },
              ],
            },
          ],
        },

        //更新日志
        // reverse: true,
        // activities: [],
        // noticeList: [],
        // //其他信息
        // userAgent: navigator.userAgent,
        // //卡片图标
        // iconList: [
        //   {
        //     icon: 'video',
        //     title: '视频播放器',
        //     link: '/vab/player',
        //     color: '#ffc069',
        //   },
        //   {
        //     icon: 'table',
        //     title: '表格',
        //     link: '/vab/table/comprehensiveTable',
        //     color: '#5cdbd3',
        //   },
        //   {
        //     icon: 'laptop-code',
        //     title: '源码',
        //     link: 'https://github.com/chuzhixin/vue-admin-better',
        //     color: '#b37feb',
        //   },
        //   {
        //     icon: 'book',
        //     title: '书籍',
        //     link: '',
        //     color: '#69c0ff',
        //   },
        //   {
        //     icon: 'bullhorn',
        //     title: '公告',
        //     link: '',
        //     color: '#ff85c0',
        //   },
        //   {
        //     icon: 'gift',
        //     title: '礼物',
        //     link: '',
        //     color: '#ffd666',
        //   },
        //
        //   {
        //     icon: 'balance-scale-left',
        //     title: '公平的世界',
        //     link: '',
        //     color: '#ff9c6e',
        //   },
        //   {
        //     icon: 'coffee',
        //     title: '休息一下',
        //     link: '',
        //     color: '#95de64',
        //   },
        // ],
      }
    },
    created() {
      this.fetchData();
      this.fetchActiveData();
      this.fetchTodayData();
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
      this.fwl.xAxis[0].data = date
      this.fwl.series[0].data = data
      this.timer = setInterval(() => {
        addData(true)
      this.fwl.xAxis[0].data = date
      this.fwl.series[0].data = data
    }, 3000)
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
    // for (var obj of res){
    //   dataX.push(obj.num);
    //   dataY.push(obj.timedate)
    // }
    this.sqs.xAxis[0].data = dataY;
    this.sqs.series[0].data = dataX;

    /* getRepos({
    token: "1061286824f978ea3cf98b7b8ea26fe27ba7cea1",
  }).then((res) => {
    const per_page = Math.ceil(res.data.stargazers_count / 100);
    alert(per_page);
    getStargazers({
      token: "1061286824f978ea3cf98b7b8ea26fe27ba7cea1",
      page: 1,
      per_page: res.per_page,
    }).then((res) => {
      alert(JSON.stringify(res));
    });
  }); */
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
        // for (var obj of res){
        //   dataX.push(obj.num);
        //   dataY.push(obj.timedate)
        // }
        //this.sqs.xAxis[1].data = dataY;
        this.sqs.series[1].data = dataX;

        /* getRepos({
        token: "1061286824f978ea3cf98b7b8ea26fe27ba7cea1",
      }).then((res) => {
        const per_page = Math.ceil(res.data.stargazers_count / 100);
        alert(per_page);
        getStargazers({
          token: "1061286824f978ea3cf98b7b8ea26fe27ba7cea1",
          page: 1,
          per_page: res.per_page,
        }).then((res) => {
          alert(JSON.stringify(res));
        });
      }); */
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
          height: 300px;
        }
      }
    }

    .card {
      ::v-deep {
        .el-card__body {
          .echarts {
            width: 100%;
            height: 405px;
            /*height: 80%;*/
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
        min-height: 20px;
        padding: 9px 15px;
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
