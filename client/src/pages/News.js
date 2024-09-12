import React, { useEffect, useState } from "react";

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch news from the NewsAPI
  const fetchNews = async () => {
    try {
      const apiKey = process.env.REACT_APP_NEWS_API_URL; // Use your API key from .env file
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
      );
      const data = await response.json();
      setNews(data.articles || []); // Ensure it's an array
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Fetch news when the component mounts
  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-xl">Loading news...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-xl text-red-600">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Latest News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(news) && news.length > 0 ? (
          news.map((article, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 shadow-lg hover:shadow-2xl transition duration-300"
            >
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-t-lg mb-4"
                />
              )}
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <p className="text-gray-600 mb-4">{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Read more
              </a>
            </div>
          ))
        ) : (
          <div className="text-center mt-10 text-xl">No news articles available.</div>
        )}
      </div>
    </div>
  );
}

export default News;
