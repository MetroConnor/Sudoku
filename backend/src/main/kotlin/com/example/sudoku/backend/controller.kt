package com.example.sudoku.backend

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
class NumberController(private val numberGenerationService: NumberGenerationService) {

    @GetMapping("/randomNumbers")
    fun getRandomNumbers(): List<List<Int>> {
        return numberGenerationService.generateSudokuNumbers()
    }

    @GetMapping("/sudokuPuzzle")
    fun getSudokuPuzzle(@RequestParam missingCount: Int): Map<String, Any> {
        val solution = numberGenerationService.generateSudokuNumbers()
        // Hier wird das Puzzle generiert und sowohl das Puzzle als auch die Lösung zurückgegeben
        val puzzle = numberGenerationService.generatePuzzleBoard(solution, missingCount)

        return mapOf("puzzle" to puzzle, "solution" to solution)
    }
}