const defaultBorderCss = {
  borderColor: "#5038ee",
  borderStyle: "solid",
  borderWidth: "2px"
  // bcb8cf40
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
      console.log("Data successfully sent: " + data);
      return result;
  } catch (error) {
      console.log("Error while getting data from integromat: ");
      console.error(error);
  }
}
function pageInit() {
  console.log("Page init 1");
}

setTimeout(pageInit, 1000);

$("#vid-form-submit").on("click", function () {
  submit_error = false
  videoTitle = $("#Video-Title").val();
  console.log("hehe");
  console.log(videoTitle)
  inputLanguage = $("#Input-Language").find(":selected").text();
  console.log(inputLanguage);
  outputLanguage = $("#Output-Language").find(":selected").text();
  console.log(outputLanguage);

  if (record_id == "undefined") {
    console.log("Missing video data");
    $("#ziggeo-embed").css(redBorderCss);
    submit_error = true;
  }
  if (videoTitle == "" || videoTitle == null || videoTitle == undefined) {
    console.log("Missing video data");
    $("#Video-Title").css(redBorderCss);
    submit_error = true;
  }
  if (inputLanguage == "") {
    console.log("Missing video data");
    $("#Input-Language").css(redBorderCss);
    submit_error = true;
  }
  if (outputLanguage == "") {
    console.log("Missing video data");
    $("#Output-Language").css(redBorderCss);
    submit_error = true;
  }
  if (submit_error == false) {
    post_airtable_data(videoTitle, inputLanguage, outputLanguage, record_id);
  }
});

$("#ziggeo-embed").on("click", function () {
  this.css(defaultBorderCss);
});
$("#Video-Title").on("click", function () {
  this.css(defaultBorderCss);
});
$("#Input-Language").on("click", function () {
  this.css(defaultBorderCss);
});
$("#Output-Language").on("click", function () {
  this.css(defaultBorderCss);
});


