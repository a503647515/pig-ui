<template>
    <div class="app-container calendar-list-container">
        <div class="filter-container">
            <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加
            </el-button>
        </div>
        <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
                  highlight-current-row style="width: 100%">
            <el-table-column align="center" label="id">
                <template slot-scope="scope">
                    <span>{{ scope.row.guid }}</span>
                </template>
            </el-table-column>



            <el-table-column align="center" label="批次">
                <template slot-scope="scope">
                    <span>{{ scope.row.batchno }}</span>
                </template>
            </el-table-column>


            <el-table-column align="center" label="委托方">
                <template slot-scope="scope">
                    <span>{{ scope.row.bankname }}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="结束时间">
                <template slot-scope="scope">
                    <span>{{ scope.row.finishdate }}</span>
                </template>
            </el-table-column>
          <el-table-column align="center" label="备注">
            <template slot-scope="scope">
              <span>{{ scope.row.remark }}</span>
            </template>
          </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button  size="small" type="success"
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
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px">
                    <el-form-item label="" prop="guid">
                        <el-input  type="hidden" v-model="form.guid" placeholder=""></el-input>
                    </el-form-item>

                    <el-form-item label="批次" prop="batchno">
                        <el-input v-model="form.batchno" placeholder=""></el-input>
                    </el-form-item>


                    <el-form-item label="委托方" prop="bankname">
                        <el-input v-model="form.bankname" placeholder=""></el-input>
                    </el-form-item>

                    <el-form-item label="结束时间" prop="finishdate">
                        <el-input v-model="form.finishdate" placeholder=""></el-input>
                    </el-form-item>

              <el-form-item label="备注" prop="remark">
                <el-input v-model="form.remark" placeholder=""></el-input>
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
    import { fetchList, addObj, putObj, delObj, getObj } from '@/api/case_batch'
    import waves from '@/directive/waves/index.js' // 水波纹指令
    import { mapGetters } from 'vuex'

    export default {
        name: 'table_case_batch',
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
                rules: {
                },
                form: {
                },
                dialogFormVisible: false,
                dialogStatus: '',
                    case_batch_add: false,
                    case_batch_upd: false,
                    case_batch_del: false,
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
            this.case_batch_add = this.permissions['case_batch_add']
            this.case_batch_upd = this.permissions['case_batch_upd']
            this.case_batch_del = this.permissions['case_batch_del']
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
            handleSizeChange(val) {
                this.listQuery.limit = val
                this.getList()
            },
            handleCurrentChange(val) {
                this.listQuery.page = val
                this.getList()
            },
            handleDelete(row) {
                delObj(row.guid)
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
          handleUpdate(row) {
            getObj(row.guid).then(response => {
              this.form = response.data.data;
              this.dialogFormVisible = true;
              this.dialogStatus = "update";
            }).catch(err => {
              console.log(err)
            });
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
