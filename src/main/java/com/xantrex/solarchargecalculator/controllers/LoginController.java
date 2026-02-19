package com.xantrex.solarchargecalculator.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class LoginController {

    @GetMapping("/login")
    public String login() {
        return "auth/login";
    }

    @PostMapping("/login")
    public String doLogin(
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            Model model
    ) {
        // TODO: Replace with real authentication (DB + hashed passwords)
        boolean ok = "parsa@sfu.ca".equalsIgnoreCase(email) && "1234".equals(password);

        if (!ok) {
            model.addAttribute("error", "Invalid email or password");
            return "auth/login";
        }

        // TODO: Set session/auth cookie (Spring Security later)
        return "redirect:/";
    }

    // Iteration 1 (UI-only): Password reset flow pages
    @GetMapping("/password")
    public String passwordReset() {
        return "auth/password";
    }

    // Iteration 1 (UI-only): accept email and show confirmation page.
    // Later iterations can send an email + token.
    @PostMapping("/password")
    public String passwordResetSubmit(
            @RequestParam String email,
            RedirectAttributes redirectAttributes
    ) {
        // For now we just pretend we sent an email.
        redirectAttributes.addFlashAttribute(
                "message",
                "If an account exists for " + email + ", we sent password reset instructions."
        );
        return "redirect:/password-confirm";
    }

    @GetMapping("/password-confirm")
    public String passwordResetConfirm(Model model) {
        // FlashAttributes (like "message") will be available in the model after redirect.
        return "auth/password-confirm";
    }

    // Backwards-compatible routes (optional): if your UI links still use these,
    // keep them and redirect to the new paths.
    @GetMapping("/reset-password")
    public String resetPasswordRedirect() {
        return "redirect:/password";
    }

    @GetMapping("/reset-password/confirm")
    public String resetPasswordConfirmRedirect() {
        return "redirect:/password-confirm";
    }

    @GetMapping("/forgot-password")
    public String forgotPasswordRedirect() {
        return "redirect:/password";
    }

    @GetMapping("/forgot-password/confirm")
    public String forgotPasswordConfirmRedirect() {
        return "redirect:/password-confirm";
    }
}