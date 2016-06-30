// Seed a file (specifically for starting a torrent)
// (Finishing a download automatically seeds)
function seed(file) {
  console.log(file);
  var client = new WebTorrent();
  var torrent = client.seed(file, {
    announce: TRACKERS
  }, onTorrentSeed);
  initTorrent(torrent); // wt-global.js
}

// Callback for when torrent is seeding
function onTorrentSeed(torrent) {
  var idHash;
  // Make a post to addOrCreate and return the hash(id) for sharing
  $.post('/new/' + torrent.infoHash, {}, function(returned) {
    console.log('got back the post, ', returned);
    idHash = returned.id;
    // $('.share-link').text(idHash);
    $('.share-link').attr('value', 'http://squidl.ink/' + idHash)
    history.pushState('data', '', '/' + idHash);
    $('.before-box').addClass('hide');
    if (isUploading) {
      $('.after-box-uploading').removeClass('hide');
      $('.index-spinner').addClass('hide');
    }
  });

  console.log('Seeding ' + torrent.name);
  console.log('Hash: ' + torrent.infoHash);
  console.log('peerNum: ' + torrent.numPeers);
  // var link = document.location.hostname + document.location.pathname + '/#' + torrent.infoHash
  // console.log('THE LINK: ' + link);
  destroy(torrent);
}


