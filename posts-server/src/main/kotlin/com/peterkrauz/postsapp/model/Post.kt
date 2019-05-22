package com.peterkrauz.postsapp.model

import javax.persistence.*

@Entity
@Table(name = "posts")
data class Post(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Int = 0,
    @Column(name = "title")
    var title: String,
    @Column(name = "content")
    var content: String,
    @Column(name = "up_votes")
    var upVotes: Int = 1,
    @Column(name = "down_votes")
    var downVotes: Int = 0,
    @Column(name = "is_up_voted")
    var isUpVoted: Boolean = false,
    @Column(name = "is_down_voted")
    var isDownVoted: Boolean? = false,
    @OneToMany(cascade = [CascadeType.ALL],
        fetch = FetchType.LAZY,
        mappedBy = "post")
    var comments: MutableList<Comment>
): AuditModel()