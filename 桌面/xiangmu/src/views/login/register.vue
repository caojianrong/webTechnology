<!--  -->
<template>
  <div class="regbox">
    <div class="top_image">
      <img src="../../assets/images/reg_header.png" alt srcset />
    </div>
    <div class="reg">
      <el-steps :active="active" align-center finish-status="success">
        <el-step title="企业信息" style="text-align:center"></el-step>
        <el-step title="基本信息" style="text-align:center"></el-step>
        <!-- <el-step title="财务信息" style="text-align:center"></el-step> -->
      </el-steps>
      <div class="account Shipper" v-if="active === 0">
        <div>
          <el-form
            :model="registeForm"
            :rules="registeRules"
            ref="registeForm"
            label-width="120px"
            class="demo-ruleForm"
            style="margin-left: 50px;"
          >
            <ul>
              <li class="account_login">
                已有账号，马上
                <a href="javascript:;" @click="LoginBtn">登录</a>
              </li>
            </ul>

            <el-form-item label="营业执照照片" prop="groupBusinessLicense" style="text-align: left">
              <el-upload
                class="upload-demo"
                action
                :before-upload="beforeUpload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="fileList"
                :http-request="uploadBusiness"
                v-loading.fullscreen.lock="uploadLoading"
                element-loading-text="上传中......"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
              >
                <el-button class="upload-btn" size="small" type="primary">选择文件</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="货主企业名" prop="groupCompany">
              <el-input v-model="registeForm.groupCompany" placeholder="请输入企业名"></el-input>
            </el-form-item>
            <el-form-item label="纳税人识别号" prop="groupTaxCode">
              <el-input v-model="registeForm.groupTaxCode" placeholder="请输入纳税人识别号"></el-input>
            </el-form-item>

            <el-form-item label="企业地址" prop="groupArea">
              <el-cascader
                ref="province"
                v-model="registeForm.groupArea"
                :options="getCityCode"
                clearable
                placeholder="请选择地址"
                @change="changeAres"
              ></el-cascader>
            </el-form-item>

            <el-form-item label="详细地址" prop="groupAddress">
              <el-input v-model="registeForm.groupAddress" placeholder="请输入详细地址"></el-input>
            </el-form-item>

            <el-form-item label="企业法人" prop="groupLegal">
              <el-input v-model="registeForm.groupLegal" placeholder="请输入企业法人"></el-input>
            </el-form-item>

            <el-form-item label="注册资本" prop="groupCapital">
              <el-input v-model="registeForm.groupCapital" placeholder="请输入注册资本"></el-input>
            </el-form-item>

            <el-form-item label="成立日期" prop="groupCreateDate">
              <el-date-picker
                @change="selectDate"
                v-model="registeForm.groupCreateDate"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>

            <el-form-item label="企业类型" prop="groupType">
              <el-select v-model="registeForm.groupType" placeholder="请选择企业类型">
                <el-option
                  v-for="item in groupTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="经营范围" prop="groupBusinessScope">
              <el-input
                type="textarea"
                v-model="registeForm.groupBusinessScope"
                placeholder="请输入经营范围"
              ></el-input>
            </el-form-item>

            <el-form-item label="主管税务机关" prop="groupTaxAuthorities">
              <el-select
                v-model="registeForm.groupTaxAuthorities"
                placeholder="请选择主管税务机关"
                filterable
              >
                <el-option
                  v-for="(item, index) in taxAuthoritysList"
                  :key="index"
                  :label="item.value"
                  :value="item.key"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="开户银行" prop="groupBankId">
              <el-select v-model="registeForm.groupBankId" filterable placeholder="请选择开户银行">
                <el-option
                  v-for="item in banks"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="银行户名" prop="groupBankRealname">
              <el-input v-model="registeForm.groupBankRealname" placeholder="请输入银行户名"></el-input>
            </el-form-item>

            <el-form-item label="银行账号" prop="groupBankAccount">
              <el-input v-model="registeForm.groupBankAccount" placeholder="请输入银行账号"></el-input>
            </el-form-item>

            <el-form-item label="开户行地址" prop="groupBankAddress">
              <el-input v-model="registeForm.groupBankAddress" placeholder="请输入开户行地址"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="account" v-if="active === 1">
        <div>
          <el-form
            :model="pwdForm"
            :rules="pwdRules"
            ref="pwdForm"
            label-width="120px"
            class="demo-ruleForm"
            style="margin-left: 50px;"
          >
            <el-form-item label="登录密码" prop="userLoginPwd">
              <el-input v-model="pwdForm.userLoginPwd" placeholder="请输入登录密码" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="reUserLoginPwd">
              <el-input v-model="pwdForm.reUserLoginPwd" placeholder="请确认登录密码" show-password></el-input>
            </el-form-item>
            <el-form-item label="支付密码" prop="groupPayPwd">
              <el-input v-model="pwdForm.groupPayPwd" placeholder="请输入支付密码" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="reGroupPayPwd">
              <el-input v-model="pwdForm.reGroupPayPwd" placeholder="请确认支付密码" show-password></el-input>
            </el-form-item>
            <el-form-item label="货主电话" prop="userMobile">
              <el-input v-model="pwdForm.userMobile" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="veriCode">
              <el-input v-model="pwdForm.veriCode" placeholder="请输入验证码" style="width: 53%;"></el-input>
              <el-button
                class="verif"
                type="primary"
                @click="getVeriCode"
                :disabled="disabled"
              >{{ this.countdown === 0 ? '获取验证码' : this.countdown + 's' }}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <el-button
        v-if="active === 0"
        style="margin-top: 12px;"
        @click="next('registeForm')"
        class="btn_next"
      >下一步</el-button>
      <div v-if="active === 1" class="Shipper_btn">
        <el-button @click="prev" class="Shipper_prev">上一步</el-button>
        <el-button
          class="Shipper_next"
          @click="registerBtn('pwdForm')"
          v-loading.fullscreen.lock="registeLoading"
          element-loading-text="提交中......"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
        >完成注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: "regbox",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //验证再次登录密码
    var validateLoginPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入登录密码"));
      } else if (value !== this.pwdForm.userLoginPwd) {
        callback(new Error("两次输入登录密码不一致!"));
      } else {
        callback();
      }
    };

    //验证再次支付密码
    var validatePayPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入支付密码"));
      } else if (value !== this.pwdForm.groupPayPwd) {
        callback(new Error("两次输入支付密码不一致!"));
      } else {
        callback();
      }
    };
    //这里存放数据
    return {
      active: 0,
      input: "",
      registeForm: {
        groupCompany: "", //公司名
        groupTaxCode: "", //纳税人识别号
        groupBusinessLicense: "", //营业执照
        groupArea: "", //区县ID
        groupAddress: "", //详细地址
        groupLegal: "", //法人
        groupCapital: "", //注册资本
        groupCreateDate: "", //成立日期
        groupType: "", //企业类型
        groupBusinessScope: "", //经营范围
        groupTaxAuthorities: "", //主管税务机关

        groupBankId: "", //开户银行
        groupBankRealname: "", //银行户名
        groupBankAccount: "", //银行卡号
        groupBankAddress: "" //开户行地址
      },
      registeRules: {
        groupCompany: [
          { required: true, message: "请输入企业名", trigger: "blur" },
          { min: 1, max: 50, message: "长度在 1 到 50 个字符", trigger: "blur" }
        ],
        groupTaxCode: [
          { required: true, message: "请输入纳税人识别号", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        groupBusinessLicense: [
          { required: true, message: "请上传营业执照", trigger: "blur" }
        ],
        groupArea: [
          { required: true, message: "请选择企业地址", trigger: "change" }
        ],
        groupAddress: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
            trigger: "blur"
          }
        ],
        groupLegal: [
          { required: true, message: "请输入法人", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 100 个字符",
            trigger: "blur"
          }
        ],
        groupCapital: [
          { required: true, message: "请输入注册资本", trigger: "blur" }
        ],
        groupCreateDate: [
          { required: true, message: "请输入成立日期", trigger: "change" }
        ],
        groupType: [
          { required: true, message: "请选择企业类型", trigger: "change" }
        ],
        groupBusinessScope: [
          { required: true, message: "请输入经营范围", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
            trigger: "blur"
          }
        ],
        groupTaxAuthorities: [
          { required: true, message: "请选择主管税务机关", trigger: "change" }
        ],
        groupBankId: [
          { required: true, message: "请输入开户银行", trigger: "change" }
        ],
        groupBankRealname: [
          { required: true, message: "请输入银行户名", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
            trigger: "blur"
          }
        ],
        groupBankAccount: [
          { required: true, message: "请输入银行卡号", trigger: "blur" },
          { min: 1, max: 50, message: "长度在 1 到 50 个字符", trigger: "blur" }
        ],
        groupBankAddress: [
          { required: true, message: "请输入开户行地址", trigger: "blur" },
          {
            min: 1,
            max: 200,
            message: "长度在 1 到 200 个字符",
            trigger: "blur"
          }
        ]
      },
      pwdForm: {
        userLoginPwd: "", //登录密码
        reUserLoginPwd: "", //确认登录密码
        groupPayPwd: "", //支付密码
        reGroupPayPwd: "", //确认支付密码
        veriCode: "", // 手机验证码

        userMobile: "" //货主手机号
      },
      pwdRules: {
        userLoginPwd: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          { min: 1, max: 32, message: "长度在 1 到 32 个字符", trigger: "blur" }
        ],
        reUserLoginPwd: [{ validator: validateLoginPwd, trigger: "blur" }],
        groupPayPwd: [
          { required: true, message: "请输入支付密码", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        reGroupPayPwd: [{ validator: validatePayPwd, trigger: "blur" }],
        userMobile: [
          { required: true, message: "请输入货主手机号", trigger: "blur" },
          { min: 11, max: 11, message: "长度在11个字符", trigger: "blur" }
        ], //
        veriCode: [
          { required: true, message: "请输入手机验证码", trigger: "blur" },
          { min: 6, max: 6, message: "长度在6个字符", trigger: "blur" }
        ]
      },
      props: {
        //动态加载
        lazy: true,
        lazyLoad(node, resolve) {
          const { level } = node;
        }
      },
      // value1: "",
      groupTaxs: [],
      groupTypes: [
        { value: "0", label: "一般纳税人" },
        { value: "1", label: "小规模" }
      ],
      banks: [], // 开户行
      value: "",
      fileList: [],
      countdown: 0,
      disabled: false,
      uploadLoading: false,
      registeLoading: false,
      //税务机关列表
      taxAuthoritysList: []
    };
  },
  //监听属性 类似于data概念
  computed: {
    getCityCode() {
      return this.$store.state.provinceCode;
    },
    getTaxAuthoritys() {
      return this.$store.state.taxAuthoritys;
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    LoginBtn() {
      this.$router.push({ path: "/login" });
    },
    // 格式化日期
    selectDate(val) {
      this.registeForm.groupCreateDate = this.$moment(val).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    },
    // 上传图片
    uploadBusiness(file) {
      this.uploadLoading = true;
      setTimeout(() => {
        this.uploadLoading = false;
      }, 2000);

      const that = this;
      const img = new Image();
      img.src = URL.createObjectURL(file.file);
      img.onload = function() {
        let param = new FormData();
        param.append("type", 13); // 13营业执照
        param.append("file", file.file);
        that.$http.post(that.$api.Register.UploadImg, param, true).then(res => {
          if (res.data.code === 1) {
            var obj = res.data.data;
            that.registeForm.groupBusinessLicense = obj.businessLicenseImg;
            that.registeForm.groupLegal = obj.groupLegal;
            that.registeForm.groupAddress = obj.groupAddress;
            that.registeForm.groupBusinessScope = obj.groupBusinessScope;
            that.registeForm.groupTaxCode = obj.groupTaxCode;
            that.registeForm.groupCapital = obj.groupCapital;
            that.registeForm.groupCompany = obj.groupCompany;
            if ((obj.groupCreateDate = "00")) return;
            that.registeForm.groupCreateDate = obj.groupCreateDate;
          } else {
            that.$message({
              showClose: true,
              message: res.data.message,
              type: "error"
            });
          }
        });
      };
    },
    //获取短信验证码
    getVeriCode() {
      if (!this.pwdForm.userMobile) {
        this.$message({
          showClose: true,
          message: "请输入手机号",
          type: "error"
        });
      } else {
        let that = this;
        that.disabled = true;
        that.$http
          .get(
            that.$api.Register.getVeriCode +
              "?mobile=" +
              that.pwdForm.userMobile,
            true
          )
          .then(res => {
            if (res.data.code === 1) {
              that.countdown = res.data.data;
              let veriInterval = setInterval(function() {
                that.countdown -= 1;
                if (that.countdown < 1) {
                  that.countdown = 0;
                  that.disabled = false;
                  clearInterval(veriInterval);
                }
              }, 1000);
              that.$message({
                showClose: true,
                message: "发送成功",
                type: "success"
              });
            } else {
              that.$message({
                showClose: true,
                message: "发送失败",
                type: "error"
              });
            }
          });
      }
    },

    // 完成注册
    registerBtn(formName) {
      this.$refs[formName].validate(valid => {
        if (valid == false) {
          return null;
        } else {
          this.registeLoading = true;
          setTimeout(() => {
            this.registeLoading = false;
          }, 2000);
          var that = this;
          let param = new FormData();
          param.append("groupCompany", that.registeForm.groupCompany); //公司名
          param.append("groupTaxCode", that.registeForm.groupTaxCode); //纳税人识别号
          param.append(
            "groupBusinessLicense",
            that.registeForm.groupBusinessLicense
          ); //营业执照
          param.append("groupArea", that.registeForm.groupArea[2]); //区县ID
          param.append("groupAddress", that.registeForm.groupAddress); //详细地址
          param.append("groupLegal", that.registeForm.groupLegal); //法人
          param.append("groupCapital", that.registeForm.groupCapital); //注册资本
          param.append("groupCreateDate", that.registeForm.groupCreateDate); //成立日期
          param.append("groupType", that.registeForm.groupType); //企业类型
          param.append(
            "groupBusinessScope",
            that.registeForm.groupBusinessScope
          ); //经营范围
          param.append(
            "groupTaxAuthorities",
            that.registeForm.groupTaxAuthorities
          ); //主管税务机关
          param.append("userLoginPwd", that.pwdForm.userLoginPwd); //登录密码
          param.append("userMobile", that.pwdForm.userMobile); //货主手机号
          param.append("smsCode", that.pwdForm.veriCode); //手机验证码
          param.append("groupBankId", that.registeForm.groupBankId); //开户银行
          param.append("groupBankRealname", that.registeForm.groupBankRealname); //银行户名
          param.append("groupBankAccount", that.registeForm.groupBankAccount); //银行卡号
          param.append("groupBankAddress", that.registeForm.groupBankAddress); //开户行地址
          param.append("groupPayPwd", that.pwdForm.groupPayPwd); //支付密码
          that.$http
            .post(that.$api.Register.Register, param, true)
            .then(res => {
              this.registeLoading = false;
              if (res.data.code === 1) {
                that.$message({
                  showClose: true,
                  message: res.data.message,
                  type: "success"
                });
                this.$router.push({ path: "./login" });
              } else {
                that.$message({
                  showClose: true,
                  message: res.data.message,
                  type: "error"
                });
              }
            });
        }
      });
    },
    next(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.active++ > 2) this.active = 0;
        }
      });
    },
    prev() {
      if (this.active-- < 1) this.active = 0;
    },

    // 图片上传前
    beforeUpload(file) {
      // const isJPG = file.type === "image/jpeg";
      // const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      // if (!isLt2M) {
      //   this.$message.error("上传头像图片大小不能超过 2MB!");
      // }
      // return isJPG && isLt2M;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      // this.$message.warning(
      //   `当前限制选择1个文件，本次选择了 ${
      //     files.length
      //   } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      // );
      this.$message.warning(`当前限制选择1个文件`);
    },
    beforeRemove(file, fileList) {
      //return this.$confirm(`确定移除 ${file.name}？`);
    },

    //机构地址改变，加载税务机关
    changeAres(item) {
      var province = this.$refs["province"].getCheckedNodes()[0].parent.parent
        .label;
      var param = new URLSearchParams();
      param.append("codeColumn", province);
      this.$http
        .post(this.$api.Business.taxAuthority, param, true)
        .then(res => {
          if (res.data.code == 1) {
            this.taxAuthoritysList = res.data.data;
          }
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: "失败（≧?≦）",
            type: "error"
          });
        });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    let that = this;
    this.$http
      .get(this.$api.Business.banks, false)
      .then(res => {
        if (res.data.code === 1) {
          that.banks = res.data.data;
        } else {
          console.log("获取银行失败");
        }
      })
      .catch(err => {
        console.log("获取银行失败");
      });
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    let that = this;
    this.$store.dispatch("getOptions", that);
    //this.$store.dispatch("getTaxAuthority", that);
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
.top_image img {
  width: 100%;
}
.reg {
  width: 1200px;
  text-align: center;
  margin: 20px auto 50px;
}
.el-step__head.is-success {
  color: #659cfe;
  border-color: #659cfe;
}
.el-step__title.is-success {
  color: #659cfe;
}
.account {
  width: 780px;
  margin: 20px auto;
}
.account ul li {
  height: 40px;
  width: 100%;
}
.account_user {
  float: left;
  width: 13%;
  height: 40px;
  text-align: left;
  line-height: 40px;
}
.reg .el-input {
  float: left;
  width: 85%;
  margin-left: 2%;
}
.reg .el-button--default {
  width: 600px;
  height: 50px;
  background: rgba(101, 156, 254, 1);
  border-radius: 10px;
  margin-top: 30px;
}
.reg .el-button--default span {
  color: #fff;
}
.account ul .account_login {
  text-align: right;
  line-height: 40px;
  margin-bottom: 0;
  margin-left: -100px;
}
.account ul .account_login a {
  color: #659cfe;
}
.account ul .account_login a:hover {
  text-decoration: none;
}
.account_msg .el-input {
  float: left;
  width: 363px;
}

.account_msg .verif {
  width: 100px;
  height: 40px;
  padding: 0;
}
/* .account_msg span {
  float: left;
  width: 120px;
  height: 40px;
  background: rgba(230, 239, 252, 1);
  border: 1px solid rgba(101, 156, 254, 1);
  border-radius: 10px;
  text-align: center;
  line-height: 40px;
  color: #659cfe;
  margin-left: 25px;
  cursor: pointer;
} */
.Shipper .Shipper_com .account_user {
  width: 19%;
}
.Shipper_com .upload-demo {
  float: left;
}
.Shipper .account_user {
  width: 17%;
}
.Shipper .el-input {
  width: 81%;
}
.el-cascader {
  float: left;
  width: 81%;
  margin-left: 10px;
}
.el-cascader .el-input--suffix {
  width: 100%;
}
.el-upload {
  float: left;
}
.el-upload-list {
  float: left;
}
.el-upload-list__item {
  height: 24px;
}
.el-select {
  width: 81%;
  margin-left: -95px;
  margin-bottom: -15px;
}
.el-upload {
  margin-left: 12px;
}

.el-textarea {
  width: 81%;
  margin-left: -96px;
  margin-bottom: 0px;
}
.el-select .el-input--suffix {
  width: 100%;
}
.Shipper_btn .Shipper_prev {
  width: 180px;
  background: #ccc;
}
.Shipper_btn {
  width: 600px;
  margin: 0 auto;
}
.Shipper_btn .Shipper_next {
  width: 370px;
  margin-left: 50px;
}

.el-form-item__label {
  font-weight: 500;
}
.btn_next:hover {
  color: #fff;
  font-family: "Microsoft YaHei", "宋体", "Droid Sans Fallback", "sans-self";
}
</style>