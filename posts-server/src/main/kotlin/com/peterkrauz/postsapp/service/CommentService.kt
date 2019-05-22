package com.peterkrauz.postsapp.service

import com.peterkrauz.postsapp.exception.ResourceNotFoundException
import com.peterkrauz.postsapp.model.Comment
import com.peterkrauz.postsapp.repository.CommentRepository
import com.peterkrauz.postsapp.repository.PostRepository
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service

@Service
class CommentService(
    private val commentRepository: CommentRepository,
    private val postRepository: PostRepository
) {
    
    fun findAllCommentsByPostId(postId: Int) = commentRepository.findByPostId(postId).sortedBy { it?.likes }
  
    fun createComment(postId: Int, comment: Comment): ResponseEntity<String> {
        val post = postRepository.findById(postId).orElseThrow { ResourceNotFoundException() }
        
        post?.let {
            it.comments.add(comment)
            comment.post = post
        }
        
        val createdComment = commentRepository.save(comment)
        return ResponseEntity("Comment ${createdComment.id} created", HttpStatus.CREATED)
    }
    
    fun updateComment(postId: Int, commentId: Int, comment: Comment): ResponseEntity<String> {
        val post = postRepository.findById(postId).orElseThrow { ResourceNotFoundException() }
        val updatedComment = commentRepository.findById(commentId).orElseThrow { ResourceNotFoundException() }
        
//        val up = post.comments[post.comments.indexOf(updatedComment)] todo: check if this is necessary
        
        updatedComment.apply {
            content = comment.content
            likes = comment.likes
        }
        
        commentRepository.save(updatedComment)
        return ResponseEntity.ok("Comment ${updatedComment.id} updated")
    }
    
    fun deleteComment(postId: Int, commentId: Int): ResponseEntity<String> {
        val post = postRepository.findById(postId).orElseThrow { ResourceNotFoundException() }
        val deletedComment =  commentRepository.findByIdAndPostId(commentId, postId)
        
        post.comments.remove(deletedComment)
        
        commentRepository.delete(deletedComment)
        postRepository.save(post)
        return ResponseEntity.ok("Comment $commentId deleted")
    }
    
    fun likeComment(postId: Int, commentId: Int, alreadyLiked: Boolean): ResponseEntity<String> {
        if (!postRepository.existsById(postId)) {
            throw ResourceNotFoundException()
        }
        
        val comment = commentRepository.findById(commentId).orElseThrow { ResourceNotFoundException() }
        
        if (alreadyLiked) {
            comment?.let { it.likes-- }
            comment.wasLiked = false
        } else {
            comment?.let { it.likes++ }
            comment.wasLiked = true
        }
        
        commentRepository.save(comment)
        return ResponseEntity.ok("")
    }
    
}