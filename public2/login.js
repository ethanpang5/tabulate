/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

// Signs-in Friendly Chat.
export function signIn() {
  // TODO 1: Sign in Firebase with credential from the Google user.
  // Sign into Firebase using popup auth & Google as the identity provider.
  let provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
}

// Signs-out of Friendly Chat.
export function signOut() {
  // TODO 2: Sign out of Firebase.
  firebase.auth().signOut();

}

// Initiate firebase auth.
export function initFirebaseAuth() {
  // TODO 3: Initialize Firebase.
  firebase.auth().onAuthStateChanged(authStateObserver);
}

// Returns the signed-in user's profile Pic URL.
function getProfilePicUrl() {
  // TODO 4: Return the user's profile pic URL.
  return firebase.auth().currentUser.photoURL || '/images/profile_placeholder.png';
}

// Returns the signed-in user's display name.
export function getUserName() {
  // TODO 5: Return the user's display name.
  return firebase.auth().currentUser.displayName;

}

// Returns true if a user is signed-in.
export function isUserSignedIn() {
  // TODO 6: Return true if a user is signed-in.
  return !!firebase.auth().currentUser;
}

// Saves a new message on the Firebase DB.
export function addWidget(widgetTitle) {
  // Add a new message entry to the database.
  let user = firebase.firestore().collection("widget2").doc(getUserName());
  console.log("64", user)

  if (user) {
    user.get().then((doc) => {
      let tempWidgets = doc.data().widgets;
      return tempWidgets
    }).then((tempWidgets) => {
      console.log("70", tempWidgets)

      tempWidgets.push({title: widgetTitle, links: []});
      console.log("73", tempWidgets)
      
      
      return user.update({
        name: getUserName(),
        //widgets: [{widgetTitle: "bruh", links: [{linkName : url}, {}, {}]}],
        widgets: tempWidgets,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true }).catch(function (error) {
        console.error('Error writing new message to database', error);
      });
    })
    }
  else {
    console.log("fuckin a")
    return user.set({
      name: getUserName(),
      widgets: [{ title: widgetTitle, links: [] }], // do this at sign-in
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(function (error) {
      console.error('Error writing new message to database', error);
    });
  }
}

export function addLinkToWidget(widgetName, website, url) {
  // Add a new message entry to the database.
  let user = firebase.firestore().collection("widget2").doc(getUserName());

  let tempWidgets = ["check this"];
  console.log("92")


  user.get().then((doc) => {
    console.log("96", doc.data())
    tempWidgets = doc.data().widgets;
    console.log("98", tempWidgets)

    const toEdit = tempWidgets.find(obj => {
      return obj.title === widgetName
    });
    console.log("103", toEdit)


    toEdit.links.push({ url: url, name: website });
    tempWidgets.map(obj => obj); 
    console.log("108", toEdit)
    console.log("109", tempWidgets)

  }).then(() => {console.log("111", tempWidgets);

  return user.update({
    name: getUserName(),
    //widgets: [{widgetTitle: "bruh", links: [{linkName : url}, {}, {}]}],
    widgets: tempWidgets,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }, { merge: true }).catch(function (error) {
    console.error('Error writing new message to database', error);
  });
}).catch((error) => {
  console.log("Error getting document:", error);
})


  

  


}




// Loads chat messages history and listens for upcoming ones.


// Saves a new message containing an image in Firebase.
// This first saves the image in Firebase storage.
function saveImageMessage(file) {
  // TODO 9: Posts a new image as a message.
}

// Saves the messaging device token to the datastore.
function saveMessagingDeviceToken() {
  // TODO 10: Save the device token in the realtime datastore
}

// Requests permissions to show notifications.
function requestNotificationsPermissions() {
  // TODO 11: Request permissions to send notifications.
}

// Triggered when a file is selected via the media picker.


// Triggered when the send new message form is submitted.
export function onMessageFormSubmit(e) {
  e.preventDefault();
  // Check that the user entered a message and is signed in.
  if (messageInputElement.value && checkSignedInWithMessage()) {
    addWidget(messageInputElement.value).then(function () {
      // Clear message text field and re-enable the SEND button.
      resetMaterialTextfield(messageInputElement);
      

      toggleButton();
    });
  }
}

export function onLinkFormSubmit(e) {
  e.preventDefault();
  if (messageInputElementName.value && messageInputElementLink.value && widgetElementNameForLink.value) {
    addLinkToWidget(widgetElementNameForLink.value, messageInputElementName.value, messageInputElementLink.value).then(function () {
      resetMaterialTextfield(messageInputElementName);
      resetMaterialTextfield(messageInputElementLink);
      resetMaterialTextfield(widgetElementNameForLink);
  
      toggleButton2();
    })
    


  }
}

// Triggers when the auth state change for instance when the user signs-in or signs-out.
export function authStateObserver(user) {
  if (user) { // User is signed in!
    // Get the signed-in user's profile pic and name.
    var profilePicUrl = getProfilePicUrl();
    var userName = getUserName();

    // Set the user's profile pic and name.
    userPicElement.style.backgroundImage = 'url(' + addSizeToGoogleProfilePic(profilePicUrl) + ')';
    userNameElement.textContent = userName;

    // Show user's profile and sign-out button.
    userNameElement.removeAttribute('hidden');
    userPicElement.removeAttribute('hidden');
    signOutButtonElement.removeAttribute('hidden');

    // Hide sign-in button.
    signInButtonElement.setAttribute('hidden', 'true');

    // We save the Firebase Messaging Device token and enable notifications.
    saveMessagingDeviceToken();
  } else { // User is signed out!
    // Hide user's profile and sign-out button.
    userNameElement.setAttribute('hidden', 'true');
    userPicElement.setAttribute('hidden', 'true');
    signOutButtonElement.setAttribute('hidden', 'true');

    // Show sign-in button.
    signInButtonElement.removeAttribute('hidden');
  }
}

// Returns true if user is signed-in. Otherwise false and displays a message.
export function checkSignedInWithMessage() {
  // Return true if the user is signed in Firebase
  if (isUserSignedIn()) {
    return true;
  }

  // Display a message to the user using a Toast.
  var data = {
    message: 'You must sign-in first',
    timeout: 2000
  };
  signInSnackbarElement.MaterialSnackbar.showSnackbar(data);
  return false;
}

// Resets the given MaterialTextField.
export function resetMaterialTextfield(element) {
  element.value = '';
  element.parentNode.MaterialTextfield.boundUpdateClassesHandler();
}

// Template for messages.
var MESSAGE_TEMPLATE =
  '<div class="message-container">' +
  '<div class="spacing"><div class="pic"></div></div>' +
  '<div class="message"></div>' +
  '<div class="name"></div>' +
  '</div>';

// Adds a size to Google Profile pics URLs.
export function addSizeToGoogleProfilePic(url) {
  if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
    return url + '?sz=150';
  }
  return url;
}

// A loading image URL.
var LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif?a';

// Delete a Message from the UI.
export function deleteMessage(id) {
  var div = document.getElementById(id);
  // If an element for that message exists we delete it.
  if (div) {
    div.parentNode.removeChild(div);
  }
}


export function toggleButton() {
  if (messageInputElement.value) {
    submitButtonElement.removeAttribute('disabled');
  } else {
    submitButtonElement.setAttribute('disabled', 'true');
  }
}

export function toggleButton2() {
  if (messageInputElementLink.value && messageInputElementName.value && widgetElementNameForLink.value) {
    submitButtonElement2.removeAttribute('disabled');
  } else {
    submitButtonElement2.setAttribute('disabled', 'true');
  }
}

// Checks that the Firebase SDK has been correctly setup and configured.
export function checkSetup() {
  if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
    window.alert('You have not configured and imported the Firebase SDK. ' +
      'Make sure you go through the codelab setup instructions and make ' +
      'sure you are running the codelab using `firebase serve`');
  }
}

// Checks that Firebase has been imported.
checkSetup();

// Shortcuts to DOM Elements.

let userPicElement = document.getElementById('user-pic');
let userNameElement = document.getElementById('user-name');
let signInButtonElement = document.getElementById('sign-in');
let signOutButtonElement = document.getElementById('sign-out');

// first form
let messageFormElement = document.getElementById('message-form');
messageFormElement.addEventListener('submit', onMessageFormSubmit);


let messageListElement = document.getElementById('messages');
let messageInputElement = document.getElementById('message');

messageInputElement.addEventListener('keyup', toggleButton);
messageInputElement.addEventListener('change', toggleButton);



let submitButtonElement = document.getElementById('submit');



// Saves message on form submit.
signOutButtonElement.addEventListener('click', signOut);
signInButtonElement.addEventListener('click', signIn);









// second form
let linkForm = document.getElementById("widgetlinkform");
linkForm.addEventListener("submit", onLinkFormSubmit);

let messageInputElementName = document.getElementById("message-linkname")
let messageInputElementLink = document.getElementById("message-link")
let widgetElementNameForLink = document.getElementById("widgetName");

messageInputElementName.addEventListener('keyup', toggleButton2);
messageInputElementName.addEventListener('change', toggleButton2);

messageInputElementLink.addEventListener('keyup', toggleButton2);
messageInputElementLink.addEventListener('change', toggleButton2);

widgetElementNameForLink.addEventListener('keyup', toggleButton2);
widgetElementNameForLink.addEventListener('change', toggleButton2);

let submitButtonElement2 = document.getElementById("submit2");


// initialize Firebase
initFirebaseAuth();

// TODO: Enable Firebase Performance Monitoring.

// We load currently existing chat messages and listen to new ones.
loadMessages();

export function bruh() {
  console.log("have a wonderful day!")
}
