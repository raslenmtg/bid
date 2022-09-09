package com.bid.app.controller;

import com.bid.app.model.Bid;
import com.bid.app.model.Product;
import com.bid.app.model.User;
import com.bid.app.service.BidService;
import com.bid.app.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AdminController {

    private final UserService userService;
    private final BidService bidService;

    public AdminController(UserService userService, BidService bidService) {
        this.userService = userService;
        this.bidService = bidService;
    }

    @PostMapping("user")
    User AddUser(@RequestBody User user){
        return userService.AddUser(user);
    }

    @DeleteMapping("user/{id}")
    void deleteUser(@PathVariable("id") Long id){
        userService.deleteUser(id);
    }

    @GetMapping("user")
    List<User> getUsers(){
        return  userService.getUsers();
    }



    @PostMapping("product")
    Product Addproduct(@RequestBody Product user){
        return bidService.addProduct(user);
    }

    @DeleteMapping("product/{id}")
    void deleteproduct(@PathVariable("id") Long id){
        bidService.deleteProduct(id);
    }

    @GetMapping("product")
    List<Product> getproducts(){
        return  bidService.getProducts();
    }



    @PostMapping("bid")
    Bid AddBid(@RequestBody Bid bid){
        return bidService.AddBid(bid);
    }

    @DeleteMapping("bid")
    void deleteBid(@RequestBody Bid bid){
        bidService.DeleteBid(bid);
    }

    @GetMapping("bid")
    List<Bid> getBids(){
        return  bidService.getBids();
    }










}
