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
      <el-form-item label="书本编号" prop="bookId">
        <el-input v-model.trim="form.bookId" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model.trim="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="发布" prop="release">
        <el-input v-model.trim="form.release" placeholder="是否发布：1是；0否"></el-input>
      </el-form-item>
      <el-form-item label="视频" prop="video">
        <el-input v-model.trim="form.video" placeholder="是否发布：1是；0否"></el-input>
      </el-form-item>
      <el-form-item label="版本" prop="version">
        <el-input v-model.trim="form.version" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="对应年级" prop="bookType">
        <el-select
            v-model="form.bookType" 
            placeholder="请选择"
            clearable
            style="width: 100%;"
            >
            <el-option
              v-for="item in bookTypeOptions"
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
  import { doEdit } from '@/api/table'
  import {updateBookinfo,saveBookinfo} from '@/api/Bookresource'
  import {getBooktypes} from '@/assets/data/bookTypeDefine.js'

  export default {
    name: 'TableEdit',
    data() {
      return {
        show:0,
        form: {
          id:'',
          bookId:'',
          name: '',
          release: '',
          video: '',
          version: '',
        },
        bookTypeOptions:[],
        rules: {
          bookId: [{ required: true, trigger: 'blur', message: '请输入书本编号' }],
          name: [{ required: true, trigger: 'blur', message: '请输入名称' }],
          release: [{ required: true, trigger: 'blur', message: '是否发布：1是；0否' },
            {
              validator: function(rule, value, callback) {
                if (value == 1 || value == 0 ) {
                  //校验通过
                  callback();
                } else {
                  callback(new Error("请输入0或1"));
                }
              },
              trigger: "blur"
            }],
          video: [{ required: true,trigger: 'blur', message: '是否带有视频：1是；0否' },
            {
              validator: function(rule, value, callback) {
                if (value == 1 || value == 0 ) {
                  //校验通过
                  callback();
                } else {
                  callback(new Error("请输入0或1"));
                }
              },
              trigger: "blur"
            }],
          version: [{ required: true, trigger: 'blur', message: '请输入版本' }],
          bookType:  [{ required: true, trigger: 'blur', message: '请选择对应年级' }],
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    created() {
       this.bookTypeOptions = getBooktypes().bookTypeOptions;
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
              const { data } = await saveBookinfo(this.form)
              this.$baseMessage(data, 'success')
              this.$refs['form'].resetFields()
              this.dialogFormVisible = false
              this.$parent.fetchData(this.$parent.queryForm)
              this.form = this.$options.data().form
            } else {
              const { data } = await updateBookinfo(this.form)
              // console.log(aa);
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
