//uploaded on 27th Sept
const borderCss = {
  borderColor: "#345791",
  borderStyle: "solid",
  borderWidth: "2px",
  borderRadius: "6px",
};
const borderVoice = {
  borderColor: "#345791",
  borderStyle: "solid",
  borderWidth: "2px",
};
const redBorderCss = {
  borderColor: "red",
  borderStyle: "solid",
  borderWidth: "2px",
};
const voiceActorPair = {
  Alex: "Jeremy",
  Linda: "Alana",
  Syrine: "Nicole",
  Isabel: "Jenny",
};
var submitted = false;
var stateChanged = false;
var previewDisabled = true;
var scriptLengthOk = false;
var defaultBackground =
  "url(https://assets-global.website-files.com/603a1632f3d4a6c0f66872b9/607d6b85eba5a8278fce538a_office-background-FHD.png)";
var VL = {};
var backgroundClass = " ";
var newClass;
var fV = {
  actor: "Alex",
  position: "Centre",
  previewImgSrc:
    "https://assets-global.website-files.com/603a1632f3d4a6c0f66872b9/6082b99fff1618b81cc1b433_khamal-p-500.png",
  link: "https://storage.googleapis.com/yepicai-backend.appspot.com/regularBackgrounds/office-background-FHD.png",
  background: "office-background-FHD.png",
};

function cleanUpMultiLanguageSelectionBasedOnActorGender() {
  console.log("Cleanup multilanguage");
}

function pairActorVoice() {
  fV.voice = voiceActorPair[fV.actor];
  $("[data-voice]").css({ borderColor: "transparent" });
  $("[data-voice=" + fV.voice + "]").css(borderVoice);
}

function selectImages() {
  $(".preview-img-wrap").css("opacity", 1);
  $("[data-actor='Alex']").css(borderCss);
  $($(".actor-pos-mid")).css(borderCss);
  $("[data-background='office-background-FHD.png']").css(borderCss);
  $($(".preview-img-wrap").children("img")[0]).attr("src", fV.previewImgSrc);
  $($($(".preview-bg")[0])[0]).css({
    backgroundImage: defaultBackground,
    opacity: 1,
  });
}

function startUpSelection() {
  pairActorVoice();
  selectImages();
}

setTimeout(startUpSelection, 1000);

function checkListenPreview() {
  if (scriptLengthOk && fV.voice != 0) {
    previewDisabled = false;
    $("#previewPlayBtn").css({ opacity: 1 });
    $("#tooltip").css("opacity", 0);
  }
}

function previewCustomUpload() {
  fV.background = "custom";
  var newSrc = $("#customBackground").children("img").attr("src");
  var newURL = "url(" + fV.link + ")";
  newClass = "custom-background";
  $("#background-selection #background-select").css({
    borderColor: "transparent",
  });
  $($(this)).css(borderCss);
  var previewBg = $($($(".preview-bg")[0])[0]);
  previewBg.removeClass(backgroundClass);
  previewBg.addClass(newClass);
  previewBg.css({ backgroundImage: newURL, opacity: 1 });
  backgroundClass = newClass;
}

MemberStack.onReady.then(function (member) {
  fV.email = member["email"];
  fV.name = member["name"];
  fV.id = member["id"];
  fV.membershipTypeId = $memberstack.membership.status;
});

$(".form-actor-select-wrap").on("click", ".form-actor", function () {
  fV.videoName = $("#video-name").val();
  fV.actor = $(this).attr("data-actor");
  fV.previewImgSrc = $(this).children("img").attr("src");
  pairActorVoice();
  $(".form-actor-select-wrap").css({ borderColor: "transparent" });
  $(this).css({ borderColor: "transparent" });
  $(".form-actor-select-wrap .form-actor").css({ borderColor: "transparent" });
  $($(this)).css(borderCss);
  $($(".preview-img-wrap").children("img")[0]).attr("srcset", "");
  $($(".preview-img-wrap").children("img")[0])
    .attr("src", fV.previewImgSrc)
    .load();
  
  cleanUpMultiLanguageSelectionBasedOnActorGender();
});

$(".form-tab-voice-wrap").on("click", ".form-voice", function () {
  if (!$(this).hasClass("form-voice-unavail")) {
    fV.voice = $(this).attr("data-voice");
    $(".form-tab-voice-wrap").css({ borderColor: "transparent" });
    $(".form-tab-voice-wrap .form-voice").css({ borderColor: "transparent" });
    $("#customAudio").css({ borderColor: "transparent" });
    $("#customAudio");
    $($(this)).css(borderVoice);
    fV.videoName = $("#video-name").val();
    checkListenPreview();
  }
});

$("#customAudio").on("click", function () {
  if (!$(this).hasClass("form-voice-unavail")) {
    fV.voice = "custom";
    $(".form-tab-voice-wrap").css({ borderColor: "transparent" });
    $(".form-tab-voice-wrap .form-voice").css({ borderColor: "transparent" });
    $("#customAudio").css(borderVoice);
    fV.videoName = $("#video-name").val();
    checkListenPreview();
  }
});

$("#background-selection").on("click", "#background-select", function () {
  fV.background = "non-custom";
  fV.link = $(this).attr("data-background");
  $("#background-selection #background-select").css({
    borderColor: "transparent",
  });
  $("#customBackground").css({ borderColor: "transparent" });
  $(".form-tab-bg-wrap").css({ borderColor: "transparent" });
  $($(this)).css(borderCss);
  newClass = $(this).attr("class");
  newClassCss = "." + newClass.split(" ")[1];
  var backgroundImageCss = $(newClassCss).css("background-image");
  $($($(".preview-bg")[0])[0]).removeClass(backgroundClass);
  $($($(".preview-bg")[0])[0]).addClass(newClass);
  $($($(".preview-bg")[0])[0]).css("background-image", backgroundImageCss);
  backgroundClass = newClass;
});
$("#background-selection2").on("click", "#customBackground", function () {
  previewCustomUpload();
});
function send_request() {
  var formErrors = false;
  fV.script = $("#video-script").val();
  fV.videoName = $("#video-name").val();
  fV.size = $("#size").val();
  if (fV.videoName.length < 1) {
    formErrors = true;
    $(".form-name-wrap").css(redBorderCss);
  }
  if (fV.script.length < 3 && fV.voice != "custom" && fV.audioLink != "") {
    formErrors = true;
    $("#video-script").css(redBorderCss);
  }
  if (!fV.actor) {
    formErrors = true;
    $(".form-actor-select-wrap").css(redBorderCss);
  }
  if (!fV.background) {
    formErrors = true;
    $(".form-tab-bg-wrap").css(redBorderCss);
  }
  if (fV.voice == 0) {
    formErrors = true;
    $(".form-tab-voice-wrap").css(redBorderCss);
  }
  if (fV.position == 0) {
    $(".form-flex-horiz").css(redBorderCss);
  }
  if (!formErrors && !submitted) {
    if (fV.background == "custom" && fV.link == 0) {
      setTimeout(send_r, 2000);
    } else {
      send_r();
    }
    return false;
  }
}

var prod = "nee3p8cy62in3ph68ckd42wjnopkrove";
var stagin = "7kl8v392xfycx5qms9vy4d05csufq6ry";
function send_r() {
  submitted = true;

  $.ajax({
    url: "https://hook.integromat.com/" + prod,
    type: "POST",
    data: fV,
    success: function (res) {
      $(".w-form-done").show();
      $(".form-wrap-inner").hide();
    },
    error: function (err) {
      submitted = false;
      $(".w-form-fail").show();
    },
  });
}

function send_preview_request() {
  $.ajax({
    url: "https://hook.integromat.com/" + prod,
    type: "POST",
    data: fV,
    success: function (res) {
      $(".w-form-done").show();
      $(".form-wrap-inner").hide();
    },
    error: function (err) {
      submitted = false;
      $(".w-form-fail").show();
    },
  });
}

// remove red background

$(".form-name-wrap").keyup(function () {
  $(this).css({ borderColor: "transparent" });
});

// TEXT COUNTER
$("#video-script").keyup(function () {
  $("#video-script").css({ borderColor: "transparent" });
  textCounter("video-script", "counter", 1000);
});
function textCounter(field, field2, maxlimit) {
  var textField = document.getElementById(field);
  var countfield = document.getElementById(field2);
  if (textField.value.length > maxlimit) {
    textField.value = textField.value.substring(0, maxlimit);
    return false;
  } else {
    countfield.value = maxlimit - textField.value.length;
    if (textField.value.length > 0 && !scriptLengthOk) {
      scriptLengthOk = true;
    } else if (textField.value.length <= 0 && scriptLengthOk) {
      // $("#previewPlayBtn").prop('disabled', true);
      previewDisabled == true;
      $("#previewPlayBtn").css({ opacity: 0.5 });
      scriptLengthOk = false;
      $("#tooltip").css("opacity", 1);
    }
    checkListenPreview();
  }
}

// IMAGE UPLOAD
var imageFileName;
var imageFile;
var req;
const fileSelect = document.getElementById("fileSelect"),
  fileElem = document.getElementById("fileElem"),
  fileList = document.getElementById("fileList");
fileSelect.addEventListener(
  "click",
  function (e) {
    if (fileElem) {
      fileElem.click();
    }
    e.preventDefault();
  },
  false
);
fileElem.addEventListener("change", handleFiles, false);

function handleFiles() {
  if (!this.files.length) {
    fileList.innerHTML = "<p>No files selected!</p>";
  } else {
    $("#uploadedImg").show();
    $("#deleteBackground").show();
    const img = document.getElementById("uploadedImg");
    img.style.display = "";
    imageFile = this.files[0];
    imageFileName = this.files[1];
    img.src = URL.createObjectURL(this.files[0]);
    const customImage = document.getElementById("customBackground");
    customImage.style.display = "inline-grid";
    img.style.display = "inline-grid";
    img.style.width = "120px";
    img.style.height = "96px";
    img.onload = function () {
      URL.revokeObjectURL(this.src);
      fV.background = "custom";
      $(".form-tab-bg-wrap").css({ borderColor: "transparent" });
      $("#customBackground").css(borderCss);

      uploadImage();
      if (fV.link == 0) {
        setTimeout(previewCustomUpload, 1000);
      } else {
        previewCustomUpload();
      }
    };
  }
}

function uuid() {
  return (
    "file-" +
    "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx.".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    })
  );
}

async function uploadImage() {
  var fileName = uuid() + imageFile.name.split(".").pop();
  $.ajax({
    url:
      "https://storage.googleapis.com/upload/storage/v1/b/yepicai-backend.appspot.com/o?uploadType=media&name=" +
      fileName,
    type: "POST",
    data: imageFile,
    processData: false,
    headers: {
      "Content-Type": imageFile.type,
    },
    success: function (data) {
      fV.uploadFilename = fileName;
      fV.link = data.mediaLink;
    },
    error: function () {
      alert("Something went wrong, try again!");
    },
  });
}

var playerPaused = true;
$(".form-tab-voice-wrap").on(
  "click",
  ".form-voice .form-voice-sample",
  function () {
    const formVoiceIcon = $(this).children("div");
    var audioSrc = $(this).attr("data-src");
    var pauseSymbol =
      "url(https://assets-global.website-files.com/603a1632f3d4a6c0f66872b9/6080782b0edbdbe9c0e96234_pause.svg)";
    var playSymbol =
      "url(https://assets-global.website-files.com/603a1632f3d4a6c0f66872b9/60815d642f83b515282a9b1b_play.svg)";
    const _player = document.getElementById("audioPlayer");
    if (!playerPaused) {
      _player.pause();
      formVoiceIcon.css("background-image", playSymbol);
      playerPaused = true;
    } else {
      formVoiceIcon.css("background-image", pauseSymbol);
      const _player = document.getElementById("audioPlayer");
      _player.src = audioSrc;
      playerPaused = false;
      if (_player.play() !== undefined) {
        _player.play().then((_) => {
          _player
            .addEventListener("ended", function () {
              formVoiceIcon.css("background-image", playSymbol);
              playerPaused = true;
            })
            .catch((error) => {
              console.log("Error Occured!");
            });
        });
      }
    }
  }
);

$(".size-range").on("change", ".size-range", function () {
  $($(".preview-img-wrap").children("img")[0]).css(
    "height",
    String($("#size").val()) + "%"
  );
});

var previewPaused = true;
var _previewAudio;

var scriptApproved = 0;

function previewAbuseCheckToggle() {
  if (scriptApproved === false) {
    $("#aboveScript").text(
      "Your script violates our Terms & Conditions. Content of discriminatory, sexual, hateful, criminal or political nature will not be generated."
    );
    $("#aboveScript").css(redBorderCss);
  } else if (scriptApproved === true) {
    $("#aboveScript").text(
      "Audio preview can take up to 10 seconds for some voices. We are working on a fix."
    );
    $("#aboveScript").css({ borderColor: "transparent" });
  }
}

function previewListen() {
  fV.script = $("#video-script").val();
  checkForAbuse();
}

function playPreview() {
  console.log("in playpreview");
  var settings = {
    url: "https://speech2vid-api.nw.r.appspot.com/audio/preview",
    method: "POST",
    crossDomain: true,
    timeout: 0,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    data: JSON.stringify({
      voice: fV.voice,
      script: fV.script,
      name: fV.name,
      email: fV.email,
      memberstack_id: fV.id,
      script_approval: scriptApproved,
    }),
  };

  if (scriptApproved === false) {
    if (previewDisabled == false) {
      console.log("PlayPreview FALSE");

      $("#aboveScript").text(
        "Your script violates our Terms & Conditions. Content of discriminatory, sexual, hateful, criminal or political nature will not be generated."
      );
      $("#aboveScript").css(redBorderCss);
      $("#video-script").css(redBorderCss);
      settings.url =
        "https://speech2vid-api.nw.r.appspot.com/audio/record_preview";

      $.ajax(settings).done(function (response) {
        console.log(response);
      });
    }
  } else if (scriptApproved === true) {
    console.log("PlayPreview TRUE");
    $("#aboveScript").text(
      "Audio preview can take up to 10 seconds for some voices. We are working on a fix."
    );
    $("#aboveScript").css({ borderColor: "transparent" });
    $("#video-script").css({ borderColor: "transparent" });

    if (!previewPaused) {
      _previewAudio.pause();

      previewPaused = true;
      $("#previewIcon").removeClass("pause-icon").toggleClass("play-icon");
    } else {
      $("#previewIcon").removeClass("play-icon").toggleClass("pause-icon");
      previewPaused = false;
      $.ajax(settings).done(function (response) {
        console.log(response);
        _previewAudio = new Audio(response);
        _previewAudio.play().then((_) => {
          _previewAudio
            .addEventListener("ended", function () {
              previewPaused = true;
              $("#previewIcon")
                .removeClass("pause-icon")
                .toggleClass("play-icon");
            })
            .catch((error) => {
              console.log("Error Occured!");
            });
        });
      });
    }
  } else {
    console.log("Preview Listen is disabled");
  }
}

function removePositionCss() {
  $(".preview-img-wrap")
    .removeClass("preview-img-left")
    .removeClass("preview-img-mid")
    .removeClass("preview-img-right");
}

$(".actor-pos-left").click(function () {
  fV.position = $(".actor-pos-left").attr("data-position");
  $(".actor-pos").css({ borderColor: "transparent" });
  $($(this)).css(borderCss);
  removePositionCss();
  $(".preview-img-wrap").addClass("preview-img-left");
});
$(".actor-pos-mid").click(function () {
  fV.position = $(".actor-pos-mid").attr("data-position");
  $(".actor-pos").css({ borderColor: "transparent" });
  $($(this)).css(borderCss);
  removePositionCss();
  $(".preview-img-wrap").addClass("preview-img-mid");
});
$(".actor-pos-right").click(function () {
  fV.position = $(".actor-pos-right").attr("data-position");
  $(".actor-pos").css({ borderColor: "transparent" });
  $($(this)).css(borderCss);
  removePositionCss();
  $(".preview-img-wrap").addClass("preview-img-right");
});

async function uploadAudio() {
  var fileName = uuid() + ff[0].name.split(".").pop();
  $.ajax({
    url:
      "https://storage.googleapis.com/upload/storage/v1/b/yepicai-backend.appspot.com/o?uploadType=media&name=" +
      fileName,
    type: "POST",
    data: ff[0],
    processData: false,
    headers: {
      "Content-Type": ff[0].type,
    },
    success: function (data) {
      fV.audioFilename = audioFileName;
      fV.audioLink = "gs://" + data.bucket + "/" + data.name;
    },
    error: function () {
      alert("Something went wrong, try again!");
    },
  });
}

var audioFileName;
var audioFile;
var req;
const audioSelect = document.getElementById("audioSelect"),
  audioElem = document.getElementById("audioElem"),
  audioList = document.getElementById("audioList");
fileSelect.addEventListener(
  "click",
  function (e) {
    if (audioElem) {
      audioElem.click();
    }
    e.preventDefault();
  },
  false
);
audioElem.addEventListener("change", handleAudio, false);

var uploadedAudioFile;
var ff;

async function handleAudio(event) {
  var files = event.target.files;
  ff = files;
  audioFileName = files[0].name;
  uploadAudioFile = URL.createObjectURL(files[0]);
  uploadedAudioFile = uploadAudioFile;
  _player = document.getElementById("audioPlayer");
  if (!files) {
    audioList.innerHTML = "<p>No files selected!</p>";
  } else {
    console.log("Handle Audio");
    $("#audioPlayer").attr("src", uploadAudioFile);
    //  document.getElementById("audioElem").load();
    //  _player.onload = function() {
    fV.script = "custom";
    fV.script = 0;
    $("#customAudio").show();
    $("#deleteAudio").show();
    $("#audioUploadName").html(audioFileName);
    // $("#audioUpload").hide();
    $("[data-voice]").css({ borderColor: "transparent" });
    $("#customAudio").css(borderVoice);

    uploadAudio();
    //  }
  }
}

$("#srcAudio").on("click", function () {
  const formVoiceIcon = $("#customAudioPlayIcon");
  var pauseSymbol =
    "url(https://assets-global.website-files.com/603a1632f3d4a6c0f66872b9/6080782b0edbdbe9c0e96234_pause.svg)";
  var playSymbol =
    "url(https://assets-global.website-files.com/603a1632f3d4a6c0f66872b9/60815d642f83b515282a9b1b_play.svg)";

  if (!playerPaused) {
    _player.pause();
    formVoiceIcon.css("background-image", playSymbol);
    playerPaused = true;
  } else {
    formVoiceIcon.css("background-image", pauseSymbol);
    const _player = document.getElementById("audioPlayer");
    _player.src = uploadAudioFile;
    playerPaused = false;
    if (_player.play() !== undefined) {
      _player.play().then((_) => {
        _player
          .addEventListener("ended", function () {
            formVoiceIcon.css("background-image", playSymbol);
            playerPaused = true;
          })
          .catch((error) => {
            console.log("Error Occured!");
          });
      });
    }
  }
});

$("#deleteAudio").on("click", function () {
  $("#customAudio").hide();
  fV.voice = 0;
});

$("#deleteBackground").on("click", function () {
  $("#uploadedImg").attr("src", "");
  $("#uploadedImg").hide();
  (fV.background = "office-background-FHD.png"),
    $($(".preview-img-wrap").children("img")[0]).attr("src", fV.previewImgSrc);
  $($($(".preview-bg")[0])[0]).css({
    backgroundImage: defaultBackground,
    opacity: 1,
  });
  fV.voice = 0;
});

async function checkForAbuse() {
  var text = fV.script;
  $.ajax({
    url: "https://moderator-2xzgrl4rma-uc.a.run.app/text",
    type: "POST",
    data: JSON.stringify({ text: text }),
    processData: false,
    headers: {
      "Content-Type": "application/json",
      token: "575CDCE36ABB516771A658B055A61BAF657E1B8E",
    },
    success: function (data) {
      console.log(data);
      if (data.sexual >= 0.5 || data.mature >= 0.5 || data.offensive >= 0.5) {
        alert("Abusive text detected, please check.");
        scriptApproved = false;
      } else {
        scriptApproved = true;
        playPreview();
      }
    },
    error: function () {
      alert("Something went wrong, try again!");
    },
  });
}
