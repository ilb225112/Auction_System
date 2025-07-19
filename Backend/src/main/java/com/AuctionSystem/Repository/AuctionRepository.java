package com.AuctionSystem.Repository;

// import com.AuctionSystem.DTO.BidDTO;
import com.AuctionSystem.Model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.Date;
import java.util.List;

@Repository
public interface AuctionRepository extends JpaRepository<Auction, Long> {
    List<Auction> findByAuctionDateAfter(Date currentDate);
    List<Auction> findByAuctionDateBetween(Date startDate, Date endDate);
    List<Auction> findByAuctionDateBefore(Date currentDate);
    List<Auction> findAllByAuctionIdNotIn(List<Long> auctionIds);

}
