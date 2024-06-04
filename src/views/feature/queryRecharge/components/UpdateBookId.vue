<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="书本编号" prop="bookidx">
        <el-input v-model.trim="form.bookidx" autocomplete="off" :disabled = "true"></el-input>
      </el-form-item>
      <el-form-item label="包编号" prop="packageidx">
        <el-input v-model.trim="form.packageidx" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="书本种类" prop="booktype">
        <el-input v-model.trim="form.booktype" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="confirmUnlock">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { updateBookPackageAndType, updateUnlockStatus } from '@/api/queryRecharge'

export default {
  name: 'UpdateBookId',
  data() {
    return {
      form: {
        packageidx: '',
        booktype: '',
        bookidx: '',
        pid: '',
        id:''
      },
      rules: {
        bookIdx: [{ required: true, trigger: 'blur', message: '请选择书本编号' }],
        packageIdx: [{ required: true, trigger: 'blur', message: '请输入包编号' }],
        bookType: [{ required: true, trigger: 'blur', message: '请选择对应年级' }],
      },
      title: '',
      dialogFormVisible: false,
    }
  },
  methods: {
    showEdit(row) {
      if (row) {
        this.form.bookidx = row.bookIdx;
        this.form.packageidx = row.packageIdx;
        this.form.booktype = row.bookType;
        this.form.pid = row.pid;
        this.form.id = row.id;
        this.title = '解锁';
      } else {
        this.title = '新增';
      }
      this.dialogFormVisible = true;
    },
    close() {
      this.$refs['form'].resetFields();
      this.form = this.$options.data().form;
      this.dialogFormVisible = false;
    },
    async confirmUnlock() {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          try {
            // 调用 updateBookPackageAndType 更新数据
            console.log(this.form)
            const updateResponse = await updateBookPackageAndType(this.form);
            console.log(updateResponse);
            if (updateResponse.data == "success") {

              // 调用 updateUnlockStatus 进行解锁
              const unlockResponse = await updateUnlockStatus(this.form.id, 1, this.form.pid);
              console.log(unlockResponse)
              if (unlockResponse.success) {
                this.$message({
                  type: 'success',
                  message: '解锁成功!',
                });
                this.$emit('fresh'); // 刷新数据
              } else {
                this.$message({
                  type: 'error',
                  message: unlockResponse.errorMsg,
                });
              }
            } else {
              this.$message({
                type: 'error',
                message: updateResponse.errorMsg,
              });
            }
          } catch (error) {
            this.$message({
              type: 'error',
              message: error.message || '请求失败，请重试',
            });
          }
          this.close();
        } else {
          return false;
        }
      });
    },
  },
}
</script>
