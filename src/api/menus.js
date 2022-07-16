import request from '@/utils/request'
/**
 * 获取menu列表
 * @param {*} param
 * @returns
 */
export const getMenus = () => {
  return request({
    url: 'menus'
  })
}
