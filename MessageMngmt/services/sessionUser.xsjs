function getUsername(){
   var username =  $.session.getUsername();
   return username;
}
var result = getUsername();
$.response.setBody(result);