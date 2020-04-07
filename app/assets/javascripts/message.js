$(function(){
  $('#new_message').on('submit',function(e){
    e.preventDefault()
    var formData = new FomeData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
  })
});