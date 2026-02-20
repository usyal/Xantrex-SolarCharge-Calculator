package com.xantrex.solarchargecalculator.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.xantrex.solarchargecalculator.Models.UserRepository;

@Controller
public class SignUpController {
    @Autowired
    private UserRepository userRepo;

    @GetMapping("/signup")
    public String redirectSignUp() {
        return "SignUp";
    }
    
}
