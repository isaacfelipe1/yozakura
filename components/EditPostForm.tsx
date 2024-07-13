import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchPostById, updatePost, Post, UpdatePostDto } from '../src/app/api/api';
import { useAuth } from '../src/app/context/AuthContext';

const EditPostForm = ({ postId }: { postId: number }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState<UpdatePostDto>({ title: '', content: '' });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await fetchPostById(postId);
        if (fetchedPost) {
          setPost(fetchedPost);
          setFormData({ title: fetchedPost.title, content: fetchedPost.content });
        }
      } catch (error) {
        console.error('Erro ao buscar post:', error);
        setErrorMessage('Erro ao buscar post. Por favor, tente novamente mais tarde.');
      }
    };
    fetchPost();
  }, [postId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLoggedIn) {
        await updatePost(postId, formData);
        router.push('/cliente/postsClient');
      } else {
        setErrorMessage('Usuário não autenticado.');
      }
    } catch (error) {
      console.error('Erro ao atualizar post:', error);
      setErrorMessage('Erro ao atualizar post. Por favor, tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  if (!post) return <div>Carregando...</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
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
            value={formData.title}
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
            value={formData.content}
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
  );
};

export default EditPostForm;
