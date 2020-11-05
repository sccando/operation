export const progressState = [
  { name: '跟进', value: 3 },
  { name: '不跟进', value: 9}
];

export const salesList = [
  { sukey: "001lWj4h", name: "谷鹄翔" },
  { sukey: '000pcZw6', name: "祁智恒" },
  { sukey: '006haoVg', name: "贾梓筠" },
  { sukey: '5b5ac6cb77494ec5bd2fbd9e8ba93a61', name: "严国伟" },
  { sukey: '002g6z3p', name: "李博" },
  { sukey: 'ebbe127152604a1bb9f654d454c513cf', name: "吴伟" },
  { sukey: 'eff8626ad6ac4642aa9ae7f02f13aaeb', name: "高宝" },
  { sukey: 'bbad33ab264b40f78f54ba5300bfe37b', name: "杨爽" },
  { sukey: 'acd53727761f44cc81ad8e208ee4521f', name: "刘熙" },
  { sukey: 'ec982ef6ff624bf399dee0a6164acd41', name: "崔克楠" },
  { sukey: '0088VH2O', name: "刘栓浩" },
  { sukey: 'a01788cef8e04a739d7ab52cca54e6f1', name: "高浩坚" }
];

export const installScale = [
  { name: "全部", value: 99999 },
  { name: "空", value: 0 },
  { name: "送样（0-5）", value: 10 },
  { name: "试点（6-10）", value: 20 },
  { name: "微型（11-50）", value: 30 },
  { name: "小型（51-200）", value: 40 },
  { name: "中型（201-400）", value: 50 },
  { name: "大型（>400）", value: 60 }
];

export const anomalyIndex = [
  { 
    title: "指标",
    dataIndex: "name",
    key: "name",
    ellipsis: true
  },
  {
    title: "问题仪表数",
    dataIndex: "count",
    key: "count",
    ellipsis: true
  },
  {
    title: "问题仪表占比",
    dataIndex: "rate",
    key: "rate",
    ellipsis: true
  },
  {
    title: "不合格原因",
    dataIndex: "quota",
    key: "quota",
    ellipsis: true
  }
];

export const scoreDetail = [
   { 
    title: "指标",
    dataIndex: "name",
    key: "name",
    ellipsis: true
  },
  {
    title: "问题仪表数",
    dataIndex: "count",
    key: "count",
    ellipsis: true
  },
  {
    title: "问题仪表占比",
    dataIndex: "rate",
    key: "rate",
    ellipsis: true
  }
]

export const healtStatus = [
  {
    name: "全部",
    value: 99999
  },
  {
    name: "合格",
    color: "#595959",
    value: 0
  },
  {
    name: "不合格",
    color: "#F13943",
    value: 1
  },
  {
    name: "空项目",
    color: "#E2E6F0",
    value: 2
  },
  {
    name: "全部解绑",
    color: "#F13943",
    value: 3
  }
]