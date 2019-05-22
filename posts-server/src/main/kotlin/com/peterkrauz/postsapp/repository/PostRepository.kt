package com.peterkrauz.postsapp.repository

import com.peterkrauz.postsapp.model.Post
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface PostRepository: CrudRepository<Post, Int> {
    
    override fun findAll(): List<Post?>
    
}