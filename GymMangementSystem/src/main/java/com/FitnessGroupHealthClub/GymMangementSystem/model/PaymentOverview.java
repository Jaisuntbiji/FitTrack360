package com.FitnessGroupHealthClub.GymMangementSystem.model;

import org.springframework.stereotype.Component;

@Component
public class PaymentOverview {



    private int padingPayment;

    private int AmountRecivied;

    public int getAmountRecivied() {
        return AmountRecivied;
    }

    public void setAmountRecivied(int amountRecivied) {
        AmountRecivied = amountRecivied;
    }

    public int getPadingPayment() {
        return padingPayment;
    }

    public void setPadingPayment(int padingPayment) {
        this.padingPayment = padingPayment;
    }

}
