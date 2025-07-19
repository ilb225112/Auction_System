package com.AuctionSystem.Service;

import com.AuctionSystem.DTO.BidDTO;
import com.AuctionSystem.Model.*;
import com.AuctionSystem.Repository.*;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BidService {
    @Autowired
    private BidRepository bidRepository;

    @Autowired
    private AuctionRepository auctionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ItemRepository itemRepository;

    // Fetch latest bids for an auction
    public BidDTO getLatestBidForItemInAuction(Long auctionId, Long itemId) {
        List<Bid> bids = bidRepository.findBidsByItem_ItemIdAndItem_Auction_AuctionIdOrderByBidTimeDesc(itemId, auctionId);
        
        if (bids.isEmpty()) {
            return null;
        }

        Bid latestBid = bids.get(0);
        System.out.println("Latest Bid: " + latestBid);

        return new BidDTO(
                latestBid.getItem().getItemId(),
                latestBid.getBidder().getUserId(),
                latestBid.getBidder().getName(),
                latestBid.getBidAmount(),
                latestBid.getBidTime()
        );
    }

    // Mark an item as SOLD
    public boolean sellItem(Long itemId, Map<String, Object> bidData) {
        Item item = itemRepository.findById(itemId).orElse(null);
        if (item == null) {
            System.out.println("Item not found");
            return false;
        }

        Object bidderIdObj = bidData.get("bidderId");
        Object bidAmountObj = bidData.get("bidAmount");

        if (bidderIdObj == null || bidAmountObj == null) {
            System.out.println("Missing bidder ID or bid amount");
            return false;
        }

        Long bidderId = Long.valueOf(bidderIdObj.toString());
        Double bidAmount = Double.valueOf(bidAmountObj.toString());

        Users winner_user = userRepository.findById(bidderId).orElse(null);
        if (winner_user == null) {
            System.out.println("Winner user not found");
            return false;
        }

        item.setStatus("SOLD");
        item.setWinnerBidder(winner_user);
        item.setStartingPrice(bidAmount);
        itemRepository.save(item);

        return true;
    }

    public boolean placeBid(Bid bid) {
        Item item = itemRepository.findById(bid.getItem().getItemId()).orElse(null);
        Users bidder = userRepository.findById(bid.getBidder().getUserId()).orElse(null);
        Auction auction = auctionRepository.findById(bid.getAuction().getAuctionId()).orElse(null);
        if (item == null || bidder == null) {
            return false;
        }

        Bid newBid = new Bid();
        newBid.setItem(item);
        newBid.setBidder(bidder);
        newBid.setBidAmount(bid.getBidAmount());
        newBid.setAuction(auction);
        newBid.setBidTime(new Date());
        bidRepository.save(newBid);

        return true;
    }

}
