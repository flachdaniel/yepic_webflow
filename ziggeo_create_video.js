const defaultBorderCss = {
  borderColor: "#5038ee",
  borderStyle: "solid",
  borderWidth: "2px"
};
const redBorderCss = {
  borderColor: "red",
  borderStyle: "solid",
  borderWidth: "2px"
};

var user = {};
var record_id = "undefined";

MemberStack.onReady.then(function (member) {
    user.email = member["email"];
    user.name = member["name"];
    user.id = member["id"];
    user.membershipTypeId = $memberstack.membership.status;
});

ziggeoApp.on("ready", function() {
    // Let's get the ziggeorecorder element reference
    var element = document.getElementById('myRecorder');
    // Now let's get the actual Ziggeo embedding / object that we can use
    var recorder = ZiggeoApi.V2.Recorder.findByElement(element);
    // Now you can listen for the verified event
    recorder.on("verified", function() {
      var videoToken = recorder.get('video'); // Video token is available after the event is triggered
      console.log("The video with token " + videoToken + " has been submitted!");
      record_id = videoToken;
      $("#ziggeo-embed").css(defaultBorderCss);
    });
});

async function post_airtable_data(videoTitle, inputLanguage, outputLanguage, record_id) {
  let result;
  var data = {
    memberId: user.id,
    memberEmail: user.email,
    videoTitle: videoTitle,
    inputLanguage: inputLanguage,
    outputLanguage: outputLanguage,
    record_id: record_id
  }
  console.log("data: " + data)
  try {
      result = await $.ajax({
          url: "https://hook.integromat.com/" + "y3h5to955pvfivo3faxg7gnhqw5x1td0",
          type: 'POST',
          data: data
      });
      console.log("Data successfully sent to integromat.");
      return result;
  } catch (error) {
      console.log("Error while posting data to integromat.");
      console.error(error);
  }
}
function pageInit() {
  console.log("Page init 0");
}

// -------------------- INIT -----------------
setTimeout(pageInit, 1000);

$(document).ready(function () {

  $("#Video-Submit").on("click", function () {
    form_submit_error = false;
    videoTitle = $("#Video-Title").val();
    console.log(videoTitle)
    inputLanguage = $("#Input-Language").find(":selected").text();
    console.log(inputLanguage);
    outputLanguage = $("#Output-Language").find(":selected").text();
    console.log(outputLanguage);
    if (record_id == "undefined") {
      console.log("Missing video data");
      $("#ziggeo-embed").css(redBorderCss);
      form_submit_error = true;
    }
    if (videoTitle == "") {
      $("#Video-Title").css(redBorderCss);
      form_submit_error = true;
    }
    if (inputLanguage == "Input Language") {
      $("#Input-Language").css(redBorderCss);
      form_submit_error = true;
    }
    if (outputLanguage == "Output Language") {
      $("#Output-Language").css(redBorderCss);
      form_submit_error = true;
    }
    if (form_submit_error == false) {
      post_airtable_data(videoTitle, inputLanguage, outputLanguage, record_id);
      $(".form-video-wrap").hide();
      $(".form-video-success-wrap").show();
    }
  });

  $("#ziggeo-embed").on("click", function () {
    $("#ziggeo-embed").css(defaultBorderCss);
  });
  $("#Video-Title").on("click", function () {
    $("#Video-Title").css(defaultBorderCss);
  });
  $("#Input-Language").on("click", function () {
    $("#Input-Language").css(defaultBorderCss);
  });
  $("#Output-Language").on("click", function () {
    $("#Output-Language").css(defaultBorderCss);
  });

});

