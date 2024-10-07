package com.example.sudoku.datenbank
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/highscore")
class HighscoreController(private val service: HighscoreService) {

    @GetMapping
    fun getAllHighscores(): List<Highscore> {
        return service.getAllHighscores()
    }

    @GetMapping("/{username}")
    fun getHighscoreByUsername(@PathVariable username: String): List<Highscore> {
        return service.getHighscoreByUsername(username)
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun addHighscore(@RequestBody highscore: Highscore): Highscore {
        return service.addHighscore(highscore)
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteHighscoreById(@PathVariable id: Long) {
        service.deleteHighscore(id)
    }

}