const WalletSkeleton = () => {
  return (
    <div className="flex w-full justify-between xl:max-w-[316px] group gap-2 rounded-3xl border border-neutral-low bg-background p-4">
      <div className="space-y-1">
        {/* Image placeholder */}
        <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />

        {/* Username and email placeholders */}
        <div className="flex flex-col justify-start space-y-1 mt-1">
          <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
          <div className="h-2 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      <div>
        <div className="flex flex-col justify-between h-full">
          {/* Solde actuel section */}
          <div>
            <div className="h-3 w-20 bg-gray-200 rounded animate-pulse mb-1" />
            <div className="flex items-start">
              {/* Euro icon placeholder */}
              <div className="w-3.5 h-3.5 bg-gray-200 rounded animate-pulse mr-1" />
              {/* Amount placeholder */}
              <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>

          {/* En cours section */}
          <div className="text-sm text-neutral-high mt-1 flex items-center gap-1">
            <div className="w-1 h-1 bg-gray-200 rounded-full animate-pulse" />
            <div className="h-3 w-12 bg-gray-200 rounded animate-pulse" />
            <div className="h-2 w-10 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletSkeleton;
