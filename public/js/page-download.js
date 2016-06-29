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




/*<div class="hide" id="magnetID"><%= magnet %></div>*/
