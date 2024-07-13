import React from 'react';
import UserPosts from '../../components/UserPosts';
import withAuth from '../../components/Auth';
import ClientNavbar from '../../components/ClientNavbar';
import Footer from '../../components/footer';

const UserPostsPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ClientNavbar />
      <div className="flex-grow container mx-auto p-4">
        <UserPosts />
      </div>
      <Footer />
    </div>
  );
};

export default withAuth(UserPostsPage);
