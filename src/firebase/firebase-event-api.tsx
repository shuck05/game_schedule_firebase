import { db } from "./FirebaseApp";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

interface Team {
  name: String;
}

interface Event {
  id: String;
  name: string;
  teams: Team[];
  games: String[][];
  trainers: number[];
  participants: number[];
  admins: number[];
}

const getEventById = async (id: String): Promise<Event> => {
  const docRef = doc(db, "Events/" + id);
  let docData = await getDoc(docRef);
  let name = docData.data().name;

  // Games
  const q = query(collection(db, "Events/" + id + "/Games"));
  let gamesArr = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    let game = [
      doc.data().Team1,
      doc.data().Team2,
      doc.data().ScoreT1,
      doc.data().ScoreT2,
      doc.data().done,
    ];
    gamesArr.push(game);
  });

  // Teams
  const q2 = query(collection(db, "Events/" + id + "/Teams"));
  let teamArr = [];
  const querySnapshot2 = await getDocs(q2);
  querySnapshot2.forEach((doc) => {
    let team = {
      id: doc.id,
      name: doc.data().name,
      score: doc.data().score,
      numberGames: doc.data().numberGames,
      difference: doc.data().difference,
    };
    teamArr.push(team);
  });

  let event: Event = {
    name: name,
    id: id,
    teams: teamArr,
    games: gamesArr,
    participants: [],
    admins: [],
    trainers: [],
  };
  return event;
};

const getEventNamesForUser = async (id: String): Promise<String[][]> => {
  const q = query(collection(db, "Events"));
  let arr = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    arr.push([doc.data().name, doc.id]);
  });

  return arr;
};

const handleCreateNewEvent = async (): Promise<Event> => {
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

export { getEventById, getEventNamesForUser, handleCreateNewEvent };
