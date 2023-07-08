import { Elm } from './Main.elm';

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, push } from 'firebase/database';

//https://youtu.be/UFD4SP91tSM?t=3294
// Initialize (f)irebase (b)ase (a)pp
const firebase = initializeApp(getFbConfig());
const db = getDatabase(firebase);
const moviesRef = ref(db, 'movies');
const root = document.querySelector('#app');

// Movies
function addMovie(movie: string) {
  return push(moviesRef, movie);
}

function fetchMovies(cb: (any: any) => any) {
  onValue(moviesRef, (moviesSnap) => {
    const movies = moviesSnap.val(); // Get the actual data
    cb(movies);
  });
}


const flags = {
  now: Date.now(),
} as const;

type Ports = {
  addMovie: {
    subscribe: (data: any) => void;
  };
  incomingMovieData: {
    send: (movies: string[]) => void;
  };
  addMovieErr: {
    send(args: { code: string; message: string }): void;
  };
};

const app = Elm.Main.init<Ports, typeof flags>({ node: root, flags });

fetchMovies((movies: string[]) => {
  const mvs = Object.values(movies);
  app.ports.incomingMovieData.send(mvs);
});

app.ports.addMovie.subscribe((data: string) => {
  addMovie(data).catch((err) => {
    if (err instanceof Error) {
      app.ports.addMovieErr.send({
        code: '434', //err.code,
        message: err.message,
      });
    }
  });
});

function getFbConfig() {
  // Your web app's Firebase configuration
  return {
    databaseURL:
      'https://subtitles-82070-default-rtdb.europe-west1.firebasedatabase.app',
    apiKey: 'AIzaSyC4-YEHVg-Tnmc_qA6AJi8f5meIGNkCe_k',

    authDomain: 'subtitles-82070.firebaseapp.com',
    projectId: 'subtitles-82070',
    storageBucket: 'subtitles-82070.appspot.com',
    messagingSenderId: '198094719161',
    appId: '1:198094719161:web:ba1700d35fd32ede2d7368',
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    measurementId: 'G-0JV6WMTQDN',
  };
}
