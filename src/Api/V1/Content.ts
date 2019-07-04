import request from '../request';
import Time from '../../Lib/Time';
interface ArticleParam{
  id?: number;
  title: string;
  url: string;
  status?: number;
  time?: number;
}

/**
 * 操作内容接口
 */
class Content {

  /**
   * 创建文章
   * @url /MuzenBAS/Content/ArticleAdd
   * @body { "title":"test","author":"test","url":"ok","status": 0上架，1下架,	"time":1 }
   * @res {
   *        "code": 错误码,
   *        "info": "错误描述信息",
   *      }
   */
  public async ArticleCreate(param: any) {

    let p: ArticleParam = {
      title: param.title,						// 标题
      url: param.url,					// 跳转内容
    };
    if (param.time.length > 0) {
      p.time = Time.Stamp(param.time);
    } else {
      p.time = 0;
    }

    let url: string = '/MuzenBAS/Content/ArticleAdd';
    // 如果
    if (param.id !== 0) {
      p.id = param.id;
      url = '/MuzenBAS/Content/ArticleUpdate';
    }
    const res = await request.Post(url, p);
    if (res.code === 0) { // 创建成功
      return true;
    }
    return res.info; // 登录失败返回
  }

  /**
   * 获取文章列表
   * @url /MuzenBAS/Content/ArticleGet
   * @body {"page_size": 每页数据量,"page_index": 第几页数据,"title":"test","user":"test"}
   * @res {
   *        "code": 错误码,
   *        "info": "错误描述信息",
   *      }
   */
  public async ArticleList(search: {title?: string, user?: string}, page: number, size: number = 10) {
    let parm = { page_size: size, page_index: page };
    if (search.title) {
      parm = {...parm, ...{title: search.title}};
    }
    if (search.user) {
      parm = {...parm, ...{title: search.user}};
    }
    const info = await request.Post('/MuzenBAS/Content/ArticleGet', parm);
    if (info.code === 0) { // 登录成功返回
      if (info.data.list === null) {
        info.data.list = [];
      }
      return info.data;
    }
    return []; //
  }

  /**
   * 删除文章
   * @url /MuzenBAS/Content/ArticleDel
   * @body { "id": 0 }
   * @res {
   *        "code": 错误码,
   *        "info": "错误描述信息",
   *      }
   */
  public async ArticleDelete(id: number) {
    const res = await request.Post('/MuzenBAS/Content/ArticleDel', {id});
    if (res.code === 0) { // 登录成功返回
      return true;
    }
    return res.info; // 登录失败返回
  }

}

export default new Content();
