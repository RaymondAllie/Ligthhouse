let userControls = $('#user-controls');
let profile = $(".profile")

let open = false;
profile.on('click', e => {
  let element = userControls;

  let profile = $(element.find(".profile"))
  console.log(open)
  if(open) {
    element.css("overflow", "hidden")
  element.animate({width: open ? "50px" : "300px"}, 800,() => {
    let p = $(profile.find("p"))
    p.remove()
    let loginButton = $(element.find(".login-button"))
    loginButton.remove()
    element.css("transform", "translate(-50%, -50%)")

  })
  }
  else {
    element.css('width', "50px")
  let p = $("<p></p>");
  p.text("Roger Williams")
  profile.append(p)
  console.log(profile)
  let loginButton = $("<div></div>")
  loginButton.addClass("login-button")
  loginButton.text("Login")
  loginButton.on('click', () => {
    window.location.href = "login.html"
  })
  element.append(loginButton)
    element.css("transform", "")
  element.animate({width: open ? "40px" : "300px"}, "fast")

  }
  
  open = !open;
})