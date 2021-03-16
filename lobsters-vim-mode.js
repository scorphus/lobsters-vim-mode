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
      targetNext();
      break;
    case "KeyK": // select previous story, if any; otherwise select the last one
      targetPrev();
      break;
    case "KeyH": // hide selected story and select the next one, if any
      targetAction(function (story) {
        story.querySelector(".hider").click();
      });
      targetNext();
      break;
    case "KeyO": // open the selected story, if any
      targetAction(function (story) {
        story.querySelector(".u-url").click();
      });
      break;
    case "KeyN": // got to next page
    case "KeyB": // got to previous page
      pageNav(e.code);
      break;
    case "KeyR": // reload page
      window.location.reload();
      break;
    default:
      break;
  }
}

function targetNext() {
  var targetIndex = Array.prototype.findIndex.call(stories, function (story) {
    return story.classList.contains("target");
  });
  if (targetIndex < 0) {
    stories[0].classList.add("target");
    scrollIntoView(stories[0]);
    return;
  }
  if (targetIndex == stories.length - 1) {
    return;
  }
  stories[targetIndex].classList.remove("target");
  stories[targetIndex + 1].classList.add("target");
  scrollIntoView(stories[targetIndex + 1]);
}

function targetPrev() {
  var targetIndex = Array.prototype.findIndex.call(stories, function (story) {
    return story.classList.contains("target");
  });
  if (targetIndex < 0) {
    stories[stories.length - 1].classList.add("target");
    scrollIntoView(stories[stories.length - 1]);
    return;
  }
  if (targetIndex == 0) {
    return;
  }
  stories[targetIndex].classList.remove("target");
  stories[targetIndex - 1].classList.add("target");
  scrollIntoView(stories[targetIndex - 1]);
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

function targetAction(callback) {
  Array.prototype.find.call(stories, function (story) {
    if (story.classList.contains("target")) {
      callback(story);
      return true;
    }
    return false;
  });
}

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