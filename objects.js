// B,T pos
	var create_object=function(){
		var object_list=new Array;
		return {
			p:{
				x:parseInt($('td[pos=1-2]').attr('pos').split('-')[0]),
				y:parseInt($('td[pos=1-2]').attr('pos').split('-')[1]),
			},
			t:{
				x:parseInt($('td[pos=9-9]').attr('pos').split('-')[0]),
				y:parseInt($('td[pos=9-9]').attr('pos').split('-')[1]),
			}
		};
	};