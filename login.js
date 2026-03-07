document.getElementById("login-btn").addEventListener("click",function(){
  // userName input 
 const userName = document.getElementById("user-name");
 const userNameValue = userName.value;

//  password input 
 const password = document.getElementById("password");
 const passwordValue = password.value;
 
//  match userName & password 
if(userNameValue === "admin" && passwordValue === "admin123"){
  alert("Sign Successful");
  window.location.assign("/all.html");
}
else{
  alert("Try Again");
  return;
}  
})