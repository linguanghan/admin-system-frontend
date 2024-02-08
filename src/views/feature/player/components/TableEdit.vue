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
      <el-form-item label="代理编号" prop="agentPid">
        <el-input v-model.trim="form.agentPid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="代理名称" prop="agentName">
        <el-input v-model.trim="form.agentName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-input v-model.trim="form.state" placeholder="请输入状态"></el-input>
      </el-form-item>
      <el-form-item label="用户数" prop="userNum">
        <el-input v-model.trim="form.userNum" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="总收益" prop="totalProfit">
        <el-input v-model.trim="form.totalProfit" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="当前收益" prop="curProfit">
        <el-input v-model.trim="form.curProfit" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="收益比例" prop="profitRatio">
        <el-input v-model.trim="form.profitRatio" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="身份" prop="identity">
        <el-input v-model.trim="form.identity" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { updatePlayerInfo, savePlayerInfo } from '@/api/PlayerManagement'

  export default {
    name: 'TableEdit',
    data() {
      return {
        show: 0,
        form: {
          id: '',
          agentPid: '',
          agentName: '',
          state: '',
          userNum: '',
          totalProfit: '',
          curProfit: '',
          profitRatio: '',
          identity: '',
        },
        rules: {
          agentPid: [{ required: false, trigger: 'blur', message: '请输入代理编号' }],
          agentName: [{ required: false, trigger: 'blur', message: '请输入代理名称' }],
          state: [{ required: false, trigger: 'blur', message: '请输入状态' }],
          userNum: [{ required: false, trigger: 'blur', message: '请输入用户数' }],
          totalProfit: [{ required: false, trigger: 'blur', message: '请输入总收益' }],
          curProfit: [{ required: false, trigger: 'blur', message: '请输入当前收益' }],
          profitRatio: [{ required: false, trigger: 'blur', message: '请输入收益比例' }],
          identity: [{ required: false, trigger: 'blur', message: '请输入身份' }],
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
            var agentPid = this.form.agentPid
            if (!agentPid) {
              const { data } = await savePlayerInfo(this.form)
              this.$baseMessage(data, 'success')
            } else {
              const { data } = await updatePlayerInfo(this.form)
              this.$baseMessage(data, 'success')
            }
            this.$refs['form'].resetFields()
            this.dialogFormVisible = false
            this.$parent.fetchData(this.$parent.queryForm)
            this.form = this.$options.data().form
          } else {
            return false
          }
        })
      },
    },
  }
</script>
