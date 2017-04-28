var mysql = require("./mysql");
var fs = require("fs");
var path = require("path");
var unzip = require('unzip');
var mkdir = require('mkdirp');

function login(req,res)
{
	var response;
	var username = req.param("username");
	var password = req.param("password");
	// mysql query to validate user
	var query = "select tenant_id from login where username = '"+username+"' and  password = '"+password+"'" ;
	mysql.fetchData(function(err,results){
		if(err)
		{
			response = {"statusCode":401,"data":null};
			res.send(JSON.stringify(response));
		}
		else
		{
			if(results.length > 0){
				response = {"statusCode":200,"data":results[0]};
				res.send(JSON.stringify(response));
			}
			else
			{
				response = {"statusCode":401,"data": null};
				res.send(JSON.stringify(response));
			}
		}
	},query);
}
//function to insert grades into database
function insertdata(req,res)
{
	var response;
	var tenant_id = req.param("tenantNumber");
	var score = req.param("score");
	var grades= req.param("grades");
	var comments= req.param("comments");
	var complete= req.param("complete");
	var publish= req.param("publish");
	var query = "insert into grades values ('"+tenant_id+"','"+score+"','"+grades+"', "+complete+",'"+comments+"',"+publish+")" ;
	mysql.fetchData(function(err,results){
		if(err)
		{
			response = {"statusCode":401,"data":null};
			res.send(JSON.stringify(response));
		}
		else
		{
			response = {"statusCode":200};
			res.send(JSON.stringify(response));
		}
	},query);
}

function getGrades(req,res){
	res.render('grades', {});
}
//uploading zipped file
function upload(req,res){
	var temp = req.files.file.path;
	var response;
	var target = path.resolve('./public/files/'+req.files.file.name);
	console.log(target);
	fs.rename(temp, target, function(err) {

	});
	// unzipping the file 
	fs.createReadStream('./public/files/'+req.files.file.name)
	.pipe(unzip.Parse())
	.on('entry', function (entry) {

		var fileName = entry.path
		var type = entry.type
		var fullPath = './public/unzipped/'+ path.dirname( fileName )
		fileName = path.basename( fileName )
		mkdir.sync(fullPath)
		entry.pipe(fs.createWriteStream( fullPath + '/' + fileName ))

		// running jar file
		var exec = require('child_process').exec, child;
		child = exec('java -jar ./public/jar_files/tenant1.jar ./public/unzipped/ ./public/image/',
				function (error, stdout, stderr){
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);

			if(error !== null){
				console.log('exec error: ' + error);

			}
			// returning image  
			response = {"statusCode": 200};
			res.send(JSON.stringify(response));
		});
	})
}

exports.login = login;
exports.getGrades=getGrades;
exports.upload = upload;
exports.insertdata = insertdata;