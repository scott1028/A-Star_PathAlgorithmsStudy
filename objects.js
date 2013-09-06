// B,T pos
	var create_object=function(){
		var object_list=new Array;
		var p=$('<span class="p"></span>').html('p').css('color','blue');
		var t=$('<span class="t"></span>').html('t').css('color','red');

		p.appendTo($('td[pos=1-2]'));
		t.appendTo($('td[pos=9-9]'));

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