const Koa = require("koa");
const hbs = require('koa-hbs')
const koaBody = require('koa-body');
const static = require('koa-static');
const app = new Koa({proxy:true});

app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
  }
}));

app.use(hbs.middleware({
  viewPath: __dirname + '/views', //视图根目录    
  disableCache: true//开发阶段不缓存
}));

app.use(static(__dirname + '/public'));

const routers = require('./routers/index');

routers.forEach(item=>{
  app.use(item.routes())
})

//开始监听端口，等同于//http.createServer(app.callback()).listen(3000);
let port = 8088
app.listen(port,() => {
  console.error(`访问:http://localhost:${port}`);
});
