package com.xantrex.solarchargecalculator.controllers;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

@WebMvcTest(SessionAuthController.class)
public class LogoutControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    void testLogout() {
        try {
            MockHttpSession session = new MockHttpSession();
            session.setAttribute("username", "Spencer");
            session.setAttribute("userId", 1);

            MvcResult result = mockMvc.perform(post("/logout").session(session))
                    .andExpect(status().is3xxRedirection())
                    .andExpect(view().name("redirect:/"))
                    .andReturn();

            assertNull(result.getRequest().getSession(false));
        } catch (Exception e) {
            fail("Exception thrown: " + e.getMessage());
        }
    }
}
