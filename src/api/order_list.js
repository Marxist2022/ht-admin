import request from '@/utils/request'
/**
 * 获取商品列表
 * @param {*} param
 * @returns
 */
export const getOrdersListApi = ({ query, pagenum, pagesize }) => {
  return request(
    {
      method: 'GET',
      url: 'orders',
      params: {
        query,
        pagenum,
        pagesize
      }
    }
  )
}
/**
 * 修改地址
 * @param {*} param
 * @returns
 */
export const setkuaidi = ({ query, pagenum, pagesize }) => {
  return request(
    {
      method: 'GET',
      url: '/kuaidi/:id',
      params: {
        query,
        pagenum,
        pagesize
      }
    }
  )
}
