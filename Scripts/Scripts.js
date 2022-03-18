function Order(sizes, crust, quantity, delivery){

  this.sizes = sizes;
  this.crust = crust;
  this.quantity = quantity;
  this.delivery = delivery;
  this.topping = [];

}


let inputSize = $("#pizza-size").val()
let inputTopping = $("#pizza-topping").val()
let inputAmount = $("#pizza-number").val()
let inputDelivery = $("#pizzaDelivery").val()

// function to display the prompt to input the place of delivery
$("#pizzaDelivery").change(function(){
  if($("#pizzaDelivery").val() == "delivery"){
    $(".pizza-place").removeClass("d-none");
  }
  else{
    
    $(".pizza-place").addClass("d-none");
  
  }
  
});

// Order.prototype.calculateCost = function(){

  
// }