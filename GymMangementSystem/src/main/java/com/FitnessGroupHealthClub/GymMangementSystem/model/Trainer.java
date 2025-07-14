package com.FitnessGroupHealthClub.GymMangementSystem.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.springframework.stereotype.Component;

@Entity
@Table(name = "trainer")
@Component
public class Trainer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "trainer_id")
	private long trainerId;
	@Column(name = "trainer_name")
	private String trainerName;
	@Column(name = "trainer_email")
	private String trainerEmail;
	@Column(name = "trainer_phone")
	private long trainerPhone;
	@Column(name = "trainer_specialties")
	private String trainerSpecialties;
	@Column(name = "trainer_schedule")
	private String trainerSchedule;
	@Column(name = "trainer_status")
	private String trainerStatus;

	public long getTrainerId() {
		return trainerId;
	}

	public void setTrainerId(long trainerId) {
		this.trainerId = trainerId;
	}

	public String getTrainerName() {
		return trainerName;
	}

	public void setTrainerName(String trainerName) {
		this.trainerName = trainerName;
	}

	public String getTrainerEmail() {
		return trainerEmail;
	}

	public void setTrainerEmail(String trainerEmail) {
		this.trainerEmail = trainerEmail;
	}

	public long getTrainerPhone() {
		return trainerPhone;
	}

	public void setTrainerPhone(long trainerPhone) {
		this.trainerPhone = trainerPhone;
	}

	public String getTrainerSpecialties() {
		return trainerSpecialties;
	}

	public void setTrainerSpecialties(String trainerSpecialties) {
		this.trainerSpecialties = trainerSpecialties;
	}

	public String getTrainerSchedule() {
		return trainerSchedule;
	}

	public void setTrainerSchedule(String trainerSchedule) {
		this.trainerSchedule = trainerSchedule;
	}

	public String getTrainerStatus() {
		return trainerStatus;
	}

	public void setTrainerStatus(String status) {
		this.trainerStatus = status;
	}

	@Override
	public String toString() {
		return "Trainer{" +
				"trainerId=" + trainerId +
				", trainerName='" + trainerName + '\'' +
				", trainerEmail='" + trainerEmail + '\'' +
				", trainerPhone=" + trainerPhone +
				", trainerSpecialties='" + trainerSpecialties + '\'' +
				", trainerSchedule='" + trainerSchedule + '\'' +
				", status='" + trainerStatus + '\'' +
				'}';
	}
}
