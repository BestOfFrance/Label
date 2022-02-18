import './CreateAccount.css'

export default function CreateAccount(props) {
  return (
    
  <div className="register-container">
  <div className="create-account">

    
    <p>Create an Account</p>
    <label for="customer_firstname">First Name</label>
    <input type="firstname" />
    <label for="customer_lastname">Last Name</label>
    <input type="lastname" value="" />
    <label for="customer_email">Email</label>
    <input type="email" value="" />
    <label for="customer_password">Password</label>
    <input type="password" value="" />

    <label for="customer_password_confirmation">Confirm Password</label>
    <input type="password" value="" name="customer[password_confirmation]" id="customer_password_confirmation"/>

    <div class="text-center">
      <p>
        Submit
        <input type="submit" class="btn" value=""/>
      </p>
      
    </div>
   </div>
</div>
  )
}