

var leave=function(){
    const pickupdate=document.querySelector("#pickupdate");
    // const dropoffdate=document.querySelector("#dropoffdate");
    console.log(pickupdate.valueAsNumber);
}

function validate()
{
    const pickupdate=document.querySelector("#pickupdate");
    const dropoffdate=document.querySelector("#dropoffdate");
    firstDate=pickupdate.value;
    secondDate=dropoffdate.value;
    var noofdays=findTheDifferenceBetweenTwoDates(firstDate,secondDate);
    console.log(noofdays);
    document.querySelector("#cnt-day").value=noofdays;
    // document.querySelector("price").i=
}


function findTheDifferenceBetweenTwoDates(firstDate,secondDate)
    {
        firstDate = new Date(firstDate);
          secondDate = new Date(secondDate);
      
          let timeDifference = Math.abs(secondDate.getTime() - firstDate.getTime());
      
          let millisecondsInADay = (1000 * 3600 * 24);
      
          let differenceOfDays = Math.ceil(timeDifference / millisecondsInADay);
      
          return differenceOfDays;
      
        };
