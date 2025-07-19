package com.AuctionSystem.DTO;

import java.util.Date;

import com.AuctionSystem.Model.Bid;

public class BidDTO {
    private Long itemId;
    private String bidderName;
    private Long bidderId;
    private Double bidAmount;
    private Date bidTime;

    public BidDTO() {}

    public BidDTO(Long itemId, Long bidderId, String bidderName, Double bidAmount, Date bidTime){
        this.itemId = itemId;
        this.bidderId = bidderId;
        this.bidderName = bidderName;
        this.bidAmount = bidAmount;
        this.bidTime = bidTime;
    }

    // Static method to convert Bid entity to BidDTO
    public static BidDTO fromEntity(Bid bid) {
        return new BidDTO(
            bid.getBidder().getUserId(),
            bid.getItem().getItemId(),
            bid.getBidder().getName(),
            bid.getBidAmount(),
            bid.getBidTime()
        );
    }

    // Getters & Setters
    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    public String getBidderName() {
        return bidderName;
    }

    public void setBidderName(String bidderName) {
        this.bidderName = bidderName;
    }

    public Double getBidAmount() {
        return bidAmount;
    }

    public void setBidAmount(Double bidAmount) {
        this.bidAmount = bidAmount;
    }

    public void setBidderId(Long bidderId){
        this.bidderId = bidderId;
    }

    public Long getBidderId(){
        return this.bidderId;
    }

    public Date getBidtime(){
        return this.bidTime;
    }
}
