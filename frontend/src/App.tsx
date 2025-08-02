import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import theme from "./theme";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import { FirstFeatureSection } from "./components/FeatureSection";
import EdgeCasesSection from "./components/EdgeCasesSection";
import PerformanceSection from "./components/PerformanceSection";
import ThreeColumnFeatures from "./components/ThreeColumnFeatures";
import OptimizeSection from "./components/OptimizeSection";
import ProcessSection from "./components/ProcessSection";
import TestimonialsSection from "./components/TestimonialsSection";
import FinalCTASection from "./components/FinalCTASection";
import NewsletterSection from "./components/NewsletterSection";
import Footer from "./components/Footer";
import ProblemSelectSection from "./components/ProblemSelectSection";
import ProblemSubmissionPage from "./components/ProblemSubmissionPage";
import SignupLoginPage from "./components/SignupLoginPage";
import { useNavigate } from "react-router-dom";
import LearnMorePage from "./components/LearnMorePage";
import ExplorePage from "./components/ExplorePage";
import ProblemDashboardPage from "./components/ProblemDashboardPage";
import CreateProblemPage from "./components/CreateProblemPage";

const createEmotionCache = () => {
  return createCache({
    key: "mui",
    prepend: true,
  });
};

const emotionCache = createEmotionCache();

const LandingPage: React.FC = () => (
  <>
    <Navigation />
    <HeroSection />
    <FirstFeatureSection />
    <EdgeCasesSection />
    <PerformanceSection />
    <ProblemSelectSection />
    <ThreeColumnFeatures />
    <OptimizeSection />
    <ProcessSection />
    <TestimonialsSection />
    <FinalCTASection />
    <NewsletterSection />
    <Footer />
  </>
);

const App: React.FC = () => {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignupLoginPage />} />
            <Route path="/learn-more" element={<LearnMorePage />} />{" "}
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/dashboard" element={<ProblemDashboardPage />} />
            <Route path="/create-problem" element={<CreateProblemPage />} />
            <Route
              path="/submit/:problemId"
              element={<ProblemSubmissionPage />}
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
