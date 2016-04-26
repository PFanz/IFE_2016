(function(){
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
				event.target.innerHTML = '&gt;';
			} else{
				var colElements = document.getElementsByClassName('sort');
				for(var i=0,len=colElements.length; i<len; i++){
					colElements[i].innerHTML = '&lt;&gt;';
				}
				event.target.innerHTML = '&lt;';
			}
			var sortCol = document.getElementsByClassName(event.target.id);
			document.getElementsByClassName('row-1');
			var rowCols = document.getElementsByTagName('tr');
			var temp = '';
			for(var i=1,len=rowCols.length; i<len; i++) {
				for(var j=1,len=rowCols.length-i; j<len; j++){
					if(ascending){
						if(document.getElementsByClassName('row-'+j)[0].getElementsByClassName(event.target.id)[0].innerHTML*1 > document.getElementsByClassName('row-'+(j+1))[0].getElementsByClassName(event.target.id)[0].innerHTML*1 ){
							console.log(document.getElementsByClassName('row-'+j)[0].innerHTML);
							console.log(document.getElementsByClassName('row-'+(j+1))[0].innerHTML);
							temp = document.getElementsByClassName('row-'+j)[0].innerHTML;
							document.getElementsByClassName('row-'+j)[0].innerHTML = document.getElementsByClassName('row-'+(j+1))[0].innerHTML;
							document.getElementsByClassName('row-'+(j+1))[0].innerHTML = temp;
							console.log(document.getElementsByClassName('row-'+j)[0].innerHTML);
							console.log(document.getElementsByClassName('row-'+(j+1))[0].innerHTML);
						}
						
					} else {
						if(document.getElementsByClassName('row-'+j)[0].getElementsByClassName(event.target.id)[0].innerHTML*1 < document.getElementsByClassName('row-'+(j+1))[0].getElementsByClassName(event.target.id)[0].innerHTML*1 ){
							console.log(document.getElementsByClassName('row-'+j)[0].innerHTML);
							console.log(document.getElementsByClassName('row-'+(j+1))[0].innerHTML);
							temp = document.getElementsByClassName('row-'+j)[0].innerHTML;
							document.getElementsByClassName('row-'+j)[0].innerHTML = document.getElementsByClassName('row-'+(j+1))[0].innerHTML;
							document.getElementsByClassName('row-'+(j+1))[0].innerHTML = temp;
							console.log(document.getElementsByClassName('row-'+j)[0].innerHTML);
							console.log(document.getElementsByClassName('row-'+(j+1))[0].innerHTML);
						}
						
					}
				}
			}



		}
	})

})();