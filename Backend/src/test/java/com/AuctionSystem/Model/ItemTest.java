package com.AuctionSystem.Model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ItemTest {

    private Item item;
    private Auction auction;
    private Users user;

    @BeforeEach
    void setUp() {
        item = new Item();
        auction = new Auction();
        auction.setAuctionId(1L);
        auction.setName("Test Auction");
        
        user = new Users();
        user.setUserId(1L);
        user.setName("Test User");
    }

    @Test
    void testItemCreation() {
        assertNotNull(item);
    }

    @Test
    void testSetAndGetItemId() {
        item.setItemId(100L);
        assertEquals(100L, item.getItemId());
    }

    @Test
    void testSetAndGetAuction() {
        item.setAuction(auction);
        assertEquals(auction, item.getAuction());
        assertEquals(1L, item.getAuction().getAuctionId());
    }

    @Test
    void testSetAndGetName() {
        item.setName("Vintage Watch");
        assertEquals("Vintage Watch", item.getName());
    }

    @Test
    void testSetAndGetDescription() {
        item.setDescription("A rare vintage watch from 1950s");
        assertEquals("A rare vintage watch from 1950s", item.getDescription());
    }

    @Test
    void testSetAndGetStartingPrice() {
        item.setStartingPrice(500.00);
        assertEquals(500.00, item.getStartingPrice());
    }

    @Test
    void testSetAndGetStatus() {
        item.setStatus("AVAILABLE");
        assertEquals("AVAILABLE", item.getStatus());
        
        item.setStatus("SOLD");
        assertEquals("SOLD", item.getStatus());
    }

    @Test
    void testSetAndGetWinnerBidder() {
        item.setWinnerBidder(user);
        assertEquals(user, item.getWinnerBidder());
        assertEquals(1L, item.getWinnerBidder().getUserId());
    }

    @Test
    void testItemWithAllFields() {
        item.setItemId(50L);
        item.setAuction(auction);
        item.setName("Antique Painting");
        item.setDescription("18th century oil painting");
        item.setStartingPrice(2000.00);
        item.setStatus("AVAILABLE");
        item.setWinnerBidder(null);
        
        assertEquals(50L, item.getItemId());
        assertEquals(auction, item.getAuction());
        assertEquals("Antique Painting", item.getName());
        assertEquals("18th century oil painting", item.getDescription());
        assertEquals(2000.00, item.getStartingPrice());
        assertEquals("AVAILABLE", item.getStatus());
        assertNull(item.getWinnerBidder());
    }

    @Test
    void testItemToString() {
        item.setItemId(1L);
        item.setAuction(auction);
        item.setName("Test Item");
        item.setDescription("Test Description");
        item.setStartingPrice(100.0);
        
        String itemString = item.toString();
        
        assertTrue(itemString.contains("itemId=1"));
        assertTrue(itemString.contains("name='Test Item'"));
        assertTrue(itemString.contains("startingPrice=100.0"));
    }
}
