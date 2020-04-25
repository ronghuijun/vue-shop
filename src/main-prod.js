// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
//导入全局样式表
import "./assets/css/global.css";
//import "./plugins/element.js";

//导入富文本编辑器
import VueQuillEditor from "vue-quill-editor"; // 调用富文本编辑器


Vue.config.productionTip = false;
//导入字体图标
import "./assets/fonts/iconfont.css";
import TreeTable from "vue-table-with-tree-grid";
//导入全局样式表
import axios from "axios";

//导入nprogress对应的js和css
import NProgress from "nprogress";

//配置请求根路径
axios.defaults.baseURL = "https://www.liulongbin.top:8888/api/private/v1/";

//在request拦截器中，展示进度条NProgress.start()
axios.interceptors.request.use(config => {
  NProgress.start();
  //console.log(config);
  config.headers.Authorization = window.sessionStorage.getItem("token");

  //最后必须returnF
  return config;
});
//在response拦截器中，隐藏进度条NProgress.done()
axios.interceptors.response.use(config => {
  NProgress.done();
  return config;
});

Vue.prototype.$http = axios;

Vue.component("tree-table", TreeTable);
//将富文本编辑器注册为全局可用的组件
Vue.use(VueQuillEditor);

Vue.filter("dateFormat", function(originVal) {
  const dt = new Date(originVal);
  const y = dt.getFullYear();
  const m = (dt.getMonth() + 1 + "").padStart(2, "0");
  const d = (dt.getDate() + "").padStart(2, "0");

  const hh = (dt.getHours() + "").padStart(2, "0");
  const mm = (dt.getMinutes() + "").padStart(2, "0");
  const ss = (dt.getSeconds() + "").padStart(2, "0");

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
