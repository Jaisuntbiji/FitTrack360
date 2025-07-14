package com.FitnessGroupHealthClub.GymMangementSystem.model;

public class LoginRequest {
	private String userEmail;
	private String password;
	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	@Override
	public String toString() {
		return "LoginRequest{" +
				"userEmail='" + userEmail + '\'' +
				", password='" + password + '\'' +
				'}';
	}
	}
