
const PremiumMessage = () => {
  return (
    <div>
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h1 className="text-3xl font-bold mb-4">
            Upgrade to Premium for Exclusive Content!
          </h1>
          <p className="text-gray-600 mb-8">
            Unlock premium features and content by becoming a premium user.
          </p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Buy Premium
          </button>
        </div>
      </div>
    </div>
  );
};

export default PremiumMessage;
