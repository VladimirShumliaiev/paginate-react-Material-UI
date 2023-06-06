import React, {useEffect, useState} from 'react';
import './App.css';
import {Container, TextField, Pagination, Stack, Link} from '@mui/material'

import axios from "axios";

const BASE_URL = 'http://hn.algolia.com/api/v1/search?';

function App() {
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const [pageQty, setPageQty] = useState(0)
    const [query, setQuery] = useState('react')

    useEffect(() => {
        axios.get(BASE_URL + `query=${query}&page=${page - 1}`)
            .then(({data}) => {
                console.log(data)
                setPosts(data.hits)
                setPageQty(data.nbPages)
            })
    },[page, query])

    return (
        <div className={'App'}>
            <Container>
                <TextField
                value={query}
                fullWidth
                label={'TEST PAGINATION'}
                onChange={event => setQuery(event.target.value)}
                />
                <Stack spacing={1}>
                    {!!pageQty && (
                        <Pagination
                            count={pageQty}
                            page={page}
                            onChange={(_,i) => setPage(i)}
                        />
                    )}
                    {posts.map((post,index) => (
                        <Link key={index} href={post.url}>
                            {post.title || post.story_title}
                        </Link>
                    ))}

                </Stack>
            </Container>
        </div>
    )
}

export default App;
