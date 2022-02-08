var user = {};
MemberStack.onReady.then(function (member) {
    user.email = member["email"];
    user.name = member["name"];
    user.id = member["id"];
    user.membershipTypeId = $memberstack.membership.status;
});

function get_data() {
    $.ajax({
      url: "https://hook.integromat.com/" + "jv6helyxlo7chcwz5k6k4mdm5a9314nk",
      type: "POST",
      data: user.id,
      success: function (res) {
        console.log("Data successfully received:");
        console.log(res);
      },
      error: function (err) {
        console.log("Error while getting data from integromat:");
        console.log(err);
      },
    });
  }

function getCreditData(){
    get_data();
}

setTimeout(getCreditData, 1000);

