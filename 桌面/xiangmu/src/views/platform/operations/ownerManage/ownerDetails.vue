<template>
  <div class="settle">
    <div class="owner">

      <div class="topTable width90">
        <div class="head_title">
          <h3 class="newAddTitle">车主审核</h3>
          <span @click="back">返回>></span>
        </div>
      </div>
      <!-- 车主列表 -->
      <!-- 基本信息 -->
      <div class="topTable width90">
        <el-table
          :data="basicInfo"
          border
          style="width: 100%">
          <el-table-column prop="userId" label="用户ID"></el-table-column>
          <el-table-column prop="userMobile" label="手机号"></el-table-column>
          <el-table-column prop="userStatus" label="认证状态"></el-table-column>
          <!--
          <el-table-columnprop="address" label="及时率"> </el-table-column>
          <el-table-column prop="address" label="完好率"> </el-table-column>
          -->
        </el-table>
      </div>

      <!-- 身份信息 -->
      <div class="identitysbox width90">
        <h3>身份信息</h3>
        <el-table
          :data="identityInfo"
          border
          style="width: 100%">
          <el-table-column
            prop="bindOwnerType"
            label="银行卡所属">
          </el-table-column>

          <el-table-column
            prop="bindBankAccount"
            label="身份证号">
          </el-table-column>

          <el-table-column
            prop="bindBankAccount"
            label="银行卡号">
          </el-table-column>

          <el-table-column
            prop="bankName"
            label="开户银行">
          </el-table-column>

          <el-table-column
            prop="bindBankMobile"
            label="银行卡预留手机号">
          </el-table-column>

          <el-table-column
            prop="bindBankRealname"
            label="开户姓名">
          </el-table-column>
        </el-table>
        <!-- <ul class="flex identityul">
          <li class="flex1">
            <span>银行卡所属</span>
            <b>中国工商银行</b>
          </li>
          <li class="flex2">
            <span>身份证号</span>
            <b>2332323434353534454</b>
          </li>
          <li class="flex2">
            <span>银行卡号</span>
            <b>2222222222222222222</b>
          </li>
          <li class="flex2">
            <span>开户银行</span>
            <b>2222222222222222222</b>
          </li>
          <li class="flex2">
            <span>银行卡预留手机号</span>
            <b>12121212121</b>
          </li>
          <li class="flex1">
            <span>开户姓名</span>
            <b>李四</b>
          </li>
        </ul> -->
      </div>

      <!-- 驾驶证信息 -->
      <div class="width90 drivelicense">
        <h3>驾驶证信息</h3>
        <el-table
          :data="driveInfo"
          border
          align="center"
          style="width: 100%;position:relative">
          <el-table-column
            prop="driverLicenceImage"
            label="驾驶证照片">
            <template slot-scope="scope">
              <el-avatar shape="square" :size="100" :src="scope.row.driverLicenceImage ? 'http://redox-test01.oss-cn-qingdao.aliyuncs.com' + scope.row.driverLicenceImage : ''"></el-avatar>
            </template>
          </el-table-column>

          <el-table-column
            prop="driverName"
            label="驾驶员姓名">
          </el-table-column>

          <el-table-column
            prop="driverLicence"
            label="驾驶证编号">
          </el-table-column>

          <el-table-column
            prop="driverModel"
            label="准驾车型">
          </el-table-column>

          <el-table-column
            prop="driverIssuedBy"
            label="驾驶证发证机关">
          </el-table-column>

          <el-table-column
            prop="driverStartDate"
            label="驾驶证有效期自">
          </el-table-column>

          <el-table-column
            prop="driverEndDate"
            label="驾驶证有效至">
          </el-table-column>

          <el-table-column
            v-if="operateFlag == 3"
            prop="driverCertification"
            label="从业资格证号">
            <template slot-scope="scope" >
              <el-input
                style="position:absolute;width:125px;mrgin-left:-5px;padding-right:0"
                placeholder="从业资格证号"
                v-model="scope.row.driverCertification"
                clearable>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column 
            v-if="operateFlag != 3"
            prop="driverCertification"
            label="从业资格证号">
          </el-table-column>

         
        </el-table>

        <!-- <ul class="flex identityul">
          <li class="flex1">
            <span>银行卡所属</span>
            <b>中国工商银行</b>
          </li>
          <li class="flex2">
            <span>身份证号</span>
            <b>2332323434353534454</b>
          </li>
          <li class="flex2">
            <span>银行卡号</span>
            <b>2222222222222222222</b>
          </li>
          <li class="flex2">
            <span>开户银行</span>
            <b>2222222222222222222</b>
          </li>
          <li class="flex2">
            <span>银行卡预留手机号</span>
            <b>12121212121</b>
          </li>
          <li class="flex1">
            <span>开户姓名</span>
            <b>李四</b>
          </li>
        </ul> -->
      </div>

      <!-- 行驶证信息 -->
      <div class=" vehiclelicense width90">
        <h3>行驶证信息</h3>
        <template>
          <el-table
            :data="vehicleInfo1"
            border
            style="width: 100%">
            <el-table-column prop="carDrivingImage"
              label="行驶证照片">
              <template slot-scope="scope">
                <el-avatar shape="square" :size="100" :src="scope.row.carDrivingImage ? 'http://redox-test01.oss-cn-qingdao.aliyuncs.com' + scope.row.carDrivingImage : ''"></el-avatar>
              </template>
            </el-table-column>

            <el-table-column
              prop="carCode"
              label="承运车牌号码">
            </el-table-column>

            <el-table-column
              prop="carOwner"
              label="所有人">
            </el-table-column>

            <el-table-column
              prop="carProperty"
              label="使用性质">
            </el-table-column>

            <el-table-column
              prop="carVin"
              label="车辆识别代码">
            </el-table-column>

            <el-table-column
              prop="carDrivingSsuedBy"
              label="发证机关">
            </el-table-column>
            <el-table-column
              prop="carDrivingRegistDate"
              label="注册日期">
            </el-table-column>
            <el-table-column
              prop="carDrivingIssueDate"
              label="发证日期">
            </el-table-column>
            <el-table-column
              prop="carWeight"
              label="总质量">
            </el-table-column>
          </el-table>
        </template>
        <template>
          <el-table
            :data="vehicleInfo2"
            border
            style="width: 100%;position:relative">
            <el-table-column
              v-if="operateFlag == 3"
              prop="carTransportLicence"
              label="道路运输证号">
              <template slot-scope="scope">
              <el-input
                style="position:absolute;width:125px;mrgin-left:-5px;padding-right:0;top:10px;left:0"
                placeholder="道路运输证号"
                v-model="scope.row.carTransportLicence"
                clearable>
              </el-input>
            </template>
            </el-table-column>

            <el-table-column 
            v-if="operateFlag != 3"
            prop="carTransportLicence"
            label="道路运输证号">
          </el-table-column>


            <el-table-column
              prop="carDrivingLicence"
              label="行驶证号">
            </el-table-column>

            <el-table-column
              prop="carModel"
              label="承运车型">
            </el-table-column>

            <el-table-column
              prop="carLength"
              label="承运车长">
            </el-table-column>

            <el-table-column
              prop="carLoad"
              label="承运载重（核定载质量）">
            </el-table-column>

            <el-table-column
              prop="carBrand"
              label="承运车辆品牌">
            </el-table-column>
            <el-table-column
              prop="carOwnerType"
              label="车辆所有人类型">
            </el-table-column>
            <el-table-column
              prop="motCarPlatetypeCode"
              label="车辆类型代码">
            </el-table-column>
            <el-table-column
              prop="carEnergyType"
              label="车辆能源类型">
            </el-table-column>
          </el-table>
        </template>
      </div>

      <!-- 其他信息 -->
      <div class="other width90">
        <h3>其他信息</h3>
        <el-table
          :data="otherInfo"
          border
          style="width: 100%">
          <el-table-column
            v-if="operateFlag == 3"
            prop="carImage"
            label="车辆照片">
            <template slot-scope="scope">
              <div class="goodsmessage_img">
                <div class="demo-image__preview goodsimg">
                  <el-image
                    class="avatar"
                    :src="scope.row.carImage ? 'http://redox-test01.oss-cn-qingdao.aliyuncs.com' + scope.row.carImage : ''"
                    @change="inputchange(scope.row,row)"
                  ></el-image>
                  <el-upload
                    class="avatar-uploader"
                    action
                    :http-request="uploadFile"
                  >
                    <i class="avatar-uploader-icon">重新上传</i>
                  </el-upload>
                </div>
              </div>
              <!-- <el-avatar  shape="square" :size="100" :src="scope.row.carImage ? 'http://redox-test01.oss-cn-qingdao.aliyuncs.com' + scope.row.carImage : ''"></el-avatar> -->
            </template>
          </el-table-column>
           <el-table-column 
            v-if="operateFlag != 3"
            prop="carImage"
            label="车辆照片">
            <template slot-scope="scope">
              <el-avatar shape="square" :size="100" :src="scope.row.carImage ? 'http://redox-test01.oss-cn-qingdao.aliyuncs.com' + scope.row.carImage : ''"></el-avatar>
            </template>
          </el-table-column>


          <el-table-column
            prop="carEnergyType"
            label="车辆能源类型">
          </el-table-column>

          <el-table-column
            prop="carIsAffiliated"
            label="是否挂靠">
          </el-table-column>

          <el-table-column
            v-if="operateFlag == 3"
            prop="carOwnerStatement"
            label="车主声明">
            <template slot-scope="scope">
              <div class="goodsmessage_img">
                <div class="demo-image__preview goodsimg">
                  <el-image
                    class="avatar"
                    :src="scope.row.carOwnerStatement ? 'http://redox-test01.oss-cn-qingdao.aliyuncs.com' + scope.row.carOwnerStatement : ''"
                    
                  ></el-image>
                  <el-upload
                    class="avatar-uploader"
                    action
                    :http-request="uploadFile"
                  >
                    <i class="avatar-uploader-icon">重新上传</i>
                  </el-upload>
                </div>
              </div>
              <!-- <el-avatar   shape="square" :size="100" :src="scope.row.carOwnerStatement ? 'http://redox-test01.oss-cn-qingdao.aliyuncs.com' + scope.row.carOwnerStatement : ''"></el-avatar> -->
            </template>
          </el-table-column>
          <el-table-column
            v-if="operateFlag != 3"
            prop="carOwnerStatement"
            label="车主声明">
            <template slot-scope="scope">
              <el-avatar shape="square" :size="100" :src="scope.row.carOwnerStatement ? 'http://redox-test01.oss-cn-qingdao.aliyuncs.com' + scope.row.carOwnerStatement : ''"></el-avatar>
            </template>
          </el-table-column>


          <el-table-column
            v-if="operateFlag == 3"
            prop="carCompanyStatement"
            label="企业声明">
            <template slot-scope="scope">
              <div class="goodsmessage_img">
                <div class="demo-image__preview goodsimg">
                  <el-image
                    class="avatar"
                    :src="scope.row.carCompanyStatement ? 'http://redox-test01.oss-cn-qingdao.aliyuncs.com' + scope.row.carCompanyStatement : ''"
                  ></el-image>
                  <el-upload
                    class="avatar-uploader"
                    action
                    :http-request="uploadFile"
                  >
                    <i class="avatar-uploader-icon">重新上传</i>
                  </el-upload>
                </div>
              </div>
              <!-- <el-avatar   shape="square" :size="100" :src="scope.row.carCompanyStatement ? 'http://redox-test01.oss-cn-qingdao.aliyuncs.com' + scope.row.carCompanyStatement : ''"></el-avatar> -->
            </template>
          </el-table-column>

          <el-table-column
          v-if="operateFlag != 3"
            prop="carCompanyStatement"
            label="企业声明">
            <template slot-scope="scope">
              <el-avatar shape="square" :size="100" :src="scope.row.carCompanyStatement ? 'http://redox-test01.oss-cn-qingdao.aliyuncs.com' + scope.row.carCompanyStatement : ''"></el-avatar>
            </template>
          </el-table-column>

        </el-table>
      </div>

      <!-- 审核 -->
      <div class="owneraudit width90">
        <p>车主信息审核</p>
        <div class="ownerR">
          <el-select v-model="newOwnerStatus" placeholder="请选择"  @change="changeAudit" :disabled="operateFlag == 3">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
             >
            </el-option>
          </el-select>
          <div class="abnormal_reason" v-if="this.newOwnerStatus == 6">
            <el-input type="textarea" placeholder="请输入异常原因" v-model="abnormalReason" :disabled="operateFlag == 3"></el-input>
          </div>
        </div>
      </div>

      <!-- 按钮 -->
      <div class="bottom_box">
        <el-button @click="back">返 回</el-button>
        <el-button type="primary" @click="saveChange" v-if="operateFlag != 3">保 存</el-button>
        <el-button type="primary" @click="saveChange" v-else>恢复正常</el-button>
      </div>

      <!-- 弹窗确认 -->
      <!-- <el-dialog
        :title="promptText"
        :visible.sync="dialogVisible"
        width="30%"
        >
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog> -->
      
    </div>
  </div>
</template>
<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: "index",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      //可修改的数据
      Modify:{
        congyezheng:'',

      },
      searchData: {
        projName: "" //项目名称
      },

      // 表格数据
      tableData: [
        {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      // 基本信息
      basicInfo: [],
      // 身份信息
      identityInfo: [],
      // 驾驶证信息
      driveInfo: [],
      groupBusinessLicense: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', // 驾驶证照片
      // 行驶证信息
      vehicleInfo1: [],
      vehicleInfo2: [],
      // 其他信息
      otherInfo: [],
      // 审核选项 用户状态（0逻辑删除、1待认证、2待审核、3审核通过、4审核不通过、5禁止登陆，6异常）
        options:[],
        //审核
      options1: [  //
          {value: '2', label: '待审核'},
          {value: '3', label: '审核通过'},
          {value: '4', label: '审核不通过'},
          {value: '6', label: '异常'}
      ],
        //查看详情
        options2: [
            {value: '3', label: '审核通过'},
            {value: '6', label: '异常'}
        ],
      newOwnerStatus: '', // 绑定的状态
      originalStatus: '', // 暂存原始状态
      abnormalReason: '', //审核审批说明
      userId: '', // 路由传过来的userId
      promptText: '', // 确认提示文本
      operateFlag: ''  // //1审核  2查看详情  3查看异常
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    inputchange(data,flag){
      console.log(data,flag,888)
    },
        //提货单照片
    uploadFile(file) {
      const that = this;
      const img = new Image();
      // console.log(file, "上传照片", file.file);
      img.src = URL.createObjectURL(file.file);
      img.onload = function() {
        let param = new FormData();
        param.append("type", 5); // 13营业执照
        param.append("file", file.file);
        param.append("adress", "PC上传未有GPS地址!");
        that.$http.post(that.$api.Register.UploadImg, param, true).then(res => {
          // console.log(res, "上传图片时的res");
          if (res.data.code === 1) {
            that.$message({
              showClose: true,
              message: "上传成功",
              type: "success"
            });
            // console.log(res,55555)
            that.otherInfo.carImage=res.data.data.localUrl
            console.log(that.otherInfo.carImage,666)
            //提货
            // that.form.loadReceipt.receiptBill =
            //   "http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
            //   res.data.data.localUrl;
            //   localStorage.setItem("file1",res.data.data.localUrl)
            //   this.file1=localStorage.getItem("file1")
            //   console.log(this.file1,111)
            //   that.form.loadReceipt.receiptBillZip = res.data.data.humbnailUrl;
          } else {
            that.$message({
              showClose: true,
              message: "上传失败",
              type: "error"
            });
          }
        });
      };
    },
    resetData(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
        // this.page = 1;
        // this.limit = 1;
        // this.getList();
      });
    },
    // 点击返回
    back() {
      this.$router.go(-1);
    },
    // 获取车主审核详情
    getOwnerDetail() {
      let newUserId = '';
      if(this.$route.params.id){
          newUserId = this.$route.params.id
          this.operateFlag = this.$route.params.flag;
          localStorage.setItem("userId", this.$route.params.id);
          localStorage.setItem("operateFlag", this.$route.params.operateFlag);
      } else {
          newUserId = localStorage.getItem("userId");
          this.operateFlag = localStorage.getItem("operateFlag");
      }
      //用户状态（0逻辑删除、1待认证、2待审核、3审核通过、4审核不通过、5禁止登陆，6异常）
        if(this.operateFlag == 1)
            this.options = this.options1;
        else if(this.operateFlag == 2)
            this.options = this.options2;
        else
            this.options = this.options2;

      this.$http
        .get(this.$api.Risks.getOwnerDetail + '?userId=' + newUserId, true)
        .then(res => {
          if(res.data.code == 1) {
            let data = res.data.data
            console.log(res.data.data, '车主审核详情')
            // 基本信息
            this.basicInfo = [
              {
                  //0逻辑删除、1待认证、2待审核、3审核通过、4审核不通过、5禁止登陆
                userId: data.tmsUser.userId,
                userMobile: data.tmsUser.userMobile,
                userStatus: data.tmsUser.userStatusName
              }
            ];
            // 身份信息
            this.identityInfo = [
              {
                bindOwnerType: data.tmsUserBindBanks.bindOwnerType == 1 ? "本人" : "非本人",
                bindBankIdcard: data.tmsUserBindBanks.bindBankIdcard,
                bindBankAccount: data.tmsUserBindBanks.bindBankAccount,
                bankName: data.tmsUserBindBanks.bankName,
                bindBankMobile: data.tmsUserBindBanks.bindBankMobile,
                bindBankRealname: data.tmsUserBindBanks.bindBankRealname
              }
            ];
            // 驾驶证信息
            this.driveInfo = [
              {
                driverLicenceImage: data.tmsUserDriver.driverLicenceImage,
                driverName: data.tmsUserDriver.driverName,
                driverLicence: data.tmsUserDriver.driverLicence,
                driverModel: data.tmsUserDriver.driverModel,
                driverIssuedBy: data.tmsUserDriver.driverIssuedBy,
                driverStartDate: data.tmsUserDriver.driverStartDate,
                driverEndDate: data.tmsUserDriver.driverEndDate,
                driverCertification: data.tmsUserDriver.driverCertification
              }
            ];
            this.Modify.congyezheng=this.driveInfo.driverCertification
             
            // 行驶证信息
            this.vehicleInfo1 = [
              {
                carDrivingImage: data.tmsUserCar.carDrivingImage,
                carCode: data.tmsUserCar.carCode,
                carOwner: data.tmsUserCar.carOwner,
                carProperty: data.tmsUserCar.carProperty,
                carVin: data.tmsUserCar.carVin,
                carDrivingSsuedBy: data.tmsUserCar.carDrivingSsuedBy,
                carDrivingRegistDate: data.tmsUserCar.carDrivingRegistDate,
                carDrivingIssueDate: data.tmsUserCar.carDrivingIssueDate,
                carWeight: data.tmsUserCar.carWeight
              }
            ];
            this.vehicleInfo2 = [
              {
                carTransportLicence: data.tmsUserCar.carTransportLicence,
                carDrivingLicence: data.tmsUserCar.carDrivingLicence,
                carModel: data.tmsUserCar.carModel,
                carLength: data.tmsUserCar.carLength,
                carLoad: data.tmsUserCar.carLoad,
                carBrand: data.tmsUserCar.carBrand,
                carOwnerType: data.tmsUserCar.carOwnerType,
                motCarPlatetypeCode: data.tmsUserCar.motCarPlatetypeCode,
                carEnergyType: data.tmsUserCar.carEnergyType,
              }
            ];
            // 其他信息
            this.otherInfo = [
              {
                carImage: data.tmsUserCar.carImage,
                carEnergyType: data.tmsUserCar.carEnergyType,
                carIsAffiliated: data.tmsUserCar.carIsAffiliated == 1 ? '是' : '否',
                carOwnerStatement: data.tmsUserCar.carOwnerStatement,
                carCompanyStatement: data.tmsUserCar.carCompanyStatement
              }
            ];
            this.originalStatus = data.tmsUser.userStatus; // 暂存原始状态
            this.newOwnerStatus = data.tmsUser.userStatus + '';
            this.abnormalReason = data.tmsUser.exceptionReason;
          } else {
            this.$message({
              showClose: true,
              message: "获取审核详情失败",
              type: "error"
            });
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
    // 点击保存
    saveChange() {
      if(this.newOwnerStatus == this.originalStatus) {
        // console.log(this.newOwnerStatus,this.originalStatus)
        this.$message({
          showClose: true,
          message: "未做任何修改",
          type: "info"
        });
      }
      // //0逻辑删除、1待认证、2待审核、3审核通过、4审核不通过、5禁止登陆
      if(this.newOwnerStatus != this.originalStatus) {
        if(this.newOwnerStatus == 0) {
          this.promptText = '确定修改为 “逻辑删除” 状态吗';
        } else if(this.newOwnerStatus == 1) {
          this.promptText = '确定修改为 “待认证” 状态吗';
        } else if(this.newOwnerStatus == 2) {
            this.promptText = '确定修改为 “待审核” 状态吗';
        } else if(this.newOwnerStatus == 3) {
          this.promptText = '确定修改为 “审核通过” 状态吗';
        } else if(this.newOwnerStatus == 4) {
          this.promptText = '确定修改为 “审核未通过” 状态吗';
        } else if(this.newOwnerStatus == 5) {
          this.promptText = '确定修改为 “禁止登陆” 状态吗';
        }else if(this.newOwnerStatus == 6) {
            this.promptText = '确定修改为 “异常” 状态吗';
        }
        this.$confirm(this.promptText, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.confirmAudit()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          });          
        });
      }
    },

    // 最终修改审核状态
    confirmAudit() {
      let that = this;
      var param = new URLSearchParams();
      param.append("userId", this.basicInfo[0].userId);
      param.append("userStatus", this.newOwnerStatus);
      param.append("exceptionReason",this.abnormalReason)
      this.$http
        .post(this.$api.Risks.sendOwnerAudit, param, true)
        .then(res => {
          console.log(res)
          if(res.data.code == 1) {
            //this.getOwnerDetail()
            this.$message({showClose: true, message: res.data.message, type: "success"});
              this.$router.go(-1);
          } else {
            this.getOwnerDetail()
            this.$message({showClose: true, message: res.data.message, type: "error"});
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

    changeAudit(val){
        //用户状态（0逻辑删除、1待认证、2待审核、3审核通过、4审核不通过、5禁止登陆，6异常）
        if(val != 6)
        {
            this.abnormalReason = '';
        }
    }


  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getOwnerDetail()
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
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
/* @import url("../../../../assets/css/singularTable.css"); */
.avatar-uploader {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 32px;
}
.avatar-uploader /deep/ .el-upload {
  position: relative;
  overflow: hidden;
  width: 100% !important;
}
.avatar-uploader-icon {
  font-size: 14px;
  border-radius: 0 0 10px 10px;
  color: #fff;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  height: 32px;
  font-style: normal;
  line-height: 32px;
  float: left;
  text-align: center;
  z-index: 10;
}
.goodsmessage_img {
  overflow: hidden;
}
.goodsimg {
  width: 160px;
  height: 160px;
  margin-top: 3%;
  position: relative;
}
.goodsimg .avatar {
  height: 160px;
  position: relative;
}
.owner {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0 40px 0;
}

.owner h3 {
  height: 40px;
  line-height: 40px;
  font-weight: bolder;
  color: #777;
}

.width90 {
  width: 90%;
}

.topTable,.identitysbox,.drivelicense,.vehiclelicense,.other,.owneraudit {
  margin-top: 10px;
}
.owneraudit {
  margin-top: 20px;
  display: flex;
}
.owneraudit p {
  font-weight: bolder;
  height: 40px;
  line-height: 40px;
  padding-right: 20px;
}
.ownerR {
  width: 40%;
}
.abnormal_reason {
  padding-top: 20px;
}

.bottom_box {
  margin-top: 50px;
  display: flex;
  justify-content: space-around;
  width: 60%
}

.bottom_box .el-button {
  width: 300px;
  height: 40px;
  padding: 0;
}

.el-avatar {
  width: auto!important;
}

 /* .owner b{
   font-weight: normal;
 }
.topTable {
  margin-top: 40px;
  border-top: 1px solid #e4e7ed;
  border-left: 1px solid #e4e7ed;
}
.topTable ul {
  display: flex;
}
.topTable li {
  flex: 1;
  height: auto;
  display: flex;
  align-items: center;
  border-right: 1px solid #e4e7ed;
  border-bottom: 1px solid #e4e7ed;
}
.topTable b{
  padding-left: 10px;
  flex: 3;
}
.topTable li span {
  background: white;
  height: 40px;
  line-height: 40px;
  text-align: center;
  flex: 2;
  border-right: 1px solid #e4e7ed;
}
.width100{
  width: 100%;
}


.identitysbox {
  margin-top: 60px;
}
.identityul {
  border-top: 1px solid #e4e7ed;
  border-left: 1px solid #e4e7ed;
}
.identityul li {
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e4e7ed;
  border-bottom: 1px solid #e4e7ed;
  text-align: center;
}
.identityul span,b {
  padding: 10px 0 10px 0;
  white-space: normal;
  word-break: break-all;
}
.identityul span {
  border-bottom: 1px solid #e4e7ed;
}







.topTable .flex1 {
  flex: 1;
}
.topTable .flex2 {
  flex: 2;
}
.topTable .flex4 {
  flex: 4;
}
.topTable .border2 {
  border-right: 14px solid #fff;
}
.width90 {
  width: 90%;
}
.flex {
  display: flex;
}

.flex1 {
  flex: 1;
}
.flex2 {
  flex: 2;
} */

.newAddTitle {
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.head_title {
  position: relative;
}
.head_title span{
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 16px;
  color: #409eff;
  cursor: pointer;
}

</style>
