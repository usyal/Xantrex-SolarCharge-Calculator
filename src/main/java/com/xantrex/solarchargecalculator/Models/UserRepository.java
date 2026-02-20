package com.xantrex.solarchargecalculator.Models;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer>{
    User findById(int id);
    boolean existsByEmail(String email);
    void deleteById(int id);
}
