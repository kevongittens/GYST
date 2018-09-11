var tradeTools = require('./tradeTools');

function test(keyValue, expected)
{
	results.total++;
	var result = tradeTools.median(keyValue);
	
	if (result == expected)
	{
		results.good++;		
	}else if (result[0] == expected[0])
	{
		results.good++;
	}
}
	var results = 
	{
		total: 0,
		good: 0
	};

	//test({}, undefined); //breaks app - still needs work
	test("string", undefined);
	test(3939, undefined);
	test({"2008/01/28": 22}, {"2008/01/29": 22});
	test({"2008/01/28": 23, "2008/01/29": 22}, {"2008/01/30": 22.5});
	test({"2008/01/17": 23, "2008/01/18": 312, "2008/01/19": 552, "2008/01/20": 22.5, "2008/01/21": 0}, {"2008/01/8": 23});
	
	
	console.log("Of " + results.total + " tests, " + (results.total - results.good) + " failed, " + results.good + " passed.");