$(function () {
  // Initialize
  let setting = {};
  const $textonlyInput = $('#textonly-input');
  const $grayscaleEmojiInput = $('#grayscale-emoji-input');
  const $hideEmojiInput = $('#hide-emoji-input');
  const $hideProfilePhotosInput = $('#hide-profile-photos-input');
  const $mediaSizeSelect = $('#media-size-select');
  const $whitebox = $(".whitebox");

  function sendToActiveTab(message) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (!tabs.length || tabs[0].id == null) {
        return;
      }
      chrome.tabs.sendMessage(tabs[0].id, {
        message: message,
        setting: setting,
      });
    });
  }

  chrome.storage.sync.get(['textonly', 'grayscaleEmoji', 'hideEmoji', 'hideProfilePhotos', 'mediaSize'], function (result) {
    setting.textonly = result.textonly != null ? result.textonly : true;
    setting.grayscaleEmoji = result.grayscaleEmoji != null ? result.grayscaleEmoji : true;
    setting.hideEmoji = result.hideEmoji != null ? result.hideEmoji : true;
    setting.hideProfilePhotos = result.hideProfilePhotos != null ? result.hideProfilePhotos : false;
    setting.mediaSize = result.mediaSize != null ? result.mediaSize : 100;

    setting.textonly ? $whitebox.hide() : $whitebox.show();
    $textonlyInput.prop('checked', setting.textonly);
    $grayscaleEmojiInput.prop('checked', setting.grayscaleEmoji);
    $hideEmojiInput.prop('checked', setting.hideEmoji);
    $hideProfilePhotosInput.prop('checked', setting.hideProfilePhotos);
    $mediaSizeSelect.val(setting.mediaSize);
  });

  // Setting change listener
  $textonlyInput.on('change', function () {
    setting.textonly = this.checked ? true : false;
    setting.textonly ? $whitebox.hide() : $whitebox.show();
    chrome.storage.sync.set({ textonly: setting.textonly }, function () {
      sendToActiveTab('RENDER_TEXTONLY');
    });
  });
  $grayscaleEmojiInput.on('change', function () {
    setting.grayscaleEmoji = this.checked ? true : false;
    chrome.storage.sync.set({ grayscaleEmoji: setting.grayscaleEmoji }, function () {
      sendToActiveTab('RENDER_GRAYSCALE_EMOJI');
    });
  });
  $hideEmojiInput.on('change', function () {
    setting.hideEmoji = this.checked ? true : false;
    chrome.storage.sync.set({ hideEmoji: setting.hideEmoji }, function () {
      sendToActiveTab('RENDER_HIDE_EMOJI');
    });
  });
  $hideProfilePhotosInput.on('change', function () {
    setting.hideProfilePhotos = this.checked ? true : false;
    chrome.storage.sync.set({ hideProfilePhotos: setting.hideProfilePhotos }, function () {
      sendToActiveTab('RENDER_HIDE_PROFILE_PHOTOS');
    });
  });
  $mediaSizeSelect.on('change', function () {
    setting.mediaSize = $(this).val();
    chrome.storage.sync.set({ mediaSize: setting.mediaSize }, function () {
      sendToActiveTab('RENDER_MEDIA_SIZE');
    });
  });
});