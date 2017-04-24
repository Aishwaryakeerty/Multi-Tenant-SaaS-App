var mysql = require("./mysql");

function login(req,res)
{
	var response;

	var query = "insert into login values('pandyabhavan','Bhavan@123')";
	mysql.fetchData(function(err,results){
		if(err)
		{
			response = {"statusCode":401,"data":null};
			res.send(JSON.stringify(response));
		}
		else
		{
			response = {"statusCode":200,"data":results[0]};
			res.send(JSON.stringify(response));
		}
	},query);
}

exports.login = login;