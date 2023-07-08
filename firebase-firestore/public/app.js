const { auth, provider, signInWithPopup, signOut, onAuthStateChanged } = window.AUTH;
console.log(AUTH, DB)
const whenSin = document.querySelector('#when-s-in');
const whenSout = document.querySelector('#when-s-out');

const sOutBtn = document.querySelector('#s-out-btn');
const sInBtn = document.querySelector('#s-in-btn');
const details = document.querySelector("#user-details");

sInBtn.onclick = () => {
  signInWithPopup(auth, provider);
};
sOutBtn.onclick = () => {
  signOut(auth);
};

onAuthStateChanged(auth, (user) => {
  console.log(user)
  if(user) {
    details.innerHTML = `Hello ${user.displayName}`;
    whenSin.hidden = false;
    whenSout.hidden = true;
  } else {
    // user not logged in
    whenSin.hidden = true;
    whenSout.hidden = false;

    details.innerHTML = ``;
  }
})

console.log({
  whenSout,
  whenSin,
  provider,
  whenSin,
  whenSout,
  sInBtn,
  sOutBtn,
});
