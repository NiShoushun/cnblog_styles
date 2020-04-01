// 设置网页favicon图标
function setFavicon(favicon) {
  $('head').append($('<link rel="shortcut icon" type="image/x-icon"/>').attr('href', favicon));
};

// 设置滚动通知
function setNews(news) {
  str1 ="";
  for (var i = 0; i <news.length; i++) {
    str1 = str1 + '<li class="newstext"> <i class="fa fa-volume-up fa-2x" aria-hidden="true"></i>' + news[i]+' </li>';
  }
  str = '<div class="newscard"><ul>' +  str1  + '</ul></div>';
  $('#mainContent').prepend(str);
  if(news.length>1){
    setInterval('autoScroll(".newscard")',3000);
  }
}
function autoScroll(obj){
  $(obj).find("ul").animate({
    marginTop : "-40px"
  },500,function(){
    $(this).css({marginTop : "0px"}).find("li:first").appendTo(this);
  })
}


// 设置首页轮播
function setBanner(banner) {
  var str1 = '',
  str2 = '',
  str = '';
  for (var i = 0; i < banner.length; i++) {
    str1 = str1 + '<li>' + '<a href="' + banner[i].url + '" target=" _blank">' +
    '<div  style="background-image:url(' + banner[i].img + ')"></div>' +
    '</a>' +
    '<span class="title">' + banner[i].title + '</span>' +
    '</li>';
  }
  for (var i = 2; i <= banner.length; i++) {
    str2 = str2 + '<li>' + i + '</li>';
  }

  str = '<div class="comiis_wrapad" id="slideContainer">' +
  '<div id="frameHlicAe" class="frame cl">' +
  '<div class="temp"></div>' +
  '<div class="block">' +
  '<div class="cl">' +
  '<ul class="slideshow" id="slidesImgs">' +
  str1 +
  '</ul>' +
  '</div>' +
  '<div class="slidebar" id="slideBar">' +
  '<ul>' +
  '<li class="on">1</li>' +
  str2 +
  '</ul>' +
  '</div>' +
  '</div>' +
  '</div>' +
  '</div>';

  if ($('.day').length > 0) {
    $('.forFlow').prepend($(str)) //首页轮播
  }

  function SlideShow(c) {
    var a = document.getElementById("slideContainer"),
    f = document.getElementById("slidesImgs").getElementsByTagName("li"),
    h = document.getElementById("slideBar"),
    n = h.getElementsByTagName("li"),
    d = f.length,
    c = c || 3000,
    e = lastI = 0,
    j, m;

    function b() {
      m = setInterval(function() {
        e = e + 1 >= d ? e + 1 - d : e + 1;
        g()
      }, c)
    }

    function k() {
      clearInterval(m)
    }

    function g() {
      f[lastI].style.display = "none";
      n[lastI].className = "";
      f[e].style.display = "block";
      n[e].className = "on";
      lastI = e
    }
    f[e].style.display = "block";
    a.onmouseover = k;
    a.onmouseout = b;
    h.onmouseover = function(i) {
      j = i ? i.target : window.event.srcElement;
      if (j.nodeName === "LI") {
        e = parseInt(j.innerHTML, 10) - 1;
        g()
      }
    };
    b()
  };

  if ($('.day').length > 0) {
    SlideShow(3000);
  }

}


// 导航栏扩展
function setNav(nav) {
  var str = '';
  for (var i = 0; i < nav.length; i++) {
    str = str + '<li><a id="' + nav[i].id + '" class="menu" href="' + nav[i].url + '">' + nav[i].title +
    '</a></li>';
  }
  $('#navList').append(str);
}

// 引入组件
function importantFile(){
  $.getScript("https://blog-static.cnblogs.com/files/gshang/gshang.owo.2020.01.05.1.js");
  $('head').append('<link rel="stylesheet" href="https://blog-static.cnblogs.com/files/gshang/gshang.OwO.3.css">');
  $.getScript("https://cdn.bootcss.com/clipboard.js/2.0.4/clipboard.min.js");
  $.getScript("https://cdn.bootcss.com/jquery-scrollTo/2.1.2/jquery.scrollTo.js");
  $.getScript("https://cdn.staticfile.org/vue/2.2.2/vue.min.js");
  $.getScript("https://blog-static.cnblogs.com/files/gshang/notiflix-2.0.0.min.js");
  $('head').append('<link rel="stylesheet" href="https://blog-static.cnblogs.com/files/gshang/notiflix-2.0.0.min.css">');
  $.getScript("https://blog-static.cnblogs.com/files/gshang/sidebarContent.js");
}
importantFile();

// 博文内部代码块复制
function copyCode() {
  if ($("#topics") != null) {
    for (i = 0; i <= $('pre').length; i++) {
      $('pre').eq(i).prepend('<div class="clipboard-button" id="copy_btn_' + i + ' " data-clipboard-target="#copy_target_' +
      i + '"title="复制"></div>');

      $('pre').eq(i).attr('id', 'copy_target_' + i);
    }

    var clipboard = new ClipboardJS('.clipboard-button');
    clipboard.on('success', function(e) {
			e.trigger.innerHTML = '成功';
			setTimeout(function() {
				e.trigger.innerHTML = '';
			}, 2 * 1000);
      e.clearSelection();
    });

    clipboard.on('error', function(e) {
			e.trigger.innerHTML = '失败';
			setTimeout(function() {
				e.trigger.innerHTML = '';
			}, 2 * 1000);
      e.clearSelection();
    });
  }
}


// 设置博文内部表格滚动
function tableScroll() {
  if ($("#topics") != null) {
    $("table").each(function() {
      $(this).css('cssText', 'width:100%!important;display:table;');
      $(this).wrapAll('<div class="tablebox"></div>');
      $(".tablebox").css('overflow', 'auto');

    });
  }
};

// 设置博文内部链接新窗口打开
function blankTarget() {
  if ($("#topics") != null) {
    $('#cnblogs_post_body a[href^="http"]').each(function() {
      $(this).attr('target', '_blank');
    });
  }
}

// 自定义markdown
function mymd() {
  var d = document;
  var cnblogs_post_body = d.getElementById('cnblogs_post_body');

  if (cnblogs_post_body != null) {
    var html = d.getElementById('cnblogs_post_body').innerHTML;
    html = md2video(html);
    html = md2music(html);
    html = md2img(html);
    d.getElementById('cnblogs_post_body').innerHTML = html;
  }

  // 自定义视频语法
  function md2video(str) {
    var video_str1 = '<div class="video"><iframe src="';
    var video_str2 =
    '" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe></div>';
    return str.replace(/\<p\>\{video\}\(([^{}()]+)\)\<\/p\>/g, function(match, $1) {
      return video_str1 + $1 + video_str2
    });
  }
  // 自定义音乐语法
  function md2music(str) {
    var music_str1 = '<div class="music"><iframe src="';
    var music_str2 =
    '" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe></div>';
    return str.replace(/\<p\>\{music\}\(([^{}()]+)\)\<\/p\>/g, function(match, $1) {
      return music_str1 + $1 + music_str2
    });
  }
  // 自定义图片语法
  function md2img(str) {
    var img_str1 = '<img  src="';
    var img_str2 =
    '" /> <p class="imgtext">';
    var img_str3=
    '</p>';
    return str.replace(/\<p\>\{img\}\(([^{}()]+)\)\[([^{}()]+)\]\<\/p\>/g, function(match, $1, $2) {
      return img_str1 + $1 + img_str2 + $2 + img_str3
    });
  }
}



// 设置评论区头像
function commentAvatar() {
  $(document).ajaxComplete(function(event, xhr, option) {
    //评论头像
    if (option.url.indexOf("GetComments") > -1) {
      setTimeout(function() {
        owoEmoji();
        $.each($(".feedbackItem"), function(index, ele) {
          var self = $(ele);
          var obj = self.find(".blog_comment_body");
          var id = obj.attr("id").split("_")[2];
          var imgSrc = $("#comment_" + id + "_avatar").html() || "http://pic.cnblogs.com/avatar/simple_avatar.gif";
          self.prepend('<img src="' + imgSrc + '" style="float:left;" class="comment_avatar">');
          $(".feedbackListSubtitle").addClass("feedbackListSubtitle_right");
          $(".feedbackCon").addClass("feedbackCon_right");
        });
      }, 200)
    };
  });
}
commentAvatar();
// owoEmoji
function owoEmoji() {

  $(".commentbox_footer").before(
  '<div class="OwO" onclick="load_face(this)"><div class="OwO-logo"><span>表情</span></div></div>');

}


function load_face(b) {
  var c = new OwO({
    logo: "表情",
    container: document.getElementsByClassName("OwO")[0],
    target: document.getElementById("tbCommentBody"),
    api: "https://gshang2018.github.io/home/gshang.owo.json",
    position: "up",
    width: "100%",
    maxHeight: "250px"
  });
  b.classList.add("OwO-open");
  b.onclick = null
}

// 运行脚本
$(function(){
  $('textarea[title=js]').each(function(){window.eval($(this).text())});
  //console.log("---[  页面自定义脚本初始化完成！  ]----");
});


// 平滑滚动控制
function myscroll() {
  $('a[href*=\\#],area[href*=\\#]').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var $target = $(this.hash);
      $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
      if ($target.length) {
        var targetOffset = $target.offset().top;
        $('html,body').animate({
          scrollTop: targetOffset
        },
        500);
        return false;
      }
    }
  });
};


function loadScroller() {
  if ($("#topics").length > 0) {
    //先获取第一个h标签, 之后循环时作为上一个h标签
    var $ph = $('#cnblogs_post_body :header:eq(0)');
    if ($ph.length > 0) {
      $('#sideBarMain').remove();
      //设置层级为1
      $ph.attr('offset', '1');
      //添加导航目录的内容
      $('#sideBar').append(
      '<div id="sidebar_scroller" class="catListPostArchive sidebar-block"><h3 class="catListTitle">导航目录</h3><ul class="nav"></ul></div>'
      );
      //取当前边栏的宽度
      $('#sidebar_scroller').css('width', ($('#sideBar').width()) + 'px');
      //让导航目录停留在页面顶端
      $('#sidebar_scroller').stickUp();
      //遍历文章里每个h标签
      $('#cnblogs_post_body :header').each(function(i) {
        var $h = $(this);
        //设置h标签的id, 编号从0开始
        $h.attr('id', 'scroller-' + i);
        //比上一个h标签层级小, 级数加1
        if ($h[0].tagName > $ph[0].tagName) {
          $h.attr('offset', parseInt($ph.attr('offset')) + 1);
        } //比上一个h标签层级大, 级数减1
        else if ($h[0].tagName < $ph[0].tagName) {

          var h = parseInt($h[0].tagName.substring(1));
          var ph = parseInt($ph[0].tagName.substring(1));

          var offset = parseInt($ph.attr('offset')) - (ph - h);
          if (offset < 1) {
            offset = 1
          };
          $h.attr('offset', offset);
        } //和上一个h标签层级相等时, 级数不变
        else {
          $h.attr('offset', $ph.attr('offset'));
        }
        //添加h标签的目录内容
        $('#sidebar_scroller ul').append('<li class="scroller-offset' + $h.attr('offset') + '"><a href="#scroller-' +
        i +
        '">' + $h.text() + '</a></li>');
        //最后设置自己为上一个h标签
        $ph = $h;
      });

      //开启滚动监听, 监听所有在.nav类下的li
      $('body').scrollspy();
      myscroll();
      $('#showBtn').css('display', 'none');

      // 设置手机端目录功能栏
      var w = document.body.clientWidth;
      if (w <= 961) {
        $('#cnblogs_post_body').append(
        '<div class="mytoolbar"><ul id="toolbtn"><li id="back-up"><a href="#top" ><i class="fa fa-chevron-up" aria-hidden="true"></i></a></li><li><a href="Javascript:showContent()"><i class="fa fa-list-ul" aria-hidden="true"></i></a></li><li id="back-down"><a href="#footer" ><i class="fa fa-chevron-down" aria-hidden="true"></i></a></li></ul></div>'
        );
        myscroll();
      }

    } else {
      $('#sideBar').css('display', 'none');

      $('#main').css({
        'grid-template-columns':'100%',
      });
    }
  }
}

function setSidebarContent() {
  setTimeout(function() {
    loadScroller();
  }, 20);
}


function showContent() {
  if ($('#sidebar_scroller').css('display') == 'none') {
    $('#sidebar_scroller').css('display', 'block');
  } else {
    $('#sidebar_scroller').css('display', 'none');
  }
}

// 移动端侧边隐藏
function addHideBtn(){
  $("#sidebar_news").prepend('<a id="hideBtn" href="javascript:sidebarHide()"></a>');
}
function sidebarHide(){
  $("#sideBarMain").removeClass("sideBarMain_show");
  $("#sideBarMain").addClass("sideBarMain_hide");
}
function sidebarShow(){
  $("#sideBarMain").removeClass("sideBarMain_hide");
  $("#sideBarMain").addClass("sideBarMain_show");
}
function addShowBtn(){
  $('#navList').after('<li><a id ="showBtn" href="javascript:sidebarShow()"></a></li>');
}

function hideSidebar(){
  sidebarHide();
  addShowBtn();
  addHideBtn();
}


// 新增/读取 cookie
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires + ";secure; path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

var Theme = {
  Light: {
    'color': '#4d4d4d',
    'TextColor1': '#4d4d4d',
    'TextColor2': '#5f5f6b',
    'TextColor3': '#97979f',
    'DividColor': '#e7eaf0',
    'BackgroundColor': '#f4f6fa',
    'BlockColor': '#ffffff',
    'ImgBright':1
  },
  Dark: {
    'color': '#cfcecf',
    'TextColor1': '#cfcecf',
    'TextColor2': '#89888c',
    'TextColor3': '#57565a',
    'DividColor': '#323236',
    'BackgroundColor': '#282c34',
    'BlockColor': '#20242b',
    'ImgBright':0.5
  }
}

function changeThemeColor(Light) {
  setCookie('color', Light.color, 30);
  setCookie('TextColor1', Light.TextColor1, 30);
  setCookie('TextColor2', Light.TextColor2, 30);
  setCookie('TextColor3', Light.TextColor3, 30);
  setCookie('DividColor', Light.DividColor, 30);
  setCookie('BackgroundColor', Light.BackgroundColor, 30);
  setCookie('BlockColor', Light.BlockColor, 30);
  setCookie('ImgBright', Light.ImgBright, 30);
  $('html').css("color", getCookie("color"));
  document.documentElement.style.setProperty("--TextColor1", getCookie("TextColor1"));
  document.documentElement.style.setProperty("--TextColor2", getCookie("TextColor2"));
  document.documentElement.style.setProperty("--TextColor3", getCookie("TextColor3"));
  document.documentElement.style.setProperty("--DividColor", getCookie("DividColor"));
  document.documentElement.style.setProperty("--BackgroundColor", getCookie("BackgroundColor"));
  document.documentElement.style.setProperty("--BlockColor", getCookie("BlockColor"));
  document.documentElement.style.setProperty("--ImgBright", getCookie("ImgBright"));

}


// 切换主题
function changeTheme() {
  if ($('html').css('color') == 'rgb(77, 77, 77)') {
    changeThemeColor(Theme.Dark);
  } else {
    changeThemeColor(Theme.Light);
  }
}

function loadThemeColor() {
  if (getCookie("color") == "") {
    $('html').css("color", getCookie("#4d4d4d"));
    document.documentElement.style.setProperty("--TextColor1", "#4d4d4d");
    document.documentElement.style.setProperty("--TextColor2", "#5f5f6b");
    document.documentElement.style.setProperty("--TextColor3", "#97979f");
    document.documentElement.style.setProperty("--DividColor", "#e7eaf0");
    document.documentElement.style.setProperty("--BackgroundColor", "#f4f6fa");
    document.documentElement.style.setProperty("--BlockColor", "#ffffff");
    document.documentElement.style.setProperty("--ImgBright", 1);

  } else {
    $('html').css("color", getCookie("color"));
    document.documentElement.style.setProperty("--TextColor1", getCookie("TextColor1"));
    document.documentElement.style.setProperty("--TextColor2", getCookie("TextColor2"));
    document.documentElement.style.setProperty("--TextColor3", getCookie("TextColor3"));
    document.documentElement.style.setProperty("--DividColor", getCookie("DividColor"));
    document.documentElement.style.setProperty("--BackgroundColor", getCookie("BackgroundColor"));
    document.documentElement.style.setProperty("--BlockColor", getCookie("BlockColor"));
    document.documentElement.style.setProperty("--ImgBright", getCookie("ImgBright"));
  }
}

loadThemeColor();
function setThemeInfo(Theme){
  $("#footer").append('<a href="'+ Theme.page + '">Theme Bili '+ Theme.version +' by GShang </a>')
  }

// 恢复弹窗功能

window.alert = function() {};
var f = document.createElement("iframe");
f.style.cssText = "border:0;width:0;height:0;display:none";
document.body.appendChild(f);
var d = f.contentWindow.document;
d.write("<script type=\"text/javascript\">window.parent.alert = alert;<\/script>");
d.close();


$("#main").hide();
$.extend({
  'gshang':function (obj) {
   if(obj.favicon != null){
      setFavicon(obj.favicon);
    }

    setThemeInfo(obj.themeInfo);
    if(obj.news.enable == true){
      setNews(obj.news.data);
    }

    if(obj.banner.enable == true){
      setBanner(obj.banner.data);
    }

    if(obj.nav.enable == true){
      setNav(obj.nav.data);
    }

    if(obj.sidebarContent == true){
      setSidebarContent();
    }


    if(obj.hideSidebar == true){
      hideSidebar();
    }

    if(obj.post.blankTarget == true){
      blankTarget();
    }

    if(obj.post.tableScroll == true){
      tableScroll();
    }
  
   if(obj.post.copyCode == true){
      copyCode();
    }
  
    if(obj.post.myMarkdown == true){
      mymd();
    }
    $("#loading").hide();
    $("#main").show();
  }
});