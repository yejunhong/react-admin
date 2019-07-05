import request from '../Request';
import md5 from 'js-md5';
/**
 * 操作用户接口
 */
class User {

  /**
   * 用户登录接口
   * @url /V1/MuzenBAS/User/Login
   * @body {"id": "账户", "password":"32位md5密码"}
   * @res {
   *        "code": 错误码,
   *        "info":"错误描述信息",
   *        "data":{
   *          "token":"token秘钥",
   *        }
   *      }
   */
  public async GetMenu() {
    // console.log(test)
    const list = await request.Get('http://127.0.0.1:12345/menu.json');
    return list;
  }

  /**
   * 用户登录接口
   * @url /V1/MuzenBAS/User/Login
   * @body {"id": "账户", "password":"32位md5密码"}
   * @res {
   *        "code": 错误码,
   *        "info":"错误描述信息",
   *        "data":{
   *          "token":"token秘钥",
   *        }
   *      }
   */
  public async Login(id: any, password: any): Promise<any> {
    // const info = await request.Post('/MuzenBAS/User/Login', {name: id, password: md5(password)});
    const info = await request.Post('/MuzenBAS/User/Login', {id: parseInt(id, 10), password: md5(password)});
    if (info.code === 0) { // 登录成功返回
      return info.data.token;
    }
    return false; // 登录失败返回
  }

  /**
   * 注册接口
   * @url /V1/MuzenBAS/User/Register
   * @body {
   *     "name":"昵称",
   *     "password":"密码",
   *     "role":1,
   *     "role_status": "0：启用，1：禁用",
   *   }
   * @res {
   *        "code": 错误码,
   *        "info":"错误描述信息",
   *        "data":{
   *          "id":"用Id",
   *        }
   *      }
   */
  public async Register(name: string, password: string, role: number, roleStatus: number) {
    // console.log(test)
    const list = await request.Post('/MuzenBAS/User/Register', {name, password, role, role_status: roleStatus});
    console.log(list);
    return list;
  }

  /**
   * 修改密码
   * @url /V1/MuzenBAS/User/PWChange
   * @body { "id":"用户ID", "password": "新密码" }
   * @res { "code": 错误码, "info": "错误描述信息" }
   */
  public async UPassword() {
    // console.log(test)
  }

  /**
   * 用户注销删除接口
   * @url /V1/MuzenBAS/User/Del
   * @body { "id":"用户ID" }
   * @res { "code": 错误码, "info": "错误描述信息" }
   */
  public async DelUser() {
    // console.log(test)
  }

  /**
   * 用户角色修改接口
   * @url /V1/MuzenBAS/User/UserRoleChange
   * @body { "id":"用户ID", "role": "角色ID" }
   * @res { "code": 错误码, "info": "错误描述信息" }
   */
  public async URole() {
    // console.log(test)
  }

  /**
   * 用户角色状态接口
   * @url /V1/MuzenBAS/User/UserRoleStatusChange
   * @body { "id":"用户ID", "role_status": "0：启用，1：禁用" }
   * @res { "code": 错误码, "info": "错误描述信息" }
   */
  public async URoleStatus() {
   // console.log(test)
  }

  /**
   * 新增角色接口
   * @url /V1/MuzenBAS/User/RoleAdd
   * @body { "name": "角色名称" }
   * @res { "code": 错误码, "info": "错误描述信息" }
   */
  public async ARole() {
    // console.log(test)
  }

  /**
   * 修改角色权限接口
   * @url /V1/MuzenBAS/User/RoleRightChange
   * @body { "id": "角色名称", "list": [{"operate": "操作权限", "right_id": "被操作功能"}] }
   * @res { "code": 错误码, "info": "错误描述信息" }
   */
  public async URolePower() {
    // console.log(test)
  }

  /**
   * 角色删除接口
   * @url /V1/MuzenBAS/User/RoleDel
   * @body { "id":"角色ID" }
   * @res { "code": 错误码, "info": "错误描述信息" }
   */
  public async DelRole() {
    // console.log(test)
  }

  /**
   * 获取角色列表
   * @url /V1/MuzenBAS/User/RoleGet
   * @body {}
   * @res {
   *        "code": 错误码,
   *        "info": "错误描述信息",
   *        "data": {
   *          "list": [
   *                {
   *                  "id": 角色id,
   *                  "name":"名字",
   *                }
   *             ]
   *        }
   *      }
   */
  public async GetRoles() {
    const res = await request.Post('/MuzenBAS/User/RoleGet', {});
    if (res.code === 0) { // 创建成功
      return res.data.list;
    }
    return false;
  }

  /**
   * 获取权限列表
   * @url /V1/MuzenBAS/User/RightGet
   * @body { "page_size": "每页数量", "page_index": "某页数据" }
   * @res {
   *        "code": 错误码,
   *        "info": "错误描述信息",
   *        "data": {
   *          "page_index": 页码,
   *          "total_count": 总条数,
   *          "list": [
   *                {
   *                  "id": 权限id,
   *                  "name":"权限名字"，
   *                }
   *             ]
   *        }
   *      }
   */
  public async GetPowers() {
    // console.log(test)
  }

}

export default new User();
