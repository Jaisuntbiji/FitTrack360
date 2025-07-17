import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  membershipType: string;
  startDate: string;
  expiryDate: string;
  status: "active" | "expired" | "suspended";
  trainerId?: string;
}

export interface Trainer {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialties: string[];
  schedule: string[];
  status: "active" | "inactive";
}

export interface GymClass {
  id: string;
  name: string;
  trainerId: string;
  schedule: string;
  capacity: number;
  enrolled: number;
  duration: string;
}

export interface Payment {
  paymentId: string;
  memberId: string;
  amount: number;
  type: string;
  status: "paid" | "pending" | "overdue";
  dueDate: string;
  paidDate?: string;
}

interface DataContextType {
  members: Member[];
  trainers: Trainer[];
  classes: GymClass[];
  payments: Payment[];
  addMember: (member: Omit<Member, "id">) => void;
  updateMember: (id: string, member: Partial<Member>) => void;
  addTrainer: (trainer: Omit<Trainer, "id">) => void;
  updateTrainer: (id: string, trainer: Partial<Trainer>) => void;
  addClass: (gymClass: Omit<GymClass, "id">) => void;
  addPayment: (payment: Omit<Payment, "id">) => void;
  updatePayment: (id: string, payment: Partial<Payment>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [members, setMembers] = useState<Member[]>([]);

  const [trainers, setTrainers] = useState<Trainer[]>([]);

  const [classes, setClasses] = useState<GymClass[]>([]);

  const [payments, setPayments] = useState<Payment[]>([]);

  const addMember = (member: Omit<Member, "id">) => {
    const newMember = { ...member, id: Date.now().toString() };

    setMembers((prev) => [...prev, newMember]);
  };

  const updateMember = (id: string, member: Partial<Member>) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...member } : m))
    );
  };

  const addTrainer = (trainer: Omit<Trainer, "id">) => {
    const newTrainer = { ...trainer, id: Date.now().toString() };
    setTrainers((prev) => [...prev, newTrainer]);
  };

  const updateTrainer = (id: string, trainer: Partial<Trainer>) => {
    setTrainers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...trainer } : t))
    );
  };

  const addClass = (gymClass: Omit<GymClass, "id">) => {
    const newClass = { ...gymClass, id: Date.now().toString() };
    setClasses((prev) => [...prev, newClass]);
  };

  const addPayment = (payment: Omit<Payment, "id">) => {
    const newPayment = { ...payment, id: Date.now().toString() };
    setPayments((prev) => [...prev, newPayment]);
  };

  const updatePayment = (id: string, payment: Partial<Payment>) => {
    setPayments((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...payment } : p))
    );
  };

  const value = {
    members,
    trainers,
    classes,
    payments,
    addMember,
    updateMember,
    addTrainer,
    updateTrainer,
    addClass,
    addPayment,
    updatePayment,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
