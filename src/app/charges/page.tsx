"use client";

import PeriodSelector from "@/components/PeriodSelector";

import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RootState, AppDispatch } from "@/store";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCharges } from "@/store/slices/payments-slice";
import ProtectedLayout from "@/components/ProtectedLayout";

function ChargesPage() {
  const { charges, error, loadingCharges } = useSelector(
    (state: RootState) => state.payments
  );

  const {
    selectedFromPeriod,
    selectedFromYear,
    selectedToPeriod,
    selectedToYear,
  } = useSelector((state: RootState) => state.period);

  const dispatch = useDispatch<AppDispatch>();

  const handlefetchCharges = useCallback(() => {
    const fromPeriod = selectedFromPeriod.value;
    const toPeriod = selectedToPeriod.value;

    dispatch(
      fetchCharges({
        selectedFromYear,
        selectedFromPeriod: fromPeriod,
        selectedToYear,
        selectedToPeriod: toPeriod,
      })
    );
  }, [
    dispatch,
    selectedFromYear,
    selectedFromPeriod,
    selectedToYear,
    selectedToPeriod,
  ]);

  useEffect(() => {
    handlefetchCharges();
  }, [
    selectedFromPeriod,
    selectedFromYear,
    selectedToPeriod,
    selectedToYear,
    handlefetchCharges,
  ]);

  if (loadingCharges) {
    return (
      <div className="flex justify-center items-center h-screen">
        Загрузка...
      </div>
    );
  }

  return (
    <ProtectedLayout>
      <Card className="w-full px-4 sm:px-6 lg:px-10 mx-auto">
        <CardContent>
          <PeriodSelector />

          {error && (
            <div className="flex justify-center items-center h-screen">
              Ошибка: Ошибка: что-то пошло не так
            </div>
          )}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Период</TableHead>
                <TableHead>К оплате на начало месяца</TableHead>
                <TableHead>Начислено</TableHead>
                <TableHead>Оплачено</TableHead>
                <TableHead>К оплате</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {charges.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {row.PeriodName.substring(5, row.PeriodName.length)}
                  </TableCell>
                  <TableCell>{row.DebtByBeginMonth}</TableCell>
                  <TableCell>{row.Amount}</TableCell>
                  <TableCell>{row.Payment}</TableCell>
                  <TableCell>{row.AmountToPay}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </ProtectedLayout>
  );
}

export default ChargesPage;
