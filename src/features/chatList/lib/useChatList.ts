// "use client";

"use client";

import { useEffect } from "react";

import { getChatList } from "../api/getChatList";
import { useChatListStore } from "../model/useChatListStore";

export const useChatList = () => {
  const mergeFromPages = useChatListStore((s) => s.mergeFromPages);
  const setCount = useChatListStore((s) => s.setCount);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await getChatList();

        if (cancelled) return;

        mergeFromPages([
          {
            results: res.results,
          },
        ]);

        setCount(res.count);
      } catch (e) {
        console.error("Не удалось загрузить чаты", e);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [mergeFromPages, setCount]);
};

// import { useEffect } from "react";

// import { getChatList } from "../api/getChatList";
// import { useChatListStore } from "../model/useChatListStore";
// // import { useChatListStore } from "../model/store";

// export const useChatList = () => {
//   const { setChats, setLoading, setError } = useChatListStore();

//   useEffect(() => {
//     let cancelled = false;

//     const load = async () => {
//       try {
//         setLoading(true);
//         const chats = await getChatList();
//         if (!cancelled)
//           setChats({
//             results: chats.results,
//             next: chats.next,
//             count: chats.count,
//             append: false,
//           });
//       } catch {
//         if (!cancelled) setError("Не удалось загрузить чаты");
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     };

//     load();

//     return () => {
//       cancelled = true;
//     };
//   }, [setChats, setLoading, setError]);
// };
