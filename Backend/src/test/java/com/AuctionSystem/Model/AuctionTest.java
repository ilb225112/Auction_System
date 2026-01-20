package com.AuctionSystem.Model;

import java.util.Calendar;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class AuctionTest {

    private Auction auction;
    private Date testDate;

    @BeforeEach
    void setUp() {
        auction = new Auction();
        testDate = new Date();
    }

    @Test
    void testAuctionDefaultConstructor() {
        assertNotNull(auction);
    }

    @Test
    void testAuctionParameterizedConstructor() {
        Auction auction2 = new Auction(1L, "Test Auction", AuctionType.CRICKET, testDate);
        
        assertEquals(1L, auction2.getAuctionId());
        assertEquals("Test Auction", auction2.getName());
        assertEquals(AuctionType.CRICKET, auction2.getAuctionType());
        assertEquals(testDate, auction2.getAuctionDate());
    }

    @Test
    void testSetAndGetAuctionId() {
        auction.setAuctionId(10L);
        assertEquals(10L, auction.getAuctionId());
    }

    @Test
    void testSetAndGetName() {
        auction.setName("Spring Auction 2026");
        assertEquals("Spring Auction 2026", auction.getName());
    }

    @Test
    void testSetAndGetAuctionType() {
        auction.setAuctionType(AuctionType.CRICKET);
        assertEquals(AuctionType.CRICKET, auction.getAuctionType());
        
        auction.setAuctionType(AuctionType.ANTIQUES);
        assertEquals(AuctionType.ANTIQUES, auction.getAuctionType());
        
        auction.setAuctionType(AuctionType.REAL_ESTATE);
        assertEquals(AuctionType.REAL_ESTATE, auction.getAuctionType());
    }

    @Test
    void testSetAndGetAuctionDate() {
        Calendar cal = Calendar.getInstance();
        cal.set(2026, Calendar.MARCH, 15, 10, 0, 0);
        Date auctionDate = cal.getTime();
        
        auction.setAuctionDate(auctionDate);
        assertEquals(auctionDate, auction.getAuctionDate());
    }

    @Test
    void testAuctionWithAllFields() {
        auction.setAuctionId(5L);
        auction.setName("Winter Auction");
        auction.setAuctionType(AuctionType.KABADDI);
        auction.setAuctionDate(testDate);
        
        assertEquals(5L, auction.getAuctionId());
        assertEquals("Winter Auction", auction.getName());
        assertEquals(AuctionType.KABADDI, auction.getAuctionType());
        assertEquals(testDate, auction.getAuctionDate());
    }
}
