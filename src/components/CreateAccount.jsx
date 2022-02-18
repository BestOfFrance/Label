export default function CreateAccount(props) {
  return (
    
  <div class="grid-item large--one-third push--large--one-third">

    
    <p></p>

   

    <label for="customer_password"></label>
    <input type="password" value="" name="customer[password]" id="customer_password"/>

    <label for="customer_password_confirmation"></label>
    <input type="password" value="" name="customer[password_confirmation]" id="customer_password_confirmation"/>

    <div class="text-center">
      <p>
        <input type="submit" class="btn" value=""/>
      </p>
      
    </div>
   </div>

  )
}