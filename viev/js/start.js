
jQuery(document).ready(function($)
{

$.ajax({
    type: 'POST',
    url: 'http://localhost:8080/start',
    success: function(response) 
    { 
        $('#secretCode').html(response);
       // console.log(response);
    },
    error: function(xhr, status, err) 
    {
      console.log(xhr.responseText);
    }
   });


   $('.copy').click(function()
   {
    var text = $(".pCopy").text();
    navigator.clipboard.writeText(text);
   });
   
//----------------------------------------BALANCE----------------------------------------//
   $.ajax({
    type: 'POST',
    url: 'http://localhost:8080/balanceAll',
    success: function(response) 
    { 
       //console.log(response);
       UpdateBalance(response)
    },
    error: function(xhr, status, err) 
    {
      console.log(xhr.responseText);
    }
   });

   function UpdateBalance(val) 
   {
        // console.log(val[0]['bitcoin']);
    //$('.wallet  > div')
    $('.wallet table tbody tr').each((index, elem) => 
    {
         if((elem.id).toString() === Object.keys(val[index])[0])
         {
            $('#' + elem.id + ' .balance').text(Object.values(val[index]));

      //Disable button send if balance == 0
              if(Object.values(val[index]) == 0)
              {
                let button = document.querySelector('#' + elem.id + ' .butSend');
                        button.disabled = true;
                        button.style.background = "gray";
                        button.style.color = "lightsteelblue";
              }
         }
    });
    
   }
 //----------------------------------------End BALANCE----------------------------------------//

 //----------------------------------------Get price -----------------------------------------//

 $.ajax({
  type: 'POST',
  url: 'http://localhost:8080/price',
  success: function(response) 
  { 
     WievPrice(response)
  },
  error: function(xhr, status, err) 
  {
    console.log(xhr.responseText);
  }
 });

 function WievPrice(val) 
 {
  
  $('.wallet table tbody tr').each((index, elem) => 
  {
      if((elem.id).toString() === Object.keys(val[index])[0])
      {
        var t = Object.values(val[index]) + '<span style="color:green"> $</span>'; 
          $('#' + elem.id + ' .price').html(t);
      }
  });

 }
 //----------------------------------------End Get price -----------------------------------------//

});
