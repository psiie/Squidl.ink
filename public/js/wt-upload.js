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
  var largeFile;
  isOver1GB ? largeFile = '1' : largeFile = '0';
  // Make a post to addOrCreate and return the hash(id) for sharing
  $.post('/new/' + largeFile + '/' + torrent.infoHash, {}, function(returned) {
    console.log('got back the post, ', returned);

    // If the file is over 1GB, construct the URL differently
    // The /f/:hash route will inform the user of the limitations
    // isOver1GB ? idHash = returned.id : idHash = 'f/' + returned.id;

    idHash = returned.id;

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


