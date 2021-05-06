let filterCodes = {
  blue: "#3498db",
  yellow: "#f1c40f",
  green: "#2ecc71",
  black: "#2c3e50",
};

let allFilters = document.querySelectorAll(".filter");
let ticketsContent = document.querySelector(".tickets-content");
let modalOpen = document.querySelector(".open-modal");
let modalClose = document.querySelector(".close-modal");
let activeModalFilter = "black";

function initTickets() {
  let allTickets = JSON.parse(localStorage.getItem("allTickets"));
  if (!allTickets) {
    localStorage.setItem("allTickets", JSON.stringify([]));
    return;
  }
  // if tickets are present
  for (let i = 0; i < allTickets.length; i++) {
    let ticketObject = allTickets[i];
    appendTicketToUi(ticketObject);
  }
  console.log("tickets found !!!");
}
initTickets();

function appendTicketToUi(ticketObject) {
  let { ticketId, ticketText, ticketFilter } = ticketObject;

  let ticketDiv = document.createElement("div");
  ticketDiv.classList.add("ticket");

  ticketDiv.innerHTML = `<div id=${ticketId} class="ticket-filter ${ticketFilter}"></div>
  <div class="ticket-content">
      <div class="ticket-info">
      <div class="ticket-id">#${ticketId}</div>
      <div class="ticket-delete"><i ticketId = ${ticketId} class="fas fa-trash ${ticketFilter}"></i></div>
      </div>
      <div class="ticket-text">${ticketText}</div>
  </div>`;

  // ticket delete
  ticketDiv.querySelector(".ticket-delete").addEventListener("click" , function(e){
    let ticketId = e.target.getAttribute("ticketId");
    // console.log(ticketId);
    // UI se remove
    ticketDiv.remove();

    let allTickets = JSON.parse(localStorage.getItem("allTickets"));
    let filteredTickets = allTickets.filter(function(ticketObj){
      return ticketObj.ticketId != ticketId;
    })

    localStorage.setItem("allTickets" , JSON.stringify(filteredTickets));
  })

// ticket filter change
  ticketDiv
    .querySelector(".ticket-filter")
    .addEventListener("click", function (e) {
      let ticketFilters = ["blue", "yellow", "green", "black"];
      let currentFilter = e.target.classList[1];
      let idx = ticketFilters.indexOf(currentFilter);
      idx++;
      idx = idx % 4;

      e.target.classList.remove(currentFilter);
      e.target.classList.add(ticketFilters[idx]);

      let ticketId = e.target.id;
      let allTickets = JSON.parse(localStorage.getItem("allTickets"));
      for (let i = 0; i < allTickets.length; i++) {
        if (allTickets[i].ticketId == ticketId) {
          allTickets[i].ticketFilter = ticketFilters[idx];
          break;
        }
      }
      localStorage.setItem("allTickets", JSON.stringify(allTickets));
    });

  // append that ticket Div in ticketContent
  ticketsContent.append(ticketDiv);
}
