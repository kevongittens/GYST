var tradeTools = require('./tradeTools');

function test(ary, expected)
{
	results.total++;
	var result = tradeTools.total(ary);
	console.log(result);
	if (result == expected)
	{
		results.good++;		
	}
}
	var results = 
	{
		total: 0,
		good: 0
	};
	
	test({}, 0);
	test("string", undefined);
	test(3939, undefined);
	test([22], 22);
	test([23, 22], 45);
	test([23, 312, 552, 22.5, 0], 909.5);
	
	
	console.log("Of " + results.total + " tests, " + (results.total - results.good) + " failed, " + results.good + " passed.");