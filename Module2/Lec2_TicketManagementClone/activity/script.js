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
  if (document.querySelector(".modal")) {
    return;
  }

  let modalDiv = document.createElement("div");
  // <div></div>
  modalDiv.classList.add("modal");
  // <div class="modal"></div>
  modalDiv.innerHTML = `<div class="modal-text" spellcheck="false" contenteditable="true" data-typed="false">Enter your text here !</div>
            <div class="modal-filter-options">
                <div class="modal-filter blue"></div>
                <div class="modal-filter yellow"></div>
                <div class="modal-filter green"></div>
                <div class="modal-filter black active-filter"></div>
            </div>`;
  modalDiv.querySelector(".modal-text").addEventListener("keypress" , function(e){
    // if key is enter then append the ticket and close the modal
    if(e.key == "Enter" && e.target.getAttribute("data-typed") == "true" ){
      appendTicket(e.target.textContent);
      return;
    }
    if(e.target.getAttribute("data-typed") == "true"){
        return;
    } 
    e.target.textContent = "";
    e.target.setAttribute("data-typed" , "true");
  })
  modalDiv.querySelector(".modal-filter-options").addEventListener("click" , function(e){
    // console.log(e);
      let modalFilter = e.target;
      if(modalFilter.classList.contains("active-filter") || modalFilter.classList.contains("modal-filter-options")){
          return;
      }

      document.querySelector(".modal-filter.active-filter").classList.remove("active-filter");
      modalFilter.classList.add("active-filter");
      
      activeModalFilter = modalFilter.classList[1];
  })

  ticketsContent.append(modalDiv);
});
modalClose.addEventListener("click", closeModal);

function closeModal(e){
  if (document.querySelector(".modal")) {
    document.querySelector(".modal").remove();
  }
}

function appendTicket(ticketText){
  if(!ticketText.length){
    return;
  }
  // create a ticket dynamically
  let ticketDiv = document.createElement("div");
  ticketDiv.classList.add("ticket");

  let ticketId = uid();
  ticketDiv.innerHTML = `<div id=${ticketId} class="ticket-filter ${activeModalFilter}"></div>
  <div class="ticket-content">
      <div class="ticket-id">#${ticketId}</div>
      <div class="ticket-text">${ticketText}</div>
  </div>`;

  // to toggle filter of ticket !
  ticketDiv.querySelector(".ticket-filter").addEventListener("click" , function(e){
    let ticketFilters = [ "blue" , "yellow" , "green" , "black" ];
    let currentFilter = e.target.classList[1];
    let idx = ticketFilters.indexOf(currentFilter);
    idx++;
    idx = idx%4;

    e.target.classList.remove(currentFilter);
    e.target.classList.add(ticketFilters[idx]);
  })

  // append that ticket Div in ticketContent
  ticketsContent.append(ticketDiv);

    // close Modal when ticket appended !!
    closeModal();
    
    // add ticketObject to allTickets
    let ticketObject = {
      ticketId:ticketId,
      ticketText:ticketText,
      ticketFilter:activeModalFilter
    }
    let allTickets = JSON.parse(localStorage.getItem("allTickets"));
    allTickets.push(ticketObject);
    localStorage.setItem("allTickets" , JSON.stringify(allTickets));
    
    //reset active modal filter
    activeModalFilter = "black";
}