package com.AuctionSystem.Service;

import com.AuctionSystem.Model.*;
import com.AuctionSystem.Repository.AuctionRepository;
import com.AuctionSystem.Repository.ItemRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class AuctionService {
    
    @Autowired
    private AuctionRepository auctionRepository;

    @Autowired
    private ItemRepository itemRepository;

    public List<Auction> getUpcomingAuctions() {
        Date currentDate = new Date();
        return auctionRepository.findByAuctionDateAfter(currentDate);
    }

    public List<Auction> getLiveAuctions() {
        Date currentDate = new Date();
        Date oneDayAgo = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago

        return auctionRepository.findByAuctionDateBetween(oneDayAgo, currentDate);
    }

    public List<Auction> getCompletedAuctions() {
        return auctionRepository.findByAuctionDateBefore(new Date());
    }

    public Auction createAuction(Auction auction) {
        return auctionRepository.save(auction);
    }

    public Item addItemToAuction(Long auctionId, Item item) {
        Auction auction = auctionRepository.findById(auctionId)
                .orElseThrow(() -> new RuntimeException("Auction not found"));
        item.setAuction(auction);
        item.setStatus("AVAILABLE");
        System.out.println("Item is: "+item);
        return itemRepository.save(item);
    }
}
