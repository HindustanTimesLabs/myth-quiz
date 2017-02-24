require("../css/styles.scss")
var $ = jquery = require('jquery')
$(".play").click(function(){
  $(".intro").fadeOut();
  setTimeout(function(){
    $(".quiz").fadeIn();
  }, 500);
});

var question_counter = 0

$(".button").click(function(){
  setTimeout(function(){
    $(document).scrollTop(0);
  }, 500);

});

$.getJSON("data/data.json", function(data){
  $('.total-number').html(data.length)
  getQuestion(question_counter)
  $('body').on('click','.answers .button',function(){
    $('.answers .button').addClass('disabled')
    $(this).removeClass('disabled')
    updateSentence($(this).attr("data-which"))
    $('.next.button').removeClass('hide')
     $('.next.button').on('click',function(){
      if(question_counter<(data.length-1)){
        question_counter=question_counter+1
        getQuestion(question_counter)
      } else {
        $('.next.button').html('Review')
      }
    })
  })
  function getQuestion(index){
    $('.answers').html('')
    $('.counter .card-number').html(index+1)
    $('.next.button').addClass('hide')
    $('.quiz .question').html(data[question_counter]['question'])
    $('.results').addClass('hide')
    data[question_counter]['options'].forEach(function(e,i){
      $('.answers').append('<div class="button c'+(i+1)+'" data-which="'+i+'">'+e.opt+"</div>")
    })
  }
  function updateSentence(index){
    $('.results').removeClass('hide')
    $('.results p').html(data[question_counter]['options'][index]['response'])
  }
});

