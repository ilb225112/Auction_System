package com.AuctionSystem.Model;

import jakarta.persistence.*;


// BidRegistration.java
@Entity
@Table(name = "bidders_registration")
public class BidRegistration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long registrationId;
    
    @ManyToOne
    @JoinColumn(name = "auction_id")
    private Auction auction;
    
    @ManyToOne
    @JoinColumn(name = "bidder_id")
    private Users bidder;

    // Getters and Setters
    public Long getRegistrationId() { return registrationId; }
    public void setRegistrationId(Long registrationId) { this.registrationId = registrationId; }
    public Auction getAuction() { return auction; }
    public void setAuction(Auction auction) { this.auction = auction; }
    public Users getBidder() { return bidder; }
    public void setBidder(Users bidder) { this.bidder = bidder; }
}
