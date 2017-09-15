
var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
var searchString = '';
var recordNumber = 5;
var startYear = "20050101";
// TODO: we will need to convert this date
var endYear = '20170914';

//DOM Elements
var searchBtn = $('#runSearch');
var clearBtn = $('#clearAll');
var searchTermInput = $('#searchTerm');
var numRecordsInput = $('#numRecordsSelect');
var resultDiv = $('#wellSection');


function callAPI() {
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

        writeToDOM(results.response.docs[i].snippet, results.response.docs[i].byline.original, results.response.docs[i].web_url);
      }
    }

    getResults();

  }).fail(function(err) {
    throw err;
  });
};

function writeToDOM(title, subTitle, url) {
  //Add Title "Snippet"
  console.log(subTitle);
  var title = $('<h2>');
  title.html(title);

  //Add subtitle "Byline"
  var subtitle = $('<span>');
  subtitle.addClass('subtitle');
  subtitle.html(subTitle);

  //Apend Items
  resultDiv.append(title, subtitle);

  console.log(url);

}

function clearResults() {
  resultDiv.empty();
  searchTermInput.val('');
};

function search() {
  event.preventDefault();
  console.log(searchTermInput.val());
  searchString = searchTermInput.val();
  recordNumber = numRecordsInput.val();
  callAPI();
  clearResults();
};


searchBtn.on('click', search);
clearBtn.on('click', clearResults);
