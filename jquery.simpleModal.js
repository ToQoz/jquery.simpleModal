;(function($) {
  $.fn.simpleModal = function(options) {
    var options = $.extend({}, $.fn.simpleModal.defaults, options),
        autoAddedModalClass = /^[A-z|\-|\_]+$/.test(options.autoAddedModalClass) ?
          options.autoAddedModalClass : $.fn.simpleModal.defaults.autoAddedModalClass,
        $modalWindow = $('#' + options.modalId).addClass(autoAddedModalClass),
        overlay = isValidSelecter(options.overlay) ? options.overlay : $.fn.simpleModal.defaults.overlay,
        autoAddedOverlayClass = 'autoAddedOverlay'
        $overlay = $(overlay).addClass(autoAddedOverlayClass),
        $execButton = $(this)
    $modalWindow.css({
      margin: '0 auto 0 ' + -(+$modalWindow.width()/2) + 'px', 
      width: $modalWindow.width(),
      height: $modalWindow.height(),
      position: 'absolute',
      bottom: '0px',
      left: '50%',
      'background-color': '#CCCCCC',
      'z-index': 11
    })
    $('#' + $execButton.attr('id')).on('click', function(e) {
      if ($('.' + autoAddedOverlayClass).length === 0) $overlay.appendTo('body')
      $overlay.show();
      $modalWindow.show();
      showModal($modalWindow)
    })
    $(document).on('click', function(e) {
      var $target = $(e.target)
      if ($target.attr('id') === $execButton.attr('id') || $target.hasClass(autoAddedModalClass)) return;
      $overlay.hide();
      hideModal($modalWindow)
    })
  }
  // Default Options
  $.fn.simpleModal.defaults = {
      modalId: 'modal',
      marginTop: 30,
      autoAddedModalClass: 'AutoAddedModal',
      overlay: '<div style="width: 100%; height: 100%; position: absolute; top: 0; left: 0; -webkit-opacity: 0.8; -moz-opacity: 0.8; opacity: 0.8; background-color: #000000; z-index: 10;"></div>'
  }
  // Internal
  function showModal($target) {
    var movable = +$(window).height() - 200,
        marginTop = 20,
        move = movable - marginTop;
    $target.show(0, function() {
      $target.css({
        '-moz-transition': 'all 0.5s',
        '-webkit-transition': 'all 0.5s',
        'transition': 'all 0.5s',
        '-moz-transform': 'translateY('+ -move +'px)',
        '-webkit-transform': 'translateY('+ -move +'px)',
        'transform': 'translateY('+ -move +'px)'
      })
    });
  }
  function hideModal($target) {
    $target.hide(0, function() {
      $target.css('-moz-transform', '')
      $target.css('-webkit-transform', '')
      $target.css('transform', '')
    });
    
  }
  function isValidSelecter(selector) {
    if (typeof selector !== 'string') return false
    return (/^\s*<.*>$/.test(selector) || /^[\.|#][A-z|\-|\_]+$/.test(selector))
  }
}(jQuery));
