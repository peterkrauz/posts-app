package com.peterkrauz.postsapp.controller

import com.peterkrauz.postsapp.model.payload.CommentDTO
import com.peterkrauz.postsapp.model.payload.CommentWasLikedDTO
import com.peterkrauz.postsapp.service.CommentService
import org.springframework.web.bind.annotation.*
import java.util.stream.Collectors

@RestController
class CommentController(private val commentService: CommentService) {
    
    @GetMapping("/posts/{postId}/comments")
    fun allCommentsByPostId(@PathVariable postId: Int): List<CommentDTO> = commentService
        .findAllCommentsByPostId(postId)
        .stream()
        .map { CommentDTO(it!!) }
        .collect(Collectors.toList())
    
    @PostMapping("/posts/{postId}/comments")
    fun createComment(@PathVariable postId: Int, @RequestBody(required = true) dto: CommentDTO) = commentService.createComment(postId, dto.comment)
    
    @PutMapping("posts/{postId}/comments/{commentId}")
    fun updateComment(
        @PathVariable postId: Int,
        @PathVariable commentId: Int,
        @RequestBody(required = true) dto: CommentDTO) = commentService.updateComment(postId, commentId, dto.comment)
    
    @DeleteMapping("posts/{postId}/comments/{commentId}")
    fun deleteComment(@PathVariable postId: Int, @PathVariable commentId: Int) = commentService.deleteComment(postId, commentId)
    
    @PutMapping("posts/{postId}/comments/{commentId}/like")
    fun likeComment(@PathVariable postId: Int, @PathVariable commentId: Int, @RequestBody(required = true) likeDTO: CommentWasLikedDTO) = commentService.likeComment(postId, commentId, likeDTO.wasLiked)

}