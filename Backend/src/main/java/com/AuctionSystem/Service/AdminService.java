package com.AuctionSystem.Service;

import com.AuctionSystem.Model.BidRegistration;
// import com.AuctionSystem.Model.*;
import com.AuctionSystem.DTO.*;
import com.AuctionSystem.Repository.BidRegistrationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminService {
    @Autowired
    private BidRegistrationRepository bidRegistrationRepository;

    public List<BidderDTO> getRegisteredBidders(Long auctionId) {
        return bidRegistrationRepository.findByAuctionAuctionId(auctionId)
                .stream()
                .map(reg -> {
                    var user = reg.getBidder();
                    return new BidderDTO(user.getUserId(), user.getName(), user.getEmail(), user.getRole());
                })
                .collect(Collectors.toList());
    }

    public void deleteBidderFromAuction(Long auctionId, Long userId) {
        BidRegistration registration = bidRegistrationRepository.findByAuctionAuctionIdAndBidderUserId(auctionId, userId);
        if (registration != null) {
            bidRegistrationRepository.delete(registration);
        }
    }
}
