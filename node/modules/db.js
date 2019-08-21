const mongodb = require("mongodb");
const mongoClient=mongodb.MongoClient;
function _connect(cb){
    // console.log(1);
    // 异步
    mongoClient.connect("mongodb://127.0.0.1:27017",{ useUnifiedTopology: true, useNewUrlParser: true },function(err,client) {
        cb(client.db("repaire"));
        // console.log(2);
    });
    // console.log(3);
}
/*
* 添加一条记录
* coll:指定的集合
* obj:添加的内容
* cb;回调函数用于返回结果*/
module.exports.insertOne=function(coll,obj,cb){
    _connect(function(db){
        db.collection(coll).insertOne(obj,cb);
    })
}
/*
* 获取记录信息
* coll:集合
* obj:条件
*   whereObj：条件
*   sortObj*
* */
module.exports.find=function(coll,obj,cb){
    obj.whereObj=obj.whereObj || {};
    obj.sortObj=obj.sortObj || {};
    obj.skipNum=obj.skipNum || 0;
    obj.limitNum=obj.limitNum || 0;
    _connect(function(db){
        db.collection(coll).find(obj.whereObj).sort(obj.sortObj).skip(obj.skipNum).limit(obj.limitNum).toArray(cb)
    })
}
// 根据ID查找相对应的信息
module.exports.findOneById=function(coll,id,cb){
    _connect(function(db){
        db.collection(coll).findOne({
            _id:mongodb.ObjectId(id)
        },cb)
    })
}
module.exports.findOne=function(coll,whereObj,cb){
    _connect(function(db){
        db.collection(coll).findOne(whereObj,cb)
    })
}


/*根据条件计算文档的数量*/
module.exports.count=function(coll,whereObj,cb){
    _connect(function(db){
        db.collection(coll).countDocuments(whereObj).then(cb)
    })
}
/* 根据ID进行删除 */
module.exports.deleteOneById=function(coll,id,cb){
    _connect(function(db){
        db.collection(coll).deleteOne({
            _id:mongodb.ObjectId(id)
        },cb)
    })
}
//删除所有集合里的文档
module.exports.remove = function(coll,cb){
    _connect(function(db){
        db.collection(coll).deleteMany({},cb)
    })
}
/*根据ID来进行修改一条*/
module.exports.updateOneById=function(coll,id,upObj,cb){
    _connect(function(db){
        db.collection(coll).updateOne({
            _id:mongodb.ObjectId(id)
        },upObj,cb)
    })
}
module.exports.updateOne = function(coll,whereObj,upObj,cb){
	_connect(function(db){
		db.collection(coll).updateOne(whereObj,upObj,cb)
	})
}
//多表联查
module.exports.getAdminLogList = function(skip,limit,cb){
	_connect(function(db){
		db.collection('adminLog').aggregate([
			{
				$sort:{addTime:-1}
			},
			{
				$skip : skip
			},
			{
				$limit : limit
			},
			{
				$lookup : {
					from : 'adminList',
					localField : 'adminId',
					foreignField : '_id',
					as : 'adminInfo'
				}
			},
			{
				$lookup : {
					from : 'logType',
					localField : 'logType',
					foreignField : 'typeId',
					as : 'typeInfo'
				}
			}
		]).toArray(cb);
	})
}



