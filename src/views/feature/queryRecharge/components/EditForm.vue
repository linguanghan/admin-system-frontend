<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="600px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="购买人ID" prop="pid">
        <el-input v-model.trim="form.pid" disabled autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="购买人名称" prop="playerName">
        <el-input v-model.trim="form.playerName" disabled autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="原始书本名称" prop="bookIName">
        <el-input v-model.trim="form.bookName" disabled autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="购买书本" prop="bookIdx">
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
      <el-form-item label="对应年级" prop="bookType">
        <el-select
            v-model="form.bookType" 
            placeholder="请选择"
            clearable
            style="width: 100%"
            >
            <el-option
              v-for="item in bookTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="包编号" prop="packageIdx">
        <el-input v-model.trim="form.packageIdx" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="购买时间" prop="createTime">
        <el-date-picker
          v-model="form.createTime"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm:ss"
          clearable
          style="width:100%"
          >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="使用时间（月）" prop="remainTime">
        <el-input  v-model.trim="form.remainTime" placeholder="单位（月）" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item v-show="form.totalTime != undefined && form.totalTime != null" label="学习时长（分钟）" prop="totalTime">
        <el-input  v-model.trim="form.totalTime" placeholder="单位（分钟）" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { updateBookUnitUpdateTimeOrLearnTime, queryBookResourceOptions } from '@/api/queryRecharge'
  import {getBooktypes} from '@/assets/data/bookTypeDefine.js'

  export default {
    name: 'TableEdit',
    data() {
      var validOriginPid = async (rule, value, callback) => {
        if(value == "" && isNaN(value)) {
          return callback( new Error("请输入数字"))
        }
        return callback();
   	};
      return {
        form: {
          originPid: '',
          targetPid: '',
          bookIdx: '',
          bookIdxOld: '',
        },
        bookIdxOptions: [],
        bookTypeOptions:[],

        rules: {
          totalTime: [{  required: true, validator: validOriginPid, trigger: 'blur', message: '请输入学习时长' }],
          remainTime: [{  required: true, validator: validOriginPid, trigger: 'blur', message: '请输入使用时间' }]
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    created() {
      this.bookTypeOptions = getBooktypes().bookTypeOptions;
    },
    methods: {
      async showEdit(row) {
        this.title = '编辑'
        this.dialogFormVisible = true
        this.form = Object.assign({}, row)
        this.form.bookIdx = row.bookIdx + "";
        this.bookIdxOptions = await this.queryBookResourceOptions(row.pid);
        this.bookIdxOld = row.bookIdx;
      },
      async queryBookResourceOptions(pid) {
        const {success, result} = await queryBookResourceOptions(pid);
        if(success == true) {
          return result?.data == undefined ? [] : result.data;
        }
        return [];
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
        this.$emit('fresh')
      },
      save() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            const form =  {
              ...this.form
            }
            const { errorMsg, success } = await updateBookUnitUpdateTimeOrLearnTime(form)
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
