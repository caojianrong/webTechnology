<!--  -->
<template>
  <div class="lines">
    <div class="table_main">
      <div class="table_main_head">
        <div class="auditSolid">
          <div class="audiafter">筛选查询</div>
          <div class="auditheadright">
            <div class="audited_down">
              <i class="el-icon-download"></i>
              导出信息
            </div>
            <!-- <div class="senior_search">
              高级检索
              <i class="el-icon-d-arrow-right"></i>
            </div>-->
          </div>
        </div>
      </div>
      <div class="audit_search">
        <!-- 单行搜索引擎 -->
        <el-form ref="formData" :model="formData" label-width="80px">
          <el-row :gutter="10">
            <!-- <el-col :xs="24" :sm="6" :md="4" :lg="5" :xl="4">
              <el-form-item label="公司名称" prop="value">
                <el-select class="select_default" v-model="companyDefault" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>-->

            <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
              <el-form-item label="项目名称" prop="value">
                <el-input placeholder="请输入内容" v-model="formData.project" clearable></el-input>
              </el-form-item>
            </el-col>

            <!-- <el-col :xs="24" :sm="6" :md="4" :lg="5" :xl="5">
              <el-form-item label-width="0" prop="input">
                <el-input placeholder="请输入内容" v-model="formData.input" clearable></el-input>
              </el-form-item>
            </el-col>-->

            <el-col :xs="12" :sm="6" :md="4" :lg="2" :xl="2">
              <el-form-item label-width="0">
                <el-button size="medium" type="primary" @click="searchData()">查询</el-button>
              </el-form-item>
            </el-col>

            <el-col :xs="12" :sm="6" :md="4" :lg="2" :xl="2">
              <el-form-item label-width="0">
                <el-button size="medium" @click="resetData('formData')" class="reset">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <!-- 表格组件 -->
      <div class="table_com">
        <div class="tab_operation">
          <el-button
            type="primary"
            v-for="(item,index) in goodsTitle"
            :key="index"
            @click="showModel(index,'form')"
            class="reset reset_tab"
          >{{item}}</el-button>
          <el-button class="reset reset_tab" type="primary" @click="delLine()">删除线路</el-button>
        </div>
        <!-- 表单组件 -->
        <div class="list-box">
          <tabComp :tableHeader="auditedName" :tableData1="list"></tabComp>
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="page"
            :limit.sync="limit"
            @pagination="getList"
          />
        </div>
      </div>
    </div>
    <el-dialog
      width="760px"
      :title="activeName"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      @close="closeDialogNewProject"
    >
      <el-form :model="form" ref="form" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="关联项目" prop="projectId">
                <el-select v-model="form.projectId" placeholder="请选择项目">
                  <el-option
                    v-for="item in bindProjectData"
                    :label="item.projectName"
                    :key="item.projectId"
                    :value="item.projectName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="发/收货人" prop="addressType">
                <el-select
                  v-model="form.addressType"
                  placeholder="请选择发/收货人"
                  @input="sendman(form.addressType)"
                >
                  <el-option
                    v-for="item in addressSelect"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="12">
            <div class="grid-content bg-purple">
              <div class="grid-content bg-purple">
                <el-form-item label="发/收货单位" prop="addressCompany">
                  <el-input v-model="form.addressCompany" placeholder="发货单位 例如:xxxxxx公司"></el-input>
                </el-form-item>
              </div>
            </div>
          </el-col>
          <!-- <el-col :span="12" v-if="Certificates">
            <div class="grid-content bg-purple">
              <el-form-item label="证件号" prop="addressContactIdentity">
                <el-input v-model="form.addressContactIdentity" placeholder="社会信用代码或身份证"></el-input>
              </el-form-item>
            </div>
          </el-col>-->

          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="联系人" prop="addressContacter">
                <el-input v-model="form.addressContacter" placeholder="联系人 例如:王先生"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="联系电话" prop="addressContactMobile">
                <el-input v-model="form.addressContactMobile" placeholder="例如:134****7531,可为座机号"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="地址" prop="addressAreaId">
                <el-cascader
                  v-model="form.addressAreaId"
                  :options="getCityCode"
                  clearable
                  placeholder="请选择地址"
                ></el-cascader>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content bg-purple">
              <el-form-item label="详细地址" prop="addressDetail">
                <el-input v-model="form.addressDetail" placeholder="详细地址 例如:北京市朝阳区XX街"></el-input>
              </el-form-item>
            </div>
          </el-col>

          <div class="posimap">
            <p class="unverified" v-if="verificationFlag">
              <span @click="goMap">地图未验证>></span>
            </p>
            <p class="verification" v-else>
              <span @click="goMap">地图已验证</span>
            </p>
          </div>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()" size="medium">取 消</el-button>
        <el-button type="primary" size="medium" @click="subMask('form')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 地图弹窗开始 -->
    <el-dialog
      width="700px"
      title="地图验证"
      :visible.sync="dialogFormVisibleMap"
      :close-on-click-modal="false"
    >
      <el-form :model="form" ref="form" label-width="100px" class="demo-ruleForm">
        <el-row :gutter="20" style="margin-bottom:0">
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <div class="grid-content bg-purple">
                <el-form-item label="详细地址" prop="addressDetail" class="map_address">
                  <el-input v-model="form.addressDetail"></el-input>
                </el-form-item>
              </div>
            </div>
          </el-col>

          <baidu-map class="map_content" :center="center" :zoom="zoom">
            <bm-marker
              :position="center"
              animation="BMAP_ANIMATION_BOUNCE"
              :dragging="true"
              @dragend="dragginged"
            ></bm-marker>
            <!-- 放大缩小地图 -->
            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
          </baidu-map>
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-form-item label-width="0">
                <el-button
                  class="subBtn"
                  type="primary"
                  size="medium"
                  @click="subMaskMap('form')"
                >确 定</el-button>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!-- 地图弹窗结束 -->
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import tabComp from "../../../compontes/tabComp";
import singularTable from "../../../compontes/singularTable";
import Pagination from "../../../compontes/pagtion";
import axios from "axios";
export default {
  name: "lines",
  //import引入的组件需要注入到对象中才能使用
  components: {
    tabComp,
    singularTable,
    Pagination
  },
  data() {
    //这里存放数据
    return {
      //证件号是否显示
      Certificates: false,
      //   地图需要
      map: "",
      //表单验证   自定义验证validator
      rules: {
        //关联项目
        projectId: [
          {
            required: true,
            message: " 关联项目不能为空",
            trigger: ["blur", "change"]
          }
        ],
        //收发货人类型
        addressType: [
          {
            required: true,
            message: "收/发货人类型不能为空",
            trigger: ["blur", "change"]
          }
        ],
        //发货单位
        addressCompany: [
          {
            required: true,
            message: "发货单位不能为空 ",
            trigger: ["blur", "change"]
          }
        ],
        //信用代码个人证件号
        addressContactIdentity: [
          {
            required: true,
            message: "证件号不能为空 ",
            trigger: ["blur", "change"]
          },
          {
            pattern:
              /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/g |
              /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g,
            message: "请输入有效的证件号或信用代码"
          }
        ],
        //联系人
        addressContacter: [
          {
            required: true,
            message: "联系人不能为空 ",
            trigger: ["blur", "change"]
          }
        ],
        //联系电话
        addressContactMobile: [
          {
            required: true,
            message: " 联系电话/座机号不能为空",
            trigger: ["blur", "change"]
          },
          { pattern: /^1[34578]\d{9}$/g|/^[0][1-9]{2,3}-[0-9]{5,10}$/g, message: "请输入有效的联系电话/座机号" }
        ],
        //地址
        addressAreaId: [
          {
            required: true,
            trigger: "blur",
            message: "请选择您的地址"
          }
        ],
        //详细地址
        addressDetail: [
          {
            required: true,
            message: "详细地址不能为空 ",
            trigger: ["blur", "change"]
          }
        ],
        //地址描述（可不填）
        addressDesc: [
          { required: true, message: " ", trigger: ["blur", "change"] }
        ]
      },
      // 分页数据
      list: null, //请求回来填充表格的数据
      total: 0, //数据总条数
      page: 1, //默认显示第1页
      limit: 10, //默认一次显示10条数据
      companyDefault: 1,
      dialogFormVisibleMap: false,
      verificationFlag: true,
      // 表头数据
      auditedName: [
        {
          tabTh: "项目名称",
          tabItem: "project_projectName",
          isShow: true
        },
        {
          tabTh: "发/收货人",
          tabItem: "addressType",
          isShow: true
        },
        {
          tabTh: "公司名称",
          tabItem: "addressCompany",
          isShow: true
        },
        {
          tabTh: "详细地址",
          tabItem: "addressDetail",
          isShow: true
        },
        {
          tabTh: "省",
          tabItem: "addressArea_provinceName",
          isShow: true
        },
        {
          tabTh: "市",
          tabItem: "addressArea_cityName",
          isShow: true
        },
        {
          tabTh: "区",
          tabItem: "addressArea_areaName",
          isShow: true
        },
        {
          tabTh: "联系人",
          tabItem: "addressContacter",
          isShow: true
        },
        {
          tabTh: "电话",
          tabItem: "addressContactMobile",
          isShow: true
        },
        {
          tabTh: "创建时间",
          tabItem: "createTime",
          isShow: true
        }
      ],
      formData: {
        value1: "",
        value: "",
        input: "",
        project: "" //项目名称
      },
      value1: "",
      input: "",
      //搜索选择
      options: [
        {
          value: 1,
          label: "项目名称"
        }
      ],
      value: "",
      //新建弹框的显示隐藏
      dialogFormVisible: false,
      activeName: "first",
      input2: "",
      form: {
        //线路所属项目ID
        projectId: "",
        //地址类型（1发货地、2收货地）
        addressType: "",
        //公司名称 / 姓名
        addressCompany: "",
        //区县ID
        addressAreaId: "",
        //详细地址
        addressDetail: "",
        //详细地址经度
        addressLon: "",
        //详细地址纬度
        addressLat: "",
        //联系人
        addressContacter: "",
        // 电话
        addressContactMobile: "",
        // //收货人信用代码或个人证件号（地址类型为收货地，此字段必填）
        // addressContactIdentity: "",
        //地址描述
        addressDesc: ""
      },
      goodsTitle: ["新建线路", "修改线路"],
      // 关联项目下拉框
      bindProjectData: [],
      addressSelect: [
        {
          label: "发货人",
          value: 1
        },
        {
          label: "收货人",
          value: 2
        }
      ],
      //这个判断是修改还是新增  0为新增  1为修改
      isIndex: null,
      // 省市区回显数据
      allPro: [],
      //即将要修改的线路ID
      xianluID: null,
      center: { lng: 0, lat: 0 },
      zoom: 3
    };
  },
  //监听属性 类似于data概念
  computed: {
    getCityCode() {
      return this.$store.state.provinceCode;
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //取消弹窗按钮
    cancel() {
      this.dialogFormVisible = false;
      //this.form={}
      //Object.assign(this.$data, this.$options.data.call(this));
    },
    //发货人收货人 判断
    sendman(data) {
      // console.log(data, "发货人 /收货人");
      //2  收货人 0
      if (data == 2) {
        this.Certificates = false;
      } else {
        this.Certificates = true;
      }
    },
    // 开启地图弹窗方法
    goMap() {
      if (this.form.addressDetail != "") {
        this.dialogFormVisibleMap = true;

        axios({
          methods: "get",
          url:
            this.$api.localtion.LonLat +
            "?address=" +
            this.form.addressDetail +
            "&ak=" +
            "LI6j6rxVDwp3698Gfx89GMGASVUfG2iZ" +
            "&output=json",
          baseURL: "/geocoding"
        }).then(res => {
          // console.log(res, "新建线路获取经纬度");
          this.center.lng = res.data.result.location.lng;
          this.center.lat = res.data.result.location.lat;
          this.zoom = 15;
          //经度
          this.form.addressLon = res.data.result.location.lng;
          //纬度
          this.form.addressLat = res.data.result.location.lat;
        });
      } else {
        this.$message({
          message: "请输入详细地址",
          type: "warning"
        });
      }
    },
    //地图确定关闭弹窗
    subMaskMap() {
      if (this.form.addressDetail) this.dialogFormVisibleMap = false;
      // this.dragginged()
      this.verificationFlag = false;
    },
    dragginged() {
      // console.log(type, target, pixel, point)
      // alert(111);
      // console.log(event);
    },
    //  新增/修改确认按钮
    subMask(Form) {
      var that = this;
      this.$refs[Form].validate(valid => {
        if (valid) {
          //项目绑定ID
          let projectID;
          //判断this.isIndex 是0(新增)还是1(修改)
          if (this.isIndex == 0) {
            if (this.verificationFlag == true) {
              this.$message.error("请您进行地图验证");
              // console.log(this.form.addressLon, this.form.addressLat, "获取经纬度");
            } else {
              //遍历数组拿到项目绑定ID
              this.bindProjectData.map(item => {
                if (that.form.projectId == item.projectName) {
                  projectID = item.projectId;
                }
              });
              let param = new URLSearchParams();
              //线路所属项目 ID
              param.append("projectId", projectID);
              //地址类型（1发货地、2收货地）
              param.append("addressType", that.form.addressType);
              //公司名称 / 姓名
              param.append("addressCompany", that.form.addressCompany);
              //区县ID
              param.append("addressAreaId", Number(that.form.addressAreaId[2]));
              //详细地址
              param.append("addressDetail", that.form.addressDetail);
              //详细地址经度
              param.append("addressLon", that.form.addressLon);
              //详细地址纬度
              param.append("addressLat", that.form.addressLat);
              //联系人
              param.append("addressContacter", that.form.addressContacter);
              // 电话
              param.append(
                "addressContactMobile",
                that.form.addressContactMobile
              );
              // //收货人信用代码或个人证件号（地址类型为收货地，此字段必填）
              // param.append(
              //   "addressContactIdentity",
              //   that.form.addressContactIdentity
              // );

              param.append("addressDesc", that.form.addressDesc); //地址描述

              this.$http
                .post(this.$api.Basics.newAddLine, param, true)
                .then(res => {
                  // console.log(res, "这里是 新增请求回来的数据");
                  if (res.data.code == 1) {
                    this.$message({
                      showClose: true,
                      message: res.data.message,
                      type: "success"
                    });
                    this.dialogFormVisible = false;
                    this.$forceUpdate();
                    this.getList();
                  } else {
                    this.$message({
                      showClose: true,
                      message: res.data.message,
                      type: "error"
                    });
                  }
                });
            }
          } else {
            //否则 是修改
            // console.log(this.xianluID, "即将修改的线路ID");
            //遍历数组拿到项目绑定ID
            this.bindProjectData.map(item => {
              if (that.form.projectId == item.projectName) {
                projectID = item.projectId;
              }
            });
            // this.verificationFlag = false;
            let param = new URLSearchParams();
            //线路ID
            param.append("addressId", this.xianluID);
            //线路所属项目 ID
            param.append("projectId", projectID);
            //地址类型（1发货地、2收货地）
            param.append("addressType", that.form.addressType);
            //公司名称 / 姓名
            param.append("addressCompany", that.form.addressCompany);
            //区县ID
            param.append("addressAreaId", Number(that.form.addressAreaId[2]));
            //详细地址
            param.append("addressDetail", that.form.addressDetail);
            //详细地址经度
            param.append("addressLon", that.form.addressLon);
            //详细地址纬度
            param.append("addressLat", that.form.addressLat);
            //联系人
            param.append("addressContacter", that.form.addressContacter);
            // 电话
            param.append(
              "addressContactMobile",
              that.form.addressContactMobile
            );
            // //收货人信用代码或个人证件号（地址类型为收货地，此字段必填）
            // param.append(
            //   "addressContactIdentity",
            //   that.form.addressContactIdentity
            // );

            param.append("addressDesc", that.form.addressDesc); //地址描述

            this.$http
              .post(this.$api.Basics.editLine, param, true)
              .then(res => {
                console.log(res, "这里是 修改请求回来的数据");
                if (res.data.code == 1) {
                  this.$message({
                    showClose: true,
                    message: res.data.message,
                    type: "success"
                  });
                  this.dialogFormVisible = false;
                  this.getList();
                } else {
                  this.$message({
                    showClose: true,
                    message: res.data.message,
                    type: "error"
                  });
                }
              });
          }
        }
      });
    },
    //删除线路方法(完成)
    delLine() {
      let projectIdList = this.$store.state.selectData;
      if (projectIdList.length == 0) {
        this.$message({
          showClose: true,
          message: "请选择至少一个项目进项删除",
          type: "error"
        });
        return false;
      }
      let addressId = projectIdList[0].addressId;
      this.$confirm("确定删除该线路吗", "操作", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .get(this.$api.Basics.delLine + "?addressId=" + addressId, true)
            .then(res => {
              if (res.data.code == 1) {
                this.$message({
                  showClose: true,
                  message: res.data.message,
                  type: "success"
                });
                this.getList();
              } else {
                this.$message({
                  showClose: true,
                  message: res.data.message,
                  type: "error"
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
      // console.log(projectIdList, "删除获取ID", addressId);
    },
    // 根据index判断是新建还是修改还是删除 0新建  1修改
    showModel(index, form) {
      this.isIndex = index;
      this.activeName = this.goodsTitle[index];
      if (index == 0) {
        this.dialogFormVisible = true;
        this.verificationFlag = true;
        //this.$refs[form].resetFields();
      } else {
        //获取选中数据
        let projectIdList = this.$store.state.selectData;
        if (projectIdList) {
          if (projectIdList.length > 1 || projectIdList.length == 0) {
            this.dialogFormVisible = false;
            this.$message({
              showClose: true,
              message: "请选择一条线路进行修改",
              type: "error"
            });
          } else {
            this.dialogFormVisible = true;
            this.verificationFlag = false;
            this.$http
              .get(
                this.$api.Basics.editLineMsg,
                {
                  params: {
                    addressId: projectIdList[0].addressId
                  }
                },
                true
              )
              .then(res => {
                //线路ID
                this.xianluID = res.data.data.addressId;
                // console.log(res, "修改获取回来的数据");
                if (res.data.code == 1) {
                  //通过遍历回显绑定项目
                  let projectIdhuixian;
                  this.bindProjectData.map(item => {
                    if (res.data.data.projectId == item.projectId) {
                      projectIdhuixian = item.projectName;
                    }
                  });
                  //线路所属项目ID
                  this.form.projectId = projectIdhuixian;
                  //地址类型（1发货地、2收货地）
                  this.form.addressType = res.data.data.addressType;
                  //公司名称 / 姓名
                  this.form.addressCompany = res.data.data.addressCompany;
                  //详细地址
                  this.form.addressDetail = res.data.data.addressDetail;
                  //详细地址经度
                  (this.form.addressLon = res.data.data.addressLon),
                    //详细地址纬度
                    (this.form.addressLat = res.data.data.addressLat),
                    //联系人
                    (this.form.addressContacter =
                      res.data.data.addressContacter),
                    // 电话
                    (this.form.addressContactMobile =
                      res.data.data.addressContactMobile),
                    //收货人信用代码或个人证件号（地址类型为收货地，此字段必填）
                    (this.form.addressContactIdentity =
                      res.data.data.addressContactIdentity),
                    //格式化区县ID
                    this.getPrvoince(res.data.data.addressAreaId.toString()),
                    //区县ID
                    (this.form.addressAreaId = this.allPro);
                }
              });
          }
        }
      }
    },
    //弹窗关闭方法
    closeDialogNewProject() {
      //this.$refs["form"].resetFields(); // this.$refs.adduserform.resetFields();
      //this.$nextTick(() => {});
    },
    //加载下拉框数据
    bingProject() {
      //绑定项目
      this.$http.post(this.$api.Basics.addwuliaotype, "", true).then(res => {
        // console.log(res, "绑定项目下拉框");
        this.bindProjectData = res.data.data;
      });
    },
    // 搜索
    searchData() {
      this.page = 1;
      this.limit = 10;
      this.getList();
    },
    // 分页和加载数据方法
    getList() {
      var start = this.page;
      var end = this.limit;
      var url;
      url =
        this.$api.Basics.line +
        "?page=" +
        start +
        "&rows=" +
        end +
        "&project.projectName=" +
        this.formData.project;
      this.$http
        .get(url, true)
        .then(res => {
          const _data = res.data.data.list;
          // console.log(_data,'_data')
          _data.forEach((item, index, arr) => {
            item.project_projectName = item.project.projectName;
            item.addressType = item.addressType == 1 ? "发货人" : "收货人";
            item.addressArea_provinceName = item.addressArea.provinceName;
            item.addressArea_cityName = item.addressArea.cityName;
            item.addressArea_areaName = item.addressArea.areaName;
          });
          //表格数据
          // console.log(_data, '订单列表');
          this.list = _data;
          this.total = res.data.data.total;
          this.$store.commit("getTableData", this.list);

          //表格数据
          /*
          this.list = res.data.data.list;
          this.total = res.data.data.total;
          this.$store.commit("getTableData", this.list);
          */
        })
        .catch(err => {
          console.log("失败");
        });
    },
    resetData(fromData) {
      this.$refs[fromData].resetFields();
      this.page = 1;
      this.limit = 10;
      this.formData.project = "";
      this.getList();
      this.dialogFormVisible = false;
    },
    // 用省市区ID 查找省市区文字
    getPrvoince(code) {
      let str = code;
      let provinceCode = str.substring(0, 2) + "0000";
      let cityCode = str.substring(0, 4) + "00";
      this.allPro[0] = provinceCode;
      this.allPro[1] = cityCode;
      this.allPro[2] = code;
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    let that = this;
    this.$store.dispatch("getOptions", that);
    this.getList();
    this.bingProject();
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
@import url("../../../assets/css/singularTable.css");
.lineHe .el-form-item__label {
  line-height: 20px;
}
.el-row {
  margin-bottom: 20px;
}
.subBtn {
  width: 240px;
  margin: 0 auto;
  display: block;
}
.unverified {
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 62, 3, 1);
  text-align: right;
  margin-bottom: 20px;
}
.verification {
  font-size: 11px;
  font-weight: 400;
  color: rgba(101, 156, 254, 1);
  text-align: right;
  margin-bottom: 20px;
}
.map_content {
  width: 100%;
  height: 320px;
  /* background: red; */
  margin-bottom: 90px;
}
.el-dialog__header {
  border-bottom: 1px solid #dcdfe6;
}
.map_address .el-form-item__label {
  text-align: left;
}
.iHeight .el-form-item__label {
  line-height: 20px;
}
.el-select {
  width: 250px;
}
.el-cascader {
  width: 250px;
}
.posimap {
  position: absolute;
  right: 15px;
  bottom: 14px;
}
</style>