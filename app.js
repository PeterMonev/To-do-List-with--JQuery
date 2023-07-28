$("#addBtn").click(function (event) {
  event.preventDefault();
  const task = $("#todoInput").val();
  let alert = ''

  if (task) {
    alert = 'success'


    $("#todoInput").val(''); 
  } else {
    alert = 'fail'
  

  }
// alert timeout functionality
  $(`#${alert}-alert`).fadeIn();
  setTimeout(function () {
    $(`#${alert}-alert`).fadeOut();
  }, 2000);

});
