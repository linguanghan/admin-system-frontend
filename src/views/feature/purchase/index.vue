<template>
  <div class="table-container">
    <vab-query-form>
      <!--<vab-query-form-left-panel>-->
      <!--<el-button icon="el-icon-plus" type="primary" style="visibility:hidden;">-->
      <!--添加-->
      <!--</el-button>-->
      <!--<el-button icon="el-icon-delete" type="danger" style="visibility:hidden;">-->
      <!--删除-->
      <!--</el-button>-->
      <!--<el-button type="primary" style="visibility:hidden;">baseMessage</el-button>-->
      <!--<el-button type="primary" style="visibility:hidden;">baseAlert</el-button>-->
      <!--<el-button type="primary" style="visibility:hidden;">baseConfirm</el-button>-->
      <!--<el-button type="primary" style="visibility:hidden;">baseNotify</el-button>-->
      <!--</vab-query-form-left-panel>-->
      <!--<vab-query-form-right-panel>-->
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
          :default-value="defaultDate">
        </el-date-picker>
        <!--<el-date-picker-->
        <!--v-model="valueDateStart"-->
        <!--type="date"-->
        <!--placeholder="选择开始日期"-->
        <!--format="yyyy-MM-dd"-->
        <!--value-format="yyyy-MM-dd">-->
        <!--</el-date-picker>-->
        <!--至-->
        <!--<el-date-picker-->
        <!--v-model="valueDate"-->
        <!--type="date"-->
        <!--placeholder="选择结束日期"-->
        <!--format="yyyy-MM-dd"-->
        <!--value-format="yyyy-MM-dd">-->
        <!--</el-date-picker>-->

        <el-button
          icon="el-icon-search"
          type="primary"
          native-type="submit"
          style="margin-left: 10px"
          @click="handleQuery"
        >
          查询
        </el-button>
        <!--<el-form-item>-->
        <!--<el-input v-model="queryForm.title" placeholder="标题" />-->
        <!--</el-form-item>-->
        <!--<el-form-item>-->
        <!--<el-button-->
        <!--icon="el-icon-search"-->
        <!--type="primary"-->
        <!--native-type="submit"-->
        <!--@click="handleQuery"-->
        <!--&gt;-->
        <!--查询-->
        <!--</el-button>-->
        <!--</el-form-item>-->
      </el-form>
      <!--</vab-query-form-right-panel>-->
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
        prop="channel"
        label="渠道"
        :formatter="channelFormat"
        >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="packageidx"
        label="包编号"
        :formatter="packageIdxFormat"
        >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="bookidx"
        label="书本编号">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="booktype"
        label="书本对应年级">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="period"
        label="有效期"
        :formatter="periodFormatter"
        >
      </el-table-column>
      <!--<el-table-column show-overflow-tooltip label="操作" width="180px">-->
      <!--<template #default="{ row }">-->
      <!--<el-button type="text" @click="handleEdit(row)">编辑</el-button>-->
      <!--<el-button type="text" @click="handleDelete(row)">删除</el-button>-->
      <!--</template>-->
      <!--</el-table-column>-->
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
  // import { getDailyList } from '@/api/table'
  import { getPurchaseDetailList } from '@/api/playerUnit'
  import TableEdit from './components/TableEdit'
  import {getChannels} from '@/assets/data/ChannelDefine.js'
  import {getPackagesInfo} from '@/assets/data/PackageDefine.js'
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
        channelsDefine:new Map(),
        packagesInfo:new Map(),
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
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
        valueDate: '',
        valueDateStart: '',
        valueDateDate: [moment().day(-30).format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
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
      this.channelsDefine =  getChannels();
      this.packagesInfo = getPackagesInfo();
      this.fetchData(this.queryForm)
    },
    beforeDestroy() {},
    mounted() {
      this.defaultDate = new Date();
      this.defaultDate.setMonth(new Date().getMonth()-1);
    },
    methods: {
       periodFormatter:function(row){
        return `${row['period']}个月`;
      },
      channelFormat: function(row) {
        return this.channelsDefine.get(row.channel)         
      },
       packageIdxFormat: function(row) {
        return this.packagesInfo.get(row.packageidx) 
      },
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
      handleAdd() {
        this.$refs['edit'].showEdit()
      },
      handleEdit(row) {
        this.$refs['edit'].showEdit(row)
      },
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            const { msg } = await doDelete({ ids: row.id })
            this.$baseMessage(msg, 'success')
            this.fetchData(this.queryForm)
          })
        } else {
          if (this.selectRows.length > 0) {
            const ids = this.selectRows.map((item) => item.id).join()
            this.$baseConfirm('你确定要删除选中项吗', null, async () => {
              const { msg } = await doDelete({ ids: ids })
              this.$baseMessage(msg, 'success')
              this.fetchData(this.queryForm)
            })
          } else {
            this.$baseMessage('未选中任何行', 'error')
            return false
          }
        }
      },
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
        
        // if (this.valueDate < this.valueDateStart) {
        //   alert('结束日期需大于开始日期')
        //   return
        // }
        if(this.valueDateDate == undefined) {
          this.$message.error('请选择日期')
          return;
        }
        if (this.valueDateDate[0] > this.valueDateDate[1]) {
          this.$message.error('结束日期需大于开始日期')
          return;
        }
        console.log(this.valueDateDate[0])
        console.log(this.valueDateDate[1])
        // var val = this.valueDate;
        // var valStart = this.valueDateStart;
        var val = this.valueDateDate[1];
        var valStart = this.valueDateDate[0];
        console.log(val)
        if (val == undefined || val.trim().length == 0||valStart == undefined || valStart.trim().length == 0){
          alert('请选择日期')
          return
        }
        // if (val == undefined || val.trim().length == 0){
        //   const nowDate = new Date();
        //   const date = {
        //     year: nowDate.getFullYear(),
        //     month: nowDate.getMonth() + 1,
        //     date: nowDate.getDate(),
        //   }
        //   const newmonth = date.month>10?date.month:'0'+date.month
        //   const day = date.date>10?date.date:'0'+date.date
        //   val = date.year + '-' + newmonth + '-' + day+' 23:59:59'
        // }
        valStart = valStart + ' 00:00:00'
        val = val + ' 23:59:59';
        var timedate = val;
        this.listLoading = true
        var data =  await getPurchaseDetailList(valStart,timedate, queryForm.pageNo, queryForm.pageSize)
        var result = data?.result == undefined ? [] : data.result; 
        this.list = result?.data == undefined ? [] : result.data;
        this.total = result?.total == undefined ? 0 : result.total;
        this.listLoading = false
        
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
    },
  }
</script>
