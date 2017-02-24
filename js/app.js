require("../css/styles.scss")
var $ = jquery = require('jquery')
$(".play").click(function(){
  $(".intro").fadeOut();
  setTimeout(function(){
    $(".quiz").fadeIn();
  }, 500);
});

$(".button").click(function(){
  setTimeout(function(){
    $(document).scrollTop(0);
  }, 500);

});

$.getJSON("data/data.json", function(data){
  $('.total-number').html(data.length)
  question_counter = parseInt($('.quiz').attr('data-question'))
  getQuestion(question_counter)
  $('body').on('click','.answers .button',function(){
    $('.answers .button').addClass('disabled')
    $(this).removeClass('disabled')
    $(this).addClass('enabled')
    question_counter = parseInt($('.quiz').attr('data-question'))
    updateSentence($(this).attr("data-which"))
    $('.next.button').removeClass('hide')
     $('.next.button').on('click',function(){
      $('.quiz').attr('data-question',question_counter+1)
      if(parseInt($('.quiz').attr('data-question'))<(data.length)){
        getQuestion(parseInt($('.quiz').attr('data-question')))
      } else {
        $('.next.button').html('Review')
      }
    })
  })
  function getQuestion(index){
    $('.answers').html('')
    $('.counter .card-number').html(index+1)
    $('.next.button').addClass('hide')
    $('.quiz .question').html(data[index]['question'])
    $('.results').addClass('hide')
    data[index]['options'].forEach(function(e,i){
      $('.answers').append('<div class="button c'+(i+1)+'" data-which="'+i+'">'+e.opt+"</div>")
    })
    if (index==data.length){
      $('.next.button').html('Review')
    }
  }
  function updateSentence(index){
    $('.results').removeClass('hide')
    $('.results p').html(data[index]['options'][index]['response'])
  }
});

