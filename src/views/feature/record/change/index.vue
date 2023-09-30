<template>
  <div class="table-container">
     <vab-query-form>
      <el-form
        ref="form"
        :model="queryForm"
        :inline="true"
        @submit.native.prevent
      >
       <el-form-item label="原始账号" prop="originPid">
          <el-input 
            v-model.trim="queryForm.originPid"
            autocomplete="off"
            placeholder="请输入原始账号"
            clearable
          />
        </el-form-item>
        <el-form-item label="目标账号" prop="targetPid">
          <el-input 
            v-model.trim="queryForm.targetPid" 
            autocomplete="off"
            placeholder="请输入目标账号"
            clearable
          />
        </el-form-item>
        <el-form-item label="转移时间">
          <el-date-picker
            v-model="queryForm.createTime"
            type="daterange"
            range-separator="至"
            start-placeholder="选择开始日期"
            end-placeholder="选择结束日期"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd">
          </el-date-picker>
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
      </el-form>
    </vab-query-form>
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
        prop="originPid"
        label="原始账号"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="目标账号"
        prop="targetPid"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="转移时间"
        prop="createTime"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="书本编号"
        prop="bookIdx"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="书本名称"
        prop="bookName"
      ></el-table-column>
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
  import { queryChangeRechargeRecord } from '@/api/record'
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
        listLoading: false,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        background: true,
        elementLoadingText: '正在加载...',
        queryForm: {
          pageNum: 1,
          pageSize: 20,
          originPid: '',
          targetPid: '',
          startTime: undefined,
          endTime: undefined
        },
      }
    },
    computed: {
      height() {
        return this.$baseTableHeight()
      },
    },
    created() {
      // this.fetchData(this.queryForm)
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
      handleQuery() {
        console.log(this.queryForm);
        if(Array.isArray(this.queryForm.createTime) && this.queryForm.createTime.length == 2) {
          this.queryForm.startTime = this.queryForm.createTime[0];
          this.queryForm.endTime = this.queryForm.createTime[1]
        }else{
          this.queryForm.startTime = undefined;
          this.queryForm.endTime = undefined;
        }
        const queryParams = {...this.queryForm};
        delete queryParams.createTime
        this.fetchData(queryParams);
      },
      async fetchData(queryForm) {
        this.listLoading = true
        try {
          const {result, success} = await queryChangeRechargeRecord(queryForm)
          this.list = result?.data == undefined ? [] : result?.data;
          this.total = result?.total == undefined ? 0 : result?.total;
        } catch (error) {
          
        }finally {
          this.listLoading = false
        }
      },
    },
  }
</script>
