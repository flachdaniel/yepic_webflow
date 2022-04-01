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
var submitted = false;
var stateChanged = false;
var previewDisabled = true;
var scriptLengthOk = false;
var defaultBackground = "url(https://assets-global.website-files.com/603a1632f3d4a6c0f66872b9/607d6b85eba5a8278fce538a_office-background-FHD.png)";
var VL = {};
var backgroundClass = " ";
var newClass;
var selectedActorGender = 'actor-male'
var fV = {
  actor: "Alex",
  actorPositionType: "full-body",
  position: "centre",
  circleBackgroundColor: "",
  circleRimColor: "",
  previewImgSrc: "https://assets-global.website-files.com/603a1632f3d4a6c0f66872b9/6082b99fff1618b81cc1b433_khamal-p-500.png",
  link: "https://storage.googleapis.com/yepicai-backend.appspot.com/regularBackgrounds/office-background-FHD.png",
  background: "office-background-FHD.png",
  size: "",
  circleSize: "",
};
var actorTypePositionSelection = {
  fullBody: "centre",
  circle: "circle-midcentre",
  classNameFullBody: ".actor-pos-mid",
  classNameCircle: ".actor-pos-circle-midcentre",
  classNameFullBodyImage: "preview-img-mid",
  classNameCircleImage: "m2",
};
MemberStack.onReady.then(function (member) {
  fV.email = member["email"];
  fV.name = member["name"];
  fV.id = member["id"];
  fV.membershipTypeId = $memberstack.membership.status;
});

// Page load first steps
$(".preview-circle-img-wrap").hide();
console.log("------------------------version: 01 ----------------------------");


// ------------------------------------------------- SELECT ACTOR POSITION AND TYPE -------------------------------------------------

//----------- Functions (type and positions) -----------
function selectActorPositionAndType(actorPosition, actorType, imageClassName) {
  console.log("------------ position: " + $(actorPosition).attr("data-position") + " and type: " + actorType);
  position = $(actorPosition).attr("data-position");
  $(".actor-pos").css({ borderColor: "transparent" });
  $($(actorPosition)).css(borderCss);
  if (actorType == "full-body") {
    actorTypePositionSelection.fullBody = position;
    actorTypePositionSelection.classNameFullBody = actorPosition;
    actorTypePositionSelection.classNameFullBodyImage = imageClassName;
    $(".preview-img-wrap").removeClass("preview-img-left preview-img-mid preview-img-right");
    $(".preview-img-wrap").addClass(imageClassName);
  };
  if (actorType == "circle") {
    actorTypePositionSelection.circle = position;
    actorTypePositionSelection.classNameCircle = actorPosition;
    actorTypePositionSelection.classNameCircleImage = imageClassName;
    $(".preview-circle-img-wrap").removeClass("t1 t2 t3 m1 m2 m3 b1 b2 b3");
    $(".preview-circle-img-wrap").addClass(imageClassName);
  }
  fV.position = position;
  fV.actorPositionType = actorType;
};

function changeCircleBackground(colorObject) {
  hexCode = colorObject.attr("data-hexcode");
  fV.circleBackgroundColor = "#" + hexCode;
  console.log(fV.circleBackgroundColor);

  if (colorObject.hasClass('c1')) {
    backgroundColorClass = 'c1'
  }
  if (colorObject.hasClass('c2')) {
    backgroundColorClass = 'c2'
  }
  if (colorObject.hasClass('c3')) {
    backgroundColorClass = 'c3'
  }
  if (colorObject.hasClass('c4')) {
    backgroundColorClass = 'c4'
  }
  if (colorObject.hasClass('c5')) {
    backgroundColorClass = 'c5'
  }
  if (colorObject.hasClass('c6')) {
    backgroundColorClass = 'c6'
  }
  if (colorObject.hasClass('c7')) {
    backgroundColorClass = 'c7'
  }
  if (colorObject.hasClass('c8')) {
    backgroundColorClass = 'c8'
  }
  $(".form-tab-circle-bg").css({ borderColor: "transparent" });
  colorObject.css(borderCss);
  $("#previewCircImg").removeClass("c1 c2 c3 c4 c5 c6 c7 c8");
  $("#previewCircImg").addClass(backgroundColorClass);
};

//----------- FULL-BODY/CIRCLE Tab selection -----------
$("#tab-title-full").click(function () {
  selectActorPositionAndType(actorTypePositionSelection.classNameFullBody, "full-body", actorTypePositionSelection.classNameFullBodyImage);
  $(".preview-img-wrap").children("img").attr("src", fV.previewImgSrc);
  $(".preview-circle-img-wrap").hide();
  $(".preview-img-wrap").show();
  console.log("1");
  fV.actorType = "full-body";
  fV.position = actorTypePositionSelection.fullBody;
});
$("#tab-title-circle").click(function () {
  selectActorPositionAndType(actorTypePositionSelection.classNameCircle, "circle", actorTypePositionSelection.classNameCircleImage);
  $(".preview-circle-img-wrap").children().children("img").attr("src", fV.previewImgSrc);
  $(".preview-img-wrap").hide();
  $(".preview-circle-img-wrap").show();
  console.log("2");
  fV.actorType = "circle";
  fV.position = actorTypePositionSelection.circle;
});

//----------- FULL-BODY selection -----------
$(".actor-pos-left").click(function () {
  selectActorPositionAndType(".actor-pos-left", "full-body", "preview-img-left");
});
$(".actor-pos-mid").click(function () {
  selectActorPositionAndType(".actor-pos-mid", "full-body", "preview-img-mid");
});
$(".actor-pos-right").click(function () {
  selectActorPositionAndType(".actor-pos-right", "full-body", "preview-img-right");
});

//----------- CIRCLE-BODY selection -----------
$(".actor-pos-circle-topleft").click(function () {
  selectActorPositionAndType(".actor-pos-circle-topleft", "circle", "t1");
});
$(".actor-pos-circle-topcentre").click(function () {
  selectActorPositionAndType(".actor-pos-circle-topcentre", "circle", "t2");
});
$(".actor-pos-circle-topright").click(function () {
  selectActorPositionAndType(".actor-pos-circle-topright", "circle", "t3");
});
$(".actor-pos-circle-midleft").click(function () {
  selectActorPositionAndType(".actor-pos-circle-midleft", "circle", "m1");
});
$(".actor-pos-circle-midcentre").click(function () {
  selectActorPositionAndType(".actor-pos-circle-midcentre", "circle", "m2");
});
$(".actor-pos-circle-midright").click(function () {
  selectActorPositionAndType(".actor-pos-circle-midright", "circle", "m3");
});
$(".actor-pos-circle-botleft").click(function () {
  selectActorPositionAndType(".actor-pos-circle-botleft", "circle", "b1");
});
$(".actor-pos-circle-botcentre").click(function () {
  selectActorPositionAndType(".actor-pos-circle-botcentre", "circle", "b2");
});
$(".actor-pos-circle-botright").click(function () {
  selectActorPositionAndType(".actor-pos-circle-botright", "circle", "b3");
});

//----------- CIRCLE BACKGROUND selection -----------

$(".form-circ-colours").on("click", "#circle-background-select", function () {
  changeCircleBackground($(this));
});

// ------------------------------------------------- SELECT VOICE AND ACTOR -------------------------------------------------

//----------- Functions (voice and actor) -----------
function cleanUpVoiceSelectionBasedOnActorGender(actorGender) {
  if (actorGender == "actor-female") {
    $('.voice-female').each(function(i, obj) {
      $(this).parent().parent().removeClass('display-none')
    });
    $('.voice-male').each(function(i, obj) {
      $(this).parent().parent().addClass('display-none')
    });
  }
  if (actorGender == "actor-male") {
    $('.voice-male').each(function(i, obj) {
      $(this).parent().parent().removeClass('display-none')
    });
    $('.voice-female').each(function(i, obj) {
      $(this).parent().parent().addClass('display-none')
    });
  }
}

$(".cv-lang-radio").on("click", function () {
  console.log("lefut");
  cleanUpVoiceSelectionBasedOnActorGender(selectedActorGener);
});

//----------- ACTOR selection -----------
$(".form-actor-select-wrap").on("click", ".form-actor", function () {
  fV.videoName = $("#video-name").val();
  fV.actor = $(this).attr("data-actor");
  fV.previewImgSrc = $(this).children("img").attr("src");

  actorGender = $(this);
  if (actorGender.hasClass('actor-female')) {
    selectedActorGener = 'actor-female';
    cleanUpVoiceSelectionBasedOnActorGender('actor-female');
  };
  if (actorGender.hasClass('actor-male')) {
    selectedActorGener = 'actor-male';
    cleanUpVoiceSelectionBasedOnActorGender('actor-male');
  };

  $(".form-actor-select-wrap").css({ borderColor: "transparent" });
  $(this).css({ borderColor: "transparent" });

  $(".form-actor-select-wrap .form-actor").css({ borderColor: "transparent" });
  $($(this)).css(borderCss);

  if (fV.actorPositionType == "full-body") {
    $(".preview-img-wrap").children("img").attr("src", fV.previewImgSrc);
  }
  if (fV.actorPositionType == "circle") {
    $(".preview-circle-img-wrap").children().children("img").attr("src", fV.previewImgSrc);
  }

});

// class="preview-bg form-tab-bg c5"

// ------------------------------------------------- SELECT BACKGROUND -------------------------------------------------
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


// ---------------------- INITIALIZE -------------------------
function InitializeSelections() {
  $("[data-actor='Alex']").css(borderCss);
  $("[data-background='office-background-FHD.png']").css(borderCss);
  $($($(".preview-bg")[0])[0]).css({
    backgroundImage: defaultBackground,
    opacity: 1,
  });
}

function InitializeActorPositionAndTypeSelection() {
  $(".preview-img-wrap").css("opacity", 1); // ?
  $(".preview-img-wrap").show();
  selectActorPositionAndType(actorTypePositionSelection.classNameFullBody, "full-body", actorTypePositionSelection.classNameFullBodyImage);
  fV.actorType = "full-body";
  fV.position = actorTypePositionSelection.fullBody;
}


async function isEmailVerified(id) {
  let result;
  var data = {
    user_id: id
  }
  console.log("user id: " + id)
  try {
      result = await $.ajax({
          url: "https://hook.integromat.com/" + "l9zpmiqwiliash3j77wb7urvmlonuv4h",
          type: 'POST',
          data: data
      });
      console.log("Is user verified?: ");
      console.log(result);
      return result;
  } catch (error) {
      console.log("Error while getting data to integromat: ");
      console.error(error);
  }

}

async function reSendEmailVerification() {
  let result;
  var data = {
    user_id: fV.id
  }
  console.log("user id: " + fV.id)
  try {
      result = await $.ajax({
          url: "https://hook.integromat.com/" + "ubqms8wkb0xo67gwkjpo18m7qhcwmeqh",
          type: 'POST',
          data: data
      });
      console.log("Verification email resent");
      return result;
  } catch (error) {
      console.log("Error while re-sending verification email");
      console.error(error);
  }

}

async function InitializeIsUserVerified() {
  const response = await isEmailVerified(fV.id);
  const is_email_verified_json = JSON.parse(response);
  
  if (!is_email_verified_json.is_email_verified) {
    $(".form-create-button-denied-wrap").css("display", "block");
    $(".popup-email-verify-wrap").css("display", "block");
    $(".form-listen-denied-wrap").css("display", "block");
    //$(".form-listen-wrap").css("display", "none");
    //$("#account-verify-link").attr("href", "http://www.google.com/");
  }

}

function startUpSelection() {
  InitializeActorPositionAndTypeSelection();
  InitializeSelections();
  cleanUpVoiceSelectionBasedOnActorGender('actor-male');
  InitializeIsUserVerified()
}
setTimeout(startUpSelection, 1000);


// ------------------------------------------------- SELECT VOICE (this part is not refactored yet) -------------------------------------------------
function checkListenPreview() {
  if (scriptLengthOk && fV.voice != 0) {
    previewDisabled = false;
    $("#previewPlayBtn").css({ opacity: 1 });
    $("#tooltip").css("opacity", 0);
  }
}

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

function send_request() {
  var formErrors = false;
  fV.script = $("#video-script").val();
  fV.videoName = $("#video-name").val();

  if (fV.actorPositionType == "full-body") {
    fV.circleBackgroundColor = "";
    fV.size = $("#size").val();
    fV.circleSize = "";
  }
  if (fV.actorPositionType == "circle") {
    fV.circleSize = $("#size-circle").val();
    fV.size = "";
  }

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

  console.log("Send request: ");
  console.log(fV);

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
  $("#video-script").css({ borderColor: "#bccce5" });
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
      start_move_background_to_private_cloud_function(fileName);
      console.log("Moving to another bucket finished");
    },
    error: function () {
      alert("Something went wrong, try again!");
    },
  });
}

async function start_move_background_to_private_cloud_function(image_name) {
  let result;
  console.log("Moving to another bucket started" + image_name);
  try {
      result = await $.ajax({
          url: "https://europe-west2-yepicai-backend.cloudfunctions.net/public_to_private",
          type: 'POST',
          crossDomain: true,
          data: JSON.stringify({"blob_name" : image_name}),
          contentType: "application/json",
          dataType: "json",
          headers: {
            'Access-Control-Allow-Origin': ['https://yepic-ai-new.webflow.io', 'https://www.yepic.ai'],
          }
      });
      console.log("Data successfully received: ");
      return result;
  } catch (error) {
      console.log("Error while executing script: ");
      console.error(error);
  }
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
    $("#video-script").css({ borderColor: "#bccce5" });

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
