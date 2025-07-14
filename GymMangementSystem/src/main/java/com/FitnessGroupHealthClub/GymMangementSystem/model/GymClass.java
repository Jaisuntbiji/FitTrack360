package com.FitnessGroupHealthClub.GymMangementSystem.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "GymClass")
public class GymClass {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "gymclass_id")
	private long gymclassId;
	@Column(name = "gymclass_name")
	private String gymclassName;
	@Column(name = "gymclass_trainerId")
	private long gymclassTrainerId;
	@Column(name = "gymclass_schedule")
	private String gymclassSchedule;
	@Column(name = "gymclass_capacity")
	private int gymclassCapacity;
	@Column(name = "gymclass_enrolled")
	private int gymclassEnrolled;
	@Column(name = "gymclass_duration")
	private String gymclassDuration;
	
	
	
	

}
