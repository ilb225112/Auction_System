package com.AuctionSystem.Controllers;

// import com.AuctionSystem.Model.*;
import com.AuctionSystem.Service.*;
import com.AuctionSystem.DTO.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @GetMapping("/bidders/{auctionId}")
    public List<BidderDTO> getRegisteredBidders(@PathVariable Long auctionId) {
        return adminService.getRegisteredBidders(auctionId);
    }

    @DeleteMapping("/deleteBidder/{auctionId}/{userId}")
    public void deleteBidder(@PathVariable Long auctionId, @PathVariable Long userId) {
        adminService.deleteBidderFromAuction(auctionId, userId);
    }
    
}
