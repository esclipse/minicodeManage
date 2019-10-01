const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const repaire = require('./router/repaire');

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
app.put('/putRepaireLog',repaire.putLog);
app.post('/login', repaire.login);
app.post('/upload', repaire.upload);


app.listen(80,function(){
	console.log('succ in 80')
})