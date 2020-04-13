$(function(){
  function buildHTML(message){
    if (message.image){
      var html = `<div class="main-messages__message" data-message-id=${message.id}>
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
                    <img src=${message.image}>
                  </div>`
      return html;
    } else {
      var html = `<div class="main-messages__message" data-message-id=${message.id}>
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
      $('.main-form__window__submit').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    });
  })
  $(function(){
    var reloadMessages = function(){
      var last_message_id = $('.main-messages__message:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages){
        if (messages.length !== 0){
          var insertHTML = '';
          $.each(messages, function(index,message){
            insertHTML += buildHTML(message)
          });
          $('.main-messages').append(insertHTML);
          $('.main-messages').animate({ scrollTop: $('.main-messages')[0].scrollHeight});
        }
      })
      .fail(function(){
        alert('error');
      });
    };
    if (document.location.href.match(/\/groups\/\d+\/messages/)){
      setInterval(reloadMessages, 7000);
    }
  });
});