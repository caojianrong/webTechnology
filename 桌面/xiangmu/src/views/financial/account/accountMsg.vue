<!--  -->
<template>
  <div class="accountMsg" style="height: 100%;">
    <div class="table_main">
      <div class="main-name">
        <img class="addIcon" src="../../../assets/images/gongsi.png" alt srcset />
        {{accountInfo.group.groupCompany}}
      </div>
      <!-- 账户余额 -->
      <div class="price_main">
        <div class="price_left">
          <p class="price_title">
            <img class="titIcon" src="../../../assets/images/zhanghuyue.png" alt srcset />
            账户余额
          </p>
          <div>
            <ul>
              <li class="left-content">
                <p class="price_num">
                  <span v-if="showBalance">{{this.accountInfo.accountBalance}}</span>
                  <span v-else>******</span>
                </p>
                <p class="price_text">可用余额(元)</p>
              </li>
              <li class="left-content">
                <p class="price_num">
                  <span v-if="showBalance">{{this.accountInfo.accountFreeze}}</span>
                  <span v-else>******</span>
                </p>
                <p class="price_text">冻结金额(元)</p>
              </li>
              <li class="left-content">
                <p class="price_btn" v-if="showBalance">
                  <img
                    src="../../../assets/images/yincang.png"
                    style="display: inline-block;width: 15px;"
                    alt
                    srcset
                  />
                  <el-button type="text" size="mini" style="color:#409EFF;padding:2px;" @click="showBalance = false">隐藏余额</el-button>
                </p>
                <p class="price_btn" v-else>
                  <img
                    src="../../../assets/images/chakan.png"
                    style="vertical-align: middle; display: inline-block;width: 13px;"
                    alt
                    srcset
                  />
                  <el-button type="text" size="mini" style="color:#409EFF;padding:2px;" @click="showBalance = true">查看余额</el-button>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div class="price_right">
          <div class="recharge" @click="toRecharge">
            <img
              src="../../../assets/images/chongzhi.png"
              style="border-radius: 50%;box-shadow: 0 0 13px rgba(32,180,180,.6);width:100%;height:100%;cursor:pointer"
              alt
              srcset
            />
          </div>
          <div class="cash" @click="toWithdraw">
            <img
              src="../../../assets/images/tixian.png"
              style="border-radius: 50%;box-shadow: 0 0 13px rgba(201,150,47,.6);width:100%;height:100%;cursor:pointer"
              alt
              srcset
            />
          </div>
          <div class="detailed" @click="toRechargeRecord">
            <img
              src="../../../assets/images/chongzhimingxi.png"
              alt
              srcset
              style="width:40px;height:40px;margin: 0 auto;cursor:pointer"
            />
            <p>账户充值明细</p>
          </div>
          <div class="detailed" @click="toWithdrawRecord">
            <img
              src="../../../assets/images/tixianmingxi.png"
              alt
              srcset
              style="width:40px;height:40px;margin: 0 auto;cursor:pointer"
            />
            <p>账户提现明细</p>
          </div>
        </div>
      </div>
      <!-- 基本信息 -->
      <div>
        <p class="price_title">
          <img class="titIcon" src="../../../assets/images/jiben.png" alt srcset />
          基本信息
        </p>
        <div class="basic">
          <div class="basic-main">
            <div class="basic_msg">
              <p class="msg_title">—— 公司信息 ——</p>
              <ul>
                <li class="msg_main">
                  <span class="msg_main_name">公司名称</span>
                  <span>{{this.accountInfo.group.groupCompany}}</span>
                </li>
                <li class="msg_main">
                  <span class="msg_main_name">纳税人识别号</span>
                  <span>{{this.accountInfo.group.groupTaxCode}}</span>
                </li>
                <li class="msg_main">
                  <span class="msg_main_name">企业类型</span>
                  <span>{{this.accountInfo.group.groupType}}</span>
                </li>
                <li class="msg_main">
                  <span class="msg_main_name">联系电话</span>
                  <span>{{this.accountInfo.group.groupMobile}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="basic-main">
            <div class="basic_msg">
              <p class="msg_title">—— 账户信息 ——</p>
              <ul>
                <li class="msg_main">
                  <span class="msg_main_name">对公账户</span>
                  <span>{{this.accountInfo.group.groupBankAccount}}</span>
                  <!--
                  <span style="margin-left: 35px;" class="msg_main_name">
                    <el-button
                      icon="el-icon-edit"
                      type="text"
                      size="mini"
                      style="color:#409EFF;padding:2px;"
                      @click="editBank()"
                    >修改</el-button>
                  </span>
                  -->
                </li>
                <li class="msg_main">
                  <span class="msg_main_name">银行账号</span>
                  <span>{{this.accountInfo.accountVirtualNo}}</span>
                </li>
                <li class="msg_main">
                  <span class="msg_main_name">开户行</span>
                  <span>{{this.accountInfo.group.groupBankName}}</span>
                </li>
                <li class="msg_main">
                  <span class="msg_main_name">支付密码</span>
                  <span>********</span>
                  <span style="margin-left: 35px;" class="msg_main_name">
                    <el-button
                      icon="el-icon-edit"
                      type="text"
                      size="mini"
                      style="color:#409EFF;padding:2px;"
                      @click="editPay()"
                    >修改</el-button>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <el-dialog title="提现" width="460px"  :visible.sync="dialogVisibleWithdraw" >
        <el-container>
          <el-main>
            <div class="auditBox">
              <el-form ref="withdrawForm" :model="withdrawForm" label-width="80px">
                <el-form-item label="提现金额">
                  <el-input type="number" v-model="withdrawForm.amount" placeholder="请输入金额"></el-input>
                </el-form-item>

                <el-form-item label="支付密码" prop="projectCustomer">
                  <el-input v-model="withdrawForm.payPwd" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="提现描述" prop="projectCustomer">
                  <el-input type="textarea" v-model="withdrawForm.desc" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-main>
          <el-footer class="addFooterCenter">
            <el-button @click="dialogVisibleWithdraw = false">取 消</el-button>
            <el-button  type="primary" @click="doWithdraw">确 定</el-button>

          </el-footer>
        </el-container>
      </el-dialog>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: "accountMsg",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
        //账户信息
        accountInfo: {
            accountBalance: '',   //可用余额
            accountFreeze: '',    //冻结金额
            accountVirtualNo: '', //银行账户

            group: {
                groupTaxCode: '', //纳税人识别号
                groupCompany: '', //公司名称
                groupType: '',    //企业类型
                groupBankAccount: '', //银行卡号
                groupMobile: '',     //联系电话
                groupBankName: '',    //开户银行
            }
        },
        showBalance: true,

        dialogVisibleWithdraw: false,
        withdrawForm:{
            amount: '', //提现金额
            desc: '', //提现描述
            payPwd: '' //支付密码
        }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
      //获取机构账户信息
      getGroupAccountInfo() {
          this.$http
              .post(
                  this.$api.PlatformPay.groupAccountInfo,null,true
              )
              .then(res => {
                  if(res.data.code == 1) {
                      var obj = res.data.data;
                      this.accountInfo.accountBalance = obj.accountBalance;  //可用余额
                      this.accountInfo.accountFreeze = obj.accountFreeze;    //冻结金额
                      this.accountInfo.group.groupCompany = obj.group.groupCompany;  //公司名称
                      this.accountInfo.group.groupTaxCode = obj.group.groupTaxCode;  //纳税人识别号
                      this.accountInfo.group.groupType = obj.group.groupType == 0 ? '一般纳税人' : '小规模';//企业类型（0一般纳税人，1小规模）
                      this.accountInfo.group.groupMobile = obj.group.groupMobile;  //联系电话
                      this.accountInfo.group.groupBankAccount = obj.group.groupBankAccount; //银行卡号
                      this.accountInfo.group.groupBankName = obj.group.groupBankName;  //开户银行
                      this.accountInfo.accountVirtualNo = obj.accountVirtualNo; //银行账户
                  }
              })
              .catch(err => {
                  this.$message({
                      showClose: true,
                      message: "失败（≧?≦）",
                      type: "error"
                  });
              })
      },
      //充值
      toRecharge(){
          this.$message({showClose: true, message: "充值请联系平台客服！", type: "warning"});
      },
      //提现
      toWithdraw(){
          this.dialogVisibleWithdraw = true;
      },
      //确定提现
      doWithdraw(){
          var param = new URLSearchParams();
          param.append("amount", this.withdrawForm.amount);
          param.append("payPwd", this.withdrawForm.payPwd);
          param.append("desc", this.withdrawForm.desc);
          this.$http
              .post(
                  this.$api.Pay.groupWithdraw,param,true
              )
              .then(res => {
                  if(res.data.code == 1)
                      this.$message({showClose: true, message: res.data.message, type: "success"});
                  else
                  this.$message({showClose: true, message: res.data.message, type: "error"});
              })
              .catch(err => {
                  this.$message({
                      showClose: true,
                      message: "失败（≧?≦）",
                      type: "error"
                  });
              })
      },
      //跳转到充值明细页面
      toRechargeRecord() {
          this.$router.push("/platform/platformpay/rechargeRecord");
      },
      //跳转到提现明细页面
      toWithdrawRecord(){
          this.$router.push("/platform/platformpay/withdrawRecord");
      }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
      this.getGroupAccountInfo();
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
/* @import url(); 引入公共css类 */
.titIcon {
  display: inline-block;
  vertical-align: middle;
  margin-left: 15px;
  margin-right: 15px;
  width: 15px;
  height: 16px;
}
.addIcon {
  vertical-align: middle;
  display: inline-block;
  margin-left: 15px;
  margin-right: 15px;
  width: 16px;
  height: 17px;
}
.msg_main_name {
  width: 25%;
  display: inline-block;
}
.msg_main {
  width: 82%;
  margin: 0 auto;
  height: 40px;
  line-height: 40px;
  margin-top: 8px;
}
.msg_title {
  height: 80px;
  line-height: 80px;
  text-align: center;
}
.basic_msg {
  width: 90%;
  background: url("../../../assets/images/yuebeijing.png") no-repeat;
  background-size: 100% 100%;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
}
.basic {
  width: 100%;
  margin-top: 30px;
}
.basic-main {
  width: 50%;
  height: 300px;
  display: inline-block;
  margin-bottom: 20px;
}
.detailed {
  margin-top: 60px;
  margin-left: 8%;
  text-align: center;
}
.detailed p {
  font-size: 13px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.price_right div {
  float: left;
}
.recharge {
  width: 90px;
  height: 90px;
  /* background: rgb(214, 177, 53); */
  border-radius: 50%;
  text-align: center;
  margin-top: 43px;
  margin-left: 15px;
  color: #fff;
  font-size: 15px;
}
.cash {
  width: 90px;
  height: 90px;
  /* background: rgb(214, 177, 53); */
  border-radius: 50%;
  text-align: center;
  margin-top: 43px;
  margin-left: 12%;
  color: #fff;
  font-size: 15px;
}
.price_btn {
  font-size: 10px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(101, 156, 254, 1);
  margin-top: 10px;
}
.price_title {
  height: 60px;
  line-height: 60px;
  font-size: 13px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(117, 124, 186, 1);
}
.price_text {
  font-size: 13px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  margin-top: 10px;
}
.price_num {
  font-size: 22px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
}
.left-content {
  width: 20%;
  text-align: center;
  margin: 10px;
  float: left;
}
.price_left {
  float: left;
  width: 40%;
  height: 100%;
}
.price_right {
  float: left;
  width: 60%;
  height: 100%;
}
.main-name {
  width: 100%;
  height: 45px;
  line-height: 45px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  font-size: 13px;
  border-bottom: 2px dashed #b5b9db;
}
.price_main {
  width: 100%;
  height: 175px;
  border-bottom: 2px dashed #b5b9db;
}
.table_main {
  width: 98%;
  margin: 0 auto;
  height: 100%;
  background: rgba(101, 156, 254, 0);
  overflow: hidden;
}
.subBtn {
  width: 240px;
  margin: 0 auto;
  display: block;
}
.radio-main {
  width: 100%;
  height: 40px;
  line-height: 40px;
  margin-bottom: 20px;
}
.radio-main .el-radio {
  width: 33%;
  text-align: center;
  height: 100%;
  line-height: 40px;
  margin: 0;
}
.line-go {
  width: 100%;
  height: 1px;
  background: rgba(238, 238, 238, 1);
  margin-bottom: 20px;
  margin-top: 30px;
}
.presentation-price {
  color: rgba(101, 156, 254, 1);
  font-size: 16px;
}
.presentation-price span {
  font-weight: bold;
}
</style>