import request from '../Request';
import Time from '../../Lib/Time';

interface MessageTemp {
  id?: number;
  title?: string;
  content?: any;
  msg_type?: number;
  jump_url?: string;
}

interface AdParam {
  id?: number;
  title?: string,						// 标题
  img?: string,							// 图片
  type?: number,								// 广告类型，0:闪屏,1:首页弹窗
  start_time?: number,
  end_time?: number,
  jump_type?: number,						// 跳转类型0:无,1:h5,2:内部app
  jump_content?: string,					// 跳转内容
}
/**
 * 操作用户接口
 */
class System {

  /**
   * 新增app消息推送
   * @url /MuzenBAS/User/PushAdd
   * @body {
   *    'title': '', // 标题
   *    'content': '', // 内容
   *    'user_type': 1, // 用户类型1:全部,2:条件,3:指定
   *    'user':'test', // 条件
   *    'system_type':1, // 1:全部,2:android,3:ios
   *    'push_time':1,
   *    'notify_app ':1, //是否同步到系统消息，0:是,1:否
   *    'jump_type ':1, //跳转类型0:无,1:h5,2:内部app
   *    'jump_content':'test',	 //跳转内容
   * }
   * @res {
   *        'code': 错误码,
   *        'info':'错误描述信息',
   *      }
   */
  public async CreatePush(param: any) {
    if (param.push_time !== ''){
      param.push_time = Time.Stamp(param.push_time);
    } else {
      param.push_time = 0;
    }
    const p = {
      title: param.title, // 标题
      // content: param.content, // 内容
      jump_content: 'test',	 // 跳转内容
      jump_type: param.jump_type, // 跳转类型0:无,1:h5,2:内部app
      user: '1111', // 条件
      user_type: param.user_type, // 用户类型1:全部,2:条件,3:指定
      notify_app: param.notify_app, // 是否同步到系统消息，0:是,1:否
      push_time: param.push_time,
      system_type: param.system_type, // 1:全部,2:android,3:ios
    };
    const res = await request.Post('/MuzenBAS/User/PushAdd', p);
    if (res.code === 0) { // 创建成功
      return true;
    }
    return false;
  }

  /**
   * 获取app消息推送列表
   * @url /MuzenBAS/User/PushGet
   * @param param = {
   *    'user_type':1,							//用户类型1:全部,2:条件,3:指定
   *    'status':'test',	              		//状态1:删除2:待推送,4:已推送,8:推送失败
   *    'system_type':1,						// 1:全部,2:android,3:ios
   *    'push_time':1,
   * }
   * @param page 当前页数
   * @param pageSize 每天显示数量
   * @res 返回对象，详情查看文档
   */
  public async GetPushList(param: any, page: number, pageSize: number = 20) {
    param = {...param, ...{page_size: pageSize, page_index: page}};
    const res = await request.Post('/MuzenBAS/User/PushGet', param);
    if (res.code === 0) { // 创建成功
      return res.data;
    }
    return false;
  }

  /**
   * 根据ID删除app消息推送
   * @url /MuzenBAS/User/PushDel
   * @param id 需要删除的Id
   * @res 返回对象，详情查看文档
   */
  public async DeletePush(id: number) {
    const res = await request.Post('/MuzenBAS/User/PushDel', {id});
    if (res.code === 0) { // 创建成功
      return true;
    }
    return false;
  }

  /**
   * 新增广告
   * @url /MuzenBAS/User/AdvertisingAdd
   * @body {
   *    'title': '', // 标题
   *    'img': '', // 图片
   *    'type': 1, // 广告类型，0:闪屏,1:首页弹窗
   *    'start_time':1, // 1:全部,2:android,3:ios
   *    'end_time':1,
   *    'jump_type ':1, // 跳转类型0:无,1:h5,2:内部app
   *    'jump_content':'test',	 // 跳转内容
   * }
   * @res {
   *        'code': 错误码,
   *        'info':'错误描述信息',
   *      }
   */
  public async CreateAd(param: any) {
    // 如果设置了时间
    const p: AdParam = {
      title: param.title,						// 标题
      img: param.img,							// 图片
      type: param.type,								// 广告类型，0:闪屏,1:首页弹窗
      jump_type: param.jump_type,						// 跳转类型0:无,1:h5,2:内部app
      jump_content: param.jump_content,					// 跳转内容
    };
    if (param.time.length > 0) {
      p.start_time = Time.Stamp(param.time[0]);
      p.end_time = Time.Stamp(param.time[1]);
    } else {
      p.start_time = 0;
      p.end_time = 0;
    }
    let url: string = '/MuzenBAS/User/AdvertisingAdd';
    // 如果
    if (param.id !== 0) {
      p.id = param.id;
      url = '/MuzenBAS/User/AdvertisingUpdate';
    }
    const res = await request.Post(url, p);
    if (res.code === 0) { // 创建成功
      return true;
    }
    return res.info;
  }

  /**
   * 获取广告列表
   * @url /MuzenBAS/User/AdvertisingGet
   * @param param {
   *    'title':'test',	    // 标题
   *    'type':1,							// 广告类型，0:闪屏,1:首页弹窗
   *    'start_time':1,			// 开始时间 时间戳
   *    'end_time':1, // 结束时间 时间戳
   *    'status':1, // 状态1:删除2:待推送,4:已推送,8:推送失败
   * }
   * @param page 当前页数
   * @param pageSize 每天显示数量
   * @res 返回对象，详情查看文档
   */
  public async GetAdList(param: any, page: number, pageSize: number = 20) {
    param = {...param, ...{page_size: pageSize, page_index: page}};
    const res = await request.Post('/MuzenBAS/User/AdvertisingGet', param);
    if (res.code === 0) { // 创建成功
      return res.data;
    }
    return false;
  }

  /**
   * 根据ID删除广告信息
   * @url /MuzenBAS/User/AdvertisingDel
   * @param id 需要删除的Id
   * @res 返回对象，详情查看文档
   */
  public async DeleteAd(id: number) {
    const res = await request.Post('/MuzenBAS/User/AdvertisingDel', {id});
    if (res.code === 0) { // 删除成功
      return true;
    }
    return res.info;
  }

  /**
   * 修改广告状态
   * @url /MuzenBAS/User/AdvertisingStatus
   * @param id 修改的Id
   * @param status 状态 2:上线,4:下线
   * @res {
   *        'code': 错误码,
   *        'info':'错误描述信息',
   *      }
   */
  public async UpdateAdStatus(id: any, status: number) {
    // const bigId = BigInt.asUintN(64, id.toString());
    const res = await request.Post('/MuzenBAS/User/AdvertisingStatus', {id, status});
    if (res.code === 0) { // 创建成功
      return true;
    }
    return res.info;
  }

  /**
   * 修改广告
   * @url /MuzenBAS/User/AdvertisingUpdate
   * @body {
   *    'title': '', // 标题
   *    'img': '', // 图片
   *    'type': 1, // 广告类型，0:闪屏,1:首页弹窗
   *    'start_time':1, // 1:全部,2:android,3:ios
   *    'end_time':1,
   *    'jump_type ':1, // 跳转类型0:无,1:h5,2:内部app
   *    'jump_content':'test',	 // 跳转内容
   * }
   * @res {
   *        'code': 错误码,
   *        'info':'错误描述信息',
   *      }
   */
  public async UpdateAd(param: any) {
    const res = await request.Post('/MuzenBAS/User/AdvertisingUpdate', param);
    if (res.code === 0) { // 创建成功
      return true;
    }
    return false;
  }

  /**
   * 新增消息模板
   * @url /MuzenBAS/User/UserMsgTemplateAdd
   * @body {
   *    'title': '', // 标题
   *    'content': '', // 内容
   *    'msg_type': 1,
   *    'jump_url': '', // 跳转内容
   * }
   * @res {
   *        'code': 错误码,
   *        'info':'错误描述信息',
   *      }
   */
  public async CreateMessageTemp(param: any) {
    const p: MessageTemp = {
      title: param.title, // 标题
      content: param.content,	// 内容
      msg_type: param.msg_type,	//
      jump_url: param.jump_url, // 跳转内容
    };
    let url: string = '/MuzenBAS/User/UserMsgTemplateAdd';
    if (param.id > 0) {
      p.id = param.id;
      url = '/MuzenBAS/User/UserMsgTemplateUpdate';
    }
    const res = await request.Post(url, p);
    if (res.code === 0) { // 创建成功
      return true;
    }
    return res.info;
  }

  /**
   * 获取消息模板列表
   * @url /MuzenBAS/User/UserMsgTemplateGet
   * @param param {
   *    'title':'test',	    // 标题
   * }
   * @param page 当前页数
   * @param pageSize 每天显示数量
   * @res 返回对象，详情查看文档
   */
  public async GetMessageTempList(param: any, page: number = 1, pageSize: number = 20) {
    param = {...param, ...{page_size: pageSize, page_index: page}};
    const res = await request.Post('/MuzenBAS/User/UserMsgTemplateGet', param);
    if (res.code === 0) { // 创建成功
      return res.data;
    }
    return false;
  }

  /**
   * 根据ID删除消息模板
   * @url /MuzenBAS/User/UserMsgTemplateDel
   * @param id 需要删除的Id
   * @res 返回对象，详情查看文档
   */
  public async DeleteMessageTemp(id: number) {
    const res = await request.Post('/MuzenBAS/User/UserMsgTemplateDel', {id});
    if (res.code === 0) { // 删除成功
      return true;
    }
    return false;
  }

  /**
   * 修改消息模板状态
   * @url /MuzenBAS/User/UserMsgTemplateStatus
   * @param id 修改的Id
   * @param status 状态 2:上线,4:下线
   * @res {
   *        'code': 错误码,
   *        'info':'错误描述信息',
   *      }
   */
  public async UpdateMessageTempStatus(id: number, status: number) {
    const res = await request.Post('/MuzenBAS/User/UserMsgTemplateStatus', {id, status});
    if (res.code === 0) { // 创建成功
      return true;
    }
    return res.info;
  }

  /**
   * 获取消息模板类型
   * @url /MuzenBAS/User/UserMsgTypeGet
   * @res 返回对象，详情查看文档
   */
  public async GetMessageTempType() {
    const res = await request.Post('/MuzenBAS/User/UserMsgTypeGet', {});
    if (res.code === 0) { // 创建成功
      return res.data.list;
    }
    return false;
  }

  /**
   * 新增消息中心信息
   * @url /MuzenBAS/User/SystemMsgAdd
   * @body {
   *    'title':'test',						//标题
   *    'content':'test',						//内容
   *    'user_type':1,							//用户类型1:全部,2:条件,3:指定
   *    'user':'test',	              			//条件
   *    'push_time':1,
   *    'jump_type ':1,							//跳转类型0:无,1:h5,2:内部app
   *    'jump_content':'test',					//跳转内容
   * }
   * @res {
   *        'code': 错误码,
   *        'info':'错误描述信息',
   *      }
   */
  public async CreateMessageCenter(param: any) {
    if (param.push_time !== ''){
      param.push_time = Time.Stamp(param.push_time);
    } else {
      param.push_time = 0;
    }
    const p = {
      title: param.title, // 标题
      content: param.content, // 内容
      user_type: 1, // 用户类型1:全部,2:条件,3:指定
      user: param.user, // 条件
      push_time: param.push_time,
      jump_type: 1, // 跳转类型0:无,1:h5,2:内部app
      jump_content: param.jump_content, // 跳转内容
    };
    const res = await request.Post('/MuzenBAS/User/SystemMsgAdd', p);
    if (res.code === 0) { // 创建成功
      return true;
    }
    return res.info;
  }

  /**
   * 获取消息中心列表
   * @url /MuzenBAS/User/SystemMsgGet
   * @body {
   *    'title': 'test', // 标题
   *    'content': 'test', // 内容
   *    'user_type':1,// 用户类型1:全部,2:条件,3:指定
   *    'status':'test',// 状态1:删除2:待推送,4:已推送,8:推送失败
   *    'start_time':1,
   *    'end_time':1,
   *  }
   * @res {
   *        'code': 错误码,
   *        'info':'错误描述信息',
   *      }
   */
  public async GetMessageCenter(param: any, page: number = 1, pageSize: number = 20) {
    param = {...param, ...{page_size: pageSize, page_index: page}};
    const res = await request.Post('/MuzenBAS/User/SystemMsgGet', param);
    if (res.code === 0) { // 创建成功
      return res.data;
    }
    return false;
  }

  /**
   * 根据ID删除消息中心信息
   * @url /MuzenBAS/User/SystemMsgDel
   * @param id 需要删除的Id
   * @res 返回对象，详情查看文档
   */
  public async DeleteMessageCenter(id: number) {
    const res = await request.Post('/MuzenBAS/User/SystemMsgDel', {id});
    if (res.code === 0) { // 删除成功
      return true;
    }
    return false;
  }
}

export default new System();
