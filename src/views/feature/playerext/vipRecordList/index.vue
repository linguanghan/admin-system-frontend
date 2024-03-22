<template>
  <div class="table-container">
    <vab-query-form>
        <el-form
          ref="form"
          style="text-align: right;"
          :model="queryForm"
          :inline="true"
          @submit.native.prevent
        >
        <el-form-item>
            <el-input
              v-model.trim="queryForm.id"
              placeholder="请输入用户ID"
              clearable
            ></el-input>
          </el-form-item>

          <el-button
            icon="el-icon-search"
            type="primary"
            native-type="submit"
            style="margin-left: 10px;"
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
        prop="id"
        label="用户ID">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="绘本VIP过期时间"
        prop="huibenVipOverdueTimeStr">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="最近第一次绘本VIP购买时间"
        prop="playerExtCreateTimeTypeEntities[0].createTimeStr">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="最近第一次绘本VIP购买类型"
        prop="playerExtCreateTimeTypeEntities[0].type">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="最近第二次绘本VIP购买时间"
        prop="playerExtCreateTimeTypeEntities[1].createTimeStr">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="最近第二次绘本VIP购买类型"
        prop="playerExtCreateTimeTypeEntities[1].type">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="最近第三次绘本VIP购买时间"
        prop="playerExtCreateTimeTypeEntities[2].createTimeStr">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="最近第三次绘本VIP购买类型"
        prop="playerExtCreateTimeTypeEntities[2].type">
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
  import { queryPlayerExt } from '@/api/playerext'
  var moment = require('moment');
  export default {
    name: '',
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
        }
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
    },
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
      handleAdd() {
        this.$refs['edit'].showEdit()
      },
      handleEdit(row) {
        this.$refs['edit'].showEdit(row)
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
        var data =  await queryPlayerExt(queryForm)
        var result = data?.result == undefined ?  [] : data?.result;
        this.list = result?.data == undefined ? [] : result?.data;
        this.total = result.total
       
        this.listLoading = false
      
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
