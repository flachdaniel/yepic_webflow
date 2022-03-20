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
      alert("The video with token " + videoToken + " has been submitted!");
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
      console.log("Data successfully sent: ");
      return result;
  } catch (error) {
      console.log("Error while getting data from integromat: ");
      console.error(error);
  }
}

$("#vid-form-submit").on("click", function () {
  videoTitle = $("#Video-Title").val();
  console.log(videoTitle);

  inputLanguage = $("#Input-Language").val();
  console.log(inputLanguage);

  outputLanguage = $("#Output-Language").val();
  console.log(outputLanguage);

  if (record_id == "undefined") {
    alert("Please record or upload a video!");
  } else {
    post_airtable_data(videoTitle, inputLanguage, outputLanguage, record_id);
  }

});

