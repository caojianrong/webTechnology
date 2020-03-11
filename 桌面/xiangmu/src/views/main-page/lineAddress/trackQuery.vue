
<!--  -->
<template>
  <div class="audit">
    <div class="table_main">
      <div class="table_main_head">
        <div class="auditSolid">
          <div class="audiafter">筛选查询</div>
          <div class="auditheadright">
            <div class="audited_down">
              <i class="el-icon-download"></i>
              导出信息
            </div>
            <!-- <div class="senior_search">高级检索>></div> -->
          </div>
        </div>
      </div>
      <div class="audit_search">
        <!-- 单行搜索引擎 -->
        <el-form ref="searchInfo" :model="searchInfo" label-width="80px">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="5">
              <el-form-item label="运单号" prop="freightId">
                <el-input placeholder="请输入运单号" v-model="searchInfo.Waybill" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="5">
              <el-form-item label="车牌号" prop="truckNumber">
                <el-input placeholder="请输入车牌号" v-model="searchInfo.truckNumber" clearable></el-input>
              </el-form-item>
            </el-col>

            <el-col :xs="12" :sm="6" :md="4" :lg="2" :xl="2">
              <el-form-item label-width="0">
                <el-button size="medium" type="primary" @click="searchData()">查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <!-- 表格组件 -->
      <div class="table_com" style="height:100%;position:relative">
        <div class="positionding">
          <ul>
            <li style="margin-bottom:10px">
              <i>
                <img src="@/assets/images/red.png" alt="司机轨迹" />
              </i>
              <span style="margin-left:10px;color:rgb(252,109,31)">司机轨迹</span>
            </li>
            <li>
              <i>
                <img src="@/assets/images/blue.png" alt="车辆轨迹" />
              </i>
              <span style="margin-left:10px;color:rgb(139,174,247)">车辆轨迹</span>
            </li>
          </ul>
        </div>

        <!-- <baidu-map :zoom="3" :center="center">
          <bm-view class="baidumap"></bm-view>
          <bm-driving
            :start="{lng: 112.53, lat: 37.87}"
            :end="{lng: 112.53, lat: 37.87}"
            :auto-viewport="true"
          ></bm-driving>
          <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
        </baidu-map>-->
        <div class="baidumap" id="allmap" v-if="location"></div>
        <baidu-map
          class="baidumap"
          :center="{lng: 118.454, lat: 32.955}"
          :zoom="5"
          v-if="location==false"
        >
          <!-- <bml-curve-line :points="startend" strokeColor="green" :strokeWeight="15"></!-->
          <bm-polyline
            :path="points"
            stroke-color="rgb(252,109,31)"
            :stroke-opacity="1"
            :stroke-weight="5"
            :editing="true"
          ></bm-polyline>
          <bm-polyline
            :path="point"
            stroke-color="rgb(139,174,247)"
            :stroke-opacity="1"
            :stroke-weight="5"
            :editing="true"
          ></bm-polyline>
          <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
        </baidu-map>

        <div class="mapAddressMask">
          <div class="mapAdddInfo">
            <div class="mapInfoBox">
              <p class="mapInfoCont">{{rightMenu.shippingCode}}</p>
              <span class="intend mapInfoTitle">运单号:</span>
            </div>
            <div class="mapInfoBox">
              <p class="mapInfoCont">{{rightMenu.carCode}}</p>
              <span class="intend mapInfoTitle">车牌号:</span>
            </div>
            <div class="mapInfoBox">
              <p class="mapInfoCont">{{rightMenu.driverName}}</p>
              <span class="intend mapInfoTitle">承运人:</span>
            </div>
            <div class="mapInfoBox">
              <p class="mapInfoCont">{{rightMenu.driverMobile}}</p>
              <span class="mapInfoTitle">联系电话:</span>
            </div>
            <div class="mapInfoBox">
              <p class="mapInfoCont">{{rightMenu.orderCode}}</p>
              <span class="intend mapInfoTitle">订单号:</span>
            </div>
            <div class="mapInfoBox">
              <p class="mapInfoCont">{{rightMenu.truckingCode}}</p>
              <span class="mapInfoTitle">预派单号:</span>
            </div>

            <div class="mapInfoBox">
              <p class="shipment"></p>
            </div>
            <div class="mapInfoBox">
              <p class="upload"></p>
            </div>
            <div class="mapInfoBox">
              <h3 class="c">—— 状态跟踪 ——</h3>
            </div>
            <div class="mapInfoBox">
              <el-timeline>
                <el-timeline-item
                  v-for="(activity, index) in timeLines"
                  :key="index"
                  :type="activity.type"
                  :color="activity.color"
                  :timestamp="activity.timestamp"
                >{{activity.content}}</el-timeline-item>
              </el-timeline>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { BmlCurveLine } from "vue-baidu-map";
import axios from "axios";
export default {
  name: "audit",
  //import引入的组件需要注入到对象中才能使用
  components: {
    BmlCurveLine
  },
  data() {
    //这里存放数据
    return {
      searchInfo: {
        Waybill: "", //运单号
        truckNumber: "" //车牌号
      },
      center: { lng: 0, lat: 0 },
      //右侧菜单显示数据
      rightMenu: {
        shippingCode: null, //运单
        carCode: null, //车牌号
        driverName: null, //承运人
        driverMobile: null, //联系电话
        orderCode: null, //订单
        truckingCode: null, //预派单号
        createTime: null, //已接单时间
        loadReceiptTime: null, //已上传提货单时间
        unloadReceiptTime: null //已上传签收单时间
      },
      timeLines: [
        {
          content: "【已接单】",
          timestamp: null,
          color: "#75ABF8"
        },
        {
          content: "【已上传提货单】",
          timestamp: null,
          color: "#75ABF8"
        },
        {
          content: "【已上传签收单】",
          timestamp: null,
          color: "#f00"
        }
      ],
      //app 司机
      points: [],
      //车辆
      point: [],
      //起始位置线路
      startend: [],
      // //带有坐标的地图显示
      location: true,
      start: {}, //起点
      end: {} //终点
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //   查询按钮
    searchData() {
      this.map.clearOverlays(); //清除地图上所有覆盖物
      var url =
        this.$api.localtion.position +
        "?shippingCode=" +
        this.searchInfo.Waybill +
        "&carCode=" +
        this.searchInfo.truckNumber;
      this.$http.get(url, true).then(res => {
        this.rightMenu.shippingCode = res.data.data.shippingCode; //运单号
        this.rightMenu.carCode = res.data.data.carCode; //车牌号
        this.rightMenu.driverName = res.data.data.driverName; //承运人
        this.rightMenu.driverMobile = res.data.data.driverMobile; //联系电话
        this.rightMenu.orderCode = res.data.data.orderCode; //订单号
        this.rightMenu.truckingCode = res.data.data.trucking.truckingCode; //预派单号
        this.timeLines[0].timestamp = res.data.data.createTime; //已接单时间
        this.timeLines[1].timestamp = res.data.data.loadReceipt.createTime; //已上传提货单时间
        this.timeLines[2].timestamp =
          "2020-01-22 18:00:00" || res.data.data.unloadReceipt.createTime; //已上传签收单时间
        var startaddress =
          res.data.data.trucking.truckingLoadAddress.addressDesc; //起点位置

        var startLon = res.data.data.trucking.truckingLoadAddress.addressLon; //起点经度
        var startLat = res.data.data.trucking.truckingLoadAddress.addressLat; //起点纬度
        var endaddress =
          res.data.data.trucking.truckingUnLoadAddress.addressDesc; //终点位置
        var endLon = res.data.data.trucking.truckingLoadAddress.addressLon; //终点经度
        var endLat = res.data.data.trucking.truckingLoadAddress.addressLat; //终点纬度
        var lists = {};
        var list = {};
        res.data.data.shipLocationMongo.map(item => {
          //司机
          lists.lng = item.app_lon;
          lists.lat = item.app_lat;
          //车辆
          list.lng = item.car_lon;
          list.lat = item.car_lat;
          this.points.push(lists); //司机
          this.point.push(list); //车辆
          lists = {};
          list = {};
        });
        console.log(this.points, "司机", this.point, "车辆");
        //根据位置获取起点经纬度
        axios({
          methods: "get",
          url:
            this.$api.localtion.LonLat +
            "?address=" +
            startaddress +
            "&ak=" +
            "LI6j6rxVDwp3698Gfx89GMGASVUfG2iZ" +
            "&output=json",
          baseURL: "/geocoding"
        }).then(res => {
          var list = {};
          list.lng = res.data.result.location.lng; //起点经度
          list.lat = res.data.result.location.lat; //起点纬度
          this.startend.push(list);
        });
        //根据位置获取终点经纬度
        axios({
          methods: "get",
          url:
            this.$api.localtion.LonLat +
            "?address=" +
            endaddress +
            "&ak=" +
            "LI6j6rxVDwp3698Gfx89GMGASVUfG2iZ" +
            "&output=json",
          baseURL: "/geocoding"
        }).then(res => {
          var list = {};
          list.lng = res.data.result.location.lng; //终点经度
          list.lat = res.data.result.location.lat; //终点纬度
          this.startend.push(list);
        });
        console.log(this.startend);
        var origin = 40.01116 + "," + 116.339303;
        var destination = 39.936404 + "," + 116.452562;

        //获取线路
        // axios({
        //   methods: "get",
        //   url:
        //     this.$api.localtion.getline +
        //     "?origin=" +
        //     origin +
        //     "&ak=" +
        //     "LI6j6rxVDwp3698Gfx89GMGASVUfG2iZ" +
        //     "&destination=" +
        //     destination +
        //     "&output=json",
        //   baseURL: "/directionlite"
        // }).then(res => {
        //   console.log(res, "获取路线");
        // });
      });
      this.location = false;
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // 创建Map实例
    this.map = new BMap.Map("allmap");
    // 初始化地图,设置中心点坐标
    var point = new BMap.Point(121.160724, 31.173277); // 创建点坐标
    this.map.centerAndZoom(point, 10);
    //添加鼠标滚动缩放
    this.map.enableScrollWheelZoom();

    // var origin = "latlng:40.01116,116.339303|name:我家";
    // var url =
    //   this.$api.localtion.getgui +
    //   "?origin=" +
    //   origin +
    //   "&destination=大雁塔" +
    //   "&mode=driving" +
    //   "&region=西安" +
    //   "&output=html" +
    //   "&src=webapp.baidu.openAPIdemo";

    // console.log(url);

    // axios({
    //   methods: "get",
    //   url: url,
    //   baseURL: "/direction"
    // });
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

<style>
/* @import url(); 引入公共css类 */
@import url("../../../assets/css/singularTable.css");
.map {
  width: 100%;
  height: 100%;
  background: red;
}
.bm-view {
  width: 100%;
  height: 582px;
}
.positionding {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1000 !important;
}
.BMap_stdMpCtrl {
  right: 210px !important;
}
.baidumap {
  width: 100%;

  height: 583px;
  border: 1px solid #659cfe;
  margin: auto;
  padding-bottom: 20px;
}
.mapAddressMask {
  width: 200px;
  height: 580px;
  background: rgba(255, 255, 255, 0.7);
  height: 100%;
  position: absolute;
  top: 0%;
  right: 0;
  height: 100%;
}
.mapAdddInfo {
  width: 200px;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}
/* 去除百度地图版权那行字 和 百度logo */
.baidumap > .BMap_cpyCtrl {
  display: none !important;
}
.baidumap > .anchorBL {
  display: none !important;
}
.mapInfoBox {
  position: relative;
  margin-bottom: 10px;
}
.mapInfoTitle {
  position: absolute;
  left: 0px;
  height: 24px;
  line-height: 24px;
  width: 60px;
  top: 0;
  text-align: right;
}
.mapInfoCont {
  margin-left: 60px;
  height: 24px;
  line-height: 24px;
}
.intend {
  letter-spacing: 2px;
}
.shipment {
  color: #fb7711;
  padding-left: 30px;
  background: url("../../../assets/images/sendicon.png") no-repeat left top;
}
.upload {
  color: #4ad804;
  padding-left: 30px;
  background: url("../../../assets/images/uploadicon.png") no-repeat left top;
}
.c {
  text-align: center;
}
</style>