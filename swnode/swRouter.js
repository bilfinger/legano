'use strict';module.exports=function(request,response,rlog,callback,environement,memcache,broadcast,table,sb,subs,esm){const restful=require('./swRestFul');let postdata='',env=environement,sub=subs;request.on('data',function(chunk){postdata+=chunk});request.on('end',function(){if(rlog!==undefined){let path='';try{path=decodeURI(request.url)}catch(e){rlog.write('DECODEURI ERROR',e)}rlog.write(JSON.stringify({'index':{'_id':null}})+'\n'+JSON.stringify({'time':new Date().toISOString(),'class':'INFO','type':'ROUTER','method':request.method,'data':postdata,'remote':request.connection.remoteAddress.split(':').pop(),'path':path})+'\n');}env['_log'].push({'time':new Date().toISOString(),'class':'INFO','type':'ROUTER','method':request.method,'remote':request.connection.remoteAddress.split(':').pop(),'path':request.url});switch(true){case /rest\//.test(request.url):restful(request,response,rlog,callback,environement,postdata,sb,subs,esm);break;case /event-source/.test(request.url):console.log('EVENT-SOURCE created',request.connection.remoteAddress,request.connection.remotePort);request.on('close',() => {sub.subscribers=sub.subscribers.filter(e => e!==response);console.log('close',sub.subscribers.length);if(!sub.subscribers.length){console.log('SUBACTIVE FALSE');sub.subactive=false}});response.writeHead(200,{'Connection':'keep-alive','Content-Type':'text/event-stream','Cache-Control':'no-cache'});response.write('retry:10000\nid:'+Date.now().toString(23)+'\ndata: {"type": "new","time":'+Date.now()+'}\n\n');sub.subscribers.push(response);console.log(sub.subscribers.length,'NEW SUBS');if(!sub.subactive){sub.subactive=true;console.log('SUBACTIVE TRUE')}sb(sub);break;case /json/.test(request.url):response.writeHead(200,{'Content-Type':'application/json'});response.end(JSON.stringify([{is:'me'},{you:'also'}],null,2));break;case /\/.*/.test(request.url):if(memcache[request.url.split('?')[0]]!=='undefined'){response.end(memcache[request.url.split('?')[0]]);console.log('FILE load',request.url)};break;default:response.writeHead(404);response.end('keine Route');break;};});};
