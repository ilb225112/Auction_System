package com.AuctionSystem.Model;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class BidTest {

    private Bid bid;
    private Auction auction;
    private Users bidder;
    private Item item;
    private Date bidTime;

    @BeforeEach
    void setUp() {
        bid = new Bid();
        
        auction = new Auction();
        auction.setAuctionId(1L);
        auction.setName("Test Auction");
        
        bidder = new Users();
        bidder.setUserId(1L);
        bidder.setName("Test Bidder");
        bidder.setEmail("bidder@example.com");
        
        item = new Item();
        item.setItemId(1L);
        item.setName("Test Item");
        item.setStartingPrice(100.0);
        
        bidTime = new Date();
    }

    @Test
    void testBidCreation() {
        assertNotNull(bid);
    }

    @Test
    void testSetAndGetBidId() {
        bid.setBidId(1L);
        assertEquals(1L, bid.getBidId());
    }

    @Test
    void testSetAndGetAuction() {
        bid.setAuction(auction);
        assertEquals(auction, bid.getAuction());
        assertEquals(1L, bid.getAuction().getAuctionId());
    }

    @Test
    void testSetAndGetBidder() {
        bid.setBidder(bidder);
        assertEquals(bidder, bid.getBidder());
        assertEquals("Test Bidder", bid.getBidder().getName());
    }

    @Test
    void testSetAndGetItem() {
        bid.setItem(item);
        assertEquals(item, bid.getItem());
        assertEquals(1L, bid.getItem().getItemId());
    }

    @Test
    void testSetAndGetBidAmount() {
        bid.setBidAmount(250.50);
        assertEquals(250.50, bid.getBidAmount());
    }

    @Test
    void testSetAndGetBidTime() {
        bid.setBidTime(bidTime);
        assertEquals(bidTime, bid.getBidTime());
    }

    @Test
    void testBidWithAllFields() {
        bid.setBidId(10L);
        bid.setAuction(auction);
        bid.setBidder(bidder);
        bid.setItem(item);
        bid.setBidAmount(500.00);
        bid.setBidTime(bidTime);
        
        assertEquals(10L, bid.getBidId());
        assertEquals(auction, bid.getAuction());
        assertEquals(bidder, bid.getBidder());
        assertEquals(item, bid.getItem());
        assertEquals(500.00, bid.getBidAmount());
        assertEquals(bidTime, bid.getBidTime());
    }

    @Test
    void testMultipleBidsIncreasingAmount() {
        Bid bid1 = new Bid();
        bid1.setBidAmount(100.0);
        
        Bid bid2 = new Bid();
        bid2.setBidAmount(150.0);
        
        Bid bid3 = new Bid();
        bid3.setBidAmount(200.0);
        
        assertTrue(bid2.getBidAmount() > bid1.getBidAmount());
        assertTrue(bid3.getBidAmount() > bid2.getBidAmount());
    }
}
