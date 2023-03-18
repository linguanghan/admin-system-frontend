<template>
  <div class="table-container">
    <vab-query-form>
      <!--<vab-query-form-left-panel>-->
      <!--<el-button icon="el-icon-plus" type="primary" style="visibility:hidden;">-->
      <!--添加-->
      <!--</el-button>-->
      <!--<el-button icon="el-icon-delete" type="danger" style="visibility:hidden;">-->
      <!--删除-->
      <!--</el-button>-->
      <!--<el-button type="primary" style="visibility:hidden;">baseMessage</el-button>-->
      <!--<el-button type="primary" style="visibility:hidden;">baseAlert</el-button>-->
      <!--<el-button type="primary" style="visibility:hidden;">baseConfirm</el-button>-->
      <!--<el-button type="primary" style="visibility:hidden;">baseNotify</el-button>-->
      <!--</vab-query-form-left-panel>-->
      <!--<vab-query-form-right-panel>-->
      <el-form
        ref="form"
        :model="queryForm"
        :inline="true"
        @submit.native.prevent
      >
        <!--<el-date-picker-->
          <!--v-model="valueDateDate"-->
          <!--type="daterange"-->
          <!--range-separator="至"-->
          <!--start-placeholder="选择开始日期"-->
          <!--end-placeholder="选择结束日期"-->
          <!--value-format="yyyy-MM-dd"-->
          <!--format="yyyy-MM-dd"-->
          <!--:default-value="defaultDate">-->
        <!--</el-date-picker>-->
        <!--<el-input-->
          <!--v-model="form.renew_amount"-->
          <!--maxlength="20"-->
          <!--placeholder="请输入书本名称"-->
          <!--rows="15"-->
          <!--type="textarea"-->
        <!--&gt;</el-input>-->
        <el-form-item>
          <el-input
            v-model.trim="form.bookname"
            placeholder="请输入书本名称"
            clearble>
          </el-input>
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
        <!--<el-form-item>-->
        <!--<el-input v-model="queryForm.title" placeholder="标题" />-->
        <!--</el-form-item>-->
        <!--<el-form-item>-->
        <!--<el-button-->
        <!--icon="el-icon-search"-->
        <!--type="primary"-->
        <!--native-type="submit"-->
        <!--@click="handleQuery"-->
        <!--&gt;-->
        <!--查询-->
        <!--</el-button>-->
        <!--</el-form-item>-->
      </el-form>
      <!--</vab-query-form-right-panel>-->
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
        prop="bookId"
        label="书本编号">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="name"
        label="名称">
      </el-table-column>
      <el-table-column
        :formatter="releaseValueFormatter"
        show-overflow-tooltip
        label="发布"
        prop="release">
      </el-table-column>
      <el-table-column
        :formatter="videoValueFormatter"
        show-overflow-tooltip
        label="视频"
        prop="video">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="version"
        label="版本">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="modifyConfig(scope.row, scope.$index, false)"
          >
            {{scope.row.isEdit ? "保存" : "修改"}}
          </el-button>
          <el-button
            v-if="!scope.row.isEdit"
            type="text"
            @click="deleteConfig(scope.row, scope.$index)"
          >
            删除
          </el-button>
          <el-button
            v-else
            type="text"
            @click="modifyConfig(scope.row, scope.$index, true)"
          >
            取消
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
    <table-edit ref="edit"></table-edit>
  </div>
</template>

<script>
  // import { getDailyList } from '@/api/table'
  import {getBookDetailList} from '@/api/Bookresource'
  import {getBookDetailListByName} from '@/api/Bookresource'
  import TableEdit from './components/TableEdit'

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
        form: {
          bookname: '',
        },
        queryForm: {
          pageNo: 1,
          pageSize: 20,
          title: '',
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
        valueDate: '',
        valueDateStart: '',
        valueDateDate: [],
        time: {
          starttime: '',
          endtime: ''
        },
        defaultDate :'',
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
    mounted() {
      this.defaultDate = new Date();
      this.defaultDate.setMonth(new Date().getMonth()-1);
    },
    methods: {
      dateFormatter:function(row){
        var date = new Date(row['lastlogin']*1000) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
        var D = date.getDate() + ' '
        var h = date.getHours() + ':'
        var m = date.getMinutes() + ':'
        var s = date.getSeconds()
        return Y+M+D+h+m+s
      },
      releaseValueFormatter(row, column) {
        if (row.release == 1) {
          return "是";
        } else {
          return "否";
        }
      },
      videoValueFormatter(row, column) {
        if (row.video == 1) {
          return "是";
        } else {
          return "否";
        }
      },
      modifyConfig(row, index, isCancel) {
        // 点击修改，判断是否已保存所有操作
        for (let item of this.list) {
          if (item.isEdit && item.id !== row.id) {
            this.$message.warning('请先保存当前编辑项');
            return;
          }
        }

        // 是否取消
        if (isCancel) {
          // 新增的取消
          if (!this.curEdit.id) {
            this.list.splice(index, 1);
            return (row.isEdit = !row.isEdit);
          } else {
            return (row.isEdit = false);
          }
        }

        // 提交数据
        if (row.isEdit) {
          const data = JSON.parse(JSON.stringify(this.curEdit));

          const {week_time = '', start_time = '', end_time = ''} = data;

          if (!week_time) {
            this.$message.error('请选择日期');
            return;
          }
          if (start_time === '') {
            this.$message.error('请选择开始日期');
            return;
          }

          if (end_time === '') {
            this.$message.error('请选择结束日期');
            return;
          }

          for (let k in data) {
            if({}.hasOwnProperty.call(data, k)) {
              row[k] = data[k];
            }
          }

          let url = row.id
            ? '/admin/consultTime/editConfig.json'
            : '/admin/consultTime/addConfig.json';

          request.post(url, row).then((res) => {
            const {ret, msg = '修改失败'} = res;
            if (ret) {
              row.isEdit = false;
              this.queryConfig();
              this.$message.success(msg);
            } else {
              this.$alert(msg);
              this.queryConfig();
            }
          });
        } else {
          this.curEdit = JSON.parse(JSON.stringify(row));
          row.isEdit = true;
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
        this.$refs['edit'].showEdit()
      },
      handleEdit(row) {
        this.$refs['edit'].showEdit(row)
      },
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            const { msg } = await doDelete({ ids: row.id })
            this.$baseMessage(msg, 'success')
            this.fetchData()
          })
        } else {
          if (this.selectRows.length > 0) {
            const ids = this.selectRows.map((item) => item.id).join()
            this.$baseConfirm('你确定要删除选中项吗', null, async () => {
              const { msg } = await doDelete({ ids: ids })
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
        this.fetchData(val)
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val
        this.fetchData(val)
      },
      handleQuery() {
        this.queryForm.pageNo = 1
        this.fetchDataByBookname()
      },
      async fetchData() {
        this.listLoading = true
        // if (this.valueDate < this.valueDateStart) {
        //   alert('结束日期需大于开始日期')
        //   return
        // }
        // if (this.valueDateDate[0] > this.valueDateDate[1]) {
        //   alert('结束日期需大于开始日期')
        //   return
        // }
        // console.log(this.valueDateDate[0])
        // console.log(this.valueDateDate[1])
        // // var val = this.valueDate;
        // // var valStart = this.valueDateStart;
        // var val = this.valueDateDate[1];
        // var valStart = this.valueDateDate[0];
        // console.log(val)
        // if (val == undefined || val.trim().length == 0||valStart == undefined || valStart.trim().length == 0){
        //   alert('请选择日期')
        //   return
        // }
        // if (val == undefined || val.trim().length == 0){
        //   const nowDate = new Date();
        //   const date = {
        //     year: nowDate.getFullYear(),
        //     month: nowDate.getMonth() + 1,
        //     date: nowDate.getDate(),
        //   }
        //   const newmonth = date.month>10?date.month:'0'+date.month
        //   const day = date.date>10?date.date:'0'+date.date
        //   val = date.year + '-' + newmonth + '-' + day+' 23:59:59'
        // }
        // valStart = valStart + ' 00:00:00'
        // val = val + ' 23:59:59';
        // var timedate = val;
        var data =  await getBookDetailList()
        console.log(data)
        console.log(data.data)
        var a = [];
        a = data.data;
        this.list = a;
        var totalCount = a.length;
        const imageList = []
        this.imageList = imageList
        this.total = totalCount
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      },
      async fetchDataByBookname() {
        this.listLoading = true
        var data =  await getBookDetailListByName(this.form.bookname)
        console.log(data)
        console.log(data.data)
        var a = [];
        a = data.data;
        this.list = a;
        var totalCount = a.length;
        this.total = totalCount
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
