"use client";

import { WalletCard } from "@/components/wallet/WalletCard";
import { useWallets } from "@/hooks/useWallets";

export default function WalletPage() {
  const { wallets, loading, error } = useWallets();

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // const handlePrevious = async () => {
  //   if (pagination.previous) {
  //     const page = Number(
  //       new URL(pagination.previous).searchParams.get("page")
  //     );
  //     await fetchData(page);
  //   }
  // };

  // const handleNext = async () => {
  //   if (pagination.next) {
  //     const page = Number(new URL(pagination.next).searchParams.get("page"));
  //     await fetchData(page);
  //   }
  // };

  return (
    <div className="px-5 pt-5 pb-[30px]">
      <h1>Liste des Portefeuilles</h1>

      {/* Pagination */}
      {/* <div style={{ marginBottom: "20px" }}>
        {pagination.previous && (
          <button onClick={handlePrevious}>Précédent</button>
        )}
        {pagination.next && <button onClick={handleNext}>Suivant</button>}
      </div> */}

      <ul className="grid grid-cols-4">
        {wallets.map((wallet) => (
          <WalletCard key={wallet.id} wallet={wallet} />
        ))}
      </ul>
    </div>
  );
}
