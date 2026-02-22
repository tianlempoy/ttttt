
import React, { useState, useEffect } from 'react';
import { Page } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactSection from './components/ContactSection';
import TeachersSection from './components/TeachersSection';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import SuperAdminDashboard from './components/SuperAdminDashboard';
import TeacherLogin from './components/TeacherLogin';
import TeacherDashboard from './components/TeacherDashboard';
import AdmissionHub from './components/AdmissionHub';
import NewsSection from './components/NewsSection';
import StudentGallery from './components/StudentGallery';
import SchoolHistory from './components/SchoolHistory';
import AICreativeLab from './components/AICreativeLab';
import AIScholar from './components/AIScholar';
import PPDBRegistrationComponent from './components/PPDBRegistration';
import AlumniNetwork from './components/AlumniNetwork';
import LibraryPortal from './components/LibraryPortal';
import SchoolProfile from './components/SchoolProfile';
import ActivitiesSection from './components/ActivitiesSection';
import AchievementsShowcase from './components/AchievementsShowcase';
import FeaturedPrograms from './components/FeaturedPrograms';
import DigitalHeritage from './components/DigitalHeritage';
import SchoolSchedule from './components/SchoolSchedule';
import Hero from './components/Hero';
import MottoDeepDive from './components/MottoDeepDive';
import PrincipalWelcome from './components/PrincipalWelcome';
import InstitutionalFramework from './components/InstitutionalFramework';
import VirtualTour from './components/VirtualTour';
import { StatsSection, CareerPathExplorer } from './components/EliteSections';
import { getCurrentUser, getCurrentTeacher } from './lib/actions';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>(Page.HOME);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isTeacherAuthenticated, setIsTeacherAuthenticated] = useState(false);
  const [teacherInfo, setTeacherInfo] = useState<any>(null);

  useEffect(() => {
    checkUser();
    checkTeacher();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });
    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [activePage]);

  const checkUser = async () => {
    const user = await getCurrentUser();
    if (user) setIsAdminAuthenticated(true);
  };

  const checkTeacher = async () => {
    const teacher = await getCurrentTeacher();
    if (teacher) {
      setIsTeacherAuthenticated(true);
      setTeacherInfo(teacher);
    }
  };

  const renderContent = () => {
    try {
      switch (activePage) {
        case Page.HOME:
          return (
            <div className="bg-white min-h-screen relative overflow-hidden">
              <Hero />
              <StatsSection />
              <MottoDeepDive />
              <PrincipalWelcome />
              <InstitutionalFramework />
              <VirtualTour />
              <AchievementsShowcase />
              <FeaturedPrograms />
              <CareerPathExplorer />
              <DigitalHeritage />
              <div id="schedule" className="reveal"><SchoolSchedule /></div>
              <NewsSection />
              <ContactSection />
            </div>
          );
        case Page.PROFIL: return <SchoolProfile />;
        case Page.GURU: return <TeachersSection />;
        case Page.KEGIATAN: return <ActivitiesSection />;
        case Page.PRESTASI: return <AchievementsShowcase />;
        case Page.BERITA: return <NewsSection isFullPage={true} />;
        case Page.GALERI: return <StudentGallery />;
        case Page.PPDB: return <PPDBRegistrationComponent />;
        case Page.LIBRARY: return <LibraryPortal />;
        case Page.ALUMNI: return <AlumniNetwork />;
        case Page.AI_HUB: return <AICreativeLab />;
        case Page.SCHOLAR: return <AIScholar />;
        case Page.ADMIN:
          return isAdminAuthenticated ? (
            <SuperAdminDashboard onLogout={() => setIsAdminAuthenticated(false)} />
          ) : (
            <AdminLogin onSuccess={() => setIsAdminAuthenticated(true)} />
          );
        case Page.GURU_PORTAL:
          return isTeacherAuthenticated ? (
            <TeacherDashboard 
              onLogout={() => {
                setIsTeacherAuthenticated(false);
                setTeacherInfo(null);
              }} 
              teacherInfo={teacherInfo}
            />
          ) : (
            <TeacherLogin onSuccess={() => {
              checkTeacher();
              setActivePage(Page.GURU_PORTAL);
            }} />
          );
        default: return <Hero />;
      }
    } catch (err) {
      console.error('Render error in App:', err);
      return (
        <div className="p-8 text-red-700 bg-white">
          <h2 className="text-2xl font-bold mb-2">Terjadi kesalahan saat menampilkan halaman</h2>
          <pre className="whitespace-pre-wrap text-sm">{String(err)}</pre>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-[#D4AF37] selection:text-primary">
      {activePage !== Page.ADMIN && activePage !== Page.GURU_PORTAL && <Navbar activePage={activePage} setActivePage={setActivePage} />}
      <main className="flex-grow">{renderContent()}</main>
      {activePage !== Page.ADMIN && activePage !== Page.GURU_PORTAL && <Footer onAdminClick={() => setActivePage(Page.ADMIN)} />}
    </div>
  );
};

export default App;
