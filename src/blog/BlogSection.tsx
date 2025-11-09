import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BlogSection.module.css';

interface BlogPost {
  id: string;
  image: string;
  title: string;
  link: string;
  category?: string;
}

const BlogSection: React.FC = () => {
  const navigate = useNavigate();

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      image: '/blog1.png',
      title: "Understanding Toxins and Your Body's Natural Detox System",
      link: '/blog/toxins-natural-detox-system',
      category: 'Wellness'
    },
    {
      id: '2',
      image: '/blog2.png',
      title: 'Understanding Down Syndrome: Insights, Development and Health Considerations',
      link: '/blog/down-syndrome-insights',
      category: 'Health'
    },
    {
      id: '3',
      image: '/blog3.png',
      title: 'Age with grace: Exploring the different facets of aging and techniques to slow the clock',
      link: '/blog/aging-gracefully',
      category: 'Longevity'
    },
    {
      id: '4',
      image: '/blog4.png',
      title: 'What you need to know about super gonorrhea and how to protect yourself',
      link: '/blog/super-gonorrhea-protection',
      category: 'Prevention'
    }
  ];

  const handlePostClick = (link: string) => {
    navigate(link);
  };

  const handleKeyDown = (e: React.KeyboardEvent, link: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handlePostClick(link);
    }
  };

  return (
    <section className={styles.section} aria-labelledby="blog-heading">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="blog-heading" className={styles.heading}>
            Read Our Blog & Learn How to Live Well
          </h2>
          <a href="/blog" className={styles.viewAll} aria-label="View all blog posts">
            View All Posts
            <svg className={styles.arrow} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </header>
        
        <div className={styles.grid}>
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className={styles.card}
              onClick={() => handlePostClick(post.link)}
              onKeyDown={(e) => handleKeyDown(e, post.link)}
              role="button"
              tabIndex={0}
              aria-label={`Read article: ${post.title}`}
            >
              <div className={styles.imageContainer}>
                <img
                  src={post.image}
                  alt=""
                  className={styles.image}
                  loading="lazy"
                />
                {post.category && (
                  <span className={styles.category} aria-label={`Category: ${post.category}`}>
                    {post.category}
                  </span>
                )}
              </div>
              
              <div className={styles.content}>
                <h3 className={styles.title}>{post.title}</h3>
                
                <div className={styles.footer}>
                  <span className={styles.readMore}>
                    Read Article
                    <svg className={styles.readMoreIcon} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;