import React from 'react';
import EditPostForm from '../../components/EditPostForm';
import { useRouter } from 'next/router';
import withAuth from '../../components/Auth';

const EditPostPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id || Array.isArray(id)) {
    return <div>Post não encontrado.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <EditPostForm postId={parseInt(id)} />
    </div>
  );
};

export default withAuth(EditPostPage);
