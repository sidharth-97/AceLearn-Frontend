import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const MySkeleton = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-3xl p-8 bg-white rounded-md shadow-lg">
    <div className="mb-8 flex flex-col items-center">
          <Skeleton height={24} width={300} style={{ marginBottom: '12px' }} />
          <Skeleton count={2} height={20} width={250} style={{ marginBottom: '8px' }} />
          <Skeleton height={16} width={200} />
        </div>
      <div className="space-y-6 flex flex-col items-center">
        <div className="w-4/5">
          <Skeleton height={16} />
        </div>
        <div className="w-3/5">
          <Skeleton height={16} />
        </div>
        <div className="w-4/6">
          <Skeleton height={16} />
        </div>
        <div className="w-3/4">
          <Skeleton height={16} />
        </div>
        <div className="w-5/6">
          <Skeleton height={16} />
        </div>
      </div>
      <div className="mt-8 flex items-center justify-center">
        <Skeleton height={40} width={200} />
      </div>
    </div>
  </div>
  );
};

export default MySkeleton;
