import React, {useEffect, useState} from 'react';
import {TextField, Pagination, PaginationItem, Stack, Link} from '@mui/material'
import axios from "axios";
import {Link as NavLink} from 'react-router-dom'


const BASE_URL = 'http://hn.algolia.com/api/v1/search?';

const HomePage = (props) => {
    console.log(props)
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const [pageQty, setPageQty] = useState(0)
    const [query, setQuery] = useState('react')

    useEffect(() => {
        axios.get(BASE_URL + `query=${query}&page=${page - 1}`)
            .then(({data}) => {
                // console.log(data)
                setPosts(data.hits)
                setPageQty(data.nbPages)

                if (data.nbPages < page) {
                    setPage(1)
                }
            })
    }, [page, query])

    return (
        <div>
            <TextField
                value={query}
                fullWidth
                label={'TEST PAGINATION'}
                onChange={event => setQuery(event.target.value)}
            />
            <Stack spacing={1}>
                {posts.map((post, index) => (
                    <Link key={index} href={post.url}>
                        {post.title || post.story_title}
                    </Link>
                ))}

                {!!pageQty && (
                    <Pagination
                        className={'Pagination'}
                        count={pageQty}
                        page={page}
                        showFirstButton
                        showLastButton
                        onChange={(_, i) => setPage(i)}
                        renderItem={
                            (item) => (
                                <PaginationItem
                                    component={NavLink}
                                    to={`/?page=${item.page}`}
                                    {...item}
                                />
                            )
                        }

                    />
                )}
            </Stack>
        </div>
    );
};

export default HomePage;