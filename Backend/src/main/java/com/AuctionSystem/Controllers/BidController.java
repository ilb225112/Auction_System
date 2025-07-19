package com.AuctionSystem.Controllers;

import com.AuctionSystem.DTO.BidDTO;
import com.AuctionSystem.Model.*;
import com.AuctionSystem.Service.BidService;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/bids")
public class BidController {

    @Autowired
    private BidService bidService;

    public BidController(BidService bidService) {
        this.bidService = bidService;
    }

    // Fetch latest bids for an auction
    @GetMapping("/latestBid/{auctionId}/{itemId}")
    public ResponseEntity<BidDTO> getLatestBidForItem(@PathVariable Long auctionId, @PathVariable Long itemId) {
        BidDTO latestBid = bidService.getLatestBidForItemInAuction(auctionId, itemId);

        if (latestBid == null) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(latestBid);
    }

    @PostMapping("/sellItem/{itemId}")
    public ResponseEntity<String> sellItem(@PathVariable Long itemId, @RequestBody Map<String, Object> bidData) {

        boolean isSold = bidService.sellItem(itemId, bidData);
        return isSold ? ResponseEntity.ok("Item sold successfully")
                : ResponseEntity.badRequest().body("Error selling item");
    }

    @PostMapping("/placeBid")
    public ResponseEntity<String> placeBid(@RequestBody Bid bid) {
        boolean success = bidService.placeBid(bid);
        return success ? ResponseEntity.ok("Bid placed successfully")
                : ResponseEntity.badRequest().body("Bid placement failed");
    }
}
