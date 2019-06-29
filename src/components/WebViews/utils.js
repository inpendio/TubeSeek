export const BITCHUTE_URI = 'https://www.bitchute.com';
export const BITCHUTE_LOGIN_URI = 'https://www.bitchute.com/accounts/login/';
export const BITCHUTE_COOKIE_DOMAIN = 'www.bitchute.com';
export const BITCHUTE_LOGOUT_URI = 'https://www.bitchute.com/accounts/logout/';
export const BITCHUTE_SEARCH_URI = (query, type = 'video', page = 1) => `https://search.bitchute.com/renderer?query=${escape(
  query.replace(' ', '+'),
)}&use=bitchute-json&name=Search&login=bcadmin&key=7ea2d72b62aa4f762cc5a348ef6642b8&fqa.kind=${type}&page=${page}`;
export const BITCHUTE_SUBSCRIBTION_URI = 'https://www.bitchute.com/subscriptions/';

export const ERRORS = {
  1: { login: false, msg: 'User name or password wrong' },
  2: { login: false, msg: 'uknown error' },
};

const JS_BITCHUTE_GET_DESCRIPTION_TEXT = `
function getDescriptionText(){
  var psInVideoDesc= document.getElementById("video-description").getElementsByClassName("full")[0].getElementsByTagName("p");
  var asInVideoDesc = document.getElementById("video-description").getElementsByClassName("full")[0].getElementsByTagName("a");
  var justText=[];
  for(var temp of psInVideoDesc){
    justText.push(temp.textContent)
  }
  var justHrefs=[];
    for(var temp of asInVideoDesc){
    justHrefs.push({text:temp.textContent, link:temp.href})
  }
  justHrefs.forEach(h=>{
    var ht = h.text;
    justText=justText.map(t=>{
      if(t.indexOf(ht)!==-1){
        var ott=[];
        ott.push(t.slice(0,t.indexOf(ht)));
        ott.push(h);
        ott.push(t.slice(t.indexOf(ht)+ht.length,-1));
        return ott;
          }
      return t;
    })
  })
  return justText;
}
`;

const JS_BITCHUTE_GET_HASHTAGS = `
function getHashTags(){
  var htw = document.getElementById("video-hashtags");
  var out = [];
  var tags = htw.getElementsByTagName("a");
  for(var t of tags){
  out.push({text:t.textContent, link:t.href})
  }
  return out;
  }
`;
const JS_BITCHUTE_GET_CHANNEL_INFO = `
function getChannelData(){
  var out={};
  var cbanner = document.getElementsByClassName("channel-banner")[0];
  var cimage = cbanner.getElementsByClassName("image-container")[0].getElementsByTagName("img")[0];
  out.image=cimage.dataset.src;
  var cname = cbanner.getElementsByClassName("name")[0].getElementsByTagName("a")[0];
  var cowner = cbanner.getElementsByClassName("owner")[0].getElementsByTagName("a")[0];
  var subCount = document.getElementById("subscriber_count");
  out.name={text:cname.textContent, link:cname.href};
  out.owner={text:cowner.textContent,link:cowner.href};
  out.subCount=subCount.textContent;
  return out;
  }
`;

const JS_BITCHUTE_GET_VIDEO_META = `
${JS_BITCHUTE_GET_DESCRIPTION_TEXT}
${JS_BITCHUTE_GET_HASHTAGS}
${JS_BITCHUTE_GET_CHANNEL_INFO}
function getVideoMeta(){
  return {
    channel:getChannelData(),
    hashtags:getHashTags(),
    description:getDescriptionText()
  }
}
`;

const JS_CHECK_FOR_USER_PASS_ERROR = `
function checkForLoginPassError(){
  var errorClasses = document.getElementById("login_error").classList.value;
  if(errorClasses.indexOf('hidden')===-1)window.ReactNativeWebView.postMessage(JSON.stringify({error:1}));
}
setTimeout(checkForLoginPassError,2000);
`;

const JS_LOGIN_PROGRAMMATICALLY = `
function loginProgrammatically(key, password){
  var mailField = document.getElementById('id_username');
  var passwordfiled = document.getElementById('id_password');
  var submitButton= document.getElementById('submit');
  if(mailField)mailField.value=key;
  if(passwordfiled)passwordfiled.value=password;
  if(mailField && passwordfiled && submitButton)submitButton.click();
  else{window.ReactNativeWebView.postMessage(JSON.stringify({error:2}));}
  ${JS_CHECK_FOR_USER_PASS_ERROR}
}
`;

const JS_CHECK_IF_LOGIN = `
var isLoggedIn = false;
  function checkIfLoggedIn(){
    var usermenu = document.getElementsByClassName("user-menu")[0];
    var userdropdown = document.getElementById("userdropdown");
    if(usermenu && userdropdown){
      isLoggedIn = true;
      return true;
    }
    return false;
  }
`;

const JS_BITCHUTE_FEED_PARSE = `
function mf_parse_feed() {
  var mf_lists = {
    subscribed:{
        id:"listing-subscribed",
        title:"video-card-title",
        channel:"video-card-channel",
        time:"video-card-published",
        parsed:[],
        image:"video-card-image"
    },
    all:{
        parsed:[],
        title:"video-card-title",
        channel:"video-card-channel",
        time:"video-card-published",
        id:"listing-all",
        image:"video-card-image"
    },
    popular:{
        title:"video-card-title",
        channel:"video-card-channel",
        time:"video-card-published",
        id:"listing-popular",
        parsed:[],
        image:"video-card-image"
    },
    trendingDay:{
        title:"video-trending-title",
        channel:"video-trending-channel",
        time:"video-trending-details",
        parsed:[],
        id:"trending-day",
        image:"video-trending-image"
    },
    trendingWeek:{
      title:"video-trending-title",
        channel:"video-trending-channel",
        time:"video-trending-details",
        parsed:[],
        id:"trending-week",
        image:"video-trending-image"
    },
    trendingMonth:{
      title:"video-trending-title",
        channel:"video-trending-channel",
        time:"video-trending-details",
        parsed:[],
        id:"trending-month",
        image:"video-trending-image"
    }
  };
  var mf_meta=[];
  Object.keys(mf_lists).forEach(l=>{
    mf_meta.push(l);
    var elems = document.getElementById(mf_lists[l].id).getElementsByTagName("div")[0].children;
    for(var s of elems){
      var out={};
      var sa = s.getElementsByTagName("a")[0];
      if(sa){
        out.videoLink=sa.href;
        out.text=s.getElementsByClassName(mf_lists[l].title)[0].textContent;
        var sc = s.getElementsByClassName(mf_lists[l].channel)[0].getElementsByTagName("a")[0];
        out.channel={
            name: sc.textContent,
            link:sc.href
        }
        out.timePublished = s.getElementsByClassName(mf_lists[l].time)[0].textContent;
        var si = s.getElementsByClassName(mf_lists[l].image)[0];
        var simg = si.getElementsByTagName("img")[0];
        out.thumbnail = simg.dataset.src;
        out.views = s.getElementsByClassName("video-views")[0].textContent.trim();
        out.duration = s.getElementsByClassName("video-duration")[0].textContent.trim();
        mf_lists[l].parsed.push(out);
      }
    };
  });
  window.ReactNativeWebView.postMessage(JSON.stringify({parsedData:true, list:mf_lists, login:isLoggedIn,meta:mf_meta}));
}
`;

export const JS_GET_BITCHUTE_VIDEO_SOURCE = `
${JS_BITCHUTE_GET_VIDEO_META}
var mf_src = document.getElementsByTagName("source")[0];
window.ReactNativeWebView.postMessage(JSON.stringify({source:mf_src.src, meta:getVideoMeta()}));
`;

export const JS_FEED = `
  ${JS_CHECK_IF_LOGIN}
  ${JS_BITCHUTE_FEED_PARSE}
  checkIfLoggedIn();
  setTimeout(mf_parse_feed,0);
`;
// else window.ReactNativeWebView.postMessage(JSON.stringify({parsedData:false, login:isLoggedIn}));
// document.getElementById("canonical").href.replace("https://www.bitchute.com/channel","").replace(/\//gmi,"")

/*   var cann = document.getElementById("canonical").href.replace("https://www.bitchute.com/channel","").replace(/\//gmi,"");
  var tt = document.querySelector('input[name="csrfmiddlewaretoken"]').attributes.value.value;
  window.ReactNativeWebView.postMessage(JSON.stringify({start:true, data:{cann,tt}}));
  $.post('/channel/'+cann+'/sub/',{'csrfmiddlewaretoken':tt},
  function(result){
    if(result.success){
      window.ReactNativeWebView.postMessage(JSON.stringify({result}));
    }
  }
  ); */

/*
 var cann = document.getElementById("canonical").href.replace("https://www.bitchute.com/channel","").replace(/\//gmi,"");
  var tt = document.querySelector('input[name="csrfmiddlewaretoken"]').attributes.value.value;
  window.ReactNativeWebView.postMessage(JSON.stringify({start:true, data:{cann,tt}}));
  $.post('/channel/'+cann+'/sub/',{'csrfmiddlewaretoken':tt},
  function(result){
    if(result.success){
      window.ReactNativeWebView.postMessage(JSON.stringify({result}));
    }
  }
  );
   */

export const JS_BITCHUTE_SUB = `
function mf_toggleSub(){
  var cann = document.getElementById("canonical").href.replace("https://www.bitchute.com/channel/","").replace("/","");
  var tt = document.querySelector('input[name="csrfmiddlewaretoken"]').attributes.value.value;
 $.post('/channel/'+cann+'/sub/',{'csrfmiddlewaretoken':tt},
  function(result){
    if(result.success){
      window.ReactNativeWebView.postMessage(JSON.stringify(result));
    }
  }
  );
}
setTimeout(mf_toggleSub,0);
  


`;

export const JS_BITCHUTE_SUB2 = `
function toggleSubscription2(id,csrf){
  window.ReactNativeWebView.postMessage(JSON.stringify({start:false, jquery:!!$}));
    $.post('/channel/'+id+'/sub/',{'csrfmiddlewaretoken':csrf},
    function(result){
      if(result.success){
        window.ReactNativeWebView.postMessage(JSON.stringify({result}));
      }
    }
    );
  };
  function sub(){
    var subButton = document.querySelector("[id^='sub-btn-']");
    subButton.attributes.onclick.value = subButton.attributes.onclick.value.replace("toggleSubscription","toggleSubscription2");
    window.ReactNativeWebView.postMessage(JSON.stringify({start:true, jquery:!!$}));
    subButton.click();
  }
  sub();
`;

export const JS_FOR_LOGIN = `
function getCookie(){
    var sessionCookie;
    document.cookie.split(';').forEach(c=>{
        var out = {};
        var temp = c.split('=');
        out.name=temp[0].trim();
        out.value=temp[1].trim();
        if(out.name.indexOf("sessionid")!==-1)sessionCookie=out;
        })
    if(sessionCookie)return sessionCookie;
    return null;
}
if(location.href === "${BITCHUTE_URI}" || location.href === "${BITCHUTE_URI}" + "/"){
    window.ReactNativeWebView.postMessage(JSON.stringify({ifis:true})); 
 var sessionId = getCookie();
 if(sessionId)window.ReactNativeWebView.postMessage(JSON.stringify({hasCookie:true, cookie:sessionId}));
 else window.ReactNativeWebView.postMessage(JSON.stringify({hasCookie:false}));
}
`;

export const JS_BITCHUTE_LOGIN = ({ password, key }) => `
${JS_LOGIN_PROGRAMMATICALLY}
${JS_CHECK_IF_LOGIN}
if(!checkIfLoggedIn())loginProgrammatically("${key}", "${password}");
else{window.ReactNativeWebView.postMessage(JSON.stringify({login:true}));}
`;

export const JS_BITCHUTE_LOGOUT = `
${JS_CHECK_IF_LOGIN}
function checkLogoutSuccess(){
  if(checkIfLoggedIn()){
    window.ReactNativeWebView.postMessage(JSON.stringify({login:true}));
  }else{
    window.ReactNativeWebView.postMessage(JSON.stringify({login:false}));
  }
}
setTimeout(checkLogoutSuccess, 1500);
`;

export const JS_BITCHUTE_SEARCH_PARSE = `
  var out={results:[]};
  var results = document.getElementsByClassName("oss-one-result");
  
  for(var r of results){
    var res={};
    var titleTag = r.getElementsByClassName("ossfieldrdr1")[0];
    res.videoLink = titleTag.getElementsByTagName("a")[0].href;
    res.text=titleTag.textContent.trim();
    res.thumbnail = r.getElementsByTagName("img")[0].src;
    res.description = r.getElementsByClassName("ossfieldrdr3")[0].textContent.trim();
    res.timePublished=r.getElementsByClassName("oss-item-displaydate")[0].textContent.trim();
    res.views = r.getElementsByClassName("oss-item-displayviews")[0].textContent.replace("Views:","").trim();
    out.results.push(res);
  }
  out.totalPages = document.getElementsByClassName("oss-paging")[0].getElementsByTagName("a").length;
  window.ReactNativeWebView.postMessage(JSON.stringify({data:out, parsed:true}));
`;

const JS_CHANNEL_VIDEO_CARD_TO_JSON = `
function parseVideoCard(elem){
  var out={};
  out.thumbnail = elem.getElementsByTagName("img")[0].dataset.src;
  var titleHref = elem.getElementsByClassName("channel-videos-title")[0].getElementsByTagName("a")[0];
  out.text=titleHref.textContent;
  out.videoLink=titleHref.href;
  out.timePublish = elem.getElementsByClassName("channel-videos-details")[0].textContent.trim();
  out.description = elem.getElementsByClassName("channel-videos-text")[0].textContent.trim();
  out.views = elem.getElementsByClassName("video-views")[0].textContent.trim();
        out.duration = elem.getElementsByClassName("video-duration")[0].textContent.trim();
  return out;
  }
  
`;
const JS_CHANNEL_PARSE_CHANNEL_LIST = `
${JS_CHANNEL_VIDEO_CARD_TO_JSON}
function getChannelVideos(offset=0, list){
  var list = list || document.getElementsByClassName("channel-videos-container");
  var out=[];
  for(var i=offset;i<list.length;i++){
  if(list[i])out.push(parseVideoCard(list[i]));
           }
  return out;
  }
`;

export const JS_BITCHUTE_CHANNEL_PAGE_DATA = `
${JS_CHANNEL_PARSE_CHANNEL_LIST}
var data={};
function getChannelList(){
  var out={};
  out.description = document.getElementById("channel-description").textContent.trim();
  var dd = document.getElementsByClassName("channel-about-details")[0];
  var detailList = dd.getElementsByTagName("p");
  out.timeCreated = detailList[0].textContent.replace('Created','').trim();
  out.totalVideos = detailList[1].textContent.replace('videos','').trim();
  out.subscribers = detailList[2].textContent.replace('subscribers','').trim();
  out.totalViews = detailList[3].textContent.replace('views','').trim();
  out.name=document.querySelector(".channel-banner p.name").textContent.trim();
  out.subscribed = document.querySelector("[id^='sub-btn-']").textContent === 'Subscribed';
  out.thumbnail = document.getElementsByClassName("channel-about-container")[0].getElementsByTagName("img")[0].dataset.src;
  return out;
}
data.channelInfo = getChannelList();
data.videoList= getChannelVideos();
window.ReactNativeWebView.postMessage(JSON.stringify({data, parsed:true}));
`;

const JS_BITCHUTE_CHANNEL_EXTEND = `
${JS_CHANNEL_PARSE_CHANNEL_LIST}
function channelExtend2(extend, cc) {
  var more = $("#channel-tabs .active .show-more");
  if (!more.hasClass("hidden")) {
    more.addClass("hidden");
    var count = $(".channel-videos-list").children(
      ".channel-videos-container"
    ).length;
    var url = window.location.href;
    url =
      url.indexOf("?") >= 0
        ? url.split("?")[0] + "extend/?" + url.split("?")[1]
        : url + "extend/";
    $.post(
      url,
      {
        csrfmiddlewaretoken: Cookies.get("csrftoken"),
        name: name,
        offset: cc || count
      },
      function(result) {
        if (result.success) {
          $(".channel-videos-list").append(result.html);
          var newElem = document.createElement("div");
          newElem.innerHTML = result.html.trim();
          var videoList= getChannelVideos(0,newElem.children);
          window.ReactNativeWebView.postMessage(JSON.stringify({data:videoList, parsed:true}));
          /* spaAttachEvents();
          playlistAttachEvents();
          $('[data-toggle="tooltip"]').tooltip({
            container: "body",
            trigger: "hover"
          });
          if (
            $(".channel-videos-list").children(".channel-videos-container")
              .length ==
            count + extend
          )
            more.removeClass("hidden"); */
        }
      }
    );
  }
}
`;

export const JS_BITCHUTE_CHANNEL_VIDEO_LIST_SHOW_MORE = offset => `
${JS_BITCHUTE_CHANNEL_EXTEND}
channelExtend2(25,${offset});
`;

export const JS_BITCHUTE_SUBSCRIPTION_LIST = `
function getSubList(){
  var out=[];
  var subList= document.getElementById("page-detail").children
  for(var sl of subList){
    var o = {
      link: sl.getElementsByTagName("a")[0].href,
      image: sl.getElementsByTagName("img")[0].dataset.src,
      name: sl.getElementsByClassName("subscription-name")[0].textContent.trim(),
      lastTimeVideoPublished: sl.getElementsByClassName("subscription-last-video")[0].textContent.replace("Last video:","").trim(),
      description:sl.getElementsByClassName("subscription-description")[0].textContent.trim(),
    };
    out.push(o);
  }
  return out;
}
window.ReactNativeWebView.postMessage(JSON.stringify({data:getSubList(), parsed:true}));
`;

export const JS_BITCHUTE_FEED_LOAD_MORE = ({ offset, last, name }) => `
function mfListingExtend(extend){
  var mf_lists = {
    subscribed:{
        id:"listing-subscribed",
        title:"video-card-title",
        channel:"video-card-channel",
        time:"video-card-published",
        parsed:[],
        image:"video-card-image"
    },
    all:{
        parsed:[],
        title:"video-card-title",
        channel:"video-card-channel",
        time:"video-card-published",
        id:"listing-all",
        image:"video-card-image"
    },
    popular:{
        title:"video-card-title",
        channel:"video-card-channel",
        time:"video-card-published",
        id:"listing-popular",
        parsed:[],
        image:"video-card-image"
    },
    trendingDay:{
        title:"video-trending-title",
        channel:"video-trending-channel",
        time:"video-trending-details",
        parsed:[],
        id:"trending-day",
        image:"video-trending-image"
    },
    trendingWeek:{
      title:"video-trending-title",
        channel:"video-trending-channel",
        time:"video-trending-details",
        parsed:[],
        id:"trending-week",
        image:"video-trending-image"
    },
    trendingMonth:{
      title:"video-trending-title",
        channel:"video-trending-channel",
        time:"video-trending-details",
        parsed:[],
        id:"trending-month",
        image:"video-trending-image"
    }
  };
  $.post('https://www.bitchute.com/extend/',
    {'csrfmiddlewaretoken':Cookies.get('csrftoken'),
    'name':"${name}",
    'offset':"${offset}",
    'last':"${last}"
    },
    function(result){
      if(result.success){
        var newElem = document.createElement("div");
          newElem.innerHTML = result.html.trim();
          var elems = newElem.children;
          var rr=[];
          for(var s of elems){
            var out={};
            var sa = s.getElementsByTagName("a")[0];
            if(sa){
              out.videoLink=sa.href;
              out.text=s.getElementsByClassName(mf_lists["${name}"].title)[0].textContent;
              var sc = s.getElementsByClassName(mf_lists["${name}"].channel)[0].getElementsByTagName("a")[0];
              out.channel={
                  name: sc.textContent,
                  link:sc.href
              }
              out.timePublished = s.getElementsByClassName(mf_lists["${name}"].time)[0].textContent;
              var si = s.getElementsByClassName(mf_lists["${name}"].image)[0];
              var simg = si.getElementsByTagName("img")[0];
              out.thumbnail = simg.dataset.src;
              out.views = s.getElementsByClassName("video-views")[0].textContent.trim();
              out.duration = s.getElementsByClassName("video-duration")[0].textContent.trim();
              rr.push(out);
            }
          };
          window.ReactNativeWebView.postMessage(JSON.stringify({data:rr, parsed:true}));
      }
    }
    );
  }
  mfListingExtend();
`;
