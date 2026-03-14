package com.xantrex.solarchargecalculator.controllers;

import com.xantrex.solarchargecalculator.models.UserRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

import jakarta.servlet.http.HttpSession;

@Controller
public class SessionAuthController {
    private final UserRepository userRepository;

    public SessionAuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/";
    }

    @PostMapping("/delete")
    public String delete(HttpSession session) {
        Object userId = session.getAttribute("userId");
        if (userId instanceof Integer id) {
            userRepository.deleteById(id);
        }
        session.invalidate();
        return "redirect:/";
    }
}
