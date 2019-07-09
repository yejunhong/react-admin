import request from './Request';
/*interface ArticleParam{
  id?: number;
  title: string;
  url: string;
  status?: number;
  time?: number;
}*/

async function ArticleList(search: {title?: string, user?: string}, page: number, size: number = 10) {
  let parm = { page_size: size, page_index: page };
  if (search.title) {
    parm = {...parm, ...{title: search.title}};
  }
  if (search.user) {
    parm = {...parm, ...{title: search.user}};
  }
  const info = await request.Post('/MuzenBAS/Content/ArticleGet', parm);
  console.log(info);
}

function GetMenu(): any {
  const list =request.Get('http://127.0.0.1:3000/menu.json').then((res: any) => {
    console.log(res)
    return res;
  });
  return list;
}

export {ArticleList, GetMenu}
