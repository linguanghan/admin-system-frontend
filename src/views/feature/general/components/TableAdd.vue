<template>
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      width="500px"
      @close="close"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="参数名称" prop="ACTIVITY_NOTICE">
           <el-input v-model.trim="form.paramName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="中文名" prop="CHECK_STATE">
            <el-input v-model.trim="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="自由交易" prop="FREE_TRADE">
        <el-select v-model="form.FREE_TRADE" style="margin-left: 10px">
            <el-option label="开启" :value="1"></el-option>
            <el-option label="关闭" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="超时检测" prop="OVER_TIME_CHECK">
          <el-select v-model="form.OVER_TIME_CHECK" style="margin-left: 10px">
            <el-option label="开启" :value="1"></el-option>
            <el-option label="关闭" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开启后测评分数在70以上" prop="HIDDEN_EXPANSION" size="large">
        <el-select v-model="form.HIDDEN_EXPANSION" style="margin-left: 10px">
            <el-option label="开启" :value="1"></el-option>
            <el-option label="关闭" :value="0"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="开启后测评分数在70以上" prop="SCORE_ORALTEST" size="large">
         <el-select v-model="form.SCORE_ORALTEST" style="margin-left: 10px">
            <el-option label="开启" :value="1"></el-option>
            <el-option label="关闭" :value="0"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="检测书本版本号" prop="DEBUG_MODE" size="large">
         <el-select v-model="form.DEBUG_MODE" style="margin-left: 10px">
            <el-option label="开启" :value="1"></el-option>
            <el-option label="关闭" :value="0"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="不用登录" prop="UN_LOGIN" size="large">
         <el-select v-model="form.UN_LOGIN" style="margin-left: 10px">
            <el-option label="开启" :value="1"></el-option>
            <el-option label="关闭" :value="0"></el-option>
          </el-select>
        </el-form-item> -->
         <el-form-item label="是否开启" prop="status" size="large">
         <el-select v-model="form.status" style="margin-left: 10px">
            <el-option label="开启" :value="1"></el-option>
            <el-option label="关闭" :value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </template>
  
  
  <script>
    import {updateGeneralParamConfig,saveGeneralParamConfig} from '@/api/generalParamConfig'
  
    export default {
      name: 'TableAdd',
      data() {
        return {
          form: {
            paramName: '',
            name: '',
            status: '',
          },
          rules: {
            paramName:  [{ required: true, trigger: 'blur', message: '请输入参数名称' }],
            name:  [{ required: true, trigger: 'blur', message: '请输入中文名称' }],
            status:  [{ required: true, trigger: 'blur', message: '请输入是否开启 1开启 0关闭' }],
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
                const { data } = await saveGeneralParamConfig(this.form)
                this.$baseMessage('添加成功', 'success')
                this.$refs['form'].resetFields()
                this.dialogFormVisible = false
                this.$parent.fetchData(this.$parent.queryForm)
                this.form = this.$options.data().form
              } else {
                const { data } = await updateGeneralParamConfig(this.form)
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