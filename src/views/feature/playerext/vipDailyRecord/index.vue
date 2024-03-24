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
        <!-- <el-date-picker
          v-model="valueDateDate"
          type="date"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          :default-value="defaultDate">
        </el-date-picker>
        <el-button
          icon="el-icon-search"
          type="primary"
          native-type="submit"
          style="margin-left: 10px"
          @click="handleQuery"
        >
          查询
        </el-button> -->
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
      <!-- <el-table-column show-overflow-tooltip label="序号" width="95">
        <template #default="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column> -->
      <el-table-column
        show-overflow-tooltip
        label="日期"
        prop="fTime">
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        prop="num"
        label="充值人数">
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        label="充值总金额"
        prop="fund">
      </el-table-column>
      <!--<el-table-column show-overflow-tooltip label="等级">-->
      <!--<template #default="{ row }">-->
      <!--<el-tooltip-->
      <!--:content="row.status"-->
      <!--class="item"-->
      <!--effect="dark"-->
      <!--placement="top-start"-->
      <!--&gt;-->
      <!--<el-tag :type="row.status | statusFilter">-->
      <!--{{ row.status }}-->
      <!--</el-tag>-->
      <!--</el-tooltip>-->
      <!--</template>-->
      <!--</el-table-column>-->
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
  </div>
</template>

<script>
  // import { getDailyList } from '@/api/table'
  import { fetchDailyVipRechargeUserLogByPage } from '@/api/playerVipRecharge'
  var moment = require('moment');
  export default {
    name: 'ComprehensiveTable',
    components: {
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
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
        valueDateDate:moment().subtract(1, 'days').format('YYYY-MM-DD'),
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
      this.handleQuery();
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
      handleAdd() {
      },
      handleEdit(row) {
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
        console.log(this.valueDateDate);
        this.listLoading = true
        var data =  await fetchDailyVipRechargeUserLogByPage(this.queryForm.pageNo, this.queryForm.pageSize)
        var result = data?.result == undefined ? [] : data?.result; 
        this.list = result?.data == undefined ? [] : result?.data;
        var totalCount = result.total;
        this.total = totalCount
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
    },
  }
</script>
