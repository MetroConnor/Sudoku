package com.example.sudoku.datenbank

import org.springframework.data.jpa.repository.JpaRepository


interface UserHighscore : JpaRepository <Highscore, Long> {
    fun findByUsername(username: String): List<Highscore>
}