import Header from "@/components/home/header";
import Link from "next/link";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <Header session={session} />
      <div className="flex items-center justify-center min-h-screen pt-16">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="mb-8 relative">
            <div className="w-20 h-20 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
              <svg
                className="w-10 h-10 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
              <div className="animate-ping absolute h-3 w-3 bg-orange-400 rounded-full opacity-75"></div>
              <div className="animate-ping absolute h-2 w-2 bg-red-400 rounded-full opacity-75 -top-2 -left-2 animation-delay-150"></div>
              <div className="animate-ping absolute h-2 w-2 bg-yellow-400 rounded-full opacity-75 -top-1 left-3 animation-delay-300"></div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4 animate-fade-in-up">
            Payment Cancelled
          </h1>
          <p className="text-gray-600 mb-8 animate-fade-in-up animation-delay-200">
            Your payment has been cancelled. No charges were made to your
            account. You can try again anytime.
          </p>
          <div className="space-y-4 animate-fade-in-up animation-delay-400">
            <Link
              href="/profile"
              className="block w-full bg-orange-600 text-white py-3 px-6 rounded-lg hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Try Again
            </Link>

            <Link
              href="/"
              className="block w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      <div className="fixed bottom-8 right-8 animate-pulse">
        <div className="bg-orange-500 text-white p-3 rounded-full shadow-lg">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
