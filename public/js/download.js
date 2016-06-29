function mediaInit(file) {
  // Check if the extension is mp4, m4v, m4a, mkv, mp3
  // Only run if the extension IS. This will place the video player in
  // but not anything else [as raw text]
  if ( mediaFormats.indexOf(getExtension(file.name)) !== -1 ) {

    $('.before-box').addClass('hide');
    $('.after-box-downloading').addClass('hide');
    $('.after-box-media').removeClass('hide');

    file.appendTo('.after-box-media', function(error) {
      console.log('inside appendTo()');
      // If it is not a video, error == true.
      if (error) { console.log('error in appendHolder(). Must not be playable media'); }
    });
  }
}

// ===================================================== //

// Download a torrent
function download(hash) {
  var client = new WebTorrent();
  var torrent = client.add({
    infoHash: hash,
    announce: TRACKERS
  }, onTorrentDownload);
  initTorrent(torrent);
}

// ===================== Callbacks ======================= //

// Callback on torrent finish
function onTorrentDownload(torrent) {
  console.log('Downloading ' + torrent.name);
  destroy(torrent);
}
