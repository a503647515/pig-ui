<template>
  <div style="height:100%;overflow: auto">
    <el-row>
      <el-col :span="4">
        <!-- <el-button type="primary" @click="goback()">返回</el-button>-->
        <div class="plan">
          <el-container>
            <el-header>
              <div class="grid-content">
                <el-input
                  @keyup.enter.native="handleFilter"
                  v-model="listQuery.key"
                  placeholder="请输入内容">
                  <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
              </div>
            </el-header>

            <el-main>
              <div class="grid-content">

                <el-table :data="list" v-loading="listLoading" border fit
                          highlight-current-row style="width: 100%"
                >
                  <el-table-column align="center" label="姓名">
                    <template slot-scope="scope">
                  <span>
                     <template v-if="scope.row.name===caseInfo.name">
                         <el-button
                           class="filter-item"
                           type="primary"
                           size="mini" @click="handleOne(scope.row.guid)">{{ scope.row.name }}</el-button>
                     </template>
                      <template v-else>
                         <el-button
                           class="filter-item"
                           size="mini" @click="handleOne(scope.row.guid)">{{ scope.row.name }}</el-button>
                     </template>

                    </span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="金额">
                    <template slot-scope="scope">
                      <span>{{ scope.row.balance }}</span>
                    </template>
                  </el-table-column>
                </el-table>
                <div v-show="!listLoading" class="pagination-container mt10">
                  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                 :current-page.sync="listQuery.page"
                                 background
                                 :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                                 layout="prev, pager, next" :total="total">
                  </el-pagination>
                </div>
              </div>
            </el-main>

          </el-container>
        </div>
      </el-col>
      <el-col :span="11">
        <div>
          <el-collapse v-model="activeNames">
            <el-collapse-item :title="`个人信息 批次:${caseInfo.batchno} 类别:${caseInfo.batchnoType} `" name="1">
              <el-row>
                <el-col :span="6"> {{caseInfo.name}}</el-col>
                <el-col :span="9">委案总金额:{{caseInfo.balance}}</el-col>
                <el-col :span="9">性别:{{caseInfo.sex}}</el-col>
              </el-row>
              <hr/>
              <el-row>

                <el-col :span="6">手机:{{caseInfo.mobile}}</el-col>
                <el-col :span="9">身份证:{{caseInfo.certno}}</el-col>
                <el-col :span="9">部门:{{caseInfo.deptname}}</el-col>
              </el-row>
              <hr/>
              <el-row>
                <el-col :span="6">家庭电话:{{caseInfo.hometel}}</el-col>
                <el-col :span="9">电子邮件:{{caseInfo.email}}</el-col>
                <el-col :span="9">卡号:{{caseInfo.cardno}}</el-col>

              </el-row>
              <hr/>
              <el-row>
                <el-col :span="6">联系人姓名:{{caseInfo.attribute4}}</el-col>
                <el-col :span="9">联系人电话:{{caseInfo.attribute6}}</el-col>
                <el-col :span="9">联系人地址:{{caseInfo.attribute5}}</el-col>

              </el-row>

            </el-collapse-item>
            <el-collapse-item title="卡信息" name="2">
              <el-row>
                <el-col :span="6">支行:{{caseInfo.branch}}</el-col>
                <el-col :span="9">委托日期:{{caseInfo.openDate}}</el-col>
                <el-col :span="9">委案结束日期:{{caseInfo.closedate}}</el-col>
              </el-row>
              <hr/>

              <el-row>
                <el-col :span="6">开户日:{{caseInfo.loandate}}</el-col>
                <el-col :span="9">额度:{{caseInfo.credit}}</el-col>
                <el-col :span="9">最近还款日期:{{caseInfo.lastpaydate}}</el-col>
              </el-row>
              <hr/>
              <el-row>
                <el-col :span="6">最低缴款金额:{{caseInfo.lastpaysum}}</el-col>
                <el-col :span="9">账单日:{{caseInfo.billdate}}</el-col>
                <el-col :span="9">逾期级别:{{caseInfo.level}}</el-col>
              </el-row>
              <hr/>
              <el-row>
                <el-col :span="6">逾期本金:{{caseInfo.overduecorpus}}</el-col>
                <el-col :span="9">逾期利息:{{caseInfo.overinterest}}</el-col>
                <el-col :span="9">违约金:{{caseInfo.wyj}}</el-col>
              </el-row>
              <hr/>


              <el-row>
                <el-col :span="6">最近缴款日期:{{caseInfo.lastpaydate}}</el-col>
                <el-col :span="9">最近缴款金额:{{caseInfo.lastpromisemoney}}</el-col>
                <el-col :span="9">当前账单更新金额:{{caseInfo.lastpaytype}}</el-col>
              </el-row>
              <hr/>


            </el-collapse-item>

            <el-collapse-item title="地址信息" name="3">
              <el-row>
                <el-col :span="6">{{caseInfo.attribute11}}</el-col>
                <el-col :span="9">{{caseInfo.attribute12}}</el-col>
                <el-col :span="9">{{caseInfo.attribute13}}</el-col>
              </el-row>
              <hr/>
              <el-row>
                <el-col :span="6">{{caseInfo.attribute14}}</el-col>
                <el-col :span="9">{{caseInfo.attribute15}}</el-col>
                <el-col :span="9">{{caseInfo.attribute16}}</el-col>
              </el-row>
              <hr/>
              <el-row>
                <el-col :span="6">{{caseInfo.attribute17}}</el-col>
                <el-col :span="9">{{caseInfo.attribute18}}</el-col>
                <el-col :span="9">{{caseInfo.attribute19}}</el-col>
              </el-row>
              <hr/>

              <el-row>
                <el-col :span="6"></el-col>
                <el-col :span="9"></el-col>
                <el-col :span="9">{{caseInfo.attribute20}}</el-col>
              </el-row>


              <div>账单地址:{{caseInfo.addr}}</div>
              <div>家庭地址:{{caseInfo.homeaddr}}</div>
              <div>部门地址:{{caseInfo.deptaddr}}</div>
            </el-collapse-item>


          </el-collapse>
          <!-- 基本信息 结束-->
          <el-row>
            <el-form :model="ruleForm2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">

              <el-form-item label="用户名" prop="username" v-show="false">
                <el-input type="hidden" :value="caseInfo.name"></el-input>
              </el-form-item>
              <el-form-item label="通话人" prop="cname">
                <el-input v-model="ruleForm2.cname" placeholder="通话人"></el-input>
              </el-form-item>

              <el-form-item label="手机号" prop="cellphone" v-show="true">
                <el-input v-model="ruleForm2.cellphone" placeholder="通话的号码"></el-input>
              </el-form-item>


              <el-form-item label="还款时间" prop="paytime">
                <el-date-picker
                  v-model="ruleForm2.paytime"
                  type="date"
                  placeholder="还款时间">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="记录时间" prop="teltime" v-show="false">
                <el-input v-model="ruleForm2.teltime" placeholder="记录时间"></el-input>
              </el-form-item>


              <el-form-item label="催收内容" prop="content">
                <el-input type="textarea" @input="descInput()" maxlength="200" rows="4" v-model="ruleForm2.content"
                          placeholder="催收内容"></el-input>
                <span class="text" style="float: right;color: #909399;margin-right: 55px;">已输入{{remnant}}/200字</span>
              </el-form-item>

              <el-form-item label="备注" prop="attitude">
                <el-input type="textarea" rows="4" v-model="ruleForm2.attitude" placeholder="备注"></el-input>
              </el-form-item>

              <el-form-item label="标记" prop="display">
                <el-switch v-model="ruleForm2.display"></el-switch>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-row>

          <!-- 下-->
        </div>
      </el-col>
      <el-col :span="9">
        <div class="plan">
          <template>
            <el-tabs value="first">
              <el-tab-pane label="通话记录" name="first">

                <el-dialog title="查看通话记录" :visible.sync="conectionFormVisible">

                  <el-form :model="conectionform" ref="conectionform" label-width="100px" class="demo-ruleForm">

                    <el-form-item label="用户名" prop="username" v-show="false">
                      <el-input v-model="conectionform.cellphone"></el-input>
                    </el-form-item>

                    <el-form-item label="手机号" prop="cellphone">
                      <el-input v-model="conectionform.cellphone"></el-input>
                    </el-form-item>

                    <el-form-item label="对象" prop="cname">
                      <el-input v-model="conectionform.cname" placeholder="通话人"></el-input>
                    </el-form-item>

                    <el-form-item label="还款时间" prop="paytime">
                      <el-input v-model="conectionform.paytime" placeholder="承诺还款时间"></el-input>
                    </el-form-item>

                    <el-form-item label="记录时间" prop="teltime">
                      <el-input v-model="conectionform.teltime" placeholder="记录时间"></el-input>
                    </el-form-item>
                    <el-form-item label="催收内容" prop="content">
                      <el-input type="textarea" rows="4" v-model="conectionform.content"></el-input>
                    </el-form-item>
                  </el-form>
                </el-dialog>
                <el-table :data="telList" v-loading="tellistLoading" element-loading-text="不需要时间" border fit
                          highlight-current-row style="width: 100%" @sort-change="sortByTimes">
                  <el-table-column min-width="15%" align="center" label="通话人">
                    <template slot-scope="scope">
                      <el-button size="small" type="success" @click="handleUpdate(scope.row)">{{ scope.row.cname }}
                      </el-button>

                    </template>
                  </el-table-column>

                  <el-table-column min-width="20%" align="center" label="通话号码">
                    <template slot-scope="scope">
                      <span>{{ scope.row.cellphone }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column min-width="22%" align="center" :sortable="'custom'" prop="row.teltime" label="记录时间">
                    <template slot-scope="scope">
                      <span>{{ scope.row.inputtime}}</span>
                    </template>
                  </el-table-column>

                  <el-table-column min-width="32%" align="center" label="通话记录">
                    <template slot-scope="scope">
                      <span>{{ scope.row.teltime}}</span>
                    </template>
                  </el-table-column>

                  <el-table-column min-width="12%" align="center" label="操作员">
                    <template slot-scope="scope">
                      <span>{{ scope.row.inputuserid }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="新建联系人" name="second">
                <!--修改联系人-->
                <el-dialog @close="editDialogClosed" title="修改用户" :visible.sync="editDialogVisible" width="50%">
                  <el-form :model="conectionform" :rules="rules" ref="conectionform" label-width="100px"
                           class="demo-ruleForm">

                    <el-form-item label="姓名" prop="name">
                      <el-input v-model="conectionform.name" placeholder="姓名" disabled></el-input>
                    </el-form-item>

                    <el-form-item label="手机号" prop="cellphone">
                      <el-input v-model="conectionform.cellphone" prop="cellphone" placeholder="手机号"></el-input>
                    </el-form-item>

                    <el-form-item label="关系" prop="relation">
                      <el-input v-model="conectionform.relation" prop="relation" placeholder="关系"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" prop="remark">
                      <el-input type="textarea" rows="4" v-model="conectionform.remark" placeholder="备注"></el-input>
                    </el-form-item>
                    <!--                <el-form-item>-->
                    <!--                  <el-button type="primary" @click="submitForm3('ruleForm3')">提交</el-button>-->
                    <!--                </el-form-item>-->
                  </el-form>
                  <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取消修改</el-button>
              <el-button type="primary" @click="editUserInfo">确认修改</el-button>
              </span>
                </el-dialog>
                <el-dialog title="创建联系人" :visible.sync="dialogFormVisible">

                  <el-form :model="ruleForm3" :rules="rules" ref="ruleForm3" label-width="100px" class="demo-ruleForm">

                    <el-form-item label="姓名" prop="name">
                      <el-input v-model="ruleForm3.name" placeholder="姓名"></el-input>
                    </el-form-item>

                    <el-form-item label="手机号" prop="cellphone">
                      <el-input v-model="ruleForm3.cellphone" placeholder="手机号"></el-input>
                    </el-form-item>

                    <el-form-item label="关系" prop="relation">
                      <el-input v-model="ruleForm3.relation" placeholder="关系"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" prop="remark">
                      <el-input type="textarea" rows="4" v-model="ruleForm3.remark" placeholder="备注"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="submitForm3('ruleForm3')">提交</el-button>
                    </el-form-item>
                  </el-form>
                </el-dialog>
                <el-button class="filter-item mb15" style="margin-left: 10px;" size="mini" @click="handleCreate"
                           type="success" icon="edit">添加联系人
                </el-button>


                <el-table @row-dblclick="showEditDialog" :data="contactsList" v-loading="tellistLoading"
                          element-loading-text="不需要时间" border fit
                          highlight-current-row style="width: 100%">
                  <el-table-column align="center" label="序号">
                    <template slot-scope="scope">
                      <span>{{ scope.$index+1 }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="姓名">
                    <template slot-scope="scope">
                      <el-button class="filter-item" type="primary" size="mini"
                                 @click="selectOne(scope.row)">{{ scope.row.name }}
                      </el-button>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="关系">
                    <template slot-scope="scope">
                      <span>{{ scope.row.relation }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="通话号码">
                    <template slot-scope="scope">
                      <span>{{ scope.row.cellphone }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="备注">
                    <template slot-scope="scope">
                      <span>{{ scope.row.remark }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="回款信息" name="third">
                <el-table :data="backmoneyList" v-loading="tellistLoading" element-loading-text="不需要时间" border fit
                          highlight-current-row style="width: 100%">
                  <el-table-column align="center" label="序号">
                    <template slot-scope="scope">
                      <span>{{ scope.$index+1 }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="姓名">
                    <template slot-scope="scope">
                      <el-button class="filter-item" type="primary" size="mini"
                                 @click="selectOne(scope.row)">{{ scope.row.name }}
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <!--              <el-button type="primary" @click="fileSaver()">{{$t('public.fileSaver')}}</el-button>-->
            </el-tabs>
          </template>
        </div>
      </el-col>
    </el-row>
  </div>


</template>
<script>
  /* eslint-disable space-before-blocks,semi */

  // eslint-disable-next-line no-unused-vars
  import {getCaseObj, fetchList, telList, contactsList, backmoneyList, sortByTimes,} from '@/api/case_info';
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import {mapGetters} from 'vuex'
  import request from '@/router/axios';
  import AvueIframe from '../../../components/iframe/main';


  export default {
    name: 'case_info',
    directives: {
      waves
    },
    computed: {
      ...mapGetters([
        'permissions'
      ])
    },
    components: {AvueIframe},
    data() {
      // 验证邮箱的规则
      let checkMobile = (rule, value, cb) => {
        // 验证手机号的正则表达式
        const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

        if (regMobile.test(value)) {
          return cb()
        }

        cb(new Error('请输入合法的手机号'))
      }

      let checkRelationship = (rule, value, cb) => {
        if (value === "") {
          return cb(new Error('您的关系不能为空'))
        }
        return cb()
      }
      let checkUsername = (rule, value, cb) => {
        if (value === "") {
          return cb(new Error('您的姓名不能为空'))
        }
        return cb()
      }


      return {
        remnant: 0, // 输入数
        list: null,
        telList: null,
        contactsList: null,
        backmoneyList: null,
        tellistLoading: true,
        dialogFormVisible: false,
        conectionFormVisible: false,
        // 修改对话框
        editDialogVisible: false,
        conectionform: {
          guid: '',
          cid: this.$route.query.cid,
          cname: '',
          cellphone: '',
          promisemoney: '',
          paytime: '',
          resutl: '',
          content: '',
          inputtime: "",
        },
        total: null,
        telListQuery: {
          cid: this.$route.query.cid,
          page: 1,
          limit: 20,
          sort: "DESC",
        },
        listLoading: true,
        listQuery: {
          isMine: this.$route.query.isMine,
          bankname: this.$route.query.bankname,
          batchnoType: this.$route.query.batchnoType,
          ownerid: this.$route.query.ownerid,
          batchno: this.$route.query.batchno,
          page: this.$route.query.page || 1,
          limit: 20
        },
        ruleForm2: {
          cid: this.$route.query.cid,
          cname: '',
          cellphone: '',
          promisemoney: '',
          paytime: '',
          attitude: '',
          teltime: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + (new Date().getDate()) + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds(),
          content: ''
        },
        ruleForm3: {
          cid: this.$route.query.cid
        },
        rules: {
          cellphone: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            {validator: checkMobile, trigger: 'blur'}
          ],
          relation: [
            {required: true, trigger: 'blur', message: '请输入内容'},
            {validator: checkRelationship, trigger: "blue"}
          ],
          name: [
            {required: true, min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'},
            {validator: checkUsername, trigger: 'blur'}
          ],

        },
        caseInfo: null,
        activeNames: ['1', '2']
      };
    },
    mounted() {
      // alert(this.listQuery.page);// = 3;

      //   console.log(this.$route)
      getCaseObj(this.$route.query.cid).then(response => {
        const obj = response.data.data;
        this.caseInfo = obj;
        this.ruleForm2.cname = this.caseInfo.name;
        this.ruleForm2.attitude = this.caseInfo.attribute1;
      });
      this.getList();
      this.getTelList();
      this.getContactsList();
      this.getBackmoneyList();
    },

    methods: {

      // 计算输入数
      descInput() {
        // alert ( this.ruleForm2.content.length);
        let txtVal = this.ruleForm2.content.length;

        this.remnant = txtVal;
      },

      selectOne(row) {
        this.ruleForm2.cname = row.name;
        this.ruleForm2.cellphone = row.cellphone;
      },
      goback() {
        this.$router.back();
      },
      handleOne(nid) {
        const url = 'caseInfo?cid=' + nid + '&bankname=' + this.$route.query.bankname + '&batchno=' + this.$route.query.batchno +
          '&ownerid=' + this.$route.query.ownerid + '&batchnoType=' + this.$route.query.batchnoType;

        this.backId = nid;
        this.$router.push({
          path: '/caseInfo', query:
            {
              cid: nid,
              isMine: this.$route.query.isMine,
              batchno: this.$route.query.batchno,
              ownerid: this.$route.query.ownerid,
              batchnoType: this.$route.query.batchnoType,
              bankname: this.$route.query.bankname,
              page: this.listQuery.page
            }
        });
        location.reload(url);
      },
      getList() {
        this.listLoading = true
        fetchList(this.listQuery).then(response => {
          this.list = response.data.records
          this.total = response.data.total
          this.listLoading = false
        })
      },
      getTelList() {
        this.tellistLoading = true
        telList(this.telListQuery).then(response => {
          this.telList = response.data.records
          this.tellistLoading = false
        })
      },
      getContactsList() {
        contactsList(this.telListQuery).then(response => {
          this.contactsList = response.data.records
        })
      },
      getBackmoneyList() {
      backmoneyList(this.telListQuery).then(response => {
         this.backmoneyList = response.data.records
       })
      },
      submitForm(formName) {
        request({
          url: '/admin/telRecord/insert',
          method: 'post',
          data: this.ruleForm2
        })
          .then(response => {
            if (response.data.data) {
              this.getTelList();
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 2000
              });
            } else {
              this.$notify({
                title: '失败',
                message: response.data.msg,
                type: 'error',
                duration: 2000
              })
            }
            // 清空提交后的内容
            this.$refs[formName].resetFields();
            this.ruleForm2.attitude = ''
          })
      },
      submitForm3(formName) {

        this.$refs.ruleForm3.validate(async valid => {
            if (!valid) return
          request({
            url: '/admin/admin/caseContacts/insert',
            method: 'post',
            data: this.ruleForm3
          })
            .then(response => {
              if (response.data.data) {
                this.getContactsList();
                this.dialogFormVisible = false;
                this.$notify({
                  title: '成功',
                  message: '修改成功',
                  type: 'success',
                  duration: 2000
                });
              } else {
                this.$notify({
                  title: '失败',
                  message: response.data.msg,
                  type: 'error',
                  duration: 2000
                })
              }
            })
            })

      },
      handleUpdate(row) {
        this.conectionform = row;
        this.conectionFormVisible = true;
      },
      handleCreate() {
        this.dialogFormVisible = true;
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
      },
      // 重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.ruleForm2.attitude = ''
      },
      // 展示用户修改的对话框
      showEditDialog(row) {
        this.conectionform = row;
        this.editDialogVisible = true;
      },
      // 监听修改用户对话框的关闭事件
      editDialogClosed() {
        this.$refs.conectionform.resetFields();
      },
      //修改用户信息并提交
      editUserInfo() {

        this.$refs.conectionform.validate(async valid => {

          if (!valid) return
          //发起修改用户信息数据请求
          this.editDialogVisible = true
          const {data: res} = await this.$http.post('/admin/admin/caseContacts/update', {

            cellphone: this.conectionform.cellphone,
            relation: this.conectionform.relation,
            remark: this.conectionform.remark,
            guid: this.conectionform.guid,

          }).then(response => {
            this.getContactsList()
            this.editDialogVisible = false
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success',
              duration: 2000
            });
          })

        })
      },
      //排序
      sortByTimes(column) {
        console.log(this.conectionform)
        console.log(column);
        this.telListQuery.page = 1;
        if (column.order == "descending") {
          this.telListQuery.sort = "DESC"
        } else {
          this.telListQuery.sort = "ASC"
        }
        sortByTimes(this.telListQuery).then(response => {
          this.telList = response.data.records
          this.total = response.data.total
        })
      },


    }
  }
</script>

<style lang="scss">
  .plan {
    margin: 15px 8px;
    background: #fff;
    min-height: 100%;
    height: auto;
    overflow: hidden;
    border-radius: 5px;
    box-sizing: border-box;
  }
</style>

