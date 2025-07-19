package com.AuctionSystem.Repository;
import com.AuctionSystem.Model.*;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BidRegistrationRepository extends JpaRepository<BidRegistration, Long> {
    List<BidRegistration> findByBidder_UserId(Long userId);
    List<BidRegistration> findByAuctionAuctionId(Long auctionId);
    BidRegistration findByAuctionAuctionIdAndBidderUserId(Long auctionId, Long userId);
}
