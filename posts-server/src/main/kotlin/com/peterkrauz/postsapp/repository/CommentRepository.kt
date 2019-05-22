package com.peterkrauz.postsapp.repository

import com.peterkrauz.postsapp.model.Comment
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface CommentRepository: CrudRepository<Comment, Int> {

    override fun findAll(): List<Comment?>
    
    fun findByPostId(postId: Int): List<Comment>
    
    fun findByIdAndPostId(id: Int, postId: Int): Comment?

}