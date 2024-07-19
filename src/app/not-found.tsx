import Link from 'next/link';
import Footer from '../../components/footer';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-4xl font-bold text-gray-800">Página não existe</h2>
      <p className="text-lg mt-4 text-gray-700">A página que você está procurando não foi encontrada.</p>
      <Link href="/" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
          Voltar para Home
      </Link>
      <Footer />
    </div>
  );
}
