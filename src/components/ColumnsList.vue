<template>
    <div class="select-box"  v-if="selectCol" style="width: 490px;">
        <div >
            <div>
                <a-checkbox :indeterminate="indeterminate" :checked="allChecked" @change="onCheckAllChange">
                    {{allChecked ? '全不选' : '全选'}}
                </a-checkbox>
            </div>
            <div style="padding:10px 0;border-top:1px solid #d5dbe8;border-bottom:1px solid #d5dbe8;height: 200px;overflow-y: auto;">
                <a-checkbox-group  v-model="checkOptions" :options="checkOptionsOne"  @change="onChange"></a-checkbox-group>
            </div>
            <div class="operate-btn">
                <a-button type="default"  @click="cancelColSet()">取消</a-button>
                <a-button type="primary" @click="saveColSet()">提交</a-button>
            </div>
        </div>
    </div>
</template>

<style lang="less">
.tip-msg>img{
    position: relative;
    right: 0;
}
</style>

<script lang="ts">

import {
    Component,
    Prop,
    Vue,
    Emit
} from 'vue-property-decorator';
import store from '@/store/store'

const defaultCheckedList = ['Apple', 'Orange'];
@Component({})
export default class columnsList extends Vue {

    private allChecked: boolean = true; //是否全选

    private indeterminate: boolean = true;

    private colSetList:any = []; //获取的列配置情况

    private originColSetList:any = []; //备份列配置，取消时使用

    private checkOptionsOne: any= []; //复选框用列配置

    private tableCol: any = []; //表格显示用列

    private colSetLoading: boolean = false; //保存列配置loading

    private cid:any = '';

    private cunchu:any = [];

    private boo:any = false;

    private isRight:any = false;

    private customList:any = [];

    private checkOptions:any = [];

    private plainOptions:any = [];

    @Prop({
        type: Boolean,
        default: false,
    })
    private selectCol:boolean;

    @Prop({
        type: String,
        default: "101",
    })
    private tid!: String;

    @Prop({
        type: String,
        default: '',
    })
    private company!:String;

    // @Prop({
    //     type: Array,
    //     default: [],
    // })
    // private noColum!:any;

    @Emit("onColumnsClick")
    private columnsClick(e) {
    }
    private formateColSet(oldCol) {
        this.tableCol = [];
        let newCol = [];
        this.customList = [];
        this.plainOptions =[];
        oldCol.forEach(item => {
            let obj: any = {};
            obj.label = item.name;
            obj.value = item.key;
             obj.width = item.width;
            obj.checked = item.selected == "1" ? true : false;
            if( item.selected == "1"){
                this.checkOptions.push(item.key)
            }
            if (!obj.checked) {
                this.allChecked = false;
            } else {
                this.tableCol.push(item.key);
            }
            this.plainOptions.push(item.key)
            if (item.custom == 1) this.customList.push(item);
            obj.order = item.order;
            newCol.push(obj);
        });
        this.checkOptionsOne = JSON.parse(JSON.stringify(newCol));
        this.originColSetList = JSON.parse(JSON.stringify(newCol));
    }

    private getColumnList(e: any) {
            let data = {
                "columns": {
                    "tid": 301, //列表Id（INTEGER NOT NULL）
                }
            }
            this.$http.post('/pri/column/config/get',data).then((res) => {
                if(res){
                    this.colSetList = res.data.columns;
                    // this.colSetList.sort(function (a, b) {
                    //     return a.order - b.order;
                    // });
                    this.columnsClick({list:this.colSetList,boo:this.selectCol});
                    this.formateColSet(this.colSetList);
                    this.queryWid();
                }
            });
    }
         // 获取元素距离浏览器最右的距离
    private getOffsetRight(obj) {
    var tmp = obj.offsetLeft;
    var val = obj.offsetParent;
    while (val != null) {
      tmp += val.offsetLeft;
      val = val.offsetParent;
    }
    return tmp;
  }


    private queryWid() {
        let w = document.documentElement.clientWidth || document.body.clientWidth;
        let col = document.getElementById("col-set");
        if (col) {
          let r = this.getOffsetRight(col);
          let e = col.offsetWidth;
          let i = col.offsetTop;
          if (w - r - e < 360) {
            this.isRight = i < 82 ? true : false;
          } else {
            this.isRight = false;
          }
        }
      }

      // 取消列配置编辑
    cancelColSet() {
        this.checkOptionsOne = JSON.parse(JSON.stringify(this.originColSetList));
        //  this.selectCol = false;
         this.columnsClick({list:false,boo:false});
    }
    onCheckAllChange(e) {
    let plainOption = this.plainOptions
      Object.assign(this, {
        checkOptions: e.target.checked ? plainOption : [],
        indeterminate: false,
        allChecked: e.target.checked,
      });
    }
    onChange(checkedList) {
      this.indeterminate = !!checkedList.length && checkedList.length < this.plainOptions.length;
      this.allChecked = checkedList.length === this.plainOptions.length;
    }

  reverseFormatColSet(arr) {
        let newArr = [];
        arr.forEach(item => {
            let obj: any = {};
            obj.key = item.value;
            obj.selected = item.checked ? "1" : "0";
            // obj.order = item.order;
            newArr.push(obj);
        });
        return newArr;
    }
    // 保存列配置修改
    saveColSet() {
        let list = JSON.parse(JSON.stringify(this.originColSetList));
        list.forEach((item)=>{
            item.checked = false;
            this.checkOptions.forEach(element => {
                if(item.value == element) item.checked = true;
            })
        });
        this.checkOptionsOne = JSON.parse(JSON.stringify(list));
        let cols = this.reverseFormatColSet(this.checkOptionsOne);
        let param ={
                columns: {
                    "tid": 301, //列表Id（INTEGER NOT NULL）
                    "columns": cols
                }
            }
        this.$http.post('/pri/column/config/update',param).then((res) => {
             this.columnsClick({list:this.checkOptionsOne,boo:false});
        });
    }
    constructor() {
        super();
        this.getColumnList()
    }
    /****
     * {...restProps}
     */
}
</script>
