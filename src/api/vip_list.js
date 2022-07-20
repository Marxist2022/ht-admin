import request from '@/utils/request'
/**
 * 所有权限列表
 * @param {*} param
 * @returns
 */
export const getRightsList = (type) => {
  return request({
    url: `rights/${type}`

  })
}
