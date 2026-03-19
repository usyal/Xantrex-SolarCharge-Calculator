package com.xantrex.solarchargecalculator.filters;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.IOException;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class SessionFilterTest {
    private SessionFilter filter;
    private HttpServletRequest request;
    private HttpServletResponse response;
    private FilterChain chain;
    private HttpSession session;

    @BeforeEach
    void setUp() {
        filter = new SessionFilter();
        request = mock(HttpServletRequest.class);
        response = mock(HttpServletResponse.class);
        chain = mock(FilterChain.class);
        session = mock(HttpSession.class);
    }

    @Test
    void testLoggedInUserRedirectedFromIndex() throws IOException, ServletException {
        when(request.getSession(false)).thenReturn(session);
        when(session.getAttribute("username")).thenReturn("Sloth");
        when(request.getRequestURI()).thenReturn("/app/index.html");
        when(request.getContextPath()).thenReturn("/app");

        filter.doFilter(request, response, chain);

        // Verifying if redirection happens
        verify(response).sendRedirect("/app/home");
        // Filter chain should not proceed
        verify(chain, never()).doFilter(request, response);
    }

    @Test
    void testLoggedInUserRedirectedFromRoot() throws IOException, ServletException {
        when(request.getSession(false)).thenReturn(session);
        when(session.getAttribute("username")).thenReturn("Sloth");
        when(request.getRequestURI()).thenReturn("/app/");
        when(request.getContextPath()).thenReturn("/app");

        filter.doFilter(request, response, chain);

        // Verifying if redirection happens
        verify(response).sendRedirect("/app/home");
        // Filter chain should not proceed
        verify(chain, never()).doFilter(request, response);
    }

    @Test
    void testLoggedInUserRedirectedFromLogin() throws IOException, ServletException {
        when(request.getSession(false)).thenReturn(session);
        when(session.getAttribute("username")).thenReturn("Sloth");
        when(request.getRequestURI()).thenReturn("/app/login");
        when(request.getContextPath()).thenReturn("/app");

        filter.doFilter(request, response, chain);

        verify(response).sendRedirect("/app/home");
        verify(chain, never()).doFilter(request, response);
    }

    @Test
    void testLoggedInUserRedirectedFromSignup() throws IOException, ServletException {
        when(request.getSession(false)).thenReturn(session);
        when(session.getAttribute("username")).thenReturn("Sloth");
        when(request.getRequestURI()).thenReturn("/app/signup");
        when(request.getContextPath()).thenReturn("/app");

        filter.doFilter(request, response, chain);

        verify(response).sendRedirect("/app/home");
        verify(chain, never()).doFilter(request, response);
    }

    @Test
    void testLoggedOutUserAccessIndex() throws IOException, ServletException {
        when(request.getSession(false)).thenReturn(null);
        when(request.getRequestURI()).thenReturn("/app/index.html");
        when(request.getContextPath()).thenReturn("/app");

        filter.doFilter(request, response, chain);

        // Filter chain should proceed normally
        verify(chain).doFilter(request, response);
        // No redirection
        verify(response, never()).sendRedirect(anyString());
    }
}