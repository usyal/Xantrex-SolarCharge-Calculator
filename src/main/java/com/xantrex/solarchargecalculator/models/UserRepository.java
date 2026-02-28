package com.xantrex.solarchargecalculator.models;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer>{
    User findById(int id);
    void deleteById(int id);
    Optional<User> findByName(String name);
}
