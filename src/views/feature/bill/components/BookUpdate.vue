<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="700px"
    @close="close"
  >
    <el-form ref="form" :model="form"  label-width="80px">
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
      <el-form-item label="更新书名">
        <el-autocomplete
          v-model="newBookName"
          class="inline-input"
          :rules="autocompleteRules"
          :fetch-suggestions="querySearch"
          placeholder="请输入要更新的书名"
          @select="handleSelect"
        ></el-autocomplete>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { getBookList } from '@/api/Bookresource'
  import { updateCustomerBookinfo } from '@/api/bill'

  export default {
    name: 'TableEdit',
    data() {
      return {
        bookList: [],
        show: 0,
        autocompleteRules: [
          { required: true, message: '请输入新书名称', trigger: 'change' },
        ],
        rules: [], // 在data选项中初始化rules属性
        // 渲染表单信息
        form: {},
        updateForm: {},
        // 新书名字
        newBookName: '',
        title: '',
        dialogFormVisible: false,
      }
    },
    created() {
      this.fetchBookList()
    },
    methods: {
      // 获取书本的所有信息
      async fetchBookList() {
        const { data: data } = await getBookList()
        this.bookList = data
      },
      showUpdate(row) {
        if (!row) {
          this.title = '添加'
        } else {
          this.title = '购买书本进行更新'
          this.form = Object.assign({}, row)
        }
        // 开启对话框
        this.dialogFormVisible = true
      },
      // 搜索建议
      querySearch(queryString, cb) {
        // 原地增加value属性值
        this.bookList.forEach((item) => (item.value = item.name))
        let books = this.bookList
        var results = queryString
          ? books.filter((book) => book.name.includes(queryString))
          : books
        // 调用 callback 返回建议列表的数据
        cb(results)
      },
      handleSelect(item) {
        // 渲染返回的对象
        const { bookId, bookType } = item
        this.updateForm['oldBookidx'] = this.form.bookid
        this.updateForm['pid'] = this.form.customerid
        this.updateForm['newBookidx'] = bookId
        this.updateForm['bookType'] = bookType
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
        this.$emit('fetch-data')
      },
      async save() {
        if (!this.newBookName) {
          this.$baseMessage('请输入要更新的书名', 'warning')
          return
        }
        // 获取用户的id
        var customerid = this.updateForm.pid
        if (customerid !== undefined) {
          const {message} = await updateCustomerBookinfo(this.updateForm)
          this.$baseMessage(message, 'success')
          this.$refs['form'].resetFields()
          this.dialogFormVisible = false
          //重新获取数据
          this.$emit('refreshData')
        }else{
          this.dialogFormVisible = false
          this.$baseMessage('更改书名失败！', 'warning')
          this.$emit('refreshData')

        }
      },
    },
  }
</script>
