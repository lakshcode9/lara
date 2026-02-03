import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, TrendingUp, MessageCircle, Heart } from 'lucide-react';
import { posts } from './data';

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
        {filteredPosts.map((post) => (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            key={post.rank}
            className="card"
          >
            <div className="card-header">
              <div className="rank-badge">
                Rank <span className="rank-number">#{post.rank}</span>
              </div>
              <span className="category-tag">{post.format}</span>
            </div>
            
            <p className="snippet">"{post.snippet}"</p>
            
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

            <div className="card-footer">
              <a href={post.url} target="_blank" rel="noopener noreferrer" className="view-btn">
                View on LinkedIn <ExternalLink size={16} />
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default App;
