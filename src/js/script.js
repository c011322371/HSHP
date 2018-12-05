var HSHP = HSHP || {};

HSHP.MODAL_MANAGER = {
  init: function () {
    this.setParameter();
    this.bindEvent();
  },
  setParameter: function () {
    this.$modalWrap = $('.jscModal');
    this.$closeTrigger = $('.jscModalClose');
    this.$next = $('.jscModalNext');
    this.$prev = $('.jscModalPrev');
    this.$modalItem = $('.jscModalItem');

    this.$modalImage = $('.jscModalImage');
    this.$modalTitle = $('.jscModalTitle');
    this.$modalDate = $('.jscModalDate');
    this.$modalDescription = $('.jscModalDescription');
  },
  bindEvent: function () {
    this.$closeTrigger.on('click', $.proxy(this.closeModal, this));
    this.$modalItem.on('click', $.proxy(this.openModal, this));
    this.$next.on('click', $.proxy(function () {
      this.setItem('next');
    }, this));
    this.$prev.on('click', $.proxy(function () {
      this.setItem('prev');
    }, this));
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
    this.$modalTitle.text(data.title);
    this.$modalDate.text(data.date);
    this.$modalDescription.text(data.description);
  },
  setItem: function (trigger) {
    if (trigger === 'next') {
      this.$currentItem = this.$currentItem.next().length ? this.$currentItem.next() : $('.jscModalItem:first-child');
    } else if (trigger === 'prev') {
      this.$currentItem = this.$currentItem.prev().length ? this.$currentItem.prev() : $('.jscModalItem:last-child');
    }
    this.setData();
  }
}

$(function () {
  HSHP.MODAL_MANAGER.init();
});