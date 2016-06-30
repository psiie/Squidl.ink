// Document Ready
$(document).ready(function(){
  $(document).foundation(); // Foundation init according to documentation
  var clipboard = new Clipboard('.btn-copy'); // Sets up copy button

  // Copy to clipboard
  $('.btn-copy').click(function() {
    if ( !$('.btn-copy').hasClass('success') ) {
      $('.btn-copy').addClass('success');
    }
  })

  // Test button. Delete upon release
  $('.btn-test').click(function(){
    console.log('clicked!');
    $.post('/stats/1/1/1', function(){
      console.log('success');
    })
  });

  $('.btn-watch-media').click(function() {
    $('.after-box-media').removeClass('hide');
  });


  // Animations & Sizing
  // =================================== //

  // Main Page
  $('.hover').slideUp('fast'); // Start of frame [once] animation

  var isSliding = false;
  var slideDisabled = false;
  $(window).resize(function() {
    if ( $(window).width() < 640 && slideDisabled === false ) {
      slideDisabled = true;
      console.log(slideDisabled);
      $('.hover').slideDown('slow');
      $('.hover-inverse').slideUp('slow');

    } else if ( $(window).width() >= 640 && slideDisabled === true ) {
      slideDisabled = false;
      $('.hover').slideUp('slow');
      $('.hover-inverse').slideDown('slow');
    }
  });

  $('.hover-parent').on('mouseenter', function() {
    if (!isSliding && slideDisabled === false) {
      isSliding = true;
      $('.hover').slideDown('slow');
      $('.hover-inverse').slideUp('slow', function() {
        isSliding = false;
      });
    }
  })
  $('.hover-parent').on('mouseleave', function() {
    if (!isSliding && slideDisabled === false) {
      isSliding = true;
      $('.hover').slideUp('slow');
      $('.hover-inverse').slideDown('slow', function() {
        isSliding = false;
      });
    }
  })



  // Drag and drop events
  // =================================== //
  $('.container').on('dragover', '.before-box', function(e) {
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
  $('.container').on('dragleave', '.before-box', function(e) {
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
  $('.container').on('drop', '.before-box', function(e) {
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


