<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="600px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="用户编号" prop="customerId">
        <el-input
          v-model.trim="form.customerid"
          autocomplete="off"
          :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="购买书名" prop="bookName">
        <el-input
          v-model.trim="form.bookname"
          autocomplete="off"
          :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="新用户编号">
        <el-autocomplete
          v-model="newcustomerid"
          class="inline-input"
          :fetch-suggestions="querySearch"
          placeholder="请输入转移的用户编号"
          @select="handleSelect"
        ></el-autocomplete>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">转移书本</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { updateBookinfo, saveBookinfo } from '@/api/Bookresource'
  import { getAllCustomerIds, transferCustomerBookinfo } from '@/api/bill'

  export default {
    name: 'TableAdd',
    data() {
      return {
        form: {
          bookId: '',
          name: '',
          release: '',
          video: '',
          version: '',
        },
        rules: {},
        transferForm: {},
        newcustomerid: '',
        title: '',
        dialogFormVisible: false,
        // 所有的用户编号
        customerIds: [],
      }
    },
    created() {
      this.fetchCustomerIds()
    },
    methods: {
      showTransfer(row) {
        if (!row) {
          this.title = '添加'
        } else {
          this.title = '转移书籍'
          this.form = Object.assign({}, row)
        }
        this.dialogFormVisible = true
      },
      // 搜索建议
      querySearch(queryString, cb) {
        // 原地增加value属性值
        let customers = this.customerIds.map((item) => {
          let obj = {}
          obj.value = item.toString()
          return obj
        })
        var results = queryString
          ? customers.filter((customer) =>
              customer.value.startsWith(queryString)
            )
          : customers
        // 调用 callback 返回建议列表的数据
        cb(results)
      },
      handleSelect(item) {
        if (item.value) {
          this.transferForm['toPid'] = item.value
          const { bookid, customerid } = this.form
          this.transferForm['fromPid'] = customerid
          this.transferForm['bookidx'] = bookid
        }
      },
      close() {
        this.newcustomerid = ''
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
        this.$emit('refreshData')
      },
      // 后台发接口
      async save() {
        var id = this.transferForm.toPid
        if (id === '' || id === undefined) {
          this.$baseMessage('请输入转移的用户编号', 'warning')
          this.$refs['form'].resetFields()
          return
        } else {
          const res = await transferCustomerBookinfo(this.transferForm)
          const msg = res.data
          this.$baseMessage(msg, 'success')
          this.$refs['form'].resetFields()
          this.newcustomerid = ''
          this.dialogFormVisible = false
          this.$emit('refreshData')
        }
      },
      // 获取所有的用户编号
      async fetchCustomerIds() {
        const data = await getAllCustomerIds()
        this.customerIds = data.data
      },
    },
  }
</script>
