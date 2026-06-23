type LoadingScreenProps = {
  label?: string;
};

export default function LoadingScreen({
  label = "Loading...",
}: LoadingScreenProps) {
  return (
    <section className="min-h-[60vh] bg-black px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-center">
        <div className="w-full max-w-md rounded-md border border-[#222] bg-[#111] p-6 text-center shadow-sm">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-gray-700 border-t-white" />
          <p className="text-sm font-medium text-gray-300">{label}</p>
        </div>
      </div>
    </section>
  );
}
