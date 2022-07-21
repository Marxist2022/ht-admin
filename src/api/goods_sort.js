import request from '@/utils/request'
/**
 * 商品分类数据列表1
 * @param {*} param
 * @returns
 */
export const getGoodsRortList = ({ pagenum, pagesize, query }) => {
  return request({
    url: 'categories',
    params: {
      pagenum,
      pagesize,
      query
    }
  })
}
