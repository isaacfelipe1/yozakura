import React, { useEffect, useState } from 'react';
import { fetchUserPosts, deletePost, updatePost, fetchPostById, Post, UpdatePostDto } from '../src/app/api/api';
import { ImNewspaper } from 'react-icons/im';
import { useRouter } from 'next/router';

const UserPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<number>(5);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [editPostId, setEditPostId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<UpdatePostDto>({ title: '', content: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserPostsData = async () => {
      try {
        const fetchedPosts = await fetchUserPosts();
        const sortedPosts = fetchedPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setPosts(sortedPosts || []);
      } catch (error) {
        console.error('Erro ao buscar posts do usuário:', error);
        setErrorMessage('Erro ao buscar posts do usuário. Por favor, tente novamente mais tarde.');
      }
    };
    fetchUserPostsData();
  }, []);

  const handleLoadMore = () => {
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 5);
  };

  const handlePostClick = (postId: number) => {
    router.push(`/post/${postId}`);
  };

  const handleDeletePost = async (postId: number) => {
    const confirmed = window.confirm('Tem certeza que deseja excluir este post?');
    if (confirmed) {
      try {
        await deletePost(postId);
        setPosts(posts.filter(post => post.id !== postId));
      } catch (error) {
        console.error('Erro ao excluir post:', error);
        setErrorMessage('Erro ao excluir post. Por favor, tente novamente mais tarde.');
      }
    }
  };

  const handleEditPost = async (postId: number) => {
    try {
      const post = await fetchPostById(postId);
      if (post) {
        setEditPostId(postId);
        setEditFormData({ title: post.title, content: post.content });
      }
    } catch (error) {
      console.error('Erro ao buscar post para edição:', error);
      // setErrorMessage('Erro ao buscar post para edição. Por favor, tente novamente mais tarde.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editPostId !== null) {
        await updatePost(editPostId, editFormData);
        setEditPostId(null);
        setEditFormData({ title: '', content: '' });
        const updatedPosts = await fetchUserPosts();
        setPosts(updatedPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      }
    } catch (error) {
      console.error('Erro ao atualizar post:', error);
      setErrorMessage('Erro ao atualizar post. Por favor, tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold w-full bg-[#F2E981] text-center mb-2 flex items-center justify-center">
        Meus Posts <ImNewspaper className="text-3xl ml-2" />
      </h2>
      {errorMessage && (
        <div className="text-red-500 mb-4 text-center">
          {errorMessage}
        </div>
      )}
      {posts.length === 0 ? (
        <div className="text-center text-gray-500">
          Você ainda não criou nenhum post.
        </div>
      ) : (
        <>
          {editPostId === null ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.isArray(posts) &&
                posts.slice(0, visiblePosts).map((post) => (
                  <div
                    key={post.id}
                    className="p-6 bg-[#DEDEDE] border border-gray-200 rounded-lg shadow-md cursor-pointer"
                  >
                    <div onClick={() => handlePostClick(post.id)}>
                      <span className="text-2xl font-bold mb-2 hover:underline">
                        {post.title}
                      </span>
                      <p className="mb-4">{post.content}</p>
                      <p className="text-gray-500">
                        Publicado em: {new Date(post.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        Excluir
                      </button>
                      <button
                        onClick={() => handleEditPost(post.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Editar
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="flex items-start justify-center min-h-screen bg-gray-100 mt-16">
              <form onSubmit={handleSubmit} className="w-full max-w-xl bg-white p-12 border border-gray-200 rounded-lg shadow-md text-left">
                {errorMessage && (
                  <div className="mb-4 text-red-500">{errorMessage}</div>
                )}
                <div className="mb-4">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Título
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={editFormData.title}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                    Conteúdo
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={editFormData.content}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#f39288] hover:bg-[#e98a80] focus:ring-offset-2 focus:ring-indigo-500 ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={loading}
                >
                  {loading ? 'Carregando...' : 'Salvar Alterações'}
                </button>
              </form>
            </div>
          )}
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
        </>
      )}
    </div>
  );
};

export default UserPosts;
