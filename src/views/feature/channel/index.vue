<template>
  <div class="table-container">
    <vab-query-form>
      <!-- 右面板查询 -->
      <vab-query-form-left-panel>
        <el-form
          ref="form"
          :model="queryForm"
          :inline="true"
          @submit.native.prevent
        >
          <el-date-picker
            v-model="valueDate"
            size="small"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
          <el-button
            icon="el-icon-search"
            type="primary"
            native-type="submit"
            style="margin-left: 10px"
            @click="handleQuery"
          >
            渠道查询
          </el-button>
        </el-form>
      </vab-query-form-left-panel>
    </vab-query-form>

    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
      :height="height"
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
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="name"
        label="名称"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="bookCount"
        label="次数"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="totalPrice"
        label="总金额"
      ></el-table-column>
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
  // 根据日期获得所有的渠道信息
  import { getChannelListByDate } from '@/api/channel'
  import TableEdit from './components/TableEdit'
  export default {
    name: 'Channel',
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
        list: [],
        listLoading: false,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        background: true,
        selectRows: '',
        elementLoadingText: '正在加载...',
        queryForm: {
          pageNo: 1,
          pageSize: 20,
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now()
          },
        },
        // 查询日期
        valueDate: [],
      }
    },
    computed: {
      height() {
        return this.$baseTableHeight()
      },
    },
    methods: {
      handleSizeChange(val) {
        this.queryForm.pageSize = val
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val
      },
      // 根据输入的日期进行渠道统计的查询
      async handleQuery() {
        const res = await getChannelListByDate(this.valueDate)
        if (res.code == 0) {
          const list = JSON.parse(JSON.stringify(res.data))
          // 映射关系
          let channelName = [
            '默认渠道',
            '华为',
            'OPPO',
            'VIVO',
            '魅族',
            '三星',
            '一加',
            '京东方',
            '苹果',
            '网页',
          ]
          // 测试数据 2019-01-01 12:12:12 2023-01-01 12:12:12
          list.forEach((item)=>{
            item['name'] = channelName[item.channel]
          })
          this.list = list;
          console.log(this.list)
          this.$baseMessage('查询渠道成功', 'success')
        }
      },
    },
  }
</script>
