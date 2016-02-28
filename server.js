#!/bin/env node
'use strict';
var cfg  = require('./package').config
,   port = process.env.OPENSHIFT_NODEJS_PORT||8080
,ipaddress=process.env.OPENSHIFT_NODEJS_IP
,http=require('http')
,fs=require('fs')
,router=require(cfg.path+'swnode/swRouter')
,slog=cfg.log?require(cfg.path+'swnode/swLogStream')('./log/server.log'):undefined
,mud=require(cfg.path+'swnode/modbus_udp')
,esfm=require('./esfm')
,cb=function(e){env=e}
,sb=function(e){sub=e}
,memcache={}
,env={}
,sub={subscribers:[],subactive:false}
,esm=[{ev:'add',cb:esfm.post}
     ,{ev:'delete',cb:esfm.delete}
     ,{ev:'keep',cb:esfm.keep}
     ,{ev:'update',cb:esfm.put}
     ]
;
http.createServer(function(req,res){router(req,res,slog,cb,env,memcache,esfm.keep,cfg.table,sb,sub,esm)})
.listen(port,ipaddress,function(){console.log('SERVER listen on port '+cfg.host+cfg.webport+cfg.data+cfg.table)});
/*
fs.readFile(cfg.data,function(err,data){if(err)throw err;env=JSON.parse(data);env[cfg.table].forEach(function(e,i){console.log('startet with',cfg.simulation,e.ip,e.plant,e.station)})});

setInterval(function(){fs.writeFile(cfg.data,JSON.stringify(env,null,2),function(err){if(err)throw err})},360000);

fs.readdir('./app',function(r,d){d.forEach(function(e){fs.readFile('./app/'+e,function(err,data){if(err)throw err;memcache['/'+e]=data;console.log(e,' loaded..',data.length)})})});


var monats_wechsel=function(elem){if(elem['mtrigger']){elem['mtrigger']=0;elem['hteilio']=[];elem['hteilnio']=[];elem['hteilabs']=[];elem['hteilabsp']=[];elem['hstimes']=[]}};
var schicht_wechsel=function(elem){if(elem['strigger']){var oldteilio=elem['teilio'], oldteilnio=elem['teilnio'], schichtsoll=elem['teilesoll'];console.log('TRIGGER',oldteilio);elem['strigger']=0;elem['hteilio'].push(oldteilio);if(elem['hteilio'].length>100)elem['hteilio'].shift();elem['hteilnio'].push(oldteilnio);if(elem['hteilnio'].length>100)elem['hteilnio'].shift();elem['hteilabs'].push(oldteilio-schichtsoll);if(elem['hteilabs'].length>100)elem['hteilabs'].shift();elem['hteilabsp'].push((oldteilio-schichtsoll)/schichtsoll);if(elem['hteilabsp'].length>100)elem['hteilabsp'].shift();elem['stimes'].forEach((e,i) => elem['hstimes'][i]=(elem['hstimes'][i]||0)+parseInt(e||0));elem['stimes']=[];elem['teilio']=0;elem['taktist']=0;elem['teilnio']=0;elem['schichtdat']=Date.now()}};const elem_update=(elem,kvk,xesf,xsub,xtable,simulation) => {console.log('ELEM_UPDATE:',kvk.key);const lnow=Date.now();switch(kvk.key){case 'Teilio':const oldteilio=elem[kvk.field];const newteilio=simulation?oldteilio+1:kvk.value;elem[kvk.field]=newteilio;break;case 'Teilnio':elem[kvk.field]=parseInt(elem[kvk.field])+1;break;case 'TaktIst':elem[kvk.field]=parseInt(elem[kvk.field])+1;break;case 'Status':const newstatus='0123456'.charAt(parseInt(Math.random()*7));const oldstatus=elem[kvk.field];elem[kvk.field]=newstatus;elem['stimes'][oldstatus]=(elem['stimes'][oldstatus]||0)+(lnow-elem['sdat'])/60000;elem['sdat']=lnow;break;}elem['adat']=lnow;elem['addat']=new Date(lnow).toISOString();xesf.put(xsub,xtable,elem._id,elem)};const kv=[{key:'Status',field:'lstatus'},{key:'Teilio',field:'teilio'},{key:'Teilnio',field:'teilnio'},{key:'TaktIst',field:'taktist'},{key:'ENERGY',field:'energy'}];

var simulation=function (xsub,xtable,xenv,xesf,xkv){const j=parseInt(Math.random()*xenv[xtable].length);const k=parseInt(Math.random()*xkv.length);const lnow=Date.now();let elem=Array.prototype.filter.call(xenv[xtable],(e,i,a) => i===j);monats_wechsel(elem[0]);schicht_wechsel(elem[0]);elem_update(elem[0],xkv[k],xesf,xsub,xtable,true)};

if(cfg.simulation) setInterval(function(){simulation(sub,cfg.table,env,esfm,kv)},5000);
*/
