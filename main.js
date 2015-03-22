var express = require("express"),
	bodyParser = require("body-parser"),
	app =express(),
	orders=[];

app.use(function(req, res,next){
	console.log("%s %s", req.method, req.url);
	next();
});

app.use(express.static( __dirname+'/'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/orders', function(req,res) {
	fid(orders);
	res.send(orders);
	console.log(orders);
});

app.post('/api/orders', function(req,res) {
	var data = req.body;
	if(data.name && data.drink){
		orders.push(data);
		fid(orders);
		console.log(orders);
	};
	res.send("yes");
});

app.delete('/api/orders/*', function (req, res) {
	var data_id = req.url.split('/').pop();
	//delete orders[data_id-1];
	orders = orders.filter(function(el){ return el.id != data_id; });
	console.log(orders);

});

server = app.listen(3000, function() {
	console.log("Listening on port 3000");
})

function fid(o) {
	var i=0;
	while(o[i]){
	o[i]['id']= i+1;
    //console.log(o[i] );
    i++;}
};