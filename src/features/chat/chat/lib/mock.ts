// src/features/chat/model/mockMessages.ts

import { Message } from "../model/types";

export const mockMessages: Message[] = [
  {
    id: "1",
    content: "Как у всех 😄",
    createdAt: new Date("2025-12-17T21:49:00"),
    isMine: false,
    files: [],
    status: "seen",
  },
  {
    id: "2",
    content: "Давай спишемся на выходных и договоримся",
    createdAt: new Date("2025-12-17T21:49:30"),
    isMine: true,
    files: [],
    status: "seen",
  },
  {
    id: "3",
    content: "Или могу позвонить",
    createdAt: new Date("2025-12-17T21:49:45"),
    isMine: true,
    files: [],
    status: "seen",
  },
  {
    id: "4",
    content: "Лучше пиши",
    createdAt: new Date("2025-12-17T21:50:00"),
    isMine: false,
    files: [],
    status: "seen",
  },
  {
    id: "5",
    content: "Ок",
    createdAt: new Date("2025-12-17T21:50:10"),
    isMine: true,
    files: [],
    status: "seen",
  },
  {
    id: "6",
    content: "До встречи!",
    createdAt: new Date("2025-12-17T21:50:20"),
    isMine: false,
    files: [],
    status: "seen",
  },
  {
    id: "7",
    content: "Передавай привет Мишане! Буду рад увидеть его тоже.",
    createdAt: new Date("2025-12-17T21:51:00"),
    isMine: false,
    files: [],
    status: "seen",
  },
  {
    id: "8",
    content:
      "Тебе тоже привет от него! Видел его на прошлой неделе. Он пока занят, но может в следующем месяце удастся увидеться.",
    createdAt: new Date("2025-12-17T21:52:00"),
    isMine: true,
    files: [],
    status: "seen",
  },
  {
    id: "9",
    content: "А что у него случилось?",
    createdAt: new Date("2025-12-17T21:52:30"),
    isMine: false,
    files: [],
    status: "seen",
  },
  {
    id: "10",
    content: "Просто очень занят по работе.",
    createdAt: new Date("2025-12-17T21:53:00"),
    isMine: true,
    files: [],
    status: "seen",
  },
  {
    id: "11",
    content: "А он там же работает? В алмазе?",
    createdAt: new Date("2025-12-17T21:53:30"),
    isMine: false,
    files: [],
    status: "seen",
  },
  {
    id: "12",
    content:
      "Нет, он устроился в другое место пару месяцев назад. Думаю он всё сам расскажет при встрече.",
    createdAt: new Date("2025-12-17T21:54:00"),
    isMine: true,
    files: [],
    status: "delivered", // последнее сообщение ещё не прочитано
  },
];
