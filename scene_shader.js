// map
	var create_empty_world=function(ii,jj){
		var table=$('<table width="460" border=1></table>').css('table-layout','fixed');
		for(var i=0;i<ii;i++){
			var tr=$('<tr></tr>');
			for(var j=0;j<jj;j++){
				var td=$('<td></td>')
				.css({
					height:40
				})
				.attr('pos',j+'-'+i);
				td.appendTo(tr);
			};
			tr.appendTo(table);
		};
		table.appendTo($(document).find('body'));
		return { layout:table };
	};

// blocked
	var create_blocked=function(){
		var block_list=new Array;
		for(var i=0;i<10;i++){
			for(var j=0;j<10;j++){
					if((i>0 && i<9) && (j==4 || j==5)){
					var td=$('td[pos='+j+'-'+i+']').css({
						backgroundColor:'silver'
					});
					block_list.push(td);
				};
			};
		};

		return { list:block_list };
	};

// B,T pos
	var create_object=function(){
		var object_list=new Array;
		var p=$('<span class="p"></span>').html('p').css('color','blue');
		var t=$('<span class="t"></span>').html('t').css('color','red');

		p.appendTo($('td[pos=1-4]'));
		t.appendTo($('td[pos=9-4]'));

		return {
			p:{
				x:parseInt($('td[pos=1-4]').attr('pos').split('-')[0]),
				y:parseInt($('td[pos=1-4]').attr('pos').split('-')[1]),
			},
			t:{
				x:parseInt($('td[pos=9-4]').attr('pos').split('-')[0]),
				y:parseInt($('td[pos=9-4]').attr('pos').split('-')[1]),
			}
		};
	};