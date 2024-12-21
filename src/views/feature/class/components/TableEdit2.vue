<template>
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      width="500px"
      @close="close"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="班级邀请ID" prop="classInviteID">
          <el-input v-model.trim="form.classInviteID" autocomplete="off" readonly>
          </el-input>
        </el-form-item>
        <el-form-item label="班级" prop="classNumber">
          <el-input v-model.trim="form.classNumber" >
          </el-input>
        </el-form-item>
        <el-form-item label="教师名" prop="teacherName">
          <el-input v-model.trim="form.teacherName" autocomplete="off" readonly>
          </el-input>
        </el-form-item>
        <el-form-item label="学校名" prop="schoolName">
          <el-input v-model.trim="form.schoolName" autocomplete="off" readonly>
          </el-input>
        </el-form-item>
        <el-form-item label="年级" prop="grade" size="large">
          <el-input v-model.trim="form.grade" autocomplete="off">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </template>
  
  
  <script>
    import { doEdit } from '@/api/classManagement'
    import {updateAppinfo,saveAppinfo} from '@/api/appresource'
  
    export default {
      name: 'TableEdit',
      data() {
        return {
          show:0,
          form: {
            id:'',
            classInviteID: '',
            classNumber: '',
            teacherName: '',
            schoolName: '',
            grade: '',
          },
          rules: {
            classInviteID: [{ required: true, trigger: 'blur', message: '请输入班级邀请ID' },],
            classNumber: [{ required: true, trigger: 'blur', message: '请输入班级' }],
            teacherName: [{ required: true, trigger: 'blur', message: '请输入教师名' }],
            schoolName:  [{ required: true, trigger: 'blur', message: '请输入学校名' }],
            grade:  [{ required: true, trigger: 'blur', message: '请输入年级' }],
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
                const { data } = await doEdit(this.form)
                // console.log(aa);
                this.$baseMessage('编辑成功', 'success')
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