var user = {};
MemberStack.onReady.then(function (member) {
    user.email = member["email"];
    user.name = member["name"];
    user.id = member["id"];
    user.membershipTypeId = $memberstack.membership.status;
});


async function send_data(custom_id) {
  let result;
  var data = {
    custom_id: custom_id
  }
  console.log("user id: " + user.id)
  try {
      result = await $.ajax({
          url: "https://hook.integromat.com/" + "51lp3k11p566j8q3s7a8v22q4tx29the",
          type: 'POST',
          data: data
      });
      console.log("Data successfully posted");
      return result;
  } catch (error) {
      console.log("Error while getting posting data to integromat: ");
      console.error(error);
  }
}

async function verify_email(){
    console.log("1112");
    //var custom_id = getUrlParameter('id');
    console.log(custom_id);
    await send_data(custom_id);
    console.log("Email is verified");
}

setTimeout(verify_email, 1000);
