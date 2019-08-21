const db=require("../modules/db");
module.exports.getLog = function(req,res){
	db.find('repaireLog',{},(err,result)=>{
        res.json({
            ok: 1,
            msg: "getLog succ",
            reqaireList: result
        })
    })
}

module.exports.putLog = function(req,res){
    console.log(req.body,'req');
    const { school } = req.body;
    db.insertOne('repaireLog',{
        school,
        time: Date.now(),
        description: "i am a question",
        yjname: "吹风机"
    },(err,result)=>{
        res.json({
            ok: 1,
            msg: "putlog success"
        })
    })
}