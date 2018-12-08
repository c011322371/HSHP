var HSHP = HSHP || {};

HSHP.MODAL_MANAGER = function ($modalGroup) {
  this.$modalGroup = $modalGroup;
  this.init();
};

HSHP.MODAL_MANAGER.prototype = {
  TIMER: 250,
  init: function () {
    this.setParameter();
    this.bindEvent();
  },
  setParameter: function () {
    this.$modalItem = this.$modalGroup.find('.jscModalItem');
    this.$modalWrap = $('.jscModal');
    this.$closeTrigger = $('.jscModalClose');
    this.$next = $('.jscModalNext');
    this.$prev = $('.jscModalPrev');

    this.$modalImage = $('.jscModalImage');
    this.$modalTitle = $('.jscModalTitle');
    this.$modalDate = $('.jscModalDate');
    this.$modalDescription = $('.jscModalDescription');
    this.$currentNum = $('.jscCurrentNum');
    this.$itemLength = $('.jscItemLength');
    this.$modalInfoContents = $('.jscModalMainContents');
  },
  bindEvent: function () {
    this.$closeTrigger.on('click', $.proxy(this.closeModal, this));
    this.$modalItem.on('click', $.proxy(this.openModal, this));
  },
  closeModal: function () {
    this.$modalWrap.css({
      'display': 'none'
    });
  },
  openModal: function (event) {
    this.$currentItem = $(event.currentTarget);
    this.$modalWrap.css({
      'display': 'block'
    });
    this.setData();
    // this.$next[0].addEventListener('click', this.setItem.bind(this, 'next'), false);
    // this.$prev[0].addEventListener('click', this.setItem.bind(this, 'prev'), false);
    this.$next.off('click', $.proxy(this.setItem, this, 'next'));
    this.$prev.off('click', $.proxy(this.setItem, this, 'prev'));
    this.$next.on('click', $.proxy(this.setItem, this, 'next'));
    this.$prev.on('click', $.proxy(this.setItem, this, 'prev'));
  },
  setData: function () {
    var data = {
      "image": this.$currentItem.find('[data-modal="image"]').find('img'),
      "title": this.$currentItem.find('[data-modal="title"]').text(),
      "date": this.$currentItem.find('[data-modal="date"]').text(),
      "description": this.$currentItem.find('[data-modal="description"]').text()
    };

    this.$modalImage.css({
      'background-image': 'url("' + data.image.attr('src') + '")'
    });
    this.$currentNum.text(this.$currentItem.index() + 1);
    this.$itemLength.text(this.$modalItem.length);
    this.$modalTitle.text(data.title);
    this.$modalDate.text(data.date);
    this.$modalDescription.text(data.description);
  },
  setItem: function (trigger) {
    if (this.$modalInfoContents.is(':animated')) {
      return;
    }

    this.$modalInfoContents.fadeOut(this.TIMER, function () {
      if (trigger === 'next') {
        this.$currentItem = this.$currentItem.next().length ? this.$currentItem.next() : this.$modalGroup.find('.jscModalItem:first-child');
      } else if (trigger === 'prev') {
        this.$currentItem = this.$currentItem.prev().length ? this.$currentItem.prev() : this.$modalGroup.find('.jscModalItem:last-child');
      }
      this.setData();
    }.bind(this));
    setTimeout(function () {
      this.$modalInfoContents.fadeIn(this.TIMER);
    }.bind(this), this.TIMER);
  }
}

HSHP.KV_SCROLL_INTERACTION = {
  init: function () {
    this.setParameter();
    this.scrollEvent();
  },
  setParameter: function () {
    this.$window = $(window);
    this.$kv = $('.jscKV');
  },
  scrollEvent: function () {
    var self = this;
    var kvHeight = this.$kv.outerHeight();
    this.$window.on('scroll', function () {
      var scrollTop = $(this).scrollTop();
      if (kvHeight >= scrollTop) {
        self.$kv.css({
          'background-position': '50% calc(50% + ' + scrollTop + 'px)'
        });
      }
    });
  }
}

$(function () {
  $('.jscModalGroup').each(function () {
    new HSHP.MODAL_MANAGER($(this));
  });
  HSHP.KV_SCROLL_INTERACTION.init();
});