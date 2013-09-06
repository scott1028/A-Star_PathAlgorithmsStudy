// 點的容器
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

// 路徑容器
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

	// calculate all F=G+H
	node_path.prototype.calAllFValue=function(spos,tpos){
		var posArray=this;this.forEach(function(val,idx){
			var k=node_path.cal_fgh(spos,val,tpos);
			posArray[idx]=new node(k.x, k.y, k.f, k.g, k.h);
		});
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

	// static method, node_path.cal_fgh({x:1,y:1},{x:0,y:0},{x:2,y:2})
	node_path.cal_fgh=function(spos,cpos,tpos){
		var g=Math.sqrt(Math.pow(Math.abs(cpos.x-spos.x),2)+Math.pow(Math.abs(cpos.y-spos.y),2),2);
		var h=Math.sqrt(Math.pow(Math.abs(cpos.x-tpos.x),2)+Math.pow(Math.abs(cpos.y-tpos.y),2),2);
		var f=g+h;
		return { f:g+h, g:g, h:h, x:cpos.x, y:cpos.y };
	};