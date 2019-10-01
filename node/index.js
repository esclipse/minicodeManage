const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const repaire = require('./router/repaire');
const db = require('./modules/db');

var multer = require("multer");
var storage = multer.diskStorage({
destination: function(req, file, cb) {
	cb(null, './upload');
},
	filename: function(req, file, cb) {
		cb(null, `${Date.now()}-${file.originalname}`)
	}
});

var upload = multer({ storage: storage });
  
app.use(express.static('./upload'))
app.use(bodyParser.json())
//cors 允许跨域
app.all('*',function(req,res,next){
	res.header('Access-Control-Allow-Origin','*')
	res.header('Access-Control-Allow-Headers','*')
	res.header('Access-Control-Allow-Methods','*')
	next()
})

// api interface
app.get('/getRepaireLog',repaire.getLog);
app.post('/putRepaireLog',repaire.putLog);
app.post('/login', repaire.login);

app.post('/upload/img', upload.array('img', 2), function (req, res) {
	const { xuexiao, question, xinghao, username, phone, type, pintai, status } = req.body;
	console.log(xuexiao, 'xuexiao', req.body)
	// 读取上传的图片信息
	var files = req.files;
	// 设置返回结果
	var result = {};
		if(!files[0]) {
		result.code = 1;
		result.errMsg = '上传失败';
		} else {
		result.code = 0;
		result.data = {
			url: files[0].path
		}
		result.errMsg = '上传成功';
		if(type/1 === 1){
			db.insertOne('repaireLog',{
				xuexiao,
				createTime: Date.now(),
				question,
				xinghao,
				username,
				phone,
				status,
				url:files[0].path
			},(err,result)=>{
				res.json({
					ok: 1,
					msg: "putlog success"
				})
			})
		}
		if(type/1 === 2){
			db.insertOne('repaireLog2',{
				xuexiao,
				createTime: Date.now(),
				question,
				xinghao,
				username,
				phone,
				pintai,
				url:files[0].path
			},(err,result)=>{
				res.json({
					ok: 1,
					msg: "putlog2 success"
				})
			})
		};
	};
});


app.listen(80,function(){
	console.log('succ in 80')
})