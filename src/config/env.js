
/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 老项目域名地址
 * khglUrl: 客户管理域名地址
 * dicUrl : 字典服务器地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * welUrl :默认欢迎页
 *
 */

let baseUrl = ''
const iconfontVersion = ['567566_r22zi6t8noas8aor', '599693_0b5sleso3f1j1yvi', '667895_xte3dcfrvbo6r']
const iconfontUrl = `//at.alicdn.com/t/font_$key.css`
const codeUrl = `http://192.168.0.2:9999/admin/code`
  if (process.env.NODE_ENV == 'development') {
    baseUrl = `http://192.168.0.2:9999/`;
    //  baseUrl = `http://127.0.0.1:9999/`
} else if (process.env.NODE_ENV == 'production') {
  baseUrl = `http://47.105.163.104:9999/`;
}

export {
  baseUrl,
  iconfontUrl,
  iconfontVersion,
  codeUrl
}
