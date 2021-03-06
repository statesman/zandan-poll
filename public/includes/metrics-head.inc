<!-- Quantcast Tag, part 1 -->
<script type="text/javascript">
  var _qevents = _qevents || [];
  (function() {
   var elem = document.createElement('script');
   elem.src = (document.location.protocol == "https:" ? "https://secure" : "http://edge")
               + ".quantserve.com/quant.js";
   elem.async = true;
   elem.type = "text/javascript";
   var scpt = document.getElementsByTagName('script')[0];
   scpt.parentNode.insertBefore(elem, scpt);
  })();
</script>

<!-- end head_css_override block -->
<!-- begin metrics_config_complete_override block -->
<!-- begin metrics_common_override block -->
<script>localStorage.setItem("sdsat_debug", true);</script>
<script>
if(typeof(pubsub)=="undefined"){
  pubsub={
      subscribe:function(){
        if(typeof(DDO.deferredSubscribe) == "undefined"){
          DDO.deferredSubscribe = [];
        }
        DDO.deferredSubscribe.push(arguments);
      },
      publish:function(){
        if(typeof(DDO.deferredPublish) == "undefined"){
          DDO.deferredPublish = [];
        }
        DDO.deferredPublish.push(arguments);
      }
  };

}
window.pubsub = pubsub;
</script>
<script src="//assets.adobedtm.com/20d5deb47c9e7fe47a9f969db01578a739d7179d/satelliteLib-3bdb96ce8c62153cdc81a8a72fc964fe2ffa1652.js"></script>
<!-- begin metrics_complete_override block -->
<!-- METRIC TAG -->
<!-- Primary Category -->
<!-- Setting originating site Start-->
<!-- Setting originating site End-->
<!-- Setting Site Domain and Site ID Start-->
<!-- Setting Site Domain and Site ID End-->
<!-- Setting Provide Name -->
<!--Standalone -->
<!-- Setting video proxy and video proxy play list vendor names -->
<script>
var DDO = DDO || {};

<!-- begin metrics_dtm_library_override block -->
  DDO.DTMLibraryURL = '//assets.adobedtm.com/20d5deb47c9e7fe47a9f969db01578a739d7179d/satelliteLib-3bdb96ce8c62153cdc81a8a72fc964fe2ffa1652.js';
<!-- end metrics_dtm_library_override block -->


DDO.hasLocalStorage = function(){
  isDefined = typeof(localStorage) != "undefined";
  if(isDefined){
    localStorage.setItem("test", "test");
    canRetrieve = localStorage.getItem("test") == "test";
  }
  localStorage.removeItem("test");
  return isDefined && canRetrieve;

}

DDO.connextActive = function(){
  var connextMetaTag = document.querySelector('meta[name="cmg:connext:config"]');
  if(connextMetaTag){
    return true;
  }else{
    return false;
  }
}
</script>
<script src="//www.mystatesman.com/r//PortalConfig/np-paid/metrics/js/dtm-ddo-utilities.js"></script>
<script>
//  SITE DATA
  DDO.siteData = {
    siteID: 'statesman',
      siteDomain: 'statesman.com',
      siteVersion: 'responsive site',
      siteFormat: 'newspaper',
      siteMetro: 'tx: austin',
      siteMedium: 'newspaper',
      siteType: 'main: free',
      siteCMS: 'external vendor'
  };
  // PAGE DATA
  var isDwp = false;
  console.log("isDwp: ", isDwp);
  var isHome = isDwp && false;
  console.log("page Title:" + '');
  var trimPageNameUrl = removeExtracharFromUrl('/bigj-metro-state-flatpage/');
  console.log("Primary Category: " + '/News/Local');

  DDO.pageData = {
    pageFlow : "",
    pageNumber : '1',
    pageType : 'standalone page',
    pageIsDwp: isDwp // Necessary for bookmarklet purposes.
  };

  DDO.pageData.pageContentType = 'article';
  DDO.pageData.pageMainSection ='/metro-state';
  DDO.pageData.pageName = trimPageNameUrl;

  DDO.pageData.pageTitle = 'Interactive: <?php print $meta['title']; ?>';
  DDO.pageData.pageSiteSection = (isHome) ? 'home' : 'News';

  DDO.pageData.pageCategory = 'Local';
  DDO.pageData.pageSubCategory = '';


  DDO.pageData.pageName = location.pathname + location.hash;

  // CONTENT DATA (contentViewType is set in access meter metrics)
  DDO.contentData = DDO.contentData || {};
  var contentTopics ='local news,transportation,statesman,politics,Growing Austin,aasinteractive';

  DDO.contentData.contentTopics = contentTopics;
  var contentByline = 'dan hill';

  DDO.contentData.contentByline = contentByline;
  DDO.contentData.contentOriginatingSite =  'statesman';
  DDO.contentData.contentID = '9eaaf9b4-6b31-11e7-830e-a5e8bea39109';
  DDO.contentData.contentVendor = 'projects server';
  DDO.contentData.contentViewType = DDO.contentData.contentViewType || '';
  DDO.contentData.contentPublishDate = '20170717205000';
  DDO.contentData.contentUpdatedDate = '';
  DDO.contentData.blogName = '';
  DDO.contentData.galleryName = '';
  var pageSubContentType = '';

  //We need to set this one only for imported stories.
  DDO.contentData.contentOriginatingCMS='external server';
  DDO.contentData.contentOriginatingID='9eaaf9b4-6b31-11e7-830e-a5e8bea39109';
  DDO.contentData.melvilID='';

  //SEARCH DATA PAGE CONTENT
   DDO.pageData.pageNumber = location.search.split('page=')[1] ? location.search.split('page=')[1] : location.search.split('offset=')[1] ? location.search.split('offset=')[1] : '1';

<!-- begin metrics_elements_override block -->


<!-- end metrics_elements_override block -->

DDO.init = function(pubsub, dependentEvents) {
  // The following code defers loading the DTM library until after certain events have been fired,
  // namely janrain, mg2, and access meter.
  // Note: we need to add access meter to list of dependent events etc!
  DDO.dependentEvents = dependentEvents;// e.g. ['authn', 'authz'];
  setTimeout(function(){
    DDO.dependentEventCheck("TIMED OUT");
  }, 10000);
  if(dependentEvents.length == 0){
    DDO.utilities.triggerDTMPageView();//DDO.utilities.loadDTMLibrary();
  }

  pubsub.publish("DDO-initialized");
  console.log('DDO: ', DDO);
}

//Function to remove last alphanumeric chars from DDO.pageData.pageName url
function removeExtracharFromUrl(urlPath){
    var urlArr = urlPath.split('/');
    if (urlArr.length > 3) {
      var urlArr_new = [];
    for (var i=0; i<urlArr.length-2;i++) {
      urlArr_new.push(urlArr[i]);
    }
    return urlArr_new.join('/') + '/';
    }
    else {
      return urlPath;
    }
}
</script>
<!-- end metrics_complete_override block -->
<!-- end metrics_common_override block -->
<!-- begin metrics_interaction_override block -->
<script>
DDO.interaction = {
  init: function(pubsub, $){
    // pubsubcutioner can use regex for event names, thus all interaction type events
    // can be listened to assuming the data is correct.
    pubsub.subscribe("site-interaction", function(event, data){
      // data should be like: {element:"[widget clicked]",action: "[button clicked]"}
      DDO.action("interaction.Website", data);
    });
  }
};
</script><!-- end metrics_interaction_override block -->
<!-- begin metrics_janrain_override block -->
<script>
DDO.janrainPort = {
  init: function(pubsub, $){
    var returnUser = false;
    var isModalOpen = false;
    var autoLogin = true;

    pubsub.subscribe("janrain.sessionNotFound", function(){
      pubsub.publish("authn-anonymous");
    });
    pubsub.subscribe("janrain.logout",function(){
      pubsub.publish("authn-logout");
    });
    pubsub.subscribe("janrain.loginSuccess", function(event, data){
      pubsub.publish("login-success");
      pubsub.publish("authn-login", data);
      if(!returnUser && !window.mg2){
        pubsub.publish("login-complete");
      }
    });
    pubsub.subscribe("janrain.loginFailed", function(){
      pubsub.publish("login-error");
    });

    pubsub.subscribe("janrain.sessionFound", function(event, data){
      pubsub.publish("session-found");
      pubsub.publish("authn-login", data);
      if(autoLogin) {
        pubsub.publish("authn-login-return");
      }

    });
    pubsub.subscribe("janrain.onEmailSent", function(){
      pubsub.publish("registration-success");
    });
    pubsub.subscribe("janrain.onModalOpen", function(){
      if (!isModalOpen) {
        pubsub.publish("authn-modal-open");
        isModalOpen = true;
        autoLogin = false;
      }
    });
    pubsub.subscribe("janrain.onModalClose", function(){
      pubsub.publish("authn-modal-close");
      isModalOpen = false;
    });
  }
}
</script><!-- end metrics_janrain_override block -->
<!-- begin metrics_authn_override block -->
<script>
DDO.authn = {
  init: function(pubsub, $){
    var triggerReturnUser = false;
    var autoLogin = true;
    var connextDataSet = false;
    var connextData = {};
    var hasLocalStorage = DDO.hasLocalStorage();
    var connextActive = DDO.connextActive();
    DDO.userData = DDO.userData || {};
    pubsub.subscribe("connext-updated", function(event, data){
      connextData = data;
      connextDataSet = true;
      pubsub.publish("authn-connext-ready", data);

    })
    function useConnext(action){
      if(connextDataSet){
        useConnextData(connextData, action);
        connextDataSet = false;
      }else{
        pubsub.subscribe("authn-connext-ready", function(event, connextData){
          useConnextData(connextData, action);
          connextDataSet = false;
        })
      }
    }
    function useConnextData(data, action){
      console.log("SATELLITE: used connext data");
      DDO.userData.userActive = data.isAuthenticated ?'logged-in':'not logged-in';
      DDO.userData.userType = data.isAuthorized ? "premium":(data.isAuthenticated ? "standard":"anonymous");
      DDO.dependentEventCheck("authn");
      if(typeof(action) != "undefined"){
        DDO.action(action);
      }

    }
    if(hasLocalStorage){
      DDO.userData.userStatus = localStorage.getItem("metricsUserStatus")||"";
      if(!connextActive){
        DDO.userData.userActive = localStorage.getItem("metricsUserActive")||"";
        DDO.userData.userType = localStorage.getItem("metricsUserType")||"";
      }
      if(localStorage.getItem("janrainCaptureReturnExperienceData")){
        DDO.userData.userProfileID = JSON.parse(localStorage.getItem("janrainCaptureReturnExperienceData"))["uuid"] ||"";
      }
    }
    pubsub.subscribe("authn-login", function(event, data){
      if(autoLogin){
        pubsub.publish("session-found");
      }
      DDO.userData.userStatus = 'registered';
      if(!connextActive){
        DDO.userData.userActive = 'logged-in';
        DDO.userData.userType = 'standard';
      }else{
        useConnext();
      }
      if(hasLocalStorage && !connextActive){
        localStorage.setItem("metricsUserStatus", DDO.userData.userStatus);
        localStorage.setItem("metricsUserActive", DDO.userData.userActive);
        localStorage.setItem("metricsUserType", DDO.userData.userType);
      }
      DDO.userData.userProfileID = data.uuid;
      if(!connextActive){
        DDO.dependentEventCheck('authn');
      }
    });
    pubsub.subscribe("authn-anonymous", function(event, data){
      DDO.userData.userStatus = 'not registered';
      if(!connextActive){
        DDO.userData.userActive = 'not logged-in';
        DDO.userData.userType = 'anonymous';
      }else{
        useConnext();
      }
      delete DDO.userData.userProfileID;
      if(hasLocalStorage){
        localStorage.setItem("metricsUserStatus", DDO.userData.userStatus);
        localStorage.setItem("metricsUserActive", DDO.userData.userActive);
        localStorage.setItem("metricsUserType", DDO.userData.userType);
      }
      if(!connextActive){
        DDO.dependentEventCheck('authn');
      }
      DDO.dependentEventCheck('authz');
    });
    pubsub.subscribe("authn-modal-open", function(event, data){
      if(typeof(window.janrainClickTracker)!="undefined"){
        if(typeof(DDO.loginEventClickNumber)!="undefined"){
          if(window.janrainClickTracker == DDO.loginEventClickNumber){
            return;
          }
        }
        DDO.loginEventClickNumber = window.janrainClickTracker;
      }
      if(connextActive){
        useConnext('loginEvent_start');
      }else{
        DDO.action('loginEvent_start');
      }
      autoLogin = false;
    });
    pubsub.subscribe("login-complete", function(event, data){
      if(!autoLogin){
        if(connextActive){
          useConnext('loginEvent_complete');
        }else{
          DDO.action('loginEvent_complete');
        }
      }
    });
    pubsub.subscribe("authn-logout", function(event, data){
      DDO.userData.userStatus = 'not registered';
      DDO.userData.userActive = 'not logged-in';
      DDO.userData.userType = 'anonymous';
      delete DDO.userData.userProfileID;
      if(hasLocalStorage){
        localStorage.setItem("metricsUserStatus", DDO.userData.userStatus);
        localStorage.setItem("metricsUserActive", DDO.userData.userActive);
        localStorage.setItem("metricsUserType", DDO.userData.userType);
      }
      DDO.action('loginEvent_logout');
    });

    pubsub.subscribe("session-found", function(){
      autoLogin = true;
      if(hasLocalStorage){
        currentCookie = localStorage.getItem("cmg-metricsReturnUserCookie");
        if(currentCookie != null){
          currentCookie = JSON.parse(currentCookie);
        }else{
            currentCookie = {timestamp:Math.floor(Date.now() / 1000)}
            localStorage.setItem("cmg-metricsReturnUserCookie", JSON.stringify(currentCookie));
        }
        if ((Math.floor(Date.now() / 1000) - currentCookie['timestamp'])>1800){
          triggerReturnUser = true;
          currentCookie = {timestamp:Math.floor(Date.now() / 1000)}
          localStorage.setItem("cmg-metricsReturnUserCookie", JSON.stringify(currentCookie))
        }
      }

    });

    // When user is auto-logged in.
    pubsub.subscribe("authn-login-return", function(event, data) {
      if(triggerReturnUser){
        if(connextActive){
          useConnext('loginEvent_return-user');
        }else{
          DDO.action('loginEvent_return-user');
        }
      }
       DDO.dependentEventCheck("authz");
    });
    pubsub.subscribe("registration-success", function(event, data) {
      DDO.action('loginEvent_new-user-register');

    });
    pubsub.subscribe("login-error", function(event, data) {
      DDO.action('loginEvent_error');
    });
  }
};
</script><!-- end metrics_authn_override block -->
<!-- begin metrics_authz_override block -->
<script>
DDO.authz = {
  init: function(pubsub, $){
    pubsub.subscribe("authorization.granted", function(event, data){
      DDO.userData.userType = data.premium_user ? 'premium' : 'standard';
      if(DDO.hasLocalStorage()){
        localStorage.setItem("metricsUserType", DDO.userData.userType);
      }
      DDO.dependentEventCheck('authz');
    });
  }
};
</script><!-- end metrics_authz_override block -->
<!-- begin metrics_comments_override block -->
<script>
DDO.comment = {
  init: function(pubsub, $){
    pubsub.subscribe('livefyre.commentPosted', function(event, data){
      DDO.action('commentSubmitted');
      if (data.sharedToFacebook) {
                pubsub.publish('authn-social-share', { type:'share-content', site:'facebook' });
            }
            if (data.sharedToTwitter) {
                pubsub.publish('authn-social-share', { type:'share-content', site:'twitter' });
            }
    });

    pubsub.subscribe('additional-comments', function(event, data){
      DDO.action('additionalComments', data);
    });
  }
};
</script><!-- end metrics_comments_override block -->
<!-- begin metrics_socialshare_override block -->
<script>
DDO.socialShare = {
  init: function(pubsub, $){
    pubsub.subscribe("authn-social-share", function(event, data){
      DDO.action("socialClick", data);
    });
    pubsub.subscribe("livefyre.commentShared", function(event, data){
      if (data.sharedToFacebook) {
              DDO.action('socialClick', { type:'share-comment', site:'facebook' });
          }
          if (data.sharedToTwitter) {
              DDO.action('socialClick', { type:'share-comment', site:'twitter' });
          }
    });

  }
};
</script><!-- end metrics_socialshare_override block -->
<!-- begin metrics_gallery_override block -->
<script>
DDO.gallery = {
  init: function(pubsub, $){
    pubsub.subscribe("gallery-secondary", function(event, data){
      DDO.action('gallerySecondaryPhotoView');
    });
    pubsub.subscribe("gallery-opened", function(event, data){
      DDO.action('galleryOpened');
    });
  }
};
</script><!-- end metrics_gallery_override block -->
<!-- begin metrics_breakingnews_override block -->
<script>
DDO.breakingNews = {
  init: function(pubsub, $){
    pubsub.subscribe("breaking-news-banner", function(event, data){
      DDO.action("breakingNews", {contentType:DDO.pageData.pageContentType});
    });

    pubsub.subscribe("breaking-news-story", function(event, data){
      DDO.action('breakingNewsStory');
    });
  }
};
</script><!-- end metrics_breakingnews_override block -->
<!-- begin metrics_relatedobjects_override block -->
<script>
DDO.relatedObjects = {
  init: function(pubsub, $){
    pubsub.subscribe("related-objects", function(event, data){
      DDO.action("relatedObjects", {contentType:DDO.pageData.pageContentType});
    });
    pubsub.subscribe("non-gallery-photo", function(event, data){
      DDO.action("nonGalleryPhoto", {contentType:DDO.pageData.pageContentType});
    });
  }
};
</script><!-- end metrics_relatedobjects_override block -->
<!-- begin metrics_video_override block -->
<script>
DDO.videoMetrics = {
  init: function(pubsub, $){
    pubsub.subscribe("video-start", function(event, data){
      DDO.action('videoStart', data);
    });
    pubsub.subscribe("video-content-play", function(event, data){
      DDO.action('videoContentPlay', data);
    });
    pubsub.subscribe("video-pause", function(event, data){
      DDO.action('videoPause', data);
    });
    pubsub.subscribe("video-complete", function(event, data){
      DDO.action('videoComplete', data);
    });
  }
};
</script><!-- end metrics_video_override block -->
<!-- end metrics_config_complete_override block -->
<!-- begin connext_meta_override block -->
<!-- Meter objectType: FlatPage/NA -->
<!-- ConneXt switched on -->
<!-- begin cmg_product_metatag_override block -->
<meta name="cmg:product" content="www.mystatesman.com">
<!-- end cmg_product_metatag_override block -->
<!-- begin cmg_connext_config_metatag_override block -->
<meta name="cmg:connext:config" content="mystatesman_default">
<!-- end cmg_connext_config_metatag_override block -->
<!-- begin cmg_site_section_metatag_override block -->
<meta name="cmg:siteSection" content="News">
<!-- end cmg_site_section_metatag_override block -->
<!-- begin cmg_main_section_metatag_override block -->
<meta name="cmg:mainSection" content="/metro-state">
<!-- end cmg_main_section_metatag_override block -->
<!-- begin cmg_primary_category_metatag_override block -->
<meta name="cmg:primaryCategory" content="/News/Local">
<!-- end cmg_primary_category_metatag_override block -->
<!-- begin cmg_categories_metatag_override block -->
<meta name="cmg:categories" content="/News/Local">
<!-- end cmg_categories_metatag_override block -->
<!-- begin cmg_topics_metatag_override block -->
<meta name="cmg:topics" content="">
<!-- end cmg_topics_metatag_override block -->
<!-- Meter switched to ConneXt -->
<!-- begin cmg_meter_metatag_override block -->
<meta name="cmg:meter" content="false">
<!-- end cmg_meter_metatag_override block -->
<!-- begin cmg_max_meter_temporary_metatag_override block -->
<meta name="cmg:maxMeterTemporary" content="5">
<!-- end cmg_max_meter_temporary_metatag_override block -->
