import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Institutions from './pages/Institutions'
import InstitutionDetails from './pages/InstitutionDetails'
import Programs from './pages/Programs'
import Announcements from './pages/Announcements'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import AddPublicInstitution from './pages/dashboard/AddPublicInstitution'
import AddPrivateInstitution from './pages/dashboard/AddPrivateInstitution'
import AddProgramme from './pages/dashboard/AddProgramme'
import EditProgramme from './pages/dashboard/EditProgramme'
import PublicInstitutionsList from './pages/dashboard/PublicInstitutionsList'
import PrivateInstitutionsList from './pages/dashboard/PrivateInstitutionsList'
import EditPublicInstitution from './pages/dashboard/EditPublicInstitution'
import EditPrivateInstitution from './pages/dashboard/EditPrivateInstitution'
import ProgrammesList from './pages/dashboard/ProgrammesList'
import UsersList from './pages/dashboard/UsersList'
import AddUser from './pages/dashboard/AddUser'
import Messages from './pages/dashboard/Messages'
import DashboardAnnouncements from './pages/dashboard/DashboardAnnouncements'
import AnnouncementForm from './pages/dashboard/AnnouncementForm'
import Dashboard from './pages/Dashboard'
import DashboardLayout from './layouts/DashboardLayout'
import MainLayout from './layouts/MainLayout'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Routes>
          {/* Public Routes wrapped in MainLayout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/institutions" element={<Institutions />} />
            <Route path="/institutions/:id" element={<InstitutionDetails />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* Auth Routes (Separate from MainLayout for clean full-screen look) */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="institutions/public" element={<PublicInstitutionsList />} />
            <Route path="institutions/private" element={<PrivateInstitutionsList />} />
            <Route path="institutions/add-public" element={<AddPublicInstitution />} />
            <Route path="institutions/add-private" element={<AddPrivateInstitution />} />
            <Route path="institutions/edit-public/:id" element={<EditPublicInstitution />} />
            <Route path="institutions/edit-private/:id" element={<EditPrivateInstitution />} />
            <Route path="programmes" element={<ProgrammesList />} />
            <Route path="programmes/add" element={<AddProgramme />} />
            <Route path="programmes/edit/:id" element={<EditProgramme />} />
            <Route path="users" element={<UsersList />} />
            <Route path="users/add" element={<AddUser />} />
            <Route path="users/edit/:id" element={<AddUser />} />
            <Route path="messages" element={<Messages />} />
            <Route path="announcements" element={<DashboardAnnouncements />} />
            <Route path="announcements/add" element={<AnnouncementForm />} />
            <Route path="announcements/edit/:id" element={<AnnouncementForm />} />
            <Route path="*" element={<Dashboard />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
