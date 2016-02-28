function se_keep(xsub,xtable,xenv){
  console.log('keepalive');
  if ( xsub.subactive ){
    console.log('active keepalive',(xsub.subscribers).length);
    (xsub.subscribers).forEach( function(e,i,a) {e.write( 'event: keep\nid:' + (Date.now()).toString(23) + '\ndata: {"type": "keep","table":"'+xtable+'","users":'+a.length+',"time":'+Date.now()+',"env":'+ JSON.stringify(xenv)+'}\n\n' ) });
  }
}

function se_update(xsub,index,id,elem  ){//s,table,id,elem
  console.log('UPDATE CALLBACK se_update',index,id,elem);
  (xsub.subscribers).forEach( function(e,i,a){e.write( 'id:' + (Date.now()).toString(23) + '\nevent:update\ndata: {"tableid":"'+id+'","table":"'+index+'","type": "update","users":'+a.length+',"time":'+Date.now()+',"elem":'+JSON.stringify(elem)+'}\n\n')} );
}

function se_delete(xsub,index,id ){//
  console.log('DELETE CALLBACK se_delete',index,id);
  (xsub.subscribers).forEach( function(e,i,a){/*if ( e!==s)*/ e.write( 'id:' + (Date.now()).toString(23) + '\nevent:delete\ndata: {"tableid":"'+id+'","table":"'+index+'","type": "delete","users":'+a.length+',"time":'+Date.now()+'}\n\n')} );
}

function se_add(xsub,index,id,elem ){//
    console.log('ADD CALLBACK se_add',index,elem);
  (xsub.subscribers).forEach( function(e,i,a){e.write( 'id:' + (Date.now()).toString(23) + '\nevent:add\ndata: {"tableid":"'+id+'","table":"'+index+'","type": "add","users":'+a.length+',"time":'+Date.now()+',"elem":'+JSON.stringify(elem)+'}\n\n')});
}

// ---------------------------------------------------------------------------------------allgemeine Table-Function das wird ein require
var exports = module.exports = {};

exports.keep      = se_keep;
exports.put       = se_update;
exports.delete    = se_delete;
exports.post			= se_add;
