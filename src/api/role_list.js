import request from '@/utils/request'
/**
 * 用户数据列表
 * @param {*} param
 * @returns
 */
export const getRolesList = () => {
  return request({
    url: 'roles'
  })
}
/**
 * 删除角色
 * @param {*} param
 * @returns
 */
export const delRoleInfo = (id) => {
  return request({
    method: 'delete',
    url: `roles/${id}`

  })
}
/**
 * 添加角色
 * @param {*} param
 * @returns
 */
export const addRoleInfo = (name, desc) => {
  return request({
    method: 'POST',
    url: 'roles',
    data: {
      roleName: name,
      roleDesc: desc
    }
  })
}

/**
 *  编辑角色列表查询
 * @param {*}
 * @returns
 */
export const findRoleApi = (id) => {
  return request({
    url: `roles/${id}`
  })
}

/**
 *  编辑角色列表提交
 * @param {*} data
 * @returns
 */
export const editRoleApi = (id, { roleName, roleDesc }) => {
  return request({
    method: 'put',
    url: `roles/${id}`,
    data: {
      roleName,
      roleDesc
    }
  })
}

/**
 *  获取权限列表
 * @param {*}
 * @returns
 */
export const getPermissions = () => {
  return request({
    url: 'rights/tree'

  })
}

/**
 *  角色授权
 * @param {*}
 * @returns
 */
export const setRights = (roleId, rids) => {
  return request({
    method: 'post',
    url: `roles/${roleId}/rights`,
    data: {
      rids
    }
  })
}
/**
 *  删除角色指定权限
 * @param {*}
 * @returns
 */
export const delRoleRight = (roleId, rightId) => {
  return request({
    method: 'delete',
    url: `roles/${roleId}/rights/${rightId}`
  })
}
