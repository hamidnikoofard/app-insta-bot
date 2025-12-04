'use client';

import { CreditCard } from 'lucide-react';
import { formatCardNumber, formatPrice } from './utils';
import { Order } from '../../type';

interface CardNumberAndAmountProps {
  payment: Order['payment'];
}

function CardNumberAndAmount({ payment }: CardNumberAndAmountProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-border/50 bg-linear-to-r from-background to-muted/20 hover:border-primary/30 hover:shadow-md transition-all duration-300 h-fit w-full lg:w-auto lg:self-start lg:flex-1">
      <div className="p-3 sm:p-4">
        <div className="flex items-start justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            {/* <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 text-primary shrink-0 shadow-sm">
              <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
            </div> */}
            <div className="flex flex-col gap-2 sm:gap-3 flex-1 min-w-0">
              {/* Card Number */}
              <div className="flex flex-col gap-1 sm:gap-1.5">
                <h3 className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  شماره کارت
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base lg:text-base font-bold text-foreground  tracking-wider break-all">
                    {formatCardNumber(payment.card_number)}
                  </span>
                </div>
              </div>
              {/* Amount */}
              <div className="flex flex-col gap-1 sm:gap-1.5 pt-2 border-t border-border/50">
                <h3 className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  مبلغ پرداخت
                </h3>
                <div className="flex items-baseline gap-1 sm:gap-1.5 flex-wrap">
                  <span className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">
                    {formatPrice(payment.amount)}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                    تومان
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { CardNumberAndAmount };
