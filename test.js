var request = require("request");
var cheerio = require("cheerio");
var tradeTools = require('./tradeTools');
var fs = require('fs');

 
init();

function init()
{
	var url = "http://www.pollardsetfilles.com/pollardsetfillesDotCom/test/session500.htm";
	getHtml(request, url, function(results){
		if (results != null)
		{
			parceHtml(results, function(results){
				if (results != null)
				{					
					// build an array of only CCI elements
					var aryCCI = results.tradeDetails.slice();
					for(var i=0; i<aryCCI.length; i++)
					{
						if('CCI' != aryCCI[i]['Mnemonic'])
						{
							aryCCI.splice(i, 1);
						}
					}
					
					//build an array of only TCL elements
					var aryTCL = results.tradeDetails.slice();
					for(var i=0; i<aryTCL.length; i++)
					{
						if('TCL' != aryTCL[i]['Mnemonic'])
						{
							aryTCL.splice(i, 1);
						}
					}

					//-----------------------------------------------
					//create the CSV file
					if (results != false)
					{
						createCSV(results.tradeHeaders, results.tradeDetails);
						console.log("CSV File Created:");
					}
					else console.log("Error creating CSV File:");

					//-----------------------------------------------
					//determine the median trade
					
					//CCI
					var medTrade = {};
					for (var i = 0; i < aryCCI.length; i++)
					{
						//build key(date) val(trade) pair: 
						medTrade[aryCCI[i]['Last Trade Date']] = aryCCI[i]['Last Trade'];
					}
					ans = tradeTools.median(medTrade);
					for (i in ans)
					{
						console.log("\n\nCCI Median Trade: " + ans[i] + " and date: " + i);
					}
					
					
					//TCL
					medTrade = {};
					for (var i = 0; i < aryTCL.length; i++)
					{
						//build key(date) val(trade) pair: 
						medTrade[aryTCL[i]['Last Trade Date']] = aryTCL[i]['Last Trade'];
					}
					ans = tradeTools.median(medTrade);
					for (i in ans)
					{
						console.log("\n\nTCL Median Trade: " + ans[i] + " and date: " + i);
					}
					
					//-----------------------------------------------------
					//determine the max trade
					
					//CCI
					var maxTrade = {};
					for (var i = 0; i < aryCCI.length; i++)
					{
						maxTrade[aryCCI[i]['Last Trade Date']] = aryCCI[i]['Last Trade'];
					}
					
					var ans = tradeTools.max(maxTrade);
					for (i in ans)
					{
						console.log("\n\nCCI Max Trade: " + ans[i] + " and date: " + i);
					}
					//TCL
					maxTrade = {};
					for (var i = 0; i < aryTCL.length; i++)
					{
						maxTrade[aryTCL[i]['Last Trade Date']] = aryTCL[i]['Last Trade'];
					}
					ans = tradeTools.max(maxTrade);
					for (i in ans)
					{
						console.log("\n\nTCL Max Trade: " + ans[i] + " and date: " + i);
					}

					
					//-----------------------------------------------------
					//determine the total trade
					
					//CCI
					var a = 0;
					var totTrade = [];
					while (aryCCI[a])
					{
						totTrade[a] = aryCCI[a]['Last Trade Vol (000s)'];
						a++;
					}
					console.log("\n\nCCI Total Trades: " + tradeTools.total(totTrade));
					//tradeTools.total(totTrade);
					
					//TCL
					a = 0;
					totTrade = [];
					while (aryTCL[a])
					{
						totTrade[a] = aryTCL[a]['Last Trade Vol (000s)'];
						a++;
					}
					console.log("\n\nTCL Total Trades: " + tradeTools.total(totTrade));
					//tradeTools.total(totTrade);	
					
				}else console.log("error getting Parsing HTML:");
			});
		}else console.log("error getting HTML:");
	});
}

//***********************************************************
function createCSV(headers, data)
{
	var stream = fs.createWriteStream("myFile.csv");
	stream.once('open', function(fd) {
	var i = 0;
	
	stream.write(headers[0]+", "+headers[1]+", "+headers[2]+", "+headers[3]+", "+headers[4]+"\n");
	while(data[i])
	{
		stream.write(data[i][headers[0]]+", "+data[i][headers[1]]+", "+data[i][headers[2]]+", "+data[i][headers[3]]+", "+data[i][headers[4]]+"\n");
		i++;
	}
	  stream.end();
	});
}

//***********************************************************
function parceHtml(html, callback)
{
	var data = {};
	data.tradeHeaders = [];
	var parced = cheerio.load(html);
	var headers = parced("thead font font font");
	
	headers.each(function(i, elem){
		var dirty = parced(this).text();
		var clean = dirty.replace(/\n/g,"").replace(/              /g," ").replace(/[&\/\\#,+$~%.'":*?<>{}]/g,'');
		data.tradeHeaders[i] = clean;
	});

	//data.tradeHeaders.join(', ');
	
	//---------------------------------------------------------
	data.tradeDetails = [];
	var details = parced("tbody tr font font font");
		
		var d = [];
		
		details.each(function(j, details_el)
		{
			var dirty = parced(this).text();
			var clean = dirty.replace(/\n/g,"").replace(/              /g," ").replace(/  /g,"");
			d[j] = clean;
			//data.tradeDetails[j] = clean;	
		});
		
		var a = 0;
		var j = 0;
		while(d[a])
		{
			var b = {};
			
			b[data.tradeHeaders[0]] =  d[a+0];
			b[data.tradeHeaders[1]] = d[a+1];
			b[data.tradeHeaders[2]] = Number(parseFloat(d[a+2]).toFixed(2));
			b[data.tradeHeaders[3]] = Number(parseFloat(d[a+3]).toFixed(2));
			var s = d[a+4].split("/");
			var date = new Date(s[2], s[1], s[0]);
			b[data.tradeHeaders[4]] = date.getFullYear() + '-' + (date.getMonth()) + '-' + date.getDate();
			
			data.tradeDetails[j] = b;
			a += 5;
			j++;
		}
	callback(data);
}

//***********************************************************
function getHtml(request, webaddress, callback)
{
	request(webaddress, function (error, response, body) {
		 if (!error && response.statusCode == 200) {
			callback(body);
			} else {
            console.log("error in getHtml: " + error);
		 }
	});
}	

/* ~END~ */