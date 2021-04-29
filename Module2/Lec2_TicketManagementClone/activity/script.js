let filterCodes = {
  blue: "#00a8ff",
  yellow: "#fbc531",
  green: "#4cd137",
  black: "#2f3640",
};

let allFilters = document.querySelectorAll(".filter");
let ticketsContent = document.querySelector(".tickets-content");
let modalOpen = document.querySelector(".open-modal");
let modalClose = document.querySelector(".close-modal");
for (let i = 0; i < allFilters.length; i++) {
  allFilters[i].addEventListener("click", function (e) {
    let filterSelected = e.target.classList[1];
    // if clicked on already active filter element then return !!
    if (e.target.classList.contains("active-filter")) {
      e.target.classList.remove("active-filter");
      ticketsContent.style.background = "#dcdde1";
      return;
    }

    // if active filter class is already on some element then delte class froim that element
    if (document.querySelector(".active-filter")) {
      document
        .querySelector(".active-filter")
        .classList.remove("active-filter");
    }
    e.target.classList.add("active-filter");
    // it will change tickets content ka background !!

    ticketsContent.style.background = filterCodes[filterSelected];
  });
}

modalOpen.addEventListener("click", function (e) {
  // append html of modal in ticketsContent

  // <div class="modal">
  //         <div class="modal-text" spellcheck="false" contenteditable="true"></div>
  //         <div class="modal-filter-options">
  //             <div class="modal-filter blue"></div>
  //             <div class="modal-filter yellow"></div>
  //             <div class="modal-filter green"></div>
  //             <div class="modal-filter black"></div>
  //         </div>
  //     </div>
  if(document.querySelector(".modal")){
      return;
  }

  let modalDiv = document.createElement("div");
  // <div></div>
  modalDiv.classList.add("modal");
  // <div class="modal"></div>

  modalDiv.innerHTML = `<div class="modal-text" spellcheck="false" contenteditable="true"></div>
            <div class="modal-filter-options">
                <div class="modal-filter blue"></div>
                <div class="modal-filter yellow"></div>
                <div class="modal-filter green"></div>
                <div class="modal-filter black"></div>
            </div>`;

  ticketsContent.append(modalDiv);
});

modalClose.addEventListener("click" , function(e){
    if(document.querySelector(".modal")){
        document.querySelector(".modal").remove();
    }
})
