package com.AuctionSystem.Model;

import jakarta.persistence.*;
import java.util.Date;

// Auction.java
@Entity
@Table(name = "auctions")
public class Auction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long auctionId;
    private String name;
    @Enumerated(EnumType.STRING)
    private AuctionType auctionType;
    private Date auctionDate;

    public Auction() {
    }

    public Auction(Long auctionId, String name, AuctionType auctionType, Date auctionDate) {
        this.auctionId = auctionId;
        this.name = name;
        this.auctionType = auctionType;
        this.auctionDate = auctionDate;
    }

    // Getters and Setters
    public Long getAuctionId() { return auctionId; }
    public void setAuctionId(Long auctionId) { this.auctionId = auctionId; }
    public String getName() {return name;}
    public void setName(String name){this.name = name;}
    public AuctionType getAuctionType() { return auctionType; }
    public void setAuctionType(AuctionType auctionType) { this.auctionType = auctionType; }
    public Date getAuctionDate() { return auctionDate; }
    public void setAuctionDate(Date auctionDate) { this.auctionDate = auctionDate; }
}