
// const bookingdetailscontainer=document.querySelector(".bookingdetails");
// const userdetailscontainer=document.querySelector(".user-details-container");
const bookingdetailscontainer=document.querySelector(".bookingdetails");
const bookingdetails=document.querySelector(".booking_details");
const userdetailscontainer=document.querySelector(".user-details-container");
const userdetails=document.querySelector(".user_details");
console.log(bookingdetailscontainer,userdetailscontainer);


bookingdetails.addEventListener('click',() =>
{
    // alert("jii");
    bookingdetailscontainer.classList.toggle('hidden');
    userdetailscontainer.classList.add('hidden');
    // cardetailscontainer.classList.add('hidden');
    // admindetailscontainer.classList.add('hidden');
})
userdetails.addEventListener('click',() =>
{
    // console.log("jii");
    bookingdetailscontainer.classList.add('hidden');
    userdetailscontainer.classList.toggle('hidden');
    // cardetailscontainer.classList.add('hidden');
    // admindetailscontainer.classList.add('hidden');
})


// let sidebar = document.querySelector(".sidebar");
// let sidebarBtn = document.querySelector(".sidebarBtn");
// sidebarBtn.onclick = function() {
//   sidebar.classList.toggle("active");
//   if(sidebar.classList.contains("active")){
//   sidebarBtn.classList.replace("bx-menu" ,"bx-menu-alt-right");
// }else
//   sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
// }