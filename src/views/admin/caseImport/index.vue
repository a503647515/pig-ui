<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="批次"
                v-model="listQuery.batchno">
      </el-input>
      <el-select v-model="listQuery.distribution">
        <el-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label"></el-option>
      </el-select>
      <el-select v-model="listQuery.deptname">
        <el-option v-for="item in roles" :key="item.id" :value="item.id" :label="item.name"></el-option>
      </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" type="primary" v-waves @click="distribution">重新分配案件</el-button>
    </div>
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="不需要时间" border fit
              highlight-current-row style="width: 100%">
      <el-table-column align="center" label="姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="银行名称">
        <template slot-scope="scope">
          <span>{{ scope.row.bankname }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="移动电话">
        <template slot-scope="scope">
          <span>{{ scope.row.mobile }}</span>
        </template>
      </el-table-column>


      <el-table-column align="center" label="部门电话">
        <template slot-scope="scope">
          <span>{{ scope.row.depttel }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="账单">
        <template slot-scope="scope">
          <span>{{ scope.row.balance }}</span>
        </template>
      </el-table-column>


      <el-table-column align="center" label="应付">
        <template slot-scope="scope">
          <span>{{ scope.row.lastpaysum }}</span>
        </template>
      </el-table-column>


      <el-table-column align="center" label="分配人">
        <template slot-scope="scope">
          <span>{{ scope.row.ownerid }}</span>
        </template>
      </el-table-column>


      <!--
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="small" type="success"
                           @click="gotoCaseInfo(scope.row)">催收
                </el-button>

              </template>
            </el-table-column>
            -->
    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30,50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import {pageByBatch, addObj, putObj, delObj, distributionObj, pageRoles} from '@/api/case_info'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import {mapGetters} from 'vuex'

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
          page: 1,
          limit: 20
        },
        rules: {},
        form: {},
        dialogFormVisible: false,
        dialogStatus: '',
        case_info_add: true,
        case_info_upd: false,
        case_info_del: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0,
        roles: [],
        options: [{
          value: '0',
          label: '未分配'
        }, {
          value: '1',
          label: '已分配'
        }],
        query: '0'
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
      this.getList();
      this.getRoles();
      this.case_info_add = this.permissions['case_info_add']
      this.case_info_upd = this.permissions['case_info_upd']
      this.case_info_del = this.permissions['case_info_del']
    },
    watch: {
      "$route": function (to, from) {
        if (from.path !== to.path) {
          this.getList()
        }
      }
    },
    methods: {
      getList() {
        this.listLoading = true;

        pageByBatch(this.listQuery).then(response => {
          this.list = response.data.records
          this.total = response.data.total
          this.listLoading = false
        })
      },
      getRoles() {
        pageRoles(this.listQuery).then(response => {

          this.roles = response.data;

        })
      },
      distribution(row) {
        distributionObj(this.listQuery).then(response => {
          this.getList();
          this.$notify({
            title: "成功",
            message: "修改成功",
            type: "success",
            duration: 2000
          });
        });
      },
      gotoCaseInfo(row) {
        //  this.$router.push({path:'/caseInfo',query:{cid:row.guid, bankname:this.$route.query.bankname}});
        let routeData = this.$router.resolve({
          path: "/caseInfo", query: {cid: row.guid, bankname: this.$route.query.bankname}
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
