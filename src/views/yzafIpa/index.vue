<template>
    <div class="app-container calendar-list-container">
      <div class="filter-container">
        <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="用户名" v-model="listQuery.function_id">
        </el-input>

        <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>

        <el-button  class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加
        </el-button>
      </div>

      <el-row :gutter="24">
        <el-col :span="16">
          <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
                                            highlight-current-row style="width: 100%">
          <!--<el-table-column align="center" label="id">-->
            <!--<template slot-scope="scope">-->
              <!--<span>{{ scope.row.id }}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column align="center" label="接口名字">
            <template slot-scope="scope">
              <span>{{ scope.row.ipaName }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="接口内容">
            <template slot-scope="scope">
              <span>{{ scope.row.ipaContent }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="功能id">
            <template slot-scope="scope">
              <span>{{ scope.row.functionId }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="接口地址">
            <template slot-scope="scope">
              <span>{{ scope.row.url }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="small" type="success"
                         @click="handleUpdate(scope.row)">编辑
              </el-button>
              <el-button  size="mini" type="danger"
                          @click="handleDelete(scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
          <div v-show="!listLoading" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page.sync="listQuery.page"
                           :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                           layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
        </el-col>
        <el-col :span="8">

            <el-table :key='tableKey' :data="newlist" v-loading="newlistLoading" element-loading-text="给我一点时间" border fit
                                                                  highlight-current-row style="width: 100%">
          <el-table-column align="center" label="状态">
            <template slot-scope="scope">
              <span>{{ scope.row.status }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="接口名字">
            <template slot-scope="scope">
              <span>{{ scope.row.ipaName }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="功能名字">
            <template slot-scope="scope">
              <span>{{ scope.row.functionId }}</span>
            </template>
          </el-table-column>


          <!--<el-table-column label="操作">-->
            <!--<template slot-scope="scope">-->
              <!--<el-button size="small" type="success"-->
                         <!--@click="handleUpdate(scope.row)">编辑-->
              <!--</el-button>-->
              <!--<el-button  size="mini" type="danger"-->
                          <!--@click="handleDelete(scope.row)">删除-->
              <!--</el-button>-->
            <!--</template>-->
          <!--</el-table-column>-->
        </el-table>
            <div v-show="!listLoading" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page.sync="listQuery.page"
                           :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                           layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
          </el-col>

      </el-row>




        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px">

                    <el-form-item label="接口名字" prop="username">
                        <el-input v-model="form.ipaName" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="接口内容" prop="username">
                      <el-input type="textarea" rows="4" v-model="form.ipaContent" placeholder="接口内容"></el-input>

                    </el-form-item>
                    <el-form-item label="功能id" prop="username">
                        <el-input v-model="form.functionId" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="接口地址" prop="username">
                        <el-input v-model="form.url" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="新增标识" prop="username">
                      <el-input v-model="form.status" placeholder=""></el-input>
                    </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel('form')">取 消</el-button>
                <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
                <el-button v-else type="primary" @click="update('form')">修 改</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { fetchList, addObj, putObj, delObj,getObj,newfetchList } from '@/api/yzaf_ipa'
    import waves from '@/directive/waves/index.js' // 水波纹指令
    import { mapGetters } from 'vuex'

    export default {
        name: 'table_yzaf_ipa',
        directives: {
            waves
        },
        data() {
            return {
                list: null,
                total: null,
                listLoading: true,
                newlist: null,
                newtotal: null,
                newlistLoading: true,
                listQuery: {
                    page: 1,
                    limit: 20
                },
                rules: {
                },
                form: {
                },
                dialogFormVisible: false,
                dialogStatus: '',
                    yzaf_ipa_add: false,
                    yzaf_ipa_upd: false,
                    yzaf_ipa_del: false,
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
            this.getnewList()
        },
        methods: {
            getList() {
                this.listLoading = true
                fetchList(this.listQuery).then(response => {
                    this.list = response.data.records
                    this.total = response.data.total
                    this.listLoading = false
                })
            },
          getnewList() {
           this.newlistLoading = true
            newfetchList(this.listQuery).then(response => {
              this.newlist = response.data.records
              this.newtotal = response.data.total
              this.newlistLoading = false
            })
          },
            handleSizeChange(val) {
                this.listQuery.limit = val
                this.getList()
            },
            handleCurrentChange(val) {
                this.listQuery.page = val
                this.getList()
            },
            handleUpdate(row) {
            getObj(row.id).then(response => {
              this.form = response.data.data;
              this.dialogFormVisible = true;
              this.dialogStatus = "update";
            }).catch(err => {
              console.log(err)
            });
          },
          handleFilter() {
            this.listQuery.page = 1;
            this.getList();
          },
            handleDelete(row) {
                delObj(row.id)
                        .then(response => {
                            this.dialogFormVisible = false
                            this.getList()
                            this.$notify({
                                title: '成功',
                                message: '删除成功',
                                type: 'success',
                                duration: 2000
                            })
                        })
            },
            handleCreate() {
                this.dialogStatus = 'create'
                this.dialogFormVisible = true
            },
            create(formName) {
                const set = this.$refs
                        set[formName].validate(valid => {
                    if (valid) {
                        addObj(this.form)
                                .then(() => {
                                    this.dialogFormVisible = false
                                    this.getList()
                                    this.$notify({
                                        title: '成功',
                                        message: '创建成功',
                                        type: 'success',
                                        duration: 2000
                                    })
                                })
                    } else {
                        return false
                    }
                })
            },
            cancel(formName) {
                this.dialogFormVisible = false
                const set = this.$refs
                set[formName].resetFields()
            },
            update(formName) {
                const set = this.$refs
                        set[formName].validate(valid => {
                    if (valid) {
                        this.dialogFormVisible = false
                        this.form.password = undefined
                        putObj(this.form).then(() => {
                            this.dialogFormVisible = false
                            this.getList()
                            this.$notify({
                                title: '成功',
                                message: '修改成功',
                                type: 'success',
                                duration: 2000
                            })
                        })
                    } else {
                        return false
                    }
                })
            },
        }
    }
</script>
