MOREBTN_SMOOTHSCROLL = {
  ANIMATION_TIME: 800,
  init: function () {
    this.setParameter();
    this.smoothscroll();
  },
  setParameter: function () {
    this.$jscMoreBtn = $('.jscMoreBtn');
    this.$topSection = $('.jscTopSection');
  },
  smoothscroll: function () {
    this.$jscMoreBtn.on('click', $.proxy(function () {
      $('html,body').animate({scrollTop: this.$topSection.outerHeight()}, this.ANIMATION_TIME, 'easeOutExpo');
    },this));
  }
}

$(function () {
  MOREBTN_SMOOTHSCROLL.init();
});