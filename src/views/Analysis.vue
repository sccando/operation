<template>
  <div>
    <a-card :title="'项目报告(更新时间：'+headerTime2+')'" :style="{'height':h}" :bordered="false">
      <a-button slot="extra" type="primary" @click="exportFun" ghost v-if="isExport">导出</a-button>
      <a-form class="ant-advanced-search-form">
        <a-row :gutter="24">
          <a-col :span="6">
            <a-form-item label="对接人" :label-col="{span: 5}">
              <a-select v-model="salesValue" placeholder="请选择对接人" :allowClear="true" @change="selectFun('sales',$event)">
                <a-select-option v-for="i in salesList" :key="i.sukey">{{ i.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="6">
            <a-form-item label="健康度状态" :label-col="{span: 5}">
              <a-select v-model="statusValue" placeholder="请选择健康度状态" :allowClear="true" @change="selectFun('status',$event)">
                <a-select-option v-for="i in status" :key="i.value">{{ i.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="实施量级" :label-col="{span: 5}">
              <a-select placeholder="请选择实施量级" v-model="install_scaleValue" :allowClear="true" @change="selectFun('install_scale',$event)">
                <a-select-option v-for="i in install_scale" :key="i.value">{{ i.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="所属渠道" :label-col="{span: 5}">
              <a-select placeholder="请选择所属渠道" show-search v-model="defaultValue1" @change="selectFun('pcid',$event)">
                <a-select-option v-for="d in channel" :key="d.pcid">{{ d.pcname }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="6">
            <a-form-item label="所属客户" :label-col="{span: 5}">
              <a-select placeholder="请选择所属客户" show-search v-model="defaultValue2" @change="selectFun('cid',$event)"
                :filter-option="filterOption">
                <a-select-option v-for="d in client" :key="d.cid">{{ d.cname }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="6">
            <a-form-item label="项目名称" :label-col="{span: 5}">
              <a-input-search placeholder="请输入项目名称" v-model="pnameValue" @search="onSearchFun('pname',$event)"/>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <div class="filter-item" id="col-set">
              <div class="filter-common column-set" :class="{'is-selected':selectColBoolean}">
                <!-- <div @click="selectColBoolean=!selectColBoolean;">
                  <p>列配置</p>
                  <img :class="{'rotate_arrow':selectColBoolean}" src="../../assets/images/icons/icon-down-arrow.svg">
                </div> -->
                <a-button @click="selectColBoolean=!selectColBoolean;">
                  列配置
                  <a-icon :type="selectColBoolean ? 'up' : 'down'" />
                </a-button>
                <columns-list @onColumnsClick="columnsClickSuccess" :tid="'101'" :selectCol="selectColBoolean" />
              </div>
            </div>
          </a-col>
        </a-row>
      </a-form>
      <div ref="mainContent">
        <a-table
          bordered
          tableLayout="fixed"
          :scroll="scrollHei"
          @change="tableChange"
          :pagination="{ pageSize: 100,pageSizeOptions:['10','20','30','50'] }"
          size="middle"
          :columns="columns"
          :data-source="projectList"
          :locale="coptywrite">
            <!-- 项目名称 -->
            <div slot="pname" class="pnameA" slot-scope="text, record" @click="pnameClick(record)" :title="text">{{ text }}</div>
            <!-- 跟进状态 -->
            <div slot="progressState" slot-scope="text, record">
              <div v-if="!isFollow">{{progressStateText(text)}}</div>
              <div v-else class="flex flex-between" @mouseenter="rowTbHover(record, 'isShowFollow', 'hoverFollow', 'hoverSale')">
                <div>{{progressStateText(text)}}</div>
                <div v-if='hoverFollow == record.pkey'>
                  <a-popover trigger="click" placement="bottomRight" v-model="isShowFollow" @click="clickFollow(text)">
                    <template slot="content">
                      <a-radio-group v-model="checkedFollow">
                        <a-radio v-for="(state, ind) in progressState" :key="ind" :value="state.value">{{state.name}}</a-radio>
                      </a-radio-group>
                      <div style="margin-top: 16px; text-align: right">
                        <a-button size="small" @click="popCancel('isShowFollow')">取消</a-button>
                        <a-button size="small" type="primary" @click="followChange(record)">保存</a-button>
                      </div>
                    </template>
                    <a-icon type="edit" theme="twoTone" style="cursor: pointer" />
                  </a-popover>
                </div>
              </div>
            </div>
            <!-- 健康度评分 -->
            <div slot="score" slot-scope="text, record" :style="{'color': record.color}">{{ text }}</div>
            <!-- 对接人 -->
            <div slot="sales" slot-scope="text, record">
              <div v-if="!isSales">{{text}}</div>
              <div v-else class="flex flex-between" @mouseenter="rowTbHover(record, 'isShowSale', 'hoverSale', 'hoverFollow')">
                <div>{{text}}</div>
                <div v-if="record.sales != '——' && hoverSale == record.pkey">
                  <a-popover trigger="click" placement="bottomRight" v-model="isShowSale" @click="clickPop(text)">
                    <template slot="content">
                      <a-select style="width: 100px" v-model="saleAfterKey">
                        <a-select-option v-for="(sales, ind) in salesList" :key="ind" :value="sales.sukey">{{sales.name}}</a-select-option>
                      </a-select>
                      <div style="margin-top: 16px; text-align: right">
                        <a-button size="small" @click="popCancel('isShowSale')">取消</a-button>
                        <a-button size="small" type="primary" @click="salesChange(record)">保存</a-button>
                      </div>
                    </template>
                    <a-icon type="edit" theme="twoTone" style="cursor: pointer" />
                  </a-popover>
                </div>
              </div>
            </div>
            <!-- 进展 -->
            <div slot="progress" slot-scope="text, record" class="flex flex-between" @mouseenter="progressHover(record)" @mouseleave="progressLeave" style="min-height:22px">
              <div class="progress-text" :class="{'gray-text': !text}">{{text || '未填写'}}</div>
              <div v-if="hoverProgress == record.pkey" @click="editProgress(record)"><a-icon type="edit" theme="twoTone" style="cursor: pointer" /></div>
            </div>

        </a-table>
      </div>
    </a-card>

    <a-drawer
      :title="pname+'('+infoData.pcode+')'"
      width="1000"
      :closable="true"
      :visible="visible"
      @close="onClose">
      <div class>
        <div class="header-bottom clearfix" style="margin-bottom: 28px;">
          <div class="fl" style="width:calc(100% - 120px);">
            <div class="clearfix">
              <div class="meter-msg">
                <span class="his_item_title">对接人</span>
                <span style="margin-left:10px">{{infoData.sales}}</span>
              </div>
              <div class="meter-msg">
                <span class="his_item_title">立项时间</span>
                <span style="margin-left:10px">{{infoData.project_date}}</span>
              </div>
              <div class="meter-msg">
                <span class="his_item_title">立项时长</span>
                <span style="margin-left:10px">{{infoData.product_days}}天</span>
              </div>
              <div class="meter-msg">
                <span class="his_item_title">仪表总数</span>
                <span style="margin-left:10px">{{infoData.meter_count}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class>
          <div class="fl borderBlue margin28" v-if="!infoData.scoreBoo"></div>
          <div class="fl margin28" v-if="!infoData.scoreBoo">
            <span style="margin-left:10px;font-size:16px;font-weight: bold;">异常指标</span>
          </div>
          <div class="fr" style="font-weight: bold;">
            <span style="font-size:18px;">
              评分:
              <span style="font-size:32px;margin-left:10px">{{infoData.score}}</span>
            </span>
          </div>
        </div>
        <div v-if="infoData.scoreBoo" style="text-align:center;color:#778096;clear: both;">
          <div class="empty-tip" v-if="infoData.score == '空项目'">还没有安装仪表，请先安装仪表</div>
          <div class="empty-tip" v-if="infoData.score == '全部解绑'">终端全部被解绑，请先绑定终端</div>
          <div class="empty-tip" v-if="infoData.score == '不合格'">近三天未上传的仪表太多，请及时处理</div>
        </div>

        <a-table
          bordered
          v-if="!infoData.scoreBoo"
          :columns="columns1"
          :pagination="false"
          :data-source="exceptions"
        ></a-table>
        <div class style="margin: 20px 0 0;">
          <div class="fl borderBlue margin28"></div>
          <div class="fl margin28">
            <span style="margin-left:10px;font-size:16px;font-weight: bold;">评分详情</span>
          </div>
        </div>
        <a-table bordered :pagination="false" :columns="columns2" :data-source="details"></a-table>
      </div>
    </a-drawer>
    <!-- 进展描述弹框 -->
    <a-modal title="进展描述" :visible="isDesProgress" centered :maskClosable="false" @ok="confirmProgress" @cancel="cancelProgress">
      <a-textarea placeholder="请描述进展" v-model="curProgressDesc" :auto-size="{minRows: 6, maxRows: 6}"></a-textarea>
    </a-modal>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { permissionGuard } from '@/utils/permissionGuard';
import * as tableConst from '@/model/_constent';
import ColumnsList from '@/components/ColumnsList.vue'
import store from '@/store/store'

@Component({
  components: {
    ColumnsList
  }
})
export default class Analysis extends Vue {
  curEditData: any;//正在编辑的数据
  hoverProgress: string = '';//进展滑入哪行，编辑图标相应显示
  isShowEdit: boolean = false;//编辑进度icon显隐
  isDesProgress: boolean = false;//编辑进度弹框显隐
  curProgressDesc: string = '';//当前编辑的进度数据
  coptywrite: any = {
    emptyText: ' '
  };//表格默认文案
  isExport: boolean = false;//是否有导出权限
  isSales: boolean = false;//是否有修改对接人权限
  isShowSale: boolean = false;//修改对接人弹框
  saleAfterKey: string = '';//修改后的对接人key
  hoverSale: string = '';//对接人滑入哪行，编辑图标相应显示
  salesList: any[] = [];//对接人
  progressState: any[] = [];//跟进状态
  isFollow: boolean = false;//是否有跟进状态权限
  checkedFollow = null;//选中的跟进状态
  hoverFollow: string = '';//跟进状态滑入哪行，编辑图标相应显示
  isShowFollow: boolean = false;//跟进状态弹框
  columns: any[] = [];
  exceptions = [];
  details = [];
  columns1: any[] = [];
  columns2: any[] = [];
  install_scale: any[] = [];
  status: any[] = [];
  selectColBoolean: boolean = false;
  scrollHei = { x: "max-content", y: "max-content" };
  client: any[] = [];
  channel: any[] = [];
  projectList: any[] = [];
  headerTime: String = "";
  headerTime2: String = "";
  visible: boolean = false;
  pname: String = "";
  h: any = 0;
  paramObj: any = {};
  infoData: any = {
    sales: "",
    project_date: "",
    product_days: "",
    score: "",
    meter_count: "",
    pcode: ""
  };
  pcidList: any[] = [];
  client2: any[] = [];

  defaultValue1: any = 99999;
  defaultValue2: any = 99999;
  salesValue: any;
  statusValue: any = 99999;
  install_scaleValue: any = 99999;
  pnameValue: any = null;

  constructor() {
    super();
    this.isExport = permissionGuard('4bab696503ce4d21aa1f7e83b33ec5d7');
    this.isFollow = permissionGuard('db51de8754e04490a1d98c41b9349802');
    this.isSales = permissionGuard('c484a0d5011d48539d54de60db29bb1f');
    this.progressState = tableConst.progressState;
    this.salesList = tableConst.salesList;
    this.install_scale = tableConst.installScale;
    this.columns1 = tableConst.anomalyIndex;
    this.columns2 = tableConst.scoreDetail;
    this.status = tableConst.healtStatus;
  }

  mounted(){
    this.getScrollHei();
    window.addEventListener('resize', ()=>{
      this.getScrollHei();
    })
    this.getHttpList();
  }

  // 某项目具体指标
  pnameClick(e:any) {
    this.visible = true;
    this.pname = e.pname;
    this.infoData = {
      sales: e.sales,
      project_date: e.project_date.replace(/\//g, "-"),
      product_days: e.product_days,
      score: e.score,
      meter_count: e.meter_count,
      pcode: e.pcode,
      scoreBoo: e.scoreBoo
    };
    this.getHttpinfo(e.pkey);
  }
  getHttpinfo(pkey:string) {
    let param = {
      sid: store.state.userInfo.sid,
      project_health: {
        pkey: pkey, //项目key
        time: this.headerTime.replace(/\//g, "-").split(" ")[0] //报表创建日期
      }
    };
    this.$http.post("pri/project/health/project/get", param).then((res:any) => {
      const resData = res.data;
      if (res.state != 0) {
        this.$error({
          title: "温馨提示",
          content: res.msg
        });
        return;
      } else {
        this.exceptions = res.data.exceptions;
        this.exceptions.forEach((item:any) => {
          item.quota = "问题仪表占比超过" + item.quota;
        });
        this.details = res.data.details;
      }
    });
  }
  onClose() {
    this.visible = false;
  }

  // 确认编辑进展
  confirmProgress(){
    this.isDesProgress = false;
    if(!this.curProgressDesc) return
  }
  // 取消编辑进展
  cancelProgress(){
    this.curProgressDesc = '';
    this.isDesProgress = false;
  }
  // 点击编辑进展icon
  editProgress(desc:any){
    this.curProgressDesc = desc.desc;
    this.isDesProgress = true;
  }
  // 滑入滑出某行的进展
  progressHover(info:any = {}){
    this.hoverProgress = info.cid
  }
  progressLeave(){
    this.hoverProgress = ''
  }

  // 修改对接人
  salesChange(item:any){
    this.popCancel('isShowSale');
    let ind = this.salesList.findIndex(sale => sale.sukey == this.saleAfterKey);
    let val = this.salesList[ind].name;
    let param = {
      sid: store.state.userInfo.sid,
      company: {
        id: item.companyId,
        sukey: this.saleAfterKey,
        sales: val
      }
    }
    this.$http.post("/pri/project/health/sales/update", param).then(res => {
      if (res.state != 0) {
        this.$error({
          title: "温馨提示",
          content: res.msg
        });
      } else {
        this.projectList.forEach(ele => {
          if(ele.companyId == item.companyId) ele.sales = val
        })
      }
    })
  }
  // 取消修改对接人/跟进状态
  popCancel(popName:string){
    this[popName] = false;
    this.hoverFollow = '';
    this.hoverSale = '';
  }
  // 点击对接人编辑icon
  clickPop(val){
    let ind = this.salesList.findIndex(sale => sale.name == val)
    this.saleAfterKey = this.salesList[ind].sukey
  }
  // 滑入，弹框消失态时滑入才显示icon，否则弹框易乱
  rowTbHover(info:any = {}, popName:string, keyword:string, testKey:string){
    this[testKey] = '';
    !this[popName] && (this[keyword] = info.pkey)
  }

  // 跟进状态
  followChange(item:any){
    this.popCancel('isShowFollow');
    let param = {
      sid: store.state.userInfo.sid,
      proj: {
        key: item.pkey,
        pstate: this.checkedFollow
      }
    }
    this.$http.post('/pri/project/health/progressstate/update', param).then(res => {
      if(res.state!=0){
        this.$error({
          title: "温馨提示",
          content: res.msg
        });
      }else{
        // 成功，修改记录，如果不跟进，调到表格最下面
        let ind = this.projectList.findIndex((ele:any) => ele.pkey == item.pkey);
        let pro = this.projectList[ind];
        pro.progressState = this.checkedFollow;
        this.projectList.splice(ind,1)
        if(this.checkedFollow == 9){
          this.projectList.push(pro)
        }else if(this.checkedFollow == 3){
          this.projectList.unshift(pro)
        }
        this.projectList.forEach((ele,index) => {
          ele.index = index + 1;
          if(ele.progressState == 9){
            ele.score = '——';
            ele.color = '#E2E6F0';
          }else if(ele.progressState == 3){
            ele.score = ele.scoreBackup;
            this.status.forEach(k => {
              if (k.value == ele.status) {
                if(k.color) ele.color = k.color;
                if(!ele.score){
                  ele.scoreBoo = true;
                  ele.score = k.name;
                }else{
                  ele.scoreBoo = false;
                }
              }
            });
          }
        })
      }
    })
  }
  clickFollow(val:any){
    this.checkedFollow = val!=3 && val!=9 ? 3 : val;
  }
  // 回显跟进状态
  progressStateText(val:any){
    let result = '';
    this.progressState.forEach(item => {
      result = item.value == val ? item.name : '跟进'
    })
    return result
  }

  // 表格排序
  tableChange(sorter:any) {
    if (sorter && JSON.stringify(sorter) != "{}")
      this.getHttpList(false, sorter.columnKey, sorter.order.substring(0, sorter.order.length - 3));
  }
  // 获取全部项目列表
  getHttpList(type?:any, value?:any, sort?:any) {
    this.hoverFollow = '';
    this.hoverSale = '';
    this.$store.commit('isLoading', true);
    // let sale = '';
    // if(this.salesValue){
    //   let ind = this.salesList.findIndex(item => item.sukey == this.salesValue)
    //   sale = this.salesList[ind].name
    // }
    let param = {
      sid: store.state.userInfo.sid,
      project_health: {
        pcid: this.defaultValue1 == 99999 ? "" : this.defaultValue1, //渠道商ID（Integer）
        cid: this.defaultValue2 == 99999 ? "" : this.defaultValue2, //客户ID（Integer）
        pname: this.pnameValue ? (this.pnameValue + "").trim() : null, //项目名称（String）
        // sales: sale, //对接人（String）
        sukey: this.salesValue || null,
        status: this.statusValue == 99999 ? "" : this.statusValue, //健康度状态（Integer）（0：合格（有评分），1：不合格，2：空项目，3：全部解绑）
        install_scale:
          this.install_scaleValue == 99999 ? "" : this.install_scaleValue //实施量级（Integer）（0：空，10：送样，20：试点，30：微型，40：小型，50：中型，60：大型）
      },
      sort: {
        ranc: "score",
        ranw: "asc"
      }
    };
    // if(type) param.project_health[type] = value == 99999?null:value;
    if (sort) {
      param.sort.ranw = sort;
      param.sort.ranc = value == 'progressState' ? 'progress_state' : value;
    }
    this.$http.post("/pri/project/health/project/list", param).then((res:any) => {
      this.$store.commit('isLoading', false)
      const resData = res.data;
      if (res.state != 0) {
        this.$error({
          title: "温馨提示",
          content: res.msg
        });
        return;
      } else {
        if (this.client.length == 0) {
          this.client = [{ cid: 99999, cname: "全部" }];
          this.client = this.client.concat(res.data.client);
        } else {
          this.client = this.client;
        }
        if (this.channel.length == 0) {
          this.channel = [{ pcid: 99999, pcname: "全部", cid: 99999 }];
          this.channel = this.channel.concat(res.data.channel);
        } else {
          this.channel = this.channel;
        }

        this.projectList = res.data.list;
        this.projectList.forEach((item, index) => {
          for (let key in item) {
            if (!item[key] && item[key] !== 0) {
              item[key] = "——";
            }
            item.progress = ''
          }
          item.index = index + 1;
          item.scoreBackup = item.score;
          this.install_scale.forEach(i => {
            if (i.value == item.install_scale) item.install_scale = i.name;
          });
          this.status.forEach(k => {
            if (k.value == item.status) {
              if(k.color) item.color = k.color;
              if(!item.score){
                item.scoreBoo = true;
                item.score = k.name;
              }else{
                item.scoreBoo = false;
              }
              if(item.progressState == 9){
                item.score = '——';
                item.color = '#E2E6F0';
              }
            }
          });
        });

        this.headerTime = res.data.time;
        let time = this.insertStr(this.headerTime, 4, "/");
        let time1 = this.insertStr(time, 7, "/");
        let time2 = this.insertStr(time1, 10, " ");
        let time3 = this.insertStr(time2, 13, ":");
        this.headerTime2 = time3.substring(0, time3.length - 2);
        this.paramObj = param;
        setTimeout(() => {
          let arr = document.querySelectorAll("td[title='——']");
          arr.forEach(item => {
            item.innerHTML = '<span style="color:#D6DBE7;">——</span>';
          });
        }, 1000);
      }
    });
  }
  insertStr(soure:any, start:any, newStr:any) {
    return soure.slice(0, start) + newStr + soure.slice(start);
  }
   // 筛选所属客户选项
  filterOption(input:any, option:any) {
    return option.componentOptions.children[0].text.indexOf(input) >= 0;
  }
  // 健康度状态、实施量级、所属渠道、所属客户筛选操作
  selectFun(type:any, e:any) {
    if (type == "pcid" && e != null) {
      this.pcidList = [];
      this.client2 = JSON.parse(JSON.stringify(this.client));
      this.client.forEach(item => {
        if (item.pcid == e) this.pcidList.push(item);
      });
      this.client = this.pcidList;
      this.defaultValue2 = "";
    }
    this.getHttpList(type, e);
  }
  // 对接人、项目名称搜索操作
  onSearchFun(type:any, e:any) {
    this.getHttpList(type, e);
  }
  // 列配置修改后的回调
  columnsClickSuccess(e: any) {
    this.selectColBoolean = e.boo;
    if (e.list != false) {
      this.columns = [
        {
          title: "序号",
          dataIndex: "index",
          key: "index",
          width: 60,
          fixed: "left"
        }
      ];

      e.list.forEach((item:any, index:any) => {
        let data:any;

        if (item.selected == 1 || item.selected == "1" || item.checked) {
          data = {
            title: item.name || item.label,
            dataIndex: item.key || item.value,
            key: item.key || item.value,
            ellipsis: true,
            width: item.width
          };

          if (!item.key) item.key = item.value;
          // 跟进状态、项目名称左侧固定
          // if(item.key == 'progressState' || item.key == 'pname') data.fixed = 'left'
          if(item.key == 'pname') data.fixed = 'left'
          // 跟进状态、项目名称、健康度评分、对接人自定义
          if (item.key == 'progressState' || item.key == "pname" || item.key == 'score' || item.key == 'sales') {
            data.scopedSlots = { customRender: item.key };
          }
          if (item.order == 1) data.sorter = true;

          let isProState = permissionGuard('1be40dbac15c4f0d82824f9cbe743b7f');
          if(item.key == 'progressState' && !isProState){

          }else{
            this.columns.push(data);
          }
        }
      });
      let ind1 = this.columns.findIndex(item => item.key == 'progressState')
      let ind2 = this.columns.findIndex(item => item.key == 'pname')
      if(ind1 > -1 && ind2 > -1) this.swapArr(this.columns, 1, 2)
      // this.columns.push({
      //   title: '进展',
      //   dataIndex: 'progress',
      //   key: 'progress',
      //   width: 240,
      //   scopedSlots: {customRender: 'progress'}
      // })
      this.getScrollHei();
    }
  }

  // 数组两个元素换位子
  swapArr(arr:any, index1:any, index2:any){
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr
  }
  // 导出报表
  exportFun() {
    let param = {
      sid: store.state.userInfo.sid,
      project_health: this.paramObj.project_health,
      sort: this.paramObj.sort,
      columns: {
        tid: 301 //列表Id（INTEGER NOT NULL）
      }
    };
    this.$http.post("/pri/export/excel/project/health/project/list", param).then((res:any) => {
      window.open(res.data.path);
    });
  }

  // 根据屏幕尺寸获取表格高度(因筛选条件会折行)
  getScrollHei() {
    let h = document.documentElement.clientHeight || document.body.clientHeight;
    this.h = h - 64 - 34 + "px";
    let dis = this.$refs.mainContent.getBoundingClientRect().top; //表格区距离body的距离
    let w = 0;
    this.columns.forEach(item => {
      w += item.width;
    });
    this.scrollHei = { x: w, y: h - dis - 130 };
  }
}
</script>


<style lang="less">
@import "../assets/css/analysis.less";
</style>
