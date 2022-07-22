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
/**
 * 商品分类数据列表1
 * @param {*} param
 * @returns
 */
export const delSortApi = (id) => {
  return request({
    method: 'delete',
    url: `categories/${id}`
  })
}
/**
 * 商品分类数据列表1
 * @param {*} param
 * @returns
 */
export const eidtSortApi = (id, catName) => {
  return request({
    method: 'put',
    url: `categories/${id}`,
    data: {
      cat_name: catName
    }
  })
}
