const tiles = document.querySelectorAll("#container div");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const para = document.getElementById("para");
const h = document.getElementById("h");

let selected = [];

function shuffleImages() {
  const images = [
    "img1", "img2", "img3", "img4", "img5"
  ];

  const duplicate = images[Math.floor(Math.random() * images.length)];
  images.push(duplicate);

  images.sort(() => Math.random() - 0.5);

  tiles.forEach((tile, i) => {
    tile.className = images[i];
  });
}

tiles.forEach(tile => {
  tile.addEventListener("click", () => {
    if (selected.length === 2 || selected.includes(tile)) return;

    tile.classList.add("selected");
    selected.push(tile);
    resetBtn.style.display = "inline-block";

    if (selected.length === 2) {
      verifyBtn.style.display = "inline-block";
    }
  });
});

verifyBtn.addEventListener("click", () => {
  verifyBtn.style.display = "none";

  if (selected[0].className === selected[1].className) {
    para.textContent = "You are a human. Congratulations!";
  } else {
    para.textContent =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }
});

resetBtn.addEventListener("click", () => {
  selected.forEach(t => t.classList.remove("selected"));
  selected = [];
  para.textContent = "";
  verifyBtn.style.display = "none";
  resetBtn.style.display = "none";
  h.textContent =
    "Please click on the identical tiles to verify that you are not a robot.";
  shuffleImages();
});

shuffleImages();
