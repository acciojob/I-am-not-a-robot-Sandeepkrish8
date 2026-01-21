//your code here
const images = [
  "https://via.placeholder.com/120/ff0000",
  "https://via.placeholder.com/120/00ff00",
  "https://via.placeholder.com/120/0000ff",
  "https://via.placeholder.com/120/ffff00",
  "https://via.placeholder.com/120/ff00ff"
];

const container = document.getElementById("container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const message = document.getElementById("h");
const result = document.getElementById("para");

let selected = [];

/* ---------- Utility ---------- */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* ---------- Setup ---------- */
function init() {
  container.innerHTML = "";
  selected = [];
  result.textContent = "";
  verifyBtn.style.display = "none";
  resetBtn.style.display = "none";

  message.textContent =
    "Please click on the identical tiles to verify that you are not a robot.";

  // pick one image to duplicate
  const duplicate = images[Math.floor(Math.random() * images.length)];
  const tiles = shuffle([...images, duplicate]);

  tiles.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.dataset.id = src;

    img.addEventListener("click", () => handleClick(img));
    container.appendChild(img);
  });
}

/* ---------- Click Handling ---------- */
function handleClick(img) {
  if (selected.length === 2) return;
  if (selected.includes(img)) return;

  img.classList.add("selected");
  selected.push(img);

  resetBtn.style.display = "inline-block";

  if (selected.length === 2) {
    verifyBtn.style.display = "inline-block";
  }
}

/* ---------- Verify ---------- */
verifyBtn.addEventListener("click", () => {
  verifyBtn.style.display = "none";

  const [first, second] = selected;

  if (first.dataset.id === second.dataset.id) {
    result.textContent = "You are a human. Congratulations!";
  } else {
    result.textContent =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }
});

/* ---------- Reset ---------- */
resetBtn.addEventListener("click", init);

/* ---------- Start ---------- */
init();
