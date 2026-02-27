package com.xantrex.solarchargecalculator.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SignupController {

    @GetMapping("/signup")
    public String signup() {
        return "SignUp"; 
    }
}