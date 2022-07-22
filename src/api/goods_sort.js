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
 * 编辑分类
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

/**
 * 添加分类按钮事件
 * @param {*} param
 * @returns
 */
export const addNewSortBtnApi = () => {
  return request({
    method: 'get',
    url: 'categories',
    params: {
      type: '2'
    }
  })
}

/**
 * 添加新商品分类
 * @param {*} param
 * @returns
 */
export const addNewSortApi = (cat) => {
  return request({
    method: 'post',
    url: 'categories',
    data: {
      cat_level: cat.cat_level,
      cat_name: cat.cat_name,
      cat_pid: cat.cat_pid
    }
  })
}
