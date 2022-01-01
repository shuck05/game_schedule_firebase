import { db, firebaseApp } from "./FirebaseApp";
import {
  collection,
  deleteDoc,
  query,
  addDoc,
  getDocs,
  doc,
  getDoc,
  setDoc,
  where,
  updateDoc,
  increment,
} from "firebase/firestore";
import firebaseConfig from "./FirebaseConfig";

interface Team {
  id: String;
  name: String;
  dif: number;
  score: number;
  numberGames: number;
}

interface Event {
  id: String;
  name: String;
  teams: Team[];
  games: String[][];
  participants: String[];
  admins: String[];
}

interface Game {
  done: boolean;
  team1: String;
  team2: String;
  scoreT1: number;
  scoreT2: number;
}

const getEventById = async (id: String): Promise<Event> => {
  console.log("asking Server");
  const docRef = doc(db, "Events/" + id);
  let docData = await getDoc(docRef);

  // Games
  const q = query(collection(db, "Events/" + id + "/Games"));
  let gamesArr = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    let game = [
      doc.data().team1,
      doc.data().team2,
      doc.data().scoreT1,
      doc.data().scoreT2,
      doc.data().done,
    ];
    gamesArr.push(game);
  });

  // Teams
  const q2 = query(collection(db, "Events/" + id + "/Teams"));
  let teamArr: Team[] = [];
  const querySnapshot2 = await getDocs(q2);
  querySnapshot2.forEach((doc) => {
    let team: Team = {
      id: doc.id,
      name: doc.data().name,
      score: doc.data().score,
      numberGames: doc.data().numberGames,
      dif: doc.data().dif,
    };
    teamArr.push(team);
  });

  let event: Event = {
    name: docData.data().name,
    id: id,
    teams: teamArr,
    games: gamesArr,
    participants: docData.data().participants,
    admins: docData.data().admins,
  };
  return event;
};

const getEventNamesForUser = async (id: String): Promise<String[][]> => {
  console.log("asking Server");
  const q = query(
    collection(db, "Events"),
    where("participants", "array-contains", id)
  );
  let arr = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    arr.push([doc.data().name, doc.id]);
  });
  return arr;
};

const handleNewResult = async (
  game: Game,
  eventID: String
): Promise<String> => {
  console.log("asking Server");

  const gameRef = doc(
    db,
    "Events/" + eventID + "/Games/" + game.team1 + game.team2
  );
  const team1Ref = doc(db, "Events/" + eventID + "/Teams/" + game.team1);
  const team2Ref = doc(db, "Events/" + eventID + "/Teams/" + game.team2);

  let oldGame = {
    team1: "",
    team2: "",
    scoreT1: -1,
    scoreT2: -1,
    done: false,
  };
  await getDoc(gameRef).then((oldGameRef) => {
    oldGame.team1 = oldGameRef.data().team1;
    oldGame.team2 = oldGameRef.data().team2;
    oldGame.scoreT1 = oldGameRef.data().scoreT1;
    oldGame.scoreT2 = oldGameRef.data().scoreT2;
    oldGame.done = oldGameRef.data().done;
  });

  console.log("Oldgame:");
  console.log(oldGame);
  console.log("Newgame:");
  console.log(game);

  if (!oldGame.done) {
    await updateDoc(gameRef, {
      scoreT1: game.scoreT1,
      scoreT2: game.scoreT2,
      done: true,
    });

    if (game.scoreT1 > game.scoreT2) {
      await updateDoc(team1Ref, {
        dif: increment(game.scoreT1 - game.scoreT2),
        numberGames: increment(1),
        score: increment(3),
      });

      await updateDoc(team2Ref, {
        dif: increment(game.scoreT2 - game.scoreT1),
        numberGames: increment(1),
      });
    } else if (game.scoreT1 < game.scoreT2) {
      await updateDoc(team1Ref, {
        dif: increment(game.scoreT1 - game.scoreT2),
        numberGames: increment(1),
      });

      await updateDoc(team2Ref, {
        dif: increment(game.scoreT2 - game.scoreT1),
        numberGames: increment(1),
        score: increment(3),
      });
    }
  } else {
    console.log("Das ist ganz nervig hier...");
  }

  return null;
};

const handleCreateNewEvent = async (ev: Event): Promise<String> => {
  console.log("asking Server");
  const evData = {
    name: ev.name,
    participants: ev.participants,
    admins: ev.admins,
    teams: ev.teams,
  };
  const docRef = await addDoc(collection(db, "Events"), evData);
  const id = docRef.id;

  let teamdata = null;
  for (let i = 0; i < ev.teams.length; i++) {
    teamdata = {
      name: ev.teams[i],
      score: 0,
      dif: 0,
      numberGames: 0,
    };
    await setDoc(
      doc(db, "Events/" + id + "/Teams", String(ev.teams[i])),
      teamdata
    );
  }
  for (let i = 0; i < 2; i++) {
    let game = {
      scoreT1: 0,
      scoreT2: 0,
      team1: ev.teams[0],
      team2: ev.teams[1],
      done: false,
    };
    await setDoc(
      doc(
        db,
        "Events/" + id + "/Games",
        String(String(ev.teams[0]) + String(ev.teams[1]))
      ),
      game
    );
  }

  return id;
};

const handleDeleteEventWithID = async (id: String): Promise<String> => {
  // Delete Games
  const q = query(collection(db, "Events/" + id + "/Games"));
  let gamesArr = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    gamesArr.push(doc.id);
  });
  for (let i = 0; i < gamesArr.length; i++) {
    await deleteDoc(doc(db, "Events/" + id + "/Games", gamesArr[i]));
  }

  // Delete Teams
  const q2 = query(collection(db, "Events/" + id + "/Teams"));
  let teamsArr = [];
  const querySnapshot2 = await getDocs(q2);
  querySnapshot2.forEach((doc) => {
    teamsArr.push(doc.id);
  });
  for (let i = 0; i < teamsArr.length; i++) {
    await deleteDoc(doc(db, "Events/" + id + "/Teams", teamsArr[i]));
  }

  await deleteDoc(doc(db, "Events", String(id)));

  return null;
};
/*
const eventConverter = {
    toFirestore: (activeEvent) => {
      return {
        name: activeEvent.name,
      };
    },
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      return { name: data.name, testsachen: "testsachen" };
    },
  };

  const gameConverter = {
    toFirestore: (game) => {
      return {
        ScoreT1: game.ScoreT1,
        ScoreT2: game.ScoreT2,
        Team1: game.Team1,
        Team2: game.Team2,
        done: game.done,
      };
    },
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      return {
        ScoreT1: data.ScoreT1,
        ScoreT2: data.ScoreT2,
        Team1: data.Team1,
        Team2: data.Team2,
        done: data.done,
      };
    },
  };
*/

export {
  getEventById,
  getEventNamesForUser,
  handleCreateNewEvent,
  handleDeleteEventWithID,
  handleNewResult,
};
