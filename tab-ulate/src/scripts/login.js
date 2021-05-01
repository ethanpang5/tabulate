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
"use strict";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwcnfyJDrxYTVGnbGJ39pwyRPmbbln8jI",
  authDomain: "tabulate-da8ac.firebaseapp.com",
  projectId: "tabulate-da8ac",
  storageBucket: "tabulate-da8ac.appspot.com",
  messagingSenderId: "600957298630",
  appId: "1:600957298630:web:8dff818513beaf9c9734c7",
  measurementId: "G-FRRT9SB5QF",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log(firebase);

export const auth = firebase.auth();
export const db = firebase.firestore();
// Signs-in to TabUlate.
export function signIn() {
  // TODO 1: Sign in Firebase with credential from the Google user.
  // Sign into Firebase using popup auth & Google as the identity provider.
  let provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(() => {
      let user = firebase.firestore().collection("users").doc(getUserName());
      user.get().then((doc) => {
        if (!doc.exists) {
          user
            .set({
              name: getUserName(),
              widgets: [], // do this at sign-in
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .catch(function (error) {
              console.error("Error writing new message to database", error);
            });
        }
      });
    })
    .catch(function (error) {
      console.error("Error signing in", error);
    });
}

// Signs-out of TabUlate.
export function signOut() {
  firebase.auth().signOut();
}

// Initiate firebase auth.
// export function initFirebaseAuth() {
//   // TODO 3: Initialize Firebase.
//   firebase.auth().onAuthStateChanged(authStateObserver);
// }

// Returns the signed-in user's profile Pic URL.
export function getProfilePicUrl() {
  return (
    firebase.auth().currentUser.photoURL ||
    "https://lh3.googleusercontent.com/-5NpIVUCd2lE/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmn22K-OnZPInLvX19yR_TVKiUFCA/s96-c/photo.jpg"
  );
}

// Returns the signed-in user's display name.
export function getUserName() {
  return firebase.auth().currentUser.displayName;
}

// Returns true if a user is signed-in.
export function isUserSignedIn() {
  return !!firebase.auth().currentUser;
}

export function addWidget(widgetTitle) {
  // Add a new message entry to the database.
  let user = firebase.firestore().collection("users").doc(getUserName());

  if (user) {
    user
      .get()
      .then((doc) => {
        let tempWidgets = doc.data().widgets;
        return tempWidgets;
      })
      .then((tempWidgets) => {
        tempWidgets.push({ title: widgetTitle, links: [] });

        return user
          .update(
            {
              name: getUserName(),
              widgets: tempWidgets,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            },
            { merge: true }
          )
          .catch(function (error) {
            console.error("Error writing new message to database", error);
          });
      });
  }
}


export function getWidgets() {
  // returns the current user's widgets

  return new Promise(() => {
    let user = firebase.firestore().collection("users").doc(getUserName());
    user.get().then((doc) => {
      if (doc.exists) {
        return doc.data().widgets;
      } else {
      }
    });
  });
}

export function addLinkToWidget(widgetName, website, url) {
  // Add a new message entry to the database.
  let user = firebase.firestore().collection("users").doc(getUserName());

  let tempWidgets = ["check this"];

  user
    .get()
    .then((doc) => {
      tempWidgets = doc.data().widgets;
      const toEdit = tempWidgets.find((obj) => {
        return obj.title === widgetName;
      });

      toEdit.links.push({ url: url, name: website });
      tempWidgets.map((obj) => obj);
    })
    .then(() => {
      return user
        .update(
          {
            name: getUserName(),
            //widgets: [{widgetTitle: "bruh", links: [{linkName : url}, {}, {}]}],
            widgets: tempWidgets,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        )
        .catch(function (error) {
          console.error("Error writing new message to database", error);
        });
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}

export function deleteLink(widgetName, url) {
  let user = firebase.firestore().collection("users").doc(getUserName());

  user
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data().widgets;
      } else {
      }
    })
    .then((widgets) => {
      let widget = widgets.find((obj) => {
        return obj.title == widgetName;
      });
      widget.links = widget.links.filter((obj) => {
        return obj.url !== url;
      });

      user
        .update(
          {
            name: getUserName(),
            widgets: widgets,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        )
        .catch(function (error) {
          console.error("Error writing new message to database", error);
        });
    });
}

export function deleteWidget(widgetName) {
  let user = firebase.firestore().collection("users").doc(getUserName());

  user
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data().widgets;
      } else {
      }
    })
    .then((widgets) => {
      const newState = widgets.filter((obj) => {
        return obj.title !== widgetName;
      });

      user
        .update(
          {
            name: getUserName(),
            widgets: newState,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        )
        .catch(function (error) {
          console.error("Error writing new message to database", error);
        });
    });
}

export function changeWidgetTitle(widgetName, newWidgetTitle) {
  let user = firebase.firestore().collection("users").doc(getUserName());
  user
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data().widgets;
      }
    })
    .then((widgets) => {
      const widget = widgets.find((obj) => {
        return obj.title === widgetName;
      });
      widget.title = newWidgetTitle;
      console.log("title:", widget.title)
      user
        .update(
          {
            name: getUserName(),
            widgets: widgets,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        )
        .catch(function (error) {
          console.error("Error writing new message to database", error);
        });
    });
}

// Loads chat messages history and listens for upcoming ones.

// Returns true if user is signed-in. Otherwise false and displays a message.
export function checkSignedInWithMessage() {
  // Return true if the user is signed in Firebase
  if (isUserSignedIn()) {
    return true;
  }
}
// Resets the given MaterialTextField.
export function resetMaterialTextfield(element) {
  element.value = "";
  element.parentNode.MaterialTextfield.boundUpdateClassesHandler();
}

// Checks that the Firebase SDK has been correctly setup and configured.
export function checkSetup() {
  if (
    !window.firebase ||
    !(firebase.app instanceof Function) ||
    !firebase.app().options
  ) {
    window.alert(
      "You have not configured and imported the Firebase SDK. " +
        "Make sure you go through the codelab setup instructions and make " +
        "sure you are running the codelab using `firebase serve`"
    );
  }
}
checkSetup();

// initialize Firebase
// initFirebaseAuth();

// TODO: Enable Firebase Performance Monitoring.

// We load currently existing chat messages and listen to new ones.

