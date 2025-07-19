package com.AuctionSystem.Model;

import jakarta.persistence.*;

// Item.java
@Entity
@Table(name = "items")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemId;
    
    @ManyToOne
    @JoinColumn(name = "auction_id")
    private Auction auction;
    
    private String name;
    private String description;
    private Double startingPrice;
    private String status;
    
    @ManyToOne
    @JoinColumn(name = "winner_bidder_id", nullable = true)
    private Users winnerBidder;

    // Getters and Setters
    public Long getItemId() { return itemId; }
    public void setItemId(Long itemId) { this.itemId = itemId; }
    public Auction getAuction() { return auction; }
    public void setAuction(Auction auction) { this.auction = auction; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Double getStartingPrice() { return startingPrice; }
    public void setStartingPrice(Double startingPrice) { this.startingPrice = startingPrice; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Users getWinnerBidder() { return winnerBidder; }
    public void setWinnerBidder(Users winnerBidder) { this.winnerBidder = winnerBidder; }


    @Override
    public String toString() {
        return "Item{" +
                "itemId=" + itemId +
                ", auctionId=" + (auction != null ? auction.getAuctionId() : "null") +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", startingPrice=" + startingPrice +
                ", status=" + status +
                ", winnerBidderId=" + (winnerBidder != null ? winnerBidder.getUserId() : "null") +
                '}';
    }

}

enum ItemStatus { AVAILABLE, SOLD }