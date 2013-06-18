function formattedDate(timestamp) {
var d = new Date(parseInt(timestamp, 10));
return d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
}

$.getJSON('starred.json', function(data) {
var origin_title = [];
var feed_title = [];
var date = [];
var link = [];
var content = [];
var short_content = [];

$.each(data.items, function(i, x) {
origin_title[i] = x.origin.title;
feed_title[i] = x.title;
date[i] = formattedDate(x.crawlTimeMsec);
link[i] = (typeof x.alternate !== 'undefined') ? x.alternate[0].href : x.origin.htmlUrl;
content[i] = (typeof x.content !== 'undefined') ? x.content.content : x.summary.content;
short_content[i] = content[i].replace(/<(?:.|\n)*?>/gm, '').substring(0, 150 - feed_title[i].length);

output = "<tr class='feed'>";
output += "<td class='origin'>" + origin_title[i] + "</td>";
output += "<td class='title'><a href='" + link[i] + "'>" + feed_title[i] + "</a> - <span class='s_content'>" + short_content[i] + "</span></td>";
output += "<td class='date'>" + date[i] + "</tr>";
output += "</tr>";
$("#content").append(output);
});
});
