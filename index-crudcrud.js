function handleFormSubmit(event) {
    event.preventDefault();
    const userDetails = {
      username: event.target.username.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
    };
    axios
      .post(
        "https://crudcrud.com/api/3166038a3ec14b29a34984863f1422f2/appointmentData",
        userDetails
      )
      .then((response) => displayUserOnScreen(response.data))
      .catch((error) => console.log(error));
  
    // Clearing the input fields
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
  }
  
  function displayUserOnScreen(userDetails) {
    const userItem = document.createElement("li");
    userItem.id = userDetails._id
    userItem.appendChild(
      document.createTextNode(
        `${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`
      )
    );
  
    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Delete"));
    userItem.appendChild(deleteBtn);
  
    const editBtn = document.createElement("button");
    editBtn.appendChild(document.createTextNode("Edit"));
    userItem.appendChild(editBtn);
  
    const userList = document.querySelector("ul");
    userList.appendChild(userItem);
  
    deleteBtn.addEventListener("click", function (event) {

      console.log("idd dele: ",event.target.parentElement.id)

      axios.delete('https://crudcrud.com/api/3166038a3ec14b29a34984863f1422f2/appointmentData/'+event.target.parentElement.id)
      .then((d)=>{
        console.log("deleted ",d)
        userList.removeChild(event.target.parentElement);
        localStorage.removeItem(userDetails.email);
      }).catch((e)=>console.log("error while deleting ",e))


    });
  
    editBtn.addEventListener("click", function (event) {
      userList.removeChild(event.target.parentElement);
      localStorage.removeItem(userDetails.email);
      document.getElementById("username").value = userDetails.username;
      document.getElementById("email").value = userDetails.email;
      document.getElementById("phone").value = userDetails.phone;
    });
  }
  

  document.addEventListener("DOMContentLoaded",()=>{

    let ullist = document.querySelector('ul')
    axios.get('https://crudcrud.com/api/3166038a3ec14b29a34984863f1422f2/appointmentData')
    .then((d)=>{
      console.log("data ",d.data)
      let details = d.data
      for(let i=0;i<details.length;i++){
        displayUserOnScreen(details[i])
      }
      


    }).catch((e)=>{
      console.log("error ",e)
    })

  })

  // Do not touch code below
  module.exports = handleFormSubmit;
  