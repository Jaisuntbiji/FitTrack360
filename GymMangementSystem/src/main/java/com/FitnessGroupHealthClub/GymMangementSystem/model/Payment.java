package com.FitnessGroupHealthClub.GymMangementSystem.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.springframework.stereotype.Component;

import java.util.Date;

@Entity
@Table(name = "payment")
@Component
public class Payment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "payment_id")
	private long paymentId;
	@Column(name = "memberid")
	private long memberId;
	@Column(name = "payment_amount")
	private int payment_amount;
	@Column(name = "payment_type")
	private String payment_type;
	@Column(name = "payment_status")
	private String payment_status;
	@Column(name = "payment_duedate")
	private Date payment_dueDate;
	@Column(name = "payment_paiddate")
	private Date payment_paidDate;

	public long getPaymentId() {
		return paymentId;
	}

	public void setPaymentId(long paymentId) {
		this.paymentId = paymentId;
	}

	public long getMemberId() {
		return memberId;
	}

	public void setMemberId(long memberId) {
		this.memberId = memberId;
	}

	public int getPayment_amount() {
		return payment_amount;
	}

	public void setPayment_amount(int payment_amount) {
		this.payment_amount = payment_amount;
	}

	public String getPayment_type() {
		return payment_type;
	}

	public void setPayment_type(String payment_type) {
		this.payment_type = payment_type;
	}

	public String getPayment_status() {
		return payment_status;
	}

	public void setPayment_status(String payment_status) {
		this.payment_status = payment_status;
	}

	public Date getPayment_dueDate() {
		return payment_dueDate;
	}

	public void setPayment_dueDate(Date payment_dueDate) {
		this.payment_dueDate = payment_dueDate;
	}

	public Date getPayment_paidDate() {
		return payment_paidDate;
	}

	public void setPayment_paidDate(Date payment_paidDate) {
		this.payment_paidDate = payment_paidDate;
	}
}
