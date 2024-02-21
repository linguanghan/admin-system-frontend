<template>
  <div class="queryPackage-container">
    <el-row :gutter="10">
      <el-col :span="20">
        <el-card shadow="never">
          <!-- 操作头 -->
          <div class="header-wrapper">
            <div class="select-wrapper">
              <el-select
                v-model="defaultTime"
                placeholder="请选择时间显示方式"
                style="width: 150px; margin-right: 10px"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div class="input-wrapper">
              <el-input
                v-model="packageIdx"
                placeholder="请输入包编号"
                style="width: 150px; margin-right: 10px"
              ></el-input>
            </div>
            <div class="button-wrapper">
              <el-button type="primary" @click="handleQuery">查询</el-button>
            </div>
          </div>

          <!-- 图表 -->
          <div>
            <vab-chart autoresize :options="sqs" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import VabChart from '@/plugins/echarts'
  import { getPackageRechargeData } from '@/api/queryPackage'
  import moment from 'moment'

  export default {
    name: 'QueryPackage',
    components: {
      VabChart,
    },
    data() {
      return {
        options: [
          {
            value: '1',
            label: '按日',
          },
          {
            value: '2',
            label: '按周',
          },
          {
            value: '3',
            label: '按月',
          },
        ],
        defaultTime: '1',
        packageIdx: '',
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
            data: ['充值数量'],
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
              saveAsImage: { show: true },
            },
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
              name: '充值数量',
              type: 'bar',
              barGap: 0,
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
          ],
        },
      }
    },
    methods: {
      async fetchData() {
        const { startTime, endTime } = this.getBetweenTimeByTimeSpan(
          this.defaultTime
        )
        const { data } = await getPackageRechargeData(
          this.packageIdx,
          startTime,
          endTime
        )

        const date = []
        const rechargeData = []

        for (const entry of data) {
          date.push(entry.timedate)
          rechargeData.push(entry.rechargeAmount)
        }

        this.sqs.xAxis[0].data = date
        this.sqs.series[0].data = rechargeData
      },

      getBetweenTimeByTimeSpan(type) {
        let timeFormat = 'YYYY-MM-DD HH:mm:ss'
        let startTime = moment().format(timeFormat)
        let endTime = moment().subtract(1, 'days').format(timeFormat)

        if (type === '1') {
          startTime = moment()
            .subtract(50, 'days')
            .startOf('days')
            .format(timeFormat)
        } else if (type === '2') {
          startTime = moment()
            .subtract(7, 'weeks')
            .startOf('days')
            .format(timeFormat)
        } else if (type === '3') {
          startTime = moment()
            .subtract(12, 'months')
            .startOf('days')
            .format(timeFormat)
        }

        return { startTime, endTime }
      },

      handleQuery() {
        const selectedTime = this.defaultTime
        const packageIdx = this.packageIdx
        this.fetchData()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .queryPackage-container {
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

  .header-wrapper {
    display: flex;
    align-items: center;
  }
  .select-wrapper,
  .input-wrapper,
  .button-wrapper {
    margin-right: 10px;
  }
</style>
