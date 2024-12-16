import { Button } from '@/components/ui/button';
import { AuthContext } from '@/context/auth-context';
import {React, useContext } from 'react'
import { useNavigate } from 'react-router-dom';

function StudientHomePage  () {
  const  {resetCredentials} = useContext(AuthContext);
  const navigate = useNavigate();
   
  

  function handleLogout() {
    console.log('Logout clicked');
    resetCredentials();
    sessionStorage.clear();
    console.log('Session storage cleared');
  
    navigate('/auth'); // Redirect to login page
  }
  
  return (
    <div>
      Home Page Studient   
  <Button 
  onClick={handleLogout}
  
  
  >
  LogOut
</Button>
    </div>
  )
}

export default StudientHomePage;
