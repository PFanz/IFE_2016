var SortTable = function SortTable(){
	this.cfg = {
		data: [
			['姓名','语文','数学','英语','总分'],
			['小明','80','90','70','240'],
			['小红','90','60','90','240'],
			['小亮','60','100','70','230']
		]
	};
}

SortTable.prototype = deepCopy(new Widget(), {

	renderUI: function(){
		this.boundingBox = document.createElement('table');
		this.boundingBox.className = 'sort-table';

		// 列数以标题为准，多的列忽略
		var data = this.cfg.data;
		console.log(data);
		var colLen = data[0].length;
		var tableStr = '<thead><tr>';
		for(var i=0; i<colLen; i++){
			tableStr += '<th>'+data[0][i]+'<span class="sort" id="col-' + i + '">&lt;&gt;</span></th>'
		}
		tableStr += '</tr></thead>';

		tableStr += '<tbody>';
		for(var i=1,len=data.length; i<len; i++){	
			tableStr += '<tr class="row-' + i + '">';
			for(var j=0; j<colLen; j++){
				tableStr += '<td class="col-' + j + '">' + data[i][j] +'</td>';
											
			}
			tableStr += '</tr>';
		}
		this.boundingBox.innerHTML += tableStr;
	},

	bindUI: function(){
		var that = this;
		var ascending = false; // 升序true/降序false
		var theadElement = document.getElementsByTagName('thead')[0];
		theadElement.addEventListener('click', function(event){
			if(event.target.className == 'sort'){
				ascending = !ascending;
				if(ascending){
					var colElements = document.getElementsByClassName('sort');
					for(var i=0,len=colElements.length; i<len; i++){
						colElements[i].innerHTML = '&lt;&gt;';
					}
					event.target.innerHTML = '&lt;';
				} else{
					var colElements = document.getElementsByClassName('sort');
					for(var i=0,len=colElements.length; i<len; i++){
						colElements[i].innerHTML = '&lt;&gt;';
					}
					event.target.innerHTML = '&gt;';
				}
				var sortCol = document.getElementsByClassName(event.target.id);
				document.getElementsByClassName('row-1');
				var rowCols = document.getElementsByTagName('tr');
				var temp = '';
				for(var i=1,len=rowCols.length; i<len; i++) {
					for(var j=1,len=rowCols.length-i; j<len; j++){
						if(ascending){
							if(document.getElementsByClassName('row-'+j)[0].getElementsByClassName(event.target.id)[0].innerHTML*1 > document.getElementsByClassName('row-'+(j+1))[0].getElementsByClassName(event.target.id)[0].innerHTML*1 ){
								temp = document.getElementsByClassName('row-'+j)[0].innerHTML;
								document.getElementsByClassName('row-'+j)[0].innerHTML = document.getElementsByClassName('row-'+(j+1))[0].innerHTML;
								document.getElementsByClassName('row-'+(j+1))[0].innerHTML = temp;
							}	
						} else {
							if(document.getElementsByClassName('row-'+j)[0].getElementsByClassName(event.target.id)[0].innerHTML*1 < document.getElementsByClassName('row-'+(j+1))[0].getElementsByClassName(event.target.id)[0].innerHTML*1 ){
								temp = document.getElementsByClassName('row-'+j)[0].innerHTML;
								document.getElementsByClassName('row-'+j)[0].innerHTML = document.getElementsByClassName('row-'+(j+1))[0].innerHTML;
								document.getElementsByClassName('row-'+(j+1))[0].innerHTML = temp;
							}
							
						}
					}
				}
			}
		})
	},

	syncUI: function(){

	},

	destructor: function(){

	},

	createTable: function(cfg){
		deepCopy(this.cfg, cfg);
		this.render();
		return this;
	}
})