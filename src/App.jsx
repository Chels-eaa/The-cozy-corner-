import { Routes, Route } from 'react-router';

import BlogPostsPage from './pages/BlogPostsPage';
import IndividualPostPage from './pages/IndividualPostPage';
import ContactPage from './pages/ContactPage';

import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

function App() {

  return (
    <div className="app" id="home">
      <Header />
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<BlogPostsPage />} />
          <Route path="/posts" element={<BlogPostsPage />} />
          <Route path="/posts/:postId" element={<IndividualPostPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

        <Footer />
    </div>
    );
    }   
export default App;
