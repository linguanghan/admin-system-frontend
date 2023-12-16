<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="功能编号" prop="idx">
        <el-input v-model.trim="form.idx" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="功能名称" prop="name">
        <el-input v-model.trim="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="目录" prop="folder">
        <el-input v-model.trim="form.folder" ></el-input>
      </el-form-item>
      <el-form-item label="路径" prop="path">
        <el-input v-model.trim="form.path" ></el-input>
      </el-form-item>
      <el-form-item label="版本" prop="version">
        <el-input v-model.trim="form.version" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {updateFuncBundleVersionLog, saveFuncBundleVersionLog,searchFuncBundleVersionLogByIdx} from '@/api/funcVersion'

  export default {
    name: 'TableAdd',
    data() {
      var validFuncIdxRepeat = async (idx) => {
        let {success, result} = await searchFuncBundleVersionLogByIdx(idx);
        if(success) {
          return `功能版号[${result?.data?.idx}]已经被使用过!`
        }
        return "";
      };
      return {
        form: {
          idx:'',
          name: '',
          folder: '',
          path: '',
          version: '',
        },
        rules: {
          idx: [{ required: true, trigger: 'blur', message: '请输入功能版号' },{
               validator: async function(rule, value, callback) {
                if (!Number.isNaN(value) && value > 0 ) {
                  let validMess = await validFuncIdxRepeat(value);
                  if(validMess == "") {
                    //校验通过
                    callback();
                  }
                  callback(new Error(validMess))
                } else {
                  callback(new Error("请输入大于0的正整数"));
                }
              },
              trigger: "blur"
            }],
          name: [{ required: true, trigger: 'blur', message: '请输入功能名称' }],
          folder: [{ required: true, trigger: 'blur', message: '请输入目录' }],
          path: [{ required: true,trigger: 'blur', message: '请输入路径' }],
          version: [{ required: true, trigger: 'blur', message: '请输入版本' }],
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    created() {},
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
              const {errorMsg, success } = await saveFuncBundleVersionLog(this.form)
              this.$baseMessage(errorMsg, success ?  "success" : 'error')
              this.$refs['form'].resetFields()
              this.dialogFormVisible = false
              this.$parent.fetchData(this.$parent.queryForm)
              this.form = this.$options.data().form
            } else {
              const { data, success } = await saveFuncBundleVersionLog(this.form)
              this.$baseMessage(data, success ?  "success" : 'error')
              this.$refs['form'].resetFields()
              this.dialogFormVisible = false
              this.$parent.fetchData(this.$parent.queryForm)
              this.form = this.$options.data().form
            }
          } else {
            return false
          }
        });
      },
    },
  }
</script>
