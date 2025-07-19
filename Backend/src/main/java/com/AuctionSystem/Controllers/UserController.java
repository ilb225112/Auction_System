package com.AuctionSystem.Controllers;

import com.AuctionSystem.DTO.*;
import com.AuctionSystem.Model.*;
import com.AuctionSystem.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Register user as a bidder
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody Users user) {
        if (userService.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("Email already in use");
        }
        user.setRole("BIDDER");
        userService.saveUser(user);
        return ResponseEntity.ok("Registration successful");
    }

    // Login user
    @PostMapping("/login")
    public ResponseEntity<UserDetailsDTO> loginUser(@RequestBody Users loginRequest) {
        System.out.println("Called login: " + loginRequest);
        Optional<Users> userOpt = userService.findByEmail(loginRequest.getEmail());
        if (userOpt.isPresent() && userOpt.get().getPassword().equals(loginRequest.getPassword())) {
            UserDetailsDTO userResponse = userService.getUserDetails(userOpt.get().getUserId());
            return ResponseEntity.ok(userResponse);
        }
        return ResponseEntity.badRequest().body(null);
    }

    // Fetch all users
    @GetMapping("/all")
    public List<AllUsersDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/unregistered/{userId}")
    public List<Auction> getUnregisteredAuctions(@PathVariable Long userId) {
        return userService.getUnregisteredAuctions(userId);
    }

    @PostMapping("/registerAuction")
    public ResponseEntity<String> registerForAuction(@RequestBody Map<String, Long> requestData) {
        Long userId = requestData.get("userId");
        Long auctionId = requestData.get("auctionId");

        userService.registerBidder(userId, auctionId);
        return ResponseEntity.ok("User registered successfully!");
    }


    @GetMapping("/registered/{userId}")
    public List<BidderAuctionDTO> getRegisteredAuctions(@PathVariable Long userId) {
        return userService.getRegisteredAuctionsWithStatus(userId);
    }

    @GetMapping("/purchases/{userId}/{auctionId}")
    public List<ItemDTO> getPurchasedItems(@PathVariable Long userId, @PathVariable Long auctionId) {
        return userService.getPurchasedItems(userId, auctionId);
    }

    @PostMapping("/changePassword/{userId}")
    public ResponseEntity<String> changePassword(
            @PathVariable Long userId,
            @RequestBody Map<String, String> request)
    {
        String oldPassword = request.get("oldPassword");
        String newPassword = request.get("newPassword");
        String response = userService.changePassword(userId, oldPassword, newPassword);

        if (response.equals("Password updated successfully")) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }
}
