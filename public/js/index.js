const container = document.querySelector(".container");
const fragment = document.createDocumentFragment();
const colorWrapper = document.querySelector(".color-wrapper");
const resetBtn = document.querySelector(".reset-btn");
const loaderItem = Array.from(document.querySelectorAll("#loader .pixel"));

let brushColor = null;
let prevBrushNode = null;
let pixels = [];
let loaderId = null;
let noOfPixels = window.innerWidth > 767 ? 5000 : 1400;
const boxShadow =
  "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset";

const renderPixel = () => {
  let id = 0;
  function createBox() {
    let pixel = document.createElement("div");
    pixel.classList.add("pixel");
    pixel.setAttribute("id", id);
    id++;
    return pixel;
  }

  for (let i = 0; i < noOfPixels; i++) {
    let pix = createBox();
    pixels.push(pix);
    fragment.appendChild(pix);
  }
  return fragment;
};

(function () {
  let idx = 0;
  loaderId = setInterval(() => {
    loaderItem[idx].style.transform = "scale(1.4)";
    loaderItem[idx].style.boxShadow =
      "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px";

    if (idx > 0) {
      loaderItem[idx - 1].style.transform = "scale(1)";
      loaderItem[idx - 1].style.boxShadow = "none";
    }
    if (idx == 0) {
      loaderItem[loaderItem.length - 1].style.transform = "scale(1)";
      loaderItem[loaderItem.length - 1].style.boxShadow = "none";
    }
    idx < loaderItem.length - 1 ? idx++ : (idx = 0);
  }, 600);
  let fragment = renderPixel();
  if (fragment) {
    setTimeout(() => {
      clearInterval(loaderId);
      document.querySelector("#loader").style.display = "none";
      container.appendChild(fragment);
      colorWrapper.style.display = "flex";
    }, 2000);
  }
})();

colorWrapper.addEventListener("click", (event) => {
  if (event.target.classList[0] == "pixel") {
    brushColor = event.target.dataset["color"];
    if (prevBrushNode) {
      prevBrushNode.classList.remove("active");
    }
    prevBrushNode = event.target;
    prevBrushNode.classList.add("active");
  }
});

function fillColor(event) {
  if (event.target.classList.value == "pixel") {
    event.target.style.backgroundColor = brushColor;
    event.target.style.borderColor = brushColor;
    event.target.style.boxShadow = boxShadow;
  }
}

container.addEventListener("click", fillColor);

container.addEventListener("dragover", fillColor);

container.addEventListener("dragenter", fillColor);

container.addEventListener("dragleave", fillColor);

resetBtn.addEventListener("click", () => {
  for (let i = 0; i < noOfPixels; i++) {
    pixels[i].style.backgroundColor = "#fff";
    pixels[i].style.borderColor = "rgba(100, 100, 100, 0.404)";
    pixels[i].style.boxShadow = 'none';
  }
});
