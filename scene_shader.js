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

// node Container Class extend Array
	window.NodeArray=function(){};
	window.NodeArray.prototype=new Array;
	window.NodeArray.prototype.push=function(pos){
		if(typeof pos.x!='number' || typeof pos.y!='number' || typeof pos.f!='number'){
			// console.log('push val error');
			return true;
		}
		var bThisDontHavePos=this.every(function(val,idx){
			if(val.x==pos.x && val.y==pos.y){
				return false;
			}
			else{
				return true;
			}
		});
		bThisDontHavePos ? Array.prototype.push.call(this,pos) : undefined/*console.log('already existed!')*/;
	};
	window.NodeArray.prototype.getNodeWithMinF=function(){		// return 列表中 f 直最小的 node [不會移除]
		var nodeWithMinF=this[0];
		for(var i=0;i<this.length;i++){
			thisNode=this[i];
			nodeWithMinF = (thisNode.f<=nodeWithMinF.f) ? thisNode : nodeWithMinF;
		}
		return nodeWithMinF;
	};
	window.NodeArray.prototype.popNodeWithMinF=function(){		// pop 列表中 f 直最小的 node [會移除]
		var nodeWithMinF=this[0];
		var idx=0;
		for(var i=0;i<this.length;i++){
			thisNode=this[i];
			if(thisNode.f<=nodeWithMinF.f){
				nodeWithMinF=thisNode;
				idx=i;
			};
		}
		return this.splice(idx,1)[0];
	};
	window.NodeArray.prototype.includePos=function(pos){
		var index;
		var notInclude=this.every(function(val,idx){
			if(val.x==pos.x && val.y==pos.y){
				index=idx;
				return false;									// 會終止 every 函數
			}
			else{
				return true;
			};
		});
		return { bool:!notInclude, index:index };
	};

// TimeSleep
Date.sleep=function(sec){
	var s=(new Date).getTime();
	while((new Date).getTime()<=(s+1000*sec)){};
}