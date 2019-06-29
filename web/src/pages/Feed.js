import React, { Component } from 'react';
import './Feed.css';
import io from 'socket.io-client';

import more from '../assets/more.svg';
import like from '../assets/like.svg'; 
import comment from '../assets/comment.svg'; 
import send from '../assets/send.svg';
import api from '../services/api';

class Feed extends Component {
    state = {
        feed: [],
    };

    async componentDidMount() {
        this.registerToSocket();

        const response = await api.get('posts');
        this.setState({feed:response.data});

    }

    registerToSocket = () => {
        const socket = io('http://localhost:3333');

        //post
        socket.on('post', newPost => {
            this.setState({ feed: [newPost, ...this.state.feed] });
        })

        //like
        socket.on('like',likedPost => {
            this.setState({
                feed: this.state.feed.map(post => 
                    post._id === likedPost._id ? likedPost : post
                    )
            })
        })
    }   

    handleLike = id => {
        api.post(`/posts/${id}/like`);
    }

    handleTeste = likes => {
        if(likes > 10) {
            return "Sou famoso porra";
        } else if(likes > 5) {
            return "Sou mediano porra";
        } else {
            return "Sou lixo porra";
        }
    };

    handleComment = ()=> {/*
        let display = document.getElementById("comments").style.display;
        console.log(display);
        if(display === 'none' || display === null) {
        document.getElementById("comments").style.display = 'block';       
        } else {
        document.getElementById("comments").style.display = 'none';
        }*/
        
        var doc = document.getElementsByClassName("user-info");
        for(var i = 0; i < doc.length; i++) {
            console.log(doc[i].getAttributeNames);
        }
       // console.log(doc);
    }
    
    render() {
        return (
            <section id="post-list">
                {this.state.feed.map(post => (
                    <article key={post._id}>
                        <header>
                            <div className="user-info">
                                <span>{post.author}</span>
                                <span className="place">{post.place}</span>
                            </div>

                            <img src = {more} alt="Mais" />
                        </header>

                    <img src={`http://localhost:3333/files/${post.image}`} alt =""/>

                    <footer>
                        <div className = "actions">
                            <button type="button" onClick={()=> this.handleLike(post._id)}>
                                <img src={like} alt =""/>
                            </button>

                            <button type="button" onClick={() => this.handleComment()}>
                                <img src={comment} alt =""/>
                            </button>
                            <img src={send} alt =""/>
                        </div>
                        <strong>{post.likes} {this.handleTeste(post.likes)} curtidas</strong>
                        <p>{post.description}
                            <span>{post.hashtags}</span>
                        </p>
                    </footer>
                </article>
                ))}
            </section>
        );
    }
}

export default Feed;