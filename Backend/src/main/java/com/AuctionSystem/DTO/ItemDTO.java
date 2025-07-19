package com.AuctionSystem.DTO;

import com.AuctionSystem.Model.Item;

public class ItemDTO {
    private Long itemId;
    private String name;
    private String description;
    private double startingPrice;
    private String status;
    private Long auctionId;

    // Constructor
    public ItemDTO(Item item) {
        this.itemId = item.getItemId();
        this.name = item.getName();
        this.description = item.getDescription();
        this.startingPrice = item.getStartingPrice();
        this.status = item.getStatus();
        this.auctionId = item.getAuction().getAuctionId();
    }

    // Getters and Setters
    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getStartingPrice() {
        return startingPrice;
    }

    public void setStartingPrice(double startingPrice) {
        this.startingPrice = startingPrice;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getAuctionId() {
        return auctionId;
    }

    public void setAuctionId(Long auctionId) {
        this.auctionId = auctionId;
    }
}
