<template>
    <div class="table-container">
      <vab-query-form>
        <vab-query-form-left-panel>
          <el-button icon="el-icon-plus" type="primary" @click="handleAdd">
            添加
          </el-button>
          <!--<el-button icon="el-icon-delete" type="danger" @click="handleDelete">-->
          <!--删除-->
          <!--</el-button>-->
          <!--<el-button type="primary" @click="testMessage">baseMessage</el-button>-->
          <!--<el-button type="primary" @click="testALert">baseAlert</el-button>-->
          <!--<el-button type="primary" @click="testConfirm">baseConfirm</el-button>-->
          <!--<el-button type="primary" @click="testNotify">baseNotify</el-button>-->
        </vab-query-form-left-panel>
        <vab-query-form-right-panel>
          <el-form
            ref="form"
            :model="queryForm"
            :inline="true"
            @submit.native.prevent
          >
            <el-form-item>
              <el-input
                v-model.trim="queryForm.keyword"
                placeholder="请输入应用编号/应用名称"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                icon="el-icon-search"
                type="primary"
                native-type="submit"
                @click="handleQuery"
              >
                查询
              </el-button>
            </el-form-item>
          </el-form>
        </vab-query-form-right-panel>
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
          prop="packageIdx"
          label="包编号"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="appName"
          label="应用名"
        ></el-table-column>
        <el-table-column
          :formatter="releaseValueFormatter"
          show-overflow-tooltip
          label="备案号"
          prop="registrationNum"
        ></el-table-column>
        <el-table-column
          :formatter="videoValueFormatter"
          show-overflow-tooltip
          label="公司名"
          prop="companyName"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="packagePara"
          label="包参数"
        ></el-table-column>
  
        <el-table-column show-overflow-tooltip label="操作" width="180px">
          <template #default="{ row }">
            <el-button type="text" @click="handleEdit(row)">编辑</el-button>
            <el-button type="text" @click="handleDelete(row)">删除</el-button>
          </template>
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
      <table-edit ref="edit"></table-edit>
      <table-add ref="add"></table-add>
    </div>
  </template>
  
  <script>
    import { getList, doDelete } from '@/api/table'
    import TableEdit from './components/TableEdit'
    import TableAdd from './components/TableAdd'
    import { getAppDetailList} from '@/api/appresource'
    import {
      getAppDetailListById,
    } from '@/api/appresource'
    import { deleteAppinfo} from '@/api/appresource'
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
        this.fetchData(this.queryForm)
      },
      beforeDestroy() {},
      mounted() {},
      methods: {
        releaseValueFormatter(row, column) {
          if (row.release == 1) {
            return '是'
          } else {
            return '否'
          }
        },
        videoValueFormatter(row, column) {
          if (row.video == 1) {
            return '是'
          } else {
            return '否'
          }
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
              const { data } = await deleteAppinfo(row)
              this.$baseMessage(data, 'success')
              this.fetchData(this.queryForm)
            })
          } else {
            if (this.selectRows.length > 0) {
              const ids = this.selectRows.map((item) => item.id).join()
              this.$baseConfirm('你确定要删除选中项吗', null, async () => {
                const { data } = await deleteAppinfo({ ids: ids })
                this.$baseMessage(data, 'success')
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
        dataFormat(queryForm) {
          let queryFormTemp = {...queryForm};
          if( isNaN(queryFormTemp.keyword)) {
            queryFormTemp["appName"] = queryForm.keyword;
          }else{
            queryFormTemp["packageIdx"] = queryForm.keyword;
          }
          delete queryFormTemp["keyword"]
          return queryFormTemp;
        },
        async fetchData(queryForm) {
          let queryFormTemp = this.dataFormat(queryForm)
          this.listLoading = true
          var data = await getAppDetailList(queryFormTemp);
          console.log(data);
          var result = data?.result == undefined ? [] : data?.result;
          this.list = result?.data == undefined ? [] : result.data;
          console.log(this.list);
          this.total = result?.total == undefined ? 0 : result.total;
          this.listLoading = false
        },
        async fetchDataByAppname() {
          this.listLoading = true
          let data = await getAppDetailListById(this.queryForm.keyword)
          var a = []
          a = data.data
          this.list = a
          var totalCount = a.length
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