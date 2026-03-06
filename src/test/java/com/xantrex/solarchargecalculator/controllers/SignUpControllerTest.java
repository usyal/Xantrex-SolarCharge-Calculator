package com.xantrex.solarchargecalculator.controllers;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.xantrex.solarchargecalculator.models.User;
import com.xantrex.solarchargecalculator.models.UserRepository;

@WebMvcTest(SignUpController.class)
public class SignUpControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockitoBean UserRepository userRepo;

    @Test
    void testPostMethodName() {
        try{
            when(userRepo.findByName("Spencer")).thenReturn(Optional.empty());

            mockMvc.perform(post("/user/signup")
                .param("nameSU", "Spencer")
                .param("PwdSU", "testing123"))
                .andExpect(model().attributeExists("inputs"))
                .andExpect(status().isCreated())
                .andExpect(view().name("login"));
        }
        catch(Exception e){
            fail("Exception thrown: " + e.getMessage());
        }
    }

    @Test
    void UsernameAlreadyUsed() {
        try{
            when(userRepo.findByName("Sloth")).thenReturn(Optional.of(new User("Sloth","password")));

            mockMvc.perform(post("/user/signup")
                .param("nameSU", "Sloth")
                .param("PwdSU", "610"))
                .andExpect(model().attributeExists("error"))
                .andExpect(status().isBadRequest())
                .andExpect(view().name("signup"));
        }
        catch(Exception e){
            fail("Exception thrown: " + e.getMessage());
        }
    }

    @Test
    void testRedirectSignUp() {
        try{
            mockMvc.perform(post("/user/signup")
                .param("nameSU", "")
                .param("PwdSU", "testing123"))
                .andExpect(model().attributeExists("error"))
                .andExpect(status().isBadRequest())
                .andExpect(view().name("signup"));
        }
        catch(Exception e){
            fail("Exception thrown: " + e.getMessage());
        }
    }

    @Test
    void testRedirectSignUp2() {
        try{
            mockMvc.perform(post("/user/signup")
                .param("nameSU", "Spencer")
                .param("PwdSU", ""))
                .andExpect(model().attributeExists("error"))
                .andExpect(status().isBadRequest())
                .andExpect(view().name("signup"));
        }
        catch(Exception e){
            fail("Exception thrown: " + e.getMessage());
        }
    }
}
