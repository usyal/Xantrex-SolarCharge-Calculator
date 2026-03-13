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
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest Serverrequest = (HttpServletRequest) request;
        HttpServletResponse Serverresponse = (HttpServletResponse) response;

        HttpSession session = Serverrequest.getSession(false);
        String uri = Serverrequest.getRequestURI();

        // Redirecting to /home if user is logged in and trying to access index.html static page
        if (uri.equals("/index.html") && session != null && session.getAttribute("username") != null) {
            Serverresponse.sendRedirect("/home");
            return;
        }

        // Redirecting to /home if user is logged in and trying to access / 
        if (uri.equals("/") && session != null && session.getAttribute("username") != null) {
            Serverresponse.sendRedirect("/home");
            return;
        }

        chain.doFilter(request, response);
    }
}