module.exports = {
	median : function(ary)
	{
		if (ary == 0 || typeof(ary) !== 'object')
		{
			//console.log("empyt");
			return undefined;
		}
		
		var newary = [];
		var a = 0;
		for(i in ary)
		{
			var test = {};
			test["key"] = i;
			test["value"] = ary[i];
			newary[a] = test;
			a++;
		}
		
		newary = newary.sort(function (a, b) {
		return a.value - b.value });

		var mid = Math.floor(newary.length / 2);
		var ans = {};
		if ((newary.length % 2) == 1)
		{
			// length is odd
			ans[newary[mid].key] = newary[mid].value;
			return ans;
		}else
		{
			ans[newary[mid].key] = ((Number(newary[mid - 1].value) + Number(newary[mid].value)) / 2);
			return ans;
			//console.log((Number(newary[mid - 1].value) + Number(newary[mid].value)) / 2);
			//console.log(newary[mid - 1].key);
		}
	},

	max : function(ary)
	{
		if (ary.length == 0 || typeof(ary) !== 'object')
		{
			//console.log("empyt");
			return undefined;
		}
		var max = 0;
		var ary2;
		for( i in ary) 
		{
			if( ary[i] > max)
			{
				ary2 = {};
				max = ary[i];
				date = i;
				ary2[i] = ary[i];
			}
		}
			//console.log(max);
			//console.log(date);
			//console.log(ary2);
			return ary2
	},

	total : function(ary)
	{
		if (ary.length == 0 || typeof(ary) !== 'object')
		{
			//console.log("empyt");
			return undefined;
		}
				
		sum = 0, a ={};
		for (var i = 0; i < ary.length; i++) 
		{
			sum = sum + ary[i];
			//(sum);
		}
		//console.log(Number(sum));
		return Number(parseFloat(sum).toFixed(2));
	},
}
/* ~END~ */