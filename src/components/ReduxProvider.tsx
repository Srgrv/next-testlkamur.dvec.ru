"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
// import Header from "./Header";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      {/* <Header /> */}
      {children}
    </Provider>
  );
}
