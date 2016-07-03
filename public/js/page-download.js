$(document).ready(function(){

  $('.btn-stream').click(function(){
    playMedia = true; // depricated
    streamOrDownload(); // same file, below.
  });
  $('.btn-dl').click(function(){
    if ( ($('.isItLarge').attr('value') == 'true') && navigator.userAgent.search("Firefox") == -1 ) {
      swal({
        title: "File Larger Than 1GB",
        text: "Due to limitations in certain web browsers, you may not be able to download the file to the HDD. <br><br>Switching to <b>Firefox</b> for downloading is <i>highly</i> recommended.",
        type: "warning",
        html: true
      });
    }
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
  $('.percent').removeClass('hide');
  $('.time-remaining').removeClass('hide');
  console.log( 'going to download from ' + hash );
  // getHash(hash);
  download(hash); // download.js
}


/*<div class="hide" id="magnetID"><%= magnet %></div>*/
