import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useParams } from 'react-router-dom';
import './styles.css';

// Spider-Man image database
const spiderManImages = [
  '/images/a.jpg',
  '/images/b.jpg',
  '/images/c.jpg',
  '/images/d.jpg',
  '/images/e.jpg',
  '/images/f.jpg',
  '/images/g.jpg'
];

// Function to get random image from database
const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * spiderManImages.length);
  const selectedImage = spiderManImages[randomIndex];
  return selectedImage;
};

// Initial posts data
const initialPosts = [
  {
    id: 1,
    title: "Spider-Man Spotted in Queens!",
    content: "Just saw our friendly neighborhood Spider-Man swinging by!",
    imageUrl: getRandomImage(),
    upvotes: 15,
    createdAt: new Date('2024-03-15T10:30:00'),
    comments: [
      { id: 1, text: "That's our Spider-Man!", createdAt: new Date('2024-03-19T11:00:00') },
      { id: 2, text: "I saw him too! He waved at my kid!", createdAt: new Date('2024-03-19T11:30:00') }
    ]
  },
  {
    id: 2,
    title: "Green Goblin Attack at Times Square",
    content: "Breaking news: Spider-Man saves civilians from Green Goblin attack",
    imageUrl: getRandomImage(),
    upvotes: 25,
    createdAt: new Date('2024-03-16T15:45:00'),
    comments: [
      { id: 3, text: "Green Goblin's getting sloppy!", createdAt: new Date('2024-03-18T16:00:00') }
    ]
  },
  {
    id: 3,
    title: "New Spider-Suit Technology Revealed",
    content: "Spider-Man was seen sporting what appears to be a new suit with enhanced features. Witnesses report seeing new web-shooter configurations and glowing circuits.",
    imageUrl: getRandomImage(),
    upvotes: 289,
    createdAt: new Date('2024-03-17T14:20:00'),
    comments: []
  },
  {
    id: 4,
    title: "Spider-Man and Daredevil Team Up!",
    content: "Hell's Kitchen was treated to a rare sight tonight as Spider-Man and Daredevil worked together to take down a major crime syndicate.",
    imageUrl: getRandomImage(),
    upvotes: 567,
    createdAt: new Date('2024-03-16T22:15:00'),
    comments: [
      { id: 4, text: "Best crossover ever!", createdAt: new Date('2024-03-16T23:00:00') }
    ]
  },
  {
    id: 5,
    title: "Spider-Man Stops Bank Robbery",
    content: "Quick thinking and even quicker reflexes: Spider-Man prevents major heist at Manhattan Bank. Witnesses praise his efficiency and trademark quips.",
    imageUrl: getRandomImage(),
    upvotes: 198,
    createdAt: new Date('2024-03-15T09:30:00'),
    comments: []
  },
  {
    id: 6,
    title: "Late Night Pizza Run with Spidey",
    content: "Joe's Pizza reports Spider-Man stopping by for his usual order. Owner says he's always been a valued customer, even if he's occasionally late.",
    imageUrl: getRandomImage(),
    upvotes: 445,
    createdAt: new Date('2024-03-14T23:45:00'),
    comments: [
      { id: 5, text: "Best pizza in NYC!", createdAt: new Date('2024-03-15T00:30:00') },
      { id: 6, text: "Spider-Man has good taste!", createdAt: new Date('2024-03-15T01:15:00') }
    ]
  },

];

function App() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializePosts = async () => {
      setIsLoading(true);
      const postsWithImages = initialPosts.map(post => ({
        ...post,
        imageUrl: getRandomImage()
      }));
      setPosts(postsWithImages);
      setIsLoading(false);
    };

    initializePosts();
  }, []);

  if (isLoading) {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <Router>
      <div className="app-container">
        <nav className="marvel-nav">
          <div className="nav-content">
            <Link to="/" className="nav-link">HOME</Link>
            <Link to="/news" className="nav-link">RECENT NEWS</Link>
            <Link to="/create" className="nav-link">CREATE POST</Link>
          </div>
        </nav>

        <main className="main-content">
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
            <Route
              path="/news"
              element={
                <NewsPage
                  posts={posts}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                />
              }
            />
            <Route
              path="/create"
              element={<CreatePost setPosts={setPosts} />}
            />
            <Route
              path="/post/:id"
              element={<PostDetail posts={posts} setPosts={setPosts} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

const HomePage = ({ posts, searchTerm, setSearchTerm, sortBy, setSortBy }) => {
  const filteredPosts = posts
    .filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => sortBy === 'date' ? b.createdAt - a.createdAt : b.upvotes - a.upvotes)
    .slice(0, 6);

  return (
    <div className="page-container">
      <h1 className="page-title">SPIDER-MAN: TOP POSTS</h1>

      <div className="filter-section">
        <button className="filter-button">
          SORT & FILTER
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="date">NEWEST</option>
          <option value="upvotes">MOST POPULAR</option>
        </select>

        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="results-count">
        Showing {filteredPosts.length} of {posts.length} results
      </div>

      <div className="posts-grid">
        {filteredPosts.map(post => (
          <Link 
            to={`/post/${post.id}`} 
            key={post.id} 
            className="post-card"
          >
            <div className="post-image-container">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="post-image"
              />
            </div>
            <div className="post-overlay">
              <h2 className="post-title">{post.title}</h2>
              <div className="post-meta">
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                <span className="upvote-count">⬆️ {post.upvotes}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const PostDetail = ({ posts, setPosts }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState('');

  const post = posts.find(p => p.id === parseInt(id));
  console.log('Post found:', post); // Debug log

  if (!post) {
    return (
      <div className="error-container">
        <h2 className="error-title">Post not found</h2>
        <button onClick={() => navigate('/')} className="back-button">
          Return Home
        </button>
      </div>
    );
  }

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment = {
      id: post.comments.length + 1,
      text: comment,
      createdAt: new Date()
    };

    setPosts(currentPosts =>
      currentPosts.map(p =>
        p.id === post.id
          ? { ...p, comments: [...p.comments, newComment] }
          : p
      )
    );

    setComment('');
  };

  return (
    <div className="post-detail-container">
      <div className="post-detail">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>

        <div className="post-content">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="detail-image"
          />

          <h1 className="detail-title">{post.title}</h1>

          <div className="post-info">
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            <span className="upvote-count">⬆️ {post.upvotes}</span>
          </div>

          <p className="post-text">{post.content}</p>

          <div className="comments-section">
            <h2 className="comments-title">Comments</h2>

            <form onSubmit={handleAddComment} className="comment-form">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                className="comment-input"
              />
              <button type="submit" className="submit-button">
                Post Comment
              </button>
            </form>

            <div className="comments-list">
              {post.comments.length === 0 ? (
                <p className="no-comments">No comments yet. Be the first to comment!</p>
              ) : (
                post.comments.map(comment => (
                  <div key={comment.id} className="comment">
                    <p className="comment-text">{comment.text}</p>
                    <span className="comment-date">
                      {new Date(comment.createdAt).toLocaleString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NewsPage = ({ posts, searchTerm, setSearchTerm, sortBy, setSortBy }) => {
  const userCreatedPosts = posts.filter(post =>
    !initialPosts.some(initialPost => initialPost.id === post.id)
  );

  const filteredPosts = userCreatedPosts
    .filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => sortBy === 'date' ? b.createdAt - a.createdAt : b.upvotes - a.upvotes);

  return (
    <div className="page-container">
      <h1 className="page-title">SPIDER-MAN: RECENT NEWS</h1>

      <div className="filter-section">
        <button className="filter-button">
          SORT & FILTER
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="date">NEWEST</option>
          <option value="upvotes">MOST POPULAR</option>
        </select>

        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {userCreatedPosts.length === 0 ? (
        <div className="no-posts-message">
          <p>No posts yet! Create your first news post.</p>
          <Link to="/create" className="create-post-link">
            Create Post
          </Link>
        </div>
      ) : (
        <>
          <div className="results-count">
            Showing {filteredPosts.length} of {userCreatedPosts.length} results
          </div>

          <div className="posts-grid">
            {filteredPosts.map(post => (
              <Link 
                to={`/post/${post.id}`} 
                key={post.id} 
                className="post-card"
              >
                <div className="post-image-container">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="post-image"
                  />
                </div>
                <div className="post-overlay">
                  <h2 className="post-title">{post.title}</h2>
                  <div className="post-meta">
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    <span className="upvote-count">⬆️ {post.upvotes}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const CreatePost = ({ setPosts }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    content: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setPosts(prev => [...prev, {
      ...form,
      id: prev.length + 1,
      imageUrl: getRandomImage(),
      upvotes: 0,
      createdAt: new Date(),
      comments: []
    }]);
    navigate('/news');
  };

  return (
    <div className="page-container">
      <div className="create-form-container">
        <h1 className="page-title">CREATE NEW POST</h1>
        <form onSubmit={handleSubmit} className="create-form">
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="form-input"
              required
              placeholder="Enter post title"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Content</label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="form-textarea"
              placeholder="Write your post content here..."
              rows="6"
              required
            />
          </div>

          <div className="button-container">
            <button type="submit" className="submit-button">
              CREATE POST
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;