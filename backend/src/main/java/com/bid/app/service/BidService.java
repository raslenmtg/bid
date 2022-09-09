package com.bid.app.service;


import com.bid.app.model.Bid;
import com.bid.app.model.Product;
import com.bid.app.repository.BidRepository;
import com.bid.app.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BidService {

    private final BidRepository bidRepository;
    private final ProductRepository productRepository;


    public BidService(BidRepository bidRepository, ProductRepository productRepository) {
        this.bidRepository = bidRepository;
        this.productRepository = productRepository;
    }


    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public List<Bid> getBids() {
        return bidRepository.findAll();
    }

    public Bid AddBid(Bid bid){
        return bidRepository.save(bid);
    }

    public void DeleteBid(Bid bid){
        bidRepository.delete(bid);
    }




}
