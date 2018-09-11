var tradeTools = require('./tradeTools');

function test(keyValue, expected)
{
	results.total++;
	var result = tradeTools.max(keyValue);
	console.log(result);
	if (result === expected)
	{
		results.good++;		
	}else if (result[0] == expected[0]) //&& result[0].key == expected[0].key)// && result.key !== expected.key)
	{
		results.good++;
	}
}
	var results = 
	{
		total: 0,
		good: 0
	};
	
	test({}, undefined);
	test("string", undefined);
	test(3939, undefined);
	test({"2008/01/28": 22}, {"2008/01/28": 22});
	test({"2008/01/29": 23, "2008/01/28": 22}, 
	{ '2008/01/29': 23 });
	test({"2008/01/29": 23, "2008/01/28": 312, "2008/01/8": 552, "2008/01/12": 22.5, "2008/01/4": 0}, {"2008/01/8": 552});
	
	
	console.log("Of " + results.total + " tests, " + (results.total - results.good) + " failed, " + results.good + " passed.");