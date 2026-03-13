package com.xantrex.solarchargecalculator.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.lang.reflect.Proxy;
import java.util.concurrent.atomic.AtomicInteger;

import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpSession;

import com.xantrex.solarchargecalculator.models.UserRepository;

public class SessionAuthControllerUnitTest {

    @Test
    void deleteRemovesLoggedInUserAndInvalidatesSession() {
        AtomicInteger deletedUserId = new AtomicInteger(-1);
        UserRepository userRepository = createUserRepositoryProxy(deletedUserId);
        SessionAuthController controller = new SessionAuthController(userRepository);

        MockHttpSession session = new MockHttpSession();
        session.setAttribute("username", "Spencer");
        session.setAttribute("userId", 42);

        String viewName = controller.delete(session);

        assertEquals("redirect:/", viewName);
        assertEquals(42, deletedUserId.get());
        assertTrue(session.isInvalid());
    }

    @Test
    void deleteWithoutUserIdStillInvalidatesSession() {
        AtomicInteger deletedUserId = new AtomicInteger(-1);
        UserRepository userRepository = createUserRepositoryProxy(deletedUserId);
        SessionAuthController controller = new SessionAuthController(userRepository);

        MockHttpSession session = new MockHttpSession();
        session.setAttribute("username", "Spencer");

        String viewName = controller.delete(session);

        assertEquals("redirect:/", viewName);
        assertEquals(-1, deletedUserId.get());
        assertTrue(session.isInvalid());
    }

    private UserRepository createUserRepositoryProxy(AtomicInteger deletedUserId) {
        return (UserRepository) Proxy.newProxyInstance(
                UserRepository.class.getClassLoader(),
                new Class<?>[]{UserRepository.class},
                (proxy, method, args) -> {
                    if ("deleteById".equals(method.getName()) && args != null && args.length == 1) {
                        deletedUserId.set((Integer) args[0]);
                        return null;
                    }
                    if ("toString".equals(method.getName())) {
                        return "UserRepositoryProxy";
                    }
                    if ("hashCode".equals(method.getName())) {
                        return System.identityHashCode(proxy);
                    }
                    if ("equals".equals(method.getName())) {
                        return proxy == args[0];
                    }
                    throw new UnsupportedOperationException("Unexpected method: " + method.getName());
                });
    }
}
