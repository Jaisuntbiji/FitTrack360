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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class Auth {

    @Autowired
    UserService userService;

    @Autowired
    AdminOverViewService adminOverViewService;

    @Autowired
    MemberService memberService;
    @Autowired
    private User user;


    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody LoginRequest loginRequest) {
        User user = userService.loginAuth(loginRequest);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

        @GetMapping("/emailCheck/{userEmail}")
    public boolean emailCheck(@PathVariable String userEmail){
       return memberService.emailCheck(userEmail);
    }

    @GetMapping("/dashboadOverview")
    public AdminOverView overView (){
        return adminOverViewService.overView();
    }
}
