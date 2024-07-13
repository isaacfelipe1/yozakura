import React, { useEffect, useState } from 'react';
import { fetchAllPosts } from '../src/app/api/api';
import { ImNewspaper } from 'react-icons/im';
import { useRouter } from 'next/router';

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<number>(5);
  const router = useRouter();

  useEffect(() => {
    const fetchAllPostsData = async () => {
      try {
        const fetchedPosts = await fetchAllPosts();
        const sortedPosts = fetchedPosts.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setPosts(sortedPosts || []);
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
        setPosts([]);
      }
    };
    fetchAllPostsData();
  }, []);

  const handleLoadMore = () => {
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 5);
  };

  const handlePostClick = (postId: number) => {
    router.push(`/cliente/${postId}`);
  };

  return (
    <div className="container w-full m-auto">
      <h2 className="text-2xl font-bold w-full bg-[#F2E981] text-center mb-2 flex items-center justify-center">
        Últimos Posts <ImNewspaper className="text-3xl ml-2" />
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.isArray(posts) &&
          posts.slice(0, visiblePosts).map((post) => (
            <div
              key={post.id}
              className="p-6 bg-[#DEDEDE] border border-gray-200 rounded-lg shadow-md cursor-pointer hover:shadow-sides transition-shadow duration-300"
              onClick={() => handlePostClick(post.id)}
            >
              <span className="text-2xl font-bold mb-2 hover:underline">
                {post.title}
              </span>
              <p className="mb-4">{post.content}</p>
              <p className="text-gray-500">
                Publicado em: {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
      </div>
      {visiblePosts < posts.length && (
        <div className="text-center mt-8">
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Carregar mais
          </button>
        </div>
      )}
    </div>
  );
};

export default Posts;
