<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="原始账号" prop="originPid">
        <el-input v-model.trim="form.originPid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="目标账号" prop="targetPid">
        <el-input v-model.trim="form.targetPid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="书本编号" prop="bookIdx">
        <el-select v-model="form.bookIdx"  style="width:100%" placeholder="请选择">
          <el-option
            v-for="item in bookIdxOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
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
  import { getPlayerUnitOptionListByPid, changeRecharge } from '@/api/queryRecharge'

  export default {
    name: 'TableEdit',
    data() {
      var validOriginPid = async (rule, value, callback) => {
        if(value != "" && value != null && value != undefined) {
           this.bookIdxOptions = [];
          // 判断传入的值是否可以通过校验
          var data =  await getPlayerUnitOptionListByPid(value);
          var result = data?.result == undefined ?  [] : data?.result;
          this.bookIdxOptions = result?.data == undefined ? [] : result?.data;
          callback();
        }
   	};
      return {
        form: {
          originPid: '',
          targetPid: '',
          bookIdx: '',
        },
        bookIdxOptions: [],

        rules: {
          originPid: [{  required: true, validator: validOriginPid, trigger: 'blur', message: '请输入原始账号' }],
          targetPid: [{ required: true, trigger: 'blur', message: '请输入目标账号' }],
          bookIdx: [{ required: true, trigger: 'blur', message: '请选择书本编号' }],
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      showEdit() {
        this.title = '账号转移'
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
            const { errorMsg, success } = await changeRecharge(this.form)
            if(success == true) {
              this.$baseMessage(errorMsg, 'success')
            }
            else {
              this.$baseMessage(errorMsg, 'error')
            }
            
            this.$refs['form'].resetFields()
            this.dialogFormVisible = false
            this.$emit('fetch-data')
            this.form = this.$options.data().form
          } else {
            return false
          }
        })
      },
    },
  }
</script>
