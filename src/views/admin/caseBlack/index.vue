<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="姓名" v-model="listQuery.key">
      </el-input>

      <el-input  style="width: 150px;" class="filter-item" placeholder="批次" v-model="listQuery.batchno">
      </el-input>
      <el-input  style="width: 150px;" class="filter-item" placeholder="催收员" v-model="listQuery.ownerid">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>

    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="不需要时间" border fit
              highlight-current-row style="width: 100%"
              :default-sort ="{prop:'name',order:'descending'}">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="name" width="60px" align="center" label="序号">
        <template slot-scope="scope">
          <span>{{(scope.$index + 1) + (listQuery.page - 1) * listQuery.limit}}</span>
        </template>
      </el-table-column>
      <el-table-column  prop="name" width="70px" align="center" label="姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="85px" label="批次">
        <template slot-scope="scope">
          <span>{{ scope.row.batchno }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="110px" label="银行">
        <template slot-scope="scope">
          <span>{{ scope.row.bankname }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="卡号" width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.cardno }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="身份证"width="170px">
        <template slot-scope="scope">
          <span>{{ scope.row.certno }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="家庭地址">
        <template slot-scope="scope">
          <span>{{ scope.row.addr }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="70px" label="欠款">
        <template slot-scope="scope">
          <span>{{ scope.row.balance }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"width="110px" label="移动电话">
        <template slot-scope="scope">
          <span>{{ scope.row.mobile }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="70px" label="催收员">
        <template slot-scope="scope">
          <span>{{ scope.row.ownerid }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagination-container mt20">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.page"
                     background
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import { fetchList, addObj, putObj, delObj } from '@/api/case_Black'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { mapGetters } from 'vuex'

  export default {
    name: 'table_case_info',
    directives: {
      waves
    },
    data() {
      return {
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          bankname: this.$route.query.bankname,
          page: 1,
          limit: 20
        },
        rules: {
        },
        form: {
        },
        dialogFormVisible: false,
        dialogStatus: '',
        case_info_add: true,
        case_info_upd: false,
        case_info_del: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0
      }
    },
    computed: {
      ...mapGetters([
        'permissions'
      ])
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          0: '有效',
          1: '无效'
        }
        return statusMap[status]
      }
    },
    created() {
      this.getList()
      this.case_info_add = this.permissions['case_info_add']
      this.case_info_upd = this.permissions['case_info_upd']
      this.case_info_del = this.permissions['case_info_del']
    },
    watch: {
      "$route": function(to, from) {
        if(from.path !== to.path) {
          this.listQuery.bankname = to.query.bankname
          this.getList()
        }
      }
    },
    methods: {
      getList() {
        this.listLoading = true;

        fetchList(this.listQuery).then(response => {
          this.list = response.data.records
          this.total = response.data.total
          this.listLoading = false
        })
      },
      gotoCaseInfo(row){

      //  this.$router.push({path:'/caseInfo',query:{cid:row.guid, bankname:this.$route.query.bankname}});
        let routeData = this.$router.resolve({
            path: "/caseInfo", query:{
                cid:row.guid,
                bankname:this.$route.query.bankname
            }
        });
        window.open(routeData.href, '_blank');
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      handleFilter() { 
        this.listQuery.page = 1;
        this.getList();
      }
    }
  }
</script>
<style>
  body .el-table th{
    display: table-cell!important;
  }
</style>
