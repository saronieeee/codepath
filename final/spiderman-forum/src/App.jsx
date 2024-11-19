import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useParams } from 'react-router-dom';
import './styles.css';

// Mock database
const initialPosts = [
  {
    id: 1,
    title: "Spider-Man Spotted in Queens!",
    content: "Just saw our friendly neighborhood Spider-Man swinging by!",
    imageUrl: "/api/placeholder/800/400",
    upvotes: 15,
    createdAt: new Date('2024-03-15T10:30:00'),
    comments: [
      { id: 1, text: "That's awesome!", createdAt: new Date('2024-03-15T11:00:00') }
    ]
  },
  {
    id: 2,
    title: "Green Goblin Attack at Times Square",
    content: "Breaking news: Spider-Man saves civilians from Green Goblin attack",
    imageUrl: "/api/placeholder/800/400",
    upvotes: 25,
    createdAt: new Date('2024-03-16T15:45:00'),
    comments: []
  }
];

// Marvel logo component
const MarvelLogo = () => (
  <div className="marvel-logo">
    <Link to="/" className="text-white font-bold text-2xl">
      🕷️ SPIDER-FORUM
    </Link>
  </div>
);

// Main App Component
const App = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');

  const addPost = (newPost) => {
    setPosts([...posts, { 
      ...newPost, 
      id: posts.length + 1, 
      upvotes: 0, 
      comments: [], 
      createdAt: new Date() 
    }]);
  };

  const updatePost = (id, updatedPost) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, ...updatedPost } : post
    ));
  };

  const deletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  const addComment = (postId, comment) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, { 
            id: post.comments.length + 1, 
            text: comment, 
            createdAt: new Date() 
          }]
        };
      }
      return post;
    }));
  };

  const upvotePost = (id) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, upvotes: post.upvotes + 1 } : post
    ));
  };

  return (
    <Router>
      <div className="min-h-screen bg-white">
        {/* Main Navigation */}
        <nav className="marvel-main-nav">
          <div className="nav-links">
            <Link to="/" className="nav-link">News</Link>
            <Link to="/comics" className="nav-link">Comics</Link>
            <Link to="/characters" className="nav-link">Characters</Link>
            <Link to="/movies" className="nav-link">Movies</Link>
            <Link to="/tv-shows" className="nav-link">TV Shows</Link>
            <Link to="/games" className="nav-link">Games</Link>
            <Link to="/videos" className="nav-link">Videos</Link>
            <Link to="/more" className="nav-link">More</Link>
          </div>
        </nav>

        {/* Page Title and Filters */}
        <div className="page-title-section">
          <h1 className="page-title">SPIDER-MAN: LATEST POSTS</h1>
          
          <div className="filter-section">
            <button className="filter-button">
              SORT & FILTER
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
            <input 
              type="text" 
              className="search-input"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Main Content */}
        <main className="posts-grid">
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage 
                  posts={posts}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                />
              } 
            />
            <Route path="/create" element={<CreatePost addPost={addPost} />} />
            <Route 
              path="/post/:id" 
              element={
                <PostPage 
                  posts={posts}
                  updatePost={updatePost}
                  deletePost={deletePost}
                  addComment={addComment}
                  upvotePost={upvotePost}
                />
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

const HomePage = ({ posts, searchTerm, setSearchTerm, sortBy, setSortBy }) => {
  const filteredPosts = posts
    .filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => sortBy === 'date' ? b.createdAt - a.createdAt : b.upvotes - a.upvotes);

  return (
    <>
      {filteredPosts.map(post => (
        <Link
          key={post.id}
          to={`/post/${post.id}`}
          className="post-card"
        >
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="post-image"
          />
          <div className="p-4">
            <h2 className="font-bold text-lg mb-2">{post.title}</h2>
            <div className="flex justify-between text-sm text-gray-600">
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              <span>⬆️ {post.upvotes}</span>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

const CreatePost = ({ addPost }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '', imageUrl: '' });
  const [previewImage, setPreviewImage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.title.trim()) {
      addPost(form);
      navigate('/');
    }
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setForm({ ...form, imageUrl: url });
    setPreviewImage(url.trim() !== '');
  };

  return (
    <div className="marvel-content">
      <div className="form-container">
        <div className="form-header">
          <h1 className="text-4xl font-bold text-center">CREATE NEW POST</h1>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="form-input"
              placeholder="Enter your post title"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Content</label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="form-textarea"
              placeholder="Write your post content here..."
            />
          </div>

          <div className="form-group">
            <label className="form-label">Image URL</label>
            <input
              type="url"
              value={form.imageUrl}
              onChange={handleImageUrlChange}
              className="form-input"
              placeholder="Enter the URL of your image"
            />
          </div>

          {previewImage && form.imageUrl && (
            <div className="preview-container">
              <h2 className="text-xl font-bold mb-4">Image Preview</h2>
              <img
                src={form.imageUrl}
                alt="Preview"
                className="preview-image"
                onError={() => setPreviewImage(false)}
              />
            </div>
          )}

          <div className="form-button-container">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="marvel-button marvel-button-secondary"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="marvel-button"
            >
              CREATE POST
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const PostPage = ({ posts, updatePost, deletePost, addComment, upvotePost }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find(p => p.id === parseInt(id));
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(post);
  const [newComment, setNewComment] = useState('');

  if (!post) return (
    <div className="marvel-header">
      <h1 className="marvel-title">POST NOT FOUND</h1>
      <Link to="/" className="marvel-button">
        RETURN TO HOME
      </Link>
    </div>
  );

  const handleEdit = (e) => {
    e.preventDefault();
    updatePost(post.id, editForm);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(post.id);
      navigate('/');
    }
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      addComment(post.id, newComment);
      setNewComment('');
    }
  };

  return (
    <div className="single-post">
      {isEditing ? (
        <div>
          <h1 className="marvel-title">EDIT POST</h1>
          <form onSubmit={handleEdit} className="marvel-form">
            <div className="form-group">
              <label className="form-label">TITLE</label>
              <input
                type="text"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">CONTENT</label>
              <textarea
                value={editForm.content}
                onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                className="form-textarea"
                rows="6"
              />
            </div>
            <div className="form-group">
              <label className="form-label">IMAGE URL</label>
              <input
                type="url"
                value={editForm.imageUrl}
                onChange={(e) => setEditForm({ ...editForm, imageUrl: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="flex gap-4">
              <button type="submit" className="marvel-button">
                SAVE CHANGES
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="marvel-button marvel-button-secondary"
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <h1 className="marvel-title">{post.title}</h1>
          {post.imageUrl && (
            <img src={post.imageUrl} alt={post.title} className="single-post-image" />
          )}
          <p className="text-lg mb-8">{post.content}</p>
          
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => upvotePost(post.id)}
              className="marvel-button"
            >
              UPVOTE ({post.upvotes})
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="marvel-button marvel-button-secondary"
            >
              EDIT
            </button>
            <button
              onClick={handleDelete}
              className="marvel-button marvel-button-secondary"
            >
              DELETE
            </button>
          </div>

          <div className="comments-section">
            <h2 className="text-2xl font-bold mb-6">COMMENTS</h2>
            <form onSubmit={handleComment} className="mb-8">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="form-textarea"
                rows="4"
              />
              <button
                type="submit"
                className="marvel-button"
              >
                POST COMMENT
              </button>
            </form>
            <div className="space-y-4">
              {post.comments.map(comment => (
                <div key={comment.id} className="comment">
                  <p className="mb-2">{comment.text}</p>
                  <span className="text-sm text-gray-600">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;