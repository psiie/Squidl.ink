$(document).ready(function(){

  $('.btn-stream').click(function(){
    playMedia = true;
    streamOrDownload(); // same file, below.
  });
  $('.btn-dl').click(function(){
    streamOrDownload(); // same file, below
  });

});

// This function is here because both stream and download buttons do the same thing
// except the stream button toggles playMedia boolean
function streamOrDownload() {
  var hash = $('.btn-dl').val();
  $('.btn-dl').addClass('hide');
  $('.btn-stream').addClass('hide');
  $('.loadAnim').removeClass('hide');
  $('.p-excerpt').addClass('hide');
  $('.downloaded').removeClass('hide');
  $('.uploaded').removeClass('hide');
  $('.filesize').removeClass('hide');
  console.log( 'going to download from ' + hash );
  // getHash(hash);
  download(hash); // download.js
}


/*<div class="hide" id="magnetID"><%= magnet %></div>*/
