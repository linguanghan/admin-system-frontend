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
        prop="pid"
        label="用户Id"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="评论内容"
        prop="describe"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="评论时间"
        prop="time"
      >
        <template #default="{ row }">
          {{ row.time == undefined ? "-" : row.time}}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="app名称"
        prop="appName"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="180px">
        <template #default="{ row }">
          <el-button type="text" @click="handleReview(row)">评论</el-button>
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
  </div>
</template>

<script>
  import { getAllUserReviewList } from '@/api/review'
  export default {
    name: 'UserReview',
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
        this.fetchData(this.queryForm)
      },
      handleCurrentChange(val) {
        console.log(val);
        this.queryForm.pageNum = val
        this.fetchData(this.queryForm)
      },
      async fetchData(queryForm) {
        this.listLoading = true
        var data = await getAllUserReviewList(queryForm)
        this.list = data?.data?.list == undefined ? [] : data?.data?.list
        this.total = data?.data?.total == undefined ? 0 : data?.data?.total;
        this.listLoading = false
      },
    },
  }
</script>
