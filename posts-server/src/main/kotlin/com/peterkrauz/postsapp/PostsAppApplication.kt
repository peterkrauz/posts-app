package com.peterkrauz.postsapp

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.data.jpa.repository.config.EnableJpaAuditing

@SpringBootApplication
@EnableJpaAuditing
class PostsAppApplication

fun main(args: Array<String>) {
    runApplication<PostsAppApplication>(*args)
}
