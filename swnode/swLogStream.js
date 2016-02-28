module.exports=function(filename){return require('fs').createWriteStream(filename,{flags:'a'})};

