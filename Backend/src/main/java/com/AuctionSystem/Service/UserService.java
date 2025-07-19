package com.AuctionSystem.Service;

import com.AuctionSystem.Model.*;
import com.AuctionSystem.Repository.*;
import com.AuctionSystem.DTO.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private AuctionRepository auctionRepository;

    @Autowired
    private BidRegistrationRepository bidRegistrationRepository;

    // Save user to the database
    public Users saveUser(Users user) {
        return userRepository.save(user);
    }

    // Check if a user already exists by email
    public boolean existsByEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    // Fetch all users
    public List<AllUsersDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> {
                    AllUsersDTO dto = new AllUsersDTO();
                    dto.setUserId(user.getUserId());
                    dto.setName(user.getName());
                    dto.setEmail(user.getEmail());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    public Optional<Users> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public UserDetailsDTO getUserDetails(Long userId) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserDetailsDTO response = new UserDetailsDTO();
        response.setUserId(user.getUserId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());

        // Retrieve attended auctions via BidRegistration
        response.setAuctions(user.getRegistrations().stream()
                .map(BidRegistration::getAuction)
                .map(auction -> new Auction(auction.getAuctionId(), auction.getName(), auction.getAuctionType(), auction.getAuctionDate()))
                .collect(Collectors.toList()));

        return response;
    }


    public List<Auction> getUnregisteredAuctions(Long userId) {
        List<Long> registeredAuctionIds = bidRegistrationRepository.findByBidder_UserId(userId)
            .stream()
            .map(reg -> reg.getAuction().getAuctionId())
            .collect(Collectors.toList());
        
        List<Auction> unregisteredAuctions;
        if (registeredAuctionIds.isEmpty()) {
            unregisteredAuctions = auctionRepository.findAll();
        } else {
            unregisteredAuctions = auctionRepository.findAllByAuctionIdNotIn(registeredAuctionIds);
        }
        Date currentDate = new Date();
        Date oneDayBefore = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
    
        return unregisteredAuctions.stream()
            .filter(auction -> auction.getAuctionDate().after(oneDayBefore))
            .collect(Collectors.toList());
    }
    

    public void registerBidder(Long userId, Long auctionId) {
        Users user = userRepository.findById(userId).orElseThrow();
        Auction auction = auctionRepository.findById(auctionId).orElseThrow();

        BidRegistration newRegistration = new BidRegistration();
        newRegistration.setBidder(user);
        newRegistration.setAuction(auction);

        bidRegistrationRepository.save(newRegistration);
    }


    public List<BidderAuctionDTO> getRegisteredAuctionsWithStatus(Long userId) {
        List<Auction> registeredAuctions = bidRegistrationRepository.findByBidder_UserId(userId)
            .stream()
            .map(BidRegistration::getAuction)
            .collect(Collectors.toList());

        Date currentDate = new Date();
        Date oneDayAgo = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
        // Date oneDayAfter = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);

        return registeredAuctions.stream().map(auction -> {
            String status;
            if (auction.getAuctionDate().before(oneDayAgo)) {
                status = "Completed";
            } else if (auction.getAuctionDate().after(oneDayAgo) && auction.getAuctionDate().before(currentDate)) {
                status = "Live";
            } else {
                status = "Upcoming";
            }
            return new BidderAuctionDTO(auction, status);
        }).collect(Collectors.toList());
    }


    public List<ItemDTO> getPurchasedItems(Long userId, Long auctionId) {
        List<Item> items = itemRepository.findByWinnerBidderUserIdAndAuctionAuctionId(userId, auctionId);
        return items.stream().map(ItemDTO::new).collect(Collectors.toList());
    }


    public String changePassword(Long userId, String oldPassword, String newPassword) {
        Optional<Users> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            Users user = userOptional.get();

            // Verify old password
            if (!user.getPassword().equals(oldPassword)) {
                return "Incorrect old password";
            }

            // Update password
            user.setPassword(newPassword);
            userRepository.save(user);
            return "Password updated successfully";
        }
        return "User not found";
    }

}