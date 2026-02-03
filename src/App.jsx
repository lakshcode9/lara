import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { ExternalLink, TrendingUp, MessageCircle, Heart, ChevronDown, ChevronUp } from 'lucide-react';
import { LinkedInEmbed } from 'react-social-media-embed';
import { posts } from './data';

const PostCard = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  // Only attempt to embed if the URL looks like a specific post, not a profile activity feed
  const canEmbed = post.url.includes('/posts/') || post.url.includes('/activity/') || post.url.includes('/urn:li:');

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
        <span className="category-tag">{post.format}</span>
      </div>
      
      <p className="snippet">"{post.snippet}"</p>
      
      {isExpanded && canEmbed && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="embed-container"
          style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}
        >
          <LinkedInEmbed url={post.url} width="100%" height={500} />
        </motion.div>
      )}

      <div className="stats-container">
        <div className="stat-item">
          <span className="stat-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Heart size={10} /> Likes
          </span>
          <span className="stat-value">{post.reactions.toLocaleString()}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MessageCircle size={10} /> Comments
          </span>
          <span className="stat-value">{post.comments.toLocaleString()}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingUp size={10} /> Score
          </span>
          <span className="stat-value highlight">{post.engagementScore.toLocaleString()}</span>
        </div>
      </div>

      <div className="card-footer" style={{ display: 'flex', gap: '0.5rem' }}>
        <a href={post.url} target="_blank" rel="noopener noreferrer" className="view-btn" style={{ flex: 1 }}>
          View on LinkedIn <ExternalLink size={16} />
        </a>
        {canEmbed && (
          <button 
            className="view-btn" 
            style={{ width: 'auto', padding: '0.8rem' }}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        )}
      </div>
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
