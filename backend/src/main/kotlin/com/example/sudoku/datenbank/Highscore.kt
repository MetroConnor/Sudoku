package com.example.sudoku.datenbank
import jakarta.persistence.*
import jakarta.persistence.Entity
import java.time.LocalDateTime

@Entity
@Table(name = "highscore")
data class Highscore(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(name = "username",nullable = false)
    val username: String,

    @Column(name = "completion_time",nullable = false)
    val completionTime: Int,

    @Column(name = "date",nullable = false)
    val date: LocalDateTime = LocalDateTime.now(),

    @Column(name = "difficulty_level",nullable = false)
    val difficultyLevel: String
)