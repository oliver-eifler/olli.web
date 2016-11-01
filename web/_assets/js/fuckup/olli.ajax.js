/*
this file is part of the olli web framework
oliver.eifler@gmx.de
*/
olli.ajax = {};
(function(lib,olli,$) {
lib.vars = {};
lib.vars.ver="0.0.2";
lib.vars.ajaxload = null;
lib.vars.ajaxunload = null;
//private
vars = {set:false};
//var History = null;

   function init () {
        //if (!Modernizr.history)
        //    return false;
        //if (History == null)
            initHistory();
        if (!History.enabled)
            return false;
        oPageInfo.title = document.title;
        $("a.ajax-nav").click(processLink);
        $("form.ajax-form").each(function(index)
        {
            var $form = $(this);
            $form.submit( function () {return false;});
            $form.find('input[type="submit"]').click($form,submitForm);
            $form.find('button[type="submit"]').click($form,submitForm);
        });
        $("form.sitesearch").each(function(index)
        {
            var $form = $(this);
            $form.submit( function () {submitSearch($form);return false;});
        });
        //cache elements the first time
        if (vars.set === false)
        {
            vars = {
                $mobilemenu:$("#navigation:first"),
                $menu:$("#menu"),
                $header:$('#header'),
                $content:$('#content'),
                set:true
            };
        if (DEBUG)
        {
          console.log("ajax:cache set");
        }
        }
        return true;
    };
    function submitSearch($form)
    {
        bUpdateURL = true;
        var has_empty = false;
        $form.find( 'input[type!="hidden"]' ).each(function () {
            if ( ! $(this).val() ) { has_empty = true; return false; }
        });
        if ( has_empty ) { return false; }
            var url = $form.attr("action");
            var data = $form.serialize();
           $form[0].reset();
           getForm(url,data);
        return false;
    }
    function submitForm(event)
    {
        olli.pagemenu.open(false);
        bUpdateURL = true;
        var $this = $(this);
        var $form = event.data;
        var cmd = $this.attr('name');
        if (cmd != 'cancel')
        {
            var url = $form.attr("action");
            var data = $form.serialize();
            if (data.length > 0)
                data +="&";
            data += cmd+"="+cmd;
            alert("form: "+url+" data: "+data);
            getForm(url,data);
        }
        else
        {
            var url = $this.attr("data-url");
            getPage(url);
        }
        return false;
    };

    function processLink () {
        olli.pagemenu.open(false);
        requestPage(this.href);
        return false;
    };
    function requestPage (sURL) {
       if (History.pushState) {
            bUpdateURL = true;
            getPage(sURL);
        } else {
            location.assign(sURL);
        }
    };
    function getPage (sURL,sData) {
        if (bIsLoading) { return; }
        if (sURL) { oPageInfo.url = filterURL(sURL, null); }
        data = sData||"";
        if (data.length > 0)
            data +="&";
        data +="view_as=json";
        $.ajax({
            type: "GET",
            cache: false,
            url: oPageInfo.url, // JQuery loads serverside.php
            data: data, // Send value of the clicked button
            dataType: 'json', // Choosing a JSON datatype
            beforeSend: function(xhr) {bIsLoading = true;showOverlay(true);},
            success: pageLoad,
            error:   pageError
        });
    }
     function getForm (sURL,sData) {
        if (bIsLoading) { return; }
        if (sURL) { sURL=buildUrl(sURL,"view_as","json");oPageInfo.url = filterURL(sURL, null); }

        $.ajax({
            type: "POST",
            cache: false,
            url: sURL, // JQuery loads serverside.php
            data: sData, // Send value of the clicked button
            dataType: 'json', // Choosing a JSON datatype
            beforeSend: function(xhr) {bIsLoading = true;showFormOverlay(true);},
            success: pageLoad,
            error:   pageError
        });
    }
    function pageLoad(data)
    {
        document.title = oPageInfo.title = data.title;
        if (typeof(lib.vars.ajaxunload)=='function')
            lib.vars.ajaxunload(null);
        else
            $(window).trigger("ajaxunload");
        //vars.$menu.html(data.menu);
        //vars.$menu.refreshmenu("#mainmenu","#submenu");
        olli.pagemenu.refresh(data.menu);
        vars.$header.html(data.header);
        vars.$content.html(data.content);
        //if (data.error)
        //    bUpdateURL = false;
        if (bUpdateURL) {
            History.pushState(oPageInfo, oPageInfo.title, oPageInfo.url);
            bUpdateURL = false;
        }
        php.curpage = data.curpage;
        php.cursubpage = data.cursubpage;
        php.error = data.error;
        php.pageinit = data.pageinit;
        php.pageready = data.pageready;
        //modify totop link
        $("a#totop").attr("href","#top").click(function(event){event.preventDefault();window.scroll(0,0);});
        if (typeof(lib.vars.ajaxload)=='function')
            lib.vars.ajaxload(null,data);
        else
            $(window).trigger("ajaxload",[data]);
        bIsLoading = false;
        showOverlay(false);
    };
    function pageError(jqXHR,textStatus,errorThrown)
    {
        document.title = oPageInfo.title = "ajax error";
        if (typeof(lib.vars.ajaxunload)=='function')
            lib.vars.ajaxunload(null);
        else
            $(window).trigger("ajaxunload");

        var html="<p class='red'><b>"+textStatus+" - "+errorThrown+")</b></p><code>"+olli.htmlencode(jqXHR.responseText)+"</code>";
        vars.$header.html("<h1>Ajax Error</h1>");
        vars.$content.html(html);
        bUpdateURL = false;
        php.error = true;
        php.pageinit = "";
        php.pageready = "";

        //modify totop link
        $("a#totop").attr("href","#top").click(function(event){event.preventDefault();window.scroll(0,0);});
        if (typeof(lib.vars.ajaxload)=='function')
            lib.vars.ajaxload(null,data);
        else
            $(window).trigger("ajaxload",[data]);
        bIsLoading = false;
        showOverlay(false);
    };
    function initHistory()
    {
        //History = window.History; // Note: We are using a capital H instead of a lower h
        if (!History.enabled )
            return;
        // Bind to StateChange Event
        History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
        var State = History.getState(); // Note: We are using History.getState() instead of event.state
        bUpdateURL = false;
        if (oPageInfo.url == State.url)
            return;
        oPageInfo.title = State.title;
        oPageInfo.url = State.url;
        getPage();
        });
    };


//public functions
lib.init = init;
lib.load = requestPage;

//init code
$.xhrPool = []; // array of uncompleted requests
$.xhrPool.abortAll = function() { // our abort function
$(this).each(function(idx, jqXHR) {
    jqXHR.abort();
    });
    $.xhrPool.length = 0
    };
$.ajaxSetup({
    beforeSend: function(jqXHR) { // before jQuery send the request we will push it to our array
    $.xhrPool.push(jqXHR);
      },
    complete: function(jqXHR) { // when some of the requests completed it will splice from the array
    var index = $.inArray(jqXHR,$.xhrPool);//$.xhrPool.indexOf(jqXHR);
    if (index > -1) {
    $.xhrPool.splice(index, 1);
    }
    }
    });
/* customizable constants */
var sTargetId = "ajax-content", sViewKey = "view_as", sAjaxClass = "ajax-nav",
/* not customizable constants */
rSearch = /\?.*$/, rHost = /^[^\?]*\?*&*/, rView = new RegExp("&" + sViewKey + "\\=[^&]*|&*$", "i"), rEndQstMark = /\?$/,
oPageInfo = {
    title: null,
    url: location.href
}, bIsLoading = false, bUpdateURL = false;
//Init History

//private helpers
function showOverlay(bShow)
{
    //var $overlay = $("#overlay"),$modal = $("#modal"),$modalbox=$("#modalbox");
    if (bShow)
    {

        //$overlay.addClass("modal-back");
        //$overlay.height($(document).height());
        //$modalbox.html('<i class=\"fa fa-spinner fa-spin fa-4x\"></i><h2>Seite wird geladen<h2>');
        //$modal.show();
        $.blockUI({message: '<i class=\"fa fa-spinner fa-spin fa-4x\"></i><h2>Seite wird geladen<h2>',overlayCSS:{opacity:0.8}});

    }
    else
    {
        //$modal.hide();
        //$overlay.removeClass("modal-back");
        //$overlay.removeAttr("style");
        $.unblockUI();

    }
}
function showFormOverlay(bShow)
{
    if (bShow)
    {
        $.blockUI({message: '<i class=\"fa fa-spinner fa-spin fa-4x\"></i><h2>Daten werden verarbeitet<h2>',overlayCSS:{opacity:0.8}});

    }
    else
    {
        $.unblockUI();

    }
}
function filterURL (sURL, sViewMode)
{
        return sURL.replace(rSearch, "") + ("?" + sURL.replace(rHost, "&").replace(rView, sViewMode ? "&" + sViewKey + "=" + sViewMode : "").slice(1)).replace(rEndQstMark, "");
}
function buildUrl(base, key, value) //private
{
    var sep = (base.indexOf('?') > -1) ? '&' : '?';
    return base + sep + key + '=' + value;
}

})(olli.ajax,olli,jQuery);