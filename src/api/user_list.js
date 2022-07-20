import request from '@/utils/request'
/**
 * 用户数据列表
 * @param {*} param
 * @returns
 */
export const getUsersList = ({ pagenum, pagesize, query }) => {
  return request({
    // url: `users?query=&pagenum=${{ pagenum }}&pagesize=${{ pagesize }}`,
    url: 'users',
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}
/**
 *  修改用户状态
 * @param {*} param
 * @returns
 */
export const setSwitchType = (uId, type) => {
  return request({
    method: 'put',
    url: `users/${uId}/state/${type}`

  })
}
/**
 *  添加用户
 * @param {*} data
 * @returns
 */
export const addNewUserApi = (data) => {
  return request({
    method: 'post',
    url: 'users',
    data
  })
}
/**
 *  添加用户
 * @param {*} data
 * @returns
 */
export const delUserInfo = (id) => {
  return request({
    method: 'delete',
    url: `users/${id}`
  })
}

/**
 *  编辑用户
 * @param {*} data
 * @returns
 */
export const editUserInfo = (id, email, mobile) => {
  return request({
    method: 'put',
    url: `users/${id}`,
    data: {
      email,
      mobile
    }
  })
}
/**
 *  设置用户角色
 * @param {*} data
 * @returns
 */
export const setUserInfo = (id, rid) => {
  return request({
    method: 'put',
    url: `users/${id}`,
    data: {
      rid
    }
  })
}
/**
 *  获取角色列表
 * @param {*} data
 * @returns
 */
export const getrolesList = () => {
  return request({
    url: 'roles'
  })
}
