const apiKey = 'fw782QIUDyZdOsLEhrur1YeFUTtSUqRLUjcB9Ja2'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks'

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  if (responseJson.data.length === 0) {
    $('#results-list').append(`<h2>No results found! Please try again</h2>`);
  }
  else {
  for (let i = 0; i < responseJson.data.length; i++){
 console.log(i);
 $('#results-list').append(`
 <li> <h3>${responseJson.data[i].fullName}</h3>
 <p>${responseJson.data[i].description}</p>
 <a href="responseJson.data[i].url>URL</a>`)
};
}
}

 function getPark(query, maxResults=10) {
  const params = {
    api_key: apiKey,
    stateCode: query,
    limit: maxResults
  };
  console.log(params);
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchState = $('#js-search-term').val();
    console.log(searchState);
    const maxResults = $('#js-max-results').val();
    console.log(maxResults);
    getPark(searchState, maxResults);
  });
}

$(watchForm)