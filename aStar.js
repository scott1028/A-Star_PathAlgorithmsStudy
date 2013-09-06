// 路徑容器
	var node_path=function(){};
	node_path.prototype=new Array;
	node_path.prototype.pushByUniquePos=function(pos){
		if(this.every(function(val,idx){
			if(val.x==pos.x && val.y==pos.y){
				return false
			}
			else{
				return true;
			}
		})){
			this.push(pos);
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
		var posArray=this;this.forEach(function(val,idx){posArray[idx]=node_path.cal_fgh(spos,val,tpos)});
	};

	// get union multi pos with another pos x,y array
	node_path.prototype.getPosWithUnion=function(pos_list){
		var pos=new node_path;
		pos_list.forEach(function(val,idx){

		});
	};

	// static method, node_path.cal_fgh({x:1,y:1},{x:0,y:0},{x:2,y:2})
	node_path.cal_fgh=function(spos,cpos,tpos){
		var g=Math.sqrt(Math.pow(Math.abs(cpos.x-spos.x),2)+Math.pow(Math.abs(cpos.y-spos.y),2),2);
		var h=Math.sqrt(Math.pow(Math.abs(cpos.x-tpos.x),2)+Math.pow(Math.abs(cpos.y-tpos.y),2),2);
		var f=g+h;
		return { f:g+h, g:g, h:h, x:cpos.x, y:cpos.y };
	};