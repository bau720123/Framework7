//初始化
var myApp = new Framework7({

	//快取
	cache: true, //是否打開Ajax緩存，因為Framework7使用ajax加載新頁面，最好啟用Ajax緩存，特別是你的頁面內容不經常更新的時候。
	cacheDuration: 1000*60*10, //Ajax緩存時間，在緩存有效期內加載頁面不會發起新的ajax請求而是直接使用緩存的結果。默認是10分鐘。
	cacheIgnore: [], //不希望被緩存的URL，這是一個字符串數組。
	cacheIgnoreGetParameters: false, //緩存是否忽略get參數，如果為"true"，那麼像 "about.html?id=2" 和 "about.html?id=3" 將會和 "about.html" 是一樣的緩存。

	//向後滑動（只適用於iOS主題）
	swipeBackPage: false, //設定是否開啟由左往右滑回到上一頁的功能
	swipeBackPageThreshold: 0, //要滑動超過多少像素才算是真正的滑動
	swipeBackPageActiveArea: 30, //可設定從多少像素包含之內處滑動就可以打開面板
	swipeBackPageAnimateShadow: false, //在滑動觸發上一頁動作期間啟用/禁用陰影動畫。若禁用可提高性能
	swipeBackPageAnimateOpacity :true,  //在滑動觸發上一頁動作期間啟用/禁用透明度動畫。若禁用可提高性能

	//可排序列表
	sortable: false, //如果您不使用排序列表，您可以禁用它，以獲得更好的性能。

	//滑出
	swipeout: false, //如果您不使用滑出功能，您可以禁用它，以獲得更好的性能。

	//側面板
	swipePanel: 'both', //可設定left或是right或是both，可設定滑哪邊開啟哪邊的面板
	swipePanelCloseOpposite: true, //可設定當滑哪邊時，關閉反方向的面板
	swipePanelOnlyClose: false, //此參數允許用滑動來關閉（但不打開）面板
	swipePanelActiveArea: 10, //可設定從多少像素處滑動才可以打開面板，0代表最邊界的地方
	swipePanelNoFollow: false, //若設定為true，則不會紀錄手指移動的軌跡
	swipePanelThreshold: 10, //要滑動超過多少像素才算是真正的滑動
	panelsCloseByOutside: true, //設定若觸碰到面板的外部區域時是否關閉面板

	//模組
	modalTitle: '這是標題', //模式的默認標題（提醒，確認，提示）
	modalButtonOk: '確認', //確認按鈕的預設文字
	modalButtonCancel: '取消', //取消按鈕的預設文字
	modalPreloaderTitle: '讀取中...', //讀取中的預設文字
	modalCloseByOutside: true, //啟用或禁用通過點擊對話視窗外來關閉模組（警報，確認，提示）的能力
	actionsCloseByOutside: true, //啟用或禁用通過點擊ActionSheet視窗外來關閉模組（警報，確認，提示）的能力
	popupCloseByOutside: true, //啟用或禁用通過點擊popup視窗外來關閉模組（警報，確認，提示）的能力
	popoverCloseByOutside: true, //啟用或禁用通過點擊popoverCloseByOutside視窗外來關閉模組（警報，確認，提示）的能力
	modalUsernamePlaceholder: '帳號', //登入模組中帳號欄位的提示文字
	modalPasswordPlaceholder: '密碼', //登入模組中密碼欄位的提示文字
	modalStack: true, //此功能不允許同時打開多個模組視窗，當您關閉當前模式時，它將自動打開下一個視窗。這種行為類似於瀏覽器本機提醒視窗

	//聰明選擇

	//導航欄、工具欄
	hideNavbarOnPageScroll: false, //設定滾動時是否隱藏Navbar
	hideToolbarOnPageScroll: false, //設定滾動時是否隱藏Toolbar
	hideTabbarOnPageScroll: false, //設定滾動時是否隱藏Tabbar
	showBarsOnPageScrollEnd: true, //設定當滾動到最下方時是否顯示Navbar跟Toolbar
	showBarsOnPageScrollTop: true, //設定false則當滾動到最上方時才顯示Navbar跟Toolbar
	scrollTopOnNavbarClick: false, //設定true則每個點擊導航欄中的"center"元素將滾動當前活動的頁面到頂部

	//圖片延遲讀取
	imagesLazyLoadThreshold: 0, //默認情況下，圖像在屏幕上顯示時才加載。若將其設置為50將在視口出現50像素之前加載圖像
	imagesLazyLoadSequential: true, //如果啟用，那麼當它們出現在視口中時，圖像將逐個加載
	//imagesLazyLoadPlaceholder: '', //延遲加載圖像在未真正顯示圖片時的提醒文字。默認情況下是1x1像素圖像
	onLazyLoad: function(el) { myApp.alert('開始讀取圖片'); }, //開始讀取圖片
	onLazyLoaded: function(el) { myApp.alert('讀取圖片完畢'); }, //讀取圖片完畢
	onLazyError: function(el) { myApp.alert('讀取圖片失敗'); }, //讀取圖片失敗

	//頁面呼叫應用

	//Ajax呼叫應用
	onAjaxStart: function(xhr) { myApp.showIndicator(); }, //頁面載入前
	onAjaxComplete: function(xhr) { myApp.hideIndicator(); }, //頁面載入後
})

function listArray(main)
{
var s = "";
for(key in main)
s += key + ": " + main[key] + "\n";
return s;
}

var $$ = Dom7; //輸出選擇器引擎  

var mainView = myApp.addView('.view-main', 
{
dynamicNavbar: true,
}); 

myApp.onPageInit('about', function(page)
{
  $$('.create-page').on('click', function() 
  {
  createContentPage();
  });
});

var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}

//首頁觸發
myApp.onPageInit('index', function(page)
{
	
}).trigger();

$$(document).on('pageInit', function(e)
{
var page = e.detail.page;
	
	if(page.name === 'accordion')
	{
		$$('.accordion-item').on('accordion:open', function ()
		{
		myApp.alert('手風琴打開');
		});
		$$('.accordion-item').on('accordion:opened', function ()
		{
		myApp.alert('手風琴已打開');
		});
		$$('.accordion-item').on('accordion:close', function (e)
		{
		myApp.alert('手風琴關閉');
		});
		$$('.accordion-item').on('accordion:closed', function (e)
		{
		myApp.alert('手風琴已關閉');
		});
	}

	if(page.name === 'autocomplete')
	{
    var fruits = ('Apple Apricot Avocado Banana Melon Orange Peach Pear Pineapple').split(' ');

		var autocompleteDropdownExpand = myApp.autocomplete(
		{
		input: '#autocomplete-dropdown-expand',
		openIn: 'dropdown',
		dropdownPlaceholderText: '請打 "Apple" 試試看',
		expandInput: true, //是否要展開欄位
			source: function (autocomplete, query, render)
			{
			var results = [];
              
				//如果註解這段就會將全部結果顯示出來
				if (query.length === 0)
				{
				render(results);
				return;
				}
              
				//搜尋符合的項目
				for (var i = 0; i < fruits.length; i++)
				{
                if(fruits[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(fruits[i]);
				}
              
			render(results); //通過傳遞具有結果項目的數組渲染項目
			}
		});
      
		var autocompleteDropdownAjax = myApp.autocomplete(
		{
		input: '#autocomplete-dropdown-ajax',
		openIn: 'dropdown',
		preloader: true, //是否啟用預存載入
		valueProperty: 'id', //項目的編號
		textProperty: 'name', //項目的值
		limit: 20, //一次最多顯示幾筆結果
		dropdownPlaceholderText: '請打 "Javascript" 試試看',
		expandInput: true, //是否要展開欄位
			source: function (autocomplete, query, render)
			{
			var results = [];
				
				//如果註解這段就會將全部結果顯示出來
				if (query.length === 0)
				{
				render(results);
				return;
				}
			
            autocomplete.showPreloader();

				$$.ajax(
				{
				url: 'js/autocomplete-languages.json',
				method: 'GET',
				dataType: 'json',
                data: { query: query },
					success: function (data)
					{
                      
						//搜尋符合的項目
						for (var i = 0; i < data.length; i++)
						{
						if (data[i].name.toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(data[i]);
						}
						
                    autocomplete.hidePreloader();
                    render(results); //通過傳遞具有結果項目的數組渲染項目
					}
				});
			}
		});
      
		var autocompleteStandaloneSimple = myApp.autocomplete(
		{
		openIn: 'page',
		opener: $$('#autocomplete-standalone'), //鏈接打開自動填充
		backOnSelect: true, //選擇一些東西之後回到上頁
		multiple: true, //允許選擇多個值
			source: function (autocomplete, query, render)
			{
			var results = [];
				
				//如果註解這段就會將全部結果顯示出來
				if (query.length === 0)
				{
                render(results);
                return;
				}
              
				//搜尋符合的項目
				for (var i = 0; i < fruits.length; i++)
				{
                if (fruits[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(fruits[i]);
				}

            render(results); //通過傳遞具有結果項目的數組渲染項目
			},
			onChange: function (autocomplete, value)
			{
            $$('#autocomplete-standalone').find('.item-after').text(value.join(', ')); //將項目文本值添加到項目後
            $$('#autocomplete-standalone').find('input').val(value.join(', ')); //將項目值添加到輸入值
			}
		});
      
		var autocompleteStandalonePopup = myApp.autocomplete(
		{
		openIn: 'popup',
		opener: $$('#autocomplete-standalone-popup'), //鏈接打開自動填充
        backOnSelect: true, //選擇一些東西之後回到上頁
        multiple: true, //允許選擇多個值
			source: function (autocomplete, query, render)
			{
			var results = [];
			
				//如果註解這段就會將全部結果顯示出來
				if (query.length === 0)
				{
                render(results);
                return;
				}
				
				//搜尋符合的項目
				for (var i = 0; i < fruits.length; i++)
				{
                if (fruits[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(fruits[i]);
				}

			render(results); //通過傳遞具有結果項目的數組渲染項目
			},
			onChange: function (autocomplete, value)
			{
            $$('#autocomplete-standalone-popup').find('.item-after').text(value.join(', ')); //將項目文本值添加到項目後
            $$('#autocomplete-standalone-popup').find('input').val(value.join(', ')); //將項目值添加到輸入值
			}
		});
      
		var autocompleteStandaloneAjax = myApp.autocomplete(
		{
		openIn: 'page',
		opener: $$('#autocomplete-standalone-ajax'),//鏈接打開自動填充
		multiple: true, //允許選擇多個值
		valueProperty: 'id', //項目的值
		textProperty: 'name', //一次最多顯示幾筆結果
		limit: 50,
		preloader: true,
			source: function (autocomplete, query, render)
			{
			var results = [];
			
				//如果註解這段就會將全部結果顯示出來
				if (query.length === 0)
				{
                render(results);
                return;
				}
            
			autocomplete.showPreloader();

				$$.ajax(
				{
				url: 'js/autocomplete-languages.json',
				method: 'GET',
				dataType: 'json',
				data: { query: query },
					success: function (data)
					{
						
						//搜尋符合的項目
						for (var i = 0; i < data.length; i++)
						{
						if (data[i].name.toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(data[i]);
						}
						
                    autocomplete.hidePreloader();
                    render(results); //通過傳遞具有結果項目的數組渲染項目
					}
				});
			},
			onChange: function (autocomplete, value)
			{
			var itemText = [], inputValue = [];
				
				//搜尋符合的項目
				for (var i = 0; i < value.length; i++)
				{
                itemText.push(value[i].name);
                inputValue.push(value[i].id);
				}
				
            $$('#autocomplete-standalone-ajax').find('.item-after').text(itemText.join(', ')); //將項目文本值添加到項目後
            $$('#autocomplete-standalone-ajax').find('input').val(inputValue.join(', ')); //將項目值添加到輸入值
          }
		});
	}
	
	if(page.name === 'calendar')
	{
	var today = new Date();
	var weekLater = new Date().setDate(today.getDate() + 7);
	var weekDisable = new Date().setDate(today.getDate() + 3);
	var monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月' , '九月' , '十月', '十一月', '十二月'];
		var calendarDefault = myApp.calendar(
		{
		input: '#calendar-default',
		//dateFormat: 'DD, MM dd, yyyy', //時間格式
		dateFormat: 'yyyy-mm-dd', //日期格式
		multiple: true, //是否允許選擇多個日期
		rangePicker: true, //是否允許選擇範圍日期
			events: 
			{
			from: today,
			to: weekLater,
			},
			disabled:
			{
			from: today,
			to: weekDisable,
			},
		monthNames: monthNames,
		monthNamesShort: monthNames,
		dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
		dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
		firstDay: 0, //一星期的第一天為何，1是禮拜一
		//minDate: today,
		//maxDate: weekLater,
		closeOnSelect: true, //當選擇好日期時是否關閉視窗
		});
		
		var calendarInline = myApp.calendar(
		{
		container: '#calendar-inline-container',
		value: [new Date()],
		weekHeader: false,
		toolbarTemplate: 
		'<div class="toolbar calendar-custom-toolbar">' +
			'<div class="toolbar-inner">' +
				'<div class="left">' +
					'<a href="#" class="link icon-only"><i class="icon icon-back"></i></a>' +
				'</div>' +
				'<div class="center"></div>' +
				'<div class="right">' +
					'<a href="#" class="link icon-only"><i class="icon icon-forward"></i></a>' +
				'</div>' +
			'</div>' +
		'</div>',
			onOpen: function (p)
			{
			$$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
				$$('.calendar-custom-toolbar .left .link').on('click', function ()
				{
				calendarInline.prevMonth();
				});
				$$('.calendar-custom-toolbar .right .link').on('click', function ()
				{
				calendarInline.nextMonth();
				});
			},
			onMonthYearChangeStart: function (p)
			{
			$$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
			}
		});
	}
	if(page.name === 'calendar')
	{
		$$('.chip-delete').on('click', function (e)
		{
        e.preventDefault();
        var chip = $$(this).parents('.chip');
			myApp.confirm('你想刪除這個小型演示嗎？', function ()
			{
			chip.remove();
			});
		});
	}

	if(page.name === 'form')
	{
	//表單轉資料
	$$('.form-to-data').on('click', function()
	{
	var formData = myApp.formToData('#my-form');
	myApp.alert(JSON.stringify(formData));
	});

	//將預設資料填入表單
	$$('.form-from-data').on('click', function()
	{
		var formData = 
		{
		'name': 'John',
		'email': 'john@doe.com',
		'url': '78899',
		'password': '78899',
		'phone': '98765',
		'gender': 'Female',
		'birthday': '1983-01-23',
		'switch': ['yes'],
		'range': 10,
		'textarea': 'test',
		}
	myApp.formFromData('#my-form', formData);
	myApp.alert('已填入');
	});

	//獲得儲存的資料
	$$('.get-storage-data').on('click', function()
	{
	var storedData = myApp.formGetData('my-form');
		if(storedData)
		{
		myApp.alert(JSON.stringify(storedData));
		}
			else
			{
			myApp.alert('目前沒有任何儲存資料在這個表單裡，試著變更其它元素');
			}
	});

	//刪除儲存的資料
	$$('.delete-storage-data').on('click', function()
	{
	var storedData = myApp.formDeleteData('my-form');
	myApp.alert('表單裡面的儲存資料已經刪除');
	});

	//替換儲存的資料
	$$('.save-storage-data').on('click', function()
	{
		var storedData = myApp.formStoreData('my-form', 
		{
		'name': 'John1',
		'email': 'john@doe.com1',
		'url': '788991',
		'password': '788991',
		'phone': '987651',
		'gender': 'Male',
		'birthday': '1983-01-21',
		'switch': ['no'],
		'range': 20,
		'textarea': 'test1',
		});
	myApp.alert('表單裡面的儲存資料已經被替換，請刷新瀏覽器查看即可');
	myApp.formFromData('#my-form', storedData);
	});

	//已提交
	$$('form.ajax-submit').on('form:success', function (e)
	{
	myApp.alert('已提交');
	var xhr = e.detail.xhr;
	var data = e.detail.data;
	myApp.alert(xhr);
	myApp.alert(data);
	});

	//在提交之前
	$$('form.ajax-submit').on('form:beforesend', function(e)
	{
	myApp.alert('在提交之前');
	var xhr = e.detail.xhr;
	var data = e.detail.data;
	myApp.alert(xhr);
	myApp.alert(data);
	});

	//提交錯誤
	$$('form.ajax-submit').on('form:error', function(e)
	{
	myApp.alert('提交錯誤');
	var xhr = e.detail.xhr;
	var data = e.detail.data;
	myApp.alert('xhr︰' + xhr);
	myApp.alert('data︰' + data);
	});
	}
 
	if(page.name === 'infinitescroll')
	{
	var loading = false;
	var lastIndex = $$('.list-block-infinite li').length; //索引值的大小
	var maxItems = 60; //最多讀取幾筆資料
	var itemsPerLoad = 20; //每次讀取幾筆

		$$('.infinite-scroll').on('infinite', function ()
		{
		if (loading) return;
		loading = true;
			setTimeout(function ()
			{
			loading = false;

				if (lastIndex >= maxItems)
				{
				myApp.detachInfiniteScroll($$('.infinite-scroll'));
				$$('.infinite-scroll-preloader').remove();
				return;
				}

			var html = '';
			for (var i = lastIndex + 1; i <= lastIndex + itemsPerLoad; i++) {
			html += '<li class="item-content"><div class="item-inner"><div class="item-title">Item ' + i + '</div></div></li>';
			}

			$$('.list-block-infinite ul').append(html);

			lastIndex = $$('.list-block-infinite li').length;
			}, 1000);
		});
	}
	
	if(page.name === 'modal')
	{
	//警告
	$$('.alert-text-title-callback').on('click', function()
	{
		myApp.alert('這是內容', '這是標題', function()
		{
		myApp.alert('按鈕已點擊！')
		});
	});

	//確認
	$$('.confirm-title-ok-cancel').on('click', function()
	{
	myApp.confirm('你確定嗎？', '這是標題', 
		function()
		{
		myApp.alert('你點擊了確認按鈕');
		},
		function()
		{
		myApp.alert('你點擊了取消按鈕');
		}
	);
	});

	//提示
	$$('.prompt-title-ok-cancel').on('click', function()
	{
	myApp.prompt('你的名字是？', '這是標題', 
		function(value)
		{
		myApp.alert('你的姓名是：' + value + ' 你點擊了確認按鈕');
		},
		function(value)
		{
		myApp.alert('你的姓名是：' + value + ' 你點擊了取消按鈕');
		}
	);
	});

	//登入模組
	$$('.login-modal').on('click', function()
	{
		myApp.modalLogin('需要驗證', function(username, password)
		{
		myApp.alert('謝謝你！帳號：' + username + ' 密碼：' + password);
		});
	});

	//密碼模組
	$$('.password-modal').on('click', function()
	{
		myApp.modalPassword('請提供密碼：', function(password)
		{
		myApp.alert('你的密碼：' + password);
		});
	});
	
	//密碼模組
	$$('.nested-modal').on('click', function ()
	{
		myApp.prompt('你的名字是？', function (value)
		{
			myApp.confirm('你確定你的名字是︰' + value + '？', function ()
			{
            myApp.alert('好的，你的名字是︰"' + value + '"！');
			});
		});
	});

	//預載
	$$('.open-preloader-title').on('click', function()
	{
		myApp.showPreloader('這是標題')
		setTimeout(function()
		{
		myApp.hidePreloader();
		}, 2000);
	});

	//讀取
	$$('.open-indicator').on('click', function()
	{
		myApp.showIndicator();
		setTimeout(function ()
		{
		myApp.hideIndicator();
		}, 2000);
	});

	//對話框輪播圖
	$$('.open-slider-modal').on('click', function()
	{
	var modal = myApp.modal(
	{
	title: '漂亮的照片？',
	text: '你覺得這些照片如何？',
	afterText: '<div class="swiper-container" style="width: auto; margin:5px -15px -15px">' + 
			  '<div class="swiper-pagination"></div>' + 
			  '<div class="swiper-wrapper">' + 
			   '<div class="swiper-slide"><img src="http://lorempixel.com/270/150/nature/1/" height="150" style="display:block"></div>' + 
			   '<div class="swiper-slide"><img src="http://lorempixel.com/270/150/nature/2/" height="150" style="display:block"></div>' + 
			  '</div>' + 
			 '</div>',
	verticalButtons: false,
	buttons: 
	[
		{
		text: '差勁',
		bold: true,
			onClick: function()
			{
			myApp.alert('真是抱歉！')
			}
		},
		{
		text: '還可以',
		bold: true,
			onClick: function()
			{
			myApp.alert('我會更努力！')
			}
		},
		{
		text: '真棒！',
		bold: true,
			onClick: function()
			{
			myApp.alert('謝謝！我就知道你會喜歡！')
			}
		},
	]
	})
	myApp.swiper($$(modal).find('.swiper-container'), {pagination: '.swiper-pagination'});
	});

	//標籤切換
	$$('.open-tabs-modal').on('click', function()
	{
	myApp.modal(
	{
	title: '<div class="buttons-row">' +
		 '<a href="#tab_modal_1" class="button active tab-link">標籤一</a>' + 
		 '<a href="#tab_modal_2" class="button tab-link">標籤二</a>' + 
		'</div>',
	text: '<div class="tabs">' + 
		'<div class="tab active" id="tab_modal_1">標籤一的內容</div>'+
		'<div class="tab" id="tab_modal_2">標籤二的內容</div>'+
	   '</div>',
	buttons: 
	[
		{
		text: 'Ok，知道了',
		bold: true
		},
	]
	})
	});
	}
	
	if(page.name === 'popup')
	{
	$$('.open-popup').on('click', function()
	{
	myApp.popup('.popup-about');
	});
	$$('.close-popup').on('click', function()
	{
	myApp.closeModal('.popup-about');
	});
	$$('.popup-about').on('popup:open', function()
	{
	myApp.alert('popup打開');
	});
	$$('.popup-about').on('popup:opened', function()
	{
	myApp.alert('popup已打開');
	});
	$$('.popup-about').on('popup:close', function()
	{
	myApp.alert('popup關閉');
	});
	$$('.popup-about').on('popup:closed', function()
	{
	myApp.alert('popup已關閉');
	});

	$$('.create-popup').on('click', function () {
	var popupHTML = 
		'<div class="popup">'+
			'<div class="content-block">'+
				'<p>Popup created dynamically.</p>'+
				'<p><a href="#" class="close-popup">關閉</a></p>'+
			'</div>'+
		'</div>'
	myApp.popup(popupHTML);
	});
	}
	
	if(page.name === 'popover')
	{
		$$('.open-about').on('click', function ()
		{
		var clickedLink = this;
		myApp.popover('.popover-about', clickedLink);
		});
		$$('.open-links').on('click', function () {
		var clickedLink = this;
		myApp.popover('.popover-links', clickedLink);
		});
		$$('.create-about').on('click', function ()
		{
		var clickedLink = this;
		var popoverHTML = '<div class="popover">'+
							'<div class="popover-inner">'+
							  '<div class="content-block">'+
								'<p>About Popover created dynamically.</p>'+
								'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac diam ac quam euismod porta vel a nunc. Quisque sodales scelerisque est, at porta justo cursus ac.</p>'+
							  '</div>'+
							'</div>'+
						  '</div>'
		myApp.popover(popoverHTML, clickedLink);
		});
		$$('.create-links').on('click', function ()
		{
		var clickedLink = this;
		var popoverHTML = '<div class="popover">'+
							'<div class="popover-inner">'+
							  '<div class="list-block">'+
								'<ul>'+
								'<li><a href="#" class="item-link list-button">Link 1</li>'+
								'<li><a href="#" class="item-link list-button">Link 2</li>'+
								'<li><a href="#" class="item-link list-button">Link 3</li>'+
								'</ul>'+
							  '</div>'+
							'</div>'+
						  '</div>'
		myApp.popover(popoverHTML, clickedLink);
		});
	}
	
	if(page.name === 'actionsheet')
	{
		$$('.ac-4').on('click', function()
		{
		var buttons1 = 
		[
			{
			text: '分享',
			label: true,
			},
			{
			text: '電子郵件',
				onClick: function()
				{
				myApp.alert('電子郵件被點擊了');
				}
			},
			{
			text: '訊息',
				onClick: function()
				{
				myApp.alert('訊息被點擊了');
				}
			},
			{
			text: '該項目不能被點選',
			disabled: true, 
			},
		];
		var buttons2 = 
		[
		{
		text: '社交分享',
		label: true,
		},
		{
		text: 'Facebook',
			onClick: function()
			{
			myApp.alert('Facebook被點擊了');
			}
		},
		{
		text: 'Twitter',
			onClick: function()
			{
			myApp.alert('Twitter被點擊了');
			}
		}
		];
		var buttons3 = 
		[
		{
		text: '取消',
		color: 'red',
			onClick: function()
			{
			myApp.alert('取消被點擊了');
			}
		}
		];
		var groups = [buttons1, buttons2, buttons3];
		myApp.actions(groups);
		});
		
		$$('.m').on('actions:open', function()
		{
		myApp.alert('actionsheet畫面打開');
		});
		
		$$('.actions-modal').on('actions:opened', function()
		{
		myApp.alert('actionsheet畫面已打開');
		});
		
		$$('.actions-modal').on('actions:close', function()
		{
		myApp.alert('actionsheet畫面關閉');
		});
		
		$$('.actions-modal').on('actions:closed', function()
		{
		myApp.alert('actionsheet畫面已關閉');
		});
	}
	
	if(page.name === 'loginscreen')
	{
		$$('.open-login').on('click', function()
		{
		myApp.loginScreen();
		});
		
		$$('.login-screen .list-button').on('click', function ()
		{
        var username = $$('.login-screen input[name="username"]').val();
        var password = $$('.login-screen input[name="password"]').val();
			myApp.alert('帳號︰' + username + '、密碼︰' + password, function ()
			{
			 myApp.closeModal('.login-screen');
			});
		});
		
		$$('.login-screen').on('open', function()
		{
		myApp.alert('登入畫面打開');
		});
		
		$$('.login-screen').on('opened', function()
		{
		myApp.alert('登入畫面已打開');
		});
		
		$$('.login-screen').on('close', function()
		{
		myApp.alert('登入畫面關閉');
		});
		
		$$('.login-screen').on('closed', function()
		{
		myApp.alert('登入畫面已關閉');
		});
	}
	
	if(page.name === 'pickermodal')
	{
		//picker
		$$('.open-info').on('click', function()
		{
		myApp.pickerModal('.picker-info')
		});
		$$('.close-info').on('click', function()
		{
		myApp.closeModal('.picker-info')
		});
		
		$$('.picker-modal').on('picker:open', function()
		{
		myApp.alert('picker打開');
		});
		$$('.picker-modal').on('picker:opened', function()
		{
		myApp.alert('picker已打開');
		});
		$$('.picker-modal').on('picker:close', function()
		{
		myApp.alert('picker關閉');
		});
		$$('.picker-modal').on('picker:closed', function()
		{
		myApp.alert('picker已關閉');
		});

		//動態新增picker
		$$('.create-picker').on('click', function()
		{
		//如果picker已經打開的話，則先關掉本來的
		if($$('.picker-modal.modal-in').length > 0) { myApp.closeModal('.picker-modal.modal-in'); }

		myApp.pickerModal(
		'<div class="picker-modal">' +
		 '<div class="toolbar">' +
		   '<div class="toolbar-inner">' +
			'<div class="left"></div>' +
			'<div class="right"><a href="#" class="close-picker">關閉</a></div>' +
		   '</div>' +
		 '</div>' +
		 '<div class="picker-modal-inner">' +
		  '<div class="content-block">' +
		   '<p>Lorem ipsum dolor ...</p>' +
		  '</div>' +
		 '</div>' +
		'</div>'
		  )
		});
	}
	
	if(page.name === 'messages')
	{
	var conversationStarted = false; //會話狀態

		//初始化訊息
		var myMessages = myApp.messages('.messages', 
		{
		autoLayout:true,
		newMessagesFirst: false,
		scrollMessages: true,
		scrollMessagesOnlyOnEdge: false,
		});

	//初始化訊息條
	var myMessagebar = myApp.messagebar('.messagebar');

		$$('.messagebar .link').on('click', function ()
		{
		var messageText = myMessagebar.value().trim(); //訊息文字
		if (messageText.length === 0) return; //如果訊息是空的則離開
		myMessagebar.clear(); //清空訊息條
		var messageType = (['sent', 'received'])[Math.round(Math.random())]; //隨機的訊息類別

		//頭像和收到訊息的名稱
		var avatar, name;
			if(messageType === 'received')
			{
			avatar = 'http://lorempixel.com/output/people-q-c-100-100-9.jpg';
			name = 'Kate';
			}
			
			//新增訊息
			myMessages.addMessage(
			{
			text: messageText, //訊息文字
			type: messageType, //隨機的訊息類別
			avatar: avatar, //頭像跟名稱
			name: name,
			day: !conversationStarted ? 'Today' : false,
			time: !conversationStarted ? (new Date()).getHours() + ':' + (new Date()).getMinutes() : false
			})

		conversationStarted = true; //更新會話狀態
		});
	}
	
	if(page.name === 'navbar')
	{
		//關閉navbar
		$$('.hide-navbar').on('click', function()
		{
		mainView.hideNavbar();
		});

		//打開navbar
		$$('.show-navbar').on('click', function()
		{
		mainView.showNavbar();
		});	
	}
	
	if(page.name === 'toolbar')
	{
		//關閉toolbar
		$$('.hide-toolbar').on('click', function()
		{
		mainView.hideToolbar();
		});

		//打開toolbar
		$$('.show-toolbar').on('click', function()
		{
		mainView.showToolbar();
		});
	}
	
	if(page.name === 'tabbar')
	{
		//關閉tabbar
		$$('.hide-tabbar').on('click', function()
		{
		mainView.hideToolbar();
		});

		//打開tabbar
		$$('.show-tabbar').on('click', function()
		{
		mainView.showToolbar();
		});
	}
	
	
	if(page.name === 'notifications')
	{
		$$('.notification-callback').on('click', function()
		{
			myApp.addNotification(
			{
			title: '令人讚嘆的應用程式',
			subtitle: '來自John Doe的新消息',
			message: '哈囉！你好嗎？',
			media: '<img width="44" height="44" style="border-radius:100%" src="http://lorempixel.com/output/people-q-c-100-100-9.jpg">',
			hold: 2000, //若設定即代表會根據X秒後自動關閉
			closeIcon: true,
			closeOnClick: false, 
				onClick: function()
				{
				myApp.alert('消息被點擊');
				},
				onClose: function()
				{
				myApp.alert('消息被關閉');
				},
			});
		});
	}
	
	if(page.name === 'photobrowser')
	{
		var myPhotoBrowser = myApp.photoBrowser(
		{
			photos : [
			{
			html: '<iframe src="//www.youtube.com/embed/lmc21V-zBq0?list=PLpj0FBQgLGEr3mtZ5BTwtmSwF1dkPrPRM" frameborder="0" allowfullscreen></iframe>',
			caption: 'Woodkid - Run Boy Run (Official HD Video)'
			},
			{
			url: 'http://lorempixel.com/1024/1024/sports/1/',
			caption: 'Caption 1 Text'
			},
			{
			url: 'http://lorempixel.com/1024/1024/sports/2/',
			caption: 'Second Caption Text'
			},
			],
		initialSlide: 0, //初始頁數，0是第一頁
		spaceBetween: 20, //幻燈片之間的間隔大小
		speed: 300, //切換時的速度，值越大越慢
		zoom: true, //是否啟動拉遠拉近跟平移功能
		maxZoom: 3, //最大放大倍率
		minZoom: 1, //最小放大倍率 
		exposition: true,  //當點擊照片時是否使用放大模式
		expositionHideCaptions: false, //放大模式中是否隱藏標題
		swipeToClose: 'true', //是否開啟上下滑動時關閉照片瀏覽
		type: 'standalone', //standalone、popup、page
		loop: 'true', //是否開啟循環模式
		theme: 'light', //light、dark
		captionsTheme: 'dark',  //light、dark，若沒定義，會等同於theme設定
		navbar: 'true', //是否開啟Navbar
		toolbar: 'true', //是否開啟Toolbar 
		backLinkText: '關閉', //Navbar上關閉的文字
		ofText: '之', //of的字樣
		lazyLoading: false, //是否開啟lazyload模式
		lazyLoadingInPrevNext: false, //是否開啟相鄰模式的lazyload
		lazyLoadingOnTransitionStart: false, //默認情況下，照片瀏覽器將在轉換到此照片後加載lazyload，因此如果您需要在過渡開始時加載新照片，則可以啟用此參數
				onOpen: function()
				{
				myApp.alert('照片瀏覽模式已開啟');
				},
				onClose: function()
				{
				myApp.alert('照片瀏覽模式已關閉');
				},
				onSwipeToClose: function()
				{
				myApp.alert('照片瀏覽模式已上下滑動關閉');
				},
				onSlideChangeStart: function()
				{
				myApp.alert('onSlideChangeStart模式被觸發');
				},
				onSlideChangeEnd: function()
				{
				myApp.alert('onSlideChangeEnd模式被觸發');
				},
				onTransitionStart: function()
				{
				myApp.alert('onTransitionStart模式被觸發');
				},
				onTransitionEnd: function()
				{
				myApp.alert('onTransitionEnd模式被觸發');
				},
				onClick: function()
				{
				myApp.alert('onClick模式被觸發');
				},
				onTap: function()
				{
				myApp.alert('onTap模式被觸發');
				},
				onDoubleTap: function()
				{
				myApp.alert('onDoubleTap模式被觸發');
				},
				onLazyImageLoad: function()
				{
				myApp.alert('onLazyImageLoad模式被觸發');
				},
				onLazyImageReady: function()
				{
				myApp.alert('onLazyImageReady模式被觸發');
				},
		});

		$$('.pb-photo-browser').on('click', function()
		{
		myPhotoBrowser.open();
		});
	}
	
	if(page.name === 'picker')
	{
		var carVendors = 
		{
		Japanese : ['Honda', 'Lexus', 'Mazda', 'Nissan', 'Toyota'],
		German : ['Audi', 'BMW', 'Mercedes', 'Volkswagen', 'Volvo'],
		American : ['Cadillac', 'Chrysler', 'Dodge', 'Ford'],
		};
		var today = new Date();
		var pickerDevice = myApp.picker(
		{
		input: '#picker-device', 
		convertToPopover: true, 
		onlyOnPopover: false, 
		closeByOutsideClick: false, 
		toolbar: true, 
		toolbarCloseText: '完成',
		rotateEffect: false,
			cols: [
			{
			values: ['iPhone 4', 'iPhone 4S', 'iPhone 5', 'iPhone 5S', 'iPhone 6', 'iPhone 6 Plus', 'iPad 2', 'iPad Retina', 'iPad Air', 'iPad mini', 'iPad mini 2', 'iPad mini 3'], //項目裡面的值
			textAlign: 'center', //設定項目的對齊方式，可設定left、center或是right
			}
			],
			onChange: function()
			{
			myApp.alert('onChange模式被觸發');
			},
			onOpen: function()
			{
			myApp.alert('onOpen模式被觸發');
			},
			onClose: function()
			{
			myApp.alert('onClose模式被觸發');
			},
		});
		var pickerDescribe = myApp.picker(
		{
		input: '#picker-describe',
		rotateEffect: true,
		cols: [
			{
			textAlign: 'left', //設定項目的對齊方式，可設定left、center或是right
			values: ('Super Lex Amazing Bat Iron Rocket Lex Cool Beautiful Wonderful Raining Happy Amazing Funny Cool Hot').split(' ')
			},
			{
			values: ('Man Luthor Woman Boy Girl Person Cutie Babe Raccoon').split(' ')
			},
		]
		});
		var pickerDependent = myApp.picker(
		{
		input: '#picker-dependent',
		rotateEffect: true,
			formatValue: function(picker, values)
			{
			return values[1];
			},
			cols: [
			{
			textAlign: 'left',
			values: ['Japanese', 'German', 'American'],
			 onChange: function(picker, country)
			 {
			  if(picker.cols[1].replaceValues)
			  {
			  picker.cols[1].replaceValues(carVendors[country]);
			  }
			 }
			},
			{
			width: 100,
			textAlign: 'left', 
			values: carVendors.Japanese,
			},
		]
		});
		var pickerCustomToolbar = myApp.picker(
		{
		input: '#picker-custom-toolbar',
		rotateEffect: true,
		toolbarTemplate: 
			'<div class="toolbar">' +
				'<div class="toolbar-inner">' +
					'<div class="left">' +
						'<a href="#" class="link toolbar-randomize-link">Randomize</a>' +
					'</div>' +
					'<div class="right">' +
						'<a href="#" class="link close-picker">That\'s me</a>' +
					'</div>' +
				'</div>' +
			'</div>',
		cols: [
			{
			values: ['Mr', 'Ms'],
			},
			{
			textAlign: 'left',
			values: ('Super Lex Amazing Bat Iron Rocket Lex Cool Beautiful Wonderful Raining Happy Amazing Funny Cool Hot').split(' ')
			},
			{
			values: ('Man Luthor Woman Boy Girl Person Cutie Babe Raccoon').split(' ')
			},
		],
		onOpen: function(picker)
			{
			picker.container.find('.toolbar-randomize-link').on('click', 
				function()
				{
				var col0Values = picker.cols[0].values;
				var col0Random = col0Values[Math.floor(Math.random() * col0Values.length)];

				var col1Values = picker.cols[1].values;
				var col1Random = col1Values[Math.floor(Math.random() * col1Values.length)];

				var col2Values = picker.cols[2].values;
				var col2Random = col2Values[Math.floor(Math.random() * col2Values.length)];

				picker.setValue([col0Random, col1Random, col2Random]);
				});
			}
		});
		var pickerInline = myApp.picker(
		{
		input: '#picker-date',
		container: '#picker-date-container',
		toolbar: false,
		rotateEffect: true,
		value: [today.getMonth(), today.getDate(), today.getFullYear(), today.getHours(), (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes())],
			onChange: function(picker, values, displayValues)
			{
			var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();
				if(values[1] > daysInMonth)
				{
				picker.cols[1].setValue(daysInMonth);
				}
			},
			formatValue: function(p, values, displayValues)
			{
			return displayValues[0] + ' ' + values[1] + ', ' + values[2] + ' ' + values[3] + ':' + values[4];
			},
		cols: [
			//月份
			{
			values: ('0 1 2 3 4 5 6 7 8 9 10 11').split(' '),
			displayValues: ('January February March April May June July August September October November December').split(' '),
			textAlign: 'left'
			},
			//日
			{
			values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
			},
			//年
			{
				values: (function ()
				{
				var arr = [];
				for(var i = 1950; i <= 2030; i++) { arr.push(i); }
				return arr;
				})(),
			},
			// Space divider
			{
			divider: true,
			content: '  '
			},
			// Hours
			{
				values: (function ()
				{
				var arr = [];
				for (var i = 0; i <= 23; i++) { arr.push(i); }
				return arr;
				})(),
			},
			// Divider
			{
			divider: true,
			content: ':'
			},
			// Minutes
			{
				values: (function()
				{
				var arr = [];
				for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
				return arr;
				})(),
			}
		 ]
		});
	}
	
	if(page.name === 'progressbar')
	{
		$$('.demo-progressbar-inline .button').on('click', function ()
		{
		var progress = $$(this).attr('data-progress');
		var progressbar = $$('.demo-progressbar-inline .progressbar');
		myApp.setProgressbar(progressbar, progress);
		});
		$$('.demo-progressbar-load-hide .button').on('click', function ()
		{
		var container = $$('.demo-progressbar-load-hide p:first-child');
		if (container.children('.progressbar').length) return; //如果當前有進度條加載，請不要運行這些

		myApp.showProgressbar(container, 0);

			//模擬加載東西
			var progress = 0;
			function simulateLoading()
			{
				setTimeout(function ()
				{
				var progressBefore = progress;
				progress += Math.random() * 20;
				myApp.setProgressbar(container, progress);
					if (progressBefore < 100)
					{
					simulateLoading(); //保持 "讀取"
					}
						else myApp.hideProgressbar(container); //隱藏
				}, Math.random() * 200 + 200);
			}
		  simulateLoading();
		});
		$$('.demo-progressbar-overlay .button').on('click', function () {
		  // Add Directly To Body
		  var container = $$('body');
		  if (container.children('.progressbar, .progressbar-infinite').length) return; //don't run all this if there is a current progressbar loading

		  myApp.showProgressbar(container, 0);

		  // Simluate Loading Something
		  var progress = 0;
		  function simulateLoading() {
			  setTimeout(function () {
				  var progressBefore = progress;
				  progress += Math.random() * 20;
				  myApp.setProgressbar(container, progress);
				  if (progressBefore < 100) {
					  simulateLoading(); //keep "loading"
				  }
				  else myApp.hideProgressbar(container); //hide
			  }, Math.random() * 200 + 200);
		  }
		  simulateLoading();
		});
		$$('.demo-progressbar-infinite-overlay .button').on('click', function () {
		  // Add Directly To Body
		  var container = $$('body');
		  if (container.children('.progressbar, .progressbar-infinite').length) return; //don't run all this if there is a current progressbar loading
		  myApp.showProgressbar(container);
		  setTimeout(function () {
			  myApp.hideProgressbar();
		  }, 3000);
		});
		$$('.demo-progressbar-infinite-multi-overlay .button').on('click', function () {
		  var container = $$('body');
		  if (container.children('.progressbar, .progressbar-infinite').length) return; //don't run all this if there is a current progressbar loading
		  myApp.showProgressbar(container, 'multi');
		  setTimeout(function () {
			  myApp.hideProgressbar();
		  }, 3000);
		});
	}
	
	if(page.name === 'pulltorefresh')
	{
	var songs = ['Yellow Submarine', 'Don\'t Stop Me Now', 'Billie Jean', 'Californication'];
	var authors = ['Beatles', 'Queen', 'Michael Jackson', 'Red Hot Chili Peppers'];
	var ptrContent = $$('.pull-to-refresh-content'); //拉刷新內容
	
		ptrContent.on('ptr:pullstart', function (e)
		{
		//myApp.alert('pullstart模式被觸發');
		});
		
		ptrContent.on('ptr:pullmove', function (e)
		{
		//myApp.alert('pullmove模式被觸發');
		});
		
		ptrContent.on('ptr:pullend', function (e)
		{
		myApp.alert('pullend模式被觸發');
		});

		//在這裡增加'refresh'監聽器
		ptrContent.on('ptr:refresh', function (e)
		{
			//模擬2秒的讀取
			setTimeout(function ()
			{
			var picURL = 'http://hhhhold.com/88/d/jpg?' + Math.round(Math.random() * 100); //隨機的影像
			var song = songs[Math.floor(Math.random() * songs.length)]; //隨機的歌
			var author = authors[Math.floor(Math.random() * authors.length)]; //隨機的作者
			var itemHTML = '<li class="item-content">' +
							  '<div class="item-media"><img src="' + picURL + '" width="44"/></div>' +
							  '<div class="item-inner">' +
								'<div class="item-title-row">' +
								  '<div class="item-title">' + song + '</div>' +
								'</div>' +
								'<div class="item-subtitle">' + author + '</div>' +
							  '</div>' +
							'</li>';
			
			ptrContent.find('ul').prepend(itemHTML); //預置新列表元素
			myApp.pullToRefreshDone(); //當讀取完畢，我們需要重置它
			}, 2000);
		});
		
		ptrContent.on('ptr:done', function (e)
		{
		myApp.alert('done模式被觸發');
		});
	}
 
	if(page.name === 'swiper')
	{
		var mySwiper = myApp.swiper('.swiper-container', 
		{
		speed: 400, //速度越小越快
		spaceBetween: 0, //數值越大間隔越大
		pagination:'.swiper-pagination',
		//direction: 'vertical', //滑動方向
		slidesPerView: 1,
		paginationHide: false, //是否自動隱藏分頁按鈕
		paginationClickable: true, //分頁按鈕可否點選
		nextButton: '.swiper-button-next', //下一筆
		prevButton: '.swiper-button-prev', //上一筆
		preloadImages: false, //是否提前加載圖片
		lazyLoading: true, //是否延遲讀取圖片
		});
	}
 
	if(page.name === 'multiple_swiper')
	{
		var mySwiper1 = myApp.swiper('.swiper-1', 
		{
		pagination:'.swiper-1 .swiper-pagination',
		spaceBetween: 50
		});

		var mySwiper2 = myApp.swiper('.swiper-2', 
		{
		pagination:'.swiper-2 .swiper-pagination',
		spaceBetween: 20,
		slidesPerView: 2
		});

		var mySwiper3 = myApp.swiper('.swiper-3', 
		{
		pagination:'.swiper-3 .swiper-pagination',
		spaceBetween: 10,
		slidesPerView: 3
		});

		var mySwiperVertical = myApp.swiper('.swiper-vertical', 
		{
		pagination:'.swiper-vertical .swiper-pagination',
		direction: 'vertical'
		});

		var mySwiperSlow = myApp.swiper('.swiper-slow', 
		{
		pagination:'.swiper-slow .swiper-pagination',
		speed: 600
		});      
	}
	
	if(page.name === 'custom_swiper')
	{
		var mySwiper = myApp.swiper('.swiper-container', 
		{
		pagination:'.swiper-pagination',
		paginationHide: false, //是否自動隱藏分頁按鈕
		paginationClickable: true, //分頁按鈕可否點選
		nextButton: '.swiper-button-next', //下一筆
		prevButton: '.swiper-button-prev', //上一筆
		});
	}
	
	if(page.name === 'lazyload_swiper')
	{
		var mySwiper = myApp.swiper('.swiper-container', 
		{
		pagination:'.swiper-pagination',
		preloadImages: false, //是否提前加載圖片
		lazyLoading: true, //是否延遲讀取圖片
		});
	}

	if(page.name === 'deviceapi')
	{
		$$('.deviceapi').on('click', function(e)
		{
		myApp.alert(
		'os：' + myApp.device.os + '<br>' + 
		'osVersion：' + myApp.device.osVersion + '<br>' + 
		'android：' + myApp.device.android + '<br>' + 
		'ios：' + myApp.device.ios + '<br>' + 
		'ipad：' + myApp.device.ipad + '<br>' + 
		'iphone：' + myApp.device.iphone + '<br>' + 
		'pixelRatio：' + myApp.device.pixelRatio + '<br>' + 
		'webView：' + myApp.device.webView + '<br>' + 
		'minimalUi：' + myApp.device.minimalUi + '<br>' + 
		'statusBar：' + myApp.device.statusBar
		);
		});
	}
	
	if(page.name === 'keypad')
	{
	var valueMaxLength = 4;	
		var numpad = myApp.keypad(
		{
		//container: , //
		input: '#demo-numpad', //綁定成為虛擬鍵盤的HTML元素
		scrollToInput: true, //是否在鍵盤打開時滾動視口（頁面內容）
		inputReadOnly: true, //是否在鍵盤打開時讓綁定的HTML元素為唯讀的狀態
		convertToPopover: true, //在大屏幕上（iPad上）將鍵盤模式轉換為Popover
		onlyOnPopover: false, //啟用它，鍵盤將始終在Popover中打開
		cssClass: '', //在鍵盤模式上設置的附加CSS類名稱
		toolbar: true, //是否啟用鍵盤模式工具欄
		toolbarCloseText: '完成', //鍵盤模式工具欄上的按鈕名稱
		//toolbarTemplate: '' //自定義虛擬鍵盤得HTML樣式
		//type: 'calculator', //是否啟用計算機模式
		valueMaxLength: valueMaxLength, //最多可輸入幾個字元
		dotButton: false, //
				formatValue: function(p, value)
				{
				value = value.toString();
				return ('****').substring(0, value.length) + ('____').substring(0, valueMaxLength - value.length);
				},
				onChange: function (p, value)
				{
				value = value.toString();
					if (value.length === valueMaxLength)
					{
						myApp.alert('謝謝！ 你的密碼是︰<b>' + value + '</b>', function ()
						{
						//mainView.router.back();
						});
					}
				}
		});
	}
})

/*$$(document).on('pageInit', '.page[data-page="about"]', function(e)
{
myApp.alert('Here comes About page2');
})*/

//打開左側面板
$$('.open-left-panel').on('click', function(e)
{
myApp.openPanel('left');
});

//打開右側面板
$$('.open-right-panel').on('click', function(e)
{
myApp.openPanel('right');
});

//關閉現行面板
$$('.panel-close').on('click', function(e)
{
myApp.closePanel();
});

//偵側左側面板狀況
$$('.panel-left').on('panel:open', function()
{
myApp.alert('左側面板開啟！');
});
$$('.panel-left').on('panel:opened', function()
{
myApp.alert('左側面板已開啟！');
});
$$('.panel-left').on('panel:close', function()
{
myApp.alert('左側面板關閉！');
});
$$('.panel-left').on('panel:closed', function()
{
myApp.alert('左側面板被關閉！');
});

//偵側右側面板狀況
$$('.panel-right').on('panel:open', function()
{
myApp.alert('右側面板開啟！');
});
$$('.panel-right').on('panel:opened', function()
{
myApp.alert('右側面板已開啟！');
});
$$('.panel-right').on('panel:close', function()
{
myApp.alert('右側面板關閉！');
});
$$('.panel-right').on('panel:closed', function()
{
myApp.alert('右側面板被關閉！');
});
$$('.panel-overlay').on('click', function()
{
myApp.alert('overlay-click觸發！');
});
$$('.panel').on('panel:swipe', function()
{
//myApp.alert('swipe觸發！');
});

//swipeout相關偵測
$$('.action1').on('click', function()
{
myApp.alert('滑動按鈕一');
});
$$('.swipeout').on('swipeout', function(e)
{
console.log('Item opened on: ' + e.detail.progress + '%');
}); 
$$('.swipeout').on('open', function()
{
myApp.alert('項目打開');
});
$$('.swipeout').on('opened', function()
{
myApp.alert('項目已打開');
});
$$('.swipeout').on('close', function()
{
myApp.alert('項目關閉');
});
$$('.swipeout').on('closed', function()
{
myApp.alert('項目已關閉');
});
$$('.swipeout').on('delete', function()
{
myApp.alert('項目刪除');
});
$$('.swipeout').on('deleted', function()
{
myApp.alert('項目已刪除');
});

//手動回到上一頁
function goback()
{
var myApp = new Framework7();        
var mainView = myApp.addView('.view-main')          
mainView.router.back();
}

$$('#tab1').on('show', function ()
{
myApp.alert('標籤一被打開');
});
 
$$('#tab2').on('show', function ()
{
myApp.alert('標籤二被打開');
});
 
$$('#tab3').on('show', function ()
{
myApp.alert('標籤三被打開');
});

$$('#tab4').on('show', function ()
{
myApp.alert('標籤四被打開');
});

$$('#tab5').on('show', function ()
{
myApp.alert('標籤五被打開');
});  