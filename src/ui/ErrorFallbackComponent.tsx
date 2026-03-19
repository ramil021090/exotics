// import { FallbackProps } from "react-error-boundary";
interface FallbackProps {
  error: unknown;
  resetErrorBoundary: (...args: unknown[]) => void;
}

const ErrorFallbackComponent = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  const errorMessage = error instanceof Error ? error.message : String(error);
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center h-screen p-4 text-center"
    >
      <p className="text-2xl font-bold text-red-600">Something went wrong 🧐</p>
      <p className="text-gray-700 mt-2">{errorMessage}</p>
      <button
        onClick={resetErrorBoundary}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Try again
      </button>
    </div>
  );
};

export default ErrorFallbackComponent;
