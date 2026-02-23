package com.xantrex.solarchargecalculator.controllers;

import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class SessionAuthController {

    @PostMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/";
    }

    @PostMapping("/delete")
    public String delete(HttpSession session) {
        // TODO: connect to DB later and delete the user record
        session.invalidate();
        return "redirect:/";
    }
}