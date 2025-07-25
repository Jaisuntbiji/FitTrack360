package com.FitnessGroupHealthClub.GymMangementSystem.service;

import com.FitnessGroupHealthClub.GymMangementSystem.model.LoginRequest;
import com.FitnessGroupHealthClub.GymMangementSystem.model.Member;
import com.FitnessGroupHealthClub.GymMangementSystem.model.User;
import com.FitnessGroupHealthClub.GymMangementSystem.repository.MemberRepository;
import com.FitnessGroupHealthClub.GymMangementSystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class UserService {

    @Autowired
    MemberService memberService;

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

    public Boolean addUser(@RequestBody User user){
        System.out.println(user);
        userRepository.save(user);
        return true;
    }

    public User getUser(String userEmail) {
        return userRepository.findByUserEmail(userEmail);
    }

    public void updateUSer(User user) {
        userRepository.save(user);
    }
}
