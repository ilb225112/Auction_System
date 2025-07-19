package com.AuctionSystem.Controllers;

import com.AuctionSystem.DTO.ItemDTO;
import com.AuctionSystem.Model.*;
import com.AuctionSystem.Repository.ItemRepository;
import com.AuctionSystem.Service.AuctionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auctions")
public class AuctionController {
    
    @Autowired
    private AuctionService auctionService;

    @Autowired
    private ItemRepository itemRepository;

    @GetMapping("/upcoming")
    public List<Auction> getUpcomingAuctions() {
        return auctionService.getUpcomingAuctions();
    }

    @GetMapping("/live")
    public List<Auction> getLiveAuctions() {
        return auctionService.getLiveAuctions();
    }

    @GetMapping("/completed")
    public List<Auction> getCompletedAuctions() {
        return auctionService.getCompletedAuctions();
    }

    @PostMapping("/createAuction")
    public ResponseEntity<Auction> createAuction(@RequestBody Auction auction) {
        return new ResponseEntity<>(auctionService.createAuction(auction), HttpStatus.CREATED);
    }

    @PostMapping("/addItem/{auctionId}")
    public ResponseEntity<Item> addItemToAuction(@PathVariable Long auctionId, @RequestBody Item item) {
        return new ResponseEntity<>(auctionService.addItemToAuction(auctionId, item), HttpStatus.CREATED);
    }

    @GetMapping("/auctionItems/{auctionId}")
    public List<ItemDTO> getItemsByAuctionId(@PathVariable Long auctionId) {
        List<Item> aucItems = itemRepository.findByAuction_AuctionId(auctionId);
        return aucItems.stream().map(ItemDTO::new).collect(Collectors.toList());
    }
}
