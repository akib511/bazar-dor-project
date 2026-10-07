"use client";

import { useSyncExternalStore } from "react";

const formatDate = () =>
  new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  });

// কোনো external event নেই, তাই subscribe এ কিছু করার দরকার নেই
const subscribe = () => () => {};

const CurrentDate = () => {
  const date = useSyncExternalStore(
    subscribe,
    formatDate, // client এ এই value ব্যবহার হবে
    () => "" // server/prerender এ এটা ব্যবহার হবে
  );

  return <p className="mt-1 min-h-5 text-sm text-gray-500">{date}</p>;
};

export default CurrentDate;