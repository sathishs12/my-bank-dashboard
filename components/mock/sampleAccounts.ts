// src/mock/sampleAccounts.ts

import { IAccount } from "@/models/Account";

interface testData {
  _id: string;
  name: string;
  accountNo: string;
  currentBalance: number;
  status: "active" | "inactive" | "closed";
  updatedAt: Date;
}

export const sampleAccounts: testData[] = [
  {
    _id: "1",
    name: "Alice Smith",
    accountNo: "ACC1001",
    currentBalance: 2500.5,
    status: "active",
    updatedAt: new Date("2025-06-01")
  },
  {
    _id: "2",
    name: "Bob Johnson",
    accountNo: "ACC1002",
    currentBalance: 1000,
    status: "inactive",
    updatedAt: new Date("2025-06-04")
  },
  {
    _id: "3",
    name: "Charlie Williams",
    accountNo: "ACC1003",
    currentBalance: 5000,
    status: "closed",
    updatedAt: new Date("2025-06-07")
  },
  {
    _id: "4",
    name: "Diana Ross",
    accountNo: "ACC1004",
    currentBalance: 750,
    status: "active",
    updatedAt: new Date("2025-06-10")
  },
  {
    _id: "5",
    name: "Ethan Harper",
    accountNo: "ACC1005",
    currentBalance: 3700,
    status: "inactive",
    updatedAt: new Date("2025-06-12")
  },
  {
    _id: "6",
    name: "Fiona Mitchell",
    accountNo: "ACC1006",
    currentBalance: 2200,
    status: "active",
    updatedAt: new Date("2025-06-15")
  },
  {
    _id: "7",
    name: "George Peterson",
    accountNo: "ACC1007",
    currentBalance: 3100,
    status: "closed",
    updatedAt: new Date("2025-06-16")
  },
  {
    _id: "8",
    name: "Hannah Scott",
    accountNo: "ACC1008",
    currentBalance: 4050,
    status: "active",
    updatedAt: new Date("2025-06-11")
  },
  {
    _id: "9",
    name: "Ian Mitchell",
    accountNo: "ACC1009",
    currentBalance: 2890,
    status: "inactive",
    updatedAt: new Date("2025-06-12")
  },
  {
    _id: "10",
    name: "Jennifer Lopez",
    accountNo: "ACC1010",
    currentBalance: 1330,
    status: "closed",
    updatedAt: new Date("2025-06-05")
  },
  {
    _id: "11",
    name: "Kate Turner",
    accountNo: "ACC1011",
    currentBalance: 1555,
    status: "active",
    updatedAt: new Date("2025-06-05")
  },
  {
    _id: "12",
    name: "Leon Thomas",
    accountNo: "ACC1012",
    currentBalance: 4900,
    status: "active",
    updatedAt: new Date("2025-05-29")
  },
  {
    _id: "13",
    name: "Mike Harper",
    accountNo: "ACC1013",
    currentBalance: 220,
    status: "closed",
    updatedAt: new Date("2025-05-30")
  },
  {
    _id: "14",
    name: "Nancy Kerrigan",
    accountNo: "ACC1014",
    currentBalance: 100,
    status: "inactive",
    updatedAt: new Date("2025-06-04")
  },
  {
    _id: "15",
    name: "Oscar Peterson",
    accountNo: "ACC1015",
    currentBalance: 370,
    status: "active",
    updatedAt: new Date("2025-05-06")
  },
];
