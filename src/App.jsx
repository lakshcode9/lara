import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { TrendingUp, MessageCircle, Heart, Calendar } from 'lucide-react';
import { posts } from './data';

const PostCard = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 250; // Character count before truncation
  const shouldTruncate = post.content.length > maxLength;
  
  const displayContent = isExpanded ? post.content : (shouldTruncate ? post.content.slice(0, maxLength) + "..." : post.content);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="card"
    >
      <div className="card-header">
        <div className="rank-badge">
          Rank <span className="rank-number">#{post.rank}</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span className="category-tag" style={{ display: 'flex', alignItems: 'center', gap: '4px', opacity: 0.8 }}>
             <Calendar size={12} /> {post.date}
          </span>
          <span className="category-tag">{post.format}</span>
        </div>
      </div>
      
      <div className="content-body" style={{ flexGrow: 1, marginBottom: '2rem' }}>
        <p className="snippet" style={{ 
          fontSize: '1rem', 
          lineHeight: '1.6', 
          color: 'var(--text-primary)',
          whiteSpace: 'pre-wrap', // Preserve newlines
          fontFamily: 'inherit'
        }}>
          {displayContent}
        </p>
        
        {shouldTruncate && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--accent)', 
              cursor: 'pointer', 
              marginTop: '0.5rem',
              fontWeight: '600',
              fontSize: '0.9rem',
              padding: 0
            }}
          >
            {isExpanded ? "Show Less" : "Read More"}
          </button>
        )}
      </div>

      <div className="stats-container" style={{ marginTop: 'auto', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
        <div className="stat-item">
          <span className="stat-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Heart size={14} /> Likes
          </span>
          <span className="stat-value">{post.reactions.toLocaleString()}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MessageCircle size={14} /> Comments
          </span>
          <span className="stat-value">{post.comments.toLocaleString()}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingUp size={14} /> Score
          </span>
          <span className="stat-value highlight">{post.engagementScore.toLocaleString()}</span>
        </div>
      </div>

      {post.url && (
        <div className="card-footer" style={{ marginTop: '1.5rem' }}>
          <a 
            href={post.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="view-btn"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '0.5rem',
              width: '100%',
              padding: '0.8rem',
              borderRadius: '0.75rem',
              background: 'rgba(255, 255, 255, 0.05)',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              border: '1px solid transparent'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'var(--text-primary)';
              e.currentTarget.style.color = 'var(--bg-primary)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
          >
            Open on LinkedIn <ExternalLink size={16} />
          </a>
        </div>
      )}
    </motion.div>
  );
};

const App = () => {
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', ...new Set(posts.map(p => p.category))];
  
  const filteredPosts = filter === 'All' 
    ? posts 
    : posts.filter(p => p.category === filter);

  return (
    <div className="container">
      <header>
        <span className="brand">3H Creator</span>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Lara Acosta's<br/>Viral Posts
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="subtitle"
        >
          Curated analysis of high-performing content and viral frameworks.
        </motion.p>
      </header>

      <div className="controls">
        {categories.map(cat => (
          <button 
            key={cat}
            className={`filter-btn ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div 
        layout
        className="posts-grid"
      >
        <AnimatePresence>
          {filteredPosts.map((post) => (
            <PostCard key={post.rank} post={post} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default App;
