<template>
  <div class="index" style="padding:10px">
    <div class="Entrance">快捷入口</div>
    <!-- 货主端快捷通道 -->
    <div class="flex">
      <div
        :class="activeIndex==index?'wh':'blue'"
        v-for="(item,index) in data"
        :key="index"
        @mouseenter="hoverIndex(index)"
        @click="toPage(item.link)"
      >
        <div class="posi" v-if=" index < 3">
          {{item.number}}
        </div>
        <img :src="item.icon" class="icon_img" />
        <div style="margin-top:10px;">{{item.span}}</div>
        <img src="../../assets/images/kuang.png" class="imgposi" v-if="activeIndex==index" />
      </div>
    </div>
    <!-- 货主端快捷通道结束 -->

    
    <div class="notice"  >
      <h2 style="display:inline-block;margin-right:7px;font-weight:600">服务通知</h2>
      <span>
        <img src="../../assets/images/tuoyuan.png" />
      </span>
    </div>
    <div class="fuwu" >当前暂无服务通知</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      //控制选中状态
      activeIndex: 0,
      // //此处判断为货主还是平台
      // userFlag: null,
      //存放快捷通道所需数据
      data: [
        {
          icon: require("../../assets/images/ketihuo.png"),
          number: 1,
          span: "可提货运单",
          link: "/workManage/shippingManage/shippingList"
        },
        {
          icon: require("../../assets/images/keqianshou.png"),
          number: 2,
          span: "可签收运单",
          link: "/workManage/shippingManage/shippingList"
        },
        {
          icon: require("../../assets/images/kezhifu.png"),
          number: 3,
          span: "可申请付款运单",
          link: "/finance/settle/waybillSettlement"
        },
        {
          icon: require("../../assets/images/addorder.png"),
          number: 4,
          span: "新建订单",
          link: "/workManage/order/orderInfo"
        },
        {
          icon: require("../../assets/images/paiche.png"),
          number: 5,
          span: "派车",
          link: "/workManage/order/orderInfo"
        },
        {
          icon: require("../../assets/images/tihuo.png"),
          number: 6,
          span: "提货",
          link: "/workManage/shippingManage/shippingList"
        },
        {
          icon: require("../../assets/images/qianshou.png"),
          number: 7,
          span: "签收",
          link: "/workManage/shippingManage/shippingList"
        },
        {
          icon: require("../../assets/images/zhifu.png"),
          number: 8,
          span: "支付",
          link: "/finance/settle/waybillSettlement"
        }
      ],
    };
  },
  components: {},
  methods: {
    hoverIndex(index) {
      this.activeIndex = index;
    },
    getTask() {
      this.$http
        .post(this.$api.Index.getGroupTask, null, true)
        .then(res => {
          if (res.data.code == 1) {
            //表格数据
            var result = res.data.data;
            this.data[0].number = result.load;
            this.data[1].number = result.unload;
            this.data[2].number = result.pay;
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
    toPage(url) {
      this.$router.push({
        path: url
      });
    }
  },
  beforeCreate: function() {
    //可以在这加个loading事件
    //console.group('beforeCreate 创建前状态===============》');
  },
  created: function() {
    this.getTask();
    // console.log(this.$route.query.roleId)
    //在这结束loading，还做一些初始化，实现函数自执行
    //console.group('created 创建完毕状态===============》');
  },
  beforeMount: function() {
    //console.group('beforeMount 挂载前状态===============》');
  },
  mounted: function() {
    //获取货主/平台状态，确认身份  1平台  2货主
    // this.userFlag=localStorage.getItem("userFlag")
    //在这发起后端请求，拿回数据，配合路由钩子做一些事情
    //console.group('mounted 挂载结束状态===============》');
  },
  beforeUpdate: function() {
    //console.group('beforeUpdate 更新前状态===============》');
  },
  updated: function() {
    //console.group('updated 更新完成状态===============》');
  },
  beforeDestroy: function() {
    // 你确认删除XX吗？  当前组件已被删除，清空相关内容
    //console.group('beforeDestroy 销毁前状态===============》');
  },
  destroyed: function() {
    //console.group('destroyed 销毁完成状态===============》');
  }
};
</script>

<style scoped>
@import url("../../assets/css/singularTable.css");
.Entrance {
  width: 100%;
  height: 30px;
  background: #f5f8ff;
  padding: 10px;
  line-height: 30px;
  font-size: 15px;
  font-weight: 600;
}
.flex {
  margin-top: 10px;
  width: 100%;

  display: flex;
}
.wh {
  width: 200px;
  height: 170px;
  background: rgba(32,42,69);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 3px;
  flex-direction: column;
  color: #fff;
  font-size: 16px;
  position: relative;
  box-sizing: border-box;
    padding-bottom: 35px;
}
/* .platwh {
  width: 133px;
  height: 170px;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 3px;
  flex-direction: column;
  color: #fff;
  font-size: 16px;
  position: relative;
  box-sizing: border-box;
    padding-bottom: 35px;
} */
.wh:hover{
  cursor: pointer;
}
/* .platwh:hover{
  cursor: pointer;
} */
.posi {
     position: absolute;
    top: 15px;
    right: 20px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    /* background: #fff; */
    color: #fff;
    text-align: center;
    line-height: 20px;
    font-size: 16px;
    border: 2px solid #fff;
}
.icon_img{
  width: 40%;
}
.posi span {
  padding-top: 100px;
}
.imgposi {
  position: absolute;
  width: 85%;
}
.blue {
  width: 200px;
  height: 170px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 3px;
  flex-direction: column;
  color: #fff;
  font-size: 16px;
  position: relative;
  background: #5172ad;
  box-sizing: border-box;
    padding-bottom: 35px;
}

.blue:hover{
  cursor: pointer;
}
.notice {
  background: #f5f8ff;
  height: 45px;
  line-height: 45px;
  width: 100%;
  box-sizing: border-box;
  padding-left: 10px;
  font-size: 15px;
  margin-top: 10px;
}
.fuwu {
  background: #f8f8f8;
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  padding-left: 10px;
}
</style>
