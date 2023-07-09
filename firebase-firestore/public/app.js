const { auth, provider, signInWithPopup, signOut, onAuthStateChanged } =
  window.AUTH;
console.log(AUTH, DB);
const whenSin = document.querySelector('#when-s-in');
const whenSout = document.querySelector('#when-s-out');

const sOutBtn = document.querySelector('#s-out-btn');
const sInBtn = document.querySelector('#s-in-btn');
const details = document.querySelector('#user-details');

const thingsList = document.querySelector('#things-list');
const createThingBtn = document.querySelector('#create-thing-btn');
const createBatchBtn = document.querySelector('#create-batch-btn');

// AUTH
sInBtn.onclick = () => {
  signInWithPopup(auth, provider);
};
sOutBtn.onclick = () => {
  signOut(auth);
};

onAuthStateChanged(auth, (user) => {
  console.log(user);
  if (user) {
    details.innerHTML = `Hello ${user.displayName}`;
    whenSin.hidden = false;
    whenSout.hidden = true;
  } else {
    // user not logged in
    whenSin.hidden = true;
    whenSout.hidden = false;

    details.innerHTML = ``;
  }
});

// Manage Things

let thingsRef;
let nicob1;
let unsubscribe;

onAuthStateChanged(auth, (user) => {
  if (user) {
    const db = DB.firestore;
    // user is logged in
    thingsRef = DB.collection(db, 'things');
    nicob1 = DB.collection(db, 'nicob1');

    createBatchBtn.onclick = () => {
      alert("why touch this");
      return;
      const batch = DB.writeBatch(db);
      subs.forEach((s) => {
        const newDocRef = DB.doc(nicob1); // This generates a new document reference with an auto-generated ID
        batch.set(newDocRef, s); // This sets the document data
      });

      console.log(batch);
      batch
        .commit()
        .then(() => {
          console.log('All documents added successfully');
        })
        .catch((error) => {
          console.log("Adding documents didn't go well, bruh!", error);
        });
    };

    createThingBtn.onclick = () => {
      DB.addDoc(thingsRef, {
        uuid: user.uid,
        name: faker.commerce.productName(),
        createdAt: DB.serverTimestamp(),
      }).catch((error) => {
        console.log("Adding thing didn't went well, bruh!", error);
      });
    };

    // listen for updates and react
    // unsubscribe = DB.where(thingsRef);
    const q = DB.query(thingsRef, DB.where("uuid", "==", user.uid), DB.orderBy('createdAt'))
    unsubscribe = DB.onSnapshot(q, (querySnapshot) => {
      console.log('Received new snapshot');

      const messages = [];
      querySnapshot.forEach((doc) => {
        if (doc.data()) {
          messages.push(doc.data());
        }
      });

      let content = messages.map(m => `<li>Giving: ${m.name}</li>`).join('')

      thingsList.innerHTML = `<ul>${content}</ul>`;
    });
  } else {
    // user not logged in
    // Unsubscribe when the user signs out
    thingsList.innerHTML = "";
    unsubscribe && unsubscribe();
  }
});


const subs = [
  {
    trigger: 6920,
    index: 0,
    lang: 'de',
    start: {
      time: 6920,
      hour: 0,
      mins: 0,
      secs: 6,
      ms: 920,
    },
    end: {
      time: 9800,
      hour: 0,
      mins: 0,
      secs: 9,
      ms: 800,
    },
    duration: {
      secs: 2.88,
      ms: 2880,
    },
    content: '– Sie können eine Ausbildung\nbeginnen oder studieren.',
    meta: {
      original: {
        start: '00:00:06,920',
        end: '00:00:09,800',
      },
    },
  },
  {
    trigger: 9840,
    index: 1,
    lang: 'de',
    start: {
      time: 9840,
      hour: 0,
      mins: 0,
      secs: 9,
      ms: 840,
    },
    end: {
      time: 13360,
      hour: 0,
      mins: 0,
      secs: 13,
      ms: 360,
    },
    duration: {
      secs: 3.52,
      ms: 3520,
    },
    content: 'Ohne gute bis sehr gute\nDeutschkenntnisse geht das nicht.',
    meta: {
      original: {
        start: '00:00:09,840',
        end: '00:00:13,360',
      },
    },
  },
  {
    trigger: 13400,
    index: 2,
    lang: 'de',
    start: {
      time: 13400,
      hour: 0,
      mins: 0,
      secs: 13,
      ms: 400,
    },
    end: {
      time: 16720,
      hour: 0,
      mins: 0,
      secs: 16,
      ms: 720,
    },
    duration: {
      secs: 3.32,
      ms: 3320,
    },
    content:
      '– Aber so wie ich das sehe,\nhaben Sie schon viel Deutsch gelernt.',
    meta: {
      original: {
        start: '00:00:13,400',
        end: '00:00:16,720',
      },
    },
  },
  {
    trigger: 19240,
    index: 3,
    lang: 'de',
    start: {
      time: 19240,
      hour: 0,
      mins: 0,
      secs: 19,
      ms: 240,
    },
    end: {
      time: 20680,
      hour: 0,
      mins: 0,
      secs: 20,
      ms: 680,
    },
    duration: {
      secs: 1.44,
      ms: 1440,
    },
    content: '– Herr González?',
    meta: {
      original: {
        start: '00:00:19,240',
        end: '00:00:20,680',
      },
    },
  },
  {
    trigger: 20840,
    index: 4,
    lang: 'de',
    start: {
      time: 20840,
      hour: 0,
      mins: 0,
      secs: 20,
      ms: 840,
    },
    end: {
      time: 24600,
      hour: 0,
      mins: 0,
      secs: 24,
      ms: 600,
    },
    duration: {
      secs: 3.76,
      ms: 3760,
    },
    content: '– Hm ... ’tschuldigung,',
    meta: {
      original: {
        start: '00:00:20,840',
        end: '00:00:24,600',
      },
    },
  },
  {
    trigger: 24640,
    index: 5,
    lang: 'de',
    start: {
      time: 24640,
      hour: 0,
      mins: 0,
      secs: 24,
      ms: 640,
    },
    end: {
      time: 26840,
      hour: 0,
      mins: 0,
      secs: 26,
      ms: 840,
    },
    duration: {
      secs: 2.2,
      ms: 2200,
    },
    content: 'könnten Sie das bitte\nnoch einmal wiederholen?',
    meta: {
      original: {
        start: '00:00:24,640',
        end: '00:00:26,840',
      },
    },
  },
  {
    trigger: 26880,
    index: 6,
    lang: 'de',
    start: {
      time: 26880,
      hour: 0,
      mins: 0,
      secs: 26,
      ms: 880,
    },
    end: {
      time: 30439.999999999996,
      hour: 0,
      mins: 0,
      secs: 30,
      ms: 440,
    },
    duration: {
      secs: 3.56,
      ms: 3560,
    },
    content:
      '– Ich habe gesagt, dass Sie für viele\nAusbildungsberufe oder ein Studium',
    meta: {
      original: {
        start: '00:00:26,880',
        end: '00:00:30,440',
      },
    },
  },
  {
    trigger: 30480,
    index: 7,
    lang: 'de',
    start: {
      time: 30480,
      hour: 0,
      mins: 0,
      secs: 30,
      ms: 480,
    },
    end: {
      time: 33080,
      hour: 0,
      mins: 0,
      secs: 33,
      ms: 80,
    },
    duration: {
      secs: 2.6,
      ms: 2600,
    },
    content: 'gute bis sehr gute\nDeutschkenntnisse brauchen.',
    meta: {
      original: {
        start: '00:00:30,480',
        end: '00:00:33,080',
      },
    },
  },
  {
    trigger: 33280,
    index: 8,
    lang: 'de',
    start: {
      time: 33280,
      hour: 0,
      mins: 0,
      secs: 33,
      ms: 280,
    },
    end: {
      time: 35560,
      hour: 0,
      mins: 0,
      secs: 35,
      ms: 560,
    },
    duration: {
      secs: 2.28,
      ms: 2280,
    },
    content: '– Ich hab gerade mit\nB1-Niveau angefangen.',
    meta: {
      original: {
        start: '00:00:33,280',
        end: '00:00:35,560',
      },
    },
  },
  {
    trigger: 35600,
    index: 9,
    lang: 'de',
    start: {
      time: 35600,
      hour: 0,
      mins: 0,
      secs: 35,
      ms: 600,
    },
    end: {
      time: 37120.00000000001,
      hour: 0,
      mins: 0,
      secs: 37,
      ms: 120,
    },
    duration: {
      secs: 1.52,
      ms: 1520,
    },
    content: '– Das klingt gut.\n– Mhm.',
    meta: {
      original: {
        start: '00:00:35,600',
        end: '00:00:37,120',
      },
    },
  },
  {
    trigger: 37160,
    index: 10,
    lang: 'de',
    start: {
      time: 37160,
      hour: 0,
      mins: 0,
      secs: 37,
      ms: 160,
    },
    end: {
      time: 39000,
      hour: 0,
      mins: 0,
      secs: 39,
      ms: 0,
    },
    duration: {
      secs: 1.84,
      ms: 1840,
    },
    content: 'Haben Sie die A2-Prüfung gemacht?',
    meta: {
      original: {
        start: '00:00:37,160',
        end: '00:00:39,000',
      },
    },
  },
  {
    trigger: 39720,
    index: 11,
    lang: 'de',
    start: {
      time: 39720,
      hour: 0,
      mins: 0,
      secs: 39,
      ms: 720,
    },
    end: {
      time: 42600,
      hour: 0,
      mins: 0,
      secs: 42,
      ms: 600,
    },
    duration: {
      secs: 2.88,
      ms: 2880,
    },
    content: '[Nein.] Aber ich hab einen A2-Kurs gemacht.',
    meta: {
      original: {
        start: '00:00:39,720',
        end: '00:00:42,600',
      },
    },
  },
  {
    trigger: 42640,
    index: 12,
    lang: 'de',
    start: {
      time: 42640,
      hour: 0,
      mins: 0,
      secs: 42,
      ms: 640,
    },
    end: {
      time: 44440,
      hour: 0,
      mins: 0,
      secs: 44,
      ms: 440,
    },
    duration: {
      secs: 1.8,
      ms: 1800,
    },
    content: '– Ich bin mir sicher,\ndass Sie das können.',
    meta: {
      original: {
        start: '00:00:42,640',
        end: '00:00:44,440',
      },
    },
  },
  {
    trigger: 44480,
    index: 13,
    lang: 'de',
    start: {
      time: 44480,
      hour: 0,
      mins: 0,
      secs: 44,
      ms: 480,
    },
    end: {
      time: 47720,
      hour: 0,
      mins: 0,
      secs: 47,
      ms: 720,
    },
    duration: {
      secs: 3.24,
      ms: 3240,
    },
    content: 'Aber ich bin mir auch sicher,\ndass die meisten Betriebe',
    meta: {
      original: {
        start: '00:00:44,480',
        end: '00:00:47,720',
      },
    },
  },
  {
    trigger: 47760,
    index: 14,
    lang: 'de',
    start: {
      time: 47760,
      hour: 0,
      mins: 0,
      secs: 47,
      ms: 760,
    },
    end: {
      time: 50720,
      hour: 0,
      mins: 0,
      secs: 50,
      ms: 720,
    },
    duration: {
      secs: 2.96,
      ms: 2960,
    },
    content: 'einen Nachweis über Ihre\nDeutschkenntnisse verlangen.',
    meta: {
      original: {
        start: '00:00:47,760',
        end: '00:00:50,720',
      },
    },
  },
  {
    trigger: 50760,
    index: 15,
    lang: 'de',
    start: {
      time: 50760,
      hour: 0,
      mins: 0,
      secs: 50,
      ms: 760,
    },
    end: {
      time: 53040,
      hour: 0,
      mins: 0,
      secs: 53,
      ms: 40,
    },
    duration: {
      secs: 2.28,
      ms: 2280,
    },
    content: 'Dafür müssen Sie eine\nSprachprüfung machen.',
    meta: {
      original: {
        start: '00:00:50,760',
        end: '00:00:53,040',
      },
    },
  },
  {
    trigger: 53680,
    index: 16,
    lang: 'de',
    start: {
      time: 53680,
      hour: 0,
      mins: 0,
      secs: 53,
      ms: 680,
    },
    end: {
      time: 55800,
      hour: 0,
      mins: 0,
      secs: 55,
      ms: 800,
    },
    duration: {
      secs: 2.12,
      ms: 2120,
    },
    content: '– Okay, dann mach ich\ndiese Sprachprüfung.',
    meta: {
      original: {
        start: '00:00:53,680',
        end: '00:00:55,800',
      },
    },
  },
  {
    trigger: 55800,
    index: 17,
    lang: 'de',
    start: {
      time: 55800,
      hour: 0,
      mins: 0,
      secs: 55,
      ms: 800,
    },
    end: {
      time: 57360,
      hour: 0,
      mins: 0,
      secs: 57,
      ms: 360,
    },
    duration: {
      secs: 1.56,
      ms: 1560,
    },
    content: 'Und dann kann ich eine Ausbildung machen?',
    meta: {
      original: {
        start: '00:00:55,800',
        end: '00:00:57,360',
      },
    },
  },
  {
    trigger: 57520,
    index: 18,
    lang: 'de',
    start: {
      time: 57520,
      hour: 0,
      mins: 0,
      secs: 57,
      ms: 520,
    },
    end: {
      time: 58760.00000000001,
      hour: 0,
      mins: 0,
      secs: 58,
      ms: 760,
    },
    duration: {
      secs: 1.24,
      ms: 1240,
    },
    content: '– Mal sehen.',
    meta: {
      original: {
        start: '00:00:57,520',
        end: '00:00:58,760',
      },
    },
  },
  {
    trigger: 58800,
    index: 19,
    lang: 'de',
    start: {
      time: 58800,
      hour: 0,
      mins: 0,
      secs: 58,
      ms: 800,
    },
    end: {
      time: 61040,
      hour: 0,
      mins: 1,
      secs: 1,
      ms: 40,
    },
    duration: {
      secs: 2.24,
      ms: 2240,
    },
    content: 'Welchen Beruf möchten\nSie denn lernen?',
    meta: {
      original: {
        start: '00:00:58,800',
        end: '00:01:01,040',
      },
    },
  },
  {
    trigger: 61080,
    index: 20,
    lang: 'de',
    start: {
      time: 61080,
      hour: 0,
      mins: 1,
      secs: 1,
      ms: 80,
    },
    end: {
      time: 62400,
      hour: 0,
      mins: 1,
      secs: 2,
      ms: 400,
    },
    duration: {
      secs: 1.32,
      ms: 1320,
    },
    content: '– Ich bin mir nicht sicher.',
    meta: {
      original: {
        start: '00:01:01,080',
        end: '00:01:02,400',
      },
    },
  },
  {
    trigger: 62600,
    index: 21,
    lang: 'de',
    start: {
      time: 62600,
      hour: 0,
      mins: 1,
      secs: 2,
      ms: 600,
    },
    end: {
      time: 64360,
      hour: 0,
      mins: 1,
      secs: 4,
      ms: 360,
    },
    duration: {
      secs: 1.76,
      ms: 1760,
    },
    content: '– Sie sind sich unsicher?\n– Mhm.',
    meta: {
      original: {
        start: '00:01:02,600',
        end: '00:01:04,360',
      },
    },
  },
  {
    trigger: 64840,
    index: 22,
    lang: 'de',
    start: {
      time: 64840,
      hour: 0,
      mins: 1,
      secs: 4,
      ms: 840,
    },
    end: {
      time: 67160,
      hour: 0,
      mins: 1,
      secs: 7,
      ms: 160,
    },
    duration: {
      secs: 2.32,
      ms: 2320,
    },
    content: 'Gibt es eine\nSchauspiel-Ausbildung?',
    meta: {
      original: {
        start: '00:01:04,840',
        end: '00:01:07,160',
      },
    },
  },
  {
    trigger: 67480,
    index: 23,
    lang: 'de',
    start: {
      time: 67480,
      hour: 0,
      mins: 1,
      secs: 7,
      ms: 480,
    },
    end: {
      time: 70720,
      hour: 0,
      mins: 1,
      secs: 10,
      ms: 720,
    },
    duration: {
      secs: 3.24,
      ms: 3240,
    },
    content: '–  Sie können in Deutschland eine\nSchauspielschule besuchen.',
    meta: {
      original: {
        start: '00:01:07,480',
        end: '00:01:10,720',
      },
    },
  },
  {
    trigger: 70760,
    index: 24,
    lang: 'de',
    start: {
      time: 70760,
      hour: 0,
      mins: 1,
      secs: 10,
      ms: 760,
    },
    end: {
      time: 73720,
      hour: 0,
      mins: 1,
      secs: 13,
      ms: 720,
    },
    duration: {
      secs: 2.96,
      ms: 2960,
    },
    content: 'Aber da gibt es eine sehr schwere\nAufnahmeprüfung.',
    meta: {
      original: {
        start: '00:01:10,760',
        end: '00:01:13,720',
      },
    },
  },
  {
    trigger: 74080,
    index: 25,
    lang: 'de',
    start: {
      time: 74080,
      hour: 0,
      mins: 1,
      secs: 14,
      ms: 80,
    },
    end: {
      time: 76640,
      hour: 0,
      mins: 1,
      secs: 16,
      ms: 640,
    },
    duration: {
      secs: 2.56,
      ms: 2560,
    },
    content: 'Niemand kann Ihnen garantieren,\ndass Sie nach der Ausbildung',
    meta: {
      original: {
        start: '00:01:14,080',
        end: '00:01:16,640',
      },
    },
  },
  {
    trigger: 76680,
    index: 26,
    lang: 'de',
    start: {
      time: 76680,
      hour: 0,
      mins: 1,
      secs: 16,
      ms: 680,
    },
    end: {
      time: 78560,
      hour: 0,
      mins: 1,
      secs: 18,
      ms: 560,
    },
    duration: {
      secs: 1.88,
      ms: 1880,
    },
    content: 'auch als Schauspieler arbeiten können.',
    meta: {
      original: {
        start: '00:01:16,680',
        end: '00:01:18,560',
      },
    },
  },
  {
    trigger: 78600,
    index: 27,
    lang: 'de',
    start: {
      time: 78600,
      hour: 0,
      mins: 1,
      secs: 18,
      ms: 600,
    },
    end: {
      time: 82119.99999999999,
      hour: 0,
      mins: 1,
      secs: 22,
      ms: 120,
    },
    duration: {
      secs: 3.52,
      ms: 3520,
    },
    content:
      'Die Situation auf dem Arbeitsmarkt\nist für Schauspieler sehr schwierig.',
    meta: {
      original: {
        start: '00:01:18,600',
        end: '00:01:22,120',
      },
    },
  },
  {
    trigger: 82160,
    index: 28,
    lang: 'de',
    start: {
      time: 82160,
      hour: 0,
      mins: 1,
      secs: 22,
      ms: 160,
    },
    end: {
      time: 83920,
      hour: 0,
      mins: 1,
      secs: 23,
      ms: 920,
    },
    duration: {
      secs: 1.76,
      ms: 1760,
    },
    content: '– Hab ich schon gehört, ja.',
    meta: {
      original: {
        start: '00:01:22,160',
        end: '00:01:23,920',
      },
    },
  },
  {
    trigger: 84000,
    index: 29,
    lang: 'de',
    start: {
      time: 84000,
      hour: 0,
      mins: 1,
      secs: 24,
      ms: 0,
    },
    end: {
      time: 86240,
      hour: 0,
      mins: 1,
      secs: 26,
      ms: 240,
    },
    duration: {
      secs: 2.24,
      ms: 2240,
    },
    content: '– Sie können es natürlich versuchen.',
    meta: {
      original: {
        start: '00:01:24,000',
        end: '00:01:26,240',
      },
    },
  },
  {
    trigger: 86440,
    index: 30,
    lang: 'de',
    start: {
      time: 86440,
      hour: 0,
      mins: 1,
      secs: 26,
      ms: 440,
    },
    end: {
      time: 88679.99999999999,
      hour: 0,
      mins: 1,
      secs: 28,
      ms: 680,
    },
    duration: {
      secs: 2.24,
      ms: 2240,
    },
    content: 'Haben Sie denn vielleicht noch\nandere Interessen?',
    meta: {
      original: {
        start: '00:01:26,440',
        end: '00:01:28,680',
      },
    },
  },
  {
    trigger: 88720,
    index: 31,
    lang: 'de',
    start: {
      time: 88720,
      hour: 0,
      mins: 1,
      secs: 28,
      ms: 720,
    },
    end: {
      time: 91120,
      hour: 0,
      mins: 1,
      secs: 31,
      ms: 120,
    },
    duration: {
      secs: 2.4,
      ms: 2400,
    },
    content: 'Oder gibt es etwas,\ndas Sie sehr gut können?',
    meta: {
      original: {
        start: '00:01:28,720',
        end: '00:01:31,120',
      },
    },
  },
  {
    trigger: 91160,
    index: 32,
    lang: 'de',
    start: {
      time: 91160,
      hour: 0,
      mins: 1,
      secs: 31,
      ms: 160,
    },
    end: {
      time: 95479.99999999999,
      hour: 0,
      mins: 1,
      secs: 35,
      ms: 480,
    },
    duration: {
      secs: 4.32,
      ms: 4320,
    },
    content: '– Ja! Ich kann Fahrräder\nund Mopeds reparieren.',
    meta: {
      original: {
        start: '00:01:31,160',
        end: '00:01:35,480',
      },
    },
  },
];
