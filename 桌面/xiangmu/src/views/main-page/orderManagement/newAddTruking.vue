<!--  -->
<template>
  <div class="audit">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="audited_tit">
      <el-breadcrumb-item>当前位置：</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">作业管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单信息</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="table_main top20">
      <h3 class="newAddTitle">新增运单</h3>
      <el-form :model="productInfo" :rules="rules" ref="productInfo" class="demo-dynamic">
        <!-- 项目信息 start-->
        <h3 class="projectName icon1">项目信息</h3>
        <div class="projectBox">
          <ul class="flex">
            <li>项目名称</li>
            <li>业务类型</li>
            <li>客户名称</li>
            <li>结算模式</li>
            <li>
              <el-dropdown trigger="click" @command="shippingSettlementClass" size="medium">
                <span class="el-dropdown-link">
                  计费分类
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :disabled="true" :command="{id:1,item:'大宗'}">大宗</el-dropdown-item>
                  <el-dropdown-item :disabled="true" :command="{id:2,item:'快消'}">快消</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
            <li>运费计算方式</li>
            <li>计划派车量</li>
          </ul>

          <ul class="flex">
            <li>
              <el-form-item prop="shippingName">
                <el-input
                  class="nobor"
                  placeholder
                  v-model="productInfo.shippingName"
                  clearable
                  :readonly="true"
                ></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item>
                <!-- {{motBusinessType}} -->
                <el-select
                  :disabled="true"
                  v-model="productInfo.motBusinessTypeCode"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in getYeWuList"
                    :key="item.businessTypeCode"
                    :label="item.businessTypeName"
                    :value="item.businessTypeCode"
                  ></el-option>
                </el-select>
              </el-form-item>
            </li>
            <li>
              <el-form-item prop="shippingCustomer">
                <el-input
                  class="nobor"
                  placeholder
                  v-model="productInfo.shippingCustomer"
                  clearable
                  :readonly="true"
                ></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item>
                <el-select
                  :disabled="true"
                  v-model="productInfo.shippingSettlementWay"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in shippingSetWay"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </li>
            <li>{{shippingSetType}}</li>

            <li>
              <!-- {{shippingCalWay}} -->
              <el-form-item>
                <el-select
                  :disabled="true"
                  v-model="productInfo.shippingCalculateWay"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in shippingCalWay"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </li>
            <li>
              <el-form-item class="width100" style="float:left;" prop="shippingFreightTotal">
                <el-input
                  class="width100 nobor"
                  v-model="productInfo.shippingFreightTotal"
                  placeholder="计划派车量"
                ></el-input>
              </el-form-item>
              <el-form-item class="width80" style="float:left;" prop="shippingFreightUnit">
                <el-select
                  class="width80 nobor"
                  v-model="productInfo.shippingFreightUnit"
                  placeholder="单位"
                >
                  <el-option
                    v-for="(item,index) in getTonsUnit"
                    :key="index"
                    :label="item.settlementUnitName"
                    :value="item.settlementUnitName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </li>
          </ul>
        </div>
        <!-- 项目信息 end-->

        <!-- 线路信息 start-->
        <h3 class="projectName icon2">线路信息</h3>
        <div class="projectBox">
          <ul class="flex">
            <li>
              <el-form-item>出发城市</el-form-item>
            </li>
            <li>
              <el-form-item prop="shippingLoadArea">
                <el-cascader
                  placeholder="选择出发城市"
                  class="nobor"
                  :options="getProvinceList"
                  clearable
                  @change="sendCity"
                  v-model="sendCityName"
                  :disabled="true"
                ></el-cascader>
              </el-form-item>
            </li>
            <li>
              <el-form-item prop="shippingLoadAddress">
                <el-input
                  class="nobor"
                  placeholder
                  v-model="productInfo.shippingLoadAddress"
                  clearable
                  :readonly="true"
                ></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item prop="shippingLoadCompany">
                <el-input
                  class="nobor"
                  placeholder
                  v-model="productInfo.shippingLoadCompany"
                  clearable
                  :readonly="true"
                ></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item prop="shippingLoadContacter">
                <el-input
                  class="nobor"
                  placeholder
                  v-model="productInfo.shippingLoadContacter"
                  clearable
                  :readonly="true"
                ></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item prop="shippingLoadContactMobile">
                <el-input
                  class="nobor"
                  placeholder
                  v-model="productInfo.shippingLoadContactMobile"
                  clearable
                  maxlength="11"
                  :readonly="true"
                ></el-input>
              </el-form-item>
            </li>
            <li style="font-size:12px;">收货人信用代码或个人证件号</li>

            <li>
              <el-link type="success">地图已验证</el-link>
            </li>
          </ul>
          <ul class="flex">
            <li>
              <el-form-item>卸货城市</el-form-item>
            </li>
            <li>
              <el-form-item prop>
                <el-cascader
                  placeholder="选择卸货城市"
                  class="nobor"
                  :options="getProvinceList"
                  clearable
                  @change="unLoadCity"
                  v-model="unLoadCityName"
                  :disabled="true"
                ></el-cascader>
              </el-form-item>
            </li>
            <li>
              <el-form-item prop="shippingUnloadAddress">
                <el-input
                  class="nobor"
                  placeholder
                  v-model="productInfo.shippingUnloadAddress"
                  clearable
                  :readonly="true"
                ></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item prop="shippingUnloadCompany">
                <el-input
                  class="nobor"
                  placeholder="请输入卸货单位"
                  v-model="productInfo.shippingUnloadCompany"
                  clearable
                  :readonly="true"
                ></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item prop="shippingUnloadContacter">
                <el-input
                  class="nobor"
                  placeholder="请输入卸货联系人"
                  v-model="productInfo.shippingUnloadContacter"
                  clearable
                  :readonly="true"
                ></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item prop="shippingUnloadContactMobile">
                <el-input
                  class="nobor"
                  placeholder="请输入联系电话"
                  v-model="productInfo.shippingUnloadContactMobile"
                  clearable
                  maxlength="11"
                  :readonly="true"
                ></el-input>
              </el-form-item>
            </li>

            <li style="font-size:12px;">
              <el-form-item prop="shippingUnloadContactIdentity">
                <el-input
                  class="nobor"
                  placeholder="请输入内容"
                  v-model="productInfo.shippingUnloadContactIdentity"
                  clearable
                  maxlength="18"
                  :readonly="true"
                ></el-input>
              </el-form-item>
            </li>

            <li>
              <el-link @click="showMapDialog" type="danger">地图未验证</el-link>
            </li>
          </ul>
        </div>
        <!-- 线路信息 end-->

        <!-- 物料详情表 start-->
        <h3 class="projectName icon3">物料详情</h3>
        <div class="projectBox">
          <ul class="flex">
            <li>货物名称</li>
            <li>货物类型</li>
            <li>货物分类</li>
            <li>计费量</li>
            <li>物料毛重</li>
            <li>物料净重</li>
            <li>物料体积</li>
            <li>总件数</li>
            <li></li>
          </ul>
          <el-checkbox-group v-model="checkList" @change="checkedIndex">
            <ul class="flex" v-for="(item,index) in listData" :key="index">
              <li class="noborder">
                <el-form-item>
                  <el-input :readonly="true" v-model="item.goodsName" placeholder="请输入货物名称"></el-input>
                </el-form-item>
              </li>
              <li class="noborder">
                <el-form-item>
                  <!-- <el-input v-model="item.motGoodsTypeCode" placeholder="请输入货物类型"></el-input> -->
                  <el-select :disabled="true" v-model="item.motGoodsTypeCode" placeholder="请选择货物类型">
                    <el-option
                      v-for="(item,index) in downList.list3"
                      :key="index"
                      :label="item.goodsTypeName"
                      :value="item.goodsTypeCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </li>
              <li class="noborder">
                <el-form-item prop="goodsClass">
                  <el-select :disabled="true" v-model="item.goodsClass" placeholder="请选择货物分类">
                    <el-option
                      v-for="(item,index) in downList.list4"
                      :key="index"
                      :label="item.goodsClassName"
                      :value="item.goodsClassId"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </li>
              <li class="noborder">
                <el-form-item>
                  <el-input
                    class="width100"
                    v-model="item.goodsSettlementQty"
                    placeholder="货物类型"
                    @blur="isDouble(item.goodsSettlementQty)"
                  ></el-input>
                  <el-select
                    class="width80"
                    v-model="item.goodsSettlementUnit"
                    placeholder="单位"
                    :disabled="true"
                  >
                    <el-option
                      v-for="(item,index) in downList.list2"
                      :key="index"
                      :label="item.settlementUnitName"
                      :value="item.settlementUnitName"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </li>
              <li class="noborder">
                <el-form-item>
                  <el-input class="width100" v-model="item.goodsGrossWeight" placeholder="物料毛重"></el-input>千克
                </el-form-item>
              </li>
              <li class="noborder">
                <el-form-item>
                  <el-input class="width100" v-model="item.goodsNetWeight" placeholder="物料净重"></el-input>千克
                </el-form-item>
              </li>
              <li class="noborder">
                <el-form-item>
                  <el-input class="width100" v-model="item.goodsVolume" placeholder="物料体积"></el-input>立方米
                </el-form-item>
              </li>
              <li class="noborder">
                <el-form-item>
                  <el-input class="width100" v-model="item.goodsQty" placeholder="件数"></el-input>件
                </el-form-item>
              </li>
              <li class="noborder">
                <el-checkbox :label="index">选择</el-checkbox>
              </li>
            </ul>
          </el-checkbox-group>

          <!-- 点击新增 -->
        </div>
        <!-- 物料信息 end-->

        <!-- 价格详情 start-->
        <h3 class="projectName icon4">价格详情</h3>
        <!-- 大宗合同 -->
        <div v-if="isBigZong" class="projectBox">
          <ul class="flex">
            <li>计费单位</li>
            <li v-if="!isPriceTrue">订单单价</li>
            <li v-if="isPriceTrue">运单单价</li>
            <li>亏吨计量方式</li>
            <li>亏吨允许比例</li>
            <li>亏吨扣款标准</li>
            <li>涨吨计量方式</li>
            <li>涨吨扣款比例</li>
            <li>涨吨扣款标准</li>
            <li></li>
          </ul>
          <!-- ------------------------------------------ -->
          <ul class="flex">
            <li>
              <!-- 计费单位 -->
              <el-form-item prop="shippingSettlementUnit">
                <el-input
                  class="nobor"
                  placeholder="请输入计费单位"
                  v-model="productInfo.shippingSettlementUnit"
                  clearable
                  :readonly="isPriceTrue"
                ></el-input>
              </el-form-item>
            </li>
            <li>
              <!-- 订单单价 -->
              <el-form-item prop="shippingSettlementUnitprice">
                <el-input
                  class="nobor"
                  placeholder="请输入订单单价"
                  v-model="productInfo.shippingSettlementUnitprice"
                  clearable
                  :readonly="isPriceTrue"
                ></el-input>
              </el-form-item>
            </li>

            <li>
              <!-- 亏吨计量方式 -->

              <el-select
                :disabled="isPriceTrue"
                v-model="productInfo.shippingDeficitWay"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in shippingDeficWay"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </li>
            <li>
              <!-- 亏吨允许比例 -->
              <el-form-item prop="shippingDeficitValue">
                <el-input
                  class="nobor"
                  placeholder="请输入亏吨允许比例"
                  v-model="productInfo.shippingDeficitValue"
                  clearable
                  :readonly="isPriceTrue"
                ></el-input>
              </el-form-item>
            </li>
            <li>
              <!-- 亏吨允许标准 -->
              <el-form-item prop="shippingDeficitUnitprice">
                <el-input
                  class="nobor"
                  placeholder="请输入亏吨扣款标准"
                  v-model="productInfo.shippingDeficitUnitprice"
                  clearable
                  :readonly="isPriceTrue"
                ></el-input>
              </el-form-item>
            </li>

            <li>
              <!-- 涨吨允许比例 -->
              <el-select
                :disabled="isPriceTrue"
                v-model="productInfo.shippingDeficitWay"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in shippingRiWay"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </li>

            <li>
              <el-form-item prop="shippingRiseValue">
                <el-input
                  class="nobor"
                  placeholder="请输入涨吨扣款比例"
                  v-model="productInfo.shippingRiseValue"
                  clearable
                  :readonly="isPriceTrue"
                ></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item prop="shippingRiseUnitprice">
                <el-input
                  class="nobor"
                  placeholder="请输入涨吨扣款标准"
                  v-model="productInfo.shippingRiseUnitprice"
                  clearable
                  :readonly="isPriceTrue"
                ></el-input>
              </el-form-item>
            </li>
            <li>
              <el-link v-if="!isPriceTrue" @click="newProjectChoose(5)" type="primary">选择</el-link>
            </li>
          </ul>
        </div>

        <!-- 非大宗合同 -->

        <div v-if="!isBigZong" class="projectBox">
          <ul class="flex">
            <li>计费单位</li>
            <li>订单单价</li>
            <li>货损扣款(非必填)</li>
            <li>晚到扣款(非必填)</li>
            <li>其它扣款(非必填)</li>
            <li></li>
          </ul>
          <!-- ------------------------------------------ -->
          <ul class="flex">
            <li>
              <!-- 计费单位 -->
              <el-form-item>
                <el-input
                  class="nobor"
                  placeholder="请输入计费单位"
                  v-model="productInfo.shippingSettlementUnit"
                  clearable
                  :readonly="isPriceTrue"
                ></el-input>
              </el-form-item>
            </li>
            <li>
              <!-- 订单单价 -->
              <el-form-item>
                <el-input
                  class="nobor"
                  placeholder="请输入订单单价"
                  v-model="productInfo.shippingSettlementUnitprice"
                  clearable
                  :readonly="isPriceTrue"
                ></el-input>
              </el-form-item>
            </li>

            <li>
              <!-- 货损扣款 -->
              <el-form-item>
                <el-input
                  class="nobor"
                  placeholder="请输入货损扣款"
                  v-model="productInfo.shippingDamageDeduct"
                  clearable
                  :rules="[
                                                { required: false},
                                                { type: 'number'}
                                            ]"
                ></el-input>
              </el-form-item>
            </li>

            <li>
              <!-- 晚到扣款 -->
              <el-form-item>
                <el-input
                  class="nobor"
                  placeholder="请输入晚到扣款"
                  v-model="productInfo.shippingOverdueDeduct"
                  clearable
                ></el-input>
              </el-form-item>
            </li>
            <li>
              <!-- 其他扣款 -->
              <el-form-item>
                <el-input
                  class="nobor"
                  placeholder="请输入其它扣款"
                  v-model="productInfo.shippingOtherDeduct"
                  clearable
                ></el-input>
              </el-form-item>
            </li>

            <li>
              <el-link v-if="!isPriceTrue" @click="newProjectChoose(5)" type="primary">选择</el-link>
            </li>
          </ul>
        </div>
        <!-- 价格详情 end-->

        <!-- 物料详情表 start-->
        <h3 class="projectName icon3">联系方式</h3>
        <div class="projectBox">
          <ul class="flex">
            <li>
              <el-form-item label>
                <el-input type="textarea" placeholder></el-input>
              </el-form-item>
            </li>
          </ul>
        </div>
        <!-- 物料信息 end-->

        <div>
          <el-form-item>
            <el-button type="primary">立即创建</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>




<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: "",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      fivethDialog: false, // 地图弹框
      searchInput: "", // 弹框搜索输入框
      dataList: [], // dialog 数据列表
      currentItem: [], // 索引选择的当前数据
      classIndex: -1, // 弹框选择索引
      mapIsOk: false, // 地图验证开关
      isCheck: false, // 验证开关
      province: [], // 城市id存储
      checkList: [],
      contractType: 1,
      shippingSetWay: [
        {
          value: 1,
          label: "有差额贷款"
        },
        {
          value: 2,
          label: "有差额自营"
        },
        {
          value: 3,
          label: "无差额"
        }
      ], //结算模式
      shippingCalWay: [
        {
          value: 1,
          label: "系统计算"
        },
        {
          value: 2,
          label: "手工输入"
        }
      ], //运费计算方式
      sendCityName: [], // 发货人城市名字
      unLoadCityName: [], // 卸货人城市名字
      shippingDeficWay: [
        {
          value: 1,
          label: "亏吨允许比例"
        },
        {
          value: 2,
          label: "亏吨允许范围"
        }
      ], // 亏吨计量方式
      shippingRiWay: [
        {
          value: 1,
          label: "涨吨允许比例"
        },
        {
          value: 2,
          label: "涨吨允许范围"
        }
      ], // 涨吨计量方式
      SettlementFlag: [
        {
          value: 0,
          label: "否"
        },
        {
          value: 1,
          label: "是"
        }
      ], //是否以签收量计算运费
      isChange: true, // 是否可选签收日期
      shippingUnload: "", // 设置签收日期要比提货时间晚
      qianshouTime: "", //  签收时间显示
      tihuoTime: "", // 提货时间显示
      listData: [], // 多选框数据
      firstDialog: false,
      downList: {
        list1: [],
        list2: [],
        list3: [],
        list4: []
      },
      productInfo: {
        orderId: "",
        orderCode: "",
        truckingId: "",
        truckingCode: "",
        groupId: 1,
        // 项目信息字段
        shippingName: "", //项目名称
        shippingCustomer: "", // 客户名称
        motBusinessTypeCode: "", //业务类型
        shippingSettlementWay: "", // 结算类型
        shippingSettlementClass: "", //计费分类
        shippingCalculateWay: "", // 运费计算模式
        shippingFreightTotal: "", // 计费总量
        shippingFreightUnit: "",

        // 项目信息字段

        // 线路信息字段
        /**
         * 发货人信息
         * */
        shippingLoadArea: "", // 发货地址区县ID  核实
        shippingLoadAddress: "", // 发货地址  核实
        shippingLoadLon: 116.397428, // 发货经度  核实
        shippingLoadLat: 39.90923, // 发货纬度  核实
        shippingLoadCompany: "", //发货单位  核实
        shippingLoadContacter: "", //发货联系人  核实
        shippingLoadContactMobile: "", // 发货人电话  核实
        shippingUnloadAddress: "", //
        /**
         * 收货人信息
         * */
        shippingUnloadArea: "", // 卸货区县ID 核实
        shippingUnloadAddress: "", // 卸货详细地址 核实
        shippingUnloadLon: 123.544189, // 卸货经度  核实
        shippingUnloadLat: 47.21829, // 卸货纬度  核实
        shippingUnloadCompany: "", // 卸货公司  核实
        shippingUnloadContacter: "", // 卸货联系人  核实
        shippingUnloadContactMobile: "", // 卸货联系人电话  核实
        shippingUnloadContactIdentity: "", //收货人信用代码或个人证件号  核实
        // 线路信息字段

        tmsShippingGoodsList: [
          {
            goodsName: "",
            motGoodsTypeCode: "",
            goodsClass: "",
            goodsSettlementUnit: "",
            goodsGrossWeight: "",
            goodsNetWeight: "",
            goodsVolume: "",
            goodsQty: "", // 总件数
            goodsSettlementQty: "" // 物料计费量数量
          }
        ],
        //
        /**
         * 合同信息 字段
         * 大宗合同
         **/
        shippingSettlementUnit: "", //计费单位
        shippingSettlementUnitprice: "", //订单单价
        shippingDeficitWay: "", //亏吨计量方式
        shippingDeficitValue: "", // 亏吨允许比列
        shippingDeficitUnitprice: "", // 亏吨扣款标准
        shippingRiseWay: "", // 涨吨计量方式
        shippingRiseValue: "", //涨吨允许比例
        shippingRiseUnitprice: "", // 涨吨扣款标准

        /**
         * 非大宗合同
         * **/

        shippingDamageDeduct: "", // 货损扣款
        shippingOverdueDeduct: "", // 晚到扣款
        shippingOtherDeduct: "", // 其他扣款

        /***
                    其它信息
                **/
        shippingSettlementFlag: 0, // 是否以签收量计算运费（0否，1是）
        shippingLoadTime: "", // 要求提货时间
        shippingUnloadTime: "", // 要求卸货时间
        shippingManagementAmt: "", // 收取司机管理费
        shippingOtherAmtDesc: "", // 其它费用描述
        shippingOtherAmt: "", // 收取司机其它费用（整数是付款，负数是扣款）
        shippingAdvanceCard: "", //
        shippingAdvanceCash: "",
        phoneSplit: []
      },
      rules: {}
    };
  },
  //监听属性 类似于data概念
  computed: {
    getTonsUnit() {
      return this.$store.state.downList.list2;
    },
    getYeWuList() {
      return this.$store.state.downList.list1;
    },
    getProvinceList() {
      return this.$store.state.provinceCode;
    },
    // 有差额 显示订单单价，无差额显示运单单价。无差额，价格详情都不可更改
    isPriceTrue() {
      if (this.productInfo.shippingSettlementWay == 3) {
        return true;
      } else {
        return false;
      }
    },
    shippingSetType() {
      if (this.productInfo.shippingSettlementClass == 1) {
        return "大宗";
      } else {
        return "快消";
      }
    },
    isBigZong() {
      if (this.productInfo.shippingSettlementClass == 1) {
        return true;
      } else {
        return false;
      }
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 发货城市 id  数字类型
    sendCity(val) {
      this.productInfo.shippingLoadArea = Number(val[2]);
    },
    //  卸货城市  id  数字类型
    unLoadCity(val) {
      this.productInfo.shippingUnloadArea = Number(val[2]);
    },
    shippingSettlementClass() {
      this.productInfo.shippingSettlementClass = command.id;
    },
    // 根据订单ID获取订单信息
    getDisPatchOfOrder() {
      // let orderId = this.$store.state.selectData[0].orderId;
      this.$http
        .get(this.$api.Order.getTruckingData + "?truckingId=1", true)
        .then(res => {
          console.log(res);

          this.productInfo = {
            // 项目信息字段

            orderCode: res.data.data.orderCode,
            truckingId: res.data.data.turckingId,
            truckingCode: res.data.data.truckingCode,
            groupId: res.data.data.groupId,
            orderId: res.data.data.orderId,
            orderCode: res.data.data.orderCode,
            shippingName: res.data.data.truckingName, //项目名称
            shippingCustomer: res.data.data.truckingCustomer, // 客户名称
            motBusinessTypeCode: res.data.data.motBusinessTypeCode, //业务类型
            shippingSettlementWay: res.data.data.truckingSettlementWay, // 结算类型
            shippingSettlementClass: res.data.data.truckingSettlementClass, //计费分类
            shippingCalculateWay: res.data.data.truckingCalculateWay, // 运费计算模式
            shippingFreightTotal: res.data.data.truckingFreightTotal, // 计费总量
            shippingFreightUnit: res.data.data.truckingFreightUnit,

            // 项目信息字段

            // 线路信息字段
            /**
             * 发货人信息
             * */
            shippingLoadArea: res.data.data.truckingLoadArea, // 发货地址区县ID  核实
            shippingLoadAddress: res.data.data.truckingLoadAddress, // 发货地址  核实
            shippingLoadLon: res.data.data.truckingLoadLon, // 发货经度  核实
            shippingLoadLat: res.data.data.truckingLoadLat, // 发货纬度  核实
            shippingLoadCompany: res.data.data.truckingLoadCompany, //发货单位  核实
            shippingLoadContacter: res.data.data.truckingLoadContacter, //发货联系人  核实
            shippingLoadContactMobile: res.data.data.truckingLoadContactMobile, // 发货人电话  核实
            shippingUnloadAddress: res.data.data.truckingUnloadDetail,
            /**
             * 收货人信息
             * */
            shippingUnloadArea: res.data.data.truckingUnloadArea, // 卸货区县ID 核实
            shippingUnloadAddress: res.data.data.truckingUnloadAddress, // 卸货详细地址 核实
            shippingUnloadLon: res.data.data.truckingUnloadLon, // 卸货经度  核实
            shippingUnloadLat: res.data.data.truckingUnloadLat, // 卸货纬度  核实
            shippingUnloadCompany: res.data.data.truckingUnloadCompany, // 卸货公司  核实
            shippingUnloadContacter: res.data.data.truckingUnloadContacter, // 卸货联系人  核实
            shippingUnloadContactMobile:
              res.data.data.truckingUnloadContactMobile, // 卸货联系人电话  核实
            shippingUnloadContactIdentity:
              res.data.data.truckingUnloadContactIdentity, //收货人信用代码或个人证件号  核实
            // 线路信息字段

            //
            /**
             * 合同信息 字段
             * 大宗合同
             **/
            shippingSettlementUnit: res.data.data.truckingSettlementUnit, //计费单位
            shippingSettlementUnitprice:
              res.data.data.truckingSettlementUnitprice, //订单单价
            shippingDeficitWay: res.data.data.truckingDeficitWay, //亏吨计量方式
            shippingDeficitValue: res.data.data.truckingDeficitValue, // 亏吨允许比列
            shippingDeficitUnitprice: res.data.data.truckingDeficitUnitprice, // 亏吨扣款标准
            shippingRiseWay: res.data.data.truckingRiseWay, // 涨吨计量方式
            shippingRiseValue: res.data.data.truckingRiseValue, //涨吨允许比例
            shippingRiseUnitprice: res.data.data.truckingRiseUnitprice, // 涨吨扣款标准

            /**
             * 非大宗合同
             * **/

            shippingDamageDeduct: res.data.data.truckingRiseUnitprice, // 货损扣款
            shippingOverdueDeduct: res.data.data.truckingRiseUnitprice, // 晚到扣款
            shippingOtherDeduct: res.data.data.truckingRiseUnitprice, // 其他扣款
            tmsshippingGoodsList: res.data.data.tmstruckingGoodsList
          };
          this.listData = res.data.data.tmstruckingGoodsList;

          // this.productInfo.tmsshippingGoodsList = res.data.data.tmsOrderGoodsList
          this.getPrvoince(String(this.productInfo.shippingLoadArea));

          this.getUpPrvoince(String(this.productInfo.shippingUnloadArea));
        })
        .catch(err => {
          console.log("失败");
        });
    },
    // 用省市区ID 查找省市区文字
    getPrvoince(code) {
      let str = code;
      let arr = [];
      let provinceCode = str.substring(0, 2) + "0000";
      let cityCode = str.substring(0, 4) + "00";
      this.sendCityName[0] = provinceCode;
      this.sendCityName[1] = cityCode;
      this.sendCityName[2] = code;
    },
    getUpPrvoince(code) {
      let str = code;
      let arr = [];
      let provinceCode = str.substring(0, 2) + "0000";
      let cityCode = str.substring(0, 4) + "00";
      this.unLoadCityName[0] = provinceCode;
      this.unLoadCityName[1] = cityCode;
      this.unLoadCityName[2] = code;
    },
    showMapDialog() {},
    // 根据索引你选择物料
    checkedIndex(index) {
      this.checkList = index;
    },
    newProjectChoose() {}
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getDisPatchOfOrder();
    let that = this;
    this.$store.dispatch("getTons", that);
    this.$store.dispatch("getYewuList", that);
    this.$store.dispatch("getOptions", that);
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>



<style>
/* @import url(); 引入公共css类 */
@import url("../../../assets/css/newOrder.css");
</style>