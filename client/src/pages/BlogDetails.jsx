import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Sidebar from '../components/Sidebar';


gsap.registerPlugin(ScrollTrigger);

const BlogDetails = () => {
  const { _id } = useParams();
  const [blog, setBlog] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
   
   const blog1="https://i.ibb.co/vxXDXbDg/blog1.png";
  const blog2="https://i.ibb.co/8DNr6Jvn/blog2.png";
  const blog3="https://i.ibb.co/G4dGb4cV/blog3.png";
  const blog4="https://i.ibb.co/N2tcBjp7/blog4.png";
  const blog5="https://i.ibb.co/Zpb2dr9x/blog5.png";

  // Refs for GSAP animations
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const contentRef = useRef(null);
  const imageGalleryRef = useRef(null);
  const sidebarRef = useRef(null);
  
  const blogPosts = [
      {
        _id: 1,
        title: "Optimizing Supply Chain with AI",
        description:
          "Discover how artificial intelligence can streamline logistics operations and improve delivery efficiency.",
        image: blog1,
        username: "JohnDoe",
        date: "Feb 2, 2026",
      },
      {
        _id: 2,
        title: "Top 5 Warehouse Management Tips",
        description:
          "Learn the best practices for managing warehouses efficiently and reducing operational costs.",
        image: blog2,
        username: "JaneSmith",
        date: "Jan 28, 2026",
      },
      {
        _id: 3,
        title: "Last-Mile Delivery Challenges",
        description:
          "Explore the common challenges in last-mile delivery and how technology can overcome them.",
        image: blog3,
        username: "AlexLogistics",
        date: "Jan 20, 2026",
      },
      {
        _id: 4,
        title: "Eco-Friendly Logistics Practices",
        description:
          "Implement sustainable logistics solutions that reduce carbon footprint and increase efficiency.",
        image: blog4,
        username: "GreenGuru",
        date: "Feb 1, 2026",
      },
      {
        _id: 5,
        title: "Future of Autonomous Delivery Vehicles",
        description:
          "How autonomous vehicles are set to revolutionize the logistics and delivery industry worldwide.",
        image: blog5,
        username: "TechLogi",
        date: "Jan 25, 2026",
      },
    ];
//   useEffect(() => {
//     // Fetch blog data by ID
//     const fetchBlogData = async () => {
//       try {
//         // Replace with your actual API endpoint
//         const response = await fetch(`/api/blogs/${_id}`);
//         const data = await response.json();
//         setBlog(data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching blog:', error);
//         setLoading(false);
//       }
//     };

//     fetchBlogData();
//   }, [_id]);

useEffect(() => {
  setLoading(true);

  const foundBlog = blogPosts.find(
    (item) => item._id === Number(_id)
  );

  if (foundBlog) {
    setBlog(foundBlog);
  } else {
    setBlog(null);
  }

  setLoading(false);
}, [_id]);

  useEffect(() => {
    if (!loading && blog) {
      // Initial animations
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 1.2 }
      });

      // Hero section animations
      tl.from(heroRef.current, {
        opacity: 0,
        duration: 0.8
      })
        .from(titleRef.current, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: 'power4.out'
        }, '-=0.6')
        .from(descRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.9
        }, '-=0.7');

      // Content animations with scroll trigger
      gsap.from('.content-section', {
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      });

      // Image gallery animation
      if (imageGalleryRef.current) {
        gsap.from('.gallery-item', {
          scrollTrigger: {
            trigger: imageGalleryRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          scale: 0.8,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'back.out(1.4)'
        });
      }

      // Sidebar animation
      if (sidebarRef.current) {
        gsap.from(sidebarRef.current, {
          scrollTrigger: {
            trigger: sidebarRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          x: 50,
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        });
      }
    }
  }, [loading, blog]);

  const images = blog ? [blog.image] : [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-slate-300 border-t-slate-800 rounded-full animate-spin"></div>
          <div className="mt-4 text-slate-600 font-light tracking-wider">Loading...</div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-light text-slate-800 mb-2">Blog not found</h2>
          <p className="text-slate-600">The requested blog post could not be loaded.</p>
        </div>
      </div>
    );
  }

  // Dummy data for demonstration (replace with actual blog data)


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section ref={heroRef} className="relative w-full h-[420px] sm:h-[500px] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
         style={{ backgroundImage: `url(${blog.image})` }}

        />

        {/* Overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-blue-900/70 to-blue-950/85" />

        {/* Animated particles effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <div className="mb-4">
            <span className="inline-block px-4 py-1.5 bg-blue-500/20 backdrop-blur-sm border border-blue-300/30 rounded-full text-blue-100 text-xs sm:text-sm font-light tracking-widest uppercase">
              {blog.category || 'Blog'}
            </span>
          </div>

          <h1
            ref={titleRef}
            className="text-white text-3xl sm:text-5xl lg:text-6xl font-light tracking-[0.15em] mb-4 max-w-4xl leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {blog.title}
          </h1>

          <p
            ref={descRef}
            className="text-gray-200 mt-4 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed font-light tracking-wide"
          >
            {blog.subtitle || 'Insights, updates, and stories from our logistics journey.'}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8 text-gray-300 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="font-light">{blog.author}</span>
            </div>
            <span className="text-gray-400">•</span>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-light">{blog.date}</span>
            </div>
            <span className="text-gray-400">•</span>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-light">{blog.readTime}</span>
            </div>
          </div>
        </div>

        {/* Bottom Curve */}
        <svg
          className="absolute bottom-0 left-0 w-full h-[90px]"
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C360,80 1080,80 1440,0 L1440,90 L0,90 Z"
            fill="#ffffff"
          />
        </svg>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Content - Blog Details */}
          <div className="w-full lg:w-[70%]" ref={contentRef}>
            {/* Image Gallery */}
            {images.length > 0 && (

              <div ref={imageGalleryRef} className="mb-12 content-section">
                {/* Main Image */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-6 group">
                  <img
                    src={images[selectedImage]}
                    alt={`${blog.title} - Image ${selectedImage + 1}`}
                    className="w-full h-[400px] sm:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Thumbnail Gallery */}
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`gallery-item relative rounded-xl overflow-hidden aspect-[4/3] transition-all duration-500 ${
                        selectedImage === index
                          ? 'ring-4 ring-blue-500 shadow-xl scale-105'
                          : 'ring-2 ring-slate-200 hover:ring-slate-400 hover:scale-105 shadow-md'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {selectedImage === index && (
                        <div className="absolute inset-0 bg-blue-500/20" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Blog Content */}
            <article className="prose prose-lg max-w-none content-section">
              <div className="mb-10">
                <div className="flex flex-wrap gap-2 mb-8">
                  {blog.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-sm font-light tracking-wide transition-colors duration-300 cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="prose-content text-slate-700 leading-relaxed">
                  {blog.description?.split('\n\n').map((paragraph, index) => (
                    <p
                      key={index}
                      className="mb-6 text-base sm:text-lg font-light leading-loose tracking-wide first-letter:text-6xl first-letter:font-light first-letter:text-blue-900 first-letter:float-left first-letter:mr-3 first-letter:mt-1"
                      style={{ 
                        fontFamily: "'Crimson Text', serif",
                        textAlign: 'justify',
                        hyphens: 'auto'
                      }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="my-12 flex items-center justify-center">
                <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent w-full max-w-md" />
              </div>

              {/* Share Section */}
              <div className="mt-12 p-8 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border border-slate-200 shadow-lg">
                <h3 className="text-xl font-light text-slate-800 mb-4 tracking-wide">Share this article</h3>
                <div className="flex flex-wrap gap-3">
                  {['Twitter', 'LinkedIn', 'Facebook', 'Email'].map((platform) => (
                    <button
                      key={platform}
                      className="px-6 py-2.5 bg-white hover:bg-slate-800 text-slate-700 hover:text-white rounded-full text-sm font-light tracking-wide transition-all duration-300 shadow-md hover:shadow-xl border border-slate-200 hover:border-slate-800"
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>
            </article>
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-[30%]" ref={sidebarRef}>
            <Sidebar />
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;600&family=Crimson+Text:wght@300;400;600&display=swap');
        
        .delay-700 {
          animation-delay: 700ms;
        }
        
        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default BlogDetails;