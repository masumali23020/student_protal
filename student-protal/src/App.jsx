import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// route controllers.
import AdminPublicRoutes from "./routes/AdminPublicRoutes";
import AdminPrivateRoutes from "./routes/AdminPrivateRoutes";
import StudentPublicRoutes from "./routes/StudentPublicRoutes";
import StudentPrivateRoutes from "./routes/StudentPrivateRoutes";

// student related pages.
import Quiz from "./pages/student/Quiz";
import Leaderboard from "./pages/student/Leaderboard";
import StudentLogin from "./pages/student/StudentLogin";
import CoursePlayer from "./pages/student/CoursePlayer";
import StudentRegistration from "./pages/student/StudentRegistration";

// admin related pages.
import Videos from "./pages/admin/Videos";
import Quizzes from "./pages/admin/Quizzes";
import AddQuiz from "./pages/admin/AddQuiz";
import EditQuiz from "./pages/admin/EditQuiz";
import AddVideo from "./pages/admin/AddVideo";
import EditVideo from "./pages/admin/EditVideo";
import Dashboard from "./pages/admin/Dashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import Assignments from "./pages/admin/Assignments";
import AddAssignment from "./pages/admin/AddAssignment";
import EditAssignment from "./pages/admin/EditAssignment";
import AssignmentMarks from "./pages/admin/AssignmentMarks";

// not found page.
import NotFound from "./pages/NotFound";

// react components.
import AuthChecker from "./components/auth/AuthChecker";

const App = () => {
  return (
    <AuthChecker>
      <Router>
        <Routes>
          {/* admin public routes */}
          <Route element={<AdminPublicRoutes />}>
            <Route path="admin" element={<AdminLogin />} />
          </Route>

          {/* admin private routes */}
          <Route element={<AdminPrivateRoutes />}>
            <Route path="admin/quizzes" element={<Quizzes />} />
            <Route path="admin/quizzes/add" element={<AddQuiz />} />
            <Route path="admin/quizzes/edit/:id" element={<EditQuiz />} />
            <Route path="admin/dashboard" element={<Dashboard />} />
            <Route path="admin/assignments" element={<Assignments />} />
            <Route path="admin/assignments/add" element={<AddAssignment />} />
            <Route
              path="admin/assignment-marks"
              element={<AssignmentMarks />}
            />
            <Route
              path="admin/assignments/edit/:id"
              element={<EditAssignment />}
            />
            <Route path="admin/videos" element={<Videos />} />
            <Route path="admin/videos/add" element={<AddVideo />} />
            <Route path="admin/videos/edit/:id" element={<EditVideo />} />
          </Route>

          {/* student public routes */}
          <Route element={<StudentPublicRoutes />}>
            <Route path="" element={<StudentLogin />} />
            <Route path="register" element={<StudentRegistration />} />
          </Route>

          {/* student private routes */}
          <Route element={<StudentPrivateRoutes />}>
            <Route path="quiz" element={<Quiz />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="course-player" element={<CoursePlayer />} />
            <Route path="course-player/:id" element={<CoursePlayer />} />
          </Route>

          {/* 404 not found */}
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthChecker>
  );
};

export default App;
