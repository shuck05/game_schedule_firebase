const functions = require("firebase-functions");

exports.generateTeam = functions.firestore
  .document("Events/{eventID}")
  .onCreate((snap, context) => {
    const data = snap.data();
    let team = { name: data.name, score: 0 };
    snap.ref.collection("Teams").doc(team.name).set(team);
  });

exports.generateGames = functions.firestore
  .document("Events/{eventID}")
  .onCreate((snap, context) => {
    const data = snap.data();
    let teamArray = [];
    for (let i = 0; i < data.teams.length; i++) {
      teamArray.push({ name: data.teams[i] });
    }
    let tempTeam = null;
    for (let i = 0; i < teamArray.length; i++) {
      tempTeam = {
        name: teamArray[i].name,
        score: 0,
        dif: 0,
        numberGames: 0,
      };
      snap.ref.collection("Teams").doc(tempTeam.name).set(tempTeam);
    }

    gamesArr = [];
    if (teamArray.length === 2) {
      gamesArr = [[teamArray[0].name, teamArray[1].name], undefined, undefined];
    } else if (teamArray.length === 3) {
      gamesArr = [
        [teamArray[0].name, teamArray[1].name, undefined, undefined],
        [teamArray[1].name, teamArray[2].name, undefined, undefined],
        [teamArray[2].name, teamArray[0].name, undefined, undefined],
      ];
    } else {
      let arr = [];
      let count = 0;
      let entry = [];
      let entryRev = [];
      let matchDoesExist = false;
      let playedMatchBefore = false;

      while (arr.length < (teamArray.length * (teamArray.length - 1)) / 2) {
        count++;
        matchDoesExist = false;
        playedMatchBefore = false;
        let i = Math.round(Math.random() * (teamArray.length - 1));
        let j = Math.round(Math.random() * (teamArray.length - 1));
        if (i === j) continue;
        entry = teamArray[i].name + teamArray[j].name;
        entryRev = teamArray[j].name + teamArray[i].name;
        for (let k = 0; k < arr.length; k++) {
          if (arr[k][0] + arr[k][1] === entry) matchDoesExist = true;
          if (arr[k][0] + arr[k][1] === entryRev) matchDoesExist = true;
        }

        if (arr[arr.length - 1] !== undefined) {
          if (
            teamArray[i].name === arr[arr.length - 1][0] ||
            teamArray[i].name === arr[arr.length - 1][1]
          ) {
            playedMatchBefore = true;
          }

          if (
            teamArray[j].name === arr[arr.length - 1][0] ||
            teamArray[j].name === arr[arr.length - 1][1]
          ) {
            playedMatchBefore = true;
          }
        }
        if (!matchDoesExist && !playedMatchBefore) {
          arr.push([
            teamArray[i].name,
            teamArray[j].name,
            undefined,
            undefined,
          ]);
        } else if (!matchDoesExist && playedMatchBefore && count > 10000) {
          arr.push([
            teamArray[i].name,
            teamArray[j].name,
            undefined,
            undefined,
          ]);
        }
        if (count > 100000) {
          break;
        }
      }
      gamesArr = arr;
    }

    for (let i = 0; i < gamesArr.length; i++) {
      snap.ref
        .collection("Games")
        .doc(gamesArr[i][0] + gamesArr[i][1])
        .set({
          team1: gamesArr[i][0],
          team2: gamesArr[i][1],
          scoreT1: 0,
          scoreT2: 0,
          done: false,
        });
    }
  });

// const functions = require("firebase-functions");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
