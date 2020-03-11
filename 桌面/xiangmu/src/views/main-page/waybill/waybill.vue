<template>
  <div class="wayBill">

    <div class="table_main">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="待提货" name="first">
          <!-- 待生效 -->
          <div class="audit_search">
            <!-- 单行搜索引擎 -->
            <singularTable></singularTable>
          </div>
          <div class="tab_operation">
            <el-button class="reset reset_tab" type="primary" @click="waybillGetgoods()">提货</el-button>
            <el-button class="reset reset_tab" type="primary" @click="abnormal(3)">异常上报</el-button>
            <el-button class="reset reset_tab" type="primary" @click="seeMessage()">物料信息</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待签收" name="second">
          <!-- 派单中 -->
          <div class="audit_search">
            <!-- 单行搜索引擎 -->
            <singularTable></singularTable>
          </div>
          <div class="tab_operation">
            <el-button class="reset reset_tab" type="primary" @click="signGetgoods()">签收</el-button>
            <el-button class="reset reset_tab" type="primary" @click="abnormal(3)">异常上报</el-button>
            <el-button class="reset reset_tab" type="primary" @click="seeMessage()">物料信息</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已提货签收" name="third">
          <!-- 已完成 -->
          <div class="audit_search">
            <!-- 单行搜索引擎 -->
            <singularTable></singularTable>
          </div>
          <div class="tab_operation">
            <el-button class="reset reset_tab" type="primary" @click="seedatils()">查看详情</el-button>
            <el-button class="reset reset_tab" type="primary" @click="abnormal(2)">异常上报</el-button>
            <el-button class="reset reset_tab" type="primary" @click="seeMessage()">物料信息</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="全部" name="fourth">
          <!-- 已完成 -->
          <div class="audit_search">
            <!-- 单行搜索引擎 -->
            <singularTable></singularTable>
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
            @pagination="waybillList"
          />
        </div>
      </div>
    </div>

    <!-- 异常上报弹窗 -->
    <div class="getgoods">
      <el-dialog title="异常上报" :visible.sync="dialogerrVisible">
        <el-form :model="form" class="getgoodsform">
          <div class="goods_img_bottom">
            <el-form-item label="订单号" :label-width="formLabelWidth" class="getgoodsinp">
              <el-input v-model="form.orderid" :disabled="true" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="计费分类" :label-width="formLabelWidth" class="getgoodsinp">
              <el-input v-model="form.shippingCalculateWay" :disabled="true" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="运单号" :label-width="formLabelWidth" class="getgoodsinp">
              <el-input v-model="form.shippingCode" :disabled="true" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="车牌号" :label-width="formLabelWidth" class="getgoodsinp">
              <el-input v-model="form.shippingCarCode" :disabled="true" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="承运人" :label-width="formLabelWidth" class="getgoodsinp">
              <el-input v-model="form.driver" :disabled="true" autocomplete="off"></el-input>
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
    <!-- 提货弹窗 -->
    <div class="getgoods">
      <el-dialog title="提货" :visible.sync="dialogFormVisible">
        <el-form :model="form" class="getgoodsform">
          <!-- 上传图片 -->
          <div class="uploadimg">
            <el-image class="avatar" v-if="imageUrl" :src="imageUrl" :preview-src-list="srcList"></el-image>
            <el-upload
              v-if="imageUrl"
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <i class="avatar-uploader-icon">重新上传</i>
            </el-upload>

            <div v-else class="imagebg">暂无图片</div>
          </div>
          <!-- 上传图片结束 -->
          <div class="goods_img_right">
            <el-col :span="24">
              <div class="grid-content bg-purple">
                <div class="grid-content bg-purple">
                  <el-form-item label="订单号" :label-width="formLabelWidth" class="getgoodsinp">
                    <el-input v-model="form.orderid" :disabled="true" autocomplete="off"></el-input>
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
                    <el-input v-model="form.truckingCode" :disabled="true" autocomplete="off"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="grid-content bg-purple">
                <div class="grid-content bg-purple">
                  <el-form-item label="司机" :label-width="formLabelWidth" class="getgoodsinp">
                    <el-input v-model="form.driver" :disabled="true" autocomplete="off"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-col>

            <el-col :span="24">
              <div class="grid-content bg-purple">
                <div class="grid-content bg-purple">
                  <el-form-item label="车牌号" :label-width="formLabelWidth" class="getgoodsinp">
                    <el-input v-model="form.shippingCarCode" :disabled="true" autocomplete="off"></el-input>
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
                    <el-input v-model="form.orderid" :disabled="true" autocomplete="off"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <div class="grid-content bg-purple">
                  <el-form-item label="提货时间" :label-width="formLabelWidth" class="getgoodsinp">
                    <el-date-picker
                      v-model="value1"
                      type="date"
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
                  <el-form-item label="派单计费量" :label-width="formLabelWidth" class="getgoodsinp">
                    <el-input
                      v-model="form.shippingFreightTotal"
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
                  <el-form-item label="提货计费量" :label-width="formLabelWidth" class="getgoodsinp">
                    <el-input v-model="value2" autocomplete="off" placeholder="请输入提货计费量"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-col>
          </div>
        </el-form>
        <el-divider></el-divider>
        <div class="goodsmessage">
          物料名称：
          <span class="goodsblue">煤炭</span>
          派车量：
          <span class="goodsblue">33</span>
        </div>
        <div class="goodsmessage_img">
          <div class="demo-image__preview goodsimg">
            <el-image class="avatar" v-if="imageUrl1" :src="imageUrl1" :preview-src-list="srcList"></el-image>
            <el-upload
              v-if="imageUrl1"
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleSuccess"
              :before-upload="beforeUpload"
            >
              <i class="avatar-uploader-icon">重新上传</i>
            </el-upload>

            <div v-else class="imagebg">暂无图片</div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="getgoods()">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 提货弹窗结束 -->
    <!-- 查看详情弹窗 -->
    <div class="getgoods">
      <el-dialog title="查看详情" :visible.sync="dialogseeVisible">
        <el-form :model="form" class="getgoodsform">
          <div class="goods_img_bottom">
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <div class="grid-content bg-purple">
                  <el-form-item label="订单号" :label-width="formLabelWidth" class="getgoodsinp">
                    <el-input v-model="form.name" :disabled="true" autocomplete="off"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <div class="grid-content bg-purple">
                  <el-form-item label="司机" :label-width="formLabelWidth" class="getgoodsinp">
                    <el-input v-model="form.name" :disabled="true" autocomplete="off"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <div class="grid-content bg-purple">
                  <el-form-item label="运单号" :label-width="formLabelWidth" class="getgoodsinp">
                    <el-input v-model="form.name" :disabled="true" autocomplete="off"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <div class="grid-content bg-purple">
                  <el-form-item label="车牌号" :label-width="formLabelWidth" class="getgoodsinp">
                    <el-input v-model="form.name" :disabled="true" autocomplete="off"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <div class="grid-content bg-purple">
                  <el-form-item label="预派单号" :label-width="formLabelWidth" class="getgoodsinp">
                    <el-input v-model="form.name" :disabled="true" autocomplete="off"></el-input>
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
                    <el-input v-model="form.name" :disabled="true" autocomplete="off"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <div class="grid-content bg-purple">
                  <el-form-item label="派单计费量" :label-width="formLabelWidth" class="getgoodsinp">
                    <el-input v-model="form.name" :disabled="true" autocomplete="off"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <div class="grid-content bg-purple">
                  <el-form-item label="提货时间" :label-width="formLabelWidth" class="getgoodsinp">
                    <el-input v-model="form.name" :disabled="true" autocomplete="off"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <div class="grid-content bg-purple">
                  <el-form-item label="提货计费量" :label-width="formLabelWidth" class="getgoodsinp">
                    <el-input v-model="form.name" :disabled="true" autocomplete="off"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <div class="grid-content bg-purple">
                  <el-form-item label="签收时间" :label-width="formLabelWidth" class="getgoodsinp">
                    <el-input v-model="form.name" :disabled="true" autocomplete="off"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <div class="grid-content bg-purple">
                  <el-form-item label="签收计费量" :label-width="formLabelWidth" class="getgoodsinp">
                    <el-input v-model="form.name" :disabled="true" autocomplete="off"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-col>
          </div>
        </el-form>
        <el-divider></el-divider>
        <el-table
          :data="tableData"
          style="width: 100%"
          height="190px"
          :header-cell-style="{background:'#E9F0FF',color:'#606266'}"
        >
          <el-table-column prop="date" label="物料名称" width="130"></el-table-column>
          <el-table-column prop="name" label="派单时间" width="130"></el-table-column>
          <el-table-column prop="address" label="派车计费量" width="130"></el-table-column>
          <el-table-column prop="date" label="提货时间" width="130"></el-table-column>
          <el-table-column prop="name" label="提货计费量" width="130"></el-table-column>
          <el-table-column prop="address" label="签收时间" width="130"></el-table-column>
          <el-table-column prop="address" label="签收计费量" width="130"></el-table-column>
        </el-table>

        <div class="goodsmessage_img add_goods_img">
          <div class="demo-image__preview goodsimg">
            <el-image class="avatar" v-if="imageUrl1" :src="imageUrl1" :preview-src-list="srcList"></el-image>
            <el-upload
              v-if="imageUrl1"
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleSuccess"
              :before-upload="beforeUpload"
            >
              <i class="avatar-uploader-icon">重新上传</i>
            </el-upload>

            <div v-else class="imagebg">暂无图片</div>
          </div>
          <div class="demo-image__preview goodsimg">
            <el-image :src="url" :preview-src-list="srcList"></el-image>
          </div>
          <div class="demo-image__preview goodsimg">
            <el-image :src="url" :preview-src-list="srcList"></el-image>
          </div>
          <div class="demo-image__preview goodsimg">
            <el-image :src="url" :preview-src-list="srcList"></el-image>
          </div>
        </div>
        <el-divider></el-divider>
        <el-table
          :data="tableData"
          style="width: 100%"
          height="190px"
          :header-cell-style="{background:'#E9F0FF',color:'#606266'}"
        >
          <el-table-column prop="date" label="物料名称" width="130"></el-table-column>
          <el-table-column prop="name" label="派单时间" width="130"></el-table-column>
          <el-table-column prop="address" label="派车计费量" width="130"></el-table-column>
          <el-table-column prop="date" label="提货时间" width="130"></el-table-column>
          <el-table-column prop="name" label="提货计费量" width="130"></el-table-column>
          <el-table-column prop="address" label="签收时间" width="130"></el-table-column>
          <el-table-column prop="address" label="签收计费量" width="130"></el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogseeVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogseeVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 查看详情弹窗结束 -->
    <!-- 物料信息弹窗 -->
    <div class="getgoods">
      <el-dialog title="物料信息" :visible.sync="dialogMessageVisible">
        <el-table
          :data="tableData"
          style="width: 100%"
          height="420px"
          :header-cell-style="{background:'#E9F0FF',color:'#606266'}"
        >
          <el-table-column prop="date" label="序号" width="130"></el-table-column>
          <el-table-column prop="name" label="货物名称" width="130"></el-table-column>
          <el-table-column prop="address" label="货物类型" width="130"></el-table-column>
          <el-table-column prop="date" label="货物分类" width="130"></el-table-column>
          <el-table-column prop="name" label="计费量" width="130"></el-table-column>
          <el-table-column prop="address" label="物料毛重" width="130"></el-table-column>
          <el-table-column prop="address" label="物料净重" width="130"></el-table-column>
          <el-table-column prop="address" label="物料体积" width="130"></el-table-column>
          <el-table-column prop="address" label="总件数" width="130"></el-table-column>
        </el-table>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogseeVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogseeVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 物料信息弹窗结束 -->
    <!-- 签收1弹窗 -->
    
    <div class="getgoods">
      <el-dialog title="签收" :visible.sync="dialoggetVisible">
        <el-form :model="form" class="getgoodsform">
          <!-- 上传图片 -->
          <div class="uploadimg">
            <el-image class="avatar" v-if="imageUrl" :src="imageUrl" :preview-src-list="srcList"></el-image>
            <el-upload
              v-if="imageUrl"
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <i class="avatar-uploader-icon">重新上传</i>
            </el-upload>

            <div v-else class="imagebg">暂无图片</div>
          </div>
          <!-- 上传图片结束 -->
          <div class="goods_img_right">
            <el-col :span="24">
              <div class="grid-content bg-purple">
                <div class="grid-content bg-purple">
                  <el-form-item label="订单号" :label-width="formLabelWidth" class="getgoodsinp">
                    <el-input v-model="form.orderid" :disabled="true" autocomplete="off"></el-input>
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
                    <el-input v-model="form.truckingCode" :disabled="true" autocomplete="off"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="grid-content bg-purple">
                <div class="grid-content bg-purple">
                  <el-form-item label="司机" :label-width="formLabelWidth" class="getgoodsinp">
                    <el-input v-model="form.orderid" :disabled="true" autocomplete="off"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-col>

            <el-col :span="24">
              <div class="grid-content bg-purple">
                <div class="grid-content bg-purple">
                  <el-form-item label="车牌号" :label-width="formLabelWidth" class="getgoodsinp">
                    <el-input v-model="form.shippingCarCode" :disabled="true" autocomplete="off"></el-input>
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
                    <el-input v-model="form.orderid" :disabled="true" autocomplete="off"></el-input>
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
                      type="date"
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
                  <el-form-item label="派单计费量" :label-width="formLabelWidth" class="getgoodsinp">
                    <el-input
                      v-model="form.shippingFreightTotal"
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
                  <el-form-item label="签收计费量" :label-width="formLabelWidth" class="getgoodsinp">
                    <el-input v-model="form.weight" autocomplete="off" placeholder="请输入提货计费量"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <div class="grid-content bg-purple">
                  <el-form-item label="提货时间" :label-width="formLabelWidth" class="getgoodsinp">
                    <el-input v-model="form.orderid" :disabled="true" autocomplete="off"></el-input>
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
                  <el-form-item label="提货计费量" :label-width="formLabelWidth" class="getgoodsinp">
                    <el-input
                      v-model="form.shippingFreightTotal"
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
                  <el-form-item label="付司机现金运费" :label-width="formLabelWidth" class="getgoodsinp">
                    <el-input v-model="driverMoney" autocomplete="off" placeholder="请输入提货计费量"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-col>
          </div>
        </el-form>
        <el-divider></el-divider>
        <div class="goodsmessage_img">
          <div class="demo-image__preview goodsimg">
            <el-image class="avatar" v-if="imageUrl1" :src="imageUrl1" :preview-src-list="srcList"></el-image>
            <el-upload
              v-if="imageUrl1"
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleSuccess"
              :before-upload="beforeUpload"
            >
              <i class="avatar-uploader-icon">重新上传</i>
            </el-upload>

            <div v-else class="imagebg">暂无图片</div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialoggetVisible = false">取 消</el-button>
          <el-button type="primary" @click="signSubmit()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 签收1弹窗结束 -->
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
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
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
      limit: 1, //默认一次显示10条数据
      url:
        "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
      imageUrl:
        "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
      imageUrl1:
        "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
      imageUrl2:
        "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
      srcList: [
        "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg"
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      dialogerrVisible: false,
      dialoggetVisible: false,
      dialogseeVisible: false,
      dialogFormVisible: false,
      dialogMessageVisible: false,
      form: {
        idorder: "", //订单id
        orderid: "", //订单号
        shippingid: "", //运单id
        truckingCode: "", //预派车单编号
        shippingCode: "", //运单号
        shippingCarCode: "", //车牌号
        shippingCalculateWay: "", //异常上报里面的计费分类
        driver: "", //司机
        date2: "",
        delivery: false,
        shippingFreightTotal: "",
        disablea: false //控制表单disable
      },
      formLabelWidth: "120px",
      // 表头数据
      auditedName: [
        {
          tabTh: "是否上传提货单",
          tabItem: "finishLoadBill",
          isShow: true
        },
        {
          tabTh: "订单号",
          tabItem: "orderCode",
          isShow: true
        },
        {
          tabTh: "运单号",
          tabItem: "shippingCode",
          isShow: true
        },
        {
          tabTh: "运单单价",
          tabItem: "shippingSettlementUnitprice",
          isShow: true
        },
        {
          tabTh: "承运人",
          tabItem: "shippingDriverName",
          isShow: true
        },
        {
          tabTh: "车牌号",
          tabItem: "shippingCarCode",
          isShow: true
        },
        {
          tabTh: "承运人电话",
          tabItem: "shippingDriverMobile",
          isShow: true
        },
        {
          tabTh: "派单日期",
          tabItem: "createTime",
          isShow: true
        },
        {
          tabTh: "接单日期",
          tabItem: "createTime",
          isShow: true
        },
        {
          tabTh: "发货单位",
          tabItem: "shippingLoadCompany",
          isShow: true
        },
        {
          tabTh: "发货人",
          tabItem: "shippingLoadContacter",
          isShow: true
        },
        {
          tabTh: "发货地址",
          tabItem: "shippingLoadAddress",
          isShow: true
        },
        {
          tabTh: "发货省",
          tabItem: "orderId",
          isShow: true
        },
        {
          tabTh: "发货市",
          tabItem: "orderId",
          isShow: true
        },
        {
          tabTh: "发货区",
          tabItem: "orderId",
          isShow: true
        },
        {
          tabTh: "收货单位",
          tabItem: "shippingUnloadCompany",
          isShow: true
        },
        {
          tabTh: "收货人",
          tabItem: "shippingUnloadContacter",
          isShow: true
        },
        {
          tabTh: "收货地址",
          tabItem: "shippingUnloadAddress",
          isShow: true
        },
        {
          tabTh: "收货省",
          tabItem: "orderId",
          isShow: true
        },
        {
          tabTh: "收货市",
          tabItem: "orderId",
          isShow: true
        },
        {
          tabTh: "收货区",
          tabItem: "orderId",
          isShow: true
        },
        {
          tabTh: "允许亏吨范围",
          tabItem: "shippingDeficitScope",
          isShow: true
        },
        {
          tabTh: "允许亏吨比例",
          tabItem: "shippingDeficitScale",
          isShow: true
        },
        {
          tabTh: "亏吨扣费单价",
          tabItem: "shippingDeficitUnitprice",
          isShow: true
        },
        {
          tabTh: "允许涨吨范围",
          tabItem: "shippingRiseScope",
          isShow: true
        },
        {
          tabTh: "允许涨吨比例",
          tabItem: "shippingRiseScale",
          isShow: true
        },
        {
          tabTh: "涨吨扣费单价",
          tabItem: "shippingRiseUnitprice",
          isShow: true
        },
        {
          tabTh: "货损扣款",
          tabItem: "shippingDamageDeduct",
          isShow: true
        },
        {
          tabTh: "晚到扣款",
          tabItem: "shippingOverdueDeduct",
          isShow: true
        },
        {
          tabTh: "其他扣款",
          tabItem: "shippingOtherDeduct",
          isShow: true
        },
        {
          tabTh: "是否购买保险",
          tabItem: "projectSettlementWay",
          isShow: true
        },
        {
          tabTh: "保险金额",
          tabItem: "shippingPremiumAmt",
          isShow: true
        },
        {
          tabTh: "可保价金额",
          tabItem: "shippingInsuredAmt",
          isShow: true
        },
        {
          tabTh: "管理费",
          tabItem: "shippingManagementAmt",
          isShow: true
        },
        {
          tabTh: "油气卡预付",
          tabItem: "shippingCardAmt",
          isShow: true
        },
        {
          tabTh: "现金预付",
          tabItem: "shippingCashAmt",
          isShow: true
        },
        {
          tabTh: "其他费用项名称",
          tabItem: "shippingOtherAmtDesc",
          isShow: true
        },
        {
          tabTh: "费用金额",
          tabItem: "shippingOtherAmt",
          isShow: true
        }
      ],
      auditedName1: [
        {
          tabTh: "是否上传签收单",
          tabItem: "finishLoadBill",
          isShow: true
        },
        {
          tabTh: "订单号",
          tabItem: "orderCode",
          isShow: true
        },
        {
          tabTh: "运单号",
          tabItem: "shippingCode",
          isShow: true
        },
        {
          tabTh: "运单单价",
          tabItem: "shippingSettlementUnitprice",
          isShow: true
        },
        {
          tabTh: "承运人",
          tabItem: "shippingDriverName",
          isShow: true
        },
        {
          tabTh: "车牌号",
          tabItem: "shippingCarCode",
          isShow: true
        },
        {
          tabTh: "承运人电话",
          tabItem: "shippingDriverMobile",
          isShow: true
        },
        {
          tabTh: "派单日期",
          tabItem: "createTime",
          isShow: true
        },
        {
          tabTh: "接单日期",
          tabItem: "createTime",
          isShow: true
        },
        {
          tabTh: "发货单位",
          tabItem: "shippingLoadCompany",
          isShow: true
        },
        {
          tabTh: "发货人",
          tabItem: "shippingLoadContacter",
          isShow: true
        },
        {
          tabTh: "发货地址",
          tabItem: "shippingLoadAddress",
          isShow: true
        },
        {
          tabTh: "发货省",
          tabItem: "orderId",
          isShow: true
        },
        {
          tabTh: "发货市",
          tabItem: "orderId",
          isShow: true
        },
        {
          tabTh: "发货区",
          tabItem: "orderId",
          isShow: true
        },
        {
          tabTh: "收货单位",
          tabItem: "shippingUnloadCompany",
          isShow: true
        },
        {
          tabTh: "收货人",
          tabItem: "shippingUnloadContacter",
          isShow: true
        },
        {
          tabTh: "收货地址",
          tabItem: "shippingUnloadAddress",
          isShow: true
        },
        {
          tabTh: "收货省",
          tabItem: "orderId",
          isShow: true
        },
        {
          tabTh: "收货市",
          tabItem: "orderId",
          isShow: true
        },
        {
          tabTh: "收货区",
          tabItem: "orderId",
          isShow: true
        },
        {
          tabTh: "允许亏吨范围",
          tabItem: "shippingDeficitScope",
          isShow: true
        },
        {
          tabTh: "允许亏吨比例",
          tabItem: "shippingDeficitScale",
          isShow: true
        },
        {
          tabTh: "亏吨扣费单价",
          tabItem: "shippingDeficitUnitprice",
          isShow: true
        },
        {
          tabTh: "允许涨吨范围",
          tabItem: "shippingRiseScope",
          isShow: true
        },
        {
          tabTh: "允许涨吨比例",
          tabItem: "shippingRiseScale",
          isShow: true
        },
        {
          tabTh: "涨吨扣费单价",
          tabItem: "shippingRiseUnitprice",
          isShow: true
        },
        {
          tabTh: "货损扣款",
          tabItem: "shippingDamageDeduct",
          isShow: true
        },
        {
          tabTh: "晚到扣款",
          tabItem: "shippingOverdueDeduct",
          isShow: true
        },
        {
          tabTh: "其他扣款",
          tabItem: "shippingOtherDeduct",
          isShow: true
        },
        {
          tabTh: "是否购买保险",
          tabItem: "projectSettlementWay",
          isShow: true
        },
        {
          tabTh: "保险金额",
          tabItem: "shippingPremiumAmt",
          isShow: true
        },
        {
          tabTh: "可保价金额",
          tabItem: "shippingInsuredAmt",
          isShow: true
        },
        {
          tabTh: "管理费",
          tabItem: "shippingManagementAmt",
          isShow: true
        },
        {
          tabTh: "油气卡预付",
          tabItem: "shippingCardAmt",
          isShow: true
        },
        {
          tabTh: "现金预付",
          tabItem: "shippingCashAmt",
          isShow: true
        },
        {
          tabTh: "其他费用项名称",
          tabItem: "shippingOtherAmtDesc",
          isShow: true
        },
        {
          tabTh: "费用金额",
          tabItem: "shippingOtherAmt",
          isShow: true
        }
      ],
      auditedName2: [
        {
          tabTh: "订单号",
          tabItem: "orderCode",
          isShow: true
        },
        {
          tabTh: "运单号",
          tabItem: "shippingCode",
          isShow: true
        },
        {
          tabTh: "运单单价",
          tabItem: "shippingSettlementUnitprice",
          isShow: true
        },
        {
          tabTh: "承运人",
          tabItem: "shippingDriverName",
          isShow: true
        },
        {
          tabTh: "车牌号",
          tabItem: "shippingCarCode",
          isShow: true
        },
        {
          tabTh: "承运人电话",
          tabItem: "shippingDriverMobile",
          isShow: true
        },
        {
          tabTh: "派单日期",
          tabItem: "createTime",
          isShow: true
        },
        {
          tabTh: "接单日期",
          tabItem: "createTime",
          isShow: true
        },
        {
          tabTh: "提货日期",
          tabItem: "finishLoadTime",
          isShow: true
        },
        {
          tabTh: "签收日期",
          tabItem: "finishUnloadTime",
          isShow: true
        },
        {
          tabTh: "发货单位",
          tabItem: "shippingLoadCompany",
          isShow: true
        },
        {
          tabTh: "发货人",
          tabItem: "shippingLoadContacter",
          isShow: true
        },
        {
          tabTh: "发货地址",
          tabItem: "shippingLoadAddress",
          isShow: true
        },
        {
          tabTh: "发货省",
          tabItem: "orderId",
          isShow: true
        },
        {
          tabTh: "发货市",
          tabItem: "orderId",
          isShow: true
        },
        {
          tabTh: "发货区",
          tabItem: "orderId",
          isShow: true
        },
        {
          tabTh: "收货单位",
          tabItem: "shippingUnloadCompany",
          isShow: true
        },
        {
          tabTh: "收货人",
          tabItem: "shippingUnloadContacter",
          isShow: true
        },
        {
          tabTh: "收货地址",
          tabItem: "shippingUnloadAddress",
          isShow: true
        },
        {
          tabTh: "收货省",
          tabItem: "orderId",
          isShow: true
        },
        {
          tabTh: "收货市",
          tabItem: "orderId",
          isShow: true
        },
        {
          tabTh: "收货区",
          tabItem: "orderId",
          isShow: true
        },
        {
          tabTh: "允许亏吨范围",
          tabItem: "shippingDeficitScope",
          isShow: true
        },
        {
          tabTh: "允许亏吨比例",
          tabItem: "shippingDeficitScale",
          isShow: true
        },
        {
          tabTh: "亏吨扣费单价",
          tabItem: "shippingDeficitUnitprice",
          isShow: true
        },
        {
          tabTh: "允许涨吨范围",
          tabItem: "shippingRiseScope",
          isShow: true
        },
        {
          tabTh: "允许涨吨比例",
          tabItem: "shippingRiseScale",
          isShow: true
        },
        {
          tabTh: "涨吨扣费单价",
          tabItem: "shippingRiseUnitprice",
          isShow: true
        },
        {
          tabTh: "货损扣款",
          tabItem: "shippingDamageDeduct",
          isShow: true
        },
        {
          tabTh: "晚到扣款",
          tabItem: "shippingOverdueDeduct",
          isShow: true
        },
        {
          tabTh: "其他扣款",
          tabItem: "shippingOtherDeduct",
          isShow: true
        },
        {
          tabTh: "是否购买保险",
          tabItem: "projectSettlementWay",
          isShow: true
        },
        {
          tabTh: "保险金额",
          tabItem: "shippingPremiumAmt",
          isShow: true
        },
        {
          tabTh: "可保价金额",
          tabItem: "shippingInsuredAmt",
          isShow: true
        },
        {
          tabTh: "管理费",
          tabItem: "shippingManagementAmt",
          isShow: true
        },
        {
          tabTh: "油气卡预付",
          tabItem: "shippingCardAmt",
          isShow: true
        },
        {
          tabTh: "现金预付",
          tabItem: "shippingCashAmt",
          isShow: true
        },
        {
          tabTh: "其他费用项名称",
          tabItem: "shippingOtherAmtDesc",
          isShow: true
        },
        {
          tabTh: "费用金额",
          tabItem: "shippingOtherAmt",
          isShow: true
        }
      ],
      auditedName3: [
        {
          tabTh: "状态",
          tabItem: "orderCode",
          isShow: true
        },
        {
          tabTh: "订单号",
          tabItem: "orderCode",
          isShow: true
        },
        {
          tabTh: "运单号",
          tabItem: "shippingCode",
          isShow: true
        },
        {
          tabTh: "运单单价",
          tabItem: "shippingSettlementUnitprice",
          isShow: true
        },
        {
          tabTh: "承运人",
          tabItem: "shippingDriverName",
          isShow: true
        },
        {
          tabTh: "车牌号",
          tabItem: "shippingCarCode",
          isShow: true
        },
        {
          tabTh: "承运人电话",
          tabItem: "shippingDriverMobile",
          isShow: true
        },
        {
          tabTh: "派单日期",
          tabItem: "createTime",
          isShow: true
        },
        {
          tabTh: "接单日期",
          tabItem: "createTime",
          isShow: true
        },
        {
          tabTh: "提货日期",
          tabItem: "finishLoadTime",
          isShow: true
        },
        {
          tabTh: "签收日期",
          tabItem: "finishUnloadTime",
          isShow: true
        },
        {
          tabTh: "发货单位",
          tabItem: "shippingLoadCompany",
          isShow: true
        },
        {
          tabTh: "发货人",
          tabItem: "shippingLoadContacter",
          isShow: true
        },
        {
          tabTh: "发货地址",
          tabItem: "shippingLoadAddress",
          isShow: true
        },
        {
          tabTh: "发货省",
          tabItem: "orderId",
          isShow: true
        },
        {
          tabTh: "发货市",
          tabItem: "orderId",
          isShow: true
        },
        {
          tabTh: "发货区",
          tabItem: "orderId",
          isShow: true
        },
        {
          tabTh: "收货单位",
          tabItem: "shippingUnloadCompany",
          isShow: true
        },
        {
          tabTh: "收货人",
          tabItem: "shippingUnloadContacter",
          isShow: true
        },
        {
          tabTh: "收货地址",
          tabItem: "shippingUnloadAddress",
          isShow: true
        },
        {
          tabTh: "收货省",
          tabItem: "orderId",
          isShow: true
        },
        {
          tabTh: "收货市",
          tabItem: "orderId",
          isShow: true
        },
        {
          tabTh: "收货区",
          tabItem: "orderId",
          isShow: true
        },
        {
          tabTh: "允许亏吨范围",
          tabItem: "shippingDeficitScope",
          isShow: true
        },
        {
          tabTh: "允许亏吨比例",
          tabItem: "shippingDeficitScale",
          isShow: true
        },
        {
          tabTh: "亏吨扣费单价",
          tabItem: "shippingDeficitUnitprice",
          isShow: true
        },
        {
          tabTh: "允许涨吨范围",
          tabItem: "shippingRiseScope",
          isShow: true
        },
        {
          tabTh: "允许涨吨比例",
          tabItem: "shippingRiseScale",
          isShow: true
        },
        {
          tabTh: "涨吨扣费单价",
          tabItem: "shippingRiseUnitprice",
          isShow: true
        },
        {
          tabTh: "货损扣款",
          tabItem: "shippingDamageDeduct",
          isShow: true
        },
        {
          tabTh: "晚到扣款",
          tabItem: "shippingOverdueDeduct",
          isShow: true
        },
        {
          tabTh: "其他扣款",
          tabItem: "shippingOtherDeduct",
          isShow: true
        },
        {
          tabTh: "是否购买保险",
          tabItem: "projectSettlementWay",
          isShow: true
        },
        {
          tabTh: "保险金额",
          tabItem: "shippingPremiumAmt",
          isShow: true
        },
        {
          tabTh: "可保价金额",
          tabItem: "shippingInsuredAmt",
          isShow: true
        },
        {
          tabTh: "管理费",
          tabItem: "shippingManagementAmt",
          isShow: true
        },
        {
          tabTh: "油气卡预付",
          tabItem: "shippingCardAmt",
          isShow: true
        },
        {
          tabTh: "现金预付",
          tabItem: "shippingCashAmt",
          isShow: true
        },
        {
          tabTh: "其他费用项名称",
          tabItem: "shippingOtherAmtDesc",
          isShow: true
        },
        {
          tabTh: "费用金额",
          tabItem: "shippingOtherAmt",
          isShow: true
        }
      ],
      tabIndex: 0, // 选项卡索引
      // 时间
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        }
      },
      value1: "",
      value2: "",
      input: "",
      errMessage: "", //异常上报原因
      weight: "", //签收计费量
      etcmoney: "", //签收开票金额
      signTime: "", //签收时间
      driverMoney: "", //司机与付金额
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
      value: "",
      activeName: "first",
      input2: "",
      indexType: 1,
      file1: "", //提货上传第一张图片
      file2: "" //提货上传第二张图片
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //获取表格数据
    waybillList() {
      var start = this.page;
      var end = this.limit;
      this.$http
        .get(
          this.$api.Order.noErrOrder,
          {
            params: {
              page: start,
              rows: end,
              shippingStatus: this.indexType
            }
          },
          true
        )
        .then(res => {
          //循环判断
          res.data.data.list.forEach((item, index, arr) => {
            //判断是否购买保险
            item.shippingPremiumAmt == 0
              ? (item.shippingPremiumAmt = "否")
              : (item.projectSettlementWay = "是");
            //判断是否上传提货单
            item.finishLoadBill == ""
              ? (item.finishLoadBill = "否")
              : (item.finishLoadBill = "是");
          });
          //表格数据
          console.log(res.data.data.list);
          this.list = res.data.data.list;
          this.total = res.data.data.total;
          console.log(this.list);

          this.$store.commit("getTableData", this.list);
        })
        .catch(err => {
          console.log("失败");
        });
    },
    handleAvatarSuccess(res, file) {
      this.file1 = file;
      this.imageUrl = URL.createObjectURL(file.raw);
      let token1 = sessionStorage.getItem("token");
    },

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
    handleSuccess(res, file) {
      this.file2 = file;
      this.imageUrl1 = URL.createObjectURL(file.raw);
      let token1 = sessionStorage.getItem("token");
    },

    beforeUpload(file) {
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
    fileChange(file, fileList) {
      console.log(file, fileList);
      this.fileList = fileList;
      this.files["files"] = fileList;
    },
    handleContract() {},
    // changeHide(value) {
    //   // this.auditedData.auditedName[2].isShow = !this.auditedData.auditedName[2]
    //   //   .isShow;
    //   console.log(123213);
    // }
    handleClick(tab, event) {
      this.tabIndex = tab.index;
      if (tab.index == 0) {
        this.page = 1;
        this.limit = 1;
        this.indexType = 1;
        this.setAuditedData = this.auditedName;
        this.waybillList();
      } else if (tab.index == 1) {
        this.page = 1;
        this.limit = 1;
        this.indexType = 2;
        this.waybillList();
        this.setAuditedData = this.auditedName1;
      } else if (tab.index == 2) {
        this.page = 1;
        this.limit = 1;
        this.indexType = 3;
        this.waybillList();
        this.setAuditedData = this.auditedName2;
      } else if (tab.index == 3) {
        this.page = 1;
        this.limit = 1;
        this.indexType = 4;
        this.waybillList();
        this.setAuditedData = this.auditedName3;
      } else {
      }
    },
    // 新增订单
    addNewOrder() {
      this.$router.push("/whole/newAddOrder");
    },

    openAlert() {
      MessageBox.confirm("12123", "title", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(() => {
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      });
    },
    open() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //提货
    waybillGetgoods() {
      let getgoodsList = this.$store.state.selectData;
      if (getgoodsList.length > 1 || getgoodsList.length == 0) {
        this.$message({
          showClose: true,
          message: "请选择一个项目进行提货",
          type: "error"
        });
        return false;
      }
      this.dialogFormVisible = true;
      let orderidArray = [];
      let shippingId;
      let shippingSettlementClass;
      getgoodsList.forEach((item, index) => {
        this.shippingId = item.shippingId;
        this.shippingSettlementClass = item.shippingSettlementClass;
      });
      this.$http
        .get(
          this.$api.Basics.tmsShipping,
          {
            params: {
              shippingId: this.shippingId
            }
          },
          true
        )
        .then(res => {
          this.form.orderid = res.data.data.orderCode;
          this.form.truckingCode = res.data.data.truckingCode;
          this.form.shippingCode = res.data.data.shippingCode;
          this.form.shippingCarCode = res.data.data.shippingCarCode;
          this.form.orderid = res.data.data.orderCode;
          this.form.shippingFreightTotal = res.data.data.shippingFreightTotal;
        })
        .catch(err => {
          alert("获取失败");
        });
    },
    //提货提交
    getgoods() {
      let time = this.value1;
      let number = this.value2;
      let formData1 = new FormData();
      formData1.append("file", this.file1.raw);
      formData1.append("loadFile", this.file2.raw);
      formData1.append("shippingId", this.shippingId);
      formData1.append("finishLoadTime", time);
      formData1.append("finishLoadTotal", number);
      formData1.append("shippingSettlementClass", this.shippingSettlementClass);
      // let params = {
      //   shippingId: this.shippingId,
      //   finishLoadTime: "2019-06-25 06:25:32",
      //   finishLoadTotal: number,
      //   shippingSettlementClass: this.shippingSettlementClass,
      //   file: this.formdata
      // };
      this.$http
        .post(this.$api.Order.getgoods, formData1, true)
        .then(res => {})
        .catch(err => {});
    },
    //签收
    signGetgoods() {
      let getgoodsList = this.$store.state.selectData;
      if (getgoodsList.length > 1 || getgoodsList.length == 0) {
        this.$message({
          showClose: true,
          message: "请选择一个项目进行签收",
          type: "error"
        });
        return false;
      }
      this.dialoggetVisible = true;
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
          this.$api.Basics.tmsShipping,
          {
            params: {
              shippingId: this.shippingId
            }
          },
          true
        )
        .then(res => {
          this.form.orderid = res.data.data.orderCode;
          this.form.truckingCode = res.data.data.truckingCode;
          this.form.shippingCode = res.data.data.shippingCode;
          this.form.shippingCarCode = res.data.data.shippingCarCode;
          this.form.driver = res.data.data.shippingDriverName;
          this.form.shippingFreightTotal = res.data.data.shippingFreightTotal;
        })
        .catch(err => {
          alert("获取失败");
        });
    },
    //签收提交
    signSubmit() {
      let signTime = this.signTime;
      let weigt = this.weight;
      let money = this.etcmoney;
      let driver = this.driverMoney;
      let formData1 = new FormData();
      formData1.append("file", this.file1.raw);
      formData1.append("loadFile", this.file2.raw);
      formData1.append("shippingId", this.shippingId);
      formData1.append("finishLoadTime", signTime);
      formData1.append("finishLoadTotal", weigt);
      formData1.append("shippingInvoiceAmt", money);
      formData1.append("shippingCashAmt", driver);
      formData1.append("shippingCalculateWay", this.shippingCalculateWay);
      formData1.append("shippingSettlementClass", this.shippingSettlementClass);
      // let params = {
      //   shippingId: this.shippingId,
      //   finishLoadTime: "2019-06-25 06:25:32",
      //   finishLoadTotal: number,
      //   shippingSettlementClass: this.shippingSettlementClass,
      //   file: this.formdata
      // };
      this.$http
        .post(this.$api.Order.signSubmit, formData1, true)
        .then(res => {})
        .catch(err => {});
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
          this.$api.Basics.tmsShipping,
          {
            params: {
              shippingId: this.shippingId
            }
          },
          true
        )
        .then(res => {
          this.form.idorder = res.data.data.orderId; //订单id
          this.form.orderid = res.data.data.orderCode; //订单编号
          this.form.truckingCode = res.data.data.truckingCode; //预派车单编号
          this.form.shippingid = res.data.data.shippingId; //运单id
          this.form.shippingCode = res.data.data.shippingCode; //运单号
          this.form.shippingCarCode = res.data.data.shippingCarCode; //车牌号
          this.form.driverid = res.data.data.shippingDriverId; //司机id
          this.form.driver = res.data.data.shippingDriverName; //司机
          this.form.shippingCalculateWay = res.data.data.shippingCalculateWay; //计费分类
        })
        .catch(err => {
          alert("获取失败");
        });
    },
    //异常上报提交
    errsubmit() {
      let formData2 = new FormData();
      formData2.append("orderId", this.form.idorder);
      formData2.append("orderCode", this.form.orderid);
      formData2.append("shippingId", this.form.shippingid);
      formData2.append("shippingCode", this.form.shippingCode);
      formData2.append("shippingCarCode", this.form.shippingCarCode);
      formData2.append("shippingDriverId", this.form.driverid);
      formData2.append("shippingDriverName", this.form.driver);
      formData2.append("exceptionDesc", this.errMessage);
      if (this.idIndex == 3) {
        formData2.append("shippingExceptionType", 3);
      } else {
        formData2.append("shippingExceptionType", 2);
      }
      this.$http
        .post(this.$api.Order.errSubmit, formData2, true)
        .then(res => {})
        .catch(err => {});
    },
    //查看详情
    seedatils() {
      this.dialogseeVisible = true;
    },
    //物料信息
    seeMessage() {
      this.dialogMessageVisible = true;
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
    this.waybillList(1);
    this.$store.commit("getSingular", {
      options: this.options,
      isShow: true
    });
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