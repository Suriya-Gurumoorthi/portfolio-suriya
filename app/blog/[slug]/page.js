import { notFound } from 'next/navigation';
import { getBlogBySlug, getAllBlogSlugs } from '@/utils/blog-utils';
import { MDXRemote } from 'next-mdx-remote/rsc';
import CodeBlock from '@/app/components/blog/code-block';
import { CounterDemo, TodoDemo } from '@/app/components/blog/interactive-demo';
import ReadingProgress from '@/app/components/blog/reading-progress';
import Link from 'next/link';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

const components = {
  pre: (props) => {
    // Extract language from the child code element
    const codeChild = props.children;
    const className = codeChild?.props?.className || '';
    const language = className.replace(/language-/, '').replace(/hljs/, '').trim() || 'text';
    const children = codeChild?.props?.children;
    
    return <CodeBlock className={`language-${language}`}>{children}</CodeBlock>;
  },
  code: (props) => {
    // Only style inline code (code without language class inside paragraphs)
    // Code blocks inside pre are handled by the pre component above
    const { className, children } = props;
    
    // If it has a language class, it's likely inside a pre - just render normally
    if (className && className.includes('language-')) {
      return <code className={className}>{children}</code>;
    }
    
    // Inline code styling
    return (
      <code className="px-1.5 py-0.5 bg-[#1a1a2e] text-[#16f2b3] rounded text-sm font-mono border border-[#16213e]">
        {children}
      </code>
    );
  },
  CounterDemo,
  TodoDemo,
  h1: (props) => (
    <h1 className="text-4xl md:text-5xl font-bold text-white mt-8 mb-4 bg-gradient-to-r from-[#16f2b3] to-violet-400 bg-clip-text text-transparent">
      {props.children}
    </h1>
  ),
  h2: (props) => (
    <h2 className="text-3xl md:text-4xl font-bold text-white mt-8 mb-4 border-l-4 border-[#16f2b3] pl-4">
      {props.children}
    </h2>
  ),
  h3: (props) => (
    <h3 className="text-2xl md:text-3xl font-semibold text-white mt-6 mb-3">
      {props.children}
    </h3>
  ),
  p: (props) => (
    <p className="text-gray-300 leading-7 mb-4 text-lg">
      {props.children}
    </p>
  ),
  ul: (props) => (
    <ul className="list-disc list-inside space-y-2 mb-4 text-gray-300 ml-4">
      {props.children}
    </ul>
  ),
  ol: (props) => (
    <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-300 ml-4">
      {props.children}
    </ol>
  ),
  li: (props) => (
    <li className="text-gray-300 leading-7">
      {props.children}
    </li>
  ),
  blockquote: (props) => (
    <blockquote className="border-l-4 border-[#16f2b3] pl-4 my-6 italic text-gray-400 bg-[#1a1a2e] py-4 rounded-r-lg">
      {props.children}
    </blockquote>
  ),
  a: (props) => (
    <a
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#16f2b3] hover:text-violet-400 underline transition-colors"
    >
      {props.children}
    </a>
  ),
  strong: (props) => (
    <strong className="text-white font-semibold">
      {props.children}
    </strong>
  ),
  em: (props) => (
    <em className="text-gray-300 italic">
      {props.children}
    </em>
  ),
};

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  
  if (!blog) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  return {
    title: blog.title,
    description: blog.description,
    authors: [{ name: blog.author }],
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: 'article',
      publishedTime: blog.date,
      authors: [blog.author],
      tags: blog.tags,
    },
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <>
      <ReadingProgress />
      <div className="w-full max-w-4xl mx-auto px-4 py-8">

        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[#16f2b3] hover:text-violet-400 mb-6 transition-colors group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Blogs</span>
        </Link>

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight bg-gradient-to-r from-[#16f2b3] via-violet-400 to-pink-400 bg-clip-text text-transparent">
            {blog.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#16f2b3]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#16f2b3]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span>{new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#16f2b3]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span>{blog.readingTime || 5} min read</span>
            </div>
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-[#1a1a2e] border border-[#16f2b3]/30 text-[#16f2b3] rounded-full text-sm hover:bg-[#16f2b3]/10 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#16f2b3] to-transparent"></div>
        </header>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <div className="blog-content text-gray-300">
            <MDXRemote 
              source={blog.content} 
              components={components}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeHighlight],
                },
              }}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-[#16213e]">
          <div className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] rounded-xl p-6 border border-[#16f2b3]/20">
            <p className="text-center text-gray-400">
              Enjoyed this article? Share it with others! 🚀
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

