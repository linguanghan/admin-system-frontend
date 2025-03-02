<template>
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      width="1000px"
      @close="close"
    >

    <el-descriptions>
      <el-descriptions-item label="id">{{ form.id }}</el-descriptions-item>
      <el-descriptions-item label="班级邀请ID">{{ form.classInviteID }}</el-descriptions-item>
      <el-descriptions-item label="班级">{{ form.classNumber }}</el-descriptions-item>
      <el-descriptions-item label="教师名">{{ form.teacherName }}</el-descriptions-item>
      <el-descriptions-item label="学校名">{{ form.schoolName }}</el-descriptions-item>
      <el-descriptions-item label="年级">{{ form.grade }}</el-descriptions-item>
      <el-descriptions-item label="状态">{{ form.state }}</el-descriptions-item>
      <el-descriptions-item label="创建教师ID">{{ form.ownerPid }}</el-descriptions-item>
      <el-descriptions-item label="创建时间">{{ form.createTime }}</el-descriptions-item>
      <el-descriptions-item label="学生数据">{{ form.studentCount }}</el-descriptions-item>
      <el-descriptions-item label="班级数量">{{ form.classCount }}</el-descriptions-item>
    </el-descriptions>

      <!-- <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="班级邀请ID" prop="classInviteID">
          <el-input v-model.trim="form.classInviteID" autocomplete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="班级" prop="classNumber">
          <el-input v-model.trim="form.classNumber" >
          </el-input>
        </el-form-item>
        <el-form-item label="教师名" prop="teacherName">
          <el-input v-model.trim="form.teacherName" autocomplete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="学校名" prop="schoolName">
          <el-input v-model.trim="form.schoolName" autocomplete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="年级" prop="grade" size="large">
          <el-input v-model.trim="form.grade" autocomplete="off">
          </el-input>
        </el-form-item>
      </el-form> -->
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div> -->
    </el-dialog>
  </template>
  
  
  <script>
    import { doAdd } from '@/api/classManagement'
    import {updateAppinfo,saveAppinfo} from '@/api/appresource'
  
    export default {
      name: 'TableAdd',
      data() {
        return {
          form: {
            classInviteID: '',
            classNumber: '',
            teacherName: '',
            schoolName: '',
            grade: '',
            classCount: '',
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
            this.title = '班级详情'
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
                const { data } = await doAdd(this.form)
                this.$baseMessage('添加成功', 'success')
                this.$refs['form'].resetFields()
                this.dialogFormVisible = false
                this.$parent.fetchData(this.$parent.queryForm)
                this.form = this.$options.data().form
              } else {
                const { data } = await updateAppinfo(this.form)
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
  
  </style>