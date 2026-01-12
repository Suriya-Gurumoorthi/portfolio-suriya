import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogsDirectory = path.join(process.cwd(), 'content/blogs');

export function getAllBlogs() {
  // Get all MDX files
  const fileNames = fs.readdirSync(blogsDirectory);
  const allBlogsData = fileNames
    .filter((name) => name.endsWith('.mdx'))
    .map((fileName) => {
      // Remove .mdx extension to get slug
      const slug = fileName.replace(/\.mdx$/, '');
      
      // Read markdown file as string
      const fullPath = path.join(blogsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // Use gray-matter to parse the post metadata section
      const { data, content } = matter(fileContents);
      
      // Combine the data with the slug
      return {
        slug,
        content,
        ...data,
      };
    })
    // Sort posts by date
    .sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  
  return allBlogsData;
}

export function getBlogBySlug(slug) {
  const fullPath = path.join(blogsDirectory, `${slug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    slug,
    content,
    ...data,
  };
}

export function getAllBlogSlugs() {
  const fileNames = fs.readdirSync(blogsDirectory);
  return fileNames
    .filter((name) => name.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''));
}

