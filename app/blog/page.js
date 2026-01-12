import Link from 'next/link';
import Image from 'next/image';
import { getAllBlogs } from '@/utils/blog-utils';
import { FaCalendar, FaClock, FaTag, FaArrowRight } from 'react-icons/fa';

function BlogCard({ blog }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Link href={`/blog/${blog.slug}`}>
      <div className="group border border-[#1d293a] hover:border-[#16f2b3] transition-all duration-500 bg-gradient-to-br from-[#1b203e] to-[#16213e] rounded-lg relative overflow-hidden">
        {/* Hover Effect Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#16f2b3]/0 via-[#16f2b3]/5 to-[#16f2b3]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Cover Image */}
        {blog.coverImage ? (
          <div className="h-44 lg:h-52 w-auto cursor-pointer overflow-hidden rounded-t-lg relative">
            <Image
              src={blog.coverImage}
              height={1080}
              width={1920}
              alt={blog.title}
              className="h-full w-full group-hover:scale-110 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1b203e] via-transparent to-transparent"></div>
          </div>
        ) : (
          <div className="h-44 lg:h-52 w-auto bg-gradient-to-br from-[#16f2b3]/20 to-violet-500/20 flex items-center justify-center">
            <div className="text-4xl">📝</div>
          </div>
        )}
        
        <div className="p-4 sm:p-6 flex flex-col relative z-10">
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-[#16f2b3] mb-3">
            <div className="flex items-center gap-1.5">
              <FaCalendar className="text-xs" />
              <span>{formatDate(blog.date)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FaClock className="text-xs" />
              <span>{blog.readingTime || 5} min read</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="my-2 lg:my-3 cursor-pointer text-xl sm:text-2xl font-bold text-white group-hover:text-[#16f2b3] transition-colors duration-300 line-clamp-2">
            {blog.title}
          </h2>

          {/* Description */}
          <p className="mb-4 text-sm lg:text-base text-[#d3d8e8] line-clamp-3 leading-relaxed">
            {blog.description}
          </p>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-[#1a1a2e] border border-[#16f2b3]/20 text-[#16f2b3] rounded text-xs"
                >
                  <FaTag className="inline mr-1 text-[10px]" />
                  {tag}
                </span>
              ))}
              {blog.tags.length > 3 && (
                <span className="px-2 py-1 text-gray-400 text-xs">
                  +{blog.tags.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Read More */}
          <div className="flex items-center gap-2 text-[#16f2b3] group-hover:gap-3 transition-all duration-300 mt-auto pt-2">
            <span className="text-sm font-semibold">Read More</span>
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default async function BlogPage() {
  const blogs = getAllBlogs();

  return (
    <div className="py-8 min-h-screen">
      {/* Header */}
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-2xl rounded-md">
            All Blogs
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      {/* Blog Grid */}
      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {blogs.map((blog) => (
            <BlogCard key={blog.slug} blog={blog} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center py-20">
          <p className="text-2xl text-gray-400">No blogs yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
