import { StudentContext } from '@/context/student-context';
import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast'; // Importing react-hot-toast
import { Button } from '../ui/button';
import CongratulationsScreen from '../congorulation';
import UnlockScreen from '../unlock-screen';

const BuyNow = () => {
  const {
    studentViewCourseDetails,
    setStudentViewCourseDetails,
    currentCourseDetailsId,
    setCurrentCourseDetailsId,
    loadingState,
    setLoadingState,
  } = useContext(StudentContext);

  const [showCongrats, setShowCongrats] = useState(false);

  const handleUnlockCourse = () => {
    // Simulate saving process with a Promise
    const unlockPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Course unlocked successfully!');
      }, 500); // Fast response in 500ms
    });

    // Display the loading, success, or error toast using toast.promise
    toast.promise(unlockPromise, {
      loading: 'Unlocking course...',
      success: <b>Course unlocked!</b>,
      error: <b>Failed to unlock course.</b>,
    });

    // Trigger a success toast after the promise resolves
    unlockPromise.then(() => {
      setTimeout(() => {
        toast.success('Successfully unlocked!'); // You can customize the message here
        setShowCongrats(true); // Show the CongratulationsScreen
      }, 500); // Delay the success toast by only 2 seconds
    });
  };

  return (
    <>
    <div className="flex pt-10 items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 text-gray-900">
      {/* Check if Congratulations Screen should be shown */}
      {showCongrats ? (
        <CongratulationsScreen />
      ) : (
        <div className="text-center">
          <h1 className="text-5xl font-extrabold mb-4">Unlock 🔓 Your Course</h1>
          <p className="text-lg mb-8">
            Take the next step in your learning journey. Unlock now to access the content!
          </p>
          <Button
            className="bg-gradient-to-r from-green-400 to-green-600 text-black font-semibold py-3 px-8 rounded-full hover:from-green-500 hover:to-green-700 transition-all shadow-lg"
            onClick={handleUnlockCourse}
          >
            Unlock 🔓 Course
          </Button>
        </div>
      )}
    
<div>

</div>

<UnlockScreen/>
    </div>
</>
  );
};

export default BuyNow;
