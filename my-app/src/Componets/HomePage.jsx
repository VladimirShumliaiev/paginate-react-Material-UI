import React, {useEffect, useState} from 'react';
import {TextField, Pagination, PaginationItem, Stack, Link} from '@mui/material'
import axios from "axios";
import {Link as NavLink} from 'react-router-dom'


const BASE_URL = 'http://hn.algolia.com/api/v1/search?';

const HomePage = () => {
    const [posts, setPosts] = useState([])
    const [query, setQuery] = useState('query')
    const [page, setPage] = useState(1)
    const [pageQty, setPageQty] = useState(0)

    useEffect(() => {
        axios.get(BASE_URL + `query=${query}&page=${page}`)
            .then(({data}) => {
                setPosts(data.hits)
                setPageQty(data.nbPages)
                console.log(data)

                if (data.nbPages < page) {
                    setPage(1)
                }
            })


    }, [page, query])


    return (
        <div>
            <TextField
                value={query}
                label={'Input'}
                fullWidth
                onChange={event => setQuery(event.target.value)}
            />
            <Stack spacing={1}>
                {!!pageQty && (
                    <Pagination
                        count={pageQty}
                        showFirstButton
                        showLastButton
                        page={page}
                        onChange={(_, index) => setPage(index)}
                        renderItem={(item) => (
                            <PaginationItem
                                component={NavLink}
                                to={`/?page=${item.page}`}
                                {...item}
                            />
                        )}
                    />
                )}

                {
                    posts.map((post, index) => (
                        <Link key={index}>
                            {post.title || post.story_title}
                        </Link>
                    ))
                }
            </Stack>
        </div>
    );
};

export default HomePage;