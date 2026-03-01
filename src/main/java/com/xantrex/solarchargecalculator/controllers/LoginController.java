package com.xantrex.solarchargecalculator.controllers;

import java.util.Optional;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.xantrex.solarchargecalculator.models.User;
import com.xantrex.solarchargecalculator.models.UserRepository;

import jakarta.servlet.http.HttpSession;

@Controller
public class LoginController {

    private final UserRepository userRepository;

    public LoginController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/login")
    public String loginPage() {
        return "login"; // templates/login.html
    }

    @PostMapping("/login")
    public String doLogin(
            @RequestParam("username") String username,
            @RequestParam("password") String password,
            HttpSession session,
            Model model
    ) {
        Optional<User> userOpt = userRepository.findByName(username);

        if (userOpt.isPresent() && userOpt.get().getPassword() != null && userOpt.get().getPassword().equals(password)) {
            User user = userOpt.get();
            session.setAttribute("userId", user.getId());
            session.setAttribute("username", user.getName());
            return "redirect:/home";
        }

        model.addAttribute("error", "Invalid username or password");
        return "login";
    }
}
