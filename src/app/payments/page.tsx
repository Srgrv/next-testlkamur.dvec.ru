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

import { fetchPayments } from "@/store/slices/payments-slice";
import ProtectedLayout from "@/components/ProtectedLayout";

function PaymentsPage() {
  const { loadingPayments, error, payments } = useSelector(
    (state: RootState) => state.payments
  );

  const {
    selectedFromPeriod,
    selectedFromYear,
    selectedToPeriod,
    selectedToYear,
  } = useSelector((state: RootState) => state.period);

  const dispatch = useDispatch<AppDispatch>();

  const handlefetchPayments = useCallback(() => {
    const fromPeriod = selectedFromPeriod.value;
    const toPeriod = selectedToPeriod.value;
    const subscrId = 886458;
    dispatch(
      fetchPayments({
        subscrId,
        selectedFromPeriod: fromPeriod,
        selectedFromYear,
        selectedToPeriod: toPeriod,
        selectedToYear,
      })
    );
  }, [
    dispatch,
    selectedFromPeriod,
    selectedFromYear,
    selectedToPeriod,
    selectedToYear,
  ]);

  useEffect(() => {
    handlefetchPayments();
  }, [
    selectedFromPeriod,
    selectedFromYear,
    selectedToPeriod,
    selectedToYear,
    handlefetchPayments,
  ]);

  if (loadingPayments) {
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
              Ошибка: что-то пошло не так
            </div>
          )}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Период</TableHead>
                <TableHead>Идентификатор ЛС</TableHead>
                <TableHead>Группа услуг</TableHead>
                <TableHead>Начислено</TableHead>
                <TableHead>Источник платежа</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {payments.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {row.PeriodName.substring(5, row.PeriodName.length)}
                  </TableCell>
                  <TableCell>{row.SubscrId}</TableCell>
                  <TableCell>{row.ServiceGroupName}</TableCell>
                  <TableCell>{row.Amount}</TableCell>
                  <TableCell>{row.PaymentSource}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </ProtectedLayout>
  );
}

export default PaymentsPage;
