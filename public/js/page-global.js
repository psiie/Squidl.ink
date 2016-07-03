// Stats variable counters (resets every PUT into the server)
var uploaded = 0;
var downloaded = 0;
var uploadedDiff = 0;
var downloadedDiff = 0;
var secondsTillPut = -1;
var timerPUT = setInterval(function() {
  // eventually manage timer to only run when needed
  // We hold the timer with -1 so the putStat func doesnt run when we arnt using it
  if (secondsTillPut > 0) {
    secondsTillPut -= 1;
  }
  if (secondsTillPut === 0) {
    console.log('sent a put of: ', uploaded, downloaded, 0);
    putStat(uploaded, downloaded, 0);
    uploaded = 0;
    downloaded = 0;
    secondsTillPut = -1;
  }
  console.log("stp: ", secondsTillPut);
}, 1000);



// Document Ready
$(document).ready(function(){
  $(document).foundation(); // Foundation init according to documentation
  var clipboard = new Clipboard('.btn-copy'); // Sets up copy button

  // Misc buttons
  // =================================== //

  // Copy to clipboard
  $('.btn-copy').click(function() {
    if ( !$('.btn-copy').hasClass('success') ) {
      $('.btn-copy').addClass('success');
    }
  })

  // Am I still using this??
  $('.btn-watch-media').click(function() {
    $('.after-box-media').removeClass('hide');
  });

  // Profile page buttons
  $('.prof-open').click(function() {
    location.href = '/' + $('.mylinks').find(":selected").text();
  });

  $('.prof-delete').click(function() {
    $.ajax({
      url: '/auth/delete/' + $('.mylinks').find(":selected").text(),
      type: 'DELETE',
      content: false,
      success: function(){
        console.log('sent stats update successfully');
      }
    });
    $('.mylinks').find(":selected").text('Deleted');
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
      // console.log(slideDisabled);
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
    // console.log('dragover');
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
    // console.log('dragleave');
    return false
  })
  $('.container').on('drop', '.before-box', function(e) {
    e.preventDefault();
    e.stopPropagation();

    $('.small-12').addClass('hide');
    $('.before-box').addClass('hide');
    $('.index-spinner').removeClass('hide');

    this.id = '';
    isUploading = true;
    // remove dragging class
    if ( $('.box').hasClass('dragging') ) {
      $('.box').removeClass('dragging');
    };
    var file = e.originalEvent.dataTransfer.files[0];
    if (file.size > 1000000000) {
      swal({
        title: "File Larger Than 1GB",
        text: "Due to limitations in certain web browsers, the recipient may not be able to download the file to the HDD. <br><br>Using <b>Firefox</b> for downloading is recommended.",
        type: "warning",
        html: true
      });
    }

    // Add check to only run this if logged in
    putStat(0,0,1); // Update the user profile for uploading a new file
    seed(file); // wt-upload.js
  })
});

// ================== Stats Update ==================== //


function updateStats(progress, upload, download, peers, uploaded, downloaded, ratio, timeRemaining) {
  // $('.percent').text(Math.floor(progress*100) + '% Done');
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

// Ajax stats
// =================================== //

function putStat(dl, ul, isNew) {
  // All three parameters are integers even though new is a boolean conceptually
  isNew > 1 ? isNew = 1 : false; // Protection for over-adding
  // Somehow, this is making a second AJAX call to /auth/login and returning a 404
  // Remove the ajax call and the error (in console) goes away.
  $.ajax({
    url: '/stats/' + dl + '/' + ul + '/' + isNew,
    type: 'PUT',
    success: function(){ console.log('sent stats update successfully');}
  });
}
