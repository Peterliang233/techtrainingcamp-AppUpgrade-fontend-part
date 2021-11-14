<template>
  <div>
    <Head/>
    <div>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="id"
          label="规则ID"
          width="50">
        </el-table-column>
        <el-table-column
          prop="app_id"
          label="app的唯一标识"
          width="80">
        </el-table-column>
        <el-table-column
          prop="platform"
          label="平台"
          width="100">
        </el-table-column>
        <el-table-column
          prop="download_url"
          label="下载链接"
          width="200">
        </el-table-column>
        <el-table-column
          prop="update_version_code"
          label="包的当前版本"
          width="150">
        </el-table-column>
        <el-table-column
          prop="md5"
          label="包的MD5"
          width="80">
        </el-table-column>
        <el-table-column
          prop="max_update_version_code"
          label="可升级的最大版本"
          width="100">
        </el-table-column>
        <el-table-column
          prop="min_update_version_code"
          label="可升级的最小版本"
          width="100">
        </el-table-column>
        <el-table-column
          prop="max_os_api"
          label="支持的最大操作系统版本"
          width="80">
        </el-table-column>
        <el-table-column
          prop="min_os_api"
          label="支持的最小操作系统版本"
          width="80">
        </el-table-column>
        <el-table-column
          prop="cpu_arch"
          label="CPU架构"
          width="50">
        </el-table-column>
        <el-table-column
          prop="channel_number"
          label="渠道号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="title"
          label="弹窗标题"
          width="120">
        </el-table-column>
        <el-table-column
          prop="update_tips"
          label="弹窗的更新文本"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="300">
          <template slot-scope="scope">
            <el-button @click="delRule(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row :gutter="20" style="float: right">
        <el-col :span="4">
          <el-button type="primary" @click="dialogFormVisible=true">添 加 规 则</el-button>
        </el-col>
      </el-row>

      <el-dialog title="更新规则" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="app的唯一标识" :label-width="formLabelWidth" prop="app_id">
            <el-input v-model="form.app_id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="平台" :label-width="formLabelWidth" prop="platform">
            <el-input v-model="form.platform" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="下载链接" :label-width="formLabelWidth" prop="download_url">
            <el-input v-model="form.download_url" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="包的当前版本" :label-width="formLabelWidth" prop="update_version_code">
            <el-input v-model="form.update_version_code" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="包的MD5" :label-width="formLabelWidth" prop="md5">
            <el-input v-model="form.md5" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="可升级的最大版本" :label-width="formLabelWidth" prop="max_update_version_code">
            <el-input v-model="form.max_update_version_code" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="可升级的最小版本" :label-width="formLabelWidth" prop="min_update_version_code">
            <el-input v-model="form.min_update_version_code" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="支持的最大操作系统版本" :label-width="formLabelWidth" prop="max_os_api">
            <el-input v-model="form.max_os_api" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="支持的最小操作系统版本" :label-width="formLabelWidth" prop="min_os_api">
            <el-input v-model="form.min_os_api" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="CPU架构" :label-width="formLabelWidth" prop="cpu_arch">
            <el-input v-model="form.cpu_arch" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="渠道号" :label-width="formLabelWidth" prop="channel_number">
            <el-input v-model="form.channel_number" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="弹窗标题" :label-width="formLabelWidth" prop="title">
            <el-input v-model="form.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="弹窗的更新文本" :label-width="formLabelWidth" prop="update_tips">
            <el-input v-model="form.update_tips" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addRule">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Head from "@/component/Head"
import Global from "@/component/Global"
export default {
  name: "Main",
  components: {
    Head
  },
  methods: {
    delRule(row) {
      this.$axios.delete('/rule?rule_id=' + row.id).
        then(res => {
          if (res.status === 200) {
            Global.methods.successOpen('删除成功')
            this.getRule()
          }
      }).catch(error => {
          Global.methods.failOpen(error.response.data.msg.detail)
      })
    },
    getRule() {
      this.$axios.get('/rule/all').
      then(res => {
        if(res.status === 200){
          this.tableData = res.data.msg.data
        }
      }).catch(error => {
        Global.methods.failOpen(error.response.data.msg.detail)
      })
    },
    addRule() {
      this.$axios.post('/rule/new', {
        app_id: parseInt(this.form.app_id),
        platform: this.form.platform,
        download_url: this.form.download_url,
        update_version_code: this.form.update_version_code,
        md5: this.form.md5,
        max_update_version_code: this.form.max_update_version_code,
        min_update_version_code: this.form.min_update_version_code,
        max_os_api: parseInt(this.form.max_os_api),
        min_os_api: parseInt(this.form.min_os_api),
        cpu_arch: parseInt(this.form.cpu_arch),
        channel_number: this.form.channel_number,
        title: this.form.title,
        update_tips: this.form.update_tips,
      }).
      then(res => {
        if( res.status === 200) {
          this.getRule()
          this.dialogFormVisible = false
          Global.methods.successOpen('添加成功')
        }
      }).catch(error => {
        Global.methods.failOpen(error.response.data.msg.detail)
      })
    }
  },
  mounted() {
    this.getRule()
  },
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        app_id: '',
        platform: '',
        download_url: '',
        update_version_code: '',
        md5: '',
        max_update_version_code: '',
        min_update_version_code: '',
        max_os_api: '',
        min_os_api: '',
        cpu_arch: '',
        channel_number: '',
        title: '',
        update_tips: '',
      },
      rules: {
        app_id: [
          {
            required: true,
            message: '输入只能是数字串',
            pattern: '[0-9]+$',
            trigger: 'blur'
          }
        ],
        min_os_api: [
          {
            required: true,
            message: '输入的只能是数字',
            pattern: '[0-0]+$',
            trigger: 'blur'
          }
        ],
        max_os_api: [
          {
            required: true,
            message: '输入的只能是数字',
            pattern: '[0-0]+$',
            trigger: 'blur'
          }
        ],
        cpu_arch: [
          {
            required: true,
            message: '输入的只能是数字',
            pattern: '[0-0]+$',
            trigger: 'blur'
          }
        ],
      },
      formLabelWidth: '200px'
    }
  }
}
</script>

<style>
</style>
