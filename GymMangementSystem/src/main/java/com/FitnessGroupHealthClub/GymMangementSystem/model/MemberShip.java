package com.FitnessGroupHealthClub.GymMangementSystem.model;

import jakarta.persistence.*;

@Entity
@Table(name = "membership")
public class MemberShip {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "membership_id")
    private Long membershipId;

    @Column(name = "membership_name")
    private String membershipName;

    @Column(name = "membership_amount")
    private int membershipAmount;

    public int getMembershipAmount() {
        return membershipAmount;
    }

    public void setMembershipAmount(int membershipAmount) {
        this.membershipAmount = membershipAmount;
    }

    public String getMembershipName() {
        return membershipName;
    }

    public void setMembershipName(String membershipName) {
        this.membershipName = membershipName;
    }

    public Long getMembershipId() {
        return membershipId;
    }

    public void setMembershipId(Long membershipId) {
        this.membershipId = membershipId;
    }
}
