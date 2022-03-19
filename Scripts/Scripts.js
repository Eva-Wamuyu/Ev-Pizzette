const addToList = document.getElementById("placeOrder");
const addOrder = document.querySelector("#addOrder");
let grandTotal = 0;
let orderCounter = 0;

// function to display the prompt to input the place of delivery
$("#pizzaDelivery").change(function(){
  if($("#pizzaDelivery").val() == "delivery"){
    $(".pizza-place").removeClass("d-none");
  }
  else{
    
    $(".pizza-place").addClass("d-none");
  
  }
  
});

const resetFields = ()=>{
  let inputSize = $("#pizza-size").val("");
  let inputCrust = $("#pizza-crust").val("");
  let inputAmount = $("#pizza-number").val("");
  let inputDelivery = $("#pizzaDelivery").val("");
}

//order constructor
function Order(number,sizes, crust, quantity, delivery ,topping){

  this.orderNumber = number;
  this.sizes = sizes;
  this.crust = crust;
  this.quantity = quantity;
  this.delivery = delivery;
  this.topping = topping;
}
Order.prototype.showSummary = function(){
  
  return `<td> &#x2022 </td> <td> ${this.sizes} </td> <td> ${this.crust} </td><td>${this.topping} </td><td>${this.quantity}</td><td>  ${this.delivery} </td> <td> ${this.totalCost()}</td>`;
 
}
Order.prototype.totalCost = function(){
   
  toppingsCost = 0;
  for(var x = 0; x<this.topping.length; x++){

    toppingsCost += Costs.pizzaTopping[this.topping[x]];
  }
  
  var cost = (Costs.pizzaSize[this.sizes]+Costs.pizzaCrust[this.crust]+toppingsCost)*this.quantity;
  var costAndDelivery = cost+ Costs.delivery[this.delivery];
  grandTotal += costAndDelivery;
  
  return costAndDelivery;

}

//costs object
const Costs = {
  pizzaSize:{
    Large: 9,
    Medium: 8.5,
    Small: 7
  },
  pizzaCrust:{
    Cruspy: 1.5,
    Stuffed: 1,
    Gfree: 0.5
  },
  pizzaTopping:{
    xx: 0,
    Pepper: 1,
    Pineapple: 0.75,
    Cheese: 0.5,
    Garlic: 0.25
    
  },
  delivery:{
    delivery: 2,
    pickup: 0 
  }
}

addToList.addEventListener("click",(e)=>{
  e.preventDefault();

    let inputOrder = 0;
    let inputSize = $("#pizza-size").val();
    let inputCrust = $("#pizza-crust").val();
    let toppingArr = [];
    let inputAmount = $("#pizza-number").val();
    let inputDelivery = $("#pizzaDelivery").val();

       if(inputDelivery == "delivery"){
         if($("#pizza-place").val() != ""){
            alert("Your order will be delivered "+$("#pizza-place").val());
         }
        
        }
      
     $("input:checkbox[name='top']:checked").each(function(){
        toppingArr.push($(this).val());
       });
  
    var anOrder = new Order(inputOrder,inputSize,inputCrust, inputAmount, inputDelivery, toppingArr );
  

  $(".table").append("<tr>"+anOrder.showSummary()+"</tr>");
  $(".orders").text(`Orders = ${orderCounter+=1}`);
 
})
$("#close").click(function(){
  document.getElementById("pform").reset();
  
  $(".displayOrders").hide();
  $(".displayForm").show();


});

addOrder.addEventListener("click", function (){

  
  $("#gtotal").text(grandTotal);
  $(".displayOrders").show();
  $(".displayForm").hide();
  
})
