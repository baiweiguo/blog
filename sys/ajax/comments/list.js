
var mongo = require('../../lofox/DB.js');

//��ȡ�����б�
module.exports = function(data,callback){
	var data = data,
		limit_num = parseInt(data['limit']) || 10,
		skip_num = parseInt(data['skip']) || 0;
	
	var resJSON = {
		'code':1,
		'limit':limit_num,
		'skip':skip_num,
	};
	
	var method = mongo.start();
	method.open({'collection_name':'comments'},function(err,collection){
    //count the all list
		collection.count(function(err,count){
			resJSON['count'] = count;
			
			collection.find({},{limit:limit_num}).sort({id:-1}).skip(skip_num).toArray(function(err, docs) {
				method.close();
				if(err){
					resJSON.code = 2;
				}else{
					resJSON['list'] = docs;
				}
				callback&&callback(null,resJSON);
			});
		});
	});
};