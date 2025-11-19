
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center flex-row bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">
        Welcome to CleanStream!
      </h1>
      <Link href="/dashboard" className="ml-4  text-gray-500 bg-border rounded-md p-1.5 hover:bg-gray-400 hover:text-secondary dark:text-blue-400 dark:hover:bg-zinc-800">
        Go to Dashboard
      </Link>
    </div>
  );
}
