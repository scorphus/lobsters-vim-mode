var stories = document.getElementsByClassName("story");

// main links open in a new tab
Array.prototype.filter.call(stories, function (story) {
  var u_url = story.querySelector(".u-url");
  u_url.target = "_blank";
});

document.addEventListener("keydown", keydown);

// map key to function
function keydown(e) {
  switch (e.code) {
    case "KeyJ": // select next story, if any; otherwise select the first one
    case "KeyK": // select previous story, if any; otherwise select the last one
      moveTarget(e.code);
      break;
    case "KeyH": // hide selected story and select the next one, if any
      targetAction(function (story) {
        story.querySelector(".hider").click();
      });
      moveTarget();
      break;
    case "KeyO": // open the selected story, if any
      targetAction(function (story) {
        story.querySelector(".u-url").click();
      });
      break;
    case "KeyN": // go to next page
    case "KeyB": // go to previous page
      pageNav(e.code);
      break;
    case "KeyR": // reload page
      window.location.reload();
      break;
    case "KeyS": // save (or unsave) story
      targetAction(function (story) {
        story.querySelector(".saver").click();
      });
      break;
    case "KeyM": // open story comments page
      targetAction(function (story) {
        story.querySelector(".comments_label a").click();
      });
      break;
    default:
      break;
  }
}

// select next or previous story, according to `code` — [KeyJ, KeyK]
function moveTarget(code) {
  var fromIndex = Array.prototype.findIndex.call(stories, function (story) {
    return story.classList.contains("target");
  });
  var [toIndex, start, finish] = [fromIndex + 1, 0, stories.length - 1]; // next
  if (code == "KeyK") {
    [toIndex, start, finish] = [fromIndex - 1, stories.length - 1, 0]; // prev
  }
  if (fromIndex < 0) {
    stories[start].classList.add("target");
    return scrollIntoView(stories[start]);
  }
  if (fromIndex == finish) {
    return;
  }
  stories[fromIndex].classList.remove("target");
  stories[toIndex].classList.add("target");
  scrollIntoView(stories[toIndex]);
}

function scrollIntoView(el) {
  switch (scrollDirection(el)) {
    case -1:
      el.scrollIntoView({ behavior: "smooth", block: "end" });
      break;
    case 1:
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      break;
    default:
      break;
  }
}

function scrollDirection(el) {
  var rect = el.getBoundingClientRect();
  if (rect.top < 0) {
    return -1;
  }
  if (
    rect.bottom > (window.innerHeight || document.documentElement.clientHeight)
  ) {
    return 1;
  }
  return 0;
}

// if there's a selected story, run `callback` passing such story element to it
function targetAction(callback) {
  Array.prototype.find.call(stories, function (story) {
    if (story.classList.contains("target")) {
      callback(story);
      return true;
    }
    return false;
  });
}

// go to next or previous page, according to `code` — [KeyN, KeyB]
function pageNav(code) {
  var morelink = document.querySelector(".morelink");
  var next = morelink.children[morelink.childElementCount - 1];
  var prev = null;
  if (morelink.childElementCount == 2) {
    prev = morelink.children[0];
  }
  if (code == "KeyN") {
    next.click();
  } else if (prev) {
    prev.click();
  }
}
