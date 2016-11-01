/**
 * Created by darkwolf on 30.10.2016.
 */
import history from './components/native.history'
export default (function(win,doc,history,undefined) {
    var curState = {
            data:null,
            title:doc.title,
            url:win.location.href
        };

    history.Adapter.bind(win,'statechange',function(){ // Note: We are using statechange instead of popstate
        var State = history.getState(); // Note: We are using History.getState() instead of event.state
        if (State.url != curState)
            LoadPage(State.url,false);
    });






    return requestPage;

})(window,window.document,history)