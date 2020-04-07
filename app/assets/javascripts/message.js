$(function(){
  function buildHTML(message){
    if (message.image){
      var html = `<div class="main-messages__message">
                    <div class="main-messages__message__info">
                      <div class="main-messages__message__info__name">
                        ${message.user_name}
                      </div>
                      <div class="main-messages__message__info__date">
                        ${message.created_at}
                      </div>
                    </div>
                      <div class="main-messages__message__text">
                        ${message.content}
                    </div>
                    <imag src=${message.image}>
                  </div>`
      return html;
    } else {
      var html = `<div class="main-messages__message">
                    <div class="main-messages__message__info">
                      <div class="main-messages__message__info__name">
                        ${message.user_name}
                      </div>
                      <div class="main-messages__message__info__date">
                        ${message.created_at}
                      </div>
                    </div>
                      <div class="main-messages__message__text">
                        ${message.content}
                    </div>
                  </div>`
      return html;
    };
  }
  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-messages').append(html);
      $('.main-messages').animate({ scrollTop: $('.main-messages')[0].scrollHeight});
      $('form')[0].reset();
    })
  })
});