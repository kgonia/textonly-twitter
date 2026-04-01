const $body = $("body");

// Initialize
let setting = {};

chrome.storage.sync.get(
  ["textonly", "grayscaleEmoji", "hideEmoji", "hideProfilePhotos", "hideQuotes", "hideImages", "hideVideos", "mediaSize"],
  function (result) {
    setting.textonly = result.textonly != null ? result.textonly : true;
    setting.grayscaleEmoji =
      result.grayscaleEmoji != null ? result.grayscaleEmoji : true;
    setting.hideEmoji = result.hideEmoji != null ? result.hideEmoji : true;
    setting.hideProfilePhotos =
      result.hideProfilePhotos != null ? result.hideProfilePhotos : false;
    setting.hideQuotes = result.hideQuotes != null ? result.hideQuotes : false;
    setting.hideImages = result.hideImages != null ? result.hideImages : false;
    setting.hideVideos = result.hideVideos != null ? result.hideVideos : true;
    setting.mediaSize = result.mediaSize != null ? result.mediaSize : 100;
    renderAll(setting);
  }
);

// Render
function renderTextonly(textonly) {
  if (textonly) {
    $body.addClass("tt-textonly");
  } else {
    $body.removeClass("tt-textonly");
  }
}

function renderGrayscaleEmoji(grayscaleEmoji) {
  if (grayscaleEmoji) {
    $body.addClass("tt-grayscale-emoji");
  } else {
    $body.removeClass("tt-grayscale-emoji");
  }
}

function renderHideEmoji(hideEmoji) {
  if (hideEmoji) {
    $body.addClass("tt-hide-emoji");
  } else {
    $body.removeClass("tt-hide-emoji");
  }
}

function renderHideProfilePhotos(hideProfilePhotos) {
  if (hideProfilePhotos) {
    $body.addClass("tt-hide-profile-photos");
  } else {
    $body.removeClass("tt-hide-profile-photos");
  }
}

function renderHideQuotes(hideQuotes) {
  if (hideQuotes) {
    $body.addClass("tt-hide-quotes");
  } else {
    $body.removeClass("tt-hide-quotes");
  }
}

function renderHideImages(hideImages) {
  if (hideImages) {
    $body.addClass("tt-hide-images");
  } else {
    $body.removeClass("tt-hide-images");
  }
}

function renderHideVideos(hideVideos) {
  if (hideVideos) {
    $body.addClass("tt-hide-videos");
  } else {
    $body.removeClass("tt-hide-videos");
  }
}

function renderMediaSize(mediaSize) {
  $body.removeClass(
    "tt-media-size-100 tt-media-size-75 tt-media-size-50 tt-media-size-25 tt-media-size-0"
  );
  $body.addClass("tt-media-size-" + mediaSize);
}

function renderAll(setting) {
  renderTextonly(setting.textonly);
  renderGrayscaleEmoji(setting.grayscaleEmoji);
  renderHideEmoji(setting.hideEmoji);
  renderHideProfilePhotos(setting.hideProfilePhotos);
  renderHideQuotes(setting.hideQuotes);
  renderHideImages(setting.hideImages);
  renderHideVideos(setting.hideVideos);
  renderMediaSize(setting.mediaSize);
}

// Listener
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  let message = request.message;
  let setting = request.setting;
  switch (message) {
    case "RENDER_ALL":
      renderAll(setting);
      break;
    case "RENDER_TEXTONLY":
      renderTextonly(setting.textonly);
      break;
    case "RENDER_GRAYSCALE_EMOJI":
      renderGrayscaleEmoji(setting.grayscaleEmoji);
      break;
    case "RENDER_HIDE_EMOJI":
      renderHideEmoji(setting.hideEmoji);
      break;
    case "RENDER_HIDE_PROFILE_PHOTOS":
      renderHideProfilePhotos(setting.hideProfilePhotos);
      break;
    case "RENDER_HIDE_QUOTES":
      renderHideQuotes(setting.hideQuotes);
      break;
    case "RENDER_HIDE_IMAGES":
      renderHideImages(setting.hideImages);
      break;
    case "RENDER_HIDE_VIDEOS":
      renderHideVideos(setting.hideVideos);
      break;
    case "RENDER_MEDIA_SIZE":
      renderMediaSize(setting.mediaSize);
      break;
  }
});
