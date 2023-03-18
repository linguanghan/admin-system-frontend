<template>
  <div style="padding:20px">
    <el-table
      ref="refTable"
      :data="tableData" style="width: 100%" height="400" border
      :header-cell-style="{ background: '#F2F2F2', color: '#333' }"
      :row-class-name="tableRowClassName"
      :cell-style="cellStyle"
      @row-click="handleRowClick"
      @selection-change="handleSelectionChange"
      @cell-mouse-enter="hoverCall"
    >
      <!--<el-table-column type="selection" width="55" fixed="left" />-->
      <el-table-column prop="date"  label="日期"  min-width="110" show-overflow-tooltip/>
      <el-table-column prop="name" label="姓名" min-width="280" show-overflow-tooltip/>
      <el-table-column prop="address" label="地址" min-width="480" show-overflow-tooltip/>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button  type="primary" size="small" @click="handleClick(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-05',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },{
          date: '2016-05-09',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        tableSelect:[],//表格选中列表
      }
    },
    methods:{
      handleClick(row){},
      handleSelectionChange(val){//多选
        this.tableSelect = val;
      },
      hoverCall: function(row, column, cell, event) {//滑动选中
        if (event.which == 1) {
          this.$refs.refTable.toggleRowSelection(row);
        }
      },
      handleRowClick(row, column, event) {//点击行触发，选中或不选中复选框
        this.$refs.refTable.toggleRowSelection(row);
      },
      tableRowClassName({ row, rowIndex }) {//改变某行的背景色
        if (row.date == "2016-05-04" ) {
          return "freeze";
        }
      },
      cellStyle({row, column, rowIndex, columnIndex}){
        if(columnIndex === 1 && row.date=='2016-05-03'){// 改变某单元格的背景色及文字颜色
          return 'background:pink;color:green !important'
        }else if(columnIndex === 1 && row.date=='2016-05-05'){ // 改变某单元格文字颜色
          return 'color:blue !important'
        } else if(columnIndex === 2 ){//指定列号  改变某列的背景色
          return 'background:#a6a6a6'
        }
        else{
          return ''
        }
      }
    }
  }
</script>
<style>
  /* 修改表格默认高度  */
  .el-table th,
  .el-table td {
    padding: 0 !important;
    height: 40px !important;
    line-height: 40px !important;
  }

  .el-table th {
    padding: 3px 0px !important;
  }

  .el-table__header tr,
  .el-table__header th {
    padding: 0 !important;
    height: 40px !important;
    line-height: 40px !important;
  }

  .el-table__body tr,
  .el-table__body td {
    padding: 0 !important;
    height: 40px !important;
    line-height: 40px !important;
  }

  /* 改变表格整行的背景色 */
  .el-table .freeze {
    background: #F5A623;
  }

</style>
