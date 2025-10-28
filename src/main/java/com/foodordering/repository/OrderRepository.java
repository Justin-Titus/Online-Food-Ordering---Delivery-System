package com.foodordering.repository;

import com.foodordering.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    
    List<Order> findByUserIdOrderByCreatedAtDesc(Long userId);
    
    List<Order> findAllByOrderByCreatedAtDesc();
    
    @Query("SELECT o FROM Order o LEFT JOIN FETCH o.items oi LEFT JOIN FETCH oi.menuItem WHERE o.id = :orderId")
    Order findByIdWithItems(@Param("orderId") Long orderId);
}