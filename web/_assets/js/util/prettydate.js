/**
 * Created by darkwolf on 25.06.2016.
 */
export default function prettyDate(dateTime, reference) {
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
