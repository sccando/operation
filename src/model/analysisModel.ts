import { BaseSelection, IndexDetail } from "./baseSelection";

const salesList = [
  new BaseSelection(99999, '全部'),
  new BaseSelection('001lWj4h', '谷鹄翔'),
  new BaseSelection('000pcZw6', '祁智恒'),
  new BaseSelection('006haoVg', '贾梓筠'),
  new BaseSelection('5b5ac6cb77494ec5bd2fbd9e8ba93a61', '严国伟'),
  new BaseSelection('002g6z3p', '李博'),
  new BaseSelection('ebbe127152604a1bb9f654d454c513cf', '吴伟'),
  new BaseSelection('eff8626ad6ac4642aa9ae7f02f13aaeb', '高宝'),
  new BaseSelection('bbad33ab264b40f78f54ba5300bfe37b', '杨爽'),
  new BaseSelection('acd53727761f44cc81ad8e208ee4521f', '刘熙'),
  new BaseSelection('ec982ef6ff624bf399dee0a6164acd41', '崔克楠'),
  new BaseSelection('0088VH2O', '刘栓浩'),
  new BaseSelection('a01788cef8e04a739d7ab52cca54e6f1', '高浩坚'),
];

const installScaleList = [
  new BaseSelection(99999, '全部'),
  new BaseSelection(0, '空'),
  new BaseSelection(10, '送样（0-5）'),
  new BaseSelection(20, '试点（6-10）'),
  new BaseSelection(30, '微型（11-50）'),
  new BaseSelection(40, '小型（51-200）'),
  new BaseSelection(50, '中型（201-400）'),
  new BaseSelection(60, '大型（>400）'),
];

const healthDegreeList = [
  new BaseSelection(99999, '全部'),
  new BaseSelection(0, '合格', '#595959'),
  new BaseSelection(1, '不合格', '#F13943'),
  new BaseSelection(2, '空项目', '#E2E6F0'),
  new BaseSelection(3, '全部解绑', '#F13943'),
]

export const filterCondition = [
  {label: '对接人', key: 'sukey', list: salesList},
  {label: '健康度状态', key: 'status', list: healthDegreeList},
  {label: '实施量级', key: 'install_scale', list: installScaleList},
]

export const progressState = [
  new BaseSelection(3, "跟进"),
  new BaseSelection(9, "不跟进")
];

export const anomalyIndex = [
  new IndexDetail('指标', 'name', 'name', true),
  new IndexDetail('问题仪表数', 'count', 'count', true),
  new IndexDetail('问题仪表占比', 'rate', 'rate', true),
  new IndexDetail('不合格原因', 'quota', 'quota', true),
];

export const scoreDetail = [
  new IndexDetail("指标", "name", "name", true),
  new IndexDetail("问题仪表数", "count", "count", true),
  new IndexDetail("问题仪表占比", "rate", "rate", true)
];
