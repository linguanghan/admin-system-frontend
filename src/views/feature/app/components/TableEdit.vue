<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item v-show="show" label="id" prop="id">
        <el-input v-model.trim="form.id" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="包编号" prop="packageIdx">
        <el-input v-model.trim="form.packageIdx" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="应用名" prop="appName">
        <el-input v-model.trim="form.appName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="备案号" prop="registrationNum">
        <el-input v-model.trim="form.video" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="公司名" prop="companyName">
        <el-input v-model.trim="form.companyName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="包参数" prop="packagePara" style="width: 100%; height: 100px;">
        <el-input v-model.trim="form.packagePara" autocomplete="off" type="textarea" class="para-input"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { doEdit } from '@/api/table'
  import {updateAppinfo,saveAppinfo} from '@/api/Appresource'

  export default {
    name: 'TableEdit',
    data() {
      return {
        show:0,
        form: {
          id:'',
          packageIdx: 0,
          appName: '',
          companyName: '',
          registrationNum: '',
          packagePara: '',
        },
        rules: {
          packageIdx: [{ required: true, trigger: 'blur', message: '请输入包编号' }],
          appName: [{ required: true, trigger: 'blur', message: '请应用名称' }],
          registrationNum: [{ required: true, trigger: 'blur', message: '请输入备案号' }],
          companyName:  [{ required: true, trigger: 'blur', message: '请输入公司名称' }],
          packagePara:  [{ required: true, trigger: 'blur', message: '请输入包参数' }],
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    methods: {
      showEdit(row) {
        if (!row) {
          this.title = '添加'
        } else {
          this.title = '编辑'
          this.form = Object.assign({}, row)
        }
        this.dialogFormVisible = true
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
        this.$emit('fetch-data')
      },
      save() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            var id = this.form.id
            if (id == undefined || id.length == 0){
              const { data } = await saveAppinfo(this.form)
              this.$baseMessage(data, 'success')
              this.$refs['form'].resetFields()
              this.dialogFormVisible = false
              this.$parent.fetchData(this.$parent.queryForm)
              this.form = this.$options.data().form
            } else {
              const { data } = await updateAppinfo(this.form)
              // console.log(aa);
              this.$baseMessage(data, 'success')
              this.$refs['form'].resetFields()
              this.dialogFormVisible = false
              this.$parent.fetchData(this.$parent.queryForm)
              this.form = this.$options.data().form
            }
          } else {
            return false
          }
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
.el_dialog_bofy{
  height: 400px;
}

.para-input ::v-deep .el-input__inner {
  height: 100px; /* 设置一个固定的高度 */
  overflow-y: auto; /* 当内容超出时，显示垂直滚动条 */
  padding: 5px; /* 添加一些内边距 */
  resize: none; /* 不允许用户调整大小 */
}
</style>