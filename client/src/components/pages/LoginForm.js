import React from 'react';

function LoginForm() {
  return (
   <div className='Home'>
       <div className='box1'>
        <h1 className='log_h1'>Login</h1>
         <div className='login_form'>
           <div>
             <center>
               <label>Username:</label>
               <input type="text" name="username"></input>
             </center>
           </div>
           <div>
             <center>
               <label>Password:</label>
               <input type="text" name="password"></input>
             </center>
           </div>
           <center><button>Login</button></center>
         </div>

         <div>
<h1 className='log_h1'>Register</h1>
         <div className='login_form'>
           <div>
             <center>
               <label>Username:</label>
               <input type="text" name="Reg_username"></input>
             </center>
           </div>
           <div>
             <center>
               <label>Password:</label>
               <input type="text" name="Reg_password"></input>
             </center>
           </div>
           <center><button>Register</button></center>
         </div>

       </div>
       </div>

      
   </div> 
  )
}

export default LoginForm;
