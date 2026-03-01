package com.xantrex.solarchargecalculator.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SignupController {

  @GetMapping("/signup")
  public String signup() {
    // View name must match the template filename under src/main/resources/templates.
    // Use lowercase to avoid case-sensitivity issues on Linux (Render).
    return "signup"; // templates/signup.html
  }
}