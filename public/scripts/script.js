//Selecting Elements
const teamMembers = document.getElementById("team-members");
const rosterContent = document.getElementById("roster");
const selectMonth = document.getElementById("selectMonth");
const radio_random = document.getElementById("random");
const radio_cont = document.getElementById("cont");




var sequence = [];
var date = new Date();
var teamData;
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];




const base = window.location.origin;


//Load Team Members in page
$(document).ready(function(){
  $.get(`${base}/team-members`,function(data){
    let temp = `
    <h3>Team Members</h3>
    <table>
      <tr>
        <th>Name</th>
        <th>Mail</th>
        <th>Phone</th>
        <th>Location</th>
      </tr>
    `

    for(let i=0; i<data.length; i++){
      let item = data[i];
      temp += `<tr>
      <td>${item.name}</td>
      <td>${item.mail}</td>
      <td>${item.phone}</td>
      <td>${item.location}</td>
      </tr>`;

    }
    temp += `</table>`;
    teamMembers.innerHTML = temp;
    teamData = data;
    //renderRoster(dayCount,months[month],firstDay);
  })
})

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function genRosterSeq(memCount, daysCount){

  sequence = [];
  let maxCount = Math.floor(daysCount/memCount);
  let count=0;
  let n = maxCount*memCount;
  let temp=0;
  //Create a map
  for(let i=0;i<n;i+=maxCount){
    for(let j=0;j<maxCount;j++){
      count++;
      sequence.push(temp);
    }
    temp++;
  }

  //Fill for remaining days
  while(count<daysCount){
    sequence.push(Math.floor(Math.random()*memCount));
    count++;
  }

  return sequence;
}

function renderRoster(daysCount, monthName, firstDay){

  let temp = ``;

  for(let i=0;i<daysCount;i++){
    temp+= `
      <div class="roster-item">
        <div>
          <h4>${i+1} ${monthName}</h4>
          <h5>${weekday[firstDay%7]}</h5>
        </div>
        <p class="name">${teamData[sequence[i]].name}</p>
      </div>
    `;

    firstDay++;
  }


  rosterContent.innerHTML = temp;
  
}

/*
console.log(new Date(2023, 0,0).getDate())
*/

//Generate Roster
function generate(){
  

  if(!(radio_cont.checked || radio_random.checked)){
    window.alert("Please Select Input")
    return;
  }

  let month = selectMonth.value;
  let year = date.getFullYear();
  let temp = month;
  temp++;
  let dayCount = new Date(year,temp,0).getDate();
  let firstDay = new Date(year,month,1).getDay(); 
  /*console.log(`Selected Month ${month}`);
  console.log(`Selected Year ${year}`);
  console.log(`Selected Day Count ${dayCount}`);
  console.log(`Selected First Day ${firstDay}`);*/

  if(radio_random.checked){
    //Generate Random Roster
    genRosterSeq(teamData.length,dayCount);
    shuffle(sequence);
    renderRoster(dayCount,months[month],firstDay);
  }

  else if(radio_cont.checked){
    genRosterSeq(teamData.length,dayCount);
    renderRoster(dayCount,months[month],firstDay);
  }

}
