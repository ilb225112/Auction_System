package com.AuctionSystem.Model;

import jakarta.persistence.*;
import java.util.List;
// import java.util.stream.Collectors;

@Entity
@Table(name = "users")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String name;
    private String email;
    private String password;
    private String role;

    @OneToMany(mappedBy = "bidder")
    private List<BidRegistration> registrations;

    // Getters and Setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }

    public List<BidRegistration> getRegistrations() {
        return registrations;
    }

    public void setRegistrations(List<BidRegistration> registrations) {
        this.registrations = registrations;
    }

    @Override
    public String toString() {
        return "Users{" +
                "userId=" + userId +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}




// package com.AuctionSystem.Model;

// import jakarta.persistence.*;
// import java.util.Date;

// // Auction.java
// @Entity
// @Table(name = "auctions")
// public class Auction {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long auction_id;
    
//     @Enumerated(EnumType.STRING)
//     private AuctionType auctionType;
//     private Date auctionDate;

//     public Auction() {
//     }

//     public Auction(Long auction_id, AuctionType auctionType, Date auctionDate) {
//         this.auction_id = auction_id;
//         this.auctionType = auctionType;
//         this.auctionDate = auctionDate;
//     }

//     // Getters and Setters
//     public Long getAuctionId() { return auction_id; }
//     public void setAuctionId(Long auction_id) { this.auction_id = auction_id; }
//     public AuctionType getAuctionType() { return auctionType; }
//     public void setAuctionType(AuctionType auctionType) { this.auctionType = auctionType; }
//     public Date getAuctionDate() { return auctionDate; }
//     public void setAuctionDate(Date auctionDate) { this.auctionDate = auctionDate; }
// }

// enum AuctionType { CRICKET, ANTIQUES, REAL_ESTATE, KABADDI }

// package com.AuctionSystem.Model;

// import jakarta.persistence.*;

// // Item.java
// @Entity
// @Table(name = "items")
// public class Item {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long itemId;
    
//     @ManyToOne
//     @JoinColumn(name = "auction_id")
//     private Auction auction;
    
//     private String name;
//     private String description;
//     private Double startingPrice;
    
//     @Enumerated(EnumType.STRING)
//     private ItemStatus status;
    
//     @ManyToOne
//     @JoinColumn(name = "winner_bidder_id", nullable = true)
//     private Users winnerBidder;

//     // Getters and Setters
//     public Long getItemId() { return itemId; }
//     public void setItemId(Long itemId) { this.itemId = itemId; }
//     public Auction getAuction() { return auction; }
//     public void setAuction(Auction auction) { this.auction = auction; }
//     public String getName() { return name; }
//     public void setName(String name) { this.name = name; }
//     public String getDescription() { return description; }
//     public void setDescription(String description) { this.description = description; }
//     public Double getStartingPrice() { return startingPrice; }
//     public void setStartingPrice(Double startingPrice) { this.startingPrice = startingPrice; }
//     public ItemStatus getStatus() { return status; }
//     public void setStatus(ItemStatus status) { this.status = status; }
//     public Users getWinnerBidder() { return winnerBidder; }
//     public void setWinnerBidder(Users winnerBidder) { this.winnerBidder = winnerBidder; }
// }

// enum ItemStatus { AVAILABLE, SOLD }


// package com.AuctionSystem.Model;

// import jakarta.persistence.*;


// // BidRegistration.java
// @Entity
// @Table(name = "bidders_registration")
// public class BidRegistration {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long registrationId;
    
//     @ManyToOne
//     @JoinColumn(name = "auction_id")
//     private Auction auction;
    
//     @ManyToOne
//     @JoinColumn(name = "bidder_id")
//     private Users bidder;

//     // Getters and Setters
//     public Long getRegistrationId() { return registrationId; }
//     public void setRegistrationId(Long registrationId) { this.registrationId = registrationId; }
//     public Auction getAuction() { return auction; }
//     public void setAuction(Auction auction) { this.auction = auction; }
//     public Users getBidder() { return bidder; }
//     public void setBidder(Users bidder) { this.bidder = bidder; }
// }


// package com.AuctionSystem.Model;

// import jakarta.persistence.*;
// import java.util.Date;


// // Bid.java
// @Entity
// @Table(name = "bids")
// public class Bid {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long bidId;
    
//     @ManyToOne
//     @JoinColumn(name = "auction_id")
//     private Auction auction;
    
//     @ManyToOne
//     @JoinColumn(name = "bidder_id")
//     private Users bidder;
    
//     @ManyToOne
//     @JoinColumn(name = "item_id")
//     private Item item;
    
//     private Double bidAmount;
//     private Date bidTime;

//     // Getters and Setters
//     public Long getBidId() { return bidId; }
//     public void setBidId(Long bidId) { this.bidId = bidId; }
//     public Auction getAuction() { return auction; }
//     public void setAuction(Auction auction) { this.auction = auction; }
//     public Users getBidder() { return bidder; }
//     public void setBidder(Users bidder) { this.bidder = bidder; }
//     public Item getItem() { return item; }
//     public void setItem(Item item) { this.item = item; }
//     public Double getBidAmount() { return bidAmount; }
//     public void setBidAmount(Double bidAmount) { this.bidAmount = bidAmount; }
//     public Date getBidTime() { return bidTime; }
//     public void setBidTime(Date bidTime) { this.bidTime = bidTime; }
// }
