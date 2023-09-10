<template>
  <div class="table-container">
      <vab-query-form>
      <el-form
        ref="form"
        :model="queryForm"
        :inline="true"
        @submit.native.prevent
      >
        <!-- <el-form-item label="购买时间">
          <el-date-picker
            v-model="queryForm.createTime"
            type="daterange"
            range-separator="至"
            start-placeholder="选择开始日期"
            end-placeholder="选择结束日期"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            :default-value="defaultDate">
          </el-date-picker>
        </el-form-item> -->
         <el-form-item label="账号" prop="orderId">
          <el-input 
            v-model.trim="queryForm.pid" 
            autocomplete="off"
            placeholder="请输入用户账号"
            clearable
          />
        </el-form-item>
        <el-form-item label="订单号" prop="orderId">
          <el-input 
            v-model.trim="queryForm.orderId" 
            autocomplete="off"
            placeholder="请输入订单号"
            clearable
          />
        </el-form-item>
        <el-form-item label="解锁状态" prop="unlock">
          <el-select
            v-model="queryForm.unlock" 
            placeholder="请选择"
            clearable
            >
            <el-option
              v-for="item in unlockOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
        </el-form-item>
        <el-button
          icon="el-icon-search"
          type="primary"
          native-type="submit"
          style="margin-left: 10px"
          @click="handleQuery"
        >
          查询
        </el-button>
         <el-button
          type="primary"
          native-type="submit"
          style="margin-left: 10px"
          @click="handleChange"
        >
        转移
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
        prop="pid"
        label="购买人账号">
      </el-table-column>
       <el-table-column
        show-overflow-tooltip
        prop="playerName"
        label="购买人名称">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="购买书本编号"
        prop="bookIdx">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="购买书本名称"
        prop="bookName">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="对应年级"
        prop="bookType"
        :formatter="bookTypeFormatter"
        >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="购买时间"
        prop="createTime">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="unlock"
        label="解锁状态">
        <template #default="{ row }">
              <span>
                {{ row.unlock == 1 ? '是' : '否' }}
              </span>
            </template>
      </el-table-column>
       <el-table-column
        show-overflow-tooltip
        prop="remainTime"
        label="使用时间（月）">
      </el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="180px">
        <template #default="{ row }">
          <el-button type="text" @click="handleLock(row, row.unlock == 1 ?  '加锁' : '解锁' )">
           {{ row.unlock == 1 ? 
              '加锁' : '解锁' 
            }}
          </el-button>
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
    <table-edit ref="edit" @fresh="fetchData(queryForm)"></table-edit>
  </div>
</template>

<script>
  import { queryRechargeByPage, updateUnlockStatus } from '@/api/queryRecharge'
  import TableEdit from './components/TableEdit'
  import {getBooktypes} from '@/assets/data/bookTypeDefine.js'
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
          createTime: [],
          orderId: '',
          unlock: '',
          pid:'',
          pageNo: 1,
          pageSize: 20
        },
        unlockOptions:[
          {
            value: 1,
            label: '是'
          },
          {
            value: 0,
            label: '否'
          }
        ]
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
      handleChange() {
        this.$refs['edit'].showEdit();
      },
      handleLock(row, operateTypeName) {
        this.$confirm(`是否进行${operateTypeName}操作`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          console.log(row?.unlock);
          console.log(row?.unlock ^ 1);
          await this.updateUnlockStatus(row.id, row?.unlock ^ 1)
          // this.listLoading = true
          this.fetchData(this.queryForm);
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
          // this.listLoading = false
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });   
          // this.listLoading = false       
        });
      },
      bookTypeFormatter(row) {
        const bookTypesMap = getBooktypes().bookTypesMap;
        return bookTypesMap.get(row.bookType) == undefined ? 0 :  bookTypesMap.get(row.bookType);
      },
      async updateUnlockStatus(id, unlockStatus) {
         const {success} = await updateUnlockStatus(id, unlockStatus);
         return success;
      },
      async fetchData(queryForm) {
         this.listLoading = true
         try {
            var data =  await queryRechargeByPage(queryForm)
            var result = data?.result == undefined ?  [] : data?.result;
            this.list = result?.data == undefined ? [] : result?.data;
            this.total = result.total
         } catch (error) {
            message.error(error.message);
         } finally{
            this.listLoading = false
         }
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
