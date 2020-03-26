<template>
  <div class="hello">
   <form name="" method="post">
  		<div style="width: 100%;">
  			<table>
  				<thead>
  					<tr>
  						<th>申报单位信息维护</th>
  					</tr>
  				</thead>
  				<tbody>
  					<tr>
  						<td style="text-align:left;"><h5>单位信息</h5></td>
  					</tr>
  					<tr>
  						<td style="text-align: -webkit-right;">
  							<span><input @click="addCompany" type="button" value="保存单位信息" /></span>
  							&nbsp;&nbsp;&nbsp;&nbsp;
  							<span><input type="button" value="打印" /></span>
  						</td>
  					</tr>
  					<!--单位信息表 -->
  					<tr>
  						<td>
  							<table>
  								<colgroup>
  									<col style="width: 12%;" />
  									<col style="width: 45%;" />
  									<col style="width: 15%;" />
  									<col style="width: 28%;" />
  								</colgroup>
  								<tbody>
  									<tr>
  										<td>单位全称：</td>
  										<td colspan="4" class="text-left">
  											<input v-model="company.fullname" type="text" />
  										</td>
  									</tr>
  									<tr>
  										<td>通讯地址：</td>
  										<td colspan="4" class="text-left">
  											<!--市级名称-->
  											<select v-model="oneLevelAddress">
  												<option>暂定内容</option>
  												<option>暂定内容</option>
  												<option>暂定内容</option>
  											</select>
  											市
  											<!--县级名称-->
  											<select v-model="twoLevelAddress">
  												<option>暂定内容</option>
  												<option>暂定内容</option>
  												<option>暂定内容</option>
  											</select>
  											县(区)
  											<!--详细地址栏-->
  											<input v-model="threeLevelAddress" type="text" name="unitAddress" title="详细地址"/>
  										</td>
  									</tr>
  									<tr>
  										<td>组织机构代码：</td>
  										<td colspan="3" class="text-left">
  											<input v-model="company.organizationCode" type="text" maxlength="25" style="width: 160px;" title="组织机构代码" />
  											<input v-model="company.troopsOrSecrecy" type="checkbox" />
  											部队单位及保密单位
  											<br />
  											<font color="red">
  												注：字母大写（格式：XXXXXXXX-X）,通过统一社会信用代码获取组织机构代码：从统一社会信用代码的第九位至第十七位，共9位数，<br />
  												在这9位数第八位和第九位之间加“-”,组成组织机构代码,如果是部队单位及保密单位，请勾上"部队单位及保密单位"选项
  											</font>
  										</td>
  									</tr>
  									<tr>
  										<td>开户银行：</td>
  										<td class="text-left">
  											<input v-model="company.bank" type="text" maxlength="50" />
  											<font color="red">     注：开户银行地址请写全称</font>
  										</td>
  										<td>账号：</td>
  										<td class="text-left">
  											<input v-model="company.accountNumber" type="text" maxlength="35"/>
  										</td>
  									</tr>
  									<tr>
  										<td>
  											邮政编码：
  										</td>
  										<td class="text-left">
  											<input v-model="company.postalCode" type="text"  maxlength="10" style="width: 160px;"/>
  										</td>
  										<td>
  											企业类单位特征：
  										</td>
  										<td class="text-left">
  											<select v-model="company.unitCharacteristics">
  												<option>暂定内容</option>
  												<option>暂定内容</option>
  												<option>暂定内容</option>
  											</select>
  										</td>
  									</tr>
  									<tr>
  										<td>单位性质：</td>
  										<td class="text-left" colspan="3" >
  											<select v-model="oneLevelUnitproperty" title="单位性质">
  												<option>暂定内容</option>
  											</select>
  											<select v-model="twoLevelUnitproperty" title="企业性质">
  												<option>暂定内容</option>
  											</select>
  										</td>
  									</tr>
  									<tr>
  										<td>单位属性：</td>
  										<td class="text-left" colspan="3">
  											<select v-model="company.unitattribute">
  												<option>--请选择--</option>
  											</select>
  										</td>
  									</tr>
  									<tr>
  										<td>单位主管部门：</td>
  										<td class="text-left">
											  <input v-model="company.competentDepartment" maxlength="50" value="单位主管部门" />
										</td>
  										<td>隶属关系：</td>
  										<td class="text-left">
  											<select v-model="company.affiliation">
  												<option>--请选择--</option>
  											</select>
  										</td>
  									</tr>
  									<tr>
  										<td colspan="4" class="text-left">
  											<strong>申报单位法人代表信息：</strong>
  										</td>
  									</tr>
  									<!--申报单位法人代表信息-->
  									<tr>
  										<td colspan="4" class="text-left">
  											<table style="width: 100%;" class="listtable">
  												<thead>
  													<tr>
  														<th>姓名</th>
  														<th>性别</th>
  														<th>
  															出生年月
  															<br />
  															<font color="red">(时间格式:2017-01-01)</font>
  														</th>
  														<th>办公电话</th>
  														<th>传真</th>
  														<th>移动电话</th>
  														<th>电子邮箱</th>
  													</tr>
  												</thead>
  												<tbody>
  													<tr>
  														<td class="text-center">
  															<input type="text" maxlength="12" title="负责人" style="width: 100px;" />
  														</td>
  														<td class="text-center">
  															<select style="width: 80px;">
  																<option>男</option>
  																<option>女</option>
  															</select>
  														</td>
  														<td class="text-center">
  															<input type="text" title="负责人出生年月" style="width: 100px;" />
  														</td>
  														<td class="text-center">
  															<input type="text" title="负责人办公电话" maxlength="25" style="width: 100px;" />
  														</td>
  														<td class="text-center">
  															<input type="text" title="负责人传真" maxlength="25" style="width: 100px;" />
  														</td>
  														<td class="text-center">
  															<input type="text" title="负责人移动电话" maxlength="25" style="width: 100px;" />
  														</td>
  														<td class="text-center">
  															<input type="text" title="负责人电子邮箱" style="width: 150px;" />
  														</td>
  													</tr>
  												</tbody>
  											</table>
  										</td>
  									</tr>
  									<tr>
  										<td colspan="4" class="text-left">
  											<strong>
  												本单位科技管理部门负责人信息：
  											</strong>
  										</td>
  									</tr>
  									<!--本单位科技管理部门负责人信息：-->
  									<tr>
  										<td colspan="4">
  											<table class="listtable">
  												  <thead>
  													<tr>
  														<th>姓名</th>
  														<th>办公电话</th>
  														<th>移动电话</th>
  														<th>职务</th>
  													</tr>
  												</thead>
  												<tbody>
  													<tr>
  														<td class="text-center">
  															<input type="text" maxlength="12" style="width: 160px;" title="单位科技管理部门负责人姓名" />
  														</td>
  														<td class="text-center">
  															<input type="text" maxlength="25" style="width: 160px;" title="单位科技管理部门负责人办公电话"/>
  														</td>
  														<td class="text-center">
  															<input type="text" maxlength="25" style="width: 160px;" title="单位科技管理部门负责人移动电话"/>
  														</td>
  														<td class="text-center">
  															<input type="text" maxlength="50" style="width: 160px;" title="单位科技管理部门负责人职务"/>
  														</td>
  													</tr>
  												</tbody>
  											</table>
  										</td>
  									</tr>
  									<tr>
  										<td class="text-left" colspan="4">
  											<strong>财务部门负责人信息</strong>
  										</td>
  									</tr>
  									<!--财务部门负责人信息-->
  									<tr>
  										<td colspan="4">
  											<table class="listtable">
  												<thead>
  													<tr>
  														<th>姓名</th>
  														<th>办公电话</th>
  														<th>移动电话</th>
  														<th>职务</th>
  													</tr>
  												</thead>
  												<tbody>
  													<tr>
  														<td class="text-center">
  															<input type="text" maxlength="12" style="width: 160px;" title="财务部门负责人姓名" />
  														</td>
  														<td class="text-center">
  															<input type="text" maxlength="25" style="width: 160px;" title="财务部门负责人职务"/>
  														</td>
  														<td class="text-center">
  															<input type="text" maxlength="25" style="width: 160px;" title="财务部门负责人办公室电话"/>
  														</td>
  														<td class="text-center">
  															<input type="text" maxlength="50" style="width: 160px;" title="财务部门负责人移动电话"/>
  														</td>
  													</tr>
  												</tbody>
  											</table>
  										</td>
  									</tr>
  									<tr>
  										<td colspan="4" class="text-left">
  											<strong>
  												初审单位选择
  												<font color="red">
  													(红色字体的初审单位暂未注册授权,无法初审项目)
  												</font>
  											</strong>
  										</td>
  									</tr>
  									<!--初审单位选择-->
  									<tr>
  										<td colspan="4">
  											<table class="listtable">
  												<thead>
  													<tr>
  														<th>初审单位类型</th>
  														<th>初审单位名称</th>
  													</tr>
  												</thead>
  												<tbody>
  													<td class="text-center">
  														<select style="width: 160px;" title="初审单位类型">
  															<option>--请选择--</option>
  														</select>
  													</td>
  													<td class="text-center">
  														<select style="width: 160px;" title="初审单位名称">
  															<option>--请选择--</option>
  														</select>
  													</td>
  												</tbody>
  											</table>
  										</td>
  									</tr>
  								</tbody>
  							</table>
  						</td>
  					</tr>
  					<tr>
  							<td>
  									<table class="listtable">
  										<colgroup>
  											<col width="50%" />
  											<col width="50%" />
  										</colgroup>
  											<tbody>
  												<tr>
														<td class="text-left">企业股东</td>
														<td>
															<input @click="addShareholder" type="button" value="增加" />
															<input type="button" value="删除" />
														</td>
												</tr>
  										</tbody>
  									</table>
  								</td>
  						</tr>
  						<tr>
  							<td>
  								<el-form ref="shareholder">
									  <table class="listtable">
  									<colgroup>
  										<col width="3%" />
  										<col width="5%" />
  										<col width="30%" />
  										<col width="15%" />
  										<col width="15%" />
  										<col width="15%" />
  										<col width="15%" />
  									</colgroup>
  									<thead>
  											<tr>
  												<th>&nbsp;</th>
  												<th>序号</th>
  												<th>股东名称</th>
  												<th>股东国别</th>
  												<th>股东性质</th>
  												<th>投资类型</th>
  												<th>投资比例</th>
  											</tr>
  									</thead>
  									<tbody>
  										<tr>
  											<td>
  												<input class="input-none" type="checkbox"/>
  											</td>
												<td>
													<input style="width: 30px;" maxlength="2" class="input-none" type="text" title="序号" />
												</td>
												<td>
													<input v-model="shareholder.name" style="width: 320px;" maxlength="50" class="input-none" type="text" title="股东名称"/>
												</td>
												<td>
													<input v-model="shareholder.nationality" style="width: 150px;" maxlength="50" class="input-none" type="text" title="股东国别"/>
												</td>
												<td>
													<select v-model="shareholder.shareholderNature" style="width: 120px;" title="股东性质">
														<option>--请选择--</option>
													</select>
												</td>
												<td>
													<select v-model="shareholder.investmentType" style="width: 120px;" title="投资类型">
														<option>--请选择--</option>
													</select>
												</td>
												<td><input v-model="shareholder.proportion" style="width: 120px;" maxlength="10" title="投资比例" type="text" />%</td>
  										</tr>
  									</tbody>
  								</table>
								  </el-form>
  							</td>
  						</tr>
  						<tr>
  							<td>
  								<table class="listtable">
  									<colgroup>
  										<col width="25%" />
  										<col width="25%" />
  										<col width="25%" />
  										<col width="25%" />
  									</colgroup>
  									<tbody>
  										<tr>
  											<td>信用等级：</td>
  											<td class="text-left">
  												<select style="width: 100px;" title="信用等级">
  													<option>--请选择--</option>
  												</select>
  											</td>
  											<td>注册时间：</td>
  											<td class="text-left">
  												<input type="text" style="width: 100px" title="注册时间" />
  												<font color="red">(时间格式:2017-01-01)</font>
  											</td>
  										</tr>
  										<tr>
  											<td>注册资金：</td>
  											<td class="text-left">
  												<input type="text" style="width: 100px;" title="注册资金" />
  											</td>
  											<td>
  												其中外资(含港澳台)比例：
  											</td>
  											<td class="text-left">
  												<input type="text" style="width: 100px;" maxlength="3" title="其中外资(含港澳台)比例"/>
  												%
  											</td>
  										</tr>
  										<tr>
  											<td>职工总数：</td>
  											<td colspan="3" class="text-left">
  												<input type="text" style="width: 100px;" title="职工总数"/>
  												<b>(人)</b>
  											</td>
  										</tr>
  										<tr>
  											<td class="text-left" colspan="3">
  												<strong>其中：</strong>
  											</td>
  										</tr>
  										<tr>
  											<td colspan="4">
  												<table class="listtable">
  													<thead>
				  											<tr>
				  												<th>大专以上人数</th>
				  												<th>其中：研究开发人员</th>
				  												<th>其中：大学本科以上人员数</th>
				  												<th>中层以上管理人员总数</th>
				  												<th>高级职称人数</th>
				  												<th>中级职称人数</th>
				  											</tr>
				  									</thead>
				  									<tbody>
				  										<tr>
				  											<td class="text-center">
				  												<input type="text" maxlength="9" style="width: 100px;" title="大专以上人数" />
				  												<b>(人)</b>
				  											</td>
				  											<td class="text-center">
				  												<input type="text" maxlength="9" style="width: 100px;" title="研究开发人员" />
				  												<b>(人)</b>
				  											</td>
				  											<td class="text-center">
				  												<input type="text" maxlength="9" style="width: 100px;" title="其中大学本科以上人员数" />
				  												<b>(人)</b>
				  											</td>
				  											<td class="text-center">
				  												<input type="text" maxlength="9" style="width: 100px;" title="中层以上管理人员总数" />
				  												<b>(人)</b>
				  											</td>
				  											<td class="text-center">
				  												<input type="text" maxlength="9" style="width: 100px;" title="高级职称人数" />
				  												<b>(人)</b>
				  											</td>
				  											<td class="text-center">
				  												<input type="text" maxlength="9" style="width: 100px;" title="中级职称人数" />
				  												<b>(人)</b>
				  											</td>
				  										</tr>
				  									</tbody>
  												</table>
  											</td>
  										</tr>
  										<tr>
  											<td>上年度企业总收入：</td>
  											<td class="text-left">
  												<input type="text" maxlength="10" style="width: 100px;" title="" />
  												<b>(万元)</b>
  											</td>
  											<td>上年度企业净利润：</td>
  											<td class="text-left">
  												<input type="text" maxlength="10" style="width: 100px;" title="" />
  												<b>(万元)</b>
  											</td>
  										</tr>
  										<tr>
  											<td>上年度产品销售收入：</td>
  											<td class="text-left">
  												<input type="text" maxlength="10" style="width: 100px;" title="" />
  												<b>(万元)</b>
  											</td>
  											<td>上年度企业交税总额：</td>
  											<td class="text-left">
  												<input type="text" maxlength="10" style="width: 100px;" title="" />
  												<b>(万元)</b>
  											</td>
  										</tr>
  										<tr>
  											<td>上年度工业增加值：</td>
  											<td class="text-left">
  												<input type="text" maxlength="10" style="width: 100px;" title="" />
  												<b>(万元)</b>
  											</td>
  											<td>上年度企业创汇总额：</td>
  											<td class="text-left">
  												<input type="text" maxlength="10" style="width: 100px;" title="" />
  												<b>(万元)</b>
  											</td>
  										</tr>
  										<tr>
  											<td>上年末企业总资产：</td>
  											<td class="text-left">
  												<input type="text" maxlength="10" style="width: 100px;" title="" />
  												<b>(万元)</b>
  											</td>
  											<td>上年度企业技术开发经费支出额：</td>
  											<td class="text-left">
  												<input type="text" maxlength="10" style="width: 100px;" title="" />
  												<b>(万元)</b>
  											</td>
  										</tr>
  										<tr>
  											<td>上年末企业负债总额：</td>
  											<td class="text-left">
  												<input type="text" maxlength="10" style="width: 100px;" title="" />
  												<b>(万元)</b>
  											</td>
  											<td>上年度企业资产负债率：</td>
  											<td class="text-left">
  												<input type="text" maxlength="10" style="width: 100px;" title="" />
  												<b>%</b>
  											</td>
  										</tr>
  									</tbody>
  								</table>
  							</td>
  						</tr>
  						<tr>
  							<td>
  								<table class="listtable">
  									<tbody>
  										<tr>
  											<td class="text-left" style="font-size: 11px;line-height: normal;color: #666666;">
  												注：电话、传真格式为：区号-电话号码，例如：024-12345678
  											</td>
  										</tr>
  									</tbody>
  								</table>
  							</td>
  						</tr>
  						<tr>
  							<td style="width: 100%;">
  								<table>
  									<colgroup>
  										<col width="50%" />
  										<col width="50%" />
  									</colgroup>
  									<tbody>
  										<tr>
  											<td class="text-left">
  												<strong>近三年单位使用政府资金</strong>
  											</td>
  											<td>
  												<input type="button" value="增加" />
  												<input type="button" value="删除" />
  											</td>
  										</tr>
  									</tbody>
  								</table>
  							</td>
  						</tr>
  						<tr>
  							<td style="width: 100%;">
  								<table class="listtable">
  									<colgroup>
  										<col width="3%" align="left" />
  										<col width="5%" align="left" />
  										<col width="30%" align="left" />
  										<col width="15%" align="left" />
  										<col width="15%" align="left" />
  										<col width="15%" align="left" />
  										<col width="15%" align="left" />
  									</colgroup>
  									<thead>
				  						<tr>
				  							<th>&nbsp;</th>
				  							<th>序号</th>
				  							<th>项目名称</th>
				  							<th>经费下达部门</th>
				  							<th>经费下达时间</th>
				  							<th>经费总额(单位：万元)</th>
				  							<th>项目是否已验收</th>
				  							</tr>
				  					</thead>
				  					<tbody>
				  						<td>
				  							<input type="checkbox" class="input-none" />
				  						</td>
				  						<td>
				  							<input type="text" maxlength="2" style="width: 30px;" title="序号"/>
				  						</td>
				  						<td>
				  							<input style="width: 320px;" maxlength="35" type="text" title="项目名称" />
				  						</td>
				  						<td>
				  							<input style="width: 150px;" maxlength="35" type="text" title="经费下达部门" />
				  						</td>
				  						<td>
				  							<input style="width: 150px;" maxlength="50" type="text" title="经费下达时间" />
				  						</td>
				  						<td>
				  							<input style="width: 150px;" maxlength="50" type="text" title="经费总额" />
				  						</td>
				  						<td>
				  							<select style="width: 120px;" title="项目是否已验收">
				  								<option>--请选择--</option>
				  							</select>
				  						</td>
				  					</tbody>
  								</table>
  							</td>
  						</tr>
  				</tbody>
  			</table>
  		</div>
   </form>
  </div>
</template>

<script>
import request from '@/router/axios'
export default {
  name: 'Declare',
  data () {
	  return{
		  shareholder:{
			  id:'',
			  companyId:'',
			  name:'',//股东名称
			  nationality:'',//股东国别
			  shareholderNature:'',
			  proportion:'',//投资比例
			  investmentType:''//投资类型
		  },
		  city:'',//市
		  county:'',//县
		  street:'',//详细地址
		  unit:'',
		  property:'',
		  company:{
			  fullname:'',
			  oneLevelAddress:'',
			  twoLevelAddress:'',
			  threeLevelAddress:'',
			  organizationCode:'',
			  troopsOrSecrecy:false,
			  bank:'',
			  postalCode:'',
			  oneLevelUnitproperty:'',
			  twoLevelUnitproperty:'',
			  unitattribute:'',
			  competentDepartment:'',
			  accountNumber:'',
			  unitCharacteristics:'',
			  affiliation:''
		  }
	  }
  },
  methods:{
	  addShareholder(){
		request.post('http://localhost:8081/shareholder/insert',this.$qs.stringify(this.shareholder))
		.then((req) => {})
		.catch((err) => {console.log(err)})
	  },
	  addCompany(){//单位信息注册
		  this.company.address = this.city + this.county + this.street
		  this.unitproperty = this.unit + this.property
		  request.post('http://localhost:8081/company/insert',this.$qs.stringify(this.company))
		  .then((req) => {
		  }).catch((err) => {
			  console.log(err)
		  })
	  }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table{
	width: 100%;
	white-space: normal;
	line-height: normal;
	font-weight: normal;
	font-style: normal;
	/*color: -internal-quirk-inherit;*/
	text-align: start;
	font-variant: normal;
}
tr td{
	text-align: right;
}

table tr{
	height: 20px;
}

input{
	width: 160px;
}
.input-none{
	width: auto;
}
.text-left{
	text-align: left;
}

.text-center{
	text-align: center;
}

select{
	width: 120px;
}

table.listtable{
	font-family: Arial, Helvetica, sans-serif;
    font-size: 20px;
    width: 100%;
    border: 1px solid #C5D9E8;
    background-color: #FFFFFF;
    word-break: break-all;
    table-layout: auto;
}
tbody{
		font-size: 12px;
		color: #000000;
}
tr{
	display: table-row;
	vertical-align: inherit;
	border-color:inherit ;
}
table.listtable th{
	color: #405368;
	background-color: #DAE4ED;
	padding: 2px;
	text-align: center;
	cursor: default;
}
table,th{
	font-size: 12px;
	font-weight: normal;
}
thead,th{
	font-size: 12px;
	color: #FFFFFF;
	background: #777777;
	padding: 2px;
	text-align: center;
	font-weight: normal;
}
</style>
