let inputs = document.querySelectorAll(".e1_5:not(.user-input)");
console.log(inputs)
let dropdowns = document.querySelectorAll(".dropdown")
let display = document.getElementById("display")
let submitButton = document.getElementById("submit-button")
let userInput = document.getElementById("user-input")

var script = document.createElement('script'); 
    script.type = 'text/javascript'; 
    script.src = "create1.js"; 
    script.async = true; 
    var s = document.getElementsByTagName('script')[0]; 
    s.parentNode.insertBefore(script, s);

let data = [formulas, equations, laws]
console.log(data)

let dataIndex = 0;


let idx = inputs.length;
for(let input of inputs) {
  input.style['z-index'] = idx + 3;
  idx -= 1;
  let dropdown = input.querySelector(".dropdown");
  if(dataIndex < data.length) {
  for(let key of Object.keys(data[dataIndex])) {
    let div = document.createElement("div")
    div.classList.add("dropdown-item");
    div.id = dataIndex + "_" + key;
    console.log(div)
    div.innerHTML = `<p>${key}</p>
        <div class="icon icon-checkmark">`
    dropdown.appendChild(div)
  }
    dataIndex++;
  }
  input.addEventListener('click', (e) => {
    dropdown.classList.toggle("dropdown-visible")
  })
}

let cheatsheetIDX = 0;
for(let dropdown of dropdowns) {
  let children = dropdown.children;
  for(let child of children) {
    cheatsheetIDX++;
    child.addEventListener('click', e => {
      e.stopPropagation()
      let ele = child.querySelector(".icon")
      ele.classList.toggle("icon-visible")

      if(ele.open) {
        display.removeChild(display.querySelector("#cheatsheet-ele-" + ele.cheatsheetID))
      }
      else {
        ele.cheatsheetID = cheatsheetIDX;
      // fetch info from api
      let [id, key] = child.id.split("_")
      let title = key;
      let info = data[id][key]
      let div = document.createElement('div')
      div.classList.add("cheatsheet-item")
      div.id = "cheatsheet-ele-" + cheatsheetIDX;
      div.innerHTML = `<h4>${title}</h4>
  <p>${info}<p>`
      display.appendChild(div)
      }
      ele.open = ele.open ? false : true;
    })
  }
}

submitButton.addEventListener('click', () => {
  display.style['background'] = "white";
let name = prompt('Name your sheet:', 'my_sheet')
var opt = {
  margin:       1,
  filename:     'myfile.pdf',
  html2canvas:  { scale: 2},  
  jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
};
 
// New Promise-based usage:
html2pdf().set(opt).from(display).save();
    display.style.transform= "scale(1)";
 
})

let userInputIDX = 0;
userInput.addEventListener('keyup', (e) => {
  if(e.code == "Enter") {
    let div = document.createElement('div')
    div.classList.add("cheatsheet-item")
      div.id = "cheatsheet-ele-" + userInputIDX;
      div.innerHTML = `<h4>User Input!</h4>
  <p>${e.target.value}<p>`
      display.appendChild(div)
      e.target.value = ""
  }
})