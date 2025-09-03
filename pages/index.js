import Head from "next/head";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import BlogHeader from "../Components/BlogHeader";
import { getAllBlogPosts, getAllTopics } from "../Lib/Data";

export const getStaticProps = () => {
  const allBlogs = getAllBlogPosts();
  const allTopics = getAllTopics();
  return {
    props: {
      blogs: allBlogs,
      topics: allTopics,
    },
  };
};

export default function Home({ blogs, topics }) {
  return (
    <>
      <Head>
        <title>Means</title>
        <meta name="title" content="Means" />
        <meta
          name="description"
          content="Tech blogs and articles on various topics related to Software Development"
        />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tinyurl.com/means-blog" />
        <meta property="og:title" content="Means 🚀" />
        <meta
          property="og:description"
          content="Tech blogs and articles on various topics related to Software Development"
        />
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/RanitDERIA/means-blog/main/Extra/sc.png"
        />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://tinyurl.com/means-blog" />
        <meta property="twitter:title" content="Means 🚀" />
        <meta
          property="twitter:description"
          content="Tech blogs and articles on various topics related to Software Development"
        />
        <meta
          property="twitter:image"
          content="https://raw.githubusercontent.com/RanitDERIA/means-blog/main/Extra/sc.png"
        />
      
      </Head>
      
      <div className="min-h-screen relative bg-white dark:bg-gray-900">
        <Navbar topics={topics} />
        <Header />
        <div className="px-0.5 md:px-7 pb-14 pt-6 mx-auto">
          <div className="flex flex-wrap">
            {blogs &&
              blogs.map(
                (blog) =>
                  blog.data.isPublished && (
                    <BlogHeader
                      key={blog.data.Id}
                      data={blog.data}
                      content={blog.content}
                      readTime={blog.readTime.text}
                    />
                  )
              )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
