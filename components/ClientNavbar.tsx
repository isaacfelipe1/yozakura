import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import './../src/app/globals.css';
import { TbLogout } from 'react-icons/tb';
import { BiSolidUserAccount } from 'react-icons/bi';
import { FaNewspaper, FaRegNewspaper } from 'react-icons/fa';
import { MdPostAdd } from 'react-icons/md';
import { useAuth } from '../src/app/context/AuthContext';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const ClientNavbar: React.FC = () => {
  const router = useRouter();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/LoginPage');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#000000] text-white py-6 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/posts" className="text-[#F2E981] text-xl font-bold">
            Blog Yozakura
          </Link>
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white">
            {isOpen ? <AiOutlineClose className="text-2xl" /> : <AiOutlineMenu className="text-2xl" />}
          </button>
        </div>
        <div className={`md:flex items-center space-x-6 ${isOpen ? 'block' : 'hidden'} md:block`}>
          <div className={`flex flex-col md:flex-row md:items-center md:space-x-6 ${isOpen ? 'space-y-4 md:space-y-0' : ''}`}>
            <Link
              href="/posts"
              className="text-white font-bold flex items-center space-x-2"
            >
              <FaRegNewspaper className="text-2xl" />{' '}
              <span className="text-sm hover:text-[#F2E981]">Últimos Posts</span>
            </Link>
            <Link
              href="/cliente/postsClient"
              className="text-white font-bold flex items-center space-x-2"
            >
              <FaNewspaper className="text-2xl" />{' '}
              <span className="text-sm hover:text-[#F2E981]">Meus Posts</span>
            </Link>
            <Link
              href="/cliente/CreatePostPage"
              className="text-white font-bold flex items-center space-x-2"
            >
              <MdPostAdd className="text-2xl" />{' '}
              <span className="text-sm hover:text-[#F2E981]">Criar Post</span>
            </Link>
            <Link
              href="/cliente/page"
              className="text-white font-bold flex items-center space-x-2"
            >
              <BiSolidUserAccount className="text-2xl" />{' '}
              <span className="text-sm hover:text-[#F2E981]">Perfil</span>
            </Link>
            <div
              onClick={handleLogout}
              className="text-white flex items-center cursor-pointer"
            >
              <span className=" font-bold hover:text-[#F2E981]">Sair</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ClientNavbar;
