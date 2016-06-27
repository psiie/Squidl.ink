// Seed a file (specifically for starting a torrent)
// (Finishing a download automatically seeds)
function seed(file) {
  console.log(file);
  var client = new WebTorrent();
  var torrent = client.seed(file, {
    announce: TRACKERS
  }, onTorrentSeed);
  initTorrent(torrent);
}

// Callback for when torrent is seeding
function onTorrentSeed(torrent) {
  var idHash;
  // Make a post to addOrCreate and return the hash(id) for sharing
  $.post('/new/' + torrent.infoHash, {}, function(returned) {
    console.log('got back the post, ', returned);
    idHash = returned.id;
    $('.share-link').text(idHash);
    history.pushState('data', '', '/' + idHash);
    $('.before-box').addClass('hide');
  });

  console.log('Seeding ' + torrent.name);
  console.log('Hash: ' + torrent.infoHash);
  console.log('peerNum: ' + torrent.numPeers);
  // var link = document.location.hostname + document.location.pathname + '/#' + torrent.infoHash
  // console.log('THE LINK: ' + link);
  destroy(torrent);
}

// Append the torrent to the holder in HTML
// Mostly for video/audio at this point
function appendHolder(torrent) {

  torrent.files.forEach(function(file) {
    // If this is playable media and is not uploading
    if (!isUploading) {
      mediaInit(file);
    }

    // This seems to only run if it is not playable media :S. Cant get link without it running
    // Download link preperation
    file.getBlobURL(function(error, url) {
      if (error) { console.log('error in getBlobURL. ', error); }
      // console.log('inside getBlobURL');
      // console.log('download link: ' + file.name, url)
      downloadLink(url, torrent.name); // set the button and makes it not invisible
      var link = document.location.hostname + document.location.pathname + '/#' + torrent.infoHash;
      link = link.replace(/\/+/g, '/');

    });
  });
}
