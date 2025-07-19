package com.AuctionSystem.DTO;

import java.util.*;
import com.AuctionSystem.Model.Auction;
import com.AuctionSystem.Model.AuctionType;

public class BidderAuctionDTO {
    private Long auctionId;
    private AuctionType auctionType;
    private Date auctionDate;
    private String status;
    private String name;

    public BidderAuctionDTO(Auction auction, String status) {
        this.auctionId = auction.getAuctionId();
        this.auctionType = auction.getAuctionType();
        this.auctionDate = auction.getAuctionDate();
        this.name = auction.getName();
        this.status = status;
    }

    public Long getAuctionId() {
        return auctionId;
    }

    public void setAuctionId(Long auctionId) {
        this.auctionId = auctionId;
    }

    public AuctionType getAuctionType() {
        return auctionType;
    }

    public void setAuctionType(AuctionType auctionType) {
        this.auctionType = auctionType;
    }

    public Date getAuctionDate() {
        return auctionDate;
    }

    public void setAuctionDate(Date auctionDate) {
        this.auctionDate = auctionDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setName(String name) {
        this.name = name;
    }    
    public String getName() {
        return name;
    }
}
