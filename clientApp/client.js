var monthsList = [
  'January', 
  'February', 
  'March', 
  'April', 
  'May', 
  'June',
  'July', 
  'August', 
  'September', 
  'October', 
  'November', 
  'December'
];

var holidaysList = {};
var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:3000/calendar', true);
request.send(); 
request.onreadystatechange = function () {
  var $gif = $('.gif');
   if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
        $gif.fadeOut();
        var response = request.responseText;
        holidaysList = JSON.parse(response);
        calendar(holidaysList);    
   }
};


function calendar(holidaysList, userRange) {
  var $calendarTable = $('.calendar_table');
  $calendarTable.html('');
  var table = '<table border = "1"><tr><th>Month</th><th>Date</th><th>Weekend</th><th>Name</th></tr>';
  for (var month in holidaysList) {
    if (userRange && userRange.indexOf(month) === -1) {
      continue;
    }
    else {
    var obj=holidaysList[month];
    for (var day in obj) {
      var weekend = obj[day].rest;
      var holidayName = obj[day].n;
      var tdWeekend = '<td class="bg-success">Weekend</td>';
      var tdWorkDay = '<td class="bg-warning">Work day</td>';
      table += "<tr>" + "<td>" + month + "</td>" + "<td>" + day + "</td>";
          if (weekend) {
            table += tdWeekend;
          }
          else {
            table += tdWorkDay;
          }
          if (holidayName) {
            table += "<td>" + holidayName + "</td></tr>";
          }
          else {
            table += "<td></td></tr>";
          }
      month = "";
    }
  }
}
  table += '</table>';
  $calendarTable.append(table);
}

$(function(){
  $('#startDate').daterangepicker({
  singleDatePicker: true,
  });
});

$(function(){
  $('#endDate').daterangepicker({
  singleDatePicker: true,
  });
});

function buildUserRange () {
  userRange = [];
  var $startDate = $('#startDate');
  var $endDate = $('#endDate');
  var startDateValue = $startDate.val();
  var endDateValue = $endDate.val();
  var startDateValueParsed = Date.parse(startDateValue);
  var endDateValueParsed = Date.parse(endDateValue);
  var startMonth = new Date(startDateValueParsed).getMonth();
  var endMonth = new Date(endDateValueParsed).getMonth();
  for (i = 0; i < monthsList.length; i++) {
      if (i >= startMonth && i <= endMonth) {
          userRange.push(monthsList[i]);
      }
  }
  calendar (holidaysList, userRange);
}







