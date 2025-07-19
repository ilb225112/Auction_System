package com.AuctionSystem.Repository;

// import com.AuctionSystem.DTO.ItemDTO;
import com.AuctionSystem.Model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    // List<Item> findByAuctionId(Long auctionId);
    List<Item> findByAuction_AuctionId(Long auctionId);
    List<Item> findByWinnerBidderUserIdAndAuctionAuctionId(Long userId, Long auctionId);
    List<Item> findByAuction_AuctionIdAndWinnerBidder_UserId(Long auctionId, Long userId);

}
