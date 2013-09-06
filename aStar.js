// 點的容器 class
	var node=function(x,y,f,g,h){
		this.x=x;
		this.y=y;
		this.f=f;
		this.g=g;
		this.h=h;
	};
	node.prototype=new Object;
	node.prototype.openNearNodes=function(){
		var up,down,left,right;
		up=new node(this.x-1,this.y);
		down=new node(this.x+1,this.y);
		left=new node(this.x,this.y-1);
		right=new node(this.x,this.y+1);

		var nodes=new node_path;
		nodes.push(up);
		nodes.push(down);
		nodes.push(left);
		nodes.push(right);
		return nodes;
	};

// 路徑容器 class
	var node_path=function(){};
	node_path.prototype=new Array;
	node_path.prototype.pushByUniquePos=function(pos,autoPush){
		var autoPush= autoPush==undefined ? true : autoPush;		// 可以用來檢查是否存在
		if(this.every(function(val,idx){
			if(val.x==pos.x && val.y==pos.y){
				return false
			}
			else{
				return true;
			}
		})){
			( (pos instanceof node) && autoPush) ? this.push(pos) : undefined;
			return {success:true,data:pos};
		}
		else{
			return {success:false,data:pos};	// 重複的節點
		};
	};

	// get pos with min F value
	node_path.prototype.getPosWithMinF=function(){
		var pos=this[0];
		this.forEach(function(val,idx){
			pos = pos.f>=val.f ? val : pos;
		});
		return pos;
	};

	// get pos with min G value
	node_path.prototype.getPosWithMinG=function(){
		var pos=this[0];
		this.forEach(function(val,idx){
			pos = pos.g>=val.g ? val : pos;
		});
		return pos;
	};

	// get pos with min H value
	node_path.prototype.getPosWithMinH=function(){
		var pos=this[0];
		this.forEach(function(val,idx){
			pos = pos.h>=val.h ? val : pos;
		});
		return pos;
	};

	// calculate all F=G+H, calAllFValue({x:1,y:2},{x:7,y:8})
	node_path.prototype.calAllFValue=function(spos,tpos){
		var spos=spos || pos.spos;
		var tpos=tpos || pos.tpos;
		var posArray=this;this.forEach(function(val,idx){
			var k=node_path.cal_fgh(spos,val,tpos);
			posArray[idx]=new node(k.x, k.y, k.f, k.g, k.h);
		});

		return posArray;
	};

	// get union multi pos with another pos x,y array
	node_path.prototype.getPosWithUnion=function(pos_list){
		var pos=new node_path;
		var _this=this;
		pos_list.forEach(function(val,idx){
			var isUnion=!_this.pushByUniquePos(val,false).success;
			if(isUnion){pos.pushByUniquePos(val)}
		});
		return pos;
	};

	// remove Pos from list
	node_path.prototype.removePos=function(pos){
		var _this=this;
		this.every(function(val,idx){
			if(val.x==pos.x && val.y==pos.y){
				_this.splice(idx,1);
				return false;
			}
			else{
				return true;
			}
		});
	};

	// 非必要不會直接調用
	// static method, node_path.cal_fgh({x:1,y:1},{x:0,y:0},{x:2,y:2})
	node_path.cal_fgh=function(spos,cpos,tpos){
		var g=Math.sqrt(Math.pow(Math.abs(cpos.x-spos.x),2)+Math.pow(Math.abs(cpos.y-spos.y),2),2);
		var h=Math.sqrt(Math.pow(Math.abs(cpos.x-tpos.x),2)+Math.pow(Math.abs(cpos.y-tpos.y),2),2);
		var f=g+h;
		return { f:g+h, g:g, h:h, x:cpos.x, y:cpos.y };
	};

// 計算路徑的遞迴
	var calPaths=function(pos){
		open=new node_path;
		close=new node_path;

		var s0=new node(pos.spos.x,pos.spos.y);
		open.pushByUniquePos(s0);

		while(close.pushByUniquePos(pos.tpos,false).success){
			open.calAllFValue();
			var s1=open.getPosWithMinH();	//getPosWithMinF();		// 改用 H 值
			open.removePos(s1);
			close.pushByUniquePos(s1);

			// Debug
			$('td[pos='+s1.x+'-'+s1.y+']').css({backgroundColor:'orange'});
			prompt('Enter下一步!').toString();


			var _nearNodes=s1.openNearNodes();
			_nearNodes.calAllFValue();

			console.log(_nearNodes);

			var nearNodes=removeTouchWallAndClampNodes(_nearNodes);

			nearNodes.forEach(function(val,idx){
				var f1=close.pushByUniquePos(val,false);
				var f2=open.pushByUniquePos(val,false);
				if(f1.success && f2.success){
					open.pushByUniquePos(val);
				};
			});
		};
	};

// 移除牆壁的nearNodes
	var removeTouchWallAndClampNodes=function(node_path_nearNodes){
		var new_node_path=new node_path;
		for(var i=0;i<node_path_nearNodes.length;i++){
			
			// 障礙物條件
			var wall=$('td[pos='+node_path_nearNodes[i].x+'-'+node_path_nearNodes[i].y+']').attr('wall');
			
			// 撞牆的
			if(wall==1){
				// node_path_nearNodes.removePos(node_path_nearNodes[i]);	// 直接 remove 會造成 index 錯亂
			}
			// 超過地圖的
			else if(node_path_nearNodes[i].x<0 || node_path_nearNodes[i].y<0 || node_path_nearNodes[i].x>9 || node_path_nearNodes[i].y>9){
				// node_path_nearNodes.removePos(node_path_nearNodes[i]);	// 直接 remove 會造成 index 錯亂
			}
			else{
				new_node_path.pushByUniquePos(node_path_nearNodes[i])
			};
		};
		
		return new_node_path;
	};

// 設定目標與原點
	var pos={
		spos:{x:1,y:1},
		tpos:{x:6,y:1}
	};

// 測試開始
	// View
		var drawPos=function(pos){
			var p=$('<span class="p"></span>').html('p').css('color','blue');
			var t=$('<span class="t"></span>').html('t').css('color','red');
			p.appendTo($('td[pos='+pos.spos.x+'-'+pos.spos.y+']'));
			t.appendTo($('td[pos='+pos.tpos.x+'-'+pos.tpos.y+']'));
		};
	// Develop
		setTimeout(function(e){
			drawPos(pos);
			calPaths(pos);
		},1000);