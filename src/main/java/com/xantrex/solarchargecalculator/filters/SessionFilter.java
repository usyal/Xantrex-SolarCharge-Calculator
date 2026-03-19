package com.xantrex.solarchargecalculator.filters;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class SessionFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;

        // Prevent caching so back button doesn't show old login page
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setDateHeader("Expires", 0);

        HttpSession session = req.getSession(false);
        String uri = req.getRequestURI();
        String context = req.getContextPath();

        boolean loggedIn = session != null && session.getAttribute("username") != null;

        boolean isAuthPage =
                uri.startsWith(context + "/login") ||
                uri.startsWith(context + "/signup") ||
                uri.equals(context + "/") ||
                uri.endsWith("/index.html");

        if (loggedIn && isAuthPage) {
            res.sendRedirect(context + "/home");
            return;
        }

        chain.doFilter(request, response);
    }
}