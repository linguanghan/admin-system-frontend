<template>
  <div class="table-container">
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
        prop="logContent"
        label="埋点内容">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="创建时间"
        prop="createTime">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="渠道"
        prop="channel">
      </el-table-column>
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
  import { searchPageEventTrackLogByPage } from '@/api/eventTrackLog'
  var moment = require('moment');
  export default {
    name: 'ComprehensiveTable',
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
          pageSize: 20
        },
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
    methods: { 
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
      handleDelete(row) {
        
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
        var data =  await searchPageEventTrackLogByPage(queryForm.pageNo  , queryForm.pageSize)
        var result = data?.result == undefined ?  [] : data?.result;
        this.list = result?.data == undefined ? [] : result?.data;
        this.total = result.total
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
  },
  }
</script>
