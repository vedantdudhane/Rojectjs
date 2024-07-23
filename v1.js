// var state = {
//     taskList = [
//         {
//             ImgURL: "",
//             TaskTitle: "",
//             TaskType: "",
//             TaskDescp: "",
//         },
//          {
//             ImgURL: "",
//             TaskTitle: "",
//             TaskType: "",
//             TaskDescp: "",
//         },
//          {
//             ImgURL: "",
//             TaskTitle: "",
//             TaskType: "",
//             TaskDescp: "",
//         },
//          {
//             ImgURL: "",
//             TaskTitle: "",
//             TaskType: "",
//             TaskDescp: "",
//         },
//          {
//             ImgURL: "",
//             TaskTitle: "",
//             TaskType: "",
//             TaskDescp: "",
//         },
//     ],
// };

const state = {
    taskList: [],
};
//Dom Operations        
const taskContents = document.querySelector(".task_contents")
const taskModal = document.querySelector(".task_modal_body")

    // Template for the card on the screen
    
    const htmltaskContent =({id, title, type, description, url}) => `
    <div class ='col-md-6 col-lg-4 mt-3' id =${id}>
    <div class='card shadow-sm task__card'>
        <div class='card-header d-flex justify-content-end task__card__header'>
            <button type="button" class="btn btn-outline-primary mr-1" name=${id}>
                <i class="fa-solid fa-pencil"></i>
            </button>
            <button type="button" class="btn btn-outline-danger mr-1" name=${id} onclick='deleteTask.apply(this,arguments)'>
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>

        <div class='card-body'>
        ${
            url 
           ? `<img src= ${url} width='100%' class='card-img-top md-3 rounded-lg' />`
           :  `<img src="https://tse1.mm.bing.net/th?id=OIP.F00dCf4bXxX0J-qEEf4qIQHaD6&pid=Api&rs=1&c=1&qlt=95&w=208&h=109" width='100%' class='card-img-top md-3 rounded-lg' />`
        }
        <h4 class='card-title d-flex justify-content-start task__card__title'>${title}</h4>
        <p class='card-text' task__card__desc text-muted>${description}</p>
        <div class="tags text-white d-flex flex-wrap">
            <span class='badge bg-primary m-1'>${type}</span>
        </div>
          </div>
          <div class='card-footer text-muted'>
          <button type='button' class='btn btn-outline-primary float-right' data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick='openTask.apply(this,arguments)' id=${id}>Open task</button>

          </div>
    </div>
    </div>
    
   ` ;

   //modal body => click on open task   
     const htmlModalContent =({id, title, url, description}) =>{
        const date = new Date(parseInt(id))
        return `
        <div id=${id}
          ${
            url 
           ? `<img src= ${url} width='100%' class='card-img-top md-3 rounded-lg' />`
           :  `<img src="https://tse1.mm.bing.net/th?id=OIP.F00dCf4bXxX0J-qEEf4qIQHaD6&pid=Api&rs=1&c=1&qlt=95&w=208&h=109" width='100%' class='card-img-top md-3 rounded-lg' />`
        }
        <strong class='text-muted text-sm'>Created on: ${date.toDateString()}</strong>
        <h2 class='my-3'>${title}</h2>
        <p class='text-muted'>${description}</p>
        </div>  
        `;
     };
     
     const updateLocalStorage = () =>{
        localStorage.setItem(
            "task",
            JSON.stringify({    
                tasks: state.taskList,
            })
        );
     };

    //  load initial data
    const loadInitialdata = () =>{
        const localStorageCopy =  JSON.parse(localStorage.task);
        if (localStorageCopy) state.taskList = localStorageCopy.task

         state.taskList.map((cardDate) =>{
        taskContents.insertAdjacentHTML("beforeend",htmltaskContent(cardDate));
    });
    };

//       when we update or edit add save changes
    const handleSubmit = (event) =>{
        const id= `${Date.now()}`
        const input = {
            url : document.getElementById("ImgUrl").value,
            title : document.getElementById("TitleText").value,
            type : document.getElementById("tags").value,
            description : document.getElementById("taskDescription").value,
        };
        // if(input.title===""  || input.type===""   ||  input.description===""){
        //     return alert("please fill necessary things ");
        // };
        taskContents.insertAdjacentHTML("beforeend", htmltaskContent({...input, id})
    );
        state.taskList.push({...input, id});
        updateLocalStorage();
    };
    // open task
   const openTask = (e) => {
//   if (!e) e = window.event;

  const getTask = state.taskList.find(({ id }) => id === e.target.id);
  taskModal.innerHTML = htmlModalContent(getTask);
console.log.apply("corect")
};
const deleteTask = (e) => {
//   if (!e) e = window.event;

 
};