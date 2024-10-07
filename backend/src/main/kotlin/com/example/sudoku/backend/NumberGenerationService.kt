package com.example.sudoku.backend

import org.springframework.stereotype.Service
import kotlin.random.Random

@Service
class NumberGenerationService {

    fun generateSudokuNumbers(): List<List<Int>> {
        val base = 3
        val side = base * base

        fun pattern(row: Int, col: Int) = (base * (row % base) + row / base + col) % side

        fun shuffleBlockGroups() = (0 until base).flatMap { block ->
            (0 until base).map { it + block * base }.shuffled(Random)
        }

        val rows = shuffleBlockGroups()
        val cols = shuffleBlockGroups()
        val nums = (1..side).toList().shuffled(Random)

        val board = List(side) { r ->
            List(side) { c ->
                nums[pattern(rows[r], cols[c])]
            }
        }

        return board
    }

    fun generatePuzzleBoard(board: List<List<Int>>, missingCount: Int): List<List<Int?>> {
        val puzzleBoard = MutableList(board.size) { MutableList<Int?>(board.size) { null } }

        // Fülle das puzzleBoard mit Werten aus dem board
        for (r in board.indices) {
            for (c in board[r].indices) {
                puzzleBoard[r][c] = board[r][c]
            }
        }

        var count = missingCount
        while (count > 0) {
            val row = Random.nextInt(board.size)
            val col = Random.nextInt(board.size)

            if (puzzleBoard[row][col] != null) {
                puzzleBoard[row][col] = null
                count--
            }
        }
        return puzzleBoard
    }
}