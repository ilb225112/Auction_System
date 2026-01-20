package com.AuctionSystem.Service;

import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

import com.AuctionSystem.Model.Auction;
import com.AuctionSystem.Model.AuctionType;
import com.AuctionSystem.Model.Item;
import com.AuctionSystem.Repository.AuctionRepository;
import com.AuctionSystem.Repository.ItemRepository;

@ExtendWith(MockitoExtension.class)
class AuctionServiceTest {

    @Mock
    private AuctionRepository auctionRepository;

    @Mock
    private ItemRepository itemRepository;

    @InjectMocks
    private AuctionService auctionService;

    private Auction testAuction;
    private Date futureDate;
    private Date pastDate;
    private Date currentDate;

    @BeforeEach
    void setUp() {
        currentDate = new Date();
        
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DAY_OF_MONTH, 5);
        futureDate = cal.getTime();
        
        cal = Calendar.getInstance();
        cal.add(Calendar.DAY_OF_MONTH, -5);
        pastDate = cal.getTime();

        testAuction = new Auction();
        testAuction.setAuctionId(1L);
        testAuction.setName("Test Auction");
        testAuction.setAuctionType(AuctionType.CRICKET);
        testAuction.setAuctionDate(futureDate);
    }

    @Test
    void testGetUpcomingAuctions_Success() {
        Auction upcomingAuction = new Auction();
        upcomingAuction.setAuctionId(2L);
        upcomingAuction.setName("Upcoming Auction");
        upcomingAuction.setAuctionDate(futureDate);

        when(auctionRepository.findByAuctionDateAfter(any(Date.class)))
                .thenReturn(Arrays.asList(testAuction, upcomingAuction));

        List<Auction> upcomingAuctions = auctionService.getUpcomingAuctions();

        assertNotNull(upcomingAuctions);
        assertEquals(2, upcomingAuctions.size());
        verify(auctionRepository, times(1)).findByAuctionDateAfter(any(Date.class));
    }

    @Test
    void testGetLiveAuctions_Success() {
        Auction liveAuction = new Auction();
        liveAuction.setAuctionId(3L);
        liveAuction.setName("Live Auction");
        liveAuction.setAuctionDate(currentDate);

        when(auctionRepository.findByAuctionDateBetween(any(Date.class), any(Date.class)))
                .thenReturn(Arrays.asList(liveAuction));

        List<Auction> liveAuctions = auctionService.getLiveAuctions();

        assertNotNull(liveAuctions);
        assertEquals(1, liveAuctions.size());
        assertEquals("Live Auction", liveAuctions.get(0).getName());
        verify(auctionRepository, times(1)).findByAuctionDateBetween(any(Date.class), any(Date.class));
    }

    @Test
    void testGetCompletedAuctions_Success() {
        Auction completedAuction = new Auction();
        completedAuction.setAuctionId(4L);
        completedAuction.setName("Completed Auction");
        completedAuction.setAuctionDate(pastDate);

        when(auctionRepository.findByAuctionDateBefore(any(Date.class)))
                .thenReturn(Arrays.asList(completedAuction));

        List<Auction> completedAuctions = auctionService.getCompletedAuctions();

        assertNotNull(completedAuctions);
        assertEquals(1, completedAuctions.size());
        assertEquals("Completed Auction", completedAuctions.get(0).getName());
        verify(auctionRepository, times(1)).findByAuctionDateBefore(any(Date.class));
    }

    @Test
    void testCreateAuction_Success() {
        when(auctionRepository.save(any(Auction.class))).thenReturn(testAuction);

        Auction createdAuction = auctionService.createAuction(testAuction);

        assertNotNull(createdAuction);
        assertEquals("Test Auction", createdAuction.getName());
        assertEquals(AuctionType.CRICKET, createdAuction.getAuctionType());
        verify(auctionRepository, times(1)).save(testAuction);
    }

    @Test
    void testAddItemToAuction_Success() {
        Item item = new Item();
        item.setName("Test Item");
        item.setDescription("Test Description");
        item.setStartingPrice(100.0);

        when(auctionRepository.findById(1L)).thenReturn(Optional.of(testAuction));
        when(itemRepository.save(any(Item.class))).thenReturn(item);

        Item addedItem = auctionService.addItemToAuction(1L, item);

        assertNotNull(addedItem);
        assertEquals("Test Item", addedItem.getName());
        assertEquals("AVAILABLE", addedItem.getStatus());
        assertEquals(testAuction, addedItem.getAuction());
        verify(auctionRepository, times(1)).findById(1L);
        verify(itemRepository, times(1)).save(item);
    }

    @Test
    void testAddItemToAuction_AuctionNotFound() {
        Item item = new Item();
        item.setName("Test Item");

        when(auctionRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> {
            auctionService.addItemToAuction(999L, item);
        });

        verify(auctionRepository, times(1)).findById(999L);
        verify(itemRepository, never()).save(any(Item.class));
    }
}
