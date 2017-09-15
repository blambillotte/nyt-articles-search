
var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
var searchString = 'Music';
var recordNumber = 5;
var startYear = "20050101";
// TODO: we will need to convert this date
var endYear = '20170914';

url += '?' + $.param({
  'api-key': "dbf4e3adce434ed487b5ff5bcfa4aac2",
  'q': searchString,
  'begin_date': startYear,
  'end_date': endYear
});

$.ajax({
  url: url,
  method: 'GET',
}).done(function(results) {
  console.log(results);
  // console.log(results.response.docs[0].snippet);
    function getResults() {
      for (var i = 0; i < recordNumber; i++) {
        console.log(results.response.docs[i].snippet);
      }
    }

    getResults();
}).fail(function(err) {
  throw err;
});
