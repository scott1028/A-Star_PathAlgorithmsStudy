// 製造場景跟目標

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
					if((j>=0 && j<8) && (i==4 || i==5)){
					var td=$('td[pos='+i+'-'+j+']').css({
						backgroundColor:'silver'
					});
					block_list.push(td);
					td.attr('wall',1);
				};
			};
		};

		for(var i=3;i>0;i--){
			var td=$('td[pos='+i+'-'+3+']').css({
				backgroundColor:'silver'
			});
			td.attr('wall',1);
		};

		for(var i=3;i>0;i--){
			var td=$('td[pos='+i+'-'+3+']').css({
				backgroundColor:'silver'
			});
			td.attr('wall',1);
		};

		for(var i=8;i>5;i--){
			var td=$('td[pos='+i+'-'+7+']').css({
				backgroundColor:'silver'
			});
			td.attr('wall',1);
		};

		for(var i=9;i>6;i--){
			var td=$('td[pos='+i+'-'+5+']').css({
				backgroundColor:'silver'
			});
			td.attr('wall',1);
		};

		for(var i=8;i>5;i--){
			var td=$('td[pos='+i+'-'+2+']').css({
				backgroundColor:'silver'
			});
			td.attr('wall',1);
		};

		var td=$('td[pos='+8+'-'+1+']').css({
			backgroundColor:'silver'
		});
		td.attr('wall',1);

		return { list:block_list };
	};