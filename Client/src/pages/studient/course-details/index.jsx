import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import VideoPlayer from '@/components/vedio-player';
import { StudentContext } from '@/context/student-context';
import { fetchStudentViewCourseDetailsService } from '@/Service';
import { CheckCircle, Copy, Globe, Lock, PlayCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

const StudendViewCourseDetailsPage = () => {
  const navigate = useNavigate();
  const {
    studentViewCourseDetails,
    setStudentViewCourseDetails,
    currentCourseDetailsId,
    setCurrentCourseDetailsId,
    loadingState,
    setLoadingState,
  } = useContext(StudentContext);

  const [displayCurrentVideoFreePreview, setDisplayCurrentVideoFreePreview] = useState(null);
  const [showFreePreviewDialog, setShowFreePreviewDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const location = useLocation();

  async function fetchStudentViewCourseDetails() {
    const response = await fetchStudentViewCourseDetailsService(currentCourseDetailsId);

    if (response?.success) {
      setStudentViewCourseDetails(response?.data);
      setLoadingState(false);
    } else {
      setStudentViewCourseDetails(null);
      setLoadingState(false);
    }
  }

  function handleSetFreePreview(getCurrentVideoInfo) {
    console.log(getCurrentVideoInfo);
    setDisplayCurrentVideoFreePreview(getCurrentVideoInfo?.videoUrl);
  }

  const handleBuyNowClick = async () => {
    try {
      setLoading(true);

      // Make a POST request to your API
      const response = await axios.post("http://localhost:5000/api/saveEmail", {
        email: "", // Replace with actual email logic if needed
      });

      if (response.data.success) {
        // Show success toast
        toast.success("Congratulations on your purchase! Let’s start your learning journey!", {
          position: "top-right",
          duration: 3000,
        });

        // Navigate to /buyNow after the toast
        setTimeout(() => navigate('/buyNow'), 3000);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error saving email:", error);
      toast.error("There was an error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (displayCurrentVideoFreePreview !== null) setShowFreePreviewDialog(true);
  }, [displayCurrentVideoFreePreview]);

  useEffect(() => {
    if (currentCourseDetailsId !== null) fetchStudentViewCourseDetails();
  }, [currentCourseDetailsId]);

  useEffect(() => {
    if (id) setCurrentCourseDetailsId(id);
  }, [id]);

  useEffect(() => {
    if (!location.pathname.includes('/course/details')) {
      setStudentViewCourseDetails(null);
      setCurrentCourseDetailsId(null);
    }
  }, [location.pathname]);

  if (loadingState) return <Skeleton />;

  const getIndexOfFreePreviewUrl =
    studentViewCourseDetails !== null
      ? studentViewCourseDetails?.curriculum?.findIndex((item) => item.freePreview)
      : -1;

  return (
    <div className="mx-auto p-4 pt-20">
      <div className="bg-gray-900 text-white p-8 rounded-t-lg pt-">
        <h1 className="text-3xl font-bold mb-4">{studentViewCourseDetails?.title}</h1>
        <p className="text-xl mb-4">{studentViewCourseDetails?.subtitle}</p>
        <div className="flex items-center space-x-4 mt-2 text-sm">
          <span>Created By {studentViewCourseDetails?.instructorName}</span>
          <span>Created On {studentViewCourseDetails?.date.split('T')[0]}</span>
          <span className="flex items-center">
            <Globe className="mr-1 h-4 w-4" />
            {studentViewCourseDetails?.primaryLanguage}
          </span>
          <span>
            {studentViewCourseDetails?.students.length}
            {studentViewCourseDetails?.students.length <= 1 ? ' Student' : ' Students'}
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <main className="flex-grow">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What you'll Learn</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {studentViewCourseDetails?.objectives.split(',').map((objective, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Course Description</CardTitle>
            </CardHeader>
            <CardContent>{studentViewCourseDetails?.description}</CardContent>
          </Card>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Course Curriculum</CardTitle>
            </CardHeader>
            <CardContent>
              {studentViewCourseDetails?.curriculum?.map((curriculumItem, index) => (
                <li
                  key={index}
                  className={`${
                    curriculumItem?.freePreview ? 'cursor-pointer' : 'cursor-not-allowed'
                  } flex items-center mb-4`}
                  onClick={
                    curriculumItem?.freePreview
                      ? () => handleSetFreePreview(curriculumItem)
                      : null
                  }
                >
                  {curriculumItem?.freePreview ? (
                    <PlayCircle className="mr-2 h-4 w-4" />
                  ) : (
                    <Lock className="mr-2 h-4 w-4" />
                  )}
                  <span>{curriculumItem?.title}</span>
                </li>
              ))}
            </CardContent>
          </Card>
        </main>

        <aside className="w-full md:w-[500px]">
          <Card className="sticky top-4">
            <CardContent className="p-6">
              <div className="aspect-video mb-4 rounded-lg flex items-center justify-center">
                <VideoPlayer
                  url={
                    getIndexOfFreePreviewUrl !== -1
                      ? studentViewCourseDetails?.curriculum[getIndexOfFreePreviewUrl].videoUrl
                      : ''
                  }
                  width="450px"
                  height="200px"
                />
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold">{studentViewCourseDetails?.pricing}</span>
              </div>

              {/* Buy Now Button */}
              <Button onClick={handleBuyNowClick} className="w-full" disabled={loading}>
                {loading ? "Processing..." : "Buy Now"}
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>

      <Dialog
        open={showFreePreviewDialog}
        onOpenChange={() => {
          setShowFreePreviewDialog(false);
          setDisplayCurrentVideoFreePreview(null);
        }}
      >
        <DialogContent className="w-[600px]">
          <DialogHeader>
            <DialogTitle>Course Free Preview</DialogTitle>
            <DialogDescription>
              Is this your decision to buy this course or not?
            </DialogDescription>
          </DialogHeader>
          <div className="aspect-video rounded-lg flex items-center justify-center">
            <VideoPlayer
              url={displayCurrentVideoFreePreview}
              width="450px"
              height="200px"
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Toaster />
    </div>
  );
};

export default StudendViewCourseDetailsPage;
