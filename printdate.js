/**
 * Created by darkwolf on 25.06.2016.
 */
!(function() {
    console.log("*** pretty Date ***");    
    var test = new Date("Thu, 23 Jun 2016 18:14:34 +0200");
    console.log(prettyDate(test));

    function prettyDate(dateTime, reference) {
        if (!(dateTime instanceof Date)||isNaN(dateTime))
            return "";
        if (!(reference instanceof Date)||isNaN(reference))
            reference = new Date();
        var today = reference.toDateString(),
            yesterday =  new Date(reference - 24*60*60*1000).toDateString(),
            date = dateTime.toDateString(),
            monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ],
        ret = "";
        if (date == today)
            return "Today";
        if (date == yesterday)
            return "Yesterday";

        ret = dateTime.getDate()+" "+monthNames[dateTime.getMonth()];
        if (dateTime.getFullYear() != reference.getFullYear())
            ret += ", "+dateTime.getFullYear();
        return ret;
    }




})();