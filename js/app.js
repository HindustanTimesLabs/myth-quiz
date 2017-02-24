require("../css/styles.scss")
var $ = jquery = require('jquery')
$(".play").click(function(){
  $(".intro").fadeOut();
  setTimeout(function(){
    $(".quiz").fadeIn();
    var pos = $(".copy-container").offset();
     $('html, body').animate({scrollTop:(pos.top)}, 600);
  }, 500);
});

$(".button").click(function(){
  setTimeout(function(){
    $(document).scrollTop(0);
  }, 500);

});


$.getJSON("data/data.json", function(data){
   var pos = $(".copy-container").offset();
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
      $('html, body').animate({scrollTop:(pos.top)}, 600);
      $('.quiz').attr('data-question',question_counter+1)
      if(parseInt($('.quiz').attr('data-question'))<(data.length)){
        getQuestion(parseInt($('.quiz').attr('data-question')))
      }else{
        $('.quiz').attr('data-question',"0")
        getQuestion(0)
        $('.next.button').html('Next question')
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
    if (index==(data.length-1)){
      $('.next.button').html('Take the quiz again')
      $('.final').removeClass('hide')
    }
  }
  function updateSentence(index){
    $('.results').removeClass('hide')
    var curr = parseInt($('.quiz').attr('data-question'))
    $('.results').html(data[curr]['options'][index]['response'])
  }
});

