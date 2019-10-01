const db = require("../modules/db");
const https = require("https");
const uuid = require('node-uuid')
const { upPic } = require('../modules/upPic');
module.exports.login = function(req,res){
    const { nickName, code, avatarUrl  } = req.body;
    https.get(`https://api.weixin.qq.com/sns/jscode2session?appid=wx9a7460cf1dcc24f5&secret=22618295300b4ecdeed42f65d81b9c3b&js_code=${code}&grant_type=authorization_code`,function(data){
        let str="";
        data.on("data",function(chunk){
            str+=chunk;//监听数据响应，拼接数据片段
        })
        data.on("end",function(){
            const { openid, session_key } = JSON.parse(str.toString());
            const sessionId = uuid.v1() + '.' + openid + '.' + session_key;
            db.insertOne('session',{
                sessionId: openid + '.' + session_key
            }, function(){
                console.log('success')
            })
            // 使用set进行string类型数据的设置
            db.findOne('login',{ openid }, function(err, userInfo){
                if(userInfo){
                    res.json({
                        msg: "hava register",
                        token: sessionId
                    })
                }else{
                    db.insertOne('login',{
                        nickName,
                        createTime: Date.now(),
                        avatarUrl,
                        openid,
                    },(err,result)=>{
                        res.json({
                            ok: 1,
                            msg: "register success",
                            token: sessionId
                        })
                    })
                }
            })
        })
    })
}

module.exports.upload = function(req,res){
    console.log(req.query);
    res.json({
        ok: "1"
    })
}

module.exports.getLog = function(req,res){
    console.log(req.query)
    const { type } = req.query;
    if(type/1 ===1 ){
        db.find('repaireLog',{},(err,result)=>{
            res.json({
                ok: 1,
                msg: "getLog succ",
                reqaireList: result
            })
        })
    };
    if(type/1 == 2 ){
        db.find('repaireLog2',{},(err,result)=>{
            res.json({
                ok: 1,
                msg: "getLog succ",
                reqaireList: result
            })
        })
    }
}

module.exports.putLog = function(req,res){
    const { xuexiao, question, xinghao, username, phone, type, pintai, status, files } = req.body;
    if(type === 1){
        db.insertOne('repaireLog',{
            xuexiao,
            createTime: Date.now(),
            question,
            xinghao,
            username,
            phone,
            status
        },(err,result)=>{
            res.json({
                ok: 1,
                msg: "putlog success"
            })
        })
    }
    if(type === 2){
        db.insertOne('repaireLog2',{
            xuexiao,
            createTime: Date.now(),
            question,
            xinghao,
            username,
            phone,
            pintai
        },(err,result)=>{
            res.json({
                ok: 1,
                msg: "putlog2 success"
            })
        })
    }
}