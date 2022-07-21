import Vue from 'vue'
import dayjs from 'dayjs'
// 加载中文语言包
import 'dayjs/locale/zh-cn'
// 符合es6的引用
// import relativeTime from 'dayjs/plugin/relativeTime'
// dayjs.extend(relativeTime)
// dayjs默认语言是英语，我们这里配置位中文
dayjs.locale('zh-cn')// 全局使用
// dayjs（）获取当前最新时间
Vue.filter('relativeTime', value => { return dayjs(value * 1000).format('YYYY-MM-DD') })
// 显示
