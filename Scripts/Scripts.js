const addToList = document.getElementById("placeOrder");
const addOrder = document.querySelector(".addOrder");
const addOrderII = document.querySelector(".addOrder2");
const confirm = document.querySelector("#confirm");
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
  let inputSize = $("#pizza-size").val("0");
  let inputCrust = $("#pizza-crust").val("0");
  let inputAmount = $("#pizza-number").val("1");
  $("input:checkbox[name='top']").attr("checked",false);
}


//order constructor
function Order(number,sizes, crust, quantity,topping){

  this.orderNumber = number;
  this.sizes = sizes;
  this.crust = crust;
  this.quantity = quantity;
  // this.delivery = delivery;
  this.topping = topping;
}
Order.prototype.showSummary = function(){
  
  return `<td> ${orderCounter+1} </td> <td> ${this.sizes} </td> <td> ${this.crust} </td><td>${this.topping} </td><td>${this.quantity}</td><td> ${this.totalCost()}</td>`;
 
}
Order.prototype.totalCost = function(){
   
  toppingsCost = 0;
  for(var x = 0; x<this.topping.length; x++){

    toppingsCost += Costs.pizzaTopping[this.topping[x]];
  }
  
  var cost = (Costs.pizzaSize[this.sizes]+Costs.pizzaCrust[this.crust]+toppingsCost)*this.quantity;
  // var costAndDelivery = cost+ Costs.delivery[this.delivery];
  grandTotal += cost;
  
  return cost;

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
  if($("#pizza-size").val() === "0" ||  $("#pizza-crust").val() === "0" ||$("#pizza-number").val() === "0"||$("#pizza-number").val() < 1){
    $(".errEntry").removeClass("d-none");
    console.log("err");
  }
  else 
       {
    
    $(".errEntry").addClass("d-none");
    let inputOrder = 0;
    let inputSize = $("#pizza-size").val();
    let inputCrust = $("#pizza-crust").val();
    let toppingArr = [];
    let inputAmount = $("#pizza-number").val();
    // let inputDelivery = $("#pizzaDelivery").val();

      
      
     $("input:checkbox[name='top']:checked").each(function(){
        toppingArr.push($(this).val());
       });
  
    var anOrder = new Order(inputOrder,inputSize,inputCrust, inputAmount, toppingArr );
  

  $(".table").append("<tr>"+anOrder.showSummary()+"</tr>");
  $(".orders").text(`${orderCounter+=1}`);
  resetFields();
  
 
  }

})
function myFUnct(){
  $(".displayOrders").hide();
  $(".displayForm").show();
}
$("#back").click(function(){
  myFUnct();
 
})
$("#close").click(function(){
  document.getElementById("pform").reset();
  
  myFUnct();


});

function checkOutDisplay(){
  $("#gtotal").text(grandTotal);
  $(".displayOrders").show();
  $(".displayForm").hide();
}

addOrder.addEventListener("click", function (){

  checkOutDisplay();
})
addOrderII.addEventListener("click", function (){

  checkOutDisplay();
})

confirm.addEventListener("click", function(){
  let delivery = $("#pizzaDelivery").val();

  $(".finalRemarks").removeClass("d-none");

  $("#totalBill").text( parseInt(Costs.delivery[delivery])+grandTotal);
    
  console.log(Costs.delivery[delivery]);

  if(delivery =="delivery"){
    
      $(".deliveryInfo").removeClass("d-none");
      $("#deliveryPlace").text($("#pizza-place").val());
  }
  else{
    $(".deliveryInfo").addClass("d-none");
  }

})



// if(inputDelivery == "delivery"){
//   if($("#pizza-place").val() != ""){
//      alert("Your order will be delivered "+$("#pizza-place").val());
//   }
 
//  }