<!--  -->
<template>
  <div class="audit">
    <div class="table_main top20">
      <div class="head_title">
        <h3 class="newAddTitle">派车(非大宗)</h3>
        <span @click="back">返回>></span>
      </div>

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
              <!-- <el-dropdown trigger="click" @command="projectSettlementClass" size="medium">
                <span class="el-dropdown-link"> -->
                  计费分类
                  <!-- <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="{id:1,item:'大宗'}">大宗</el-dropdown-item>
                  <el-dropdown-item :command="{id:2,item:'快消'}">快消</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown> -->
            </li>
            <li>运费计算方式</li>
            <li>计划派车量</li>
            <!--<li></li>-->
          </ul>

          <ul class="flex">
            <!-- 项目名称 -->
            <li>
              <el-form-item prop="projectName">
                <!--<el-input-->
                  <!--disabled-->
                  <!--class="nobor"-->
                  <!--placeholder="请选择项目"-->
                  <!--v-model="productInfo.projectName"-->
                  <!--clearable-->
                <!--&gt;</el-input>-->
                {{this.productInfo.projectName}}
              </el-form-item>
            </li>
            <!-- 业务类型 -->
            <li>
              <el-form-item>
                <!-- {{motBusinessType}} -->
                <!--<el-select v-model="productInfo.projectBusinessType" disabled placeholder="请选择项目">-->
                  <!--<el-option-->
                    <!--v-for="item in getYeWuList"-->
                    <!--:key="item.key"-->
                    <!--:label="item.value"-->
                    <!--:value="item.key"-->
                  <!--&gt;</el-option>-->
                 <!---->
                <!--</el-select>-->
                {{this.productInfo.projectBusinessTypeName}}
              </el-form-item>
            </li>
            <!-- 客户名称 -->
            <li>
              <el-form-item prop="projectCustomer">
                <!--<el-input-->
                  <!--disabled-->
                  <!--class="nobor"-->
                  <!--placeholder="请选择项目"-->
                  <!--v-model="productInfo.projectCustomer"-->
                  <!--clearable-->
                <!--&gt;</el-input>-->
                {{this.productInfo.projectCustomer}}
              </el-form-item>
            </li>
            <!-- 结算模式 -->
            <li>
              <el-form-item>
                <!--<el-select-->
                  <!--disabled-->
                  <!--v-model="productInfo.projectSettlementWay"-->
                  <!--placeholder="请选择项目"-->
                  <!--@change="isJieModel"-->
                <!--&gt;-->
                  <!--<el-option-->
                    <!--v-for="item in orderSetWay"-->
                    <!--:key="item.value"-->
                    <!--:label="item.label"-->
                    <!--:value="item.value"-->
                  <!--&gt;</el-option>-->
                <!--</el-select>-->
                {{this.productInfo.projectSettlementWayName}}
              </el-form-item>
            </li>
            <!-- <li>{{orderSetType}}</li> -->
            <!-- 计费分类 -->
            <li>
              <el-form-item>
                <!--<el-input-->
                  <!--disabled-->
                  <!--class="nobor"-->
                  <!--placeholder="请选择项目"-->
                  <!--v-model="productInfo.projectSettlementClass"-->
                  <!--clearable-->
                <!--&gt;</el-input>-->
                {{this.productInfo.projectSettlementClassName}}
              </el-form-item>
            </li>
            <!-- 运费计算方式 -->
            <li>
              <el-form-item>
                <!--<el-select-->
                  <!--disabled-->
                  <!--v-model="productInfo.projectCalculateWay"-->
                  <!--placeholder="请选择项目"-->
                  <!--@change="showOrderCalWay"-->
                <!--&gt;-->
                  <!--<el-option-->
                    <!--v-for="item in orderCalWay"-->
                    <!--:key="item.value"-->
                    <!--:label="item.label"-->
                    <!--:value="item.value"-->
                  <!--&gt;</el-option>-->
                <!--</el-select>-->
                {{this.productInfo.projectCalculateWayName}}
              </el-form-item>
            </li>
            <li>
              <el-form-item class="width100" style="float:left;" prop="orderFreightTotal">
                <!--<el-input-->
                  <!--class="width100 nobor"-->
                  <!--v-model="productInfo.orderFreightTotal"-->
                  <!--placeholder="派车量"-->
                <!--&gt;</el-input>-->
                {{this.productInfo.orderFreightTotal}}
              </el-form-item>
              <el-form-item class="width80" style="float:left;" prop="orderFreightUnit">
                <!--<el-select-->
                  <!--class="width80 nobor"-->
                  <!--v-model="productInfo.orderFreightUnit"-->
                  <!--placeholder="单位"-->
                <!--&gt;-->
                  <!--<el-option-->
                    <!--v-for="item in getTons"-->
                    <!--:key="item.key"-->
                    <!--:label="item.value"-->
                    <!--:value="item.key"-->
                  <!--&gt;</el-option>-->
                <!--</el-select>-->
                {{this.productInfo.orderFreightUnit}}
              </el-form-item>
            </li>
            <!--<li>-->
              <!--<el-link @click="newProjectChoose(1)" type="primary">选择</el-link>-->
            <!--</li>-->
          </ul>
        </div>
        <!-- 项目信息 end-->

        <!-- 线路信息 start-->
        <h3 class="projectName icon2">线路信息</h3>
        <div class="projectBox">
          <ul class="flex">
            <li>
              <el-form-item prop="orderLoadArea">
                <el-cascader
                  placeholder="选择出发城市"
                  class="nobor"
                  :options="getProvinceList"
                  clearable
                  @change="sendCity"
                  v-model="sendCityName"
                  disabled
                ></el-cascader>
              </el-form-item>
            </li>
            <li>
              <el-form-item prop="orderLoadAddress">
                <!--<el-input-->
                  <!--class="nobor"-->
                  <!--placeholder="请输入详细地址"-->
                  <!--v-model="productInfo.orderLoadAddress"-->
                  <!--clearable-->
                <!--&gt;</el-input>-->
                {{this.productInfo.orderLoadAddress}}
              </el-form-item>
            </li>
            <li>
              <el-form-item prop="orderLoadCompany">
                <!--<el-input-->
                  <!--class="nobor"-->
                  <!--placeholder="请输入发货单位"-->
                  <!--v-model="productInfo.orderLoadCompany"-->
                  <!--clearable-->
                <!--&gt;</el-input>-->
                {{this.productInfo.orderLoadCompany}}
              </el-form-item>
            </li>
            <li>
              <el-form-item prop="orderLoadContacter">
                <!--<el-input-->
                  <!--class="nobor"-->
                  <!--placeholder="请输入发货联系人"-->
                  <!--v-model="productInfo.orderLoadContacter"-->
                  <!--clearable-->
                <!--&gt;</el-input>-->
                {{this.productInfo.orderLoadContacter}}
              </el-form-item>
            </li>
            <li>
              <el-form-item prop="orderLoadContactMobile">
                <!--<el-input-->
                  <!--class="nobor"-->
                  <!--placeholder="请输入联系电话"-->
                  <!--v-model="productInfo.orderLoadContactMobile"-->
                  <!--clearable-->
                  <!--maxlength="11"-->
                <!--&gt;</el-input>-->
                {{this.productInfo.orderLoadContactMobile}}
              </el-form-item>
            </li>
            <!--<li style="font-size:12px;">收货人信用代码或个人证件号</li>-->
            <!--<li>-->
              <!--<el-link @click="newProjectChoose(2)" type="primary">选择出发城市</el-link>-->
            <!--</li>-->
            <li>
              <el-link type="success">地图已验证</el-link>
            </li>
          </ul>
          <ul class="flex">
            <li>
              <el-form-item prop>
                <el-cascader
                  placeholder="选择卸货城市"
                  class="nobor"
                  :options="getProvinceList"
                  clearable
                  @change="unLoadCity"
                  v-model="unLoadCityName"
                  disabled
                ></el-cascader>
              </el-form-item>
            </li>
            <li>
              <el-form-item prop="orderUnloadDetail">
                <!--<el-input-->
                  <!--class="nobor"-->
                  <!--placeholder="请输入地址"-->
                  <!--v-model="productInfo.orderUnloadDetail"-->
                  <!--clearable-->
                <!--&gt;</el-input>-->
                {{this.productInfo.orderUnloadDetail}}
              </el-form-item>
            </li>
            <li>
              <el-form-item prop="orderUnloadCompany">
                <!--<el-input-->
                  <!--class="nobor"-->
                  <!--placeholder="请输入卸货单位"-->
                  <!--v-model="productInfo.orderUnloadCompany"-->
                  <!--clearable-->
                <!--&gt;</el-input>-->
                {{this.productInfo.orderUnloadCompany}}
              </el-form-item>
            </li>
            <li>
              <el-form-item prop="orderUnloadContacter">
                <!--<el-input-->
                  <!--class="nobor"-->
                  <!--placeholder="请输入卸货联系人"-->
                  <!--v-model="productInfo.orderUnloadContacter"-->
                  <!--clearable-->
                <!--&gt;</el-input>-->
                {{this.productInfo.orderUnloadContacter}}
              </el-form-item>
            </li>
            <li>
              <el-form-item prop="orderUnloadContactMobile">
                <!--<el-input-->
                  <!--class="nobor"-->
                  <!--placeholder="请输入联系电话"-->
                  <!--v-model="productInfo.orderUnloadContactMobile"-->
                  <!--clearable-->
                  <!--maxlength="11"-->
                <!--&gt;</el-input>-->
                {{this.productInfo.orderUnloadContactMobile}}
              </el-form-item>
            </li>

            <!--<li style="font-size:12px;">-->
            <!--<el-form-item prop="orderUnloadContactIdentity">-->
            <!--<el-input-->
            <!--class="nobor"-->
            <!--placeholder="请输入内容"-->
            <!--v-model="productInfo.orderUnloadContactIdentity"-->
            <!--clearable-->
            <!--maxlength="18"-->
            <!--&gt;</el-input>-->
            <!--</el-form-item>-->
            <!--</li>-->
            <!--<li>-->
              <!--<el-link @click="newProjectChoose(3)" type="primary">选择卸货城市</el-link>-->
            <!--</li>-->
            <li>
              <el-link @click="showMapDialog" type="success">地图已验证</el-link>
            </li>
          </ul>
        </div>
        <!-- 线路信息 end-->

        <!-- 物料信息 start-->
        <h3 class="projectName icon3">物料信息</h3>
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
            <!--<li class="wuInfoChoose"></li>-->
            <!--<li class="wuInfoChoose">-->
              <!--<el-form-item>-->
                <!--<el-button @click="addDomain">新增</el-button>-->
              <!--</el-form-item>-->
            <!--</li>-->
          </ul>

          <!-- 点击新增 -->
          <ul class="flex" v-for="(item,index) in productInfo.orderGoodsList" :key="index">
            <li class="noborder">
              <el-form-item>
                <!--<el-input v-model="item.goodsName" placeholder="请输入货物名称"></el-input>-->
                {{item.goodsName}}
              </el-form-item>
            </li>
            <li class="noborder">
              <el-form-item>
                <!--<el-input v-model="item.goodType" placeholder="请输入货物类型"></el-input>-->
                {{item.goodType}}
                <!-- <el-select v-model="item.goodType" placeholder="请选择货物类型">
                  <el-option
                    v-for="(item,index) in downList.list3"
                    :key="index"
                    :label="item.goodsTypeName"
                    :value="item.goodsTypeCode"
                  ></el-option>
                </el-select> -->
              </el-form-item>
            </li>
            <li class="noborder">
              <el-form-item prop="goodsClass">
                {{item.goodsClass}}
                <!--<el-select v-model="item.goodsClass" placeholder="请选择货物分类">-->
                  <!--<el-option-->
                    <!--v-for="item in downList.list4"-->
                    <!--:key="item.key"-->
                    <!--:label="item.value"-->
                    <!--:value="item.value"-->
                  <!--&gt;</el-option>-->
                <!--</el-select>-->
              </el-form-item>
            </li>
            <li class="noborder">
              <el-form-item>
                {{item.goodsSettlementTotal}}
                {{item.goodsSettlementUnit}}
                <!--<el-input class="width100" v-model="item.goodsSettlementTotal" placeholder="计费量"></el-input>-->
                <!--<el-select class="width80" v-model="item.goodsSettlementUnit" placeholder="单位">-->
                  <!--<el-option-->
                    <!--v-for="item1 in getTons"-->
                    <!--:key="item1.key"-->
                    <!--:label="item1.value"-->
                    <!--:value="item1.key"-->
                  <!--&gt;</el-option>-->
                <!--</el-select>-->
              </el-form-item>
            </li>
            <li class="noborder">
              <el-form-item>
                <!--<el-input class="width100" v-model="item.goodsGrossWeight" placeholder="物料毛重"></el-input>千克-->
                {{item.goodsGrossWeight}}千克
              </el-form-item>
            </li>
            <li class="noborder">
              <el-form-item>
                <!--<el-input class="width100" v-model="item.goodsNetWeight" placeholder="物料净重"></el-input>千克-->
                {{item.goodsNetWeight}}千克
              </el-form-item>
            </li>
            <li class="noborder">
              <el-form-item>
                <!--<el-input class="width100" v-model="item.goodsVolume" placeholder="物料体积"></el-input>立方米-->
                {{item.goodsVolume}}立方米
              </el-form-item>
            </li>
            <li class="noborder">
              <el-form-item>
                <!--<el-input class="width100" v-model="item.goodsQty" placeholder="件数"></el-input>件-->
                {{item.goodsQty}}件
              </el-form-item>
            </li>
            <!--<li class="wuInfoChoose">-->
              <!--<el-link @click="getGoodsItem(index)" type="primary">选择物料</el-link>-->
            <!--</li>-->
            <!--<li class="wuInfoChoose">-->
              <!--<el-button @click.prevent="removeDomain(item)">删除</el-button>-->
            <!--</li>-->
          </ul>
          <!-- 点击新增 -->
        </div>
        <!-- 物料信息 end-->

        <!-- 单价信息 start-->
        <h3 class="projectName icon4">单价信息</h3>
        <!-- 大宗合同 -->
        <div v-if="isBigZong" class="projectBox">
          <ul class="flex">
            <li>计费单位</li>
            <li>订单单价</li>
            <li>亏吨计量方式</li>
            <li>亏吨允许比例</li>
            <li>亏吨扣款标准</li>
            <li>涨吨计量方式</li>
            <li>涨吨扣款比例</li>
            <li>涨吨扣款标准</li>
            <!--<li></li>-->
          </ul>
          <!-- ------------------------------------------ -->
          <ul class="flex">
            <li>
              <!-- 计费单位 -->
              <el-form-item prop="priceSettlementUnit">
                <!--<el-input-->
                  <!--class="nobor"-->
                  <!--placeholder="请输入计费单位"-->
                  <!--v-model="productInfo.priceSettlementUnit"-->
                  <!--clearable-->
                <!--&gt;</el-input>-->
                {{this.productInfo.priceSettlementUnit}}
              </el-form-item>
            </li>
            <li>
              <!-- 订单单价 -->
              <el-form-item prop="priceSettlementUnitprice">
                <!--<el-input-->
                  <!--class="nobor"-->
                  <!--placeholder="请输入订单单价"-->
                  <!--v-model="productInfo.priceSettlementUnitprice"-->
                  <!--clearable-->
                <!--&gt;</el-input>-->
                {{this.productInfo.priceSettlementUnitprice}}
              </el-form-item>
            </li>

            <li>
              <!-- 亏吨计量方式 -->
              <el-select
                :disabled="isPriceTrue"
                v-model="productInfo.priceDeficitWay"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in orderDeficWay"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </li>
            <li>
              <!-- 亏吨允许比例 -->
              <el-form-item prop="priceDeficitValue">
                <el-input
                  class="nobor"
                  placeholder="请输入亏吨允许比例"
                  v-model="productInfo.priceDeficitValue"
                  clearable
                ></el-input>
              </el-form-item>
            </li>
            <li>
              <!-- 亏吨允许标准 -->
              <el-form-item prop="priceDeficitUnitprice">
                <el-input
                  class="nobor"
                  placeholder="请输入亏吨扣款标准"
                  v-model="productInfo.priceDeficitUnitprice"
                  clearable
                ></el-input>
              </el-form-item>
            </li>

            <li>
              <!-- 涨吨允许比例 -->
              <el-select v-model="productInfo.priceRiseWay" placeholder="请选择">
                <el-option
                  v-for="item in orderRiWay"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </li>

            <li>
              <el-form-item prop="priceRiseValue">
                <el-input
                  class="nobor"
                  placeholder="请输入涨吨扣款比例"
                  v-model="productInfo.priceRiseValue"
                  clearable
                ></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item prop="priceRiseUnitprice">
                <el-input
                  class="nobor"
                  placeholder="请输入涨吨扣款标准"
                  v-model="productInfo.priceRiseUnitprice"
                  clearable
                ></el-input>
              </el-form-item>
            </li>
            <!--<li>-->
              <!--<el-link @click="newProjectChoose(5)" type="primary">选择</el-link>-->
            <!--</li>-->
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
            <li v-if="productInfo.projectSettlementWay == 1"></li>
          </ul>
          <!-- ------------------------------------------ -->
          <ul class="flex">
            <li>
              <!-- 计费单位 -->
              <el-form-item>
                <!--<el-input-->
                  <!--class="nobor"-->
                  <!--placeholder="请输入计费单位"-->
                  <!--v-model="productInfo.priceSettlementUnit"-->
                  <!--clearable-->
                <!--&gt;</el-input>-->
                {{this.productInfo.priceSettlementUnit}}
              </el-form-item>
            </li>
            <li>
              <!-- 订单单价 -->
              <el-form-item>
                <!--<el-input-->
                  <!--class="nobor"-->
                  <!--placeholder="请输入订单单价"-->
                  <!--v-model="productInfo.priceSettlementUnitprice"-->
                  <!--clearable-->
                <!--&gt;</el-input>-->
                {{this.productInfo.priceSettlementUnitprice}}
              </el-form-item>
            </li>

            <li>
              <!-- 货损扣款 -->
              <el-form-item>
                <!--<el-input-->
                  <!--class="nobor"-->
                  <!--placeholder="请输入货损扣款"-->
                  <!--v-model="productInfo.priceDamageDeduct"-->
                  <!--clearable-->
                  <!--:rules="[-->
                    <!--{ required: false},-->
                    <!--{ type: 'number'}-->
                  <!--]"-->
                <!--&gt;</el-input>-->
                {{this.productInfo.priceDamageDeduct}}
              </el-form-item>
            </li>

            <li>
              <!-- 晚到扣款 -->
              <el-form-item>
                <!--<el-input-->
                  <!--class="nobor"-->
                  <!--placeholder="请输入晚到扣款"-->
                  <!--v-model="productInfo.priceOverdueDeduct"-->
                  <!--clearable-->
                <!--&gt;</el-input>-->
                {{this.productInfo.priceOverdueDeduct}}
              </el-form-item>
            </li>
            <li>
              <!-- 其他扣款 -->
              <el-form-item>
                <!--<el-input-->
                  <!--class="nobor"-->
                  <!--placeholder="请输入其它扣款"-->
                  <!--v-model="productInfo.priceOtherDeduct"-->
                  <!--clearable-->
                <!--&gt;</el-input>-->
                {{this.productInfo.priceOtherDeduct}}
              </el-form-item>
            </li>

            <li v-if="productInfo.projectSettlementWay == 1">
              <el-link @click="newProjectChoose(5)" type="primary">选择</el-link>
            </li>
          </ul>
        </div>
        <!-- 单价信息 end-->

        <!-- 其它信息 -->
        <h3 class="projectName icon">其它信息</h3>
        <div class="projectBox">
          <ul class="flex">
            <li>要求提货时间</li>
            <li>要求签收时间</li>
            <!--<li>运费结算方式</li>-->
            <!-- <li v-if="this.productInfo.orderPremiumFlag == 1">保价金额</li>
            <li v-if="this.productInfo.orderPremiumFlag == 1">保险金额</li> -->
            <li>管理费</li>
            <li>其他费用名称</li>
            <li>费用金额</li>
            <li>油气卡预付</li>
            <li>现金预付</li>
          </ul>

          <ul class="flex">
            <li class="noborder">
              <el-form-item prop="orderLoadTime">
                <!--<el-date-picker-->
                        <!--style="width: 90%;"-->
                  <!--@change="orderLoad"-->
                  <!--v-model="productInfo.orderLoadTime"-->
                  <!--type="datetime"-->
                  <!--placeholder="选择日期时间"-->
                  <!--:picker-options="pickerOptions"-->
                  <!--value-format="yyyy-MM-dd HH:mm:ss"-->
                <!--&gt;</el-date-picker>-->
                {{this.productInfo.orderLoadTime}}
              </el-form-item>
            </li>
            <li class="noborder">
              <el-form-item prop="orderUnloadTime">
                <!--<el-date-picker-->
                        <!--style="width: 90%;"-->
                  <!--@change="handleUnload"-->
                  <!--v-model="productInfo.orderUnloadTime"-->
                  <!--:disabled="isChange"-->
                  <!--type="datetime"-->
                  <!--placeholder="选择日期时间"-->
                  <!--:picker-options="orderUnload"-->
                  <!--value-format="yyyy-MM-dd HH:mm:ss"-->
                <!--&gt;</el-date-picker>-->
                {{this.productInfo.orderUnloadTime}}
              </el-form-item>
            </li>

            <!--<li class="noborder">-->
              <!--<el-select v-model="productInfo.truckingUnloadSettlement" placeholder="请选择">-->
                <!--<el-option-->
                  <!--v-for="item in settlementNum"-->
                  <!--:key="item.value"-->
                  <!--:label="item.label"-->
                  <!--:value="item.value"-->
                <!--&gt;</el-option>-->
              <!--</el-select>-->
            <!--</li>-->

            <li>
              <el-form-item>
                <!--<el-input-->
                  <!--class="nobor"-->
                  <!--placeholder="请输入金额"-->
                  <!--v-model="productInfo.truckingManagementAmt"-->
                  <!--clearable-->
                <!--&gt;</el-input>-->
                {{this.productInfo.truckingManagementAmt}}
              </el-form-item>
            </li>

            <li>
              <el-form-item>
                <!--<el-input-->
                  <!--class="nobor"-->
                  <!--placeholder="请输其他费用描述"-->
                  <!--v-model="productInfo.truckingOtherAmtDesc"-->
                  <!--clearable-->
                <!--&gt;</el-input>-->
                {{this.productInfo.truckingOtherAmtDesc}}
              </el-form-item>
            </li>

            <li>
              <el-form-item>
                <!--<el-input-->
                  <!--class="nobor"-->
                  <!--placeholder="请输入金额"-->
                  <!--v-model="productInfo.truckingOtherAmt"-->
                  <!--clearable-->
                <!--&gt;</el-input>-->
                {{this.productInfo.truckingOtherAmt}}
              </el-form-item>
            </li>

            <li>
              <el-form-item  prop="truckingAdvanceCard">
                <el-input
                  placeholder="请输入金额"
                  v-model="productInfo.truckingAdvanceCard"
                  clearable
                ></el-input>
              </el-form-item>
            </li>

            <li>
              <el-form-item prop="truckingAdvanceAmt">
                <el-input
                  placeholder="请输入金额"
                  v-model="productInfo.truckingAdvanceAmt"
                  clearable
                ></el-input>
              </el-form-item>
            </li>
          </ul>
        </div>

        <!-- 输入手机号 -->
        <h3 class="projectName icon3">输入手机号</h3>
        <div class="projectBox">
          <ul class="flex">
            <li>
              <el-form-item label>
                <el-input type="textarea" v-model="mobiles" placeholder="输入承运人手机号 “,”隔开可多输入多条，例：188xxxx5523,139xxxx6386"></el-input>
              </el-form-item>
            </li>
          </ul>
        </div>

        <div class="fotterBtn">
          <el-form-item>
            <el-button type="primary" @click="submitForm('productInfo')">立即{{btnText}}</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>

    <!-- 选择项目-->
    <el-dialog title="选择项目" width="640px" :visible.sync="firstDialog">
      <el-container>
        <el-header>
          <el-input placeholder="请输入内容" v-model="searchInput" class="input-with-select width300">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-header>
        <el-main class="height300">
          <ul class="projectInfoList">
            <li
              @click="chooseItem(index)"
              :class="{active:index == classIndex }"
              v-for="(item,index) in dataList"
              :key="index"
            >
              <p class="projectTitle">
                <span>项目名称</span>
                {{item.projectName}}
              </p>
              <p class="projectTitle">
                <span>业务类型</span>
                {{item.projectBusinessType}}
              </p>
              <p class="projectTitle">
                <span>客户名称</span>
                {{item.projectCustomer}}
              </p>
              <p class="projectTitle">
                <span>结算模式</span>
                {{item.projectSettlementWay}}
              </p>
              <p class="projectTitle">
                <span>计费分类</span>
                {{item.projectSettlementClass}}
              </p>
              <p class="projectTitle">
                <span>运费计算方式</span>
                {{item.projectCalculateWay}}
              </p>
            </li>
          </ul>
        </el-main>
        <el-footer class="addFooterCenter">
          <el-button @click="firstDialog = false">取 消</el-button>
          <el-button type="primary" @click="chooseItemBtn">确 定</el-button>
        </el-footer>
      </el-container>
    </el-dialog>

    <!-- 选择线路 -->
    <el-dialog title="选择线路" width="640px" :visible.sync="secondtDialog">
      <el-container>
        <el-header>
          <el-input placeholder="请输入内容" v-model="searchInput" class="input-with-select width300">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-header>
        <el-main class="height300">
          <ul class="projectInfoList">
            <li
              @click="chooseItem(index)"
              :class="{active:index == classIndex }"
              v-for="(item,index) in dataList"
              :key="index"
            >
              <p class="projectTitle">
                <span>详细地址</span>
                {{item.addressDetail}}
              </p>
              <p class="projectTitle">
                <span v-if="addressType ==1">发货单位</span>
                <span v-if="addressType ==2">收货单位</span>
                {{item.addressCompany}}
              </p>
              <p class="projectTitle">
                <span v-if="addressType ==1">发货联系人</span>
                <span v-if="addressType ==2">收货联系人</span>
                {{item.addressContacter}}
              </p>
              <p class="projectTitle">
                <span v-if="addressType ==1">发货手机号</span>
                <span v-if="addressType ==2">收货手机号</span>
                {{item.addressContactMobile}}
              </p>
              <p class="projectTitle" v-if="addressType ==2">
                <span>信用代码</span>
                {{item.addressContactIdentity}}
              </p>
            </li>
          </ul>
        </el-main>
        <el-footer class="addFooterCenter">
          <el-button @click="secondtDialog = false">取 消</el-button>
          <el-button type="primary" @click="chooseItemBtn2(addressType)">确 定</el-button>
        </el-footer>
      </el-container>
    </el-dialog>

    <!-- 选择物料 -->
    <el-dialog title="选择物料" width="640px" :visible.sync="wuliao">
      <el-container>
        <el-header>
          <el-input placeholder="请输入内容" v-model="searchInput" class="input-with-select width300">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-header>

        <el-main class="height300">
          <ul class="projectInfoList">
            <li
              v-for="(item,index) in dataList"
              :key="index"
              :class="{active:index == classIndex }"
              @click="chooseItem(index)"
            >
              <div class="flex">
                <div class="item">
                  <p class="projectTitle">
                    <span>货物名称</span>
                    {{item.goodsName}}
                  </p>
                </div>
                <div class="item">
                  <p class="projectTitle">
                    <span>货物类型</span>
                    {{item.goodType}}
                  </p>
                </div>
              </div>
              <div class="flex">
                <div class="item">
                  <p class="projectTitle">
                    <span>货物分类</span>
                    {{item.goodsClass}}
                  </p>
                </div>
                <div class="item">
                  <p class="projectTitle">
                    <span>物料毛重</span>
                    {{item.goodsGrossWeight}}
                  </p>
                </div>
              </div>
              <div class="flex">
                <div class="item">
                  <p class="projectTitle">
                    <span>物料净重</span>
                    {{item.goodsNetWeight}}
                  </p>
                </div>
                <div class="item">
                  <p class="projectTitle">
                    <span>物料体积</span>
                    {{item.goodsVolume}}
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </el-main>
        <el-footer class="addFooterCenter">
          <el-button @click="wuliao = false">取 消</el-button>
          <el-button type="primary" @click="chooseItemBtn3()">确 定</el-button>
        </el-footer>
      </el-container>
    </el-dialog>

    <!-- 单价信息 -->
    <el-dialog title="选择项目" width="640px" :visible.sync="fourthDialog">
      <el-container>
        <el-header>
          <el-input placeholder="请输入内容" v-model="searchInput" class="input-with-select width300">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-header>
        <el-main class="height300">
          <ul class="projectInfoList">
            <li
              @click="chooseItem(index)"
              :class="{active:index == classIndex }"
              v-for="(item,index) in dataList"
              :key="index"
            >
              <div v-if="isBigZong">
                <div class="flex">
                  <div class="item">
                    <p class="projectTitle">
                      <span>计费单位</span>
                      {{item.priceSettlementUnit}}
                    </p>
                  </div>
                  <div class="item">
                    <p class="projectTitle">
                      <span>订单单价</span>
                      {{item.priceSettlementUnitprice}}
                    </p>
                  </div>
                </div>

                <div class="flex">
                  <div class="item">
                    <p class="projectTitle">
                      <span>亏吨计量方式</span>
                      {{item.priceDeficitWay ==1?'亏吨允许比例':'亏吨允许范围'}}
                    </p>
                  </div>
                  <div class="item">
                    <p class="projectTitle">
                      <span>亏吨允许比例</span>
                      {{item.priceDeficitValue}}
                    </p>
                  </div>
                </div>

                <div class="flex">
                  <div class="item">
                    <p class="projectTitle">
                      <span>亏吨扣款标准</span>
                      {{item.priceDeficitUnitprice}}
                    </p>
                  </div>
                  <div class="item">
                    <p class="projectTitle">
                      <span>涨吨计量方式</span>
                      {{item.priceRiseWay==1?'涨吨允许比例':'涨吨允许范围'}}
                    </p>
                  </div>
                </div>

                <div class="flex">
                  <div class="item">
                    <p class="projectTitle">
                      <span>涨吨扣款比例</span>
                      {{item.priceRiseValue}}
                    </p>
                  </div>
                  <div class="item">
                    <p class="projectTitle">
                      <span>涨吨扣款标准</span>
                      {{item.priceRiseUnitprice}}
                    </p>
                  </div>
                </div>
              </div>

              <div v-if="!isBigZong">
                <div class="flex">
                  <div class="item">
                    <p class="projectTitle">
                      <span>计费单位</span>
                      {{item.priceSettlementUnit}}
                    </p>
                  </div>
                  <div class="item">
                    <p class="projectTitle">
                      <span>订单单价</span>
                      {{item.priceSettlementUnitprice}}
                    </p>
                  </div>
                </div>
                <div class="flex">
                  <div class="item">
                    <p class="projectTitle">
                      <span>货损扣款</span>
                      {{item.priceDamageDeduct}}
                    </p>
                  </div>
                  <div class="item">
                    <p class="projectTitle">
                      <span>晚到扣款</span>
                      {{item.priceOverdueDeduct}}
                    </p>
                  </div>
                </div>
                <div class="flex">
                  <div class="item">
                    <p class="projectTitle">
                      <span>其它扣款</span>
                      {{item.priceOtherDeduct}}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </el-main>
        <el-footer class="addFooterCenter">
          <el-button @click="fourthDialog = false">取 消</el-button>
          <el-button type="primary" @click="chooseItemBtn4(classIndex)">确 定</el-button>
        </el-footer>
      </el-container>
    </el-dialog>

    <el-dialog title="计算公式选择" width="540px" :visible.sync="showOrderCal">
      <el-container>
        <el-header></el-header>
        <el-main>
          <h3>订单计算公式</h3>
        </el-main>
        <el-footer class="addFooterCenter">
          <el-button @click="showOrderCal = false">取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </el-footer>
      </el-container>
    </el-dialog>
  </div>
</template>



<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import city from "../../../../tests/unit/city";
import { log } from "util";
// import listData from "../../../../tests/unit/default"
export default {
  name: "newAddOrderbig",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    var phone = (rule, value, callback) => {
      let reg_phone = /^1[3456789]\d{9}$/;
      if (!value) {
        return callback(new Error("手机号不能为空"));
      }
      setTimeout(() => {
        // Number.isInteger是es6验证数字是否为整数的方法,但是我实际用的时候输入的数字总是识别成字符串
        // 所以我就在前面加了一个+实现隐式转换
        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (reg_phone.test(value)) {
            callback();
          } else {
            callback(new Error("手机号格式不正确"));
          }
        }
      }, 100);
    };
    var double = (rule, value, callback) => {
      let regDouble = /^\d+(\.\d{0,3})?$/;
      if (!value) {
        return callback(new Error("该项不能为空"));
      }
      if (regDouble.test(value)) {
        callback();
      } else {
        callback(new Error("请输入三位小数或整数"));
      }
    };

    return {
      title: "新增", // 顶部标题
      btnText: "派车", // 底部按钮文本
      mobiles: "", // 派车手机号
      showBtn: true, // 是否显示底部按钮
      firstDialog: false, // 控制第一个弹框的显示隐藏
      secondtDialog: false, //控制第二个弹框
      wuliao: false, // 控制第三个弹窗
      fourthDialog: false, // 控制第四个弹窗
      searchInput: "", // 弹框搜索输入框
      dataList: [], // 选择项目列表
      projectList: [], // 项目选择列表
      circuitList: [], // 线路选择列表
      materialList: [], // 物料选择列表
      unitpriceList: [], // 单价选择列表
      isSaved: "否",
      mapIsOk: false, // 地图验证开关
      options: [], //城市三级菜单数据
      isBigZong: false, // 判断是否是大宗合同
      isChange: true, // 签收时间是否可选
      jieModel: true, // 结算模式 1、有差额需要选择订单计算公式、运单计算公式 2、无差额需要选择订单计算公式、
      orderSetType: "", // 计费分类 显示文字

      classIndex: -1, // 弹框选择索引
      currentItem: [], // 索引选择的当前数据
      sendCityValue: "", // 发货人城市ID

      addressType: 1, // 线路信息数据参数类型
      goodsItemsIndex: 0, // 物料信息 新添加项  索引
      contractType: 1, // 单价信息数据参数类型 1：大宗， 2：快消
      isShwoMap: true, // 控制是否可以点击显示地图弹框
      fivethDialog: false, // 地图弹框
      orderSetWay: [
        {
          value: 1,
          label: "无差额"
        },
        {
          value: 2,
          label: "有差额代管"
        },
        {
          value: 3,
          label: "无差额代管"
        }
      ], //结算模式
      orderCalWay: [
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
      settlementNum: [
        {
          value: 1,
          label: "以提货量作为结算量"
        },
        {
          value: 2,
          label: "以提货量或签收量中较小的作为结算量"
        }
      ],
      orderDeficWay: [
        {
          value: 1,
          label: "亏吨允许比例"
        },
        {
          value: 2,
          label: "亏吨允许范围"
        }
      ], // 亏吨计量方式
      orderRiWay: [
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
      /**
       * 下拉数据  集合
       * **/

      downList: {
        list1: [],
        list2: [],
        list3: [],
        list4: []
      }, // 2计费单位 3货物类型 4货物分类
      allPro: [],

      pickerOptions: {
        disabledDate(time) {
          let _now = Date.now(),
            seven = 7 * 24 * 60 * 60 * 1000,
            sevenDays = _now - seven;
          return time.getTime() < _now - 8.64e7;
        }
      },

      orderUnload: "",
      showOrderCal: false, // 运费计算方式弹框显示隐藏
      productInfo: {
        groupId: 1,

        orderId: "", // 订单ID
        orderCode: "", // 订单编号

        // 项目信息字段
        orderProjectId: "", // 项目ID
        orderFreightTotal: "", // 计费总量
        orderFreightUnit: "", // 计费总量单位

        projectName: "", //项目名称
        projectCustomer: "", // 客户名称
        projectBusinessType: "", //业务类型
          projectBusinessTypeName: "",
        projectSettlementWay: "", // 结算类型
          projectSettlementWayName: "",
        projectSettlementClass: "", // 计费分类
          projectSettlementClassName: "",
        projectCalculateWay: "", // 运费计算模式
          projectCalculateWayName: "",
        projectOrderCalculateFormula: "", //订单运费计算公式（系统计算时必填）
        projectOrderCalculateRound: "", //订单运费是否取值（1是 0否 系统计算时必填）
        projectShippingCalculateFormula: "", //运单运费计算公式（系统计算时必填）
        projectShippingCalculateRound: "", //运单运费是否取值（1是 0否 系统计算时必填）

        // 项目信息字段

        // 线路信息字段
        /**
         * 发货人信息
         * */
        orderLoadAddressId: "", // 修改订单时用
        orderLoadAreaId: "", // 发货地址区县ID
        orderLoadArea: "", // 发货地址区县  核实
        orderLoadAddress: "", // 发货地址  核实
        orderLoadLon: 116.397428, // 发货经度  核实
        orderLoadLat: 39.90923, // 发货纬度  核实
        orderLoadCompany: "", //发货单位  核实
        orderLoadContacter: "", //发货联系人  核实
        orderLoadContactMobile: "", // 发货人电话  核实

        /**
         * 收货人信息
         * */
        orderUnLoadAddressId: "", // 修改订单时用
        orderUnloadAreaId: "", // 卸货区县ID
        orderUnloadArea: "", // 卸货区县 核实
        orderUnloadDetail: "", // 卸货详细地址 核实
        orderUnloadLon: 123.544189, // 卸货经度  核实
        orderUnloadLat: 47.21829, // 卸货纬度  核实
        orderUnloadCompany: "", // 卸货公司  核实
        orderUnloadContacter: "", // 卸货联系人  核实
        orderUnloadContactMobile: "", // 卸货联系人电话  核实
        orderUnloadContactIdentity: "", //收货人信用代码或个人证件号  核实
        // 线路信息字段

        orderGoodsList: [
          {
            goodsName: "", // 货物名称
            goodType: "", // 货物类型
            goodsClass: "", // 货物分类
            goodsSettlementUnit: "", // 计费量单位
            goodsGrossWeight: "", // 物料毛重
            goodsNetWeight: "", // 物料净重
            goodsVolume: "", // 物料体积
            goodsQty: "", // 总件数
            goodsSettlementTotal: "" // 物料计费量数量
          }
        ],

        //单价信息
        /**
         * 单价信息 字段
         * 大宗合同
         **/
        orderPriceId: "", // 修改订单时用
        priceName: "", // 价格/合同 名称
        priceSettlementUnit: "", //计费单位
        priceSettlementUnitprice: "", //订单单价
        priceDeficitWay: "", //亏吨计量方式
        priceDeficitValue: "", // 亏吨允许比列
        priceDeficitUnitprice: "", // 亏吨扣款标准
        priceRiseWay: "", // 涨吨计量方式
        priceRiseValue: "", //涨吨允许比例
        priceRiseUnitprice: "", // 涨吨扣款标准
        /**
         * 非大宗合同
         * **/
        priceDamageDeduct: "", // 货损扣款
        priceOverdueDeduct: "", // 晚到扣款
        priceOtherDeduct: "", // 其他扣款

        /***
            其它信息
        **/
        orderLoadTime: "", // 要求提货时间
        orderUnloadTime: "", // 要求卸货时间

        truckingUnloadSettlement: "", //是否以签收量计算运费 1是 2否
        truckingManagementAmt: "", // 管理费
        truckingOtherAmtDesc: "", // 其他费用描述
        truckingOtherAmt: "", // 其他费用金额
        truckingAdvanceCard: "", // 油气卡预付
        truckingAdvanceAmt: "", // 现金预付


        // orderPremiumFlag: 0, // 是否购买保价
        // orderInsuredAmt: "", // 保价金额
        // orderPremiumAmt: "", // 保险金额
        // orderDesc: "" // 订单备注
      },
      rules: {
        projectName: [
          {
            required: true,
            message: "该项不能为空",
            trigger: "blur"
          }
        ],
        orderUnloadContactMobile: [
          {
            required: true,
            validator: phone,
            trigger: "blur"
          }
        ],
        projectCustomer: [
          {
            required: true,
            message: "该项不能为空",
            trigger: "blur"
          }
        ],
        orderFreightTotal: [
          {
            required: true,
            message: "该项不能为空",
            trigger: "blur"
          },
          {
            validator: double,
            trigger: "blur"
          }
        ],
        orderFreightUnit: [
          {
            required: true,
            message: "该项不能为空",
            trigger: "change"
          }
        ],
        orderLoadArea: [
          {
            required: true,
            message: "该项不能为空",
            trigger: "change"
          }
        ],
        orderLoadAddress: [
          {
            required: true,
            message: "该项不能为空",
            trigger: "blur"
          }
        ],
        orderLoadCompany: [
          {
            required: true,
            message: "该项不能为空",
            trigger: "blur"
          }
        ],
        orderLoadContacter: [
          {
            required: true,
            message: "该项不能为空",
            trigger: "blur"
          }
        ],
        orderLoadContactMobile: [
          {
            required: true,
            message: "手机号不能为空",
            trigger: "blur"
          },
          {
            validator: phone,
            trigger: "blur"
          }
        ],
        orderUnloadArea: [
          {
            required: true,
            message: "该项不能为空",
            trigger: "change"
          }
        ],
        orderUnloadDetail: [
          {
            required: true,
            message: "该项不能为空",
            trigger: "blur"
          }
        ],
        orderUnloadCompany: [
          {
            required: true,
            message: "该项不能为空",
            trigger: "blur"
          }
        ],
        orderUnloadContacter: [
          {
            required: true,
            message: "该项不能为空",
            trigger: "blur"
          }
        ],
        orderUnloadContactIdentity: [
          {
            required: true,
            message: "该项不能为空",
            trigger: "blur"
          }
        ],
        priceSettlementUnit: [
          {
            required: true,
            message: "该项不能为空",
            trigger: "blur"
          }
        ],
        priceSettlementUnitprice: [
          {
            required: true,
            message: "该项不能为空",
            trigger: "blur"
          }
        ],
        priceDeficitValue: [
          {
            required: true,
            message: "该项不能为空",
            trigger: "change"
          },
          {
            validator: double,
            trigger: "blur"
          }
        ],
        priceDeficitUnitprice: [
          {
            required: true,
            message: "该项不能为空",
            trigger: "change"
          }
        ],
        priceRiseValue: [
          {
            required: true,
            message: "该项不能为空",
            trigger: "change"
          }
        ],
        priceRiseUnitprice: [
          {
            required: true,
            message: "该项不能为空",
            trigger: "change"
          }
        ],
        orderLoadTime: [
          {
            required: true,
            message: "该项不能为空",
            trigger: "change"
          }
        ],
        orderUnloadTime: [
          {
            required: true,
            message: "该项不能为空",
            trigger: "change"
          }
        ],
        truckingAdvanceCard: [
          {
            required: true,
            message: "该项不能为空",
            trigger: "blur"
          }
        ],
        truckingAdvanceAmt: [
          {
            required: true,
            message: "该项不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  //监听属性 类似于data概念
  computed: {
    // 获取计量单位 例如 吨，千克
    getUnitTons() {
      return this.$store.state.stateTons;
    },
    // 项目业务类型
    getYeWuList() {
      return this.$store.state.downList.list1;
    },
    // 计费量单位
    getTons() {
      return this.$store.state.downList.list2;
    },
    // 区县列表
    getProvinceList() {
      return this.$store.state.provinceCode;
    },
    // 有差额 显示订单单价，无差额显示运单单价。无差额，价格详情都不可更改
    isPriceTrue() {
      if (this.productInfo.truckingSettlementWay == 3) {
        return true;
      } else {
        return false;
      }
    },
    truckingSetType() {
      if (this.productInfo.truckingSettlementClass == 1) {
        return "大宗";
      } else {
        return "快消";
      }
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    /**
         * 如选择系统计算根据有无差额显示计算方式弹窗

1、有差额需要选择订单计算公式、运单计算公式

2、无差额需要选择订单计算公式、
         * **/

    isJieModel(val) {
      console.log(val);
      if (val == 3) {
        this.jieModel = false;
      }
    },
    showOrderCalWay(val) {
      console.log(val);
      if (val == 1) {
        this.showOrderCal = true;
      }
    },
    // 计费分类下拉
    projectSettlementClass(command) {
      this.productInfo.projectSettlementClass = command.id;
      this.orderSetType = command.item;
      if (command.id != 1) {
        this.isBigZong = false;
      } else {
        this.isBigZong = true;
      }
    },

    //  项目信息 回显
    chooseItemBtn() {
      if (this.classIndex >= 0) {
        // console.log(this.productInfo, '项目信息回显')
        this.productInfo.orderProjectId = this.currentItem.projectId; // 项目ID
        this.productInfo.projectName = this.currentItem.projectName; // 项目名称
        this.productInfo.projectBusinessType = this.currentItem.projectBusinessType; // 业务类型code
        this.productInfo.projectCustomer = this.currentItem.projectCustomer; //客户名称
        this.productInfo.projectSettlementWay = this.currentItem.projectSettlementWay; // 结算方式（1无差额、2有差额代管、3无差额代管）
        this.productInfo.projectSettlementClass = this.currentItem.projectSettlementClass; // 计费分类[也就是对应的结算业务]（1大宗、2快消；选择大宗时，有亏涨吨
        this.isBigZong =
          this.productInfo.projectSettlementClass == '大宗' ? true : false;

        this.productInfo.projectCalculateWay = this.currentItem.projectCalculateWay; //运费计算方式(1系统计算，2手工收入)

        this.motBusinessType = this.currentItem.businessTypeName; //业务类型文字

        this.orderSetType =
          this.currentItem.projectSettlementClass == 1 ? "大宗" : "快消";

        this.productInfo.projectOrderCalculateFormula = this.currentItem.projectOrderCalculateFormula; //订单运费计算公式（系统计算时必填）
        this.productInfo.projectOrderCalculateRound = this.currentItem.projectOrderCalculateRound; //订单运费是否取值（1是 0否 系统计算时必填）
        this.productInfo.projectShippingCalculateFormula = this.currentItem.projectShippingCalculateFormula; //运单运费计算公式（系统计算时必填）
        this.productInfo.projectShippingCalculateRound = this.currentItem.projectShippingCalculateRound;//运单运费是否取值（1是 0否 系统计算时必填）

        // 清空合同数据
        this.productInfo.priceName = "",
        this.productInfo.priceSettlementUnit = "";
        this.productInfo.priceSettlementUnitprice = "";
        this.productInfo.priceDeficitWay = "";

        this.productInfo.priceDeficitUnitprice = "";
        this.productInfo.priceRiseWay = "";

        this.productInfo.priceDeficitValue = "";

        this.productInfo.priceRiseValue = "";
        this.productInfo.priceRiseUnitprice = "";
        this.productInfo.priceDamageDeduct = "";
        this.productInfo.priceOverdueDeduct = "";
        this.productInfo.priceOtherDeduct = "";

        this.firstDialog = false;
      } else {
        this.$message({
          message: "请选择一条项目",
          type: "error",
          offset: 300
        });
      }
    },

    //  线路信息 回显
    chooseItemBtn2(addressType) {
      if (addressType == 1) {
        // console.log(this.currentItem, '发货-线路信息回显');
        this.productInfo.orderLoadAreaId = this.currentItem.addressAreaId;
        this.productInfo.orderLoadArea = this.currentItem.addressArea;
        this.productInfo.orderLoadAddress = this.currentItem.addressDetail;
        this.productInfo.orderLoadLon = this.currentItem.addressLon;
        this.productInfo.orderLoadLat = this.currentItem.addressLat;
        this.productInfo.orderLoadContacter = this.currentItem.addressContacter;
        this.productInfo.orderLoadContactMobile = this.currentItem.addressContactMobile;
        this.productInfo.orderLoadCompany = this.currentItem.addressCompany;
        // console.log('areaCode',this.productInfo.orderLoadArea);

        this.getPrvoince(String(this.currentItem.addressAreaId));
        // this.getPrvoince(this.currentItem.addressAreaId.toString())
        this.sendCityName = this.allPro;
      } else {
        // console.log(this.currentItem, '卸货-线路信息回显');
        this.productInfo.orderUnloadAreaId = this.currentItem.addressAreaId;
        this.productInfo.orderUnloadArea = this.currentItem.addressArea;
        this.productInfo.orderUnloadDetail = this.currentItem.addressDetail;
        this.productInfo.orderUnloadLon = this.currentItem.addressLon;
        this.productInfo.orderUnloadLat = this.currentItem.addressLat;
        this.productInfo.orderUnloadContacter = this.currentItem.addressContacter;
        this.productInfo.orderUnloadContactMobile = this.currentItem.addressContactMobile;
        this.productInfo.orderUnloadCompany = this.currentItem.addressCompany;
        this.productInfo.orderUnloadContactIdentity = this.currentItem.addressContactIdentity;
        // console.log('areaCode',this.productInfo.orderUnloadArea);
        this.getPrvoince(String(this.currentItem.addressAreaId));
        // this.getPrvoince(this.currentItem.addressAreaId.toString())
        this.unLoadCityName = this.allPro;
      }

      this.secondtDialog = false;
    },

    //  物料信息 回显
    chooseItemBtn3(index) {
      // console.log(this.currentItem, 'goodsItems物料信息回显');

      if (this.classIndex >= 0) {
        this.productInfo.orderGoodsList[
          this.goodsItemsIndex
        ].goodsName = this.currentItem.goodsName;

        this.productInfo.orderGoodsList[
          this.goodsItemsIndex
        ].goodType = this.currentItem.goodType;

        this.productInfo.orderGoodsList[
          this.goodsItemsIndex
        ].goodsClass = this.currentItem.goodsClass;

        this.productInfo.orderGoodsList[
          this.goodsItemsIndex
        ].goodsSettlementUnit = this.currentItem.goodsSettlementUnit;

        this.productInfo.orderGoodsList[
          this.goodsItemsIndex
        ].goodsGrossWeight = this.currentItem.goodsGrossWeight;

        this.productInfo.orderGoodsList[
          this.goodsItemsIndex
        ].goodsNetWeight = this.currentItem.goodsNetWeight;

        this.productInfo.orderGoodsList[
          this.goodsItemsIndex
        ].goodsVolume = this.currentItem.goodsVolume;
        this.wuliao = false;
      } else {
        this.$message({
          message: "请选择一个项目",
          type: "error",
          offset: 300
        });
      }

      // console.log(this.productInfo.orderGoodsList);
    },

    //  单价信息  回显
    chooseItemBtn4(classIndex) {
      if (classIndex >= 0) {
        // console.log(this.currentItem, '单价信息回显')
        this.productInfo.priceSettlementUnit = this.currentItem.priceSettlementUnit;
        this.productInfo.priceSettlementUnitprice = this.currentItem.priceSettlementUnitprice;
        this.productInfo.priceName = this.currentItem.priceName;
        if (this.isBigZong) {
          this.productInfo.priceDeficitWay = this.currentItem.priceDeficitWay;

          this.productInfo.priceDeficitValue = this.currentItem.priceDeficitValue;
          this.productInfo.priceDeficitUnitprice = this.currentItem.priceDeficitUnitprice;
          this.productInfo.priceRiseWay = this.currentItem.priceRiseWay;

          this.productInfo.priceRiseValue = this.currentItem.priceRiseValue;
          this.productInfo.priceRiseUnitprice = this.currentItem.priceRiseUnitprice;
        } else {
          this.productInfo.priceDamageDeduct = this.currentItem.priceDamageDeduct;
          this.productInfo.priceOverdueDeduct = this.currentItem.priceOverdueDeduct;
          this.productInfo.priceOtherDeduct = this.currentItem.priceOtherDeduct;
        }
        this.fourthDialog = false;
      } else {
        this.$message({
          message: "请选择一个项目",
          type: "error",
          offset: 300
        });
      }
    },

    //弹框显示
    newProjectChoose(index) {
      this.classIndex = -1; // 清空 上一次弹窗选择项
      let url = "";
      if (index == 1) { // 选择项目列表
        this.firstDialog = true;
        url =this.$api.Basics.audited + "?projectStatus=1";
        this.$http
        .get(url, true)
        .then(res => {
          // console.log(res, '选择项目列表');
          if (res.data.code > 0) {
            res.data.data.list.forEach((item, index, arr) => {
              //结算模式
              item.projectSettlementWay == 1
                ? item.projectSettlementWay = "无差额"
                : item.projectSettlementWay == 2
                ? item.projectSettlementWay = "有差额代管"
                : item.projectSettlementWay = "无差额代管";
              //计费分类
              item.projectSettlementClass == 1
                ? (item.projectSettlementClass = "大宗")
                : item.projectSettlementClass == 2
                ? (item.projectSettlementClass = "快消")
                : "";
              //业务类型
              item.projectBusinessType == 1002996
                ? (item.projectBusinessType = "干线普货运输")
                : "";
              //运费计算方式
              item.projectCalculateWay == 1
                ? (item.projectCalculateWay = "系统计算")
                : item.projectCalculateWay == 2
                ? (item.projectCalculateWay = "手动输入")
                : "";
            });
            this.dataList = res.data.data.list.filter(item => {
              return item.projectSettlementClass == '大宗'
            });
          }
        })
        .catch(err => {
        this.$message({
          showClose: true,
          message: "失败（≧?≦）",
          type: "error"
        })
      });
      }

      if (index == 2) { // 选择线路列表 出发城市
        this.secondtDialog = true;
        this.addressType = 1;
        url =
          this.$api.Basics.line +
          "?page=1&rows=20";
      }

      if (index == 3) { // 选择线路列表 卸货城市
       this.secondtDialog = true;
        this.addressType = 2;
        url =
          this.$api.Basics.line +
          "?page=1&rows=20";
      }

      // if (index == 3) { // 选择合同
      //   this.secondtDialog = true;
      //   this.addressType = 2;
      //   url =
      //     this.$api.Order.getAddress +
      //     "?groupId=" +
      //     this.productInfo.groupId +
      //     "&addressType=" +
      //     this.addressType;
      // }

      if (index == 5) {
        this.fourthDialog = true;
        if (this.isBigZong) {
          this.contractType = 1;
        } else {
          this.contractType = 2;
        }
        // url =
        //   this.$api.Order.getContract +
        //   "?groupId=" +
        //   this.productInfo.groupId +
        //   "&priceType=" +
        //   2 +
        //   "&projectSettlementClass=" +
        //   this.contractType;
        url = this.$api.Basics.priceList +
          "?page=1&rows=20";
      }
      if(index == 2 || index == 3 || index == 5)
      this.getOrderInfo(url);
    },
    //  物料弹框
    getGoodsItem(index) {
      // console.log(this.productInfo.orderGoodsList,'goodsList')
      this.classIndex = -1; // 清空 上一次弹窗选择项
      this.goodsItemsIndex = index;
      let length = this.productInfo.orderGoodsList.length;
      this.wuliao = true;
      let url =
      this.$api.Basics.materiel + "?page=1&rows=20" + "&project.projectName=" + this.productInfo.projectName;
      this.getOrderInfo(url);
    },

    // 弹框结束

    addDomain() {
      this.productInfo.orderGoodsList.push({
        goodsName: "",
        goodType: "",
        goodsClass: "",
        goodsTotal: "",
        goodsSettlementUnit: "",
        goodsGrossWeight: "",
        goodsNetWeight: "",
        goodsVolume: "",
        goodsQty: ""
      });
    },
    //  亏吨允许比列
    // priceDeficitWay(command) {
    //     this.productInfo.priceDeficitWay = command.id;
    //     this.orderDeficWay = command.item;
    // },
    // //  涨吨允许比列
    // priceRiseWay(command) {
    //     this.productInfo.priceRiseWay = command.id;
    //     this.orderRiWay = command.item;
    // },
    isSavePrice(command) {
      this.productInfo.orderPremiumFlag = command.id;
      this.isSaved = command.item;
      if (command.id == 1) {
        this.isSaved = command.item;
      }
    },
    orderLoad(val) {
      // console.log(val);

      this.orderUnload = {
        disabledDate(time) {
          let _now = Date.now();
          return time.getTime() < val;
        }
      };
      this.isChange = false;
    },
    handleUnload() {},
    removeDomain(item) {
      var index = this.productInfo.orderGoodsList.indexOf(item);
      if (index !== -1) {
        this.productInfo.orderGoodsList.splice(index, 1);
      }
    },
    // 发货城市 id  数字类型
    sendCity(val) {
      // console.log(val, 'sendCity')
      this.productInfo.orderLoadArea = Number(val[2]);
      this.productInfo.orderLoadAreaId = Number(val[2]);
    },

    //  卸货城市  id  数字类型
    unLoadCity(val) {
      this.productInfo.orderUnloadArea = Number(val[2]);
      this.productInfo.orderUnloadAreaId = Number(val[2]);
    },

    submitForm(formName) {
      // console.log(this.productInfo, 'productInfo')
      let data = this.productInfo.orderGoodsList;

      if (this.motBusinessType == "") {
        this.$message({
          message: "业务类型不能为空",
          type: "error",
          offset: 200
        });
        return false;
      }
      if (this.orderSetWay == "") {
        this.$message({
          message: "结算类型不能为空",
          type: "error",
          offset: 200
        });
        return false;
      }
      if (this.orderSetType == "") {
        this.$message({
          message: "计费分类不能为空",
          type: "error",
          offset: 200
        });
        return false;
      }

      if (this.orderCalWay == "") {
        this.$message({
          message: "运费计算方式不能为空",
          type: "error",
          offset: 200
        });
        return false;
      }
      if (this.isBigZong) {
        if (this.orderDeficWay == "") {
          this.$message({
            message: "亏吨计量方式不能为空",
            type: "error",
            offset: 200
          });
          return false;
        }

        if (this.orderRiWay == "") {
          this.$message({
            message: "涨吨计量方式不能为空",
            type: "error",
            offset: 200
          });
          return false;
        }
      }
      // data.forEach((itemData, index) => {
      //     for (let key in itemData) {
      //         if (itemData[key] == "") {
      //             this.$message({
      //                 message: "物料信息不能为空",
      //                 type: "error"
      //             });
      //             return false;
      //         }
      //     }
      // });
      console.log(this.mobiles)
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(this.mobiles == "") {
            this.$message({
              showClose: true,
              message: "轻输入手机号",
              type: "error"
            });
            return false;
          }
          let that = this;
          let param = new URLSearchParams();
          param.append("truckingId", this.$route.query.truckingId); // 预派车单ID
          param.append("advanceAmt", this.productInfo.truckingAdvanceAmt); // 预付款
          param.append("advanceCard", this.productInfo.truckingAdvanceCard); // 预付油气卡
          param.append("mobiles", this.mobiles); // 手机号
          this.getData(param);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 创建订单立即创建
    getData(data) {
      console.log(data, '派车信息')
      this.$http
        .post(this.$api.Order.dispatchCar, data, true)
        .then(res => {
          if(res.data.code > 0) {
            this.$message({
              showClose: true,
              message: "派车成功",
              type: "success"
            });
            this.$router.go(-1);
          } else {
            this.$message({
              showClose: true,
              message: res.data.message,
              type: "error"
            });
          }
        })
        .catch(err => {
        this.$message({
          showClose: true,
          message: "失败（≧?≦）",
          type: "error"
        })
      });
    },
    
    getOrderInfo(urlData) {
      this.$http
        .get(urlData, true)
        .then(res => {
          // console.log(res, 'getOrderInfo');
          if (res.data.code > 0) {
            
          //   res.data.data.list.forEach((item, index, arr) => {
          //   //结算模式
          //   item.projectSettlementWay == 1
          //     ? (item.projectSettlementWay = "无差额")
          //     : item.projectSettlementWay == 2
          //     ? (item.projectSettlementWay = "有差额")
          //     : "";
          //   //计费分类
          //   item.projectSettlementClass == 1
          //     ? (item.projectSettlementClass = "大宗")
          //     : item.projectSettlementClass == 2
          //     ? (item.projectSettlementClass = "快消")
          //     : "";
          //   //业务类型
          //   item.projectBusinessType == 1002996
          //     ? (item.projectBusinessType = "干线普货运输")
          //     : "";
          //   //运费计算方式
          //   item.projectCalculateWay == 1
          //     ? (item.projectCalculateWay = "系统计算")
          //     : item.projectCalculateWay == 2
          //     ? (item.projectCalculateWay = "手动输入")
          //     : "";
          // });
            this.dataList = res.data.data.list;
          }
        })
        .catch(err => {
        this.$message({
          showClose: true,
          message: "失败（≧?≦）",
          type: "error"
        })
      });
    },
    chooseItem(index) {
      this.classIndex = index;
      this.currentItem = this.dataList[index];
    },

    //  获取部委货物类型接口
    getGoodTypeId() {
      this.$http
        .get(this.$api.Order.getGoodTypeId, true)
        .then(res => {
          if (res.data.code > 0) {
            this.downList.list3 = res.data.data;
          }
        })
        .catch(err => {
        this.$message({
          showClose: true,
          message: "失败（≧?≦）",
          type: "error"
        })
      });
    },
    // 获取货物分类
    getGoodClassCode() {
      this.$http
        .get(this.$api.Basics.materietype, true)
        .then(res => {
          if (res.data.code > 0) {
            this.downList.list4 = res.data.data;
          }
        })
        .catch(err => {
        this.$message({
          showClose: true,
          message: "失败（≧?≦）",
          type: "error"
        })
      });
    },
    // 用省市区ID 查找省市区文字
    getPrvoince(code) {
      let str = code;
      let provinceCode = str.substring(0, 2) + "0000";
      let cityCode = str.substring(0, 4) + "00";
      this.allPro[0] = provinceCode;
      this.allPro[1] = cityCode;
      this.allPro[2] = code;
    },
    // 直接返回省市区文字
    getProvinceName(code) {
      let proArr = [];
      let str = code;
      let provinceCode = str.substring(0, 2) + "0000";
      let cityCode = str.substring(0, 4) + "00";
      proArr[0] = provinceCode;
      proArr[1] = cityCode;
      proArr[2] = code;
      return proArr;
    },

    // 地图插件 start

    showMapDialog() {
      this.fivethDialog = true;
      setTimeout(() => {
        this.showMap();
      }, 1000);
    },

    showMap() {
      const _this = this;
      this.map = new BMap.Map(this.$refs.Bmap);
      this.map.centerAndZoom(new BMap.Point(113.275, 23.117), 10);
      this.map.addEventListener("click", function(e) {
        _this.location.lng = parseFloat(e.point.lng).toFixed(3);
        _this.location.lat = parseFloat(e.point.lat).toFixed(3);
      });
    },

    // 点击返回
    back() {
      this.$router.go(-1);
    }

    // 地图插件 end

    //
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    let that = this;
    this.$store.dispatch("getYewuList", that); // 项目业务类型下拉
    this.$store.dispatch("getOptions", that); // 省市区ID
    this.$store.dispatch("getTons", that); // 获取计费量单位
    this.getGoodClassCode(); // 获取货物分类

    // this.getGoodTypeId(); // 货物类型接口
    // console.log(listData.getData())
    //计费量单位
    // this.$http.post(this.$api.Basics.jifei, "", true)
    //   .then(res => {
    //     // console.log(res, "计费量单位");
    //     this.downList.list2 = res.data.data;
    //   })
    //   .catch(err => {
    //     this.$message({
    //       showClose: true,
    //       message: "失败（≧?≦）",
    //       type: "error"
    //     })
    //   });
    // console.log(this.$route,'$route')
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    if(this.$route.query.truckingId) {
      this.title = "查看";
      this.isChange = false;
      console.log(this.$route.query.truckingId, '查看预派车单')
      let param = new URLSearchParams();
      param.append("truckingId", this.$route.query.truckingId);
      this.$http.post(this.$api.Order.getTruckingInfo, param, true)
        .then(res => {
          if(res.data.code == 1) {
            let orderDetail = res.data.data;
            
            // 项目信息字段
            // this.productInfo.orderProjectId = orderDetail.orderProjectId; // 项目ID
            this.productInfo.orderFreightTotal = orderDetail.truckingFreightTotal; // 计费总量
            this.productInfo.orderFreightUnit = orderDetail.truckingFreightUnit; // 计费总量单位

            this.productInfo.projectName = orderDetail.orderProject.projectName; //项目名称
            this.productInfo.projectCustomer = orderDetail.orderProject.projectCustomer; // 客户名称
            this.productInfo.projectBusinessType = orderDetail.orderProject.projectBusinessType; //业务类型
              this.productInfo.projectBusinessTypeName = orderDetail.orderProject.projectBusinessTypeName;
              this.productInfo.projectSettlementWay = orderDetail.orderProject.projectSettlementWay; // 结算类型
              this.productInfo.projectSettlementWayName = orderDetail.orderProject.projectSettlementWayName;
            this.productInfo.projectSettlementClass = orderDetail.orderProject.projectSettlementClass; //计费分类 1大宗 2快消
              this.productInfo.projectSettlementClassName = orderDetail.orderProject.projectSettlementClassName
            this.orderSetType = orderDetail.orderProject.projectSettlementClassName; //计费分类 1大宗 2快消
            this.productInfo.projectCalculateWay = orderDetail.orderProject.projectCalculateWay; // 运费计算模式
              this.productInfo.projectCalculateWayName = orderDetail.orderProject.projectCalculateWayName;
            this.productInfo.projectOrderCalculateFormula = orderDetail.orderProject.projectOrderCalculateFormula; //订单运费计算公式（系统计算时必填）
            this.productInfo.projectOrderCalculateRound = orderDetail.orderProject.projectOrderCalculateRound; //订单运费是否取值（1是 0否 系统计算时必填）
            this.productInfo.projectShippingCalculateFormula = orderDetail.orderProject.projectShippingCalculateFormula; //运单运费计算公式（系统计算时必填）
            this.productInfo.projectShippingCalculateRound = orderDetail.orderProject.projectShippingCalculateRound; //运单运费是否取值（1是 0否 系统计算时必填）
            
            // 订单信息字段
            // this.productInfo.orderId = orderDetail.orderId;
            // this.productInfo.orderCode = orderDetail.orderCode;

            // 线路信息字段
            /**
             * 发货人信息
             * */
            this.productInfo.orderLoadAddressId = orderDetail.truckingLoadAddress.orderAddressId;
            this.productInfo.orderLoadAreaId = orderDetail.truckingLoadAddress.addressAreaId; // 发货地址区县ID
            this.productInfo.orderLoadArea = orderDetail.truckingLoadAddress.addressAreaId; // 发货地址区县  核实
            this.productInfo.orderLoadAddress = orderDetail.truckingLoadAddress.addressDetail; // 发货地址  核实
            this.productInfo.orderLoadLon = orderDetail.truckingLoadAddress.addressLon; // 发货经度  核实
            this.productInfo.orderLoadLat = orderDetail.truckingLoadAddress.addressLat; // 发货纬度  核实
            this.productInfo.orderLoadCompany = orderDetail.truckingLoadAddress.addressCompany; //发货单位  核实
            this.productInfo.orderLoadContacter = orderDetail.truckingLoadAddress.addressContacter; //发货联系人  核实
            this.productInfo.orderLoadContactMobile = orderDetail.truckingLoadAddress.addressContactMobile; // 发货人电话  核实
            this.sendCityName = this.getProvinceName(orderDetail.truckingLoadAddress.addressAreaId + '');
            /**
             * 收货人信息
             * */
            // this.productInfo.orderUnLoadAddressId = orderDetail.orderUnLoadAddress.orderAddressId;
            this.productInfo.orderUnloadAreaId = orderDetail.truckingUnLoadAddress.addressAreaId; // 卸货区县ID
            this.productInfo.orderUnloadArea = orderDetail.truckingUnLoadAddress.addressAreaId; // 卸货区县 核实
            this.productInfo.orderUnloadDetail = orderDetail.truckingUnLoadAddress.addressDetail; // 卸货详细地址 核实
            this.productInfo.orderUnloadLon = orderDetail.truckingUnLoadAddress.addressLon; // 卸货经度  核实
            this.productInfo.orderUnloadLat = orderDetail.truckingUnLoadAddress.addressLat; // 卸货纬度  核实
            this.productInfo.orderUnloadCompany = orderDetail.truckingUnLoadAddress.addressCompany; // 卸货公司  核实
            this.productInfo.orderUnloadContacter = orderDetail.truckingUnLoadAddress.addressContacter; // 卸货联系人  核实
            this.productInfo.orderUnloadContactMobile = orderDetail.truckingUnLoadAddress.addressContactMobile; // 卸货联系人电话  核实
            this.productInfo.orderUnloadContactIdentity = orderDetail.truckingUnLoadAddress.addressContactIdentity; //收货人信用代码或个人证件号  核实
            this.unLoadCityName = this.getProvinceName(orderDetail.truckingUnLoadAddress.addressAreaId + '');

            // 物料
            this.productInfo.orderGoodsList = orderDetail.truckingGoodsList

            //单价信息
            /**
             * 单价信息 字段
             * 大宗合同
             **/
            this.productInfo.orderPriceId = orderDetail.truckingPrice.orderPriceId;
            this.productInfo.priceName = orderDetail.truckingPrice.priceName;// 价格/合同 名称
            this.productInfo.priceSettlementUnit = orderDetail.truckingPrice.priceSettlementUnit;//计费单位
            this.productInfo.priceSettlementUnitprice = orderDetail.truckingPrice.priceSettlementUnitprice;//订单单价
            this.productInfo.priceDeficitWay = orderDetail.truckingPrice.priceDeficitWay;//亏吨计量方式
            this.productInfo.priceDeficitValue = orderDetail.truckingPrice.priceDeficitValue;// 亏吨允许比列
            this.productInfo.priceDeficitUnitprice = orderDetail.truckingPrice.priceDeficitUnitprice;// 亏吨扣款标准
            this.productInfo.priceRiseWay = orderDetail.truckingPrice.priceRiseWay;// 涨吨计量方式
            this.productInfo.priceRiseValue = orderDetail.truckingPrice.priceRiseValue;//涨吨允许比例
            this.productInfo.priceRiseUnitprice = orderDetail.truckingPrice.priceRiseUnitprice;// 涨吨扣款标准
            /**
             * 非大宗合同
             * **/
            this.productInfo.priceDamageDeduct = orderDetail.truckingPrice.priceDamageDeduct;// 货损扣款
            this.productInfo.priceOverdueDeduct = orderDetail.truckingPrice.priceOverdueDeduct;// 晚到扣款
            this.productInfo.priceOtherDeduct = orderDetail.truckingPrice.priceOtherDeduct;// 其他扣款

            /***
                其它信息
            **/
            this.productInfo.orderLoadTime = orderDetail.truckingLoadTime;// 要求提货时间
            this.productInfo.orderUnloadTime = orderDetail.truckingUnloadTime;// 要求卸货时间
            this.productInfo.truckingUnloadSettlement = orderDetail.truckingUnloadSettlement; //是否以签收量计算运费 1是 2否
            this.productInfo.truckingManagementAmt = orderDetail.truckingManagementAmt; // 管理费
            this.productInfo.truckingOtherAmtDesc = orderDetail.truckingOtherAmtDesc; // 其他费用描述
            this.productInfo.truckingOtherAmt = orderDetail.truckingOtherAmt; // 其他费用金额
            this.productInfo.truckingAdvanceCard = orderDetail.truckingAdvanceCard; // 油气卡预付
            this.productInfo.truckingAdvanceAmt = orderDetail.truckingAdvanceAmt; // 现金预付
          } else {
            this.$message({
              showClose: true,
              message: res.data.message,
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
    }
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

.newAddTitle {
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}
.projectName {
  font-size: 18px;
  font-weight: 800;
  height: 60px;
  line-height: 60px;
  padding-left: 70px;
}
.icon1 {
  background: url("../../../assets/images/icon1.png") no-repeat left 20px center
    #f5f8ff;
}
.icon2 {
  background: url("../../../assets/images/icon2.png") no-repeat left 20px center
    #f5f8ff;
}
.icon3 {
  background: url("../../../assets/images/icon3.png") no-repeat left 20px center
    #f5f8ff;
}
.icon4 {
  background: url("../../../assets/images/icon4.png") no-repeat left 20px center
    #f5f8ff;
}
.icon5 {
  background: url("../../../assets/images/icon5.png") no-repeat left 20px center
    #f5f8ff;
}
.projectBox {
  background: #fff;
}
.el-dropdown-link {
  font-size: 16px;
  color: #333;
}
/* .el-row {
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0;
    }
} */
.flex {
  display: flex;
}
.flex li {
  flex-grow: 1;
  height: 55px;
  line-height: 55px;
  text-align: center;
  font-size: 16px;
  border: 1px solid #e5e5e5;
  margin-bottom: -1px;
  margin-right: -1px;
  width: 200px;
  white-space: normal;
  word-break: break-all;
}
.flex li.wuInfoChoose {
  width: 80px;
}
.flex li.noborder .el-input__inner {
  border: 0;
  text-align: center;
}
.flex li .el-form-item {
  margin-bottom: 0;
  margin-top: 5px;
}
.width100 {
  width: 85px;
}
.width80 {
  width: 75px;
}
.el-input-group__append {
  background: #659cfe;
  color: #fff;
}
.width300 {
  width: 500px;
}
.el-main .height300 {
  height: 300px;
}
/* .projectInfoList {
} */
.projectInfoList li {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #cecece;
  padding: 10px;
  border-radius: 5px;
  background: #f5f8ff;
  margin-bottom: 20px;
}
.projectInfoList li.active {
  border: 1px solid #8baef7;
}
.addFooterCenter {
  text-align: center;
  padding-top: 20px;
}
.addFooterCenter button {
  width: 100px;
  margin: 0 20px;
}
.projectTitle {
  font-size: 14px;
  margin-bottom: 10px;
  height: 24px;
  line-height: 24px;
}
.projectTitle span {
  font-size: 16px;
  margin-right: 30px;
}
.nobor input[type="text"] {
  border: 0;
  text-align: center;
}
.is-error input[type="text"] {
  border-bottom: 1px solid #f56c6c;
}
.flex .item {
  flex-grow: 1;
  line-height: 24px;
  width: 200px;
}
.el-button--text {
  color: #409eff;
}
.el-form-item__error {
  display: block;
  width: 100%;
  text-align: center;
}
#Bmap {
  height: 600px;
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
.fotterBtn {
  display: flex;
  justify-content: center;
  padding: 30px 0;
}

</style>