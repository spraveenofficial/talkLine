import { Spinner } from "../Spinner";
export function Button({ children, onClick, loading, ...rest }) {
  return (
    <button
      {...rest}
      className="block flex w-full justify-center bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
      onClick={onClick}
      disabled={loading ? true : false}
    >
      {loading && <Spinner />} {children}
    </button>
  );
}
