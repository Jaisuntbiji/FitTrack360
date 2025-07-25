package com.FitnessGroupHealthClub.GymMangementSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.FitnessGroupHealthClub.GymMangementSystem.model.User;
@Repository
public interface UserRepository extends JpaRepository<User,Long> {

	public User findByUserEmail (String userEmail);

}
