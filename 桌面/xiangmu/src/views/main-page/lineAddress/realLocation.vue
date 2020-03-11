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
        <el-form ref="formData" :model="formData" label-width="80px">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="5">
              <el-form-item label="车牌号" prop="valueTime">
                <el-input placeholder="请输入车牌号" v-model="formData.valueTime" clearable></el-input>
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
        <div class="baidumap" id="allmap" v-if="location"></div>
        <!-- 地图开始 -->
        <baidu-map class="baidumap" :center="center" :zoom="zoom" v-if="location==false">
          <bm-marker :position="center" animation="BMAP_ANIMATION_BOUNCE"></bm-marker>
          <!-- 放大缩小地图 -->
          <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
        </baidu-map>

        <!-- 地图结束 -->
        <div class="mapAddressMask">
          <ul>
            <li class="address-mask-main">
              承运人：
              <span>{{right.name}}</span>
            </li>
            <li class="address-mask-main">
              联系电话：
              <span>{{right.mobile}}</span>
            </li>
            <li class="address-mask-main">
              车辆状态：
              <span>{{right.status}}</span>
            </li>
            <li class="address-mask-main">
              当前位置：
              <span>{{right.address}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
    </div>
  </div>
</template>



<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
export default {
  name: "audit",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      formData: {
        valueTime: null
      },
      // 时间
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        }
      },
      //地图右侧菜单信息
      right: {
        //承运人
        name: "",
        //联系电话
        mobile: "",
        //车辆状态
        status: "",
        //当前位置
        address: ""
      },
      //带有坐标的地图显示
      location: true,
      center: { lng: 0, lat: 0 },
      zoom: 3
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
      if (this.formData.valueTime == null) {
        this.$message({
          showClose: true,
          message: "请填写需要查询的车牌号",
          type: "error"
        });
      } else {
        this.location = false;
        this.locationfalse = true;
        // console.log(this.rightMenu);
        this.$http
          .get(
            this.$api.localtion.Alwayslocaltion + "/" + this.formData.valueTime,
            true
          )
          .then(res => {
            var lng = res.data.car_lon; //车辆经度
            var lat = res.data.car_lat; //车辆纬度
            this.right.name = res.data.driver_name; //承运人
            this.right.mobile = res.data.user_mobile; //联系电话
            this.right.status = res.data.car_status == 0 ? "未行使" : "行驶中"; //车辆状态   0未行使   1行驶中
            this.right.address = res.data.car_address; //当前位置

            this.handler(lng, lat);
            // console.log(res, "车牌获取的数据");
          });
      }
    },
    handler(lng, lat) {
      // console.log(lng, lat);
      this.center.lng = lng;
      this.center.lat = lat;
      this.zoom = 15;
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    //创建Map实例
    this.map = new BMap.Map("allmap");
    // 初始化地图,设置中心点坐标
    var point = new BMap.Point(116.404, 39.915); // 创建点坐标
    this.map.centerAndZoom(point, 10);
    //添加鼠标滚动缩放
    this.map.enableScrollWheelZoom();
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
/* 去除百度地图版权那行字 和 百度logo */
.baidumap > .BMap_cpyCtrl {
  display: none !important;
}
.baidumap > .anchorBL {
  display: none !important;
}

/* 左侧状态栏样式 */
.address-mask-main {
  min-height: 30px;
  line-height: 30px;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 14px;
}
.mapAddressMask ul {
  margin-top: 20px;
}
</style>