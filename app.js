
function sendMessage() {
    var message = document.getElementById("message").value;
if(message==""){
    alert("Plzz Enter Message!");
}else{
    firebase.database().ref("messages").push().set({
        "sender": myName,
        "message": message
    });
}

    return false;

}


firebase.database().ref("messages").on("child_added", function(snapshot) {

    var html = "";
   
    html += "<li id='message-" + snapshot.key + "'>";
    if (snapshot.val().sender == myName) {
        html += "<button data-id='" + snapshot.key + "' class='btn btn-danger' onclick='deleteMessage(this); '>";
        html += "Delete";
        html += "</button>";
    }
    html += snapshot.val().sender + ": " + snapshot.val().message;
    html += "</li>";

    document.getElementById("messages").innerHTML += html;
    document.getElementById("message").value = "";

});

function deleteMessage(self) {
    var messageId = self.getAttribute("data-id");

    firebase.database().ref("messages").child(messageId).remove();
}

firebase.database().ref("messages").on("child_removed", function(snapshot) {
    document.getElementById("message-" + snapshot.key).innerHTML = "This message has been removed";
});


function login(){
    var provider = new firebase.auth.FacebookAuthProvider();
    
    firebase.auth().signInWithPopup(provider).then(()=> {
        window.location.assign("chat.html");
      })
      .catch(function(error) {
       console.log(error)
      });
}

const facebook_login = ()=>{
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result)=> {
        // The signed-in user info.
        window.location.assign("chat.html");
        
      })
      .catch(function(error) {
       console.log(error)
      });
}

const logout = ()=>{
    firebase.auth().signOut().then(function() {
      window.location.assign("index.html");
      }).catch(function(error) {
        console.log(error)
      });
}
