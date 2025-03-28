import { useState } from "react";
import { toast } from "react-toastify";

const App = () => {

 const [user, setUser] = useState({
  name: "",
  email: "",
  phone: "",
  address: "",
 });


// now handling the input 

 const handleInput = (e) => {
  console.log(e);
  let name = e.target.name;
  let value = e.target.value;

  setUser({
    ...user,
    [name]:value,
  });

 };
   
//  handling the form submit !

 const handleSubmit = async(e) => {
   e.preventDefault();
  //  alert(user);
   console.log(user);
   try {
    const response = await fetch(`http://localhost:5000/api/data/save`,{
    method: "POST",
    headers: {
      "Content-Type":"application/json",
    },
    body:JSON.stringify(user),
    credentials: "include" ,
   });
   
   const res_data = await response.json();
   
   console.log("response from the server",res_data);
   
   if(response.ok){
   toast.success("Successfully User Registered !");
  setUser({
  name: "",
  email: "",
  phone: "",
  address: "",
    });
   }else{
    console.log("no error:");
   toast.error("Failed to Register User! Please Try Again.");
   }


  
   } catch (error) {
     console.log("data backend error",error);
   }
   
 };



  return (
    <div className="container">
      
      <div className="rightPart">
        <h1>User Data form </h1>
        <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <p className="formLabels">Username</p>
          <input type="text" name="name" required autoComplete="off" placeholder="" value={user.name} onChange={handleInput} id="username" className="inputField" />
          <p className="formLabels">Email</p>
          <input type="email" name="email" id="email" required autoComplete="off" placeholder="" value={user.email} onChange={handleInput} className="inputField" />
          <p className="formLabels">Phone</p>
          <input type="number" name="phone" required autoComplete="off" value={user.phone} onChange={handleInput} placeholder="" id="phone" className="inputField" />
          <p className="formLabels"> Address</p>
         <input type="text" name="address" value={user.address} className="inputField" onChange={handleInput} placeholder="address here" />
         <div className="btn"><input type="submit" value="register now" className="registerButton" /></div>

        </form>
        </div>
      </div>
    </div>
  )
};

export default App;