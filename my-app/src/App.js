import React, {useEffect, useState} from 'react';
import './App.css';
import {Container, Pagination, TextField, Stack, Link} from "@mui/material";

import axios from "axios";

const BASE_URL = 'http://hn.algolia.com/api/v1/search?';

function App() {
    const [posts, setPosts] = useState([])
    const [query, setQuery] = useState('react')
    const [page, setPage] = useState(1)
    const [pageQty, setPageQty] = useState(0)

    useEffect(() => {
        axios.get(BASE_URL + `query=${query}&page=${page - 1}`)
            .then(({data}) => {
            console.log(data)
            setPosts(data.hits)
            setPageQty(data.nbPages)
        })

    }, [query, page])


    return (
        <Container className="App">
        <TextField
            fullWidth
            label='query'
            value={query}
            onChange={(event) => setQuery(event.target.value)}
        />
            <Stack spacing={2}>
                {!!pageQty && (
                    <Pagination
                    count={pageQty}
                    page={page}
                    onChange={(_, num) => setPage(num)}
                />
                )}
                {
                    posts.map(post => (
                    <Link key={post.objectID} href={post.url}>
                        {post.title || post.story_title}
                    </Link>
                ))
                }
            </Stack>
    </Container>
    )
}

export default App;
