var mysql = require("./mysql");

function login(req,res)
{
	var response;
	var username = req.param("username");
	var password = req.param("password");

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

exports.login = login;