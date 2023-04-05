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
      <!-- 列表项 -->
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
        prop="agentPid"
        label="代理Id"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="agentName"
        label="代理名称"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="userNum"
        label="用户数量"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="是否开通代理" width="180px">
        <template #default="{ row }">
          <el-switch
            v-model="row.state"
            inline-prompt
            active-text="是"
            inactive-text="否"
            @change="changeAgentState(row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="curProfit"
        label="当前利润"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="totalProfit"
        label="总利润"
      ></el-table-column>
      <el-table-column
        :formatter="timeValueFormatter"
        show-overflow-tooltip
        prop="createTime"
        label="创建日期"
      ></el-table-column>
      <!-- <el-table-column show-overflow-tooltip label="操作" width="180px">
        <template #default="{ row }">
          <el-button type="text" @click="handleEdit(row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column> -->
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
    <table-add ref="add"></table-add>
  </div>
</template>

<script>
  import { getList, doDelete } from '@/api/table'
  import TableEdit from './components/TableEdit'
  import TableAdd from './components/TableAdd'
  import { parseTime } from '@/utils/index'
  //   导入代理的接口
  import { getAgentList, updateAgentInfoState } from '@/api/agent'
  import { deleteBookinfo } from '@/api/Bookresource'
  export default {
    name: 'ComprehensiveTable',
    components: {
      TableEdit,
      TableAdd,
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
        imgShow: true,
        list: [],
        imageList: [],
        listLoading: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        background: true,
        selectRows: '',
        elementLoadingText: '正在加载...',
        queryForm: {
          pageNo: 1,
          pageSize: 20,
          keyword: '',
        },
      }
    },
    computed: {
      height() {
        return this.$baseTableHeight()
      },
    },
    created() {
      // 获取代理相关数据
      this.fetchData()
    },
    beforeDestroy() {},
    mounted() {},
    methods: {
      timeValueFormatter(row, column) {
        const time = parseTime(row.createTime)
        return time
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
        this.$refs['add'].showEdit()
      },
      handleEdit(row) {
        this.$refs['edit'].showEdit(row)
      },
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            // const { msg } = await deleteBookinfo({ ids: row.id })
            const { msg } = await deleteBookinfo(row)
            this.$baseMessage(msg, 'success')
            this.fetchData()
          })
        } else {
          if (this.selectRows.length > 0) {
            const ids = this.selectRows.map((item) => item.id).join()
            this.$baseConfirm('你确定要删除选中项吗', null, async () => {
              const { msg } = await deleteBookinfo({ ids: ids })
              this.$baseMessage(msg, 'success')
              this.fetchData()
            })
          } else {
            this.$baseMessage('未选中任何行', 'error')
            return false
          }
        }
      },
      handleSizeChange(val) {
        this.queryForm.pageSize = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val
        this.fetchData()
      },
      handleQuery() {
        this.queryForm.pageNo = 1
        this.fetchDataByBookname()
      },
      //   获取代理数据
      async fetchData() {
        this.listLoading = true
        var data = await getAgentList()
        var a = []
        a = data.data
        // 遍历数组对象 是否是代理模式
        a.forEach((item) => {
          item.state = item.state === 1 ? true : false
        })
        this.list = a
        // 列表共计的长度
        var totalCount = a.length
        this.total = totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      },
      //更改代理的开通状态
      async changeAgentState(row) {
        if (row.state) {
          row.state = 1
        } else {
          row.state = 0
        }
        console.log('row', row)
        let res = await updateAgentInfoState(row)
        if (res.data == 'success') {
          this.$baseMessage('更改代理成功', 'success')
          this.fetchData()
        } else {
          this.$baseMessage('更改代理失败', 'danger')
        }
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
