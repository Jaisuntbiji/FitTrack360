package com.FitnessGroupHealthClub.GymMangementSystem.model;

import org.springframework.stereotype.Component;

@Component
public class AdminOverView {
    private int totalMembers;
    private int activeTrainers;
    private int totalClass;
    private int monthlyRevenue;

    public int getActiveTrainers() {
        return activeTrainers;
    }

    public void setActiveTrainers(int activeTrainers) {
        this.activeTrainers = activeTrainers;
    }

    public int getTotalMembers() {
        return totalMembers;
    }

    public void setTotalMembers(int totalMembers) {
        this.totalMembers = totalMembers;
    }

    public int getTotalClass() {
        return totalClass;
    }

    public void setTotalClass(int totalClass) {
        this.totalClass = totalClass;
    }

    public int getMonthlyRevenue() {
        return monthlyRevenue;
    }

    public void setMonthlyRevenue(int monthlyRevenue) {
        this.monthlyRevenue = monthlyRevenue;
    }

}
