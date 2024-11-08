import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import { useBlogs } from "../hooks";

// Array of quotes with authors
const quotes = [
  {
    quote: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    quote: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
  },
  {
    quote: "The journey of a thousand miles begins with one step.",
    author: "Lao Tzu",
  },
  {
    quote: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
  },
  {
    quote: "Happiness is not something ready made. It comes from your own actions.",
    author: "Dalai Lama",
  },
  {
    quote: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
  },
  {
    quote: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    quote: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
  },
  {
    quote: "You miss 100% of the shots you don’t take.",
    author: "Wayne Gretzky",
  },
];

export default function Blogs() {
  const { loading, blogs } = useBlogs();

  // Select a random quote each time the component renders
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  if (loading) {
    return (
      <div className="font-head">
        <Appbar write={true} />
        <div className="flex justify-center pt-16">
          <div className="flex flex-col justify-center w-5/6 gap-7 lg:w-1/2 md:w-2/3">
            {/* Loading placeholder content */}
            <p className="h-4 bg-gray-200 rounded-full" style={{ width: "40%" }}></p>
            <ul className="mt-5 space-y-3">
              <li className="w-full h-4 bg-gray-200 rounded-full"></li>
              <li className="w-full h-4 bg-gray-200 rounded-full"></li>
              <li className="w-full h-4 bg-gray-200 rounded-full"></li>
              <li className="w-full h-4 bg-gray-200 rounded-full"></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="font-head">
      <Appbar write={true} />
      <div className="flex justify-center pt-16">
        {/* Main content container with left (blogs) and right (quote) sections */}
        <div className="flex w-5/6 lg:w-3/4 gap-10">
          {/* Left section for blogs */}
          <div className="flex flex-col justify-center w-full lg:w-2/3 gap-7">
            <h1 className="text-3xl font-bold mb-4">Latest Blogs</h1>
            {blogs.map((blog) => (
              <BlogCard
                authorId={blog.authorId}
                key={blog.id}
                id={blog.id}
                authorName={blog.author.name}
                content={blog.content}
                title={blog.title}
                publishedDate={blog.postedOn.substring(0, 8)}
              />
            ))}
          </div>

          {/* Right section for Quote of the Day */}
          <div className="hidden lg:flex flex-col w-1/3 px-6">
            <div className="p-6 bg-[#068932] text-white rounded-md shadow-md">
              <h2 className="text-lg font-bold mb-4">Quote of the Day</h2>
              <p className="italic">"{randomQuote.quote}"</p>
              <p className="mt-4 text-right">- {randomQuote.author}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
