import request from '@/utils/request'
/**
 * 商品分类数据列表1
 * @param {*} param
 * @returns
 */
export const getGoodsList = ({ pagenum, pagesize, query }) => {
  return request({
    url: 'goods',
    params: {
      pagenum,
      pagesize,
      query
    }
  })
}

/**
 *  删除货物1
 * @param {*} data
 * @returns
 */
export const delGoodsInfo = (id) => {
  return request({
    method: 'delete',
    url: `goods/${id}`
  })
}

/**
 *  编辑商品1
 * @param {*} data
 * @returns
 */
export const editGoodsInfo = (id, goodsName, goodsPrice, goodsNumber, goodsWeight) => {
  return request({
    method: 'put',
    url: `goods/${id}`,
    data: {
      goods_name: goodsName,
      goods_price: goodsPrice,
      goods_number: goodsNumber,
      goods_weight: goodsWeight
    }
  })
}
/**
 *  获取商品分类管理
 * @param {*} data
 * @returns
 */
export const getGoodsCategoriesListApi = () => {
  return request({
    method: 'get',
    url: 'categories'

  })
}
/**
 *  分类参数管理
 * @param {*} data
 * @returns
 */
export const getattributesListApi = (id) => {
  return request({
    method: 'get',
    url: `categories/${id}/attributes`,
    params: {
      sel: 'many'
    }
  })
}
