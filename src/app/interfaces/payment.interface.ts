export interface Payment {
  id: number;
  order: {
    id: number;
    orderCode: string;
    user: {
      username: string;
      email: string;
    };
  };
  paymentCode: string;
  amount: number;
  paymentMethod: string;
  status: PaymentStatus;
  vnpayTransactionId?: string;
  vnpayTransactionNo?: string;
  createdDate: string;
  updatedDate: string;
  paymentUrl?: string;
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED'
}

export interface PaymentStatistics {
  totalPayments: number;
  successfulPayments: number;
  failedPayments: number;
  pendingPayments: number;
  totalAmount: number;
  successfulAmount: number;
}

