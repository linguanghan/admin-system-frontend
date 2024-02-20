<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="900px"
    @close="close"
  >
    <el-form ref="form"  :model="form" :rules="rules" label-width="140px" style="padding: 0">
      <el-row align="center">
        <el-col :span="12">
          <el-form-item label="购买人ID" prop="pid">
            <el-input v-model.trim="form.pid" disabled autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="购买人名称" prop="playerName">
            <el-input v-model.trim="form.playerName" disabled autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="原始书本名称" prop="bookIName">
            <el-input v-model.trim="form.bookName" disabled autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
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
        </el-col>
        <el-col :span="12">
          <el-form-item 
          v-show="form.bookType != 0"
          label="对应年级" prop="bookType">
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
        </el-col>
        <el-col :span="12">
          <el-form-item label="包编号" prop="packageIdx">
            <el-input v-model.trim="form.packageIdx" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
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
        </el-col>
        <el-col :span="12">
          <el-form-item label="使用时间（月）" prop="remainTime">
            <el-input  v-model.trim="form.remainTime" placeholder="单位（月）" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-show="form.totalTime != undefined && form.totalTime != null"  label="总学习时长（分钟）" prop="totalTime">
            <el-input  v-model.trim="form.totalTime" placeholder="单位（分钟）" autocomplete="off" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-show="form.learnTimeUnit1 != undefined && form.learnTimeUnit1 != null" label="学习时长（Unit1）" prop="learnTimeUnit1">
            <el-input  v-model.trim="form.learnTimeUnit1" placeholder="单位（分钟）" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-show="form.learnTimeUnit2 != undefined && form.learnTimeUnit2 != null" label="学习时长（Unit2）" prop="learnTimeUnit2">
            <el-input  v-model.trim="form.learnTimeUnit2" placeholder="单位（分钟）" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-show="form.learnTimeUnit3 != undefined && form.learnTimeUnit3 != null" label="学习时长（Unit3）" prop="learnTimeUnit3">
            <el-input  v-model.trim="form.learnTimeUnit3" placeholder="单位（分钟）" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-show="form.learnTimeUnit4 != undefined && form.learnTimeUnit4 != null" label="学习时长（Unit4）" prop="learnTimeUnit4">
            <el-input  v-model.trim="form.learnTimeUnit4" placeholder="单位（分钟）" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-show="form.learnTimeUnit5 != undefined && form.learnTimeUnit5 != null" label="学习时长（Unit5）" prop="learnTimeUnit5">
            <el-input  v-model.trim="form.learnTimeUnit5" placeholder="单位（分钟）" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-show="form.learnTimeUnit6 != undefined && form.learnTimeUnit6 != null" label="学习时长（Unit6）" prop="learnTimeUnit6">
            <el-input  v-model.trim="form.learnTimeUnit6" placeholder="单位（分钟）" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-show="form.learnTimeUnit7 != undefined && form.learnTimeUnit7 != null" label="学习时长（Unit7）" prop="learnTimeUnit7">
            <el-input  v-model.trim="form.learnTimeUnit7" placeholder="单位（分钟）" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-show="form.learnTimeUnit8 != undefined && form.learnTimeUnit8 != null" label="学习时长（Unit8）" prop="learnTimeUnit8">
            <el-input  v-model.trim="form.learnTimeUnit8" placeholder="单位（分钟）" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-show="form.learnTimeUnit9 != undefined && form.learnTimeUnit9 != null" label="学习时长（Unit9）" prop="learnTimeUnit9">
            <el-input  v-model.trim="form.learnTimeUnit9" placeholder="单位（分钟）" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-show="form.learnTimeUnit10 != undefined && form.learnTimeUnit10 != null" label="学习时长（Unit10）" prop="learnTimeUnit10">
            <el-input  v-model.trim="form.learnTimeUnit10" placeholder="单位（分钟）" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-show="form.learnTimeUnit11 != undefined && form.learnTimeUnit11 != null" label="学习时长（Unit11）" prop="learnTimeUnit11">
            <el-input  v-model.trim="form.learnTimeUnit11" placeholder="单位（分钟）" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-show="form.learnTimeUnit12 != undefined && form.learnTimeUnit12 != null" label="学习时长（Unit12）" prop="learnTimeUnit12">
            <el-input  v-model.trim="form.learnTimeUnit12" placeholder="单位（分钟）" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-show="form.learnTimeUnit13 != undefined && form.learnTimeUnit13 != null" label="学习时长（Unit13）" prop="learnTimeUnit13">
            <el-input  v-model.trim="form.learnTimeUnit13" placeholder="单位（分钟）" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-show="form.learnTimeUnit14 != undefined && form.learnTimeUnit14 != null" label="学习时长（Unit14）" prop="learnTimeUnit14">
            <el-input  v-model.trim="form.learnTimeUnit14" placeholder="单位（分钟）" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-show="form.learnTimeUnit15 != undefined && form.learnTimeUnit15 != null" label="学习时长（Unit15）" prop="learnTimeUnit15">
            <el-input  v-model.trim="form.learnTimeUnit15" placeholder="单位（分钟）" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-show="form.learnTimeUnit16 != undefined && form.learnTimeUnit16 != null" label="学习时长（Unit16）" prop="learnTimeUnit16">
            <el-input  v-model.trim="form.learnTimeUnit16" placeholder="单位（分钟）" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-show="form.learnTimeUnit17 != undefined && form.learnTimeUnit17 != null" label="学习时长（Unit17）" prop="learnTimeUnit17">
            <el-input  v-model.trim="form.learnTimeUnit17" placeholder="单位（分钟）" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-show="form.learnTimeUnit18 != undefined && form.learnTimeUnit18 != null" label="学习时长（Unit18）" prop="learnTimeUnit18">
            <el-input  v-model.trim="form.learnTimeUnit18" placeholder="单位（分钟）" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-show="form.learnTimeUnit19 != undefined && form.learnTimeUnit19 != null" label="学习时长（Unit19）" prop="learnTimeUnit19">
            <el-input  v-model.trim="form.learnTimeUnit19" placeholder="单位（分钟）" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-show="form.learnTimeUnit20 != undefined && form.learnTimeUnit20 != null" label="学习时长（Unit20）" prop="learnTimeUnit20">
            <el-input  v-model.trim="form.learnTimeUnit20" placeholder="单位（分钟）" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
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
