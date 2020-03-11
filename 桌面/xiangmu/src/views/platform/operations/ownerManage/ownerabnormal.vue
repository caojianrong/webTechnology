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
        <el-table :data="basicInfo" border style="width: 100%">
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
        <el-table :data="identityInfo" border style="width: 100%">
          <el-table-column prop="bindOwnerType" label="银行卡所属"></el-table-column>

          <el-table-column prop="bindBankAccount" label="身份证号"></el-table-column>

          <el-table-column prop="bindBankAccount" label="银行卡号"></el-table-column>

          <el-table-column prop="bankName" label="开户银行"></el-table-column>

          <el-table-column prop="bindBankMobile" label="银行卡预留手机号"></el-table-column>

          <el-table-column prop="bindBankRealname" label="开户姓名"></el-table-column>
        </el-table>
      </div>

      <!-- 驾驶证信息 -->
      <div class="width90 drivelicense">
        <h3>驾驶证信息</h3>
        <el-table
          :data="driveInfo"
          border
          style="width: 100%;position:relative"
          @row-click="rowclick1"
        >
          <el-table-column prop="driverLicenceImage" label="驾驶证照片">
            <template slot-scope="scope">
              <div class="goodsmessage_img">
                <div class="demo-image__preview goodsimg">
                  <el-image
                    class="avatar"
                    :preview-src-list="srcList"
                    :src=" 'http://redox-test01.oss-cn-qingdao.aliyuncs.com' + scope.row.driverLicenceImage "
                  ></el-image>
                  <el-upload class="avatar-uploader" action :http-request="uploadFile">
                    <i class="avatar-uploader-icon" @click="uploadimage(1)">重新上传</i>
                  </el-upload>
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="driverName" label="驾驶员姓名">
            <template slot-scope="scope">
              <el-input
                style="position:absolute;width:125px;padding-right:0"
                placeholder="驾驶员姓名"
                v-model="scope.row.driverName"
              ></el-input>
            </template>
          </el-table-column>

          <el-table-column prop="driverLicence" label="驾驶证编号">
            <template slot-scope="scope">
              <el-input
                style="position:absolute;width:125px;padding-right:0"
                placeholder="驾驶证编号"
                v-model="scope.row.driverLicence"
              ></el-input>
            </template>
          </el-table-column>

          <el-table-column prop="driverModel" label="准驾车型">
            <template slot-scope="scope">
              <el-input
                style="position:absolute;width:125px;padding-right:0"
                placeholder="准驾车型"
                v-model="scope.row.driverModel"
              ></el-input>
            </template>
          </el-table-column>

          <el-table-column prop="driverIssuedBy" label="驾驶证发证机关">
            <template slot-scope="scope">
              <el-input
                style="position:absolute;width:125px;padding-right:0"
                placeholder="驾驶证发证机关"
                v-model="scope.row.driverIssuedBy"
              ></el-input>
            </template>
          </el-table-column>

          <el-table-column prop="driverStartDate" label="驾驶证有效期自">
            <template slot-scope="scope">
              <el-input
                style="position:absolute;width:125px;padding-right:0"
                placeholder="驾驶证有效期自"
                v-model="scope.row.driverStartDate"
              ></el-input>
            </template>
          </el-table-column>

          <el-table-column prop="driverEndDate" label="驾驶证有效至">
            <template slot-scope="scope">
              <el-input
                style="position:absolute;width:125px;padding-right:0"
                placeholder="驾驶证有效至"
                v-model="scope.row.driverEndDate"
              ></el-input>
            </template>
          </el-table-column>

          <el-table-column prop="driverCertification" label="从业资格证号">
            <template slot-scope="scope">
              <el-input
                style="position:absolute;width:125px;padding-right:0"
                placeholder="从业资格证号"
                v-model="scope.row.driverCertification"
              ></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 行驶证信息 -->
      <div class="vehiclelicense width90">
        <h3>行驶证信息</h3>
        <template>
          <el-table
            :data="vehicleInfo1"
            border
            style="width: 100%;position:relative;margin-bottom:10px;"
            @row-click="rowclick2"
          >
            <el-table-column prop="carDrivingImage" label="行驶证照片">
              <template slot-scope="scope">
                <div class="goodsmessage_img">
                  <div class="demo-image__preview goodsimg">
                    <el-image
                      class="avatar"
                      :preview-src-list="srcList"
                      :src=" 'http://redox-test01.oss-cn-qingdao.aliyuncs.com' + scope.row.carDrivingImage "
                    ></el-image>
                    <el-upload class="avatar-uploader" action :http-request="uploadFile">
                      <i class="avatar-uploader-icon" @click="uploadimage(2)">重新上传</i>
                    </el-upload>
                  </div>
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="carCode" label="承运车牌号码">
              <template slot-scope="scope">
                <el-input
                  style="position:absolute;width:120px;padding-right:0;left:0"
                  placeholder="承运车牌号码"
                  v-model="scope.row.carCode"
                ></el-input>
              </template>
            </el-table-column>

            <el-table-column prop="carOwner" label="所有人">
              <template slot-scope="scope">
                <el-input
                  style="position:absolute;width:120px;padding-right:0;left:0"
                  placeholder="所有人"
                  v-model="scope.row.carOwner"
                ></el-input>
              </template>
            </el-table-column>

            <el-table-column prop="carProperty" label="使用性质">
              <template slot-scope="scope">
                <el-input
                  style="position:absolute;width:120px;padding-right:0;left:0"
                  placeholder="使用性质"
                  v-model="scope.row.carProperty"
                ></el-input>
              </template>
            </el-table-column>

            <el-table-column prop="carVin" label="车辆识别代码">
              <template slot-scope="scope">
                <el-input
                  style="position:absolute;width:120px;padding-right:0;left:0"
                  placeholder="车辆识别代码"
                  v-model="scope.row.carVin"
                ></el-input>
              </template>
            </el-table-column>

            <el-table-column prop="carDrivingSsuedBy" label="发证机关">
              <template slot-scope="scope">
                <el-input
                  style="position:absolute;width:120px;padding-right:0;left:0"
                  placeholder="发证机关"
                  v-model="scope.row.carDrivingSsuedBy"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="carDrivingRegistDate" label="注册日期">
              <template slot-scope="scope">
                <el-input
                  style="position:absolute;width:120px;padding-right:0;left:0"
                  placeholder="注册日期"
                  v-model="scope.row.carDrivingRegistDate"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="carDrivingIssueDate" label="发证日期">
              <template slot-scope="scope">
                <el-input
                  style="position:absolute;width:120px;padding-right:0;left:0"
                  placeholder="发证日期"
                  v-model="scope.row.carDrivingIssueDate"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="carWeight" label="总质量">
              <template slot-scope="scope">
                <el-input
                  style="position:absolute;width:120px;padding-right:0;left:0"
                  placeholder="总质量"
                  v-model="scope.row.carWeight"
                ></el-input>
              </template>
            </el-table-column>
          </el-table>
        </template>
        
        <template>
          <el-table
            :data="vehicleInfo2"
            border
            style="width: 100%;position:relative;"
            @row-click="rowclick3"
          >
            <el-table-column prop="carTransportLicence" label="道路运输证号" style="height:30px;">
              <template slot-scope="scope" class="height_65">
                <el-input
                  style="position:absolute;width:125px;padding-right:0;top:10px;left:0;"
                  placeholder="道路运输证号"
                  v-model="scope.row.carTransportLicence"
                  clearable
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="carDrivingLicence" label="行驶证号">
              <template slot-scope="scope">
                <el-input
                  style="position:absolute;width:120px;padding-right:0;left:0;top:10px;"
                  placeholder="行驶证号"
                  v-model="scope.row.carDrivingLicence"
                ></el-input>
              </template>
            </el-table-column>

            <el-table-column prop="carModel" label="承运车型">
              <template slot-scope="scope">
                <el-input
                  style="position:absolute;width:120px;padding-right:0;left:0;top:10px;"
                  placeholder="承运车型"
                  v-model="scope.row.carModel"
                ></el-input>
              </template>
            </el-table-column>

            <el-table-column prop="carLength" label="承运车长">
              <template slot-scope="scope">
                <el-input
                  style="position:absolute;width:120px;padding-right:0;left:0;top:10px;"
                  placeholder="承运车长"
                  v-model="scope.row.carLength"
                ></el-input>
              </template>
            </el-table-column>

            <el-table-column prop="carLoad" label="承运载重">
              <template slot-scope="scope">
                <el-input
                  style="position:absolute;width:120px;padding-right:0;left:0;top:10px;height:100%"
                  placeholder="承运载重(核定载质量)"
                  v-model="scope.row.carLoad"
                ></el-input>
              </template>
            </el-table-column>

            <el-table-column prop="carBrand" label="承运车辆品牌">
              <template slot-scope="scope">
                <el-input
                  style="position:absolute;width:120px;padding-right:0;left:0;top:10px;"
                  placeholder="承运车辆品牌"
                  v-model="scope.row.carBrand"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="carOwnerType" label="车辆所有人类型">
              <template slot-scope="scope">
                <el-input
                  style="position:absolute;width:120px;padding-right:0;left:0;top:10px;"
                  placeholder="车辆所有人类型"
                  v-model="scope.row.carOwnerType"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="motCarPlatetypeCode" label="车辆类型代码">
              <template slot-scope="scope">
                <el-input
                  style="position:absolute;width:120px;padding-right:0;left:0;top:10px;"
                  placeholder="车辆类型代码"
                  v-model="scope.row.motCarPlatetypeCode"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="carEnergyType" label="车辆能源类型">
              <template slot-scope="scope">
                <el-input
                  style="position:absolute;width:120px;padding-right:0;left:0;top:10px;"
                  placeholder="车辆能源类型"
                  v-model="scope.row.carEnergyType"
                ></el-input>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>

      <!-- 其他信息 -->
      <div class="other width90" style="margin-top:10px">
        <h3>其他信息</h3>
        <el-table
          :data="otherInfo"
          border
          style="width: 100%;position:relative"
          @row-click="rowclick4"
        >
          <el-table-column prop="carImage" label="车辆照片">
            <template slot-scope="scope">
              <div class="goodsmessage_img">
                <div class="demo-image__preview goodsimg">
                  <el-image
                    class="avatar"
                    :src=" 'http://redox-test01.oss-cn-qingdao.aliyuncs.com' + scope.row.carImage "
                    :preview-src-list="srcList"
                  ></el-image>
                  <el-upload class="avatar-uploader" action :http-request="uploadFile">
                    <i class="avatar-uploader-icon" @click="uploadimage(3)">重新上传</i>
                  </el-upload>
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="carEnergyType" label="车辆能源类型"></el-table-column>

          <el-table-column prop="carIsAffiliated" label="是否挂靠"></el-table-column>

          <el-table-column prop="carOwnerStatement" label="车主声明">
            <template slot-scope="scope">
              <div class="goodsmessage_img">
                <div class="demo-image__preview goodsimg">
                  <el-image
                    class="avatar"
                    :preview-src-list="srcList"
                    :src=" 'http://redox-test01.oss-cn-qingdao.aliyuncs.com' + scope.row.carOwnerStatement "
                  ></el-image>
                  <el-upload class="avatar-uploader" action :http-request="uploadFile">
                    <i class="avatar-uploader-icon" @click="uploadimage(4)">重新上传</i>
                  </el-upload>
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="carCompanyStatement" label="企业声明">
            <template slot-scope="scope">
              <div class="goodsmessage_img">
                <div class="demo-image__preview goodsimg">
                  <el-image
                    class="avatar"
                    :preview-src-list="srcList"
                    :src="'http://redox-test01.oss-cn-qingdao.aliyuncs.com' + scope.row.carCompanyStatement"
                  ></el-image>
                  <el-upload class="avatar-uploader" action :http-request="uploadFile">
                    <i class="avatar-uploader-icon" @click="uploadimage(5)">重新上传</i>
                  </el-upload>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 审核 -->
      <div class="owneraudit width90">
        <p>车主信息审核</p>
        <div class="ownerR">
          <el-select v-model="newOwnerStatus" placeholder="请选择" disabled>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <div class="abnormal_reason" v-if="this.newOwnerStatus == 6">
            <el-input type="textarea" placeholder="请输入异常原因" v-model="abnormalReason" disabled></el-input>
          </div>
        </div>
      </div>

      <!-- 按钮 -->
      <div class="bottom_box">
        <el-button @click="back">返 回</el-button>
        <el-button type="primary" @click="recovery">恢复正常</el-button>
      </div>
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
      //存放大图
      srcList: [],
      //判断点击的是哪个图片上传
      flagImage: null,
      // 基本信息
      basicInfo: [],
      // 身份信息
      identityInfo: [],
      // 驾驶证信息
      driveInfo: [],
      groupBusinessLicense:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg", // 驾驶证照片
      // 行驶证信息
      vehicleInfo1: [],
      vehicleInfo2: [],
      // 其他信息
      otherInfo: [],
      // 审核选项 用户状态（0逻辑删除、1待认证、2待审核、3审核通过、4审核不通过、5禁止登陆，6异常）
      options: [],
      //审核
      options1: [
        //
        { value: "2", label: "待审核" },
        { value: "3", label: "审核通过" },
        { value: "4", label: "审核不通过" },
        { value: "6", label: "异常" }
      ],
      //查看详情
      options2: [
        { value: "3", label: "审核通过" },
        { value: "6", label: "异常" }
      ],
      newOwnerStatus: "", // 绑定的状态
      originalStatus: "", // 暂存原始状态
      abnormalReason: "", //审核审批说明
      userId: "" // 路由传过来的userId
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //修改
    rowclick(row, column, event) {
      console.log(row, column, event, 111);
    },
    rowclick1(row, column, event) {
      console.log(row, column, event, 222);
    },
    rowclick2(row, column, event) {
      console.log(row, column, event, 333);
    },
    rowclick3(row, column, event) {
      console.log(row, column, event, 444);
    },
    rowclick4(row, column, event) {
      console.log(row, column, event, 555);
    },
    //判断点的那个图片上传
    uploadimage(data) {
      this.flagImage = data;
    },
    //提货单照片
    uploadFile(file) {
      const that = this;
      const img = new Image();
      img.src = URL.createObjectURL(file.file);
      img.onload = function() {
        let param = new FormData();
        param.append("type", 5); // 13营业执照
        param.append("file", file.file);
        param.append("adress", "PC上传未有GPS地址!");
        that.$http.post(that.$api.Register.UploadImg, param, true).then(res => {
          if (res.data.code === 1) {
            that.$message({
              showClose: true,
              message: "上传成功",
              type: "success"
            });
            //switch语句决定要给那张图片赋值
            switch (this.flagImage) {
              case 0: //驾驶证照片
                that.otherInfo.driverLicenceImage = res.data.data.localUrl;
                break;
              case 1: //行驶证照片
                that.otherInfo.carDrivingImage = res.data.data.localUrl;
                break;
              case 2: //车辆照片
                that.otherInfo.carImage = res.data.data.localUrl;
                break;
              case 3: //车主声明
                that.otherInfo.carOwnerStatement = res.data.data.localUrl;
                break;
              case 4: //企业生命
                that.otherInfo.carCompanyStatement = res.data.data.localUrl;
                break;
            }
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
      });
    },
    // 点击返回
    back() {
      this.$router.go(-1);
    },
    // 获取车主审核详情
    getOwnerDetail() {
      let newUserId = "";
      if (this.$route.params.id) {
        newUserId = this.$route.params.id;
        localStorage.setItem("userId", this.$route.params.id);
      } else {
        newUserId = localStorage.getItem("userId");
      }
      this.$http
        .get(this.$api.Risks.getOwnerDetail + "?userId=" + newUserId, true)
        .then(res => {
          if (res.data.code == 1) {
            let data = res.data.data;
            console.log(res.data.data, "车主审核详情");
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
                bindOwnerType:
                  data.tmsUserBindBanks.bindOwnerType == 1 ? "本人" : "非本人",
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
                carEnergyType: data.tmsUserCar.carEnergyType
              }
            ];
            // 其他信息
            this.otherInfo = [
              {
                carImage: data.tmsUserCar.carImage,
                carEnergyType: data.tmsUserCar.carEnergyType,
                carIsAffiliated:
                  data.tmsUserCar.carIsAffiliated == 1 ? "是" : "否",
                carOwnerStatement: data.tmsUserCar.carOwnerStatement,
                carCompanyStatement: data.tmsUserCar.carCompanyStatement
              }
            ];
            this.originalStatus = data.tmsUser.userStatus; // 暂存原始状态
            this.newOwnerStatus = data.tmsUser.userStatus + "";
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
        });
    },
    //恢复异常
    recovery() {
      this.rowclick();
      this.rowclick1();
      this.rowclick2();
      this.rowclick3();
      this.rowclick4();
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getOwnerDetail();
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
.height_65 {
  height: 65px;
}
.el-table__row {
  height: 65px;
}
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
  position: relative;
}

.topTable,
.identitysbox,
.drivelicense,
.vehiclelicense,
.other,
.owneraudit {
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
  width: 60%;
}

.bottom_box .el-button {
  width: 300px;
  height: 40px;
  padding: 0;
}

.el-avatar {
  width: auto !important;
}
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
.head_title span {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 16px;
  color: #409eff;
  cursor: pointer;
}

</style>
