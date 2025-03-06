"use client";

import { fetchAccounts } from "@/store/slices/account-slice";
import { useEffect } from "react";
import type { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import AccountCard from "@/components/AccountCard";
import ProtectedLayout from "@/components/ProtectedLayout";

function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { accounts, loading, error } = useSelector(
    (state: RootState) => state.accounts
  );

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Загрузка...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        Ошибка: Ошибка: что-то пошло не так
      </div>
    );
  }

  return (
    <ProtectedLayout>
      <div className="flex flex-col  w-full px-4 sm:px-6 lg:px-10 mx-auto">
        {accounts.map((item) => (
          <AccountCard
            key={item.SubscrId}
            SubscrCode={item.SubscrCode}
            OrgId={item.OrgId}
            SubscrId={item.SubscrId}
            FIO={item.FIO}
            Address={item.Address}
          />
        ))}
      </div>
    </ProtectedLayout>
  );
}

export default HomePage;
