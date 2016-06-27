var isUploading = false;
var mediaFormats = ['mp4','webm','m4v','m4a',
  'mp3','wav','jpg','gif','png','pdf','txt'];
var TRACKERS = [
  'ws://torrent.lunik.xyz:8000',
  'udp://torrent.lunik.xyz:8000',
  'http://torrent.lunik.xyz:8000/announce',
  'wss://tracker.webtorrent.io',
  'udp://tracker.internetwarriors.net:1337',
  'udp://tracker.leechers-paradise.org:6969',
  'udp://tracker.coppersurfer.tk:6969',
  'udp://exodus.desync.com:6969',
  'wss://tracker.btorrent.xyz',
  'wss://tracker.openwebtorrent.com',
  'wss://tracker.fastcast.nz'
]

// ================================================ //
// Document Ready
$(document).ready(function(){

  $('.container').on('dragover', '.box', function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.id = 'hover';
    // Add dragging class
    if ( !$('.box').hasClass('dragging') ) {
      $('.box').addClass('dragging');
    };
    console.log('dragover');
    return false
  })
  $('.container').on('dragleave', '.box', function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.id = '';
    // remove dragging class
    if ( $('.box').hasClass('dragging') ) {
      $('.box').removeClass('dragging');
    };
    console.log('dragleave');
    return false
  })
  $('.container').on('drop', '.box', function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.id = '';
    isUploading = true;
    // remove dragging class
    if ( $('.box').hasClass('dragging') ) {
      $('.box').removeClass('dragging');
    };
    var file = e.originalEvent.dataTransfer.files[0];
    console.log(file);
    seed(file);
  })
});

// ================== Stats Update ==================== //


function updateStats(progress, upload, download, peers, uploaded, downloaded, ratio, timeRemaining) {
  $('.time-remaining').text(Math.floor(timeRemaining/1000) + ' seconds remaining');
  $('.percent').text(Math.floor(progress*100) + '% Done');
  $('.progress-bar').css('width', progress*100 + '%');
  $('.upload').text(formatSpeed(upload) );
  $('.download').text(formatSpeed(download) );
  $('.peers').text(peers + ' peers');
  $('.uploaded').text(formatData(uploaded) + ' Uploaded');
  $('.downloaded').text(formatData(downloaded) + ' Downloaded');
  $('.filesize').text( formatData(Math.floor((1/progress)*downloaded)) + ' Total Size' );
  $('.ratio').text( (ratio < 1000 ? ratio.toFixed(2) : '∞') + ' ratio');
}

// see https://github.com/Lunik/Instant-Share/blob/master/src/js/app.js
// The function is perfect. No use re-inventing the wheel

// bits to formated speed
function formatSpeed (bits) {
  var sizes = ['b/s', 'kb/s', 'Mb/s', 'Gb/s', 'Tb/s']
  if (bits === 0) {
    return '0 b/s'
  }
  var i = parseInt(Math.floor(Math.log(bits) / Math.log(1024)), 10)
  return Math.round(bits / Math.pow(1024, i), 2) + ' ' + sizes[i]
}

// bytes to formated data
function formatData (bytes) {
  var sizes = ['B', 'kB', 'MB', 'GB', 'TB']
  if (bytes === 0) {
    return '0 B'
  }
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
}


// ================================================ //
function getExtension(filename) {
  return filename.split('.')[filename.split('.').length - 1]
}

function downloadLink(link, fileName) {
  $('.dl-link').attr('href', link);
  $('.dl-link').attr('download', fileName);
  $('.dl-link').show();
}
