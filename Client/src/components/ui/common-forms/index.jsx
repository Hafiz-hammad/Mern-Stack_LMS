import React, { useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { Button } from "../button";
import FormControls from "./form-controls";
import { initialSignInFormData, signInFormControls } from "@/config";
import {courseCategories} from'@/config'
import { StudentContext } from "@/context/student-context";

// Function to handle popup

function CommonForm({
  handleSubmit,
  buttonText,
  formControls = [],
  formData,
  setFormData,
  isButtonDisabled = false,
}) {
  const { studentCoursesList, setStudentCoursesList } = useContext(StudentContext);
  
const popup = () => {
  toast(`! Welcome Back`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
  return (
    <form onSubmit={handleSubmit}>
      {/* render form controls here */}
      <FormControls
        formControls={formControls}
        formData={formData}
        setFormData={setFormData}
      />
      
      <Button onClick={popup} disabled={isButtonDisabled} type="submit" className="mt-5 w-full">
        {buttonText || "Submit"}
      </Button>

      {/* Toast container to display the popups */}
      <ToastContainer />
    </form>
  );
}

export default CommonForm;
