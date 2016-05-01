// 浅拷贝
function extendCopy(p) {
  var c = {};
　for (var i in p) {
　　c[i] = p[i];
　}
　c.uber = p;
　return c;
}


// 深拷贝
//　p中赋给c
function deepCopy(c, p) {　　　　
	var c = c || {};
	for (var i in p) {
		if (p[i] && typeof p[i] === 'object') {	　　　　　　
			c[i] = (p[i].constructor === Array) ? [] : {};			　　　　　　　　
			deepCopy(c[i], p[i]);		　　　　　　
		} else {			　　　　　　　　　
			c[i] = p[i];			　　　　　　
		}　　　　
	}	　　　　
	return c;　　
}
