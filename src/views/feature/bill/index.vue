<template>
  <div class="table-container">
    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
      :height="height"
      @selection-change="setSelectRows"
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
        prop="customerid"
        label="用户编号"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="bookid"
        label="购买书本编号"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="bookname"
        label="购买书本名称"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="purchasetime"
        label="购买时间"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="180px">
        <template #default="{ row }">
          <el-button type="text" @click="transferBook(row)">转移</el-button>
          <el-button type="text" @click="updateBook(row)">更新</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :background="background"
      :current-page="queryForm.pageNum"
      :layout="layout"
      :page-size="queryForm.pageSize"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
    <book-transfer ref="transfer" @refreshData="freshData"></book-transfer>
    <book-update ref="update" @refreshData="freshData"></book-update>
  </div>
</template>

<script>
  import { getAllBillInfo } from '@/api/bill'
  import { parseTime } from '@/utils/index'
  import BookUpdate from './components/BookUpdate'
  import BookTransfer from './components/BookTransfer'
  export default {
    name: 'UserReview',
    components: {
      BookUpdate,
      BookTransfer,
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
        showAdd: false,
        list: [],
        listLoading: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        background: true,
        elementLoadingText: '正在加载...',
        queryForm: {
          pageNum: 1,
          pageSize: 20,
        },
        // 查询用户
        searchCustomer: '',
      }
    },
    computed: {
      height() {
        return this.$baseTableHeight()
      },
    },
    created() {
      this.fetchData()
    },
    beforeDestroy() {},
    mounted() {},
    methods: {
      setSelectRows(val) {
        this.selectRows = val
      },
      handleReview(row) {
        // 处理评论
      },
      handleSizeChange(val) {
        this.queryForm.pageSize = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val
        this.fetchData()
      },
      async fetchData() {
        this.listLoading = true
        // 根据页码查询所有的用户信息
        var data = await getAllBillInfo(this.queryForm)
        var fdata = data.data.list
        fdata.forEach((item) => {
          // 格式化日期
          item.purchasetime = parseTime(item.purchasetime)
        })

        this.list = fdata
        this.total = data.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      },
      //查询根据用户id查询用户信息
      handleQuery() {
        // 查询关键字判空
        if (!this.searchCustomer) return
      },
      // 把a账号名下的书本xxx转到b账号名下。b账号名下的书本xxx删掉
      transferBook(rowData) {
        this.$refs['transfer'].showTransfer(rowData)
      },
      // 把a账号名下的书本xxx转成yyy。充值时间在1周以内才能转。
      updateBook(rowData) {
        // 超过一周不能进行更新转书
        if (!rowData.inaweek) {
          this.$baseMessage('您购买书本已经超过一周暂时无法更新~', 'warning')
          return
        }
        // 没超过一周可以更新数据
        this.$refs['update'].showUpdate(rowData)
      },
      freshData() {
        // 刷新数据
        this.fetchData()
      },
    },
  }
</script>
