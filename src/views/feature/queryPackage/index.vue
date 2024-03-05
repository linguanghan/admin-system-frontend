<template>
  <div class="table-container">
    <vab-query-form>
      <el-form
        ref="form"
        :model="queryForm"
        :inline="true"
        @submit.native.prevent
      >
        <el-date-picker
      v-model="valueDateDate"
      type="daterange"
      range-separator="至"
      start-placeholder="选择开始日期"
      end-placeholder="选择结束日期"
      value-format="yyyy-MM-dd"
      format="yyyy-MM-dd"
      :default-value="defaultDate"
    ></el-date-picker>
    <el-select v-model="timeRange" placeholder="选择时间范围" style="margin-left: 10px">
      <el-option label="按日" value="day"></el-option>
      <el-option label="按周" value="week"></el-option>
      <el-option label="按月" value="month"></el-option>
    </el-select>
    <el-input
      v-model="packageIdx"
      placeholder="请输入包编号"
      style="width: 350px; margin-right: 10px; margin-left: 10px;"
    ></el-input>
    <el-button
      icon="el-icon-search"
      type="primary"
      native-type="submit"
      style="margin-left: 10px"
      @click="handleQuery"
    >
      查询
    </el-button>
      </el-form>
    </vab-query-form>

    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
      :height="height"
      @selection-change="setSelectRows"
      @sort-change="tableSortChange"
    >
      <el-table-column
        show-overflow-tooltip
        type="selection"
        width="55"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="序号" width="95">
        <template #default="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="日期"
        prop="timedate"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="充值数量"
        prop="num"
      ></el-table-column>
    </el-table>
    <el-pagination
      :background="background"
      :current-page="queryForm.pageNo"
      :layout="layout"
      :page-size="queryForm.pageSize"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
    <table-edit ref="edit"></table-edit>
  </div>
</template>

<script>
  import { getPackageRechargeData } from '@/api/queryPackage'
  import TableEdit from './components/TableEdit'
  var moment = require('moment');
  export default {
    name: 'ComprehensiveTable',
    components: {
      TableEdit,
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger',
        }
        return statusMap[status]
      },
    },
    data() {
      return {
        imgShow: true,
        list: [],
        imageList: [],
        listLoading: false,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        background: true,
        selectRows: '',
        elementLoadingText: '正在加载...',
        queryForm: {
          pageNo: 1,
          pageSize: 20,
          title: '',
        },
        timeRange: 'day',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
        valueDateDate: [moment().day(-30).format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
        packageIdx: '',
        time: {
          starttime: '',
          endtime: ''
        },
        defaultDate :'',
      }
    },
    computed: {
      height() {
        return this.$baseTableHeight()
      },
    },
    created() {
      this.fetchData(this.queryForm)
    },
    beforeDestroy() {},
    mounted() {
      this.defaultDate =  moment().subtract(1, 'days').format('YYYY-MM-DD');
    },
    methods: {
      dateFormatter:function(row){
        var date = new Date(row['lastlogin']*1000) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
        var D = date.getDate() + ' '
        var h = date.getHours() + ':'
        var m = date.getMinutes() + ':'
        var s = date.getSeconds()
        return Y+M+D+h+m+s
      },
      timestampToTime(row, column) {
        var date = new Date(row['createtime']); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + "-";
        var M =
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-";
        var D = date.getDate() + " ";
        var h = date.getHours() + ":";
        var m = date.getMinutes() + ":";
        var s = date.getSeconds();
        return Y + M + D + h + m + s;
      },
      tableSortChange() {
        const imageList = []
        this.$refs.tableSort.tableData.forEach((item, index) => {
          imageList.push(item.img)
        })
        this.imageList = imageList
      },
      setSelectRows(val) {
        this.selectRows = val
      },
      // handleAdd() {
      //   this.$refs['edit'].showEdit()
      // },
      // handleEdit(row) {
      //   this.$refs['edit'].showEdit(row)
      // },
      // handleDelete(row) {
      //   if (row.id) {
      //     this.$baseConfirm('你确定要删除当前项吗', null, async () => {
      //       const { msg } = await doDelete({ ids: row.id })
      //       this.$baseMessage(msg, 'success')
      //       this.fetchData(this.queryForm)
      //     })
      //   } else {
      //     if (this.selectRows.length > 0) {
      //       const ids = this.selectRows.map((item) => item.id).join()
      //       this.$baseConfirm('你确定要删除选中项吗', null, async () => {
      //         const { msg } = await doDelete({ ids: ids })
      //         this.$baseMessage(msg, 'success')
      //         this.fetchData(this.queryForm)
      //       })
      //     } else {
      //       this.$baseMessage('未选中任何行', 'error')
      //       return false
      //     }
      // }
      // },
      handleSizeChange(val) {
        this.queryForm.pageSize = val
        this.fetchData(this.queryForm)
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val
        this.fetchData(this.queryForm)
      },
      handleQuery() {
        this.queryForm.pageNo = 1
        this.fetchData(this.queryForm)
      },
      async fetchData(queryForm) {
        // 日期范围选择组件处理
        if(this.valueDateDate == undefined ) {
          this.$message.error('请选择日期');
          return;
        }
        if (this.valueDateDate[0] > this.valueDateDate[1]) {
          this.$message.error('结束日期需大于开始日期')
          return
        }
        var val = this.valueDateDate[1];
        var valStart = this.valueDateDate[0];
        if (val == undefined || val.trim().length == 0||valStart == undefined || valStart.trim().length == 0){
          this.$message.error('请选择日期')
          return
        }
        var valStart = this.valueDateDate[0] + ' 00:00:00';
        var valEnd = this.valueDateDate[1] + ' 23:59:59';
        var timedate = valEnd;
        var data = undefined;

        // 当选择按周显示时，处理数据
        if (this.timeRange === 'week') {
          const data = await getPackageRechargeData(this.packageIdx, valStart, valEnd, 1, this.queryForm.pageSize * 7); // 获取一周的数据
          const weeklyData = this.groupDataByWeek(data.data); 
          console.log('weeklyData')
          console.log(weeklyData);
          this.list = weeklyData;
        }
        // 当选择按月显示时，处理数据
        else if (this.timeRange === 'month') {
          const data = await getPackageRechargeData(this.packageIdx, valStart, valEnd, 1, this.queryForm.pageSize * 30); // 获取30天的数据
          console.log('monthlyData')
          console.log(data);
          const monthlyData = this.groupDataByMonth(data.data); 
          this.list = monthlyData;
        }
        // 当选择按日显示时，处理数据
        else {
          const data = await getPackageRechargeData(this.packageIdx, valStart, valEnd, this.queryForm.pageNo, this.queryForm.pageSize);
          this.list = data.data;
        }
        
        this.listLoading = true

        setTimeout(() => {
          this.listLoading = false
        }, 500)
      },
      async fetchDailyData() {
        this.listLoading = true
        const { data, totalCount } = await getList(this.queryForm)
        this.list = data
        const imageList = []
        data.forEach((item, index) => {
          imageList.push(item.img)
        })
        this.imageList = imageList
        this.total = totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      },
      testMessage() {
        this.$baseMessage('test1', 'success')
      },
      testALert() {
        this.$baseAlert('11')
        this.$baseAlert('11', '自定义标题', () => {
          /* 可以写回调; */
        })
        this.$baseAlert('11', null, () => {
          /* 可以写回调; */
        })
      },
      testConfirm() {
        this.$baseConfirm(
          '你确定要执行该操作?',
          null,
          () => {
            /* 可以写回调; */
          },
          () => {
            /* 可以写回调; */
          }
        )
      },
      testNotify() {
        this.$baseNotify('测试消息提示', 'test', 'success', 'bottom-right')
      },
      // 自定义函数，按周分组求和
      groupDataByWeek(data) {
        const groupedData = [];
        let weekData = [];
        data.forEach((item, index) => {
          weekData.push(item);
          if ((index + 1) % 7 === 0 || index === data.length - 1) {
            const sum = weekData.reduce((acc, curr) => acc + curr.num, 0);
            const firstDay = moment(weekData[0].timedate).format('YYYY-MM-DD');
            groupedData.push({ timedate: firstDay, num: sum });
            weekData = [];
          }
        });
        return groupedData;
      },
      
      // 自定义函数，按月分组求和
      groupDataByMonth(data) {
        const groupedData = [];
        let monthData = [];
        data.forEach((item, index) => {
          monthData.push(item);
          if (index > 0 && moment(item.timedate).month() !== moment(data[index - 1].timedate).month()) {
            const sum = monthData.reduce((acc, curr) => acc + curr.num, 0);
            const monthFirstDay = moment(monthData[0].timedate).format('YYYY-MM');
            groupedData.push({ timedate: monthFirstDay, num: sum });
            monthData = [item];
          }
        });
        return groupedData;
      },
    },
  }
</script>
