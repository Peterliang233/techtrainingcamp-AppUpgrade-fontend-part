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
          prop="rule_id"
          label="规则ID"
          width="700">
        </el-table-column>
        <el-table-column
          fixed
          prop="device_id"
          label="设备ID"
          width="700">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="300">
          <template slot-scope="scope">
            <el-button @click="delWhiteList(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row :gutter="20" style="float: right">
        <el-col :span="4">
          <el-button type="primary" @click="dialogFormVisible=true">添 加 白 名 单</el-button>
        </el-col>
      </el-row>
      <el-dialog title="新增白名单" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="规则的ID" :label-width="formLabelWidth" prop="rule_id">
            <el-input v-model="form.rule_id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="设备的ID" :label-width="formLabelWidth" prop="device_id">
            <el-input v-model="form.device_id" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addWhiteList">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Head from "@/component/Head"
import Global from "@/component/Global"
export default {
  name: "rule",
  components: {
    Head
  },
  data() {
    return {
      dialogFormVisible: false,
      tableData: [],
      form: {
        rule_id: '',
        device_id: '',
      },
      formLabelWidth: '200px',
      rules: {
        rule_id: [
          {
            required: true,
            message: '输入只能是正整数',
            pattern: '^[1-9][0-9]+$',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    addWhiteList () {
      this.$axios.post('/rule/whitelist/new', {
        'rule_id': parseInt(this.form.rule_id),
        'device_id': this.form.device_id,
      }).then(res => {
        if (res.status === 200) {
          this.getWhiteList()
          this.dialogFormVisible = false
          Global.methods.successOpen('添加白名单成功')
        }
      }).catch(error => {
        Global.methods.failOpen(error.response.data.msg.detail)
      })
    },
    delWhiteList (row) {
      console.log(row)
      this.$axios.delete('/rule/whitelist?rule_id=' + row.rule_id
      + "&device_id="+ row.device_id).
        then(res=>{
          if(res.status === 200) {
            Global.methods.successOpen('删除成功')
            this.getWhiteList()
          }
      }).catch(error =>{
        Global.methods.failOpen(error.response.data.msg.detail)
      })
    },
    getWhiteList () {
      this.$axios.get('/rule/whitelist/all').
      then(res => {
        this.tableData = res.data.msg.data
      }).catch(error => {
        Global.methods.failOpen(error.response.data.msg.detail)
      })
    }
  },
  mounted() {
    this.getWhiteList()
  }
}
</script>

<style scoped>

</style>
