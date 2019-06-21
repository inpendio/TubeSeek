export const BITCHUTE_URI = 'https://www.bitchute.com';
export const BITCHUTE_LOGIN_URI = 'https://www.bitchute.com/accounts/login/';
export const BITCHUTE_COOKIE_DOMAIN = 'www.bitchute.com';
export const BITCHUTE_LOGOUT_URI = 'https://www.bitchute.com/accounts/logout/';

export const ERRORS = {
  1: { login: false, msg: 'User name or password wrong' },
  2: { login: false, msg: 'uknown error' },
};

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
        parsed:[]
    },
    all:{
        parsed:[],
        id:"listing-all"
    },
    popular:{
        id:"listing-popular",
        parsed:[]
    },
    trendingDay:{
        parsed:[],
        id:"trending-day",
    },
    trendingWeek:{
        parsed:[],
        id:"trending-week",
    },
    trendingMonth:{
        parsed:[],
        id:"trending-month",
    }
  };
  Object.keys(mf_lists).forEach(l=>{
    var elems = document.getElementById(mf_lists[l].id).getElementsByTagName("div")[0].children;
    for(var s of elems){
      var out={};
      var sa = s.getElementsByTagName("a")[0];
      if(sa){
        out.videoLink=sa.href;
      var si = sa.getElementsByTagName("img")[0];
      out.thumbnail = si.src;
      mf_lists[l].parsed.push(out);
      }
    };
  });
  window.ReactNativeWebView.postMessage(JSON.stringify({parsedData:true, list:mf_lists, login:isLoggedIn}));
}
`;

export const JS_FEED = `
  ${JS_CHECK_IF_LOGIN}
  ${JS_BITCHUTE_FEED_PARSE}
  if(checkIfLoggedIn)mf_parse_feed();
  else window.ReactNativeWebView.postMessage(JSON.stringify({parsedData:false, login:isLoggedIn}));
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
