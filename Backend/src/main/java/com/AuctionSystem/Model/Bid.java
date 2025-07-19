package com.AuctionSystem.Model;

import jakarta.persistence.*;
import java.util.Date;

// Bid.java
@Entity
@Table(name = "bids")
public class Bid {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bidId;

    @ManyToOne
    @JoinColumn(name = "auction_id")
    private Auction auction;

    @ManyToOne
    @JoinColumn(name = "bidder_id")
    private Users bidder;

    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;

    private Double bidAmount;
    private Date bidTime;

    // Getters and Setters
    public Long getBidId() {
        return bidId;
    }

    public void setBidId(Long bidId) {
        this.bidId = bidId;
    }

    public Auction getAuction() {
        return auction;
    }

    public void setAuction(Auction auction) {
        this.auction = auction;
    }

    public Users getBidder() {
        return bidder;
    }

    public void setBidder(Users bidder) {
        this.bidder = bidder;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public Double getBidAmount() {
        return bidAmount;
    }

    public void setBidAmount(Double bidAmount) {
        this.bidAmount = bidAmount;
    }

    public Date getBidTime() {
        return bidTime;
    }

    public void setBidTime(Date bidTime) {
        this.bidTime = bidTime;
    }

    @Override
    public String toString() {
        return "Bid{" +
                "bidId=" + bidId +
                ", auction=" + (auction != null ? auction.getAuctionId() : "null") +
                ", bidder=" + (bidder != null ? bidder.getUserId() : "null") +
                ", item=" + (item != null ? item.getItemId() : "null") +
                ", bidAmount=" + bidAmount +
                ", bidTime=" + bidTime +
                '}';
    }
}
