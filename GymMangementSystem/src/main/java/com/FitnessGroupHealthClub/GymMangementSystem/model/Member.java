package com.FitnessGroupHealthClub.GymMangementSystem.model;

//import java.sql.Date;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.springframework.stereotype.Component;

@Entity
@Table(name = "member")
@Component
public class Member {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "member_id")
	private long memberId;
	@Column(name = "member_name")
	private String memberName;
	@Column(name = "member_email")
	private String memberEmail;
	@Column(name = "member_phone")
	private int memberPhoneNo;
	@Column(name = "member_Type")
	private String memberShipType;
	@Column(name = "member_startdate")
	private Date startDate;
	@Column(name = "member_expirydate")
	private Date expiryDate;
	@Column(name ="member_status")
	private String status;
	@Column(name ="member_trainerid")
	private String trainerId;


	public long getMemberId() {
		return memberId;
	}

	public void setMemberId(long memberId) {
		this.memberId = memberId;
	}

	public String getMemberName() {
		return memberName;
	}

	public void setMemberName(String memberName) {
		this.memberName = memberName;
	}

	public String getMemberEmail() {
		return memberEmail;
	}

	public void setMemberEmail(String memberEmail) {
		this.memberEmail = memberEmail;
	}

	public int getMemberPhoneNo() {
		return memberPhoneNo;
	}

	public void setMemberPhoneNo(int memberPhoneNo) {
		this.memberPhoneNo = memberPhoneNo;
	}

	public String getMemberShipType() {
		return memberShipType;
	}

	public void setMemberShipType(String memberShipType) {
		this.memberShipType = memberShipType;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getExpiryDate() {
		return expiryDate;
	}

	public void setExpiryDate(Date expiryDate) {
		this.expiryDate = expiryDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getTrainerId() {
		return trainerId;
	}

	public void setTrainerId(String trainerId) {
		this.trainerId = trainerId;
	}

	@Override
	public String toString() {
		return "Member{" +
				"memberId=" + memberId +
				", memberName='" + memberName + '\'' +
				", memberEmail='" + memberEmail + '\'' +
				", memberPhoneNo=" + memberPhoneNo +
				", memberShipType='" + memberShipType + '\'' +
				", startDate=" + startDate +
				", expiryDate=" + expiryDate +
				", status='" + status + '\'' +
				", trainerId='" + trainerId + '\'' +
				'}';
	}
}
