import React from 'react';
import './App.css'
import {Container} from '@mui/material'
import {Routes, Route} from "react-router-dom";
import About from "./Componets/About";
import HomePage from "./Componets/HomePage";
import NotFound from "./Componets/NotFound";


function App() {

    return (
        <div className={'App'}>
            <Container>
                <Routes>
                    <Route path={'/'} element={<HomePage/>}/>
                    <Route path={'/about'} element={<About/>}/>
                    <Route path={'*'} element={<NotFound/>}/>
                </Routes>
            </Container>
        </div>
    )
}

export default App;
