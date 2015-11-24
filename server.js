var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json())

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);


app.listen(2456, function(){
	console.log('listening on port 2456');
})
