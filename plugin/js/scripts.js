/* global jQuery */

// ================================================================
// GALLERY
// ----------------------------------------------------------------

var AmpEvent = {};

AmpEvent.showPhoto = function (url) {
  jQuery('.amp-shade').show();
  jQuery('.amp-lightbox').css('background-image', 'url(' + url + ')').show();
};

AmpEvent.hidePhoto = function (url) {
  jQuery('.amp-lightbox').hide().css('background-image', 'none');
  jQuery('.amp-shade').hide();
};

AmpEvent.closeLightbox = function () {
  jQuery('.lightbox-wrapper').remove();
  jQuery("body").removeClass("lightbox-visible");
};

AmpEvent.getImageInfo = function (index) {
  var images = jQuery('[data-toggle="lightbox"]');
  return {
    index: index,
    prevIndex: index === 0 ? images.length - 1 : index - 1,
    nextIndex: index === images.length - 1 ? 0 : index + 1,
    lightboxUrl: images.get(index).getAttribute('href').split(/[?#]/)[0] + '?w=1024&ssl=1', // limit width
    count: images.length
  };
}

AmpEvent.loadImage = function (index) {
  var imageInfo = AmpEvent.getImageInfo(index);
  jQuery(".lightbox-prev").attr({
    'onclick': 'AmpEvent.loadImage(' + imageInfo.prevIndex + ')'
  });
  jQuery(".lightbox-next").attr({
    'onclick': 'AmpEvent.loadImage(' + imageInfo.nextIndex + ')'
  });
  jQuery(".lightbox-inner").attr({
    'src': imageInfo.lightboxUrl
  });
};

jQuery(document).on('click', '[data-toggle="lightbox"]', function (event) {
  event.preventDefault();
  var index = jQuery(this).index();
  var imageInfo = AmpEvent.getImageInfo(index);
  var pageInfo = (imageInfo.count > 1) ? (index + 1) + ' / ' + imageInfo.count : '';
  var html = '<div class="lightbox-wrapper" xonclick="AmpEvent.closeLightbox()">';
  html += '<div class="lightbox-top-left>' + pageInfo + '</div>'
  html += '<div class="lightbox-top-right" onclick="AmpEvent.closeLightbox()"><i class="fas fa-times"></i></div>'
  html += '<div class="lightbox-prev" onclick="AmpEvent.loadImage(' + imageInfo.prevIndex + ')"><div>&lsaquo;</div></div>'
  html += '<div class="lightbox-next" onclick="AmpEvent.loadImage(' + imageInfo.nextIndex + ')"><div>&rsaquo;</div></div>'
  html += '<img class="lightbox-inner" src="' + imageInfo.lightboxUrl + '" />';
  html += '</div>';
  jQuery("body").prepend(html);
  jQuery("body").addClass("lightbox-visible");
});

// ================================================================
// Production / People Search
// ----------------------------------------------------------------

function ampSearch (inputId, ulId) {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById(inputId);
  filter = input.value.toUpperCase();
  ul = document.getElementById(ulId);
  li = ul.getElementsByTagName('li');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName('a')[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = '';
    } else {
      li[i].style.display = 'none';
    }
  }
}

function ampSearchProductions () {
  ampSearch('ampSearchProductionsInput', 'ampProductionsList');
}

function ampSearchPeople () {
  ampSearch('ampSearchPeopleInput', 'ampPeopleList');
}

jQuery(document).ready(function () {
  if (jQuery('#ampSearchProductionsInput').val()) {
    ampSearchProductions();
  }
  if (jQuery('#ampSearchPeopleInput').val()) {
    ampSearchPeople();
  }

  /* THEME */
  var siteHeader = document.getElementById('site-header');
  var covidDiv = document.createElement('div');
  covidDiv.innerHTML = '<a href="https://www.ameliamusicalplayhouse.com/covid-19-update/">Important COVID-19 Information</a> &#8250;';
  covidDiv.className = 'covid-banner';
  siteHeader.parentNode.insertBefore(covidDiv, siteHeader);
});
