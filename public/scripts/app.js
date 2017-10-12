console.log("Sanity Check: JS is working!");
var template;
var $vacationsList;
var allVacations = [];

$(document).ready(function(){

	$vacationsList = $('#vacationTarget');

  // compile handlebars template
  var source = $('#vacations-template').html();
  template = Handlebars.compile(source);

  $.ajax({
    method: 'GET',
    url: '/api/dream-vacations',
    success: handleSuccess,
    error: handleError
  });

  /*
	 $('#newBookForm').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/books',
      data: $(this).serialize(),
      success: newVacationSuccess,
      error: newVacationError
    });
  });

  $booksList.on('click', '.deleteBtn', function() {
    console.log('clicked delete button to', '/api/books/'+$(this).attr('data-id'));
    $.ajax({
      method: 'DELETE',
      url: '/api/books/'+$(this).attr('data-id'),
      success: deleteVacationSuccess,
      error: deleteVacationError
    });
  });
  */
});

// helper function to render all posts to view
// note: we empty and re-render the collection each time our post data changes
function render () {
  // empty existing posts from view
  $vacationsList.empty();

  // pass `allVacations` into the template function
  var vacationsHtml = template({ vacations: allVacations });

  // append html to the view
  $vacationsList.append(vacationsHtml);
};

function handleSuccess(json) {
  allVacations = json;
  render();
}

function handleError(e) {
  console.log('uh oh');
  $('#vacationTarget').text('Failed to load vacations, is the server working?');
}

/*function newVacationSuccess(json) {
  $('#newVacationForm input').val('');
  allVacations.push(json);
  render();
}

function newVacationError() {
  console.log('new vacation error!');
}*/

/*function deleteVacationSuccess(json) {
  var vacation = json;
  console.log(json);
  var vacationId = vacation._id;
  console.log('delete vacation', vacationId);
  // find the vacation with the correct ID and remove it from our allVacations array
  for(let i = 0; i < allVacations.length; i++) {
    if(allVacations[i]._id === vacationId) {
      allVacations.splice(i, 1);
      break;  // we found our book - no reason to keep searching (this is why we didn't use forEach)
    }
  }
  render();
}

function deleteVacationError() {
  console.log('delete vacation error!');
}*/
