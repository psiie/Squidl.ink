// downloadl.ink | givl.ink | directl.ink | portl.ink | squid.ink | squidl.ink
// octol.ink | omnil.ink | integral.ink | veral.ink |
// fs.lunik.xyz/#0337d58a486bebd6be450f60dd02e95042ca2350
// small music: fs.lunik.xyz/#e06391491356e372aed67f4bdfca801d8899c117
// small zip: eedf3cc0ae3f877b849b1da70356a06f717f83d0

// auto open new window: window.open(url, '_blank');

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


// Initialize event on torrent. Mostly status
function initTorrent(torrent) {
  torrent.on('metadata', function() {
    console.log('metadata: ', torrent.name);
  });
  torrent.on('ready', function() {
    console.log('ready: ', torrent);
    console.log('appending to holder');
    appendHolder(torrent);
  });
  torrent.on('download', function(chunkSize) {
    updateStats(torrent.progress,
      torrent.uploadSpeed,
      torrent.downloadSpeed,
      torrent.numPeers,
      torrent.uploaded,
      torrent.downloaded,
      torrent.ratio,
      torrent.timeRemaining);
  });
  torrent.on('wire', function(wire) {
    console.log('wire: ', wire.remoteAddress + ":" + wire.remotePort);
  });
  torrent.on('done', function() {
    console.log('torrent complete');
    console.log(torrent);
    updateStats(torrent.progress, 0, 0,
      torrent.numPeers,
      torrent.uploaded,
      torrent.downloaded,
      torrent.ratio,
      0);
  });
  torrent.on('upload', function() {
    console.log('upload: ', torrent.name);
    updateStats(torrent.progress, 0, 0,
      torrent.numPeers,
      torrent.uploaded,
      torrent.downloaded,
      torrent.ratio,
      0);
  });
  torrent.on('noPeers', function() {
    console.log('noPeers: ', torrent.name);
    console.log('seeding');
  });
}

// Graceful torrent destruction on page close
function destroy(torrent) {
  console.log('bound');
  $(window).on('unload', function() {
    torrent.destroy(console.log('torrent object destroyed gracefully'));
    console.log('unloaded()');
    // If no peers and user closes link, delete the entry
    // if (torrent.numPeers === 0 ) {
    //   // send post command
    //   $.post("/remove/" + torrent.hash, function(data) {
    //     console.log('success: ', data);
    //   })
    // }

  });
};

// =============== File Ready Callback =================== //

// Append the torrent to the holder in HTML
// Mostly for video/audio at this point
function appendHolder(torrent) {

  torrent.files.forEach(function(file) {
    // If this is playable media and is not uploading
    if (!isUploading) { mediaInit(file); }
    $('.filename').text(file.name);
    console.log('link locaiton ---------------: ');
    // Download link preperation
    file.getBlobURL(function(error, url) {
      // This seems to only run if it is not playable media :S. Cant get link without it running
      if (error) { console.log('error in getBlobURL. ', error); }
      donePrep(url, torrent.name);
      // console.log('inside getBlobURL');
      // console.log('download link: ' + file.name, url)
      // downloadLink(url, torrent.name); // set the button and makes it not invisible
      // var link = document.location.hostname + document.location.pathname + '/#' + torrent.infoHash;
      // link = link.replace(/\/+/g, '/');

    });
  });
}


function donePrep(url, name) {
  $('.loadAnim').addClass('hide');

  $('.ready-link').attr('href', url );
  $('.ready-link').attr('download', name);;
  $('.ready-link').text(name);

  $('.ready-link').removeClass('hide');
}

// getHash()

// <div class="container">
//       <%- JSON.stringify(currentUser) %>
//       <% include partials/alerts %>
//       <h1>Authentication</h1>
//       <%- body %>
//     </div>

