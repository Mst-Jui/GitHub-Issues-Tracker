
let allIssues = [];


const removeActive=()=>{
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((btn)=> btn.classList.remove("btn-primary"));
  
};

const loadingSpinner=(status)=>{
  if(status === true){
    document.getElementById("loading-spinner").classList.remove("hidden");
    document.getElementById("all-container").classList.add("hidden");
  }
  else{
     document.getElementById("all-container").classList.remove("hidden");
     document.getElementById("loading-spinner").classList.add("hidden");
  }
}


// 1 
const loadAll=async()=>{
  removeActive();
  loadingSpinner(true);
  const allBtn = document.getElementById("all-btn");
  allBtn.classList.add("btn-primary");
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  const res = await fetch(url);
  const data = await res.json()
  displayAll(data.data);
  
};


// 2
const displayAll=(data)=>{
  loadingSpinner(false);
  allIssues = data;
  updateIssueCount(data);
  const allContainer = document.getElementById("all-container");
  allContainer.innerHTML = "";
  data.forEach((info)=>{
    const div = document.createElement("div");
    // status 
    let statusColor = info.status === "open" ? "green" : "purple";
    let bag = info.priority === "high, Medium"  || info.priority === "medium"
    ? "./assets/Open-Status.png"
    : "./assets/Closed- Status .png";
    // Determine priority color dynamically
    let priorityColor = "green";
    if(info.priority === "high"){
      priorityColor = "red";
    }
    else if(info.priority === "medium"){
      priorityColor = "yellow"
    }
    else if(info.priority === "low"){
      priorityColor = "gray"
    }
     // Create badges dynamically from labels array
    const labelsHTML = info.labels
    .map((label)=>{
      let color = "yellow";
      let icon = "fa-solid fa-bug";
      if(label.toLowerCase() === "bug"){
        color = "red";
        icon = "fa-solid fa-bug";
      }
      else if(label.toLowerCase() === "help wanted"){
        color = "yellow";
        icon = "fa-regular fa-life-ring"; 
      }
      else if(label.toLowerCase()=== "enhancement"){
        color = "green";
        icon = "fa-regular fa-star";
      }
      else if (label.toLowerCase()=== "documentation"){
         color = "blue";
         icon = "fa-regular fa-file";
      }
      else if(label.toLowerCase() === "good first issue"){
        color = "purple"
        icon = "fa-brands fa-jira"
      }

       return`
         <div class="flex justify-between items-start bg-${color}-100 px-2 py-1 rounded-2xl text-[13px] text-${color}-400 border border-${color}-400 font-medium gap-1">
            <span><i class="${icon}"></i></span>
            <span>${label}</span>
          </div>

    `;
        
    })
   
   .join('')
  
    div.innerHTML = `
     <div>
        <div>
        <div onclick="openModal(${info.id})" class="bg-white shadow-md p-4 rounded-md space-y-2 border-t-4 border-${statusColor}-500">
          <!-- icon & high  -->
          <div class="flex justify-between items-center">
          <img src="${bag}" alt="">
          <p class="bg-${priorityColor}-100 px-3 py-1 rounded-2xl text-${priorityColor}-400">${info.priority}</p>
          </div>
        <!-- title & paragraph  -->
        <div class="space-y-2">
          <h2 class="font-semibold">${info.title}</h2>
          <p class="text-gray-400 line-clamp-2">${info.description}</p>
        </div>
        <!-- badge  -->
        <div class="flex justify-between items-center mb-6">
          ${labelsHTML}
          
         </div>
         <!-- date  -->
        <div class="py-2 border-t border-t-gray-200">
            <p class="text-gray-400">#${info.id}by <span>${info.author}</span></p>
             <p class="text-gray-400">
         Assignee: 
          <span class="font-medium">
      ${info.assignee ? info.assignee : "Unassigned"}
       </span>
       </p>
            <time class="text-gray-400" datetime="${info.createdAt}">${info.updatedAt}</time>
          </div>
        </div>
        </div>
      </div>
    `
   
    
    allContainer.append(div);
});
};

// 3 Show Open Issues
const showOpen = async () => {
  removeActive();
  loadingSpinner(true);
  const clickBtn = document.getElementById("btn-open");
  clickBtn.classList.add("btn-primary");
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  const res = await fetch(url);
  const data = await res.json();
  const openIssues = data.data.filter((issue) => issue.status === "open");
  displayAll(openIssues);
};

// 4. Show Closed Issues
const showClosed = async () => {
  removeActive();
  loadingSpinner(true);
  const clickBtn = document.getElementById("btn-close");
  clickBtn.classList.add("btn-primary");
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  const res = await fetch(url);
  const data = await res.json();
  const closedIssues = data.data.filter((issue) => issue.status === "closed");
  displayAll(closedIssues);
};

// 5 load modal 
const cardDetailModal = document.getElementById("card-detail-modal");
const openModal=async(id)=>{
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
  const res = await fetch(url);
  const data = await res.json();
  showModal(data.data)
  cardDetailModal.showModal()
}

// 6 show modal 
const showModal=(data)=>{
  const modalContainer = document.getElementById("modal-container");
  // status 
  const statusColor =
    data.status.toLowerCase() === "open" ? "bg-green-500" : "bg-purple-500";

    // labels 
    const labelsHTML = data.labels.map((label) => {

  let color = "yellow";
  let icon = "fa-solid fa-bug";

  if(label.toLowerCase() === "bug"){
    color = "red";
    icon = "fa-solid fa-bug";
  }
  else if(label.toLowerCase() === "help wanted"){
    color = "yellow";
    icon = "fa-regular fa-life-ring";
  }
  else if(label.toLowerCase() === "enhancement"){
    color = "green";
    icon = "fa-regular fa-star";
  }
  else if(label.toLowerCase() === "documentation"){
    color = "blue";
    icon = "fa-regular fa-file";
  }
  else if(label.toLowerCase() === "good first issue"){
    color = "purple";
    icon = "fa-brands fa-jira";
  }

  return `
  <span class="flex items-center gap-1 bg-${color}-100 text-${color}-500 px-3 py-1 rounded-full text-sm border border-${color}-400">
    <i class="${icon}"></i>
    ${label}
  </span>
  `;

}).join("");

  modalContainer.innerHTML = `
  
  <h2 class="text-2xl font-bold mb-3">${data.title}</h2>

  <div class="flex items-center gap-2 mb-3">
   <span class="${statusColor} text-white px-2 py-1 rounded-full text-sm">
      ${data.status}
    </span>
    

    <p class="text-gray-500">
     • Opened by ${data.author} • ${data.createdAt}
    </p>
  </div>

  <div class="flex gap-2 mb-4">
   ${labelsHTML}
</div>

  <p class="text-gray-600 mb-5">
    ${data.description}
  </p>

  <div class="bg-gray-100 p-4 rounded flex justify-between">
    
    <div>
      <p class="text-gray-400 text-sm">Assignee:</p>
      <p class="font-semibold">${data.assignee || "Not Assigned"}</p>
    </div>

    <div>
      <p class="text-gray-400 text-sm">Priority:</p>
      <span class="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
        ${data.priority.toUpperCase()}
      </span>
    </div>
      
  </div>

   <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button, it will close the modal -->
        <button class="btn outline-none btn-primary">Close</button>
      </form>
    </div>

  `;
};
  



// 7 update count  

const updateIssueCount =(data)=>{
  
  const countElement = document.getElementById("issue-count");
  countElement.textContent = `${data.length} Issues`
  
}

// 8 search function 

const search=async()=>{
  removeActive()
  const inputSearch = document.getElementById("input-search");
  const inputSearchValue = inputSearch.value.trim().toLowerCase();
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${inputSearchValue}`
  const res = await fetch(url);
  const data = await res.json();
  displayAll(data.data);
}



loadAll();
displayAll();





 