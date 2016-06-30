// Download a torrent
function download(hash) {
  var client = new WebTorrent();
  var torrent = client.add({
    infoHash: hash,
    announce: TRACKERS
  }, onTorrentDownload);
  initTorrent(torrent); //global.js
}

// ===================== Callbacks ======================= //

// Callback on torrent finish
function onTorrentDownload(torrent) {
  console.log('Downloading ' + torrent.name);
  destroy(torrent);
}
