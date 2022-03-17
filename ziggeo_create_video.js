ziggeoApp.on("ready", function() {
    // Let's get the ziggeorecorder element reference
    var element = document.getElementById('myRecorder');
  
    // Now let's get the actual Ziggeo embedding / object that we can use
    var recorder = ZiggeoApi.V2.Recorder.findByElement(element);
  
    // Now you can listen for the verified event
    recorder.on("verified", function() {
      var videoToken = recorder.get('video'); // Video token is available after the event is triggered
      alert("The video with token " + videoToken + " has been submitted!");
    });
});
