<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="600px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="购买人账号" prop="pid">
        <el-input v-model.trim="form.pid" placeholder="请输入购买人账号" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="渠道" prop="channel">
        <el-select
            v-model="form.channel" 
            placeholder="请选择"
            clearable
            style="width: 100%"
            >
            <el-option
              v-for="item in channelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="包编号" prop="packageIdx">
        <el-input  v-model.trim="form.packageIdx" placeholder="请输入包编号" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="书本编号" prop="bookIdx">
        <el-select
            v-model="form.bookIdx" 
            placeholder="请选择"
            clearable
            style="width: 100%"
            >
            <el-option
              v-for="item in bookIdxOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="使用时间（月）" prop="remainTime">
        <el-input  v-model.trim="form.remainTime" placeholder="单位（月）" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { queryBookResourceOptions, addBookUnit } from '@/api/queryRecharge'
  
  import {getChannels} from '@/assets/data/ChannelDefine.js'
  export default {
    name: 'TableEdit',
    data() {
      var validRemainTime = async (rule, value, callback) => {
        if(value == undefined || value == "" || isNaN(value)) {
           callback(new Error("请输入数字"))
        }
        callback();
   	  };
      var validPid = async (rule, value, callback) => {
        if(value == undefined || value == "" || isNaN(value)) {
           callback(new Error("请输入数字"))
        }
        this.bookIdxOptions = await this.queryBookResourceOptions(value);
        callback();
      };
       
      return {
        form: {
          pid: '',
          channel: 2,
          bookIdx: '',
          packageIdx: undefined,
          remainTime: undefined
        },
        bookIdxOptions: [],
        channelOptions: getChannels().channelOptions,
        rules: {
          pid: [{  required: true, validator: validPid, trigger: 'blur', message: '请输入购买人账号' }],
          channel: [{  required: true, trigger: 'blur', message: '请选择渠道' }],
          bookIdx: [{  required: true, trigger: 'blur', message: '请选择书本编号' }],
          packageIdx: [{  required: true, trigger: 'blur', message: '请输入包编号' }],
          remainTime: [{  required: true, validator: validRemainTime, trigger: 'blur', message: '请输入使用时间' }]
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    created() {
    },
    methods: {
      showEdit(row) {
        this.title = '新增'
        this.dialogFormVisible = true
        this.form = Object.assign({}, row)
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
        this.bookIdxOptions = []
        this.$emit('fresh')
      },
      async queryBookResourceOptions(pid) {
        const {success, result} = await queryBookResourceOptions(pid);
        if(success == true) {
          return result?.data == undefined ? [] : result.data;
        }
        return [];
      },
      save() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            const { errorMsg, success } = await addBookUnit(this.form)
            if(success == true) {
              this.$baseMessage(errorMsg, 'success')
              this.$emit('fresh')
            }
            else {
              this.$baseMessage(errorMsg, 'error')
            }
            this.$refs['form'].resetFields()
            this.$emit('fresh')
            this.form = this.$options.data().form
            this.dialogFormVisible = false
          } else {
            return false
          }
        })
      },
    },
  }
</script>
