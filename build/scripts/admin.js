const bookingdetails=document.querySelector(".booking_details");
const bookingdetailscontainer=document.querySelector(".bookingdetails");
const userdetailscontainer=document.querySelector(".userdetails");
const userdetails=document.querySelector(".user_details");
const cardetails=document.querySelector(".car_details");
const cardetailscontainer=document.querySelector(".cardetails");
const admindetails=document.querySelector(".admin_details");
const admindetailscontainer=document.querySelector(".admindetails");

bookingdetails.addEventListener('click',() =>
{
    bookingdetailscontainer.classList.toggle('hidden');
    userdetailscontainer.classList.add('hidden');
    cardetailscontainer.classList.add('hidden');
    admindetailscontainer.classList.add('hidden');
})
userdetails.addEventListener('click',() =>
{
    bookingdetailscontainer.classList.add('hidden');
    userdetailscontainer.classList.toggle('hidden');
    cardetailscontainer.classList.add('hidden');
    admindetailscontainer.classList.add('hidden');
})
cardetails.addEventListener('click',() =>
{
    bookingdetailscontainer.classList.add('hidden');
    userdetailscontainer.classList.add('hidden');
    cardetailscontainer.classList.toggle('hidden');
    admindetailscontainer.classList.add('hidden');
})
admindetails.addEventListener('click',() =>
{
    bookingdetailscontainer.classList.add('hidden');
    userdetailscontainer.classList.add('hidden');
    cardetailscontainer.classList.add('hidden');
    admindetailscontainer.classList.toggle('hidden');
})

let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".sidebarBtn");
sidebarBtn.onclick = function() {
  sidebar.classList.toggle("active");
  if(sidebar.classList.contains("active")){
  sidebarBtn.classList.replace("bx-menu" ,"bx-menu-alt-right");
}else
  sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
}