const POSTS_API_BASE_URL = 'http://localhost:8080/api/posts';
const AUTH_API_BASE_URL = 'http://localhost:8080/auth/Account';

export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

export interface CreatePostDto {
  title: string;
  content: string;
}

export interface UpdatePostDto {
  title?: string;
  content?: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginDto {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface UpdateUserDto {
  email: string;
}

export interface User {
  id: string;
  email: string;
  userName: string;
}

export const fetchAllPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${POSTS_API_BASE_URL}/all`);
  if (!response.ok) {
    throw new Error('Erro ao buscar todos os posts');
  }
  const data = await response.json();
  const posts = data.$values || [];
  console.log('Fetched all posts:', posts);
  return posts;
}

export const fetchUserPosts = async (): Promise<Post[]> => {
  const response = await fetch(POSTS_API_BASE_URL, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Erro ao buscar posts do usuário');
  }
  const data = await response.json();
  const posts = data.$values || [];
  console.log('Fetched user posts:', posts);
  return posts;
}

export const fetchPostById = async (postId: number): Promise<Post | null> => {
  const response = await fetch(`${POSTS_API_BASE_URL}/${postId}`, {
    method: 'GET', 
    credentials: 'include'
  });
  if (!response.ok) {
    throw new Error('Erro ao buscar o post por ID');
  }
  const data: Post = await response.json();
  return data;
}

export const createPost = async (postData: CreatePostDto): Promise<Post> => {
  console.log('POSTS_API_BASE_URL:', POSTS_API_BASE_URL);
  console.log('Post data:', postData);
  try {
    const response = await fetch(POSTS_API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
      credentials: 'include',
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    if (!response.ok) {
      console.error('Response status:', response.status);
      console.error('Response headers:', response.headers);
      throw new Error(
        `Erro ao criar o post: ${response.status} - ${response.statusText}`,
      );
    }

    const createdPost: Post = await response.json();
    console.log('Created post:', createdPost);
    return createdPost;
  } catch (error) {
    console.error('Erro ao criar post:', error);
    throw new Error(
      'Erro inesperado ao tentar criar o post. Por favor, tente novamente mais tarde.',
    );
  }
}

export const updatePost = async (
  postId: number,
  postData: UpdatePostDto,
): Promise<Post> => {
  const response = await fetch(`${POSTS_API_BASE_URL}/${postId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Erro ao atualizar o post');
  }

  const data: Post = await response.json();
  return data;
}

export const deletePost = async (postId: number): Promise<void> => {
  const response = await fetch(`${POSTS_API_BASE_URL}/${postId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Erro ao excluir o post');
  }
}

export const registerUser = async (
  registerData: RegisterDto,
): Promise<void> => {
  const response = await fetch(`${AUTH_API_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registerData),
  });

  if (!response.ok) {
    throw new Error('Erro ao registrar usuário');
  }
}

export const loginUser = async (loginData: LoginDto): Promise<void> => {
  const response = await fetch(`${AUTH_API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Erro ao fazer login');
  }
}

export const fetchUser = async (): Promise<User> => {
  const response = await fetch(`${AUTH_API_BASE_URL}/user`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar dados do usuário');
  }

  const data: User = await response.json();
  return data;
}

export const updateUser = async (updateData: UpdateUserDto): Promise<void> => {
  const response = await fetch(`${AUTH_API_BASE_URL}/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Erro ao atualizar usuário');
  }
}

export const deleteUser = async (): Promise<void> => {
  const response = await fetch(`${AUTH_API_BASE_URL}/delete`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Erro ao deletar usuário');
  }
}
