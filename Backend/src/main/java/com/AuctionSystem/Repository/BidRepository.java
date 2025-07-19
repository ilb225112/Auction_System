package com.AuctionSystem.Repository;

import com.AuctionSystem.Model.Bid;
import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BidRepository extends JpaRepository<Bid, Long> {
    // @Query("SELECT b FROM Bid b WHERE b.auction.id = :auctionId ORDER BY b.bidTime DESC")
    // List<Bid> findBidsByAuctionIdOrderByBidTimeDesc(Long auctionId);
    List<Bid> findBidsByItem_ItemIdAndItem_Auction_AuctionIdOrderByBidTimeDesc(Long itemId, Long auctionId);
}