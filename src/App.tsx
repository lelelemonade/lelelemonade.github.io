import { Routes, Route } from 'react-router-dom';
import { AnalyticsProvider } from './context/AnalyticsContext';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import NewsPage from './pages/NewsPage';
import NewsPostPage from './pages/NewsPostPage';
import NotFoundPage from './pages/NotFoundPage';

const App: React.FC = () => {
  return (
    <AnalyticsProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:id" element={<BlogPostPage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="news/:id" element={<NewsPostPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AnalyticsProvider>
  );
}

export default App;
