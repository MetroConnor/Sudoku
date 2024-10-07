package com.example.sudoku.datenbank

import org.springframework.stereotype.Service

@Service
class HighscoreService(private val repository: UserHighscore) {
    fun getAllHighscores(): List<Highscore> {
        return repository.findAll()
    }

    fun getHighscoreByUsername(username: String): List<Highscore> {
        return repository.findByUsername(username)
    }

    fun addHighscore(highscore: Highscore): Highscore {
        return repository.save(highscore)
    }

    fun deleteHighscore(id: Long) {
        repository.deleteById(id)
    }
}