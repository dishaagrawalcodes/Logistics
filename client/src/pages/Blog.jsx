import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from "react-router-dom";
import Sidebar from '../components/Sidebar';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Blog = () => {
  const blog="https://i.ibb.co/PGRSMPB9/blog.png"
  const blog1="https://i.ibb.co/vxXDXbDg/blog1.png";
  const blog2="https://i.ibb.co/8DNr6Jvn/blog2.png";
  const blog3="https://i.ibb.co/G4dGb4cV/blog3.png";
  const blog4="https://i.ibb.co/N2tcBjp7/blog4.png";
  const blog5="https://i.ibb.co/Zpb2dr9x/blog5.png";
  const heroRef = useRef(null);
  const postsRef = useRef([]);
  const titleRef = useRef(null);
  const descRef = useRef(null);

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

  useEffect(() => {
    // Hero animations
    const tl = gsap.timeline();
    tl.fromTo(
      heroRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
    )
    .fromTo(
      titleRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" },
      "-=1"
    )
    .fromTo(
      descRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      "-=0.5"
    );

    // Blog posts animations with ScrollTrigger
    postsRef.current.forEach((post, index) => {
      gsap.fromTo(
        post,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: post,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative w-full h-[420px] sm:h-[500px] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${blog})` }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-blue-950/75" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1
            ref={titleRef}
            className="text-white text-3xl sm:text-5xl font-light tracking-[0.25em] mb-4"
          >
            BLOG
          </h1>

          <p
            ref={descRef}
            className="text-gray-200 mt-4 max-w-xl text-sm sm:text-base leading-relaxed"
          >
            Insights, updates, and stories from our logistics journey.
          </p>
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

      
      {/* Blog Posts + Sidebar Section */}
<section className="py-16 px-4 sm:px-8 lg:px-16 ">
  <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">

   

    {/* LEFT BLOG POSTS */}
    <div className="w-full lg:w-[70%]">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-12">
        Latest Posts
      </h2>

      <div className="space-y-12">
  {blogPosts.map((post, index) => (
    <Link
      to={`/blog/${post._id}`}
      key={post._id}
      ref={(el) => (postsRef.current[index] = el)}
      className="block"
    >
      <section className="flex flex-col md:flex-row items-center gap-10 px-4 md:px-0">

        {/* IMAGE SIDE */}
        <div className="relative shadow-2xl shadow-blue-600/30 rounded-2xl overflow-hidden shrink-0">
          <img
            src={post.image}
            alt={post.title}
            className="max-w-md w-full h-[260px] md:h-[340px] object-cover rounded-2xl"
          />

          {/* FLOATING OVERLAY */}
          <div className="absolute bottom-6 left-6  p-4 rounded-xl shadow-lg max-w-[260px]">
            <p className="text-sm font-medium text-white leading-snug">
              Written by <span className="font-semibold">{post.username}</span>
            </p>
            <p className="text-xs text-gray-50 mt-1">
              {post.date}
            </p>
          </div>
        </div>

        {/* CONTENT SIDE */}
        <div className="max-w-lg text-sm text-slate-600">
          <h3 className="text-xl uppercase font-semibold text-slate-800 tracking-wide">
            {post.title}
          </h3>

          <div className="w-24 h-[3px] my-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-200"></div>

          <p className="mt-6 leading-relaxed">
            {post.description}
          </p>

          <div className="flex items-center w-max gap-2 mt-8 hover:-translate-y-0.5 transition bg-gradient-to-r from-blue-600 to-indigo-500 py-3 px-8 rounded-full text-white">
            <span className="text-sm font-medium">Read more</span>
            <svg
              width="13"
              height="12"
              viewBox="0 0 13 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.53 6.53a.75.75 0 0 0 0-1.06L7.757.697a.75.75 0 1 0-1.06 1.06L10.939 6l-4.242 4.243a.75.75 0 0 0 1.06 1.06zM0 6v.75h12v-1.5H0z"
                fill="#fff"
              />
            </svg>
          </div>
        </div>

      </section>
    </Link>
  ))}
</div>

    </div>
     {/* RIGHT SIDEBAR */}
    <div className="w-full lg:w-[30%]">
      <Sidebar />
    </div>
  </div>
</section>

    </div>
  );
};

export default Blog;