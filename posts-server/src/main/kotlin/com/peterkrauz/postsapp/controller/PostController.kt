package com.peterkrauz.postsapp.controller

import com.peterkrauz.postsapp.model.payload.PostDTO
import com.peterkrauz.postsapp.model.payload.VotingDTO
import com.peterkrauz.postsapp.service.PostService
import org.springframework.web.bind.annotation.*
import java.util.stream.Collectors

@RestController
class PostController(private val postService: PostService) {
    
    @GetMapping("/posts")
    fun allPosts(): List<PostDTO> = postService
        .findAllPosts()
        .stream()
        .map { PostDTO(it!!) }
        .collect(Collectors.toList())
    
    @PostMapping("/posts")
    fun createPost(@RequestBody(required = true) dto: PostDTO) = postService.createPost(dto.post)
   
    @PutMapping("/posts/{id}")
    fun updatePost(@PathVariable id: Int, @RequestBody(required = true) dto: PostDTO) = postService.updatePost(id, dto.post)
    
    @DeleteMapping("/posts/{id}")
    fun deletePost(@PathVariable id: Int) = postService.deletePost(id)
    
    @PutMapping("/posts/{id}/upVote")
    fun upVotePost(@PathVariable id: Int, @RequestBody(required = false) votingState: VotingDTO) = postService.upVotePost(id, votingState)
    
    @PutMapping("/posts/{id}/downVote")
    fun downVotePost(@PathVariable id: Int, @RequestBody(required = false) votingState: VotingDTO) = postService.downVotePost(id, votingState)
    
}