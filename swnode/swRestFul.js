'use strict';module.exports=function(request,response,rlog,callback,_env,postdata,sb,sub,esm){let _jdata=null,_index=null,_id=null,_areq=null,_machs=null,_resp=[],_key=null,_value=null;_areq=request.url.split('/');_index=_areq[2];switch(request.method){case 'GET':switch(_areq.length){case 5:_resp=Array.prototype.filter.call(_env[_index],e => new RegExp(_areq[4]).test(e[_areq[3]]));;break;default:_resp=_env[_index];break;}if(request.headers['accept-encoding']&&request.headers['accept-encoding'].match(/\bdeflate\b/)){let readStream=new require('stream').Readable();readStream.push(JSON.stringify(_resp));readStream.push(null);console.time('DEFLATE');response.writeHead(200,{'content-encoding':'deflate','content-type':'application/json'});readStream.pipe(require('zlib').createDeflate()).pipe(response);console.timeEnd('DEFLATE')}else {console.time('NO ZIP');response.writeHeader(200,{'Content-Type':'application/json'});response.end(JSON.stringify(_resp));console.timeEnd('NO ZIP')}console.log('REQUEST.URL',request.url,'ANZAHL DATENSÄTZE',_resp.length);break;case 'POST':_jdata=JSON.parse(postdata);console.log('POST areq length',_areq.length);if(_areq.length===3){_jdata._id='MC'+Date.now().toString(35);_jdata._time=Date.now();if(typeof _env[_index]==='undefined'){_env[_index]=[]}_env[_index].push(_jdata);response.writeHeader(200,{'Content-Type':'application/json'});response.end(JSON.stringify(_jdata));Array.prototype.filter.call(esm,e => e.ev==='add')[0].cb(sub,_index,_jdata._id,_jdata)}if(_areq.length===4&&_areq[3]==='_bulk'){if(typeof _env[_index]==='undefined'){_env[_index]=[]}console.log('_bulk POST ');Array.prototype.forEach.call(_jdata,(e,i) => {e._id='MC'+i.toString()+Date.now().toString(35);e._time=Date.now();_env[_index].push(e)});response.writeHeader(200,{'Content-Type':'application/json'});response.end(JSON.stringify({'type':'bulk_add'}));Array.prototype.filter.call(esm,e => e.ev==='badd')[0].cb(sub,_index,_jdata)}callback(_env);break;case 'DELETE':response.writeHeader(200,{'Content-Type':'application/json'});console.log('DELETE areq length',_areq.length);switch(_areq.length){case 3:console.log('DEL 3 alles wech');_machs=[];response.end(JSON.stringify({delete:true,_id:'_all'}));break;case 4:console.log('DEL 4');_id=_areq[3];_machs=Array.prototype.filter.call(_env[_index],e => e._id!==_id);response.end(JSON.stringify({delete:true,_id:_id}));Array.prototype.filter.call(esm,e => e.ev==='delete')[0].cb(sub,_index,_id);break;case 5:console.log('DEL 5 key value delete');_key=_areq[3];_value=_areq[4];_machs=Array.prototype.filter.call(_env[_index],e => e[_key].toString()!==_value.toString());console.log(_machs.length,'Datensätze gefiltert');response.end(JSON.stringify({delete:true,_id:'_bulk'}));break;default:console.log('DEL default');}_env[_index]=_machs;callback(_env);break;case 'PUT':_id=_areq[3];if(Array.prototype.filter.call(_env[_index],e => e._id===_id).length===0){console.log('Neues Element');_env[_index].push({_id:_id,hist:[]})}console.log('PUT areq length',_areq.length,'#',_areq[0],'#',_areq[1],_areq[2],_areq[3],_areq[4]);if(_areq.length===3){_jdata=JSON.parse(postdata);_id=null;console.log('BULK UPDATE',_jdata.bulk.length);_jdata.bulk.forEach(e => {let elem=Array.prototype.filter.call(_env[_index],f => f._id===e.id);console.log(_index,_env[_index].length,e.id,e.type,e.value,elem.length);if(elem.length===1){elem[0][e.type]=e.value;console.log(_index,_env[_index].length,' FOUND ',e.id,e.type,e.value)}});Array.prototype.filter.call(esm,e => e.ev==='bupdate')[0].cb(sub,_index,_jdata)}if(_areq.length===4){_machs=Array.prototype.filter.call(_env[_index],e => e._id!==_id);_jdata=JSON.parse(postdata);_env[_index]=_machs;_env[_index].push(_jdata);Array.prototype.filter.call(esm,e => e.ev==='update')[0].cb(sub,_index,_id,_jdata)}if(_areq.length===5){_jdata=Array.prototype.filter.call(_env[_index],e => e._id===_id)[0];_jdata[_areq[4]]=JSON.parse(postdata).value;Array.prototype.filter.call(esm,e => e.ev==='kvupdate')[0].cb(sub,_index,_id,_areq[4],JSON.parse(postdata).value);console.log('KEY data VALUE Update',_id,_index,_areq[4],JSON.parse(postdata).value)}if(_areq.length===6){_jdata=Array.prototype.filter.call(_env[_index],e => e._id===_id)[0];_jdata[_areq[4]]=_areq[5];Array.prototype.filter.call(esm,e => e.ev==='akvupdate')[0].cb(sub,_index,_id,_areq[4],_areq[5]);console.log('KEY/VALUE Update',_id,_index,_areq[4],_areq[5])}if(_areq.length===7){_jdata=Array.prototype.filter.call(_env[_index],e => e._id===_id)[0];if(_jdata[_areq[4]].length>_areq[6])_jdata[_areq[4]]=_jdata[_areq[4]].slice(1);_jdata[_areq[4]].push(_areq[5]);Array.prototype.filter.call(esm,e => e.ev==='pkvupdate')[0].cb(sub,_index,_id,_areq[4],_areq[5],_areq[6]);console.log('PUSH KEY Value update',_id,_index,_areq[4],_areq[5],_areq[6])}callback(_env);response.writeHeader(200,{'Content-Type':'application/json'});response.end(JSON.stringify({update:true,_id:_id}));break;}};
