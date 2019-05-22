package com.peterkrauz.postsapp.service

import com.peterkrauz.postsapp.exception.ResourceNotFoundException
import com.peterkrauz.postsapp.model.Post
import com.peterkrauz.postsapp.model.payload.VotingDTO
import com.peterkrauz.postsapp.repository.CommentRepository
import com.peterkrauz.postsapp.repository.PostRepository
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service

@Service
class PostService(
    private val postRepository: PostRepository,
    private val commentRepository: CommentRepository
) {
    
    fun findAllPosts() = postRepository.findAll().sortedBy { it?.id }
    
    fun createPost(post: Post): ResponseEntity<String> {
        val createdPost = postRepository.save(post)
        return ResponseEntity("Post ${createdPost.id} created", HttpStatus.CREATED)
    }
    
    fun updatePost(id: Int, post: Post): ResponseEntity<String> {
        val updatedPost = postRepository.findById(id).orElseThrow { ResourceNotFoundException() }
        
        updatedPost.apply {
            title = post.title
            content = post.content
            upVotes = post.upVotes
            downVotes = post.downVotes
        }
        
        postRepository.save(updatedPost)
        return ResponseEntity.ok("Post ${updatedPost.id} updated")
    }
    
    fun deletePost(id: Int): ResponseEntity<String> {
        val deletedPost = postRepository.findById(id).orElseThrow { ResourceNotFoundException() }
        
        val postComments = commentRepository.findByPostId(id)
        postComments.forEach {
            it?.apply {
                commentRepository.delete(this)
            }
        }
        
        postRepository.delete(deletedPost)
        return ResponseEntity.ok("Post $id deleted")
    }
    
    fun upVotePost(id: Int, votingState: VotingDTO): ResponseEntity<String> {
        val post = postRepository.findById(id).orElseThrow { ResourceNotFoundException() }
        
        if (votingState.wasUpVoted) {
            post.isUpVoted = false
            post?.let { it.upVotes-- }
        } else {
            post.isUpVoted = true
            post?.let { it.upVotes++ }
        }
        
        if (votingState.wasDownVoted) {
            post.isDownVoted = false
            post?.let { it.downVotes-- }
        }
        
        postRepository.save(post)
        return ResponseEntity.ok("Post $id upvoted")
    }
    
    fun downVotePost(id: Int, votingState: VotingDTO): ResponseEntity<String> {
        val post = postRepository.findById(id).orElseThrow { ResourceNotFoundException() }
        
        if (votingState.wasDownVoted) {
            post.isDownVoted = false
            post?.let { it.downVotes-- }
        } else {
            post.isDownVoted = true
            post?.let { it.downVotes++ }
        }
    
        if (votingState.wasUpVoted) {
            post.isUpVoted = false
            post?.let { it.upVotes-- }
        }
        
        postRepository.save(post)
        return ResponseEntity.ok("Post $id downvoted")
    }
    
}