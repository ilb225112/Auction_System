package com.AuctionSystem.Service;

import com.AuctionSystem.DTO.AllUsersDTO;
import com.AuctionSystem.DTO.UserDetailsDTO;
import com.AuctionSystem.Model.Users;
import com.AuctionSystem.Model.BidRegistration;
import com.AuctionSystem.Repository.UserRepository;
import com.AuctionSystem.Repository.ItemRepository;
import com.AuctionSystem.Repository.AuctionRepository;
import com.AuctionSystem.Repository.BidRegistrationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private ItemRepository itemRepository;

    @Mock
    private AuctionRepository auctionRepository;

    @Mock
    private BidRegistrationRepository bidRegistrationRepository;

    @InjectMocks
    private UserService userService;

    private Users testUser;

    @BeforeEach
    void setUp() {
        testUser = new Users();
        testUser.setUserId(1L);
        testUser.setName("Test User");
        testUser.setEmail("test@example.com");
        testUser.setPassword("password123");
        testUser.setRole("BIDDER");
        testUser.setRegistrations(new ArrayList<>());
    }

    @Test
    void testSaveUser_Success() {
        when(userRepository.save(any(Users.class))).thenReturn(testUser);

        Users savedUser = userService.saveUser(testUser);

        assertNotNull(savedUser);
        assertEquals("Test User", savedUser.getName());
        assertEquals("test@example.com", savedUser.getEmail());
        verify(userRepository, times(1)).save(testUser);
    }

    @Test
    void testExistsByEmail_UserExists() {
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));

        boolean exists = userService.existsByEmail("test@example.com");

        assertTrue(exists);
        verify(userRepository, times(1)).findByEmail("test@example.com");
    }

    @Test
    void testExistsByEmail_UserDoesNotExist() {
        when(userRepository.findByEmail("nonexistent@example.com")).thenReturn(Optional.empty());

        boolean exists = userService.existsByEmail("nonexistent@example.com");

        assertFalse(exists);
        verify(userRepository, times(1)).findByEmail("nonexistent@example.com");
    }

    @Test
    void testGetAllUsers_Success() {
        Users user2 = new Users();
        user2.setUserId(2L);
        user2.setName("User Two");
        user2.setEmail("user2@example.com");

        when(userRepository.findAll()).thenReturn(Arrays.asList(testUser, user2));

        List<AllUsersDTO> users = userService.getAllUsers();

        assertNotNull(users);
        assertEquals(2, users.size());
        assertEquals("Test User", users.get(0).getName());
        assertEquals("User Two", users.get(1).getName());
        verify(userRepository, times(1)).findAll();
    }

    @Test
    void testFindByEmail_UserFound() {
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));

        Optional<Users> foundUser = userService.findByEmail("test@example.com");

        assertTrue(foundUser.isPresent());
        assertEquals("Test User", foundUser.get().getName());
        verify(userRepository, times(1)).findByEmail("test@example.com");
    }

    @Test
    void testFindByEmail_UserNotFound() {
        when(userRepository.findByEmail("notfound@example.com")).thenReturn(Optional.empty());

        Optional<Users> foundUser = userService.findByEmail("notfound@example.com");

        assertFalse(foundUser.isPresent());
        verify(userRepository, times(1)).findByEmail("notfound@example.com");
    }

    @Test
    void testGetUserDetails_Success() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));

        UserDetailsDTO userDetails = userService.getUserDetails(1L);

        assertNotNull(userDetails);
        assertEquals(1L, userDetails.getUserId());
        assertEquals("Test User", userDetails.getName());
        assertEquals("test@example.com", userDetails.getEmail());
        assertEquals("BIDDER", userDetails.getRole());
        verify(userRepository, times(1)).findById(1L);
    }

    @Test
    void testGetUserDetails_UserNotFound() {
        when(userRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> {
            userService.getUserDetails(999L);
        });

        verify(userRepository, times(1)).findById(999L);
    }
}
