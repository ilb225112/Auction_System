package com.AuctionSystem.Model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class UserTest {

    private Users user;

    @BeforeEach
    void setUp() {
        user = new Users();
    }

    @Test
    void testUserCreation() {
        assertNotNull(user);
    }

    @Test
    void testSetAndGetUserId() {
        user.setUserId(1L);
        assertEquals(1L, user.getUserId());
    }

    @Test
    void testSetAndGetName() {
        user.setName("John Doe");
        assertEquals("John Doe", user.getName());
    }

    @Test
    void testSetAndGetEmail() {
        user.setEmail("john.doe@example.com");
        assertEquals("john.doe@example.com", user.getEmail());
    }

    @Test
    void testSetAndGetPassword() {
        user.setPassword("securePassword123");
        assertEquals("securePassword123", user.getPassword());
    }

    @Test
    void testSetAndGetRole() {
        user.setRole("ADMIN");
        assertEquals("ADMIN", user.getRole());
        
        user.setRole("BIDDER");
        assertEquals("BIDDER", user.getRole());
        
        user.setRole("HOST");
        assertEquals("HOST", user.getRole());
    }

    @Test
    void testSetAndGetRegistrations() {
        List<BidRegistration> registrations = new ArrayList<>();
        user.setRegistrations(registrations);
        assertEquals(registrations, user.getRegistrations());
    }

    @Test
    void testUserWithAllFields() {
        user.setUserId(1L);
        user.setName("Jane Smith");
        user.setEmail("jane@example.com");
        user.setPassword("password456");
        user.setRole("HOST");
        
        assertEquals(1L, user.getUserId());
        assertEquals("Jane Smith", user.getName());
        assertEquals("jane@example.com", user.getEmail());
        assertEquals("password456", user.getPassword());
        assertEquals("HOST", user.getRole());
    }
}
