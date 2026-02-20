package com.xantrex.solarchargecalculator.Controller;

import java.util.Map;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.xantrex.solarchargecalculator.models.User;
import com.xantrex.solarchargecalculator.models.UserRepository;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.view.RedirectView;


@Controller
public class SignUpController {
    
    @Autowired
    private UserRepository userRepo;

    private String validateStaffInput(String name, String pwd){
        if(name == null || name.isBlank()){
            return "Name cannot be empty.";
        }
        if(pwd == null || pwd.isBlank()){
            return "Password cannot be empty.";
        }
        return null;
    }

    @GetMapping("/")
    public RedirectView process() {
        return new RedirectView("index.html");
    }

    @GetMapping("/signup")
    public String redirectSignUp() {
        System.out.println("New User Sign Up");
        return "SignUp";
    }
    
    @PostMapping("/user/signup")
    public String postMethodName(@RequestParam Map<String, String> newUser, HttpServletResponse response, Model model) {
        System.out.println("Getting new user info");
        model.addAttribute("inputs",newUser);

        String newName = newUser.get("nameSU");
        String newPwd = newUser.get("PwdSU");

        // Check validation of input
        String msg = validateStaffInput(newName, newPwd);
        if(msg != null){
            model.addAttribute("error",msg);
            response.setStatus(400);
            return "SignUp";
        }

        // Save info to database
        userRepo.save(new User(newName, newPwd));
        response.setStatus(201);
        return "auto_page"; // goto authorized user page
    }

}
