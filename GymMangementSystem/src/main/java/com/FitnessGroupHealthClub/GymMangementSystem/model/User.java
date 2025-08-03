package com.FitnessGroupHealthClub.GymMangementSystem.model;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

@Entity
@Component
@Table(name = "users")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id")	
	private long userId;
	@Column(name = "user_name")
	private String userName;
	@Column(name = "user_password")
	private String userPassword;
	@Column(name = "user_email")
	private String userEmail;
	@Column(name = "user_role")
	private String userRole;


	public User(long userId, String userName, String userPassword, String userEmail, String userRole) {
		super();
		this.userId = userId;
		this.userName = userName;
		this.userPassword = userPassword;
		this.userEmail = userEmail;
		this.userRole = userRole;
	}
	public User() {}
	public long getUserId() {
		return userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserPassword() {
		return userPassword;
	}
	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}
	public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	public String getUserRole() {
		return userRole;
	}
	public void setUserRole(String userRole) {
		this.userRole = userRole;
	}
	@Override
	public String toString() {
		return "User{" +
				"userId=" + userId +
				", userName='" + userName + '\'' +
				", userPassword='" + userPassword + '\'' +
				", userEmail='" + userEmail + '\'' +
				", userRole='" + userRole + '\'' +

				'}';
	}
}
