//初始化
(function() {
	mui.init({
		//事件监听类型
		gestureConfig: {
			tap: true,
			doubletap: true,
			longtap: true,
			swipe: true,
			drag: true,
			hold: false,
			release: false
		}
	});
	//预加载
	document.addEventListener('plusready', function() {
		createWebview('edit.html');
	});
	//重新预加载edit
	function loadEdit() {
		createWebview('edit.html');
	}
	window.addEventListener('loadEdit', function() {
		plus.webview.getWebviewById('edit.html').close();
		loadEdit();
	});
	//列表滚动属性
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.001, //阻尼系数
		bounce: true //是否回弹
	});
	//双击NavBar返回顶部
	mui('.mui-bar').on('doubletap', 'h1', function() {
		mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 500);
	});
})();
//数据载入
(function() {
	//判断本地是否有数据
	if (!localStorage.getItem('data')) {
		document.querySelector('.listNull').style.display = 'block';
		return;
	};
	//JSON --> JS 对象
	var list = JSON.parse(localStorage.getItem('data'));
	//BillPanel数据加载
	var billPanelLoad = function() {
		var date = new Date();
		var curYear = String(date.getFullYear()),
			curMonth = String(format(date.getMonth() + 1));
		var curMonthIn = 0,
			curMonthOut = 0,
			surplus = 0; //当月收支,结余
		var curList = list[curYear + curMonth];
		//如果当月无数据，则不执行
		if (!curList) return;
		//遍历当月数据
		for (var k in curList) {
			for (var j in curList[k]) {
				if (curList[k][j].type == 1) {
					curMonthIn += Number(curList[k][j].money);
				} else {
					curMonthOut += Number(curList[k][j].money);
				}
			}
		}
		curMonthIn = curMonthIn.toFixed(2);
		curMonthOut = curMonthOut.toFixed(2);
		surplus = (curMonthIn - curMonthOut).toFixed(2);
		mui('.m-billPanel .u-in')[0].innerHTML = '￥' + curMonthIn;
		mui('.m-billPanel .u-out')[0].innerHTML = '￥' + curMonthOut;
		mui('.m-billPanel .u-surplus')[0].innerHTML = '￥' + surplus;
	};
	billPanelLoad();
	//BillList数据加载
	var billListLoad = (function() {
		var billList = document.getElementById('billList');
		for (var i in list) {
			//创建月份账单容器
			var monthList = document.createElement('div');
			monthList.className = 'monthList';
			var year = i.substr(0, 4),
				month = i.substr(4, 2),
				catStr = year + '-' + month;
			//创建月份表头
			var monthItem = document.createElement('li');
			monthItem.className = 'monthItem mui-table-view-divider'
			monthItem.innerHTML += '<span>' + year + ' / </span><h3>' + month + '</h3>';
			for (var j in list[i]) {
				//创建日账单容器
				var dateList = document.createElement('div');
				dateList.className = 'dateList';
				//date在json中为自动排序首位不补0，应用场景中补0
				var date = format(j);
				var day = getDay(catStr + '-' + date);
				//插入日期/星期
				dateList.innerHTML += '<div class="dateItem"><span class="date">' + date + '</span><span class="day">' + day + '</span></div>';
				//创建日账单列表
				var oneList = document.createElement('ul');
				oneList.className = 'oneList mui-table-view';
				for (var k in list[i][j]) {
					var detail = list[i][j][k];
					var id = i + '-' + j + '-' + k; //记录的标识
					var type = detail.type == 1 ? "in" : "out", //该条数据类型
						money = Number(detail.money).toFixed(2), //str->num+两位小数
						classType = getClassTypeStr(detail.classType);
					//向前插入内容(新字符串+原字符串)
					oneList.innerHTML = '<li id="' + id + '" class="one mui-table-view-cell mui-media"><div class="mui-slider-right mui-disabled"><a class="mui-btn mui-btn-red">删除</a></div><div class="mui-slider-handle"><a class="info" href="javascript:;"><i class="mui-media-object mui-pull-left u-icon-class u-icon-class-' + detail.classType + '"></i><div class="mui-media-body"><h4>' + classType + '</h4><span class="u-' + type + '">￥' + money + '</span><p class="mui-ellipsis">' + detail.remark + '</p></div></a></div></li>' + oneList.innerHTML;
				}
				dateList.appendChild(oneList);
				//将日账单容器插入月份账单容器
				monthList.insertBefore(dateList, monthList.childNodes[0]);
				//将月份表头插入月份账单容器
				monthList.insertBefore(monthItem, monthList.childNodes[0]);
			}
			billList.insertBefore(monthList, billList.childNodes[0]);
		}
	})();
	//删除单条记录
	mui('#billList').on('tap', '.mui-btn', function(event) {
		var elem = this;
		var li = elem.parentNode.parentNode;
		var dateList = li.parentNode.parentNode; //父级日列表
		var monthList = dateList.parentNode;
		mui.confirm('确认删除该条记录？', '提醒', ['确认', '取消'], function(e) {
			if (e.index == 0) {
				var id = li.id;
				var path = id.split('-');
				//				console.log(path[0]+','+path[1]+','+path[2]);
				//删除list中对应对象
				delete list[path[0]][path[1]][path[2]];
				//删除空的父对象
				if (isEmptyObject(list[path[0]][path[1]])) {
					delete list[path[0]][path[1]];
					if (isEmptyObject(list[path[0]])) {
						delete list[path[0]];
					}
				}
				//同步到本地数据库
				localStorage.setItem('data', JSON.stringify(list));
				//删除节点
				li.parentNode.removeChild(li);
				//删除空的父节点
				if (isEmptyArray(dateList.querySelectorAll('.one'))) dateList.parentNode.removeChild(dateList);
				if (isEmptyArray(monthList.querySelectorAll('.dateList'))) monthList.parentNode.removeChild(monthList);
				//刷新billPanel
				billPanelLoad();
				//刷新webview
				reloadHomeWebview();
				reloadChartWebview();
			} else {
				setTimeout(function() {
					mui.swipeoutClose(li);
				}, 0);
			}
			setTimestamp(); //设置时间戳
		});
	});
	//打开编辑单条记录
	mui('#billList').on('tap', '.one .info', function(e) {
		var elem = this;
		var li = elem.parentNode.parentNode;
		var arg = li.id.split('-');
		var edit = plus.webview.getWebviewById('edit.html');
		mui.fire(edit, 'arg', {
			path0: arg[0],
			path1: arg[1],
			path2: arg[2]
		});
		plus.webview.show('edit.html', 'slide-in-top', 400);
	});
})();
console.log(localStorage.loginInfo);
//同步
(function() {
	var syncBtn = document.getElementById('j-syncBtn');
	syncBtn.addEventListener('click', function() {
		//判断登录状态
		if (localStorage.loginInfo) {
			if (1) { //有时间戳
				var userid = localStorage.loginInfo.split('&')[0];
				var userkey = localStorage.loginInfo.split('&')[1];
				var w = plus.nativeUI.showWaiting('正在发送时间戳');
				ajax({
					url: 'https://api.yingfeng.me/br/compare.php',
					method: 'POST',
					data: {
						user_id: userid,
						user_key: userkey,
						time: Number(localStorage.timestamp)
					},
					success: function(data) {
						console.log('localStorage.timestamp='+localStorage.timestamp)
						var arg = data[0].split(';');
						if (arg[0] == 'T') {
							//授权码正确
							if (arg[1] == 'upload') {
								//上传数据表
								w.setTitle('正在上传');
								ajax({
									url: 'https://api.yingfeng.me/br/upload.php',
									method: 'POST',
									data: {
										user_id: userid,
										user_key: userkey,
										data: localStorage.data,
										time: Number(localStorage.timestamp)
									},
									success: function(data) {
										var arg = data[0].split(';');
										if (arg[0] == 'T') {
											if (arg[1] == 'S') mui.toast('同步成功');
											else mui.toast('服务器写入失败');
											w.close();
										} else {
											mui.toast('登录信息过期，请重新登录');
											w.close();
										}
									},
									error: function(data) {
										mui.toast('上传数据失败' + data);
										w.close();
									}
								});
							} else if (arg[1] == 'download') {
								//下载数据表
								w.setTitle('正在下载');
								ajax({
									url: 'https://api.yingfeng.me/br/download.php',
									method: 'GET',
									data: {
										user_id: userid,
										user_key: userkey
									},
									success: function(data) {
										console.log(data);
										var arg = data[0].split(';');
										if (arg[0] == 'T') {
											mui.toast('同步成功');
											localStorage.data = arg[1];
											localStorage.timestamp = arg[2];
											reloadBillWebview();
											reloadHomeWebview();
											reloadChartWebview();
											w.close();
										} else {
											mui.toast('登录信息过期，请重新登录');
											w.close();
										}
									},
									error: function(data) {
										mui.toast('下载数据失败' + data);
										w.close();
									}
								});
							} else if (arg[1] == 'same') {
								mui.toast('数据一致无需同步');
								w.close();
							}
						} else {
							//授权码错误
							mui.toast('登录信息过期，请重新登录');
							w.close();
						}
					},
					error: function(data) {
						mui.toast('网络异常，无法同步');
						w.close();
					}
				});
			}
		} else {
			mui.toast('客官，登录后才可以同步哦')
		}
	});
})();