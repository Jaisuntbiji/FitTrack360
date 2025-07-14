package com.FitnessGroupHealthClub.GymMangementSystem.service;

import com.FitnessGroupHealthClub.GymMangementSystem.model.LoginRequest;
import com.FitnessGroupHealthClub.GymMangementSystem.model.User;
import com.FitnessGroupHealthClub.GymMangementSystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public User loginAuth (LoginRequest loginRequest) {
        User user = null;
        user = userRepository.findByUserEmail(loginRequest.getUserEmail());
        if(user.getUserPassword().equals(loginRequest.getPassword())){
            System.out.println(user);
            user.setUserPassword(" ");
            System.out.println(user);
            return user;
        }
        return null;
    }

}
