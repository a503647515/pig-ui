<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="姓名"
                v-model="listQuery.key">
      </el-input>
      <el-input style="width: 150px;" class="filter-item" placeholder="批次" v-model="listQuery.batchno">
      </el-input>
      <el-input style="width: 150px;" class="filter-item" placeholder="催收员" v-model="listQuery.ownerid">
      </el-input>
      <el-input style="width: 150px;" class="filter-item" placeholder="类别" v-model="listQuery.batchnoType">
      </el-input>
      <el-input style="width: 150px;" class="filter-item" placeholder="身份证" v-model="listQuery.certno">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="myFilter">我的案件</el-button>
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="exportTemplate">导出模板</el-button>
    </div>
    <el-table :key='tableKey' :data="list" id="exportTab" v-loading="listLoading"
              border fit
              highlight-current-row style="width: 100%"
              @row-dblclick="gotoCaseInfo"
              @sort-change="sortByMoney"

    >
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="name" width="60px" align="center" label="序号">
        <template slot-scope="scope">
          <span>{{(scope.$index + 1) + (listQuery.page - 1) * listQuery.limit}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" width="60px" align="center" label="类别">
        <template slot-scope="scope">
          <span>{{ scope.row.batchnoType }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" width="80px" align="center" label="姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="100px" label="批次">
        <template slot-scope="scope">
          <span>{{ scope.row.batchno }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="120px" label="银行">
        <template slot-scope="scope">
          <span>{{ scope.row.bankname }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="卡号">
        <template slot-scope="scope">
          <span>{{ scope.row.cardno }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="身份证">
        <template slot-scope="scope">
          <span>{{ scope.row.certno }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="320px" label="家庭地址">
        <template slot-scope="scope">
          <span>{{ scope.row.homeaddr.replace("湖南省","").replace("湖南","").replace("长沙市","").replace("长沙","").replace("中国","") }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="80px" label="欠款" :sortable="'custom'" prop="balance">
        <template slot-scope="scope">
          <span>{{ scope.row.balance }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="80px" label="跟进状态">
        <template slot-scope="scope">
          <span  :style="{'color':'#FF0000'}">{{ scope.row.overdue==='0'?'已跟进':scope.row.overdue === '-1'?'未跟进':scope.row.overdue+'天'}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="120px" label="移动电话">
        <template slot-scope="scope">
          <span>{{ scope.row.mobile }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="80px" label="催收员">
        <template slot-scope="scope">
          <span>{{ scope.row.ownerid }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="80px" label="操作" fixed="right">
        <template slot-scope="scope">
<!--          <el-button type="success" size="mini" @click="showDetail(scope.row)">查看</el-button>-->
          <el-button type="success" size="mini">调档</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagination-container mt20">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     background
                     :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import {fetchList, addObj, putObj, delObj,sortByMoney,exportTemplate} from '@/api/case_info'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import {mapGetters} from 'vuex';

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
          isMine: "0",
          batchno: null,
          batchnoType: null,
          ownerid: null,
          certno: null,
          bankname: this.$route.query.bankname,
          page: 1,
          limit: 20,
          sort:"",
          overdue:""
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
      "$route": function (to, from) {
        if (from.path !== to.path) {
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
      showDetail(row) {

        this.$router.push({
          path: "/caseDetail/" + row.guid,
          query: {
            name: row.name,
            bankname: this.$route.query.bankname,
            ownerid: this.listQuery.ownerid,
            key: this.listQuery.key,
            batchno: this.listQuery.batchno,
            batchnoType: this.listQuery.batchnoType,
            certno: this.listQuery.certno,
            isMine: this.listQuery.isMine
          }
        })
      },
      gotoCaseInfo(row) {
        //  this.$router.push({path:'/caseInfo',query:{cid:row.guid, bankname:this.$route.query.bankname}});
        let routeData = this.$router.resolve({
          path: "/caseInfo",
          query: {
            cid: row.guid,
            bankname: this.$route.query.bankname,
            ownerid: this.listQuery.ownerid,
            key: this.listQuery.key,
            batchno: this.listQuery.batchno,
            batchnoType: this.listQuery.batchnoType,
            certno: this.listQuery.certno,
            isMine: this.listQuery.isMine
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
        this.$refs.listQuery=""
      },
      myFilter() {
        this.listQuery.page = 1;
        this.getMyList();
      },
      getMyList() {
        this.listLoading = true;
        this.listQuery.isMine = "1";
        this.listQuery.sort = "";
        fetchList(this.listQuery).then(response => {
          this.list = response.data.records
          this.total = response.data.total
          this.listLoading = false
        })
      },
      //排序
      //选择指定列进行排序
      sortByMoney(column) {
        this.listQuery.page = 1;
        if (column.order == "descending") {
          this.listQuery.sort = "DESC"
        }
        //按照升序排序
        else {
          this.listQuery.sort = "ASC"
        }
        sortByMoney(this.listQuery).then(response => {
          this.list = response.data.records
          this.total = response.data.total
          this.listLoading = false
        })
      },
      //导出模板
      exportTemplate(){
        /*exportTemplate(this.listQuery).then(response => {

        })*/
        // location.href = 'http://127.0.0.1:8000/admin/caseInfo/excel'
        window.open('http://127.0.0.1:8000/admin/caseInfo/excel')
      }

    }
  }
</script>
