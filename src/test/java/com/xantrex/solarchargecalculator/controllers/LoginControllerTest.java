package com.xantrex.solarchargecalculator.controllers;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.request;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.redirectedUrl;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.model;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;

import java.util.Optional;

import com.xantrex.solarchargecalculator.models.User;
import com.xantrex.solarchargecalculator.models.UserRepository;

@WebMvcTest(LoginController.class)
public class LoginControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockitoBean UserRepository userRepo;

    @Test
    void LoginSuccess() {
        try {
            User user = new User("Sloth", "610");
            user.setId(1);

            when(userRepo.findByName("Sloth")).thenReturn(Optional.of(user));

            mockMvc.perform(post("/login")
                .param("username", "Sloth")
                .param("password", "610"))
                .andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrl("/home"))
                .andExpect(request().sessionAttribute("userId", 1))
                .andExpect(request().sessionAttribute("username", "Sloth"));

        } catch (Exception e) {
            fail("Exception thrown: " + e.getMessage());
        }
    }

    @Test
    void WrongUsername() {
        try {
            when(userRepo.findByName("S")).thenReturn(Optional.empty());

            mockMvc.perform(post("/login")
                .param("username", "S")
                .param("password", "610"))
                .andExpect(model().attributeExists("error"))
                .andExpect(view().name("login"));
        } catch (Exception e) {
            fail("Exception thrown: " + e.getMessage());
        }
    }

    @Test
    void WrongPassword() {
        try {
            User user = new User("Sloth", "610");
            user.setId(1);

            when(userRepo.findByName("Sloth")).thenReturn(Optional.of(user));

            mockMvc.perform(post("/login")
                .param("username", "Sloth")
                .param("password", "wrong"))
                .andExpect(model().attributeExists("error"))
                .andExpect(view().name("login"));
        } catch (Exception e) {
            fail("Exception thrown: " + e.getMessage());
        }
    }

    @Test
    void UserNotSignUp() {
        try {
            when(userRepo.findByName("Sloth")).thenReturn(Optional.empty());

            mockMvc.perform(post("/login")
                .param("username", "Sloth")
                .param("password", "610"))
                .andExpect(model().attributeExists("error"))
                .andExpect(view().name("login"));
        } catch (Exception e) {
            fail("Exception thrown: " + e.getMessage());
        }
    }

    @Test
    void UsernameMissing() {
        try {
            User user = new User("Sloth", "610");
            user.setId(1);

            when(userRepo.findByName("Sloth")).thenReturn(Optional.of(user));

            mockMvc.perform(post("/login")
                .param("username", "")
                .param("password", "610"))
                .andExpect(model().attributeExists("error"))
                .andExpect(view().name("login"));
        } catch (Exception e) {
            fail("Exception thrown: " + e.getMessage());
        }
    }

    @Test
    void PasswordMissing() {
        try {
            User user = new User("Sloth", "610");
            user.setId(1);

            when(userRepo.findByName("Sloth")).thenReturn(Optional.of(user));

            mockMvc.perform(post("/login")
                .param("username", "Sloth")
                .param("password", ""))
                .andExpect(model().attributeExists("error"))
                .andExpect(view().name("login"));
        } catch (Exception e) {
            fail("Exception thrown: " + e.getMessage());
        }
    }
}
