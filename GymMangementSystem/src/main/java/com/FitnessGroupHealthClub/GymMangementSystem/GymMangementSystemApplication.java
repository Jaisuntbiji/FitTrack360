package com.FitnessGroupHealthClub.GymMangementSystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class GymMangementSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(GymMangementSystemApplication.class, args);
	}

}
