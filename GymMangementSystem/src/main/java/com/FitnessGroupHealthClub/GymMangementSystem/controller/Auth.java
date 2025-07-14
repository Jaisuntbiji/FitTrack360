package com.FitnessGroupHealthClub.GymMangementSystem.controller;

import com.FitnessGroupHealthClub.GymMangementSystem.model.AdminOverView;
import com.FitnessGroupHealthClub.GymMangementSystem.model.LoginRequest;
import com.FitnessGroupHealthClub.GymMangementSystem.model.Trainer;
import com.FitnessGroupHealthClub.GymMangementSystem.model.User;
import com.FitnessGroupHealthClub.GymMangementSystem.service.AdminOverViewService;
import com.FitnessGroupHealthClub.GymMangementSystem.service.MemberService;
import com.FitnessGroupHealthClub.GymMangementSystem.service.TrianerService;
import com.FitnessGroupHealthClub.GymMangementSystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class Auth {

    @Autowired
    UserService userService;

    @Autowired
    AdminOverViewService adminOverViewService;


    @PostMapping("/login")
    public User login(@RequestBody LoginRequest loginRequest) {
        return userService.loginAuth(loginRequest);
    }

    @GetMapping("/dashboadOverview")
    public AdminOverView overView (){
        return adminOverViewService.overView();
    }
}
