package com.xantrex.solarchargecalculator.controllers;

import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

// This controller handles session-based authentication and related actions.
@RestController
class MeApiController {
    @GetMapping("/api/me")
    public ResponseEntity<?> me(HttpSession session) {
        Object username = session.getAttribute("username");
        if (username == null) {
            return ResponseEntity.status(401)
            .header("Cache-Control", "no-store")
            .build();
        }
        return ResponseEntity.ok()
        .header("Cache-Control", "no-store")
        .body(Map.of("username", username.toString()));
    }
}

@Controller
class SessionActionsController {

    @PostMapping("/logout")
    public String logout(HttpSession session) {
        session.removeAttribute("username"); // clear session data
        session.invalidate();
        return "redirect:/?logout=1";         // redirect to home with logout message
    }

    @PostMapping("/account/delete")
    public String deleteAccount(HttpSession session) {
        session.removeAttribute("username");
        session.invalidate();
        return "redirect:/?deleted=1";
    }
}