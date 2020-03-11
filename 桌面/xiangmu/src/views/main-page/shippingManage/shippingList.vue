<template>
  <div class="wayBill">
    <div class="table_main">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="待提货" name="first">
          <!-- 待生效 -->
          <div class="audit_search">
            <!-- 单行搜索引擎 -->
            <el-form ref="searchData" :model="searchData" label-width="80px">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                  <el-form-item label="承运人" prop="driverName">
                    <el-input placeholder="请输承运人姓名" v-model="searchData.driverName" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                  <el-form-item label="手机号" prop="driverMobile">
                    <el-input placeholder="请输承运人电话" v-model="searchData.driverMobile" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                  <el-form-item label="车牌号" prop="carCode">
                    <el-input placeholder="请输车牌号" v-model="searchData.carCode" clearable></el-input>
                  </el-form-item>
                </el-col>

                <el-col :xs="12" :sm="6" :md="4" :lg="2" :xl="2">
                  <el-form-item label-width="0">
                    <el-button size="medium" type="primary" @click="doSearch()">查询</el-button>
                  </el-form-item>
                </el-col>

                <el-col :xs="12" :sm="6" :md="4" :lg="2" :xl="2">
                  <el-form-item label-width="0">
                    <el-button size="medium" @click="resetData('searchData')" class="reset">重置</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="tab_operation">
            <el-button class="reset reset_tab" type="primary" @click="waybillGetgoods()">提货</el-button>
            <el-button class="reset reset_tab" type="primary" @click="abnormal(3)">异常上报</el-button>
            <el-button class="reset reset_tab" type="primary" @click="seeMessage()">物料信息</el-button>
          </div>

          <el-dialog title="请选择您要提货的类型" :visible.sync="centerDialogVisible" width="30%" center>
            <span slot="footer" class="dialog-footer">
              <el-button size="mini" @click="tihuobig ">大 宗</el-button>
              <el-button size="mini" @click="tihuosmall ">非 大 宗</el-button>
            </span>
          </el-dialog>
        </el-tab-pane>

        <el-tab-pane label="待签收" name="second">
          <!-- 派单中 -->
          <div class="audit_search">
            <!-- 单行搜索引擎 -->
            <el-form ref="searchData" :model="searchData" label-width="80px">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                  <el-form-item label="承运人" prop="driverName">
                    <el-input placeholder="请输承运人姓名" v-model="searchData.driverName" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                  <el-form-item label="手机号" prop="driverMobile">
                    <el-input placeholder="请输承运人电话" v-model="searchData.driverMobile" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                  <el-form-item label="车牌号" prop="carCode">
                    <el-input placeholder="请输车牌号" v-model="searchData.carCode" clearable></el-input>
                  </el-form-item>
                </el-col>

                <el-col :xs="12" :sm="6" :md="4" :lg="2" :xl="2">
                  <el-form-item label-width="0">
                    <el-button size="medium" type="primary" @click="doSearch()">查询</el-button>
                  </el-form-item>
                </el-col>

                <el-col :xs="12" :sm="6" :md="4" :lg="2" :xl="2">
                  <el-form-item label-width="0">
                    <el-button size="medium" @click="resetData('searchData')" class="reset">重置</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="tab_operation">
            <el-button class="reset reset_tab" type="primary" @click="signGetgoods()">签收</el-button>
            <el-button class="reset reset_tab" type="primary" @click="abnormal(3)">异常上报</el-button>
            <el-button class="reset reset_tab" type="primary" @click="seeMessage()">物料信息</el-button>
          </div>
          <el-dialog title="请选择您要签收的类型" :visible.sync="qianshoubigAddsmall" width="30%" center>
            <span slot="footer" class="dialog-footer">
              <el-button size="mini" @click="qianshoubig ">大 宗(系统计算)</el-button>
              <el-button size="mini" @click="qianshoubighand ">大 宗(手动计算)</el-button>
              <el-button size="mini" @click="qianshousmall ">非 大 宗(系统计算)</el-button>
              <el-button size="mini" @click="qianshousmallhand ">非 大 宗(手动计算)</el-button>
            </span>
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="已提货签收" name="third">
          <!-- 已完成 -->
          <div class="audit_search">
            <!-- 单行搜索引擎 -->
            <el-form ref="searchData" :model="searchData" label-width="80px">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                  <el-form-item label="承运人" prop="driverName">
                    <el-input placeholder="请输承运人姓名" v-model="searchData.driverName" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                  <el-form-item label="手机号" prop="driverMobile">
                    <el-input placeholder="请输承运人电话" v-model="searchData.driverMobile" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                  <el-form-item label="车牌号" prop="carCode">
                    <el-input placeholder="请输车牌号" v-model="searchData.carCode" clearable></el-input>
                  </el-form-item>
                </el-col>

                <el-col :xs="12" :sm="6" :md="4" :lg="2" :xl="2">
                  <el-form-item label-width="0">
                    <el-button size="medium" type="primary" @click="doSearch()">查询</el-button>
                  </el-form-item>
                </el-col>

                <el-col :xs="12" :sm="6" :md="4" :lg="2" :xl="2">
                  <el-form-item label-width="0">
                    <el-button size="medium" @click="resetData('searchData')" class="reset">重置</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="tab_operation">
            <el-button class="reset reset_tab" type="primary" @click="seedatils()">查看详情</el-button>
            <el-button class="reset reset_tab" type="primary" @click="abnormal(2)">异常上报</el-button>
            <el-button class="reset reset_tab" type="primary" @click="seeMessage()">物料信息</el-button>
          </div>
          <!-- <el-dialog title="请选择你要查看信息的类型" :visible.sync="seeinformation" width="30%" center>
            <span slot="footer" class="dialog-footer">
              <el-button size="mini" @click="information(1) ">大 宗</el-button>
              <el-button size="mini" @click="information(2) ">非 大 宗</el-button>
            </span>
          </el-dialog> -->
        </el-tab-pane>
        <el-tab-pane label="全部" name="fourth">
          <!-- 已完成 -->
          <div class="audit_search">
            <!-- 单行搜索引擎 -->
            <el-form ref="searchData" :model="searchData" label-width="80px">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                  <el-form-item label="承运人" prop="driverName">
                    <el-input placeholder="请输承运人姓名" v-model="searchData.driverName" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                  <el-form-item label="手机号" prop="driverMobile">
                    <el-input placeholder="请输承运人电话" v-model="searchData.driverMobile" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
                  <el-form-item label="车牌号" prop="carCode">
                    <el-input placeholder="请输车牌号" v-model="searchData.carCode" clearable></el-input>
                  </el-form-item>
                </el-col>

                <el-col :xs="12" :sm="6" :md="4" :lg="2" :xl="2">
                  <el-form-item label-width="0">
                    <el-button size="medium" type="primary" @click="doSearch()">查询</el-button>
                  </el-form-item>
                </el-col>

                <el-col :xs="12" :sm="6" :md="4" :lg="2" :xl="2">
                  <el-form-item label-width="0">
                    <el-button size="medium" @click="resetData('searchData')" class="reset">重置</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="tab_operation"></div>
        </el-tab-pane>
      </el-tabs>

      <div class="table_com">
        <div class="list-box">
          <tabComp :tableHeader="setAuditedData" :tableData1="list"></tabComp>
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="page"
            :limit.sync="limit"
            @pagination="getList"
          />
        </div>
      </div>
      <!-- 提货弹窗 -->
      <div class="getgoods">
        <!-- 提货大宗开始 -->
        <el-dialog title="提货：大宗" :visible.sync="dialogFormVisiblebig">
          <el-form :model="form" class="getgoodsform" >
            <!-- 上传图片 -->
            <div class="uploadimg">
              <el-image
                class="avatar"
                v-if="form.loadReceipt.receiptBill"
                :src="form.loadReceipt.receiptBill"
                :preview-src-list="srcList"
              ></el-image>
              <el-upload
                v-if="form.loadReceipt.receiptBill"
                class="avatar-uploader"
                action
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :http-request="uploadFile1"
              >
                <i class="avatar-uploader-icon">重新上传</i>
              </el-upload>

              <div v-else class="imagebg">此处为提货单照片</div>
            </div>
            <!-- 上传图片结束 -->
            <div class="goods_img_right">
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="订单号" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.orderCode" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="运单号" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.shippingCode" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="预派单号" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input
                        v-model="form.trucking.truckingCode"
                        :disabled="true"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="司机" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.driverName" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="车牌号" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.carCode" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
            </div>
            <div class="goods_img_bottom">
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="派单时间" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.createTime" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="派单计费量" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input
                        v-model="form.trucking.truckingFreightTotal"
                        :disabled="true"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="提货时间" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-date-picker
                              v-model="form.shippingLoadTime"
                              type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              class="getgoodsinp_time"
                      ></el-date-picker>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="提货计费量" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input
                              v-model="form.shippingLoadQty"
                              autocomplete="off"
                              placeholder="请输入提货计费量"
                              :disabled="form.orderProject.projectSettlementClass == 2?true:false"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="现场装货地址" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.loadReceipt.receiptImageAddress" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>


            </div>
          </el-form>

          <div class="goodsmessage_img">
            <div class="demo-image__preview goodsimg">
              <el-image
                class="avatar"
                v-if="form.loadReceipt.receiptImage"
                :src="form.loadReceipt.receiptImage"
                :preview-src-list="srcList"
              ></el-image>
              <el-upload
                v-if="form.loadReceipt.receiptImage"
                class="avatar-uploader"
                action
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :http-request="uploadFile2"
              >
                <i class="avatar-uploader-icon">重新上传</i>
              </el-upload>

              <div v-else class="imagebg">此处为装货现场照片</div>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisiblebig = false">取 消</el-button>
            <el-button type="primary" @click="getgoods(1)">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 提货大宗结束 -->

        <!-- 提货非大宗开始 -->
        <el-dialog title="提货：非大宗" :visible.sync="dialogFormVisiblesmall">
          <el-form :model="form" class="getgoodsform">
            <!-- 上传图片 -->
            <div class="uploadimg">
              <el-image
                class="avatar"
                v-if="form.loadReceipt.receiptBill"
                :src="form.loadReceipt.receiptBill"
                :preview-src-list="srcList"
              ></el-image>
              <el-upload
                v-if="form.loadReceipt.receiptBill"
                class="avatar-uploader"
                action
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :http-request="uploadFile1"
              >
                <i class="avatar-uploader-icon">重新上传</i>
              </el-upload>
              <div v-else class="imagebg">此处为提货单照片</div>
            </div>
            <!-- 上传图片结束 -->
            <div class="goods_img_right">
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="订单号" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.orderCode" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="运单号" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.shippingCode" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="预派单号" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input
                        v-model="form.trucking.truckingCode"
                        :disabled="true"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="司机" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.driverName" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="车牌号" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.carCode" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
            </div>
            <div class="goods_img_bottom">
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="派单时间" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.createTime" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>

              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="派单计费量" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input
                        v-model="form.trucking.truckingFreightTotal"
                        :disabled="true"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="提货时间" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-date-picker
                              v-model="form.shippingLoadTime"
                              type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              class="getgoodsinp_time"
                      ></el-date-picker>
                    </el-form-item>
                  </div>
                </div>
              </el-col>

              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="提货计费量" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input
                              v-model="form.shippingLoadQty"
                              autocomplete="off"
                              placeholder="请输入提货计费量"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="现场装货地址" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.loadReceipt.receiptImageAddress" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
            </div>
          </el-form>
          <el-divider></el-divider>
          <div class="goodsmessage">
            <el-table :data="form.shippingGoodsList" style="width: 100%">
              <el-table-column align="center" prop="goodsName" label="物料名称" width="180"></el-table-column>
              <el-table-column align="center" prop="createTime" label="接单时间" width="180"></el-table-column>
              <el-table-column align="center" prop="goodsSettlementTotal" label="派车计费量"></el-table-column>
            </el-table>
          </div>

          <div class="goodsmessage_img">
            <div class="demo-image__preview goodsimg">
              <el-image
                class="avatar"
                v-if="form.loadReceipt.receiptImage"
                :src="form.loadReceipt.receiptImage"
                :preview-src-list="srcList"
              ></el-image>
              <el-upload
                v-if="form.loadReceipt.receiptImage"
                class="avatar-uploader"
                action
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :http-request="uploadFile2"
              >
                <i class="avatar-uploader-icon">重新上传</i>
              </el-upload>

              <div v-else class="imagebg">此处为装货现场照片</div>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisiblesmall = false">取 消</el-button>
            <el-button type="primary" @click="getgoods(2)">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 提货非大宗结束 -->
      </div>
      <!-- 提货弹窗结束 -->

      <!-- 异常上报弹窗 -->
      <div class="getgoods">
        <el-dialog title="异常上报" :visible.sync="dialogerrVisible">
          <el-form :model="form" class="getgoodsform">
            <div class="goods_img_bottom">
              <el-form-item label="订单号" :label-width="formLabelWidth" class="getgoodsinp">
                <el-input v-model="form.orderCode" :disabled="true" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="计费分类" :label-width="formLabelWidth" class="getgoodsinp">
                <el-input v-model="form.shippingCalculateWay" :disabled="true" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="运单号" :label-width="formLabelWidth" class="getgoodsinp">
                <el-input v-model="form.shippingCode" :disabled="true" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="车牌号" :label-width="formLabelWidth" class="getgoodsinp">
                <el-input v-model="form.carCode" :disabled="true" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="承运人" :label-width="formLabelWidth" class="getgoodsinp">
                <el-input v-model="form.driverName" :disabled="true" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="异常原因" :label-width="formLabelWidth" class="getgoodsinp">
                <el-input
                  v-model="errMessage"
                  :disabled="form.disablea"
                  placeholder="请输入异常原因"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </div>
          </el-form>
          <el-divider></el-divider>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogerrVisible = false">取 消</el-button>
            <el-button type="primary" @click="errsubmit()">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <!-- 异常上报弹窗结束 -->

      <!-- 物料信息弹窗 -->
      <div class="getgoods">
        <el-dialog title="物料信息" :visible.sync="dialogMessageVisible" center>
          <el-table
            :data="tableData"
            style="width: 100%"
            height="420px"
            :header-cell-style="{background:'#E9F0FF',color:'#606266'}"
          >
            <el-table-column align="center" type="index" label="序号" width="130"></el-table-column>
            <el-table-column align="center" prop="goodsName" label="货物名称" width="130"></el-table-column>
            <el-table-column align="center" prop="goodType" label="货物类型" width="130"></el-table-column>
            <el-table-column align="center" prop="goodsClass" label="货物分类" width="130"></el-table-column>
            <el-table-column align="center" prop="goodsSettlementUnit" label="计费量" width="130"></el-table-column>
            <el-table-column align="center" prop="goodsGrossWeight" label="物料毛重" width="130"></el-table-column>
            <el-table-column align="center" prop="goodsNetWeight" label="物料净重" width="130"></el-table-column>
            <el-table-column align="center" prop="goodsVolume" label="物料体积" width="130"></el-table-column>
            <el-table-column align="center" prop="goodsQty" label="总件数" width="130"></el-table-column>
          </el-table>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogMessageVisible = false">关 闭</el-button>
          </div>
        </el-dialog>
      </div>
      <!-- 物料信息弹窗结束 -->

      <!-- 签收1弹窗 -->
      <!-- 签收 大宗  -->
      <div class="getgoods">
        <el-dialog title="签收:大宗(系统计算)" :visible.sync="dialoggetVisiblebig">
          <el-form :model="form" class="getgoodsform">
            <!-- 签收单 -->
          
            <div class="uploadimg">
              <el-image
                class="avatar"
                v-if="form.unLoadReceipt.receiptBill"
                :src="form.unLoadReceipt.receiptBill"
                :preview-src-list="srcList"
              ></el-image>
              <el-upload
                v-if="form.unLoadReceipt.receiptBill"
                class="avatar-uploader"
                action
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :http-request="uploadFile3"
              >
                <i class="avatar-uploader-icon">重新上传</i>
              </el-upload>
              <div v-else class="imagebg">此处为签收单照片</div>
            </div>
          
            <div class="goods_img_right">
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="订单号" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.orderCode" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>

              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="运单号" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.shippingCode" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="预派单号" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input
                        v-model="form.trucking.truckingCode"
                        :disabled="true"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="司机" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.driverName" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>

              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="车牌号" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.carCode" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
            </div>
            <div class="goods_img_bottom">
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="派单时间" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.createTime" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="派单计费量" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input
                              v-model="form.trucking.truckingFreightTotal"
                              :disabled="true"
                              autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>

              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="提货时间" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.shippingLoadTime" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="提货计费量" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.shippingLoadQty" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>

              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="签收时间" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-date-picker
                        v-model="form.signTime"
                        type="datetime"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        class="getgoodsinp_time"
                      ></el-date-picker>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="签收计费量" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.weight" autocomplete="off" placeholder="请输入提货计费量"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="签收现场地址" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input
                        v-model="form.unLoadReceipt.receiptImageAddress"
                        autocomplete="off"
                        placeholder="请输入签收现场地址"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
            </div>
          </el-form>
          <el-divider></el-divider>
           <!-- 签收现场 -->
          <div class="goodsmessage_img">
            <div class="demo-image__preview goodsimg">
              <el-image
                class="avatar"
                v-if="form.unLoadReceipt.receiptImage"
                :src="form.unLoadReceipt.receiptImage"
                :preview-src-list="srcList"
              ></el-image>
              <el-upload
                v-if="form.unLoadReceipt.receiptImage"
                class="avatar-uploader"
                action
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :http-request="uploadFile4"
              >
                <i class="avatar-uploader-icon">重新上传</i>
              </el-upload>

              <div v-else class="imagebg">此处为签收现场照片</div>
            </div>
          </div>
           <!-- 上传图片提货单 -->
            <div class="goodsmessage_img">
              <div class="demo-image__preview goodsimg">
                <el-image
                  class="avatar"
                  v-if="form.loadReceipt.receiptBill"
                  :src="form.loadReceipt.receiptBill"
                  :preview-src-list="srcList"
                ></el-image>
                <el-upload
                  v-if="form.loadReceipt.receiptBill"
                  class="avatar-uploader"
                  action
                  :show-file-list="false"
                  :before-upload="beforeAvatarUpload"
                  :http-request="uploadFile1"
                >
                  <i class="avatar-uploader-icon">重新上传</i>
                </el-upload>
                <div v-else class="imagebg">此处为提货单照片</div>
              </div>
            </div>
            <!-- 上传图片结束 -->
          <!-- 提货现场 -->
          <div class="goodsmessage_img">
            <div class="demo-image__preview goodsimg">
              <el-image
                class="avatar"
                v-if="form.loadReceipt.receiptImage"
                :src="form.loadReceipt.receiptImage"
                :preview-src-list="srcList"
              ></el-image>
              <el-upload
                v-if="form.loadReceipt.receiptImage"
                class="avatar-uploader"
                action
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :http-request="uploadFile2"
              >
                <i class="avatar-uploader-icon">重新上传</i>
              </el-upload>

              <div v-else class="imagebg">此处为提货现场照片</div>
            </div>
          </div>
         
         

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialoggetVisiblebig = false">取 消</el-button>
            <el-button type="primary" @click="signSubmit()">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <!-- 签收大宗结束  -->

      <!-- 签收大宗手动 -->
      <div class="getgoods">
        <el-dialog title="签收:大宗(手动计算)" :visible.sync="dialoggetVisiblebighand">
          <el-form :model="form" class="getgoodsform">
              <!-- 签收单 -->
          
              <div class="uploadimg">
                <el-image
                  class="avatar"
                  v-if="form.unLoadReceipt.receiptBill"
                  :src="form.unLoadReceipt.receiptBill"
                  :preview-src-list="srcList"
                ></el-image>
                <el-upload
                  v-if="form.unLoadReceipt.receiptBill"
                  class="avatar-uploader"
                  action
                  :show-file-list="false"
                  :before-upload="beforeAvatarUpload"
                  :http-request="uploadFile3"
                >
                  <i class="avatar-uploader-icon">重新上传</i>
                </el-upload>

                <div v-else class="imagebg">此处为签收单照片</div>
            </div>
         
            
            <div class="goods_img_right">
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="订单号" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.orderCode" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>

              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="运单号" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.shippingCode" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="预派单号" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input
                        v-model="form.trucking.truckingCode"
                        :disabled="true"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="司机" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.driverName" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>

              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="车牌号" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.carCode" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
            </div>
            <div class="goods_img_bottom">
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="派单时间" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.createTime" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="派单计费量" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input
                              v-model="form.trucking.truckingFreightTotal"
                              :disabled="true"
                              autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="提货时间" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.shippingLoadTime" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>

              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="提货计费量" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.shippingLoadQty" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="签收时间" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-date-picker
                        v-model="form.signTime"
                        type="datetime"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        class="getgoodsinp_time"
                      ></el-date-picker>
                    </el-form-item>
                  </div>
                </div>
              </el-col>

              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="签收计费量" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.weight" autocomplete="off" placeholder="请输入提货计费量"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="开票金额" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.etcmoney" autocomplete="off" placeholder="请输入开票金额"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>

              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="付司机现金运费" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="driverMoney" autocomplete="off" placeholder="请输入提货计费量"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="签收现场地址" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input
                        v-model="form.unLoadReceipt.receiptImageAddress"
                        autocomplete="off"
                        placeholder="请输入签收现场地址"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>

            </div>
          </el-form>
          <el-divider></el-divider>
           <!-- 签收现场 -->
          <div class="goodsmessage_img">
            <div class="demo-image__preview goodsimg">
              <el-image
                class="avatar"
                v-if="form.unLoadReceipt.receiptImage"
                :src="form.unLoadReceipt.receiptImage"
                :preview-src-list="srcList"
              ></el-image>
              <el-upload
                v-if="form.unLoadReceipt.receiptImage"
                class="avatar-uploader"
                action
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :http-request="uploadFile4"
              >
                <i class="avatar-uploader-icon">重新上传</i>
              </el-upload>

              <div v-else class="imagebg">此处为签收现场照片</div>
            </div>
          </div>
          <!-- 上传图片 -->
           <div class="goodsmessage_img">
              <div class="demo-image__preview goodsimg">
                <el-image
                  class="avatar"
                  v-if="form.loadReceipt.receiptBill"
                  :src="form.loadReceipt.receiptBill"
                  :preview-src-list="srcList"
                ></el-image>
                <el-upload
                  v-if="form.loadReceipt.receiptBill"
                  class="avatar-uploader"
                  action
                  :show-file-list="false"
                  :before-upload="beforeAvatarUpload"
                  :http-request="uploadFile1"
                >
                  <i class="avatar-uploader-icon">重新上传</i>
                </el-upload>
                <div v-else class="imagebg">此处为提货单照片</div>
              </div>
             </div>
            <!-- 上传图片结束 -->
          <!-- 提货现场 -->
          <div class="goodsmessage_img">
            <div class="demo-image__preview goodsimg">
              <el-image
                class="avatar"
                v-if="form.loadReceipt.receiptImage"
                :src="form.loadReceipt.receiptImage"
                :preview-src-list="srcList"
              ></el-image>
              <el-upload
                v-if="form.loadReceipt.receiptImage"
                class="avatar-uploader"
                action
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :http-request="uploadFile2"
              >
                <i class="avatar-uploader-icon">重新上传</i>
              </el-upload>

              <div v-else class="imagebg">此处为提货现场照片</div>
            </div>
          </div>
          
         
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialoggetVisiblebighand = false">取 消</el-button>
            <el-button type="primary" @click="signSubmit()">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <!-- 签收大宗手动结束 -->

      <!-- 签收 非大宗  -->
      <div class="getgoods">
        <el-dialog title="签收:非大宗(系统计算)" :visible.sync="dialoggetVisiblesmall">
          <el-form :model="form" class="getgoodsform">
            <!-- 签收单 -->
         
            <div class="uploadimg">
              <el-image
                class="avatar"
                v-if="form.unLoadReceipt.receiptBill"
                :src="form.unLoadReceipt.receiptBill"
                :preview-src-list="srcList"
              ></el-image>
              <el-upload
                v-if="form.unLoadReceipt.receiptBill"
                class="avatar-uploader"
                action
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :http-request="uploadFile3"
              >
                <i class="avatar-uploader-icon">重新上传</i>
              </el-upload>

              <div v-else class="imagebg">此处为签收单照片</div>
            </div>
         
            <div class="goods_img_right">
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="订单号" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.orderCode" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>

              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="运单号" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.shippingCode" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="预派单号" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input
                        v-model="form.trucking.truckingCode"
                        :disabled="true"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="司机" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.driverName" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>

              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="车牌号" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.carCode" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
            </div>
            <div class="goods_img_bottom">
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="派单时间" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.createTime" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>

              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="派单计费量" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input
                        v-model="form.trucking.truckingFreightTotal"
                        :disabled="true"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>

              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="提货时间" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.shippingLoadTime" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="提货计费量" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input
                              v-model="form.shippingLoadQty"
                              :disabled="true"
                              autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="签收时间" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-date-picker
                              v-model="form.signTime"
                              type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              class="getgoodsinp_time"
                      ></el-date-picker>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="签收计费量" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input
                              v-model="form.weight"
                              autocomplete="off"
                              placeholder="请输入签收计费量"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="签收现场地址" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input
                        v-model="form.unLoadReceipt.receiptImageAddress"
                        autocomplete="off"
                        placeholder="请输入签收现场地址"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
            </div>
          </el-form>
          <el-divider></el-divider>
          <div class="goodsmessage">
            <el-table :data="form.shippingGoodsList" style="width: 100%">
              <el-table-column align="center" prop="id" label="物料ID"></el-table-column>
              <el-table-column align="center" prop="goodsName" label="物料名称" width="180"></el-table-column>
              <el-table-column align="center" prop="createTime" label="派单时间" width="180"></el-table-column>
              <el-table-column align="center" prop="truckingFreightTotal" label="派单量"></el-table-column>
              <el-table-column align="center" prop="shippingLoadTime" label="提货时间" width="180"></el-table-column>
              <el-table-column align="center" prop="shippingLoadQty" label="提货量"></el-table-column>
              <el-table-column align="center"  label="卸货量" width="180"> <!--prop="shippingUnloadQty" -->
                <template slot-scope="scope">
                  <el-input v-model="scope.row.shippingUnloadQty" placeholder="请输入卸货数量"></el-input>
                </template>
              </el-table-column>
            </el-table>
          </div>
           <!-- 签收现场 -->
          <div class="goodsmessage_img">
            <div class="demo-image__preview goodsimg">
              <el-image
                class="avatar"
                v-if="form.unLoadReceipt.receiptImage"
                :src="form.unLoadReceipt.receiptImage"
                :preview-src-list="srcList"
              ></el-image>
              <el-upload
                v-if="form.unLoadReceipt.receiptImage"
                class="avatar-uploader"
                action
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :http-request="uploadFile4"
              >
                <i class="avatar-uploader-icon">重新上传</i>
              </el-upload>

              <div v-else class="imagebg">此处为签收现场照片</div>
            </div>
          </div>
           <!-- 上传图片 -->
             <div class="goodsmessage_img">
              <div class="demo-image__preview goodsimg">
                <el-image
                  class="avatar"
                  v-if="form.loadReceipt.receiptBill"
                  :src="form.loadReceipt.receiptBill"
                  :preview-src-list="srcList"
                ></el-image>
                <el-upload
                  v-if="form.loadReceipt.receiptBill"
                  class="avatar-uploader"
                  action
                  :show-file-list="false"
                  :before-upload="beforeAvatarUpload"
                  :http-request="uploadFile1"
                >
                  <i class="avatar-uploader-icon">重新上传</i>
                </el-upload>
                <div v-else class="imagebg">此处为提货单照片</div>
              </div>
             </div>
            <!-- 上传图片结束 -->
          <!-- 提货现场 -->
          <div class="goodsmessage_img">
            <div class="demo-image__preview goodsimg">
              <el-image
                class="avatar"
                v-if="form.loadReceipt.receiptImage"
                :src="form.loadReceipt.receiptImage"
                :preview-src-list="srcList"
              ></el-image>
              <el-upload
                v-if="form.loadReceipt.receiptImage"
                class="avatar-uploader"
                action
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :http-request="uploadFile2"
              >
                <i class="avatar-uploader-icon">重新上传</i>
              </el-upload>

              <div v-else class="imagebg">此处为提货现场照片</div>
            </div>
          </div>
         
         
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialoggetVisiblesmall = false">取 消</el-button>
            <el-button type="primary" @click="signSubmit()">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <!-- 签收非大宗结束  -->
      <!-- 签收非大宗手动 -->
      <div class="getgoods">
        <el-dialog title="签收:非大宗(手动计算)" :visible.sync="dialoggetVisiblesmallhand">
          <el-form :model="form" class="getgoodsform">
            <!-- 签收单 -->
          
              <div class="uploadimg">
                <el-image
                  class="avatar"
                  v-if="form.unLoadReceipt.receiptBill"
                  :src="form.unLoadReceipt.receiptBill"
                  :preview-src-list="srcList"
                ></el-image>
                <el-upload
                  v-if="form.unLoadReceipt.receiptBill"
                  class="avatar-uploader"
                  action
                  :show-file-list="false"
                  :before-upload="beforeAvatarUpload"
                  :http-request="uploadFile3"
                >
                  <i class="avatar-uploader-icon">重新上传</i>
                </el-upload>

                <div v-else class="imagebg">此处为签收单照片</div>
            </div>
         
            <div class="goods_img_right">
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="订单号" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.orderCode" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>

              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="运单号" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.shippingCode" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="预派单号" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input
                        v-model="form.trucking.truckingCode"
                        :disabled="true"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="司机" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.driverName" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>

              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="车牌号" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.carCode" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
            </div>
            <div class="goods_img_bottom">
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="派单时间" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.createTime" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>

              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="派单计费量" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input
                        v-model="form.trucking.truckingFreightTotal"
                        :disabled="true"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="提货时间" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.shippingLoadTime" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="提货计费量" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input
                              v-model="form.trucking.truckingFreightTotal"
                              :disabled="true"
                              autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="签收时间" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-date-picker
                              v-model="form.signTime"
                              type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              class="getgoodsinp_time"
                      ></el-date-picker>
                    </el-form-item>
                  </div>
                </div>
              </el-col>

              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="签收计费量" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input
                              v-model="form.weight"
                              autocomplete="off"
                              placeholder="请输入签收计费量"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>

              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="开票金额" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.etcmoney" autocomplete="off" placeholder="请输入开票金额"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>

              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="付司机现金运费" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="driverMoney" autocomplete="off" placeholder="请输入提货计费量"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="签收现场地址" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input
                              v-model="form.unLoadReceipt.receiptImageAddress"
                              autocomplete="off"
                              placeholder="请输入签收现场地址"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
            </div>
          </el-form>
          <el-divider></el-divider>
          <div class="goodsmessage">
            <el-table :data="form.shippingGoodsList" style="width: 100%">
              <el-table-column align="center" prop="id" label="物料ID"></el-table-column>
              <el-table-column align="center" prop="goodsName" label="物料名称" width="180"></el-table-column>
              <el-table-column align="center" prop="createTime" label="派单时间" width="180"></el-table-column>
              <el-table-column align="center" prop="truckingFreightTotal" label="派单量"></el-table-column>
              <el-table-column align="center" prop="shippingLoadTime" label="提货时间" width="180"></el-table-column>
              <el-table-column align="center" prop="shippingLoadQty" label="提货量"></el-table-column>
             <el-table-column align="center"  label="卸货量" width="180"> <!--prop="shippingUnloadQty" -->
                <template slot-scope="scope">
                  <el-input v-model="scope.row.shippingUnloadQty" placeholder="请输入卸货数量"></el-input>
                </template>
              </el-table-column>
            </el-table>
          </div>
         
          
          <!-- 签收现场 -->
          <div class="goodsmessage_img">
            <div class="demo-image__preview goodsimg">
              <el-image
                class="avatar"
                v-if="form.unLoadReceipt.receiptImage"
                :src="form.unLoadReceipt.receiptImage"
                :preview-src-list="srcList"
              ></el-image>
              <el-upload
                v-if="form.unLoadReceipt.receiptImage"
                class="avatar-uploader"
                action
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :http-request="uploadFile4"
              >
                <i class="avatar-uploader-icon">重新上传</i>
              </el-upload>

              <div v-else class="imagebg">此处为签收现场照片</div>
            </div>
          </div>
           <!-- 上传图片 -->
            <div class="goodsmessage_img">
              <div class="demo-image__preview goodsimg">
                <el-image
                  class="avatar"
                  v-if="form.loadReceipt.receiptBill"
                  :src="form.loadReceipt.receiptBill"
                  :preview-src-list="srcList"
                ></el-image>
                <el-upload
                  v-if="form.loadReceipt.receiptBill"
                  class="avatar-uploader"
                  action
                  :show-file-list="false"
                  :before-upload="beforeAvatarUpload"
                  :http-request="uploadFile1"
                >
                  <i class="avatar-uploader-icon">重新上传</i>
                </el-upload>
                <div v-else class="imagebg">此处为提货单照片</div>
              </div>
             </div>
            <!-- 上传图片结束 -->
             <!-- 提货现场 -->
          <div class="goodsmessage_img">
            <div class="demo-image__preview goodsimg">
              <el-image
                class="avatar"
                v-if="form.loadReceipt.receiptImage"
                :src="form.loadReceipt.receiptImage"
                :preview-src-list="srcList"
              ></el-image>
              <el-upload
                v-if="form.loadReceipt.receiptImage"
                class="avatar-uploader"
                action
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :http-request="uploadFile2"
              >
                <i class="avatar-uploader-icon">重新上传</i>
              </el-upload>

              <div v-else class="imagebg">此处为提货现场照片</div>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialoggetVisiblesmallhand = false">取 消</el-button>
            <el-button type="primary" @click="signSubmit()">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <!-- 签收非大宗手动结束 -->
      <!-- 签收1弹窗结束 -->

      <!-- 查看详情弹窗 -->
      <div class="getgoods">
        <el-dialog title="查看详情" :visible.sync="dialogseeVisible">
          <el-form :model="form" class="getgoodsform">
            <div class="goods_img_bottom">
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="订单号" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.orderCode" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="司机" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.driverName" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="运单号" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.shippingCode" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="车牌号" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.carCode" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="预派单号" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input
                        v-model="form.trucking.truckingCode"
                        :disabled="true"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="亏涨吨扣款" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.kuizhangkoukuan" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
            </div>
            <el-divider></el-divider>
            <div class="goods_img_bottom">
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="派单时间" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.createTime" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="派单计费量" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input
                        v-model="form.trucking.truckingFreightTotal"
                        :disabled="true"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="提货时间" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.shippingLoadTime" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="提货计费量" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.shippingLoadQty" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="签收时间" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.signTime" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <div class="grid-content bg-purple">
                    <el-form-item label="签收计费量" :label-width="formLabelWidth" class="getgoodsinp">
                      <el-input v-model="form.weight" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
            </div>
          </el-form>
          <el-divider v-if="see_information==2?true:''"></el-divider>
          <el-table
            :data="tableData"
            style="width: 100%"
            height="190px"
            :header-cell-style="{background:'#E9F0FF',color:'#606266'}"
            v-if="see_information==2?true:''"
          >
            <el-table-column prop="goodsName" label="物料名称" width="130"></el-table-column>
            <el-table-column prop="createTime" label="派单时间" width="130"></el-table-column>
            <el-table-column prop="truckingFreightTotal" label="派车计费量" width="130"></el-table-column>
            <el-table-column prop="shippingLoadTime" label="提货时间" width="130"></el-table-column>
            <el-table-column prop="shippingLoadQty" label="提货计费量" width="130"></el-table-column>
            <el-table-column prop="shippingUnloadTime" label="签收时间" width="130"></el-table-column>
            <el-table-column prop="shippingSettlementQty" label="签收计费量" width="130"></el-table-column>
          </el-table>

          <div class="goodsmessage_img add_goods_img">
            <div class="demo-image__preview goodsimg">
              <el-image :src="form.loadReceipt.receiptBill" :preview-src-list="srcList"></el-image>
            </div>
            <div class="demo-image__preview goodsimg">
              <el-image :src="form.loadReceipt.receiptImage" :preview-src-list="srcList"></el-image>
            </div>
            <div class="demo-image__preview goodsimg">
              <el-image :src="form.unLoadReceipt.receiptBill" :preview-src-list="srcList"></el-image>
            </div>
            <div class="demo-image__preview goodsimg">
              <el-image :src="form.unLoadReceipt.receiptImage" :preview-src-list="srcList"></el-image>
            </div>
          </div>
          <el-divider v-if="see_information==2?true:''"></el-divider>
          <el-table
            :data="chasmall"
            style="width: 100%"
            :header-cell-style="{background:'#E9F0FF',color:'#606266'}"
            v-if="see_information==2?true:''"
          >
            <el-table-column prop="priceOverdueDeduct" label="晚到扣款" width="205"></el-table-column>
            <el-table-column prop="priceDamageDeduct" label="货损扣款" width="205"></el-table-column>
            <el-table-column prop="priceOtherDeduct" label="其他扣款" width="205"></el-table-column>
          </el-table>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogseeVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogseeVisible = false">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <!-- 查看详情弹窗结束 -->
    </div>
  </div>
</template>
<script>
import tabComp from "../../../compontes/tabComp";
import singularTable from "../../../compontes/singularTable";
import { MessageBox } from "element-ui";
import QS from "qs";
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Pagination from "../../../compontes/pagtion";
export default {
  name: "wayBill",
  //import引入的组件需要注入到对象中才能使用
  components: {
    tabComp,
    singularTable,
    Pagination
  },
  data() {
    return {
      //提货时选择大宗非大宗弹框
      centerDialogVisible: false,
      //搜索数据字段
      searchData: {
        driverName: "",
        driverMobile: "",
        carCode: ""
      },
      shippingArrayStatus: [1,2], // 运单状态
      tableData: [],
      setAuditedData: [],
      formdata: "",
      shippingId: "",
      shippingCalculateWay: "",
      shippingSettlementClass: "",
      idIndex: "", //异常上报判断哪一个tab
      readonly: true, //输入框只读
      list: null, //请求回来填充表格的数据
      total: 0, //数据总条数
      page: 1, //默认显示第1页
      limit: 10, //默认一次显示10条数据
      url: " ", //"https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
      srcList: [], //查看详情图片

      //异常上报弹框
      dialogerrVisible: false,
      //查看详情
      dialogseeVisible: false,
      //提货大宗弹窗控制
      dialogFormVisiblebig: false,
      //提货非大宗弹窗控制
      dialogFormVisiblesmall: false,
      //提货为大宗还是非大宗  1大宗  2非大宗
      tihuobigAndSmall: null,
      //物料信息弹窗
      dialogMessageVisible: false,
      //签收为大宗1 非大宗1
      qianshoubigAddsmall: null,
      //签收弹框  大宗 1
      dialoggetVisiblebig: false,
      //签收非大宗弹框2
      dialoggetVisiblesmall: false,
      //签收大宗手动
      dialoggetVisiblebighand: false,
      //签收非大宗手动
      dialoggetVisiblesmallhand: false,
      //签收计算方式  1系统  2手动
      jifeitype: null,
      //签收业务类型 1大宗 2非大宗
      qianshoutype: null,
      //查看详情选择大宗非大宗
      seeinformation: false,
      //查看详情大宗  非大宗弹窗
      see_information: null,
      //查看详情获取来的数据
      seeinformationdata: null,
      form: {
        shippingId: "", //运单ID
        shippingCode: "", //运单号
        orderCode: "", //订单号
        driverName: "", //司机/承运人
        carCode: "", //车牌号
        createTime: "", //派单时间（运单创建时间）
        signTime: "", //签收时间
        weight: "", //签收计费量
        etcmoney: "", //签收开票金额
        qianshouemail: "", //签收现场地址
        shippingLoadTime: "", //提货时间
        shippingLoadQty: "", //提货量（提货计费量）

        errMessage: "", //异常上报原因
        shippingGoodsList: [], //物料列表
        shippingCalculateWay: "", //异常上报里面的计费分类
        qianshoures: {}, //用来获取签收回显数据的res.data.data
        //亏涨吨扣款
        kuizhangkoukuan: null,
        //派单
        trucking: {
          truckingCode: "", //预派单号
          truckingFreightUnit: "", // 运输单位（派单计费量单位）
          truckingFreightTotal: "" //运输量（派单计费量）
        },
        orderProject: {
          projectSettlementClass: "" //计费分类（1大宗，2非大宗）
        },
        //提货单图片
        loadReceipt: {
            receiptBill: "", //提货单照片
            receiptBillZip: "", //卸货单图片压缩
            receiptImage: "", //提货现场图片
            receiptImageZip: "", //提货现场图片压缩
            receiptImageAddress: "" //提货单照片地址
        },

        //卸货/签收
        unLoadReceipt: {
            receiptBill: " ", //卸货单图片
            receiptBillZip: "", //卸货单图片压缩
            receiptImage: " ", //卸货现场图片
            receiptImageZip: " ", //卸货现场图片压缩
            receiptImageAddress: "" //卸货单照片地址
        },
        //提货现场地址
        xianchang: {
          email: null //提货现场详细地址
        },
        date2: "",
        delivery: false,
        shippingFreightTotal: "",
        disablea: false //控制表单disable
      },
      formLabelWidth: "120px",
      // 表头数据
      //待提货
      auditedName: [
        {
          tabTh: "装货时间",
          tabItem: "shippingLoadTime",
          isShow: true,
          sortNum: 1
        },
        {
          tabTh: "卸货时间",
          tabItem: "shippingUnloadTime",
          isShow: true,
          sortNum: 2
        },
        { tabTh: "订单号", tabItem: "orderCode", isShow: true, sortNum: 3 },
        { tabTh: "运单号", tabItem: "shippingCode", isShow: true, sortNum: 40 },
        {
          tabTh: "运单状态",
          tabItem: "shippingStatusName",
          isShow: true,
          sortNum: 4
        },
        {
          tabTh: "运单单价",
          tabItem: "truckingPrice.priceSettlementUnitprice",
          isShow: true,
          sortNum: 5
        },
        { tabTh: "承运人", tabItem: "driverName", isShow: true, sortNum: 6 },
        { tabTh: "车牌号", tabItem: "carCode", isShow: true, sortNum: 7 },
        {
          tabTh: "承运人电话",
          tabItem: "driverMobile",
          isShow: true,
          sortNum: 8
        },
        {
          tabTh: "派单日期",
          tabItem: "truckingCreateTime",
          isShow: true,
          sortNum: 9
        },
        { tabTh: "接单日期", tabItem: "createTime", isShow: true, sortNum: 10 },
        {
          tabTh: "发货单位",
          tabItem: "truckingLoadAddress.addressCompany",
          isShow: true,
          sortNum: 11
        },
        {
          tabTh: "发货人",
          tabItem: "truckingLoadAddress.addressContacter",
          isShow: true,
          sortNum: 12
        },
        {
          tabTh: "发货地址",
          tabItem: "truckingLoadAddress.addressDetail",
          isShow: true,
          sortNum: 13
        },
        {
          tabTh: "发货省",
          tabItem: "truckingLoadAddress.addressArea.provinceName",
          isShow: true,
          sortNum: 14
        },
        {
          tabTh: "发货市",
          tabItem: "truckingLoadAddress.addressArea.cityName",
          isShow: true,
          sortNum: 15
        },
        {
          tabTh: "发货区",
          tabItem: "truckingLoadAddress.addressArea.areaName",
          isShow: true,
          sortNum: 16
        },
        {
          tabTh: "收货单位",
          tabItem: "truckingUnLoadAddress.addressCompany",
          isShow: true,
          sortNum: 17
        },
        {
          tabTh: "收货人",
          tabItem: "truckingUnLoadAddress.addressContacter",
          isShow: true,
          sortNum: 18
        },
        {
          tabTh: "收货地址",
          tabItem: "truckingUnLoadAddress.addressDetail",
          isShow: true,
          sortNum: 19
        },
        {
          tabTh: "收货省",
          tabItem: "truckingUnLoadAddress.addressArea.provinceName",
          isShow: true,
          sortNum: 20
        },
        {
          tabTh: "收货市",
          tabItem: "truckingUnLoadAddress.addressArea.cityName",
          isShow: true,
          sortNum: 21
        },
        {
          tabTh: "收货区",
          tabItem: "truckingUnLoadAddress.addressArea.areaName",
          isShow: true,
          sortNum: 22
        },
        {
          tabTh: "亏吨计量方式",
          tabItem: "truckingPrice.priceDeficitWay",
          isShow: true,
          sortNum: 23
        },
        {
          tabTh: "允许亏吨量",
          tabItem: "truckingPrice.priceDeficitValue",
          isShow: true,
          sortNum: 24
        },
        {
          tabTh: "亏吨扣费单价",
          tabItem: "truckingPrice.priceDeficitUnitprice",
          isShow: true,
          sortNum: 25
        },
        {
          tabTh: "涨吨计量方式",
          tabItem: "truckingPrice.priceRiseWay",
          isShow: true,
          sortNum: 26
        },
        {
          tabTh: "允许涨吨量",
          tabItem: "truckingPrice.priceRiseValue",
          isShow: true,
          sortNum: 27
        },
        {
          tabTh: "涨吨扣费单价",
          tabItem: "truckingPrice.priceRiseUnitprice",
          isShow: true,
          sortNum: 28
        },
        {
          tabTh: "货损扣款",
          tabItem: "truckingPrice.priceDamageDeduct",
          isShow: true,
          sortNum: 29
        },
        {
          tabTh: "晚到扣款",
          tabItem: "truckingPrice.priceOverdueDeduct",
          isShow: true,
          sortNum: 30
        },
        {
          tabTh: "其他扣款",
          tabItem: "truckingPrice.priceOtherDeduct",
          isShow: true,
          sortNum: 31
        },
        {
          tabTh: "是否购买保险",
          tabItem: "shippingPremiumFlag",
          isShow: true,
          sortNum: 32
        },
        {
          tabTh: "保险金额",
          tabItem: "shippingPremiumAmt",
          isShow: true,
          sortNum: 33
        },
        {
          tabTh: "保价金额",
          tabItem: "shippingInsuredAmt",
          isShow: true,
          sortNum: 34
        },
        {
          tabTh: "管理费",
          tabItem: "shippingManagementAmt",
          isShow: true,
          sortNum: 35
        },
        {
          tabTh: "油气卡预付",
          tabItem: "shippingAdvanceCard",
          isShow: true,
          sortNum: 36
        },
        {
          tabTh: "现金预付",
          tabItem: "shippingAdvanceAmt",
          isShow: true,
          sortNum: 37
        },
        {
          tabTh: "其他费用项名称",
          tabItem: "shippingOtherAmtDesc",
          isShow: true,
          sortNum: 38
        },
        {
          tabTh: "费用金额",
          tabItem: "shippingOtherAmt",
          isShow: true,
          sortNum: 39
        }
      ],
      tabIndex: 0, // 选项卡索引
      value1: "",
      value2: "",
      input: "",
      options: [
        {
          value: "1",
          label: "项目编号"
        },
        {
          value: "2",
          label: "项目名称"
        },
        {
          value: "3",
          label: "客户名称"
        }
      ],
      chasmall: [], //查看详情非大宗扣费统计
      errMessage: null, //异常上报
      driverMoney: null, //司机付款
      value: "",
      activeName: "first",
      input2: "",
      indexType: 1,
      file1: '', //提货单图片
      file2: '', //提货现场图片
      file3:'',//签收单图片
      file4:'',//签收现场图片

    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //重置
    resetData(searchData) {
      this.$nextTick(() => {
        this.$refs[searchData].resetFields();
        this.page = 1;
        this.limit = 10;
        this.getList();
      });
    },
    //获取表格数据
    getList() {
      var param = new URLSearchParams();
      param.append("driverName", this.searchData.driverName);
      param.append("driverMobile", this.searchData.driverMobile);
      param.append("carCode", this.searchData.carCode);
      param.append("page", this.page);
      param.append("rows", this.limit);
      param.append("shippingArrayStatus", this.shippingArrayStatus);
      this.$http
        .post(this.$api.Shipping.getShippingList, param, true)
        .then(res => {
          // console.log(res.data.data,5555)
          const _data = res.data.data.list;
          // console.log(_data,'_data')
          _data.forEach((item, index, arr) => {
            item.shippingPremiumFlag =
              item.shippingPremiumFlag == 1 ? "是" : "否";
          });
          //表格数据
          this.list = _data;
          this.total = res.data.data.total;
          this.$store.commit("getTableData", this.list);
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: "失败（≧?≦）",
            type: "error"
          });
        });
    },
    //根据条件查询列表
    doSearch() {
      this.getList();
    },

    //提货单照片
    uploadFile1(file) {
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
            //提货
            that.form.loadReceipt.receiptBill =
              "http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
              res.data.data.localUrl;
              localStorage.setItem("file1",res.data.data.localUrl)
              this.file1=localStorage.getItem("file1")
              console.log(this.file1,111)
              that.form.loadReceipt.receiptBillZip = res.data.data.humbnailUrl;
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
    //提货现场照片
    uploadFile2(file) {
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
            //提货现场
            that.form.loadReceipt.receiptImage =
              "http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
              res.data.data.localUrl;
              localStorage.setItem("file2",res.data.data.localUrl)
              this.file2=localStorage.getItem("file2")
              console.log(this.file2,222)
              that.form.loadReceipt.receiptImageZip = res.data.data.humbnailUrl;
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
    //签收单照片
    uploadFile3(file) {
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
            //签收单现场
            that.form.unLoadReceipt.receiptBill =
              "http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
              res.data.data.localUrl;
              localStorage.setItem("file3",res.data.data.localUrl)
              this.file3=localStorage.getItem("file3")
              console.log(this.file3,333)
              that.form.unLoadReceipt.receiptBillZip = res.data.data.humbnailUrl;
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
    //签收现场照片
    uploadFile4(file) {
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

            //签收现场
            that.form.unLoadReceipt.receiptImage =
              "http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
              res.data.data.localUrl;
               localStorage.setItem("file4",res.data.data.localUrl)
              this.file4=localStorage.getItem("file4")
              console.log(this.file4,444)
              that.form.unLoadReceipt.receiptImageZip = res.data.data.humbnailUrl;
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
    //限制图片大小
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    handleClick(tab, event) {
      // console.log(tab.index,555)
      this.page = 1;
      this.limit = 10;
      //0待提货 1代签收 2已提货签收 3全部
      switch (tab.index) {
        
        case "0": {
          //待提货2
          this.shippingArrayStatus = [1,2];
          this.setAuditedData = this.auditedName;
          this.indexType = 1;
          break;
        }
        case "1": {
          //代签收3
          this.shippingArrayStatus = [3];
          this.setAuditedData = this.auditedName;
          this.indexType = 2;
          break;
        }
        case "2": {
          //已提货签收4
          this.shippingArrayStatus = [4];
          this.setAuditedData = this.auditedName;
          this.indexType = 3;
          break;
        }
        case "3": {
          //全部不用传
          this.shippingArrayStatus = [];
          this.setAuditedData = this.auditedName;
          this.indexType = 4;
          break;
        }
      }
      this.getList();
    },
    //提货
    waybillGetgoods() {
      let ids = this.$store.state.selectData;
      if (ids.length > 1 || ids.length == 0) {
        this.$message({
          showClose: true,
          message: "请选择一个运单进行提货！",
          type: "error"
        });
        return false;
      }
      this.shippingId = ids[0].shippingId;
      //提货时选择大宗非大宗弹框
      //this.centerDialogVisible = true;

      //1大宗 2非大宗
      var projectSettlementClass = ids[0].orderProject.projectSettlementClass;
      if(projectSettlementClass == 1)
      {
          this.tihuobig(this.shippingId);
      }else{
          this.tihuosmall(this.shippingId);
      }



      //1系统计算 2手工输入
      ///var projectCalculateWay = this.$store.state.selectData[0].orderProject.projectCalculateWay;



    },
    //提货大宗  回显
    tihuobig(shippingId) {
      //提货时选择大宗/非大宗
      //this.centerDialogVisible = false;
      //提货为大宗 赋值1
      this.tihuobigAndSmall = 1;
      //提货大宗弹框
      this.dialogFormVisiblebig = true;
      //获得将要提货的id
      var shippingId = this.shippingId;
      this.$http
        .get(
          this.$api.Shipping.getShippingInfo + "?shippingId=" + shippingId,
          true
        )
        .then(res => {
          // console.log(res.data.data, "获取的大宗数据");
          if (res.data.code == 1) {
            let info = res.data.data;
            //订单号
            this.form.orderCode = info.orderCode;
            //运单ID
            this.form.shippingCode = info.shippingCode;
            //车牌号
            this.form.carCode = info.carCode;
            //司机
            this.form.driverName = info.driverName;
            //派单时间
            this.form.createTime = info.createTime;
            //预派单号
            this.form.trucking.truckingCode = info.trucking.truckingCode;
            //派单计费量
            this.form.trucking.truckingFreightTotal =
              info.trucking.truckingFreightTotal;
            //计费分类
            this.form.orderProject.projectSettlementClass = 1;
            //提货时间
            this.form.shippingLoadTime = info.shippingLoadTime;
            //提货计费量
            this.form.shippingLoadQty = info.shippingLoadQty;
           
            // 提货单照片
            this.form.loadReceipt.receiptBill = info.loadReceipt==null
              ?"http://redox-test01.oss-cn-qingdao.aliyuncs.com"
              :"http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
                info.loadReceipt.receiptBill;

            // 提货现场照片
            this.form.loadReceipt.receiptImage = info.loadReceipt==null
              ? "http://redox-test01.oss-cn-qingdao.aliyuncs.com"
              : "http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
                info.loadReceipt.receiptImage;
                 this.srcList=[]
                //  console.log(info.loadReceipt.receiptImage,info.loadReceipt.receiptBill)
             this.srcList.push(
               info.loadReceipt==null?'http://redox-test01.oss-cn-qingdao.aliyuncs.com'+localStorage.getItem("file1"):"http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
                info.loadReceipt.receiptBill
            );
            this.srcList.push(
              info.loadReceipt==null?'http://redox-test01.oss-cn-qingdao.aliyuncs.com'+localStorage.getItem("file2"):"http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
                info.loadReceipt.receiptImage
            );
          }
        });
    },
    //提货非大宗    回显
    tihuosmall(shippingId) {
      //   提货时选择大宗/非大宗
      //this.centerDialogVisible = false;
      //   提货为非大宗 赋值2
      this.tihuobigAndSmall = 2;
      //   提货非大宗弹框
      this.dialogFormVisiblesmall = true;
      //获得将要提货的id
      var shippingId = this.shippingId;

      this.$http
        .get(
          this.$api.Shipping.getShippingInfo + "?shippingId=" + shippingId,
          true
        )
        .then(res => {
          // console.log(res.data.data, "获取的非大宗数据");
          if (res.data.code == 1) {
            let info = res.data.data;
            //订单号
            this.form.orderCode = info.orderCode;
            //运单ID
            this.form.shippingCode = info.shippingCode;
            //车牌号
            this.form.carCode = info.carCode;
            //司机
            this.form.driverName = info.driverName;
            //派单时间
            this.form.createTime = info.createTime;
            //预派单号
            this.form.trucking.truckingCode = info.trucking.truckingCode;

            //派单计费量
            this.form.trucking.truckingFreightTotal =
              info.trucking.truckingFreightTotal;
            //计费分类
            this.form.orderProject.projectSettlementClass = 1;
            //提货时间
            this.form.shippingLoadTime = info.shippingLoadTime;
            //提货计费量
            this.form.shippingLoadQty = info.shippingLoadQty;
            
            // 提货单照片
            this.form.loadReceipt.receiptBill = info.loadReceipt==null
              ? "http://redox-test01.oss-cn-qingdao.aliyuncs.com"
              : "http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
                info.loadReceipt.receiptBill;

            // 提货现场照片
            this.form.loadReceipt.receiptImage = info.loadReceipt==null
              ?"http://redox-test01.oss-cn-qingdao.aliyuncs.com" 
              : "http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
                info.loadReceipt.receiptImage;
                this.srcList=[]
                // this.uploadFile1()
             this.srcList.push(
               info.loadReceipt==null?'http://redox-test01.oss-cn-qingdao.aliyuncs.com'+localStorage.getItem("file1"): "http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
                info.loadReceipt.receiptBill
          );
          // console.log(this.form.loadReceipt.receiptBill,this.form.loadReceipt.receiptImage)
          this.srcList.push(
            info.loadReceipt==null?'http://redox-test01.oss-cn-qingdao.aliyuncs.com'+localStorage.getItem("file2"):"http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
                info.loadReceipt.receiptImage
          );
            //物料信息
            var list = {};
              this.form.shippingGoodsList = [];
            info.shippingGoodsList.map(item => {
              list.goodsName = item.goodsName; //物料名称
              list.goodsSettlementTotal = item.goodsSettlementTotal; //派车计费量
              list.createTime = info.createTime; //接单时间
              this.form.shippingGoodsList.push(list);
              list = {};
            });
            // console.log(info.loadReceipt.receiptBill,info.loadReceipt.receiptImage)
          }
        });
    },
    //提货提交
    getgoods(data) {
      if (this.form.loadReceipt.receiptImageAddress != null) {
        if (data == 1) {
          //大宗
          let formData1 = new URLSearchParams();
          console.log(this.file1,this.file2,11111,2222)
          //提货单图片
          formData1.append("loadReceipt.receiptBill", this.file1||localStorage.getItem("file1"));
          //提货单压缩单图片
          formData1.append("loadReceipt.receiptBillZip", this.file1||localStorage.getItem("file1"));
          //现场装货地址
          formData1.append("loadReceipt.receiptImageAddress", this.form.loadReceipt.receiptImageAddress);
          //现场装货照片
          formData1.append("loadReceipt.receiptImage", this.file2||localStorage.getItem("file2"));
          //现场装货压缩照片
          formData1.append("loadReceipt.receiptImageZip", this.file2||localStorage.getItem("file2"));
          //运单ID
          formData1.append("shippingId", this.shippingId);
          //提货类型类型  大宗1 非大宗2Zip
          formData1.append("orderProject.projectSettlementClass", this.tihuobigAndSmall);
          //提货时间
          formData1.append("shippingLoadTime", this.form.shippingLoadTime);
          //提货计费量
          formData1.append("shippingLoadQty", this.form.shippingLoadQty);

          this.$http
            .post(this.$api.Shipping.loading, formData1, true)
            .then(res => {
              if (res.data.code == 1) {
                this.$message({showClose: true, message: res.data.message, type: "success"});
                this.dialogFormVisiblebig = false;
                this.getList();
              } else {
                  this.$message({showClose: true, message: res.data.message, type: "error"});
              }
              // console.log(res, "提货提交");
            });
        } else {
          //非大宗
          let formData1 = new URLSearchParams();
          console.log(this.file1,this.file2,111111,222222)
          //提货单图片
          formData1.append("loadReceipt.receiptBill", this.file1||localStorage.getItem("file1"));
          //提货单压缩单图片
          formData1.append("loadReceipt.receiptBillZip", this.file1||localStorage.getItem("file1"));
          //现场装货地址
          formData1.append("loadReceipt.receiptImageAddress", this.form.loadReceipt.receiptImageAddress);
          //现场装货照片
          formData1.append("loadReceipt.receiptImage",this.file2||localStorage.getItem("file2") );
          //现场装货压缩照片
          formData1.append("loadReceipt.receiptImageZip",this.file2||localStorage.getItem("file2"));
          //运单ID
          formData1.append("shippingId", this.shippingId);
          //提货类型类型  大宗1 非大宗2
          formData1.append("orderProject.projectSettlementClass", this.tihuobigAndSmall);
          //提货时间
          formData1.append("shippingLoadTime", this.form.shippingLoadTime);
          //提货计费量
          formData1.append("shippingLoadQty", this.form.shippingLoadQty);

          this.$http
            .post(this.$api.Shipping.loading, formData1, true)
            .then(res => {
              if (res.data.code == 1) {
                this.$message({
                  showClose: true,
                  message: res.data.message,
                  type: "success"
                });
                this.dialogFormVisiblesmall = false;
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
        this.$message({
          showClose: true,
          message: "请填写现场装货地址",
          type: "error"
        });
      }
    },
    //签收
    signGetgoods() {
      let ids = this.$store.state.selectData;
      if (ids.length > 1 || ids.length == 0) {
        this.$message({
          showClose: true,
          message: "请选择一个项目进行签收",
          type: "error"
        });
        return false;
      }
        this.shippingId = ids[0].shippingId;
        //1大宗 2非大宗
        this.projectSettlementClass = ids[0].orderProject.projectSettlementClass;
        //1系统计算 2手工输入
        this.projectCalculateWay = ids[0].orderProject.projectCalculateWay;
        if(this.projectSettlementClass == 1)
        {
            if(this.projectCalculateWay == 1)
                this.qianshoubig();
            else
                this.qianshoubighand();
        }else{
            if(this.projectCalculateWay == 1)
                this.qianshousmall();
            else
                this.qianshousmallhand();
        }

    },
    //签收大宗
    qianshoubig() {
      this.qianshoubigAddsmall = false;
      this.dialoggetVisiblebig = true;
      this.jifeitype = 1;
      this.qianshoutype = 1;
      // this.shippingId = 1;
      this.$http
        .get(
          this.$api.Shipping.getShippingInfo,
          {
            params: {"shippingId": this.shippingId}
          },
          true
        )
        .then(res => {
          // console.log(res, "签收回显是返回的数据");
          if (res.data.code == 1) {
            this.qianshoures = res.data.data;
            //订单号
            this.form.orderCode = this.qianshoures.orderCode;
            //运单号
            this.form.shippingCode = this.qianshoures.shippingCode;
            //预派单号
            this.form.trucking.truckingCode = this.qianshoures.trucking.truckingCode;
            //司机
            this.form.driverName = this.qianshoures.driverName;
            //车牌号
            this.form.carCode = this.qianshoures.carCode;
            //派单时间
            this.form.createTime = this.qianshoures.trucking.createTime;
            //派单计费量
            this.form.trucking.truckingFreightTotal = this.qianshoures.trucking.truckingFreightTotal;
            //提货时间
            this.form.shippingLoadTime = this.qianshoures.shippingLoadTime;
            //提货计费量
            this.form.shippingLoadQty = this.qianshoures.shippingLoadQty;
           
            // 提货单照片
            this.form.loadReceipt.receiptBill =this.qianshoures.loadReceipt==null?
            "http://redox-test01.oss-cn-qingdao.aliyuncs.com":
            "http://redox-test01.oss-cn-qingdao.aliyuncs.com"+
              this.qianshoures.loadReceipt.receiptBill;
            // 提货单现场
            this.form.loadReceipt.receiptImage =this.qianshoures.loadReceipt==null?
            "http://redox-test01.oss-cn-qingdao.aliyuncs.com":
            "http://redox-test01.oss-cn-qingdao.aliyuncs.com"+
                this.qianshoures.loadReceipt.receiptImage
              // : "";
            // 签收单照片
            this.form.unLoadReceipt.receiptBill = this.qianshoures.unloadReceipt
              ==null
              ?"http://redox-test01.oss-cn-qingdao.aliyuncs.com"
              :  "http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
                this.qianshoures.unloadReceipt.receiptBill;
            //签收单现场
            this.form.unLoadReceipt.receiptImage = this.qianshoures
              .unloadReceipt==null
              ? "http://redox-test01.oss-cn-qingdao.aliyuncs.com" 
              : "http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
                this.qianshoures.unloadReceipt.receiptBill;
              this.srcList=[]
              this.srcList.push(this.qianshoures.loadReceipt==null?'':
            "http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
              this.qianshoures.loadReceipt.receiptBill
              );
              this.srcList.push(this.qianshoures.loadReceipt==null?'':
                "http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
                  this.qianshoures.loadReceipt.receiptImage
              );
              this.srcList.push(this.qianshoures.unloadReceipt==null?'':
                "http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
                  this.qianshoures.unloadReceipt.receiptBill
              );
              this.srcList.push(this.qianshoures.unloadReceipt==null?'':
                "http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
                  this.qianshoures.unloadReceipt.receiptImage
              );
              //签收时间
              this.form.signTime = this.qianshoures.shippingUnloadTime;
              //签收计费量
              this.form.weight = this.qianshoures.shippingUnloadQty;
          } else {
            this.$message({
              showClose: true,
              message: res.data.message,
              type: "error"
            });
          }
        });
    },
    //签收大宗（手动）
    qianshoubighand() {
      this.qianshoubigAddsmall = false;
      this.dialoggetVisiblebighand = true;
      this.jifeitype = 2;
      this.qianshoutype = 1;
      // this.shippingId = 1;
      this.$http
        .get(
          this.$api.Shipping.getShippingInfo,
          {
            params: {
              "shippingId": this.shippingId
            }
          },
          true
        )
        .then(res => {
          // console.log(res, "签收大宗手动回显是返回的数据");
          if (res.data.code == 1) {
            this.qianshoures = res.data.data;
            //订单号
            this.form.orderCode = this.qianshoures.orderCode;
            //运单号
            this.form.shippingCode = this.qianshoures.shippingCode;
            //预派单号
            this.form.trucking.truckingCode = this.qianshoures.trucking.truckingCode;
            //司机
            this.form.driverName = this.qianshoures.driverName;
            //车牌号
            this.form.carCode = this.qianshoures.carCode;
            //派单时间
            this.form.createTime = this.qianshoures.trucking.createTime;
            //派单计费量
            this.form.trucking.truckingFreightTotal = this.qianshoures.trucking.truckingFreightTotal;
            //提货时间
            this.form.shippingLoadTime = this.qianshoures.shippingLoadTime;
            //提货计费量
            this.form.shippingLoadQty = this.qianshoures.shippingLoadQty;
           
           // 提货单照片
            this.form.loadReceipt.receiptBill =this.qianshoures.loadReceipt==null?
            "http://redox-test01.oss-cn-qingdao.aliyuncs.com":
            "http://redox-test01.oss-cn-qingdao.aliyuncs.com"+
              this.qianshoures.loadReceipt.receiptBill;
            // 提货单现场
            this.form.loadReceipt.receiptImage =this.qianshoures.loadReceipt==null?
            "http://redox-test01.oss-cn-qingdao.aliyuncs.com":
            "http://redox-test01.oss-cn-qingdao.aliyuncs.com"+
                this.qianshoures.loadReceipt.receiptImage
            // 签收单照片
            this.form.unLoadReceipt.receiptBill = this.qianshoures.unloadReceipt
              ==null
              ? "http://redox-test01.oss-cn-qingdao.aliyuncs.com"
              : "http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
                this.qianshoures.unloadReceipt.receiptBill;
            //签收单现场
            this.form.unLoadReceipt.receiptImage = this.qianshoures
              .unloadReceipt==null
              ? "http://redox-test01.oss-cn-qingdao.aliyuncs.com"
              : "http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
                this.qianshoures.unloadReceipt.receiptBill;
                 this.srcList=[]
                 this.srcList.push(this.qianshoures.loadReceipt==null?'':
                "http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
                  this.qianshoures.loadReceipt.receiptBill
              );
              this.srcList.push(this.qianshoures.loadReceipt==null?'':
                "http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
                  this.qianshoures.loadReceipt.receiptImage
              );
              this.srcList.push(this.qianshoures.unloadReceipt==null?'':
                "http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
                  this.qianshoures.unloadReceipt.receiptBill
              );
              this.srcList.push(this.qianshoures.unloadReceipt==null?'':
                "http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
                  this.qianshoures.unloadReceipt.receiptImage
              );
              //签收时间
              this.form.signTime = this.qianshoures.shippingUnloadTime;
              //签收计费量
              this.form.weight = this.qianshoures.shippingUnloadQty;
          } else {
            this.$message({
              showClose: true,
              message: res.data.message,
              type: "error"
            });
          }
        });
    },
    //签收非大宗
    qianshousmall() {
      this.qianshoubigAddsmall = false;
      this.dialoggetVisiblesmall = true;
      this.jifeitype = 1;
      this.qianshoutype = 2;
      // this.shippingId = 2;
      this.$http
        .get(
          this.$api.Shipping.getShippingInfo,
          {
            params: {
              "shippingId": this.shippingId
            }
          },
          true
        )
        .then(res => {
          // console.log(res, "签收回显是返回的数据");
          if (res.data.code == 1) {
            this.qianshoures = res.data.data;
            //订单号
            this.form.orderCode = this.qianshoures.orderCode;
            //运单号
            this.form.shippingCode = this.qianshoures.shippingCode;
            //预派单号
            this.form.trucking.truckingCode = this.qianshoures.trucking.truckingCode;
            //司机
            this.form.driverName = this.qianshoures.driverName;
            //车牌号
            this.form.carCode = this.qianshoures.carCode;
            //派单时间
            this.form.createTime = this.qianshoures.trucking.createTime;
            //派单计费量
            this.form.trucking.truckingFreightTotal = this.qianshoures.trucking.truckingFreightTotal;
            //提货时间
            this.form.shippingLoadTime = this.qianshoures.shippingLoadTime;
            //提货计费量
            this.form.shippingLoadQty = this.qianshoures.shippingLoadQty;
            
            // 提货单照片
            this.form.loadReceipt.receiptBill =this.qianshoures.loadReceipt==null?
            "http://redox-test01.oss-cn-qingdao.aliyuncs.com":
            "http://redox-test01.oss-cn-qingdao.aliyuncs.com"+
              this.qianshoures.loadReceipt.receiptBill;
            // 提货单现场
            this.form.loadReceipt.receiptImage =this.qianshoures.loadReceipt==null?
            "http://redox-test01.oss-cn-qingdao.aliyuncs.com":
            "http://redox-test01.oss-cn-qingdao.aliyuncs.com"+
                this.qianshoures.loadReceipt.receiptImage
            // 签收单照片
            this.form.unLoadReceipt.receiptBill =this.qianshoures.unloadReceipt
              ==null
              ? "http://redox-test01.oss-cn-qingdao.aliyuncs.com" 
              : "http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
                this.qianshoures.unloadReceipt.receiptBill ;
            //签收单现场
            this.form.unLoadReceipt.receiptImage = this.qianshoures
              .unloadReceipt==null
              ?  "http://redox-test01.oss-cn-qingdao.aliyuncs.com"
              : "http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
                this.qianshoures.unloadReceipt.receiptImage;
              this.srcList=[]
                 this.srcList.push(this.qianshoures.loadReceipt==null?'':
                "http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
                  this.qianshoures.loadReceipt.receiptBill
              );
              this.srcList.push(this.qianshoures.loadReceipt==null?'':
                "http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
                  this.qianshoures.loadReceipt.receiptImage
              );
              this.srcList.push(this.qianshoures.unloadReceipt==null?'':
                "http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
                  this.qianshoures.unloadReceipt.receiptBill
              );
              this.srcList.push(this.qianshoures.unloadReceipt==null?'':
                "http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
                  this.qianshoures.unloadReceipt.receiptImage
              );
            //签收时间
            this.form.signTime = this.qianshoures.shippingUnloadTime;
            //签收计费量
            this.form.weight = this.qianshoures.shippingUnloadQty;
            //签收非大宗物料信息
            var list = {};
            this.form.shippingGoodsList = [];
            this.qianshoures.shippingGoodsList.map(item => {
              list.id = item.id; //物料ID
              list.goodsName = item.goodsName; //物料名称
              list.createTime = this.qianshoures.trucking.createTime; //派单时间
              list.truckingFreightTotal = this.qianshoures.trucking.truckingFreightTotal; //派车计费量
              list.shippingLoadTime = this.qianshoures.shippingLoadTime; //提货时间
              list.shippingLoadQty = this.qianshoures.shippingLoadQty; //提货计费量
              list.shippingUnloadQty = item.shippingUnloadQty; //签收计费量
              this.form.shippingGoodsList.push(list);
              list = {};
            });
            
          } else {
            this.$message({
              showClose: true,
              message: res.data.message,
              type: "error"
            });
          }
         
        });
    },
    //签收非大宗（手动）
    qianshousmallhand() {
      this.qianshoubigAddsmall = false;
      this.dialoggetVisiblesmallhand = true;
      this.jifeitype = 2;
      this.qianshoutype = 2;
      // this.shippingId = 2;
      this.$http
        .get(
          this.$api.Shipping.getShippingInfo,
          {
            params: {
              "shippingId": this.shippingId
            }
          },
          true
        )
        .then(res => {
          // console.log(res, "签收非大宗手动回显是返回的数据");
          if (res.data.code == 1) {
            this.qianshoures = res.data.data;
            //订单号
            this.form.orderCode = this.qianshoures.orderCode;
            //运单号
            this.form.shippingCode = this.qianshoures.shippingCode;
            //预派单号
            this.form.trucking.truckingCode = this.qianshoures.trucking.truckingCode;
            //司机
            this.form.driverName = this.qianshoures.driverName;
            //车牌号
            this.form.carCode = this.qianshoures.carCode;
            //派单时间
            this.form.createTime = this.qianshoures.trucking.createTime;
            //派单计费量
            this.form.trucking.truckingFreightTotal = this.qianshoures.trucking.truckingFreightTotal;
            //提货时间
            this.form.shippingLoadTime = this.qianshoures.shippingLoadTime;
            //提货计费量
            this.form.shippingLoadQty = this.qianshoures.shippingLoadQty;
           
            // 提货单照片
            this.form.loadReceipt.receiptBill =this.qianshoures.loadReceipt==null?
            "http://redox-test01.oss-cn-qingdao.aliyuncs.com":
            "http://redox-test01.oss-cn-qingdao.aliyuncs.com"+
              this.qianshoures.loadReceipt.receiptBill;
            // 提货单现场
            this.form.loadReceipt.receiptImage =this.qianshoures.loadReceipt==null?
            "http://redox-test01.oss-cn-qingdao.aliyuncs.com":
            "http://redox-test01.oss-cn-qingdao.aliyuncs.com"+ 
                this.qianshoures.loadReceipt.receiptImage
            // 签收单照片
            this.form.unLoadReceipt.receiptBill = this.qianshoures.unloadReceipt
              ==null
              ? "http://redox-test01.oss-cn-qingdao.aliyuncs.com" 
              : "http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
                this.qianshoures.unloadReceipt.receiptBill;
            //签收单现场
            this.form.unLoadReceipt.receiptImage = this.qianshoures
              .unloadReceipt==null
              ? "http://redox-test01.oss-cn-qingdao.aliyuncs.com"
              : "http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
                this.qianshoures.unloadReceipt.receiptImage;
                this.srcList=[]
                 this.srcList.push(this.qianshoures.loadReceipt==null?'':
                "http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
                  this.qianshoures.loadReceipt.receiptBill
              );
              this.srcList.push(this.qianshoures.loadReceipt==null?'':
                "http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
                  this.qianshoures.loadReceipt.receiptImage
              );
              this.srcList.push(this.qianshoures.unloadReceipt==null?'':
                "http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
                  this.qianshoures.unloadReceipt.receiptBill
              );
              this.srcList.push(this.qianshoures.unloadReceipt==null?'':
                "http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
                  this.qianshoures.unloadReceipt.receiptImage
              );
            //签收时间
            this.form.signTime = this.qianshoures.shippingUnloadTime;
            //签收计费量
            this.form.weight = this.qianshoures.shippingUnloadQty;
            //签收非大宗物料信息
            var list = {};
            this.form.shippingGoodsList = [];
            this.qianshoures.shippingGoodsList.map(item => {
              list.id = item.id; //物料ID
              list.goodsName = item.goodsName; //物料名称
              list.createTime = this.qianshoures.trucking.createTime; //派单时间
              list.truckingFreightTotal = this.qianshoures.trucking.truckingFreightTotal; //派车计费量
              list.shippingLoadTime = this.qianshoures.shippingLoadTime; //提货时间
              list.shippingLoadQty = this.qianshoures.shippingLoadQty; //提货计费量
              list.shippingUnloadQty = item.shippingUnloadQty; //签收计费量
              this.form.shippingGoodsList.push(list);
              list = {};
            });
          } else {
            this.$message({
              showClose: true,
              message: res.data.message,
              type: "error"
            });
          }
        });
    },
    //签收提交
    signSubmit() {
      // alert(111)
        let shipping = {};
        shipping.shippingId = this.shippingId;//运单ID
        var orderProject = {};
        orderProject.projectSettlementClass = this.qianshoutype;
        orderProject.projectCalculateWay = this.jifeitype;
        shipping.orderProject = orderProject;
        // //提货单
        var loadReceipt={}
        loadReceipt.receiptBill = this.file1||localStorage.getItem("file1");
        loadReceipt.receiptImage = this.file2||localStorage.getItem("file2");
        shipping.loadReceipt = loadReceipt;
        //签收单
        var unloadReceipt = {};
        unloadReceipt.receiptBill = this.file3||localStorage.getItem("file3");
        // unloadReceipt.receiptBillZip = this.file3||localStorage.getItem("file3");
        unloadReceipt.receiptImage = this.file4||localStorage.getItem("file4");
        // unloadReceipt.receiptImageZip = this.file4||localStorage.getItem("file4");
        unloadReceipt.receiptImageAddress = this.form.unLoadReceipt.receiptImageAddress;
        shipping.unloadReceipt = unloadReceipt;
     

        /** 大宗-系统计算 */
        if(this.projectSettlementClass == 1 && this.projectCalculateWay == 1)
        {
            shipping.shippingUnloadTime = this.form.signTime; //签收时间
            shipping.shippingUnloadQty = this.form.weight; //签收计费量

        }/**大宗-手工输入 */
        else if(this.projectSettlementClass == 1 && this.projectCalculateWay == 2){
            shipping.shippingUnloadTime = this.form.signTime; //签收时间
            shipping.shippingUnloadQty = this.form.weight; //签收计费量
            shipping.shippingInvoiceAmt = this.form.etcmoney; //开票金额
            shipping.shippingPayAmt = this.driverMoney;  //付司机运费

        }/**非大宗-系统计算 */
        else if(this.projectSettlementClass == 2 && this.projectCalculateWay == 1){
            shipping.shippingUnloadTime = this.form.signTime; //签收时间
            shipping.shippingUnloadQty = this.form.weight; //签收计费量
            //物料
            var shippingGoodsList = [];
            this.form.shippingGoodsList.map(item => {
                var shippingGoods = {};
                shippingGoods.id = item.id;
                shippingGoods.shippingUnloadQty = item.shippingUnloadQty;
                shippingGoodsList.push(shippingGoods);
            });
            shipping.shippingGoodsList = shippingGoodsList;

        }/**非大宗-手工输入 */
        else if(this.projectSettlementClass == 2 && this.projectCalculateWay == 2){
            shipping.shippingUnloadTime = this.form.signTime; //签收时间
            shipping.shippingUnloadQty = this.form.weight; //签收计费量
            shipping.shippingInvoiceAmt = this.form.etcmoney; //开票金额
            shipping.shippingPayAmt = this.driverMoney;  //付司机运费
            //物料
            var shippingGoodsList = [];
            this.form.shippingGoodsList.map(item => {
                var shippingGoods = {};
                shippingGoods.id = item.id;
                shippingGoods.shippingUnloadQty = parseFloat(item.shippingUnloadQty);
                shippingGoodsList.push(shippingGoods);
            });
            shipping.shippingGoodsList = shippingGoodsList;
        }
        this.$http
            .post(this.$api.Order.signSubmit, shipping, true)
            .then(res => {
                if (res.data.code == 1) {
                    this.$message({showClose: true, message: res.data.message, type: "success"});
                    this.getList();

                    this.dialoggetVisiblebighand = false;
                    this.dialoggetVisiblebig = false;
                    this.dialoggetVisiblesmall = false;
                    this.dialoggetVisiblesmallhand = false;
                } else {
                    this.$message({showClose: true, message: res.data.message, type: "error"});
                }
            });
    },
    //异常上报
    abnormal(id) {
      if (id == 2) {
        this.form.disablea = true;
        this.errMessage = "其他原因";
      } else {
        this.form.disablea = false;
        this.errMessage = "";
      }
      this.idIndex = id;
      let getgoodsList = this.$store.state.selectData;
      if (getgoodsList.length > 1 || getgoodsList.length == 0) {
        this.$message({
          showClose: true,
          message: "请选择一个项目进行上报",
          type: "error"
        });
        return false;
      }

      this.dialogerrVisible = true;
      let orderidArray = [];
      let shippingId;
      let shippingSettlementClass;
      getgoodsList.forEach((item, index) => {
        this.shippingId = item.shippingId;
        this.shippingSettlementClass = item.shippingSettlementClass;
      });
      this.$http
        .get(
          this.$api.Shipping.getShippingInfo,
          {
            params: {
              shippingId: this.shippingId
            }
          },
          true
        )
        .then(res => {
          // console.log(res,"异常上报信息")
          this.form.shippingId = res.data.data.shippingId;
          this.form.orderCode = res.data.data.orderCode; //订单编号
          this.form.shippingCode = res.data.data.shippingCode; //运单号
          this.form.carCode = res.data.data.carCode; //车牌号
          this.form.driverName = res.data.data.driverName; //司机
          this.form.shippingCalculateWay = "非大宗"; //计费分类
          //异常描述
        })
        .catch(err => {
          alert("获取失败");
        });
    },
    //异常上报提交
    errsubmit() {
      if (this.errMessage != "") {
        let formData2 = new FormData();
        //运单ID
        formData2.append("shippingId", this.form.shippingId);
        //异常类型（2签收异常、3其它异常）；待提货、代签收传3，已提货签收并且是非大宗业务传2
        if (this.idIndex == 3) {
          formData2.append("shippingExceptionType", 3);
        } else {
          formData2.append("shippingExceptionType", 2);
        }
        //异常描述
        formData2.append("exceptionDesc", this.errMessage);

        this.$http
          .post(this.$api.Shipping.errSubmit, formData2, true)
          .then(res => {
            if (res.data.code == 1) {
              this.$message({
                showClose: true,
                message: res.data.message,
                type: "success"
              });
              this.dialogerrVisible = false;
              this.getList();
            } else {
              this.$message({
                showClose: true,
                message: res.data.message,
                type: "error"
              });
            }
          });
      } else {
        this.$message({
          showClose: true,
          message: "请描述异常上报原因",
          type: "error"
        });
      }
    },
    //查看详情
    seedatils() {
      let getgoodsList = this.$store.state.selectData;
      if (getgoodsList.length > 1 || getgoodsList.length == 0) {
        this.$message({
          showClose: true,
          message: "请选择一个项目查看详情",
          type: "error"
        });
        return false;
      }
      // this.seeinformation = true;
      let orderidArray = [];
      let shippingId;
      let shippingSettlementClass;

      getgoodsList.forEach((item, index) => {
        this.shippingId = item.shippingId;
        this.shippingCalculateWay = item.shippingCalculateWay;
        this.shippingSettlementClass = item.shippingSettlementClass;
      });
      this.$http
        .get(
          this.$api.Shipping.getShippingInfo,
          {
            params: {
              shippingId: this.shippingId
            }
          },
          true
        )
        .then(res => {
          if(res.data.data.orderProject.projectSettlementClass==1){
            // alert(111)
            this.see_information = 1;
            this.dialogseeVisible = true;
          }else{
            this.see_information = 2;
            this.dialogseeVisible = true;
          }
          this.seeinformationdata = res.data.data;
          ///////////////下面为 查看详情表单赋值//////////////////
          var koukuan = this.seeinformationdata;
          var chakan = {};
          chakan.priceOverdueDeduct = this.seeinformationdata.shippingOverdueAmt; //晚到扣款
          chakan.priceDamageDeduct = this.seeinformationdata.shippingDamageAmt; //货损扣款
          chakan.priceOtherDeduct = this.seeinformationdata.truckingPrice.priceOtherDeduct; //其他扣款
          if (this.chasmall.length == 0) {
            this.chasmall.push(chakan);
          } else {
            this.chasmall[0] = chakan;
          }

          var list = {};
          koukuan.shippingGoodsList.map(item => {
            list.goodsName = item.goodsName; //物料名称
            list.createTime = koukuan.trucking.createTime; //派单时间
            list.truckingFreightTotal = item.goodsQty; //派车计费量
            list.shippingLoadTime = koukuan.shippingLoadTime; //提货时间
            list.shippingLoadQty = item.shippingLoadQty; //提货计费量
            list.shippingUnloadTime = item.shippingUnloadTime; //签收时间
            list.shippingSettlementQty = item.shippingUnloadQty; //签收计费量
            this.tableData.push(list);
            list = {};
          });
          //订单号
          this.form.orderCode = koukuan.orderCode;
          //运单号
          this.form.shippingCode = koukuan.shippingCode;
          //预派单号
          this.form.trucking.truckingCode = koukuan.trucking.truckingCode;
          //司机
          this.form.driverName = koukuan.driverName;
          //车牌号
          this.form.carCode = koukuan.carCode;
          //亏涨吨扣款
          this.form.kuizhangkoukuan = 300.0;
          //派单时间
          this.form.createTime = koukuan.trucking.createTime;
          //派单计费量
          this.form.trucking.truckingFreightTotal =
            koukuan.trucking.truckingFreightTotal;
          //提货时间
          this.form.shippingLoadTime = koukuan.shippingLoadTime;
          //提货计费量
          this.form.shippingLoadQty = koukuan.shippingLoadQty;
          //签收时间
          this.form.signTime = koukuan.shippingUnloadTime;
          //签收计费量
          this.form.weight = koukuan.shippingLoadQty;
          this.srcList=[]
          this.srcList.push(
            "http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
              koukuan.loadReceipt.receiptBill
          );
          this.srcList.push(
            "http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
              koukuan.loadReceipt.receiptImage
          );
          this.srcList.push(
            "http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
              koukuan.unloadReceipt.receiptBill
          );
          this.srcList.push(
            "http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
              koukuan.unloadReceipt.receiptImage
          );
          // 提货单照片
          this.form.loadReceipt.receiptBill =
            "http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
            koukuan.loadReceipt.receiptBill;
          // 提货单现场
          this.form.loadReceipt.receiptImage = koukuan.loadReceipt.receiptImage
            ? "http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
              koukuan.loadReceipt.receiptImage
            : "";
          // 签收单照片
          this.form.unLoadReceipt.receiptBill = koukuan.unloadReceipt
            .receiptBill
            ? "http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
              koukuan.unloadReceipt.receiptBill
            : "";
          //签收单现场
          this.form.unLoadReceipt.receiptImage = koukuan.unloadReceipt
            .receiptImage
            ? "http://redox-test01.oss-cn-qingdao.aliyuncs.com" +
              koukuan.unloadReceipt.receiptImage
            : "";
        });
    },
    //物料信息
    seeMessage() {
      let getgoodsList = this.$store.state.selectData;
      if (getgoodsList.length > 1 || getgoodsList.length == 0) {
        this.$message({
          showClose: true,
          message: "请选择一个项目查看物料信息",
          type: "error"
        });
        return false;
      }
      this.dialogMessageVisible = true;

      let orderidArray = [];
      let shippingId;
      let shippingSettlementClass;
      getgoodsList.forEach((item, index) => {
        this.shippingId = item.shippingId;
        this.shippingCalculateWay = item.shippingCalculateWay;
        this.shippingSettlementClass = item.shippingSettlementClass;
      });
      this.$http
        .get(
          this.$api.Shipping.getShippingInfo,
          {
            params: {
              shippingId: this.shippingId
            }
          },
          true
        )
        .then(res => {
          // console.log(res, "物料信息");
          var list = {};
            this.tableData = [];
          res.data.data.shippingGoodsList.map(item => {
            // console.log(res.data.data.shippingStatusName,999)
            list.goodsName = item.goodsName;
            list.goodType = item.goodType;
            list.goodsClass = item.goodsClass;
            if(res.data.data.shippingStatusName=="待提货"){
              list.goodsSettlementUnit = item.goodsSettlementTotal==null?0:item.goodsSettlementTotal;
            }else if(res.data.data.shippingStatusName=="待签收"){
              list.goodsSettlementUnit = item.shippingLoadQty==null?0:item.shippingLoadQty;
            }else if(res.data.data.shippingStatusName=="已签收"){
              list.goodsSettlementUnit = item.shippingUnloadQty==null?0:item.shippingUnloadQty;
            }
            list.goodsGrossWeight = item.goodsGrossWeight;
            list.goodsNetWeight = item.goodsNetWeight;
            list.goodsVolume = item.goodsVolume;
            list.goodsQty = item.goodsQty;
            this.tableData.push(list);
            list = {};
          });
        });
    },
    // 初始化表头数据
    setHeaderData() {
      this.setAuditedData = this.auditedName;
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.setHeaderData();
    this.getList(1);
    this.$store.commit("getSingular", {
      options: this.options,
      isShow: true
    });
  }
};
</script>
<style scoped>
@import url("../../../assets/css/singularTable.css");
.tab_operation {
  text-align: right;
  margin-bottom: 15px;
  padding-right: 5%;
  height: 30px;
  line-height: 30px;
}
.new_pro {
  border-radius: 4px;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  padding: 3px 10px;
}
.uploadimg {
  width: 50%;
  height: 296px;
  position: relative;
  float: left;
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
.imagebg {
  width: 100%;
  height: 100%;
  background: #eee;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 10px;
  line-height: 210px;
  text-align: center;
  margin-right: 40px;
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
.avatar {
  width: 100%;
  height: 296px;
  display: block;
  border-radius: 12px;
  position: relative;
  cursor: pointer;
}
.goodsmessage_img {
  overflow: hidden;
}
.add_goods_img .goodsimg {
  float: left;
  margin: 32px;
}
.getgoodsform {
  overflow: hidden;
}
.getgoodsinp {
  float: left;
  width: 100%;
}
.goods_img_right {
  float: left;
  width: 50%;
}
.goods_img_right2 {
  float: left;
  width: 50%;
  margin-bottom: 0;
  margin-top: 0;
}
.goods_img_right2 .getgoodsinp {
  margin-bottom: 16px;
}
.goods_img_bottom {
  width: 100%;
  overflow: hidden;
}
.getgoodsinp .el-form-item__label {
  text-align: left !important;
}
.getgoodsinp_time {
  width: 100%;
}
.goodsblue {
  color: #659cfe;
  margin-right: 40px;
}
.goodsmessage {
  margin-top: 16px;
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
.goodsimg .el-image {
  float: left;
  width: 160px;
  border-radius: 10px;
  height: 160px;
}
.inpselect {
  width: 100%;
}
.el-input.is-disabled /deep/ .el-input__inner {
  color: #666;
}
</style>