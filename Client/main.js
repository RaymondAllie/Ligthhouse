

async function get_data(connector, data) {
    var endpoint =  'http://localhost:3000/' + connector + data;
    console.log(endpoint);
    try {
      var data = await fetch(endpoint);
      if (data.ok) {
        
        const output = await data.json()
        console.log(output)
        return output
      } 
    } catch (err) {
        console.log(err)
    }
}



function login() {
  var user = document.querySelector('#use').value
  var pass = document.querySelector('#pass').value
  check_user(user, pass)
}

function signup() {
  var user = document.querySelector('#user').value
  var pass = document.querySelector('#pas').value
  submit_user(user, pass)
}

async function submit_user(username, pass) {
  var up = String(username) + '|' + String(pass);
  console.log(up)
  var a = await get_data('usernew/', String(up))
  if (a.Status === 'Success') {
    alert('Account Made!')
    localStorage.setItem('us', `${username}`)
    
    window.open('index.html', '_self')
    
  }
}

async function check_user(username, pass) {
  var up = String(username) + '|' + String(pass);
  console.log(up)
  var auth = await get_data('existing_user/', String(up))
  auth = auth.authentification
  console.log(auth)
  if (auth === true) {
    
    localStorage.setItem('us', `${username}`)
    window.open('index.html', '_self')
    
  } else {
    alert('Wrong Username or Password!')
  }
}
async function setup_page() {
  const username = localStorage.getItem('us')
  document.querySelector('#user_name').innerHTML = username;
  var num = await get_data('count/', username)
  num = num.count;
  let preview = ''
  for (i = 0; i < num; i++) {
    c = i
    preview += `<button onclick='' ><div class = "ncb"><p class="subj">Test_File_${String(c)}</p></div><button>`
  }
  console.log(preview)
  document.querySelector('#sheet_load').innerHTML = `${preview}`
}


