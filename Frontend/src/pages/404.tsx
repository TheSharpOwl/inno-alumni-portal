import { useRouter } from 'next/router';

export default function ErrorPage() {
  const router = useRouter();

  const handleGoHomeClick = () => {
    router.push('/');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#2A347B]">
      <div className="flex flex-col items-center justify-center px-6 py-4 rounded shadow-lg bg-[#FFFFFF]">
        <div className="mb-2 text-xl font-bold">
          404 - Sorry could not find this page 😅
        </div>
        <button
          className="px-4 py-2 mt-4 text-white bg-[#4ca336] rounded hover:bg-[#40BA21]"
          onClick={handleGoHomeClick}
        >
          Go back to home page
        </button>
      </div>
    </div>
  );
}
