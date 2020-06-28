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

jQuery(document).on('click', '[data-toggle="lightbox"]', function (event) {
  event.preventDefault();
  jQuery(this).ekkoLightbox({ alwaysShowClose: true });
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
});
