$(document).ready(function(){

  $('.btn-dl').click(function(){
    var hash = $('.btn-dl').val();
    $('.btn-dl').addClass('hide');
    $('.loadAnim').removeClass('hide');
    console.log( 'going to download from ' + hash );
    // getHash(hash);
    download(hash);
  });


});


function donePrep(url, name) {
  $('.loadAnim').addClass('hide');

  $('.ready-link').attr('href', url );
  $('.ready-link').attr('download', name);;
  $('.ready-link').text(name);

  $('.ready-link').removeClass('hide');
}

/*<div class="hide" id="magnetID"><%= magnet %></div>*/
